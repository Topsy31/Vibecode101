/* CoffeeCup Analysis Module — Web Worker */
/* Self-contained Monte Carlo simulation engine for schedule and cost analysis. */
/* No React, no DOM, no imports — everything runs inside a dedicated Web Worker. */

// ============================================================================
// 1. SAMPLING FUNCTIONS
// ============================================================================

function randomNormal() {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function sampleGamma(shape) {
  if (shape < 1) {
    return sampleGamma(shape + 1) * Math.pow(Math.random(), 1 / shape);
  }
  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  while (true) {
    let x, v;
    do { x = randomNormal(); v = 1 + c * x; } while (v <= 0);
    v = v * v * v;
    const u = Math.random();
    if (u < 1 - 0.0331 * (x * x) * (x * x)) return d * v;
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
  }
}

function sampleBeta(alpha, beta) {
  const gammaA = sampleGamma(alpha);
  const gammaB = sampleGamma(beta);
  return gammaA / (gammaA + gammaB);
}

function sampleTriangular(min, mode, max) {
  if (min === max) return min;
  if (mode < min) mode = min;
  if (mode > max) mode = max;
  const u = Math.random();
  const fc = (mode - min) / (max - min);
  if (u < fc) return min + Math.sqrt(u * (max - min) * (mode - min));
  else return max - Math.sqrt((1 - u) * (max - min) * (max - mode));
}

function sampleUniform(min, max) {
  if (min === max) return min;
  return min + Math.random() * (max - min);
}

function samplePERT(min, mode, max, lambda) {
  lambda = lambda || 4;
  if (min === max) return min;
  if (mode < min) mode = min;
  if (mode > max) mode = max;
  const mean = (min + lambda * mode + max) / (lambda + 2);
  const range = max - min;
  if (range === 0) return min;
  const modeMeanDiff = mean - min;
  const maxMeanDiff = max - mean;
  if (modeMeanDiff <= 0 || maxMeanDiff <= 0) return sampleTriangular(min, mode, max);
  const alpha = ((mean - min) * (2 * mode - min - max)) / ((mode - mean) * (max - min));
  const beta = alpha * (max - mean) / (mean - min);
  if (!isFinite(alpha) || !isFinite(beta) || alpha <= 0 || beta <= 0) return sampleTriangular(min, mode, max);
  const betaSample = sampleBeta(alpha, beta);
  return min + betaSample * range;
}

function sampleDistribution(impact, distributionType) {
  distributionType = distributionType || 'triangular';
  const { min, likely, max } = impact;
  switch (distributionType) {
    case 'uniform': return sampleUniform(min, max);
    case 'pert': return samplePERT(min, likely, max);
    case 'triangular': default: return sampleTriangular(min, likely, max);
  }
}

// ============================================================================
// 2. NORMAL CDF APPROXIMATION (for correlated sampling)
// ============================================================================

function normalCDF(x) {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
  const p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1.0 + sign * y);
}

// ============================================================================
// 3. CORRELATED SAMPLING
// ============================================================================

function sampleCorrelated(impact, distribution, sharedNormal, factor) {
  const individualNormal = randomNormal();
  const correlatedNormal = factor * sharedNormal + Math.sqrt(1 - factor * factor) * individualNormal;
  const u = normalCDF(correlatedNormal);
  return inverseSample(impact, distribution, u);
}

function inverseSample(impact, distribution, u) {
  const { min, likely, max } = impact;
  if (min === max) return min;
  switch (distribution) {
    case 'uniform':
      return min + u * (max - min);
    case 'triangular': {
      const fc = (likely - min) / (max - min);
      if (u < fc) return min + Math.sqrt(u * (max - min) * (likely - min));
      else return max - Math.sqrt((1 - u) * (max - min) * (max - likely));
    }
    case 'pert': default: {
      const lambda = 4;
      const mean = (min + lambda * likely + max) / (lambda + 2);
      const range = max - min;
      const alpha = ((mean - min) * (2 * likely - min - max)) / ((likely - mean) * range);
      const beta = alpha * (max - mean) / (mean - min);
      if (!isFinite(alpha) || !isFinite(beta) || alpha <= 0 || beta <= 0) {
        // Fallback to triangular inverse
        const fc = (likely - min) / (max - min);
        if (u < fc) return min + Math.sqrt(u * (max - min) * (likely - min));
        else return max - Math.sqrt((1 - u) * (max - min) * (max - likely));
      }
      // Bisection to find x where betaCDF(x, alpha, beta) ~ u
      let lo = 0, hi = 1;
      for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2;
        if (incompleteBeta(mid, alpha, beta) < u) lo = mid;
        else hi = mid;
      }
      return min + ((lo + hi) / 2) * range;
    }
  }
}

