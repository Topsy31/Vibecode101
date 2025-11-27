# Completness and Complexity box plot

import pandas as pd
import matplotlib.pyplot as plt

# Assuming the DataFrame is loaded from a CSV file named 'ALLTO1.csv'
df = pd.read_csv('ALLTO1.csv')

# Preparing the data for plotting
data_to_plot = [df['Completeness_Level'], df['Complexity_Level']]

# Creating the box plot
plt.figure(figsize=(8, 6))
plt.boxplot(data_to_plot, labels=['Completeness', 'Complexity'])
plt.title('Box Plot of Completeness and Complexity Levels')
plt.ylabel('Level')
plt.grid(True)

# Display the plot
plt.show()
