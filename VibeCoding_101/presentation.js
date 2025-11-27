// Presentation Controller
class Presentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = document.querySelectorAll('.slide').length;
        this.slides = document.querySelectorAll('.slide');
        this.progressBar = document.getElementById('progressBar');
        this.slideJumpInput = document.getElementById('slideJumpInput');
        this.totalSlidesEl = document.getElementById('totalSlides');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.shortcutsHint = document.getElementById('shortcutsHint');

        this.init();
    }

    init() {
        // Set total slides
        this.totalSlidesEl.textContent = this.totalSlides;
        this.slideJumpInput.max = this.totalSlides;

        // Bind navigation
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Slide jump input handlers
        this.slideJumpInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const slideNum = parseInt(this.slideJumpInput.value);
                if (slideNum >= 1 && slideNum <= this.totalSlides) {
                    this.goToSlide(slideNum);
                }
                this.slideJumpInput.blur();
            } else if (e.key === 'Escape') {
                this.slideJumpInput.value = this.currentSlide;
                this.slideJumpInput.blur();
            }
            e.stopPropagation(); // Prevent slide navigation while typing
        });

        this.slideJumpInput.addEventListener('blur', () => {
            this.slideJumpInput.value = this.currentSlide;
        });

        this.slideJumpInput.addEventListener('focus', () => {
            this.slideJumpInput.select();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Update initial state
        this.updateUI();
    }

    handleKeydown(e) {
        // Ignore if focus is on an input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        switch(e.key) {
            case 'ArrowRight':
            case ' ':
            case 'Enter':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
            case 'Backspace':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides);
                break;
            case 'f':
            case 'F':
                this.toggleFullscreen();
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                break;
            case '?':
                this.showHelp();
                break;
        }

        // Number keys for quick navigation (1-9)
        if (e.key >= '1' && e.key <= '9') {
            const slideNum = parseInt(e.key);
            if (slideNum <= this.totalSlides) {
                this.goToSlide(slideNum);
            }
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1, 'right');
        }
    }

    prevSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1, 'left');
        }
    }

    goToSlide(num, direction = 'right') {
        if (num < 1 || num > this.totalSlides || num === this.currentSlide) return;

        // Get current and target slides
        const currentSlideEl = this.slides[this.currentSlide - 1];
        const targetSlideEl = this.slides[num - 1];

        // Remove active class with animation direction
        currentSlideEl.classList.remove('active');
        currentSlideEl.classList.add(direction === 'right' ? 'slide-in-left' : 'slide-in-right');

        // Update current slide number
        this.currentSlide = num;

        // Add active class to new slide
        setTimeout(() => {
            currentSlideEl.style.display = 'none';
            currentSlideEl.classList.remove('slide-in-left', 'slide-in-right');

            targetSlideEl.style.display = 'flex';
            targetSlideEl.classList.add(direction === 'right' ? 'slide-in-right' : 'slide-in-left');

            // Force reflow
            targetSlideEl.offsetHeight;

            targetSlideEl.classList.remove('slide-in-right', 'slide-in-left');
            targetSlideEl.classList.add('active');
        }, 50);

        this.updateUI();
    }

    updateUI() {
        // Update slide counter input
        this.slideJumpInput.value = this.currentSlide;

        // Update progress bar
        const progress = ((this.currentSlide - 1) / (this.totalSlides - 1)) * 100;
        this.progressBar.style.width = progress + '%';

        // Update navigation buttons
        this.prevBtn.disabled = this.currentSlide === 1;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;

        // Show shortcuts hint only on first slide
        if (this.currentSlide === 1) {
            this.shortcutsHint.classList.add('visible');
        } else {
            this.shortcutsHint.classList.remove('visible');
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Fullscreen not available:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    showHelp() {
        alert('Keyboard Shortcuts:\n\n→ / Space / Enter - Next slide\n← / Backspace - Previous slide\nHome - First slide\nEnd - Last slide\n1-9 - Go to slide number\nF - Toggle fullscreen\n? - Show this help');
    }
}

// Initialize presentation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.presentation = new Presentation();
});

// Touch/swipe support for mobile/tablet
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            window.presentation?.nextSlide();
        } else {
            window.presentation?.prevSlide();
        }
    }
}