// ============================================================================
// 4. INCOMPLETE BETA FUNCTION (regularised) + LN-GAMMA
// ============================================================================

function lnGamma(x) {
  const g = 7;
  const coef = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
    1.5056327351493116e-7
  ];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lnGamma(1 - x);
  x -= 1;
  let a = coef[0];
  const t = x + g + 0.5;
  for (let i = 1; i < coef.length; i++) a += coef[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

function incompleteBeta(x, a, b) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  // Use symmetry relation when x is large relative to a and b
  if (x > (a + 1) / (a + b + 2)) return 1 - incompleteBeta(1 - x, b, a);
  const lnBeta = lnGamma(a) + lnGamma(b) - lnGamma(a + b);
  const front = Math.exp(Math.log(x) * a + Math.log(1 - x) * b - lnBeta) / a;
  // Lentz's continued fraction
  let f = 1, c = 1, d = 1 - (a + b) * x / (a + 1);
  if (Math.abs(d) < 1e-30) d = 1e-30;
  d = 1 / d;
  f = d;
  for (let i = 1; i <= 100; i++) {
    const m = i;
    let numerator = m * (b - m) * x / ((a + 2 * m - 1) * (a + 2 * m));
    d = 1 + numerator * d; if (Math.abs(d) < 1e-30) d = 1e-30; d = 1 / d;
    c = 1 + numerator / c; if (Math.abs(c) < 1e-30) c = 1e-30;
    f *= d * c;
    numerator = -(a + m) * (a + b + m) * x / ((a + 2 * m) * (a + 2 * m + 1));
    d = 1 + numerator * d; if (Math.abs(d) < 1e-30) d = 1e-30; d = 1 / d;
    c = 1 + numerator / c; if (Math.abs(c) < 1e-30) c = 1e-30;
    const delta = d * c;
    f *= delta;
    if (Math.abs(delta - 1) < 1e-10) break;
  }
  return front * f;
}

// ============================================================================
// 5. TOPOLOGICAL SORT + FORWARD PASS (from Gantt Chart)
// ============================================================================

function topologicalSort(activities) {
  const activityMap = new Map(activities.map(a => [a.id, a]));
  const visited = new Set();
  const result = [];
  const visit = (activity) => {
    if (visited.has(activity.id)) return;
    visited.add(activity.id);
    if (activity.dependencies) {
      for (const dep of activity.dependencies) {
        const pred = activityMap.get(dep.predecessorId);
        if (pred) visit(pred);
      }
    }
    result.push(activity);
  };
  for (const activity of activities) visit(activity);
  return result;
}

