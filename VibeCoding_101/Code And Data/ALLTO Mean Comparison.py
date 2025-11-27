#This plot compares the mean of the values from E and H


import pandas as pd
import matplotlib.pyplot as plt

def analyze_and_plot(csv_file_path):
    # Load the data
    df = pd.read_csv(csv_file_path)
    
    # Separate the projects
    e_projects = df[df['Project Identifier'].str.startswith('E')]
    h_projects = df[df['Project Identifier'].str.startswith('H')]
    
    # Calculate mean values for each category
    summary_data = {
        'Metric': ['Completeness Level', 'Complexity Level', 'Open Threats', 'Open Opportunities'],
        'E Projects Mean': [
            e_projects['Completeness_Level'].mean(),
            e_projects['Complexity_Level'].mean(),
            e_projects['Open_Threats'].mean(),
            e_projects['Open_Opportunities'].mean()
        ],
        'H Projects Mean': [
            h_projects['Completeness_Level'].mean(),
            h_projects['Complexity_Level'].mean(),
            h_projects['Open_Threats'].mean(),
            h_projects['Open_Opportunities'].mean()
        ]
    }
    
    summary_df = pd.DataFrame(summary_data)
    
    # Plotting
    fig, ax = plt.subplots(figsize=(10, 6))
    bar_width = 0.35
    index = summary_df.index

    rects1 = ax.bar(index - bar_width/2, summary_df['E Projects Mean'], bar_width, label='E Projects')
    rects2 = ax.bar(index + bar_width/2, summary_df['H Projects Mean'], bar_width, label='H Projects')

    ax.set_xlabel('Metric')
    ax.set_ylabel('Mean Values')
    ax.set_title('Comparative Analysis across Completeness, Complexity, Threats, and Opportunities')
    ax.set_xticks(index)
    ax.set_xticklabels(summary_df['Metric'])
    ax.legend()

    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

# Replace 'your_file_path.csv' with the path to your CSV file
csv_file_path = 'ALLTO1.csv'
analyze_and_plot(csv_file_path)