// Prevent default behavior on arrow keys to avoid scrolling
// But only if not in an input field
window.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    if(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

// Typing animation for the terminal prompt
class TypingAnimation {
    constructor() {
        this.typingElement = document.getElementById('typingText');
        this.promptText = `Create a Snake game where the snake eats photos that users upload.

The game should:
- Let users upload their own photos
- Show photos as food for the snake
- Keep track of the score
- Work in any web browser

Make it fun and colorful!`;

        this.charIndex = 0;
        this.typingSpeed = 45; // milliseconds per character
        this.hasStarted = false;
        this.isComplete = false;
    }

    start() {
        if (this.hasStarted) return;
        this.hasStarted = true;
        this.type();
    }

    reset() {
        this.charIndex = 0;
        this.hasStarted = false;
        this.isComplete = false;
        if (this.typingElement) {
            this.typingElement.textContent = '';
        }
    }

    type() {
        if (!this.typingElement) return;

        if (this.charIndex < this.promptText.length) {
            this.typingElement.textContent += this.promptText.charAt(this.charIndex);
            this.charIndex++;

            // Variable speed for more natural typing
            let delay = this.typingSpeed;
            const char = this.promptText.charAt(this.charIndex - 1);

            // Pause longer at punctuation and newlines
            if (char === '.' || char === '!' || char === '?') {
                delay = 400;
            } else if (char === ',') {
                delay = 200;
            } else if (char === '\n') {
                delay = 300;
            } else if (char === '-') {
                delay = 100;
            }

            setTimeout(() => this.type(), delay);
        } else {
            this.isComplete = true;
        }
    }
}

// Initialize typing animations
let typingAnimation;
let polygonTypingAnimation;
let riskTypingAnimation;

document.addEventListener('DOMContentLoaded', () => {
    typingAnimation = new TypingAnimation();

    // Polygon typing animation for slide 5
    polygonTypingAnimation = new TypingAnimation();
    polygonTypingAnimation.typingElement = document.getElementById('polygonTypingText');
    polygonTypingAnimation.promptText = `I remember a program from my ZX Spectrum that could draw polygons.

Can you write Python code that:
- Asks the user how many sides they want
- Draws that polygon on screen
- Makes it look nice with colors

I want to see my childhood memory come back to life!`;

    // Risk analysis typing animation for slide 6
    riskTypingAnimation = new TypingAnimation();
    riskTypingAnimation.typingElement = document.getElementById('riskTypingText');
    riskTypingAnimation.promptText = `I have CSV data from 85 construction projects for my MSc research.

Can you write Python code that:
- Compares E-projects vs H-projects
- Shows complexity, completeness, threats and opportunities
- Creates a bar chart comparing the metrics
- Creates a heatmap of threat/opportunity ratios

I need to visualize risk patterns in the data!`;

    // Initialize polygon canvas
    initPolygonDemo();

    // Initialize risk dashboard
    initRiskDashboard();

    // QR code for slide 8 is now loaded via external API in the HTML
});

// Polygon drawing demo
function initPolygonDemo() {
    const canvas = document.getElementById('polygonCanvas');
    const slider = document.getElementById('polygonSides');
    const sidesValue = document.getElementById('sidesValue');

    if (!canvas || !slider) return;

    const ctx = canvas.getContext('2d');
    let sides = 6;
    let rotation = 0;
    let animationId;

    function drawPolygon() {
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.35;

        // Clear canvas
        ctx.fillStyle = '#0f0f23';
        ctx.fillRect(0, 0, width, height);

        // Draw grid lines (retro effect)
        ctx.strokeStyle = 'rgba(233, 69, 96, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i < width; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }
        for (let i = 0; i < height; i += 40) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();
        }

        // Draw polygon with glow effect
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);

        // Outer glow
        ctx.shadowColor = '#e94560';
        ctx.shadowBlur = 30;

        // Draw filled polygon
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI / sides) - Math.PI / 2;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();

        // Gradient fill
        const gradient = ctx.createLinearGradient(-radius, -radius, radius, radius);
        gradient.addColorStop(0, 'rgba(233, 69, 96, 0.3)');
        gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.3)');
        gradient.addColorStop(1, 'rgba(20, 184, 166, 0.3)');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw outline
        ctx.strokeStyle = '#e94560';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw vertices
        ctx.shadowBlur = 15;
        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI / sides) - Math.PI / 2;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = '#14b8a6';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        ctx.restore();

        // Draw info text
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#e94560';
        ctx.font = 'bold 24px Consolas, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${sides}-sided polygon`, centerX, height - 40);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px Consolas, monospace';
        ctx.fillText(`Vertices: ${sides} | Angles: ${(180 * (sides - 2) / sides).toFixed(1)}°`, centerX, height - 15);

        rotation += 0.005;
        animationId = requestAnimationFrame(drawPolygon);
    }

    slider.addEventListener('input', (e) => {
        sides = parseInt(e.target.value);
        sidesValue.textContent = sides;
    });

    // Start animation when slide 5 is visible
    window.startPolygonAnimation = () => {
        if (!animationId) {
            drawPolygon();
        }
    };

    window.stopPolygonAnimation = () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    };
}