function calculateProjectDuration(activities, durationOverrides) {
  if (activities.length === 0) return 0;
  const activityMap = new Map(activities.map(a => [a.id, a]));
  const sorted = topologicalSort(activities);
  const startTimesMap = {};
  for (const activity of sorted) {
    const dur = durationOverrides[activity.id] !== undefined ? durationOverrides[activity.id] : activity.duration;
    if (!activity.dependencies || activity.dependencies.length === 0) {
      startTimesMap[activity.id] = 0;
    } else {
      let maxStart = 0;
      for (const dep of activity.dependencies) {
        const pred = activityMap.get(dep.predecessorId);
        if (!pred) continue;
        const predDur = durationOverrides[dep.predecessorId] !== undefined ? durationOverrides[dep.predecessorId] : pred.duration;
        const predStart = startTimesMap[dep.predecessorId] || 0;
        const predEnd = predStart + predDur;
        const lag = dep.lag || 0;
        let constrainedStart;
        switch (dep.type) {
          case 'FS': constrainedStart = predEnd + lag; break;
          case 'SS': constrainedStart = predStart + lag; break;
          case 'FF': constrainedStart = predEnd - dur + lag; break;
          case 'SF': constrainedStart = predStart - dur + lag; break;
          default: constrainedStart = predEnd + lag;
        }
        maxStart = Math.max(maxStart, constrainedStart);
      }
      startTimesMap[activity.id] = Math.max(0, maxStart);
    }
  }
  let maxEnd = 0;
  for (const a of activities) {
    const dur = durationOverrides[a.id] !== undefined ? durationOverrides[a.id] : a.duration;
    const end = (startTimesMap[a.id] || 0) + dur;
    if (end > maxEnd) maxEnd = end;
  }
  return maxEnd;
}

// ============================================================================
// 6. SCHEDULE SIMULATION
// ============================================================================

function simulateSchedule(activities, overrides, risks, riskToggles, correlationGroups, iterations) {
  const results = [];
  const inputSamples = {};
  // Pre-build group lookup: activity ID -> correlation group
  const activityGroupMap = {};
  for (const g of correlationGroups) {
    for (const aid of g.activityIds) {
      activityGroupMap[aid] = g;
    }
  }

  for (let i = 0; i < iterations; i++) {
    // Generate one shared normal per correlation group per iteration
    const groupNormals = {};
    for (const g of correlationGroups) {
      groupNormals[g.id] = randomNormal();
    }

    const durationMap = {};
    for (const act of activities) {
      const override = overrides[act.id];
      if (override && override.min !== undefined) {
        const group = activityGroupMap[act.id];
        if (group && group.factor > 0) {
          durationMap[act.id] = sampleCorrelated(override, override.distribution || 'triangular', groupNormals[group.id], group.factor);
        } else {
          durationMap[act.id] = sampleDistribution(override, override.distribution || 'triangular');
        }
        // Ensure non-negative duration
        if (durationMap[act.id] < 0) durationMap[act.id] = 0;
      } else {
        durationMap[act.id] = act.duration;
      }
      if (!inputSamples[act.id]) inputSamples[act.id] = [];
      inputSamples[act.id].push(durationMap[act.id]);
    }

    // Calculate project duration via forward pass
    let projectDuration = calculateProjectDuration(activities, durationMap);

    // Add risk time impacts as buffer
    let riskBuffer = 0;
    for (const risk of risks) {
      const toggle = riskToggles[risk.id];
      if (!toggle || !toggle.included) {
        if (!inputSamples['risk_time_' + risk.id]) inputSamples['risk_time_' + risk.id] = [];
        inputSamples['risk_time_' + risk.id].push(0);
        continue;
      }
      const usePost = toggle.usePostMitigation;
      const likelihood = usePost ? (risk.postLikelihood != null ? risk.postLikelihood : risk.likelihood) : risk.likelihood;
      if (Math.random() * 100 < likelihood) {
        const impactTime = usePost ? (risk.postImpactTime || risk.impactTime) : risk.impactTime;
        const dist = usePost ? (risk.postTimeDistribution || risk.timeDistribution || 'triangular') : (risk.timeDistribution || 'triangular');
        if (impactTime && impactTime.max > 0) {
          const impact = sampleDistribution(impactTime, dist);
          const mult = risk.type === 'threat' ? 1 : -1;
          riskBuffer += impact * mult;
          if (!inputSamples['risk_time_' + risk.id]) inputSamples['risk_time_' + risk.id] = [];
          inputSamples['risk_time_' + risk.id].push(impact * mult);
        } else {
          if (!inputSamples['risk_time_' + risk.id]) inputSamples['risk_time_' + risk.id] = [];
          inputSamples['risk_time_' + risk.id].push(0);
        }
      } else {
        if (!inputSamples['risk_time_' + risk.id]) inputSamples['risk_time_' + risk.id] = [];
        inputSamples['risk_time_' + risk.id].push(0);
      }
    }

    results.push(Math.max(0, projectDuration + riskBuffer));

    // Report progress every 500 iterations
    if (i % 500 === 0) {
      self.postMessage({ type: 'progress', iteration: i, total: iterations });
    }
  }
  return { results, inputSamples };
}

