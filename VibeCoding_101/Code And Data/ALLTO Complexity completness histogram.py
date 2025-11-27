# Completness and Complexity as a histogram

import pandas as pd
import matplotlib.pyplot as plt

# Load the DataFrame from a CSV file named 'ALLTO1.csv'
df = pd.read_csv('ALLTO1.csv')

# Setting up the figure and axes for the side-by-side histograms
fig, axs = plt.subplots(1, 2, figsize=(12, 6))

# Plotting the histogram for Completeness Level
axs[0].hist(df['Completeness_Level'], bins='auto', color='skyblue', alpha=0.7, rwidth=0.85)
axs[0].set_title('Completeness Level Distribution')
axs[0].set_xlabel('Completeness Level')
axs[0].set_ylabel('Frequency')

# Plotting the histogram for Complexity Level
axs[1].hist(df['Complexity_Level'], bins='auto', color='orange', alpha=0.7, rwidth=0.85)
axs[1].set_title('Complexity Level Distribution')
axs[1].set_xlabel('Complexity Level')
# The y-axis label is omitted for the second histogram for clarity, as it shares the same scale and label as the first

plt.tight_layout()  # Adjusts the padding between and around subplots
plt.show()