// QR Code Generator - Creates SVG QR code for the given URL
function generateQRCode(svgId, url) {
    const svg = document.getElementById(svgId);
    if (!svg) return;

    // Use Google Charts API to generate QR via image, but for offline use
    // we'll create a visual QR-like pattern that links to the URL
    // For a real scannable QR, we'll use an embedded approach

    // Create a simple but recognizable QR-style graphic
    // In production, you'd use a library like qrcode-generator

    const size = 37; // QR Version 5 is 37x37
    const moduleSize = 1;

    // Clear existing content
    svg.innerHTML = '';

    // Add white background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', size);
    bg.setAttribute('height', size);
    bg.setAttribute('fill', 'white');
    svg.appendChild(bg);

    // Draw finder patterns (the three corner squares)
    function drawFinderPattern(x, y) {
        // Outer black square
        const outer = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        outer.setAttribute('x', x);
        outer.setAttribute('y', y);
        outer.setAttribute('width', 7);
        outer.setAttribute('height', 7);
        outer.setAttribute('fill', '#1a1a2e');
        svg.appendChild(outer);

        // White inner
        const white = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        white.setAttribute('x', x + 1);
        white.setAttribute('y', y + 1);
        white.setAttribute('width', 5);
        white.setAttribute('height', 5);
        white.setAttribute('fill', 'white');
        svg.appendChild(white);

        // Black center
        const center = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        center.setAttribute('x', x + 2);
        center.setAttribute('y', y + 2);
        center.setAttribute('width', 3);
        center.setAttribute('height', 3);
        center.setAttribute('fill', '#1a1a2e');
        svg.appendChild(center);
    }

    // Draw the three finder patterns
    drawFinderPattern(0, 0);        // Top-left
    drawFinderPattern(size - 7, 0); // Top-right
    drawFinderPattern(0, size - 7); // Bottom-left

    // Draw timing patterns
    for (let i = 8; i < size - 8; i++) {
        if (i % 2 === 0) {
            // Horizontal timing
            const hRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            hRect.setAttribute('x', i);
            hRect.setAttribute('y', 6);
            hRect.setAttribute('width', 1);
            hRect.setAttribute('height', 1);
            hRect.setAttribute('fill', '#1a1a2e');
            svg.appendChild(hRect);

            // Vertical timing
            const vRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            vRect.setAttribute('x', 6);
            vRect.setAttribute('y', i);
            vRect.setAttribute('width', 1);
            vRect.setAttribute('height', 1);
            vRect.setAttribute('fill', '#1a1a2e');
            svg.appendChild(vRect);
        }
    }

    // Draw alignment pattern (center-ish for version 5)
    const ax = size - 9;
    const ay = size - 9;
    const alignOuter = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    alignOuter.setAttribute('x', ax);
    alignOuter.setAttribute('y', ay);
    alignOuter.setAttribute('width', 5);
    alignOuter.setAttribute('height', 5);
    alignOuter.setAttribute('fill', '#1a1a2e');
    svg.appendChild(alignOuter);

    const alignWhite = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    alignWhite.setAttribute('x', ax + 1);
    alignWhite.setAttribute('y', ay + 1);
    alignWhite.setAttribute('width', 3);
    alignWhite.setAttribute('height', 3);
    alignWhite.setAttribute('fill', 'white');
    svg.appendChild(alignWhite);

    const alignCenter = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    alignCenter.setAttribute('x', ax + 2);
    alignCenter.setAttribute('y', ay + 2);
    alignCenter.setAttribute('width', 1);
    alignCenter.setAttribute('height', 1);
    alignCenter.setAttribute('fill', '#1a1a2e');
    svg.appendChild(alignCenter);

    // Add pseudo-random data modules to make it look like a real QR
    // This creates a visual pattern but won't actually scan
    // For a real scannable QR, use a proper encoder
    const seed = url.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            // Skip finder patterns and timing
            if ((x < 9 && y < 9) || (x >= size - 8 && y < 9) || (x < 9 && y >= size - 8)) continue;
            if (x === 6 || y === 6) continue;
            if (x >= size - 9 && x < size - 4 && y >= size - 9 && y < size - 4) continue;

            // Pseudo-random fill based on position and URL
            const hash = ((x * 31 + y * 17 + seed) * 13) % 100;
            if (hash < 45) {
                const module = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                module.setAttribute('x', x);
                module.setAttribute('y', y);
                module.setAttribute('width', 1);
                module.setAttribute('height', 1);
                module.setAttribute('fill', '#1a1a2e');
                svg.appendChild(module);
            }
        }
    }

    // Add a small colored accent in the center (optional branding)
    const accent = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    accent.setAttribute('cx', size / 2);
    accent.setAttribute('cy', size / 2);
    accent.setAttribute('r', 2);
    accent.setAttribute('fill', '#6366f1');
    svg.appendChild(accent);
}

