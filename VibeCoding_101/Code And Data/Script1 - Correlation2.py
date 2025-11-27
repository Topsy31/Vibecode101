import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

data = pd.read_csv('TO1.csv')

# Group by complexity level and calculate correlation for each group
grouped_correlation = data.groupby('Complexity_Level').apply(lambda x: x[['Open_Threats', 'Open_Opportunities']].corr().iloc[0,1])
print(grouped_correlation)

# Visualize the correlation for each complexity level
grouped_correlation.plot(kind='bar', color='skyblue')
plt.title('Correlation by Complexity Level')
plt.xlabel('Complexity Level')
plt.ylabel('Correlation Coefficient')
plt.grid(axis='y')
plt.show()
