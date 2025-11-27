# This code combines E and H into a single chart


import pandas as pd
import matplotlib.pyplot as plt

def plot_total_threats_vs_opportunities(csv_file_path):
    # Load the data
    df = pd.read_csv(csv_file_path)
    
    # Calculate the total number of threats and opportunities
    total_threats = df['Open_Threats'].sum()
    total_opportunities = df['Open_Opportunities'].sum()
    
    # Data for plotting
    categories = ['Total Threats', 'Total Opportunities']
    totals = [total_threats, total_opportunities]
    colors = ['red', 'green']
    
    # Plotting
    fig, ax = plt.subplots()
    ax.bar(categories, totals, color=colors)
    
    ax.set_ylabel('Total Number')
    ax.set_title('Total Number of Threats vs. Opportunities')
    
    plt.tight_layout()
    plt.show()


# Replace 'your_file_path.csv' with the actual path to your CSV file
csv_file_path = 'ALLTO1.csv'
plot_total_threats_vs_opportunities(csv_file_path)