// Risk Dashboard Demo
function initRiskDashboard() {
    const barCanvas = document.getElementById('barChart');
    const heatmapCanvas = document.getElementById('heatmapChart');
    const slider = document.getElementById('riskMultiplier');
    const multiplierValue = document.getElementById('multiplierValue');

    if (!barCanvas || !heatmapCanvas || !slider) return;

    const barCtx = barCanvas.getContext('2d');
    const heatCtx = heatmapCanvas.getContext('2d');
    let multiplier = 1;

    // Simulated data based on ALLTO1.csv structure
    const baseData = {
        eProjects: {
            completeness: 3.2,
            complexity: 2.8,
            threats: 4.5,
            opportunities: 3.8
        },
        hProjects: {
            completeness: 2.9,
            complexity: 3.1,
            threats: 5.2,
            opportunities: 2.9
        }
    };

    // Heatmap data: complexity vs completeness with threat/opportunity ratio
    const heatmapData = [
        [0.8, 1.1, 1.4, 1.8, 2.1],  // Complexity 1
        [0.9, 1.2, 1.5, 1.9, 2.3],  // Complexity 2
        [1.0, 1.3, 1.7, 2.1, 2.5],  // Complexity 3
        [1.2, 1.5, 1.9, 2.4, 2.8],  // Complexity 4
        [1.4, 1.8, 2.2, 2.7, 3.2]   // Complexity 5
    ];

    function drawBarChart() {
        const width = barCanvas.width;
        const height = barCanvas.height;

        // Clear canvas
        barCtx.fillStyle = '#0f0f23';
        barCtx.fillRect(0, 0, width, height);

        // Title
        barCtx.fillStyle = '#94a3b8';
        barCtx.font = 'bold 14px Consolas, monospace';
        barCtx.textAlign = 'center';
        barCtx.fillText('E vs H Projects Comparison', width / 2, 25);

        const metrics = ['Completeness', 'Complexity', 'Threats', 'Opportunities'];
        const barWidth = 35;
        const gap = 15;
        const groupWidth = barWidth * 2 + gap;
        const startX = 50;
        const maxHeight = 180;
        const baseY = height - 40;

        // Get adjusted data
        const eData = [
            baseData.eProjects.completeness,
            baseData.eProjects.complexity,
            baseData.eProjects.threats * multiplier,
            baseData.eProjects.opportunities / multiplier
        ];
        const hData = [
            baseData.hProjects.completeness,
            baseData.hProjects.complexity,
            baseData.hProjects.threats * multiplier,
            baseData.hProjects.opportunities / multiplier
        ];

        const maxVal = Math.max(...eData, ...hData) + 1;

        metrics.forEach((metric, i) => {
            const x = startX + i * (groupWidth + 30);

            // E projects bar (gradient blue-purple)
            const eHeight = (eData[i] / maxVal) * maxHeight;
            const eGrad = barCtx.createLinearGradient(x, baseY, x, baseY - eHeight);
            eGrad.addColorStop(0, '#6366f1');
            eGrad.addColorStop(1, '#8b5cf6');
            barCtx.fillStyle = eGrad;
            barCtx.fillRect(x, baseY - eHeight, barWidth, eHeight);

            // H projects bar (gradient pink)
            const hHeight = (hData[i] / maxVal) * maxHeight;
            const hGrad = barCtx.createLinearGradient(x + barWidth + gap, baseY, x + barWidth + gap, baseY - hHeight);
            hGrad.addColorStop(0, '#ec4899');
            hGrad.addColorStop(1, '#f472b6');
            barCtx.fillStyle = hGrad;
            barCtx.fillRect(x + barWidth + gap, baseY - hHeight, barWidth, hHeight);

            // Values on bars
            barCtx.fillStyle = '#fff';
            barCtx.font = '11px Consolas, monospace';
            barCtx.textAlign = 'center';
            barCtx.fillText(eData[i].toFixed(1), x + barWidth / 2, baseY - eHeight - 5);
            barCtx.fillText(hData[i].toFixed(1), x + barWidth + gap + barWidth / 2, baseY - hHeight - 5);

            // Labels
            barCtx.fillStyle = '#94a3b8';
            barCtx.font = '10px Consolas, monospace';
            barCtx.fillText(metric.substring(0, 6), x + groupWidth / 2, baseY + 15);
        });

        // Legend
        barCtx.fillStyle = '#6366f1';
        barCtx.fillRect(width - 100, 15, 12, 12);
        barCtx.fillStyle = '#94a3b8';
        barCtx.font = '11px Consolas, monospace';
        barCtx.textAlign = 'left';
        barCtx.fillText('E Projects', width - 85, 25);

        barCtx.fillStyle = '#ec4899';
        barCtx.fillRect(width - 100, 32, 12, 12);
        barCtx.fillStyle = '#94a3b8';
        barCtx.fillText('H Projects', width - 85, 42);
    }

    function drawHeatmap() {
        const width = heatmapCanvas.width;
        const height = heatmapCanvas.height;

        // Clear canvas
        heatCtx.fillStyle = '#0f0f23';
        heatCtx.fillRect(0, 0, width, height);

        // Title
        heatCtx.fillStyle = '#94a3b8';
        heatCtx.font = 'bold 14px Consolas, monospace';
        heatCtx.textAlign = 'center';
        heatCtx.fillText('Threat/Opportunity Ratio Heatmap', width / 2, 25);

        const cellSize = 40;
        const startX = 80;
        const startY = 50;

        // Draw cells
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const value = heatmapData[row][col] * multiplier;
                const x = startX + col * cellSize;
                const y = startY + row * cellSize;

                // Color based on value (green to yellow to red)
                let color;
                if (value < 1.5) {
                    color = `rgb(${Math.floor(value * 100)}, 180, 100)`;
                } else if (value < 2.0) {
                    color = `rgb(180, ${Math.floor(180 - (value - 1.5) * 200)}, 50)`;
                } else {
                    color = `rgb(220, ${Math.floor(100 - (value - 2.0) * 80)}, 60)`;
                }

                heatCtx.fillStyle = color;
                heatCtx.fillRect(x, y, cellSize - 2, cellSize - 2);

                // Value text
                heatCtx.fillStyle = value > 1.8 ? '#fff' : '#1a1a2e';
                heatCtx.font = '11px Consolas, monospace';
                heatCtx.textAlign = 'center';
                heatCtx.fillText(value.toFixed(1), x + cellSize / 2 - 1, y + cellSize / 2 + 4);
            }
        }

        // Axis labels
        heatCtx.fillStyle = '#94a3b8';
        heatCtx.font = '11px Consolas, monospace';

        // Y-axis label (Complexity)
        heatCtx.save();
        heatCtx.translate(20, height / 2);
        heatCtx.rotate(-Math.PI / 2);
        heatCtx.textAlign = 'center';
        heatCtx.fillText('Complexity', 0, 0);
        heatCtx.restore();

        // X-axis label (Completeness)
        heatCtx.textAlign = 'center';
        heatCtx.fillText('Completeness', startX + cellSize * 2.5, startY + cellSize * 5 + 20);

        // Y-axis values
        for (let i = 0; i < 5; i++) {
            heatCtx.textAlign = 'right';
            heatCtx.fillText((i + 1).toString(), startX - 10, startY + i * cellSize + cellSize / 2 + 4);
        }

        // X-axis values
        for (let i = 0; i < 5; i++) {
            heatCtx.textAlign = 'center';
            heatCtx.fillText((i + 1).toString(), startX + i * cellSize + cellSize / 2, startY + cellSize * 5 + 5);
        }

        // Color scale legend
        const legendY = startY + 10;
        const legendX = width - 60;
        const legendHeight = 150;

        for (let i = 0; i < legendHeight; i++) {
            const ratio = i / legendHeight;
            const value = 0.5 + ratio * 3;
            let color;
            if (value < 1.5) {
                color = `rgb(${Math.floor(value * 100)}, 180, 100)`;
            } else if (value < 2.0) {
                color = `rgb(180, ${Math.floor(180 - (value - 1.5) * 200)}, 50)`;
            } else {
                color = `rgb(220, ${Math.floor(100 - (value - 2.0) * 80)}, 60)`;
            }
            heatCtx.fillStyle = color;
            heatCtx.fillRect(legendX, legendY + i, 15, 1);
        }

        heatCtx.fillStyle = '#94a3b8';
        heatCtx.font = '9px Consolas, monospace';
        heatCtx.textAlign = 'left';
        heatCtx.fillText('Low', legendX + 20, legendY + 10);
        heatCtx.fillText('High', legendX + 20, legendY + legendHeight - 5);
    }

    function updateCharts() {
        drawBarChart();
        drawHeatmap();
    }

    slider.addEventListener('input', (e) => {
        multiplier = parseFloat(e.target.value);
        multiplierValue.textContent = multiplier.toFixed(1) + 'x';
        updateCharts();
    });

    // Start and stop functions for slide visibility
    window.startRiskDashboard = () => {
        updateCharts();
    };

    window.stopRiskDashboard = () => {
        // Nothing to stop, but keeping for consistency
    };

    // Initial draw
    updateCharts();
}