// ============================================================================
// 7. COST SIMULATION
// ============================================================================

function simulateCost(costItems, overrides, risks, riskToggles, correlationGroups, iterations) {
  const results = [];
  const inputSamples = {};

  for (let i = 0; i < iterations; i++) {
    let totalCost = 0;

    for (const item of costItems) {
      const override = overrides[item.id];
      let cost;
      if (override && override.min !== undefined) {
        cost = sampleDistribution(override, override.distribution || 'triangular');
        if (cost < 0) cost = 0;
      } else {
        cost = item.totalCost || 0;
      }
      totalCost += cost;
      if (!inputSamples[item.id]) inputSamples[item.id] = [];
      inputSamples[item.id].push(cost);
    }

    // Add risk cost impacts
    for (const risk of risks) {
      const toggle = riskToggles[risk.id];
      if (!toggle || !toggle.included) {
        if (!inputSamples['risk_cost_' + risk.id]) inputSamples['risk_cost_' + risk.id] = [];
        inputSamples['risk_cost_' + risk.id].push(0);
        continue;
      }
      const usePost = toggle.usePostMitigation;
      const likelihood = usePost ? (risk.postLikelihood != null ? risk.postLikelihood : risk.likelihood) : risk.likelihood;
      if (Math.random() * 100 < likelihood) {
        const impactCost = usePost ? (risk.postImpactCost || risk.impactCost) : risk.impactCost;
        const dist = usePost ? (risk.postCostDistribution || risk.costDistribution || 'triangular') : (risk.costDistribution || 'triangular');
        if (impactCost && impactCost.max > 0) {
          const impact = sampleDistribution(impactCost, dist);
          const mult = risk.type === 'threat' ? 1 : -1;
          totalCost += impact * mult;
          if (!inputSamples['risk_cost_' + risk.id]) inputSamples['risk_cost_' + risk.id] = [];
          inputSamples['risk_cost_' + risk.id].push(impact * mult);
        } else {
          if (!inputSamples['risk_cost_' + risk.id]) inputSamples['risk_cost_' + risk.id] = [];
          inputSamples['risk_cost_' + risk.id].push(0);
        }
      } else {
        if (!inputSamples['risk_cost_' + risk.id]) inputSamples['risk_cost_' + risk.id] = [];
        inputSamples['risk_cost_' + risk.id].push(0);
      }
    }

    results.push(totalCost);
    if (i % 500 === 0) {
      self.postMessage({ type: 'progress', iteration: i + iterations, total: iterations * 2 });
    }
  }
  return { results, inputSamples };
}

// ============================================================================
// 8. STATISTICS FUNCTIONS
// ============================================================================

function calculateStatistics(data) {
  if (!data || data.length === 0) return null;
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = data.reduce((sum, v) => sum + v, 0) / n;
  const getPercentile = (p) => {
    const index = Math.ceil((p / 100) * n) - 1;
    return sorted[Math.max(0, Math.min(index, n - 1))];
  };
  return {
    mean: Math.round(mean * 100) / 100,
    min: sorted[0],
    max: sorted[n - 1],
    p10: getPercentile(10),
    p50: getPercentile(50),
    p80: getPercentile(80),
    p90: getPercentile(90),
    sorted
  };
}

function createCDFData(sortedData, samplePoints) {
  samplePoints = samplePoints || 200;
  const n = sortedData.length;
  const step = Math.max(1, Math.floor(n / samplePoints));
  const xValues = [], yValues = [];
  for (let i = 0; i < n; i += step) {
    xValues.push(Math.round(sortedData[i] * 100) / 100);
    yValues.push(Math.round((i + 1) / n * 10000) / 100);
  }
  if (xValues[xValues.length - 1] !== sortedData[n - 1]) {
    xValues.push(Math.round(sortedData[n - 1] * 100) / 100);
    yValues.push(100);
  }
  return { xValues, yValues };
}

