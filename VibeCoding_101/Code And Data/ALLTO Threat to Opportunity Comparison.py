#This code compares the number of threats to the number of opportunities across the two divisions

import pandas as pd
import matplotlib.pyplot as plt

def plot_threats_vs_opportunities(csv_file_path):
    # Load the data
    df = pd.read_csv(csv_file_path)
    
    # Calculate the mean number of threats and opportunities for each project type
    mean_threats_opportunities = df.groupby(df['Project Identifier'].str[0])[['Open_Threats', 'Open_Opportunities']].mean().reset_index()
    
    # Rename the group identifier for clarity
    mean_threats_opportunities.rename(columns={'Project Identifier': 'Project Type'}, inplace=True)
    
    # Plotting
    fig, ax = plt.subplots(figsize=(8, 6))
    bar_width = 0.35
    index = range(len(mean_threats_opportunities))
    
    ax.bar(index, mean_threats_opportunities['Open_Threats'], bar_width, label='Open Threats', color='red')
    ax.bar([p + bar_width for p in index], mean_threats_opportunities['Open_Opportunities'], bar_width, label='Open Opportunities', color='green')
    
    ax.set_xlabel('Project Type')
    ax.set_ylabel('Average Number')
    ax.set_title('Average Number of Threats vs. Opportunities by Project Type')
    ax.set_xticks([p + bar_width / 2 for p in index])
    ax.set_xticklabels(mean_threats_opportunities['Project Type'])
    ax.legend()
    
    plt.tight_layout()
    plt.show()

# Replace 'your_file_path.csv' with the actual path to your CSV file
csv_file_path = 'ALLTO1.csv'
plot_threats_vs_opportunities(csv_file_path)