// Watch for slide changes to trigger typing animation on slide 2
const originalGoToSlide = Presentation.prototype.goToSlide;
Presentation.prototype.goToSlide = function(num, direction = 'right') {
    originalGoToSlide.call(this, num, direction);

    // Start typing animation when arriving at slide 2
    if (num === 2 && typingAnimation) {
        setTimeout(() => typingAnimation.start(), 500);
    }

    // Start polygon demo and typing when arriving at slide 5
    if (num === 5) {
        setTimeout(() => {
            if (polygonTypingAnimation) polygonTypingAnimation.start();
            if (window.startPolygonAnimation) window.startPolygonAnimation();
        }, 500);
    } else {
        // Stop polygon animation when leaving slide 5
        if (window.stopPolygonAnimation) window.stopPolygonAnimation();
    }

    // Start risk dashboard and typing when arriving at slide 6
    if (num === 6) {
        setTimeout(() => {
            if (riskTypingAnimation) riskTypingAnimation.start();
            if (window.startRiskDashboard) window.startRiskDashboard();
        }, 500);
    }
};

// Safran Logo Splash functionality
function showSafranLogo() {
    const overlay = document.getElementById('safranLogoOverlay');
    overlay.classList.add('active');

    // Close on click anywhere or pressing any key
    const closeOverlay = () => {
        overlay.classList.remove('active');
        overlay.removeEventListener('click', closeOverlay);
        document.removeEventListener('keydown', closeOverlay);
    };

    // Add event listeners
    setTimeout(() => {
        overlay.addEventListener('click', closeOverlay);
        document.addEventListener('keydown', closeOverlay);
    }, 100);
}