function createHistogramData(data, bins) {
  bins = bins || 40;
  const min = Math.min(...data);
  const max = Math.max(...data);
  if (min === max) return { histogram: [data.length], labels: [Math.round(min)], binWidth: 1 };
  const binWidth = (max - min) / bins;
  const histogram = Array(bins).fill(0);
  const labels = [];
  for (let i = 0; i < bins; i++) {
    labels.push(Math.round((min + i * binWidth + binWidth / 2) * 100) / 100);
  }
  for (const value of data) {
    const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
    histogram[binIndex]++;
  }
  return { histogram, labels, binWidth };
}

// ============================================================================
// 9. SENSITIVITY ANALYSIS (Spearman rank-order correlation)
// ============================================================================

function calculateSensitivity(inputSamples, outputResults, topN) {
  topN = topN || 10;
  const n = outputResults.length;
  if (n < 3) return [];

  const outputRanks = rankArray(outputResults);
  const results = [];

  for (const [key, samples] of Object.entries(inputSamples)) {
    if (samples.length !== n) continue;
    // Skip if all values are the same (no variance)
    const allSame = samples.every(v => v === samples[0]);
    if (allSame) continue;

    const inputRanks = rankArray(samples);
    const correlation = pearsonCorrelation(inputRanks, outputRanks);
    if (isFinite(correlation)) {
      results.push({ id: key, correlation: Math.round(correlation * 1000) / 1000 });
    }
  }

  results.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));
  return results.slice(0, topN);
}

function rankArray(arr) {
  const indexed = arr.map((v, i) => ({ v, i }));
  indexed.sort((a, b) => a.v - b.v);
  const ranks = new Array(arr.length);
  for (let i = 0; i < indexed.length; i++) {
    ranks[indexed[i].i] = i + 1;
  }
  return ranks;
}

function pearsonCorrelation(x, y) {
  const n = x.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
  for (let i = 0; i < n; i++) {
    sumX += x[i]; sumY += y[i];
    sumXY += x[i] * y[i];
    sumX2 += x[i] * x[i]; sumY2 += y[i] * y[i];
  }
  const num = n * sumXY - sumX * sumY;
  const den = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  return den === 0 ? 0 : num / den;
}

// ============================================================================
// 10. MESSAGE HANDLER
// ============================================================================

self.onmessage = function(e) {
  const {
    activities,
    costItems,
    risks,
    scheduleOverrides,
    costOverrides,
    riskToggles,
    correlationGroups,
    iterations
  } = e.data;

  self.postMessage({ type: 'status', message: 'Running schedule simulation...' });
  const schedule = simulateSchedule(
    activities || [], scheduleOverrides || {}, risks || [],
    riskToggles || {}, correlationGroups || [], iterations
  );

  self.postMessage({ type: 'status', message: 'Running cost simulation...' });
  const cost = simulateCost(
    costItems || [], costOverrides || {}, risks || [],
    riskToggles || {}, correlationGroups || [], iterations
  );

  self.postMessage({ type: 'status', message: 'Calculating statistics...' });
  const scheduleStats = calculateStatistics(schedule.results);
  const costStats = calculateStatistics(cost.results);

  const scheduleCDF = scheduleStats ? createCDFData(scheduleStats.sorted) : null;
  const costCDF = costStats ? createCDFData(costStats.sorted) : null;
  const scheduleHist = schedule.results.length > 0 ? createHistogramData(schedule.results) : null;
  const costHist = cost.results.length > 0 ? createHistogramData(cost.results) : null;

  self.postMessage({ type: 'status', message: 'Calculating sensitivity...' });
  const scheduleSensitivity = calculateSensitivity(schedule.inputSamples, schedule.results);
  const costSensitivity = calculateSensitivity(cost.inputSamples, cost.results);

  self.postMessage({
    type: 'complete',
    scheduleResults: schedule.results,
    costResults: cost.results,
    scheduleStats,
    costStats,
    scheduleCDF,
    costCDF,
    scheduleHist,
    costHist,
    scheduleSensitivity,
    costSensitivity
  });
};
