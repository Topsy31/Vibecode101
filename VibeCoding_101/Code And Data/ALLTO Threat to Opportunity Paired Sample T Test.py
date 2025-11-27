# Paired Sample T Test

import pandas as pd
from scipy.stats import ttest_rel

def analyze_threats_vs_opportunities_from_csv(csv_file_path):
    # Load the data from a CSV file
    df = pd.read_csv(csv_file_path)
    
    # Perform the paired samples t-test
    t_stat, p_value = ttest_rel(df['Open_Threats'], df['Open_Opportunities'])
    
    print(f"T-statistic: {t_stat}, P-value: {p_value}")
    
    # Interpret the results
    alpha = 0.05
    if p_value / 2 < alpha and t_stat > 0:  # Adjust for one-tailed test
        print("We reject the null hypothesis. There are significantly more threats than opportunities.")
    else:
        print("We fail to reject the null hypothesis. There is not a significant difference between the number of threats and opportunities.")

# Replace 'ALLTO1.csv' with the actual path to your CSV file
csv_file_path = 'ALLTO1.csv'
analyze_threats_vs_opportunities_from_csv(csv_file_path)
