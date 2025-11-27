#Paired T and P for division H and E

import pandas as pd
from scipy.stats import ttest_rel

def analyze_threats_vs_opportunities_by_project_type(csv_file_path):
    # Load the data from a CSV file
    df = pd.read_csv(csv_file_path)
    
    # Filter data for project type E
    df_e = df[df['Project Identifier'].str.startswith('E')]
    # Perform the paired samples t-test for E projects
    if not df_e.empty and len(df_e) > 1:  # Ensure there are enough data points for a test
        t_stat_e, p_value_e = ttest_rel(df_e['Open_Threats'], df_e['Open_Opportunities'])
        print(f"E Projects - T-statistic: {t_stat_e}, P-value: {p_value_e}")
    else:
        print("Not enough data for E projects to perform t-test.")
    
    # Filter data for project type H
    df_h = df[df['Project Identifier'].str.startswith('H')]
    # Perform the paired samples t-test for H projects
    if not df_h.empty and len(df_h) > 1:  # Ensure there are enough data points for a test
        t_stat_h, p_value_h = ttest_rel(df_h['Open_Threats'], df_h['Open_Opportunities'])
        print(f"H Projects - T-statistic: {t_stat_h}, P-value: {p_value_h}")
    else:
        print("Not enough data for H projects to perform t-test.")
    
    # Interpret the results for both project types
    alpha = 0.05
    if not df_e.empty and len(df_e) > 1:
        if p_value_e / 2 < alpha and t_stat_e > 0:
            print("For E Projects, we reject the null hypothesis. There are significantly more threats than opportunities.")
        else:
            print("For E Projects, we fail to reject the null hypothesis. There is not a significant difference between the number of threats and opportunities.")
    
    if not df_h.empty and len(df_h) > 1:
        if p_value_h / 2 < alpha and t_stat_h > 0:
            print("For H Projects, we reject the null hypothesis. There are significantly more threats than opportunities.")
        else:
            print("For H Projects, we fail to reject the null hypothesis. There is not a significant difference between the number of threats and opportunities.")

# Replace 'ALLTO1.csv' with the actual path to your CSV file
csv_file_path = 'ALLTO1.csv'
analyze_threats_vs_opportunities_by_project_type(csv_file_path)
