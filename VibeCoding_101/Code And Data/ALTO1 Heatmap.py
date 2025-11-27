#Heat Map of complexity against completeness with ratio of threat to opportunity

import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load your dataset
file_path = 'ALLTO1.csv'  # Make sure to replace this with the actual file path
data = pd.read_csv(file_path)

# Prepare the data by calculating the ratio of threats to opportunities
data['Opportunities_Adjusted'] = data['Open_Opportunities'].replace(0, 0.01)
data['Threats_to_Opportunities_Ratio'] = data['Open_Threats'] / data['Opportunities_Adjusted']

# Aggregate the data to find the mean ratio for each complexity and completeness level
grouped_data = data.groupby(['Complexity_Level', 'Completeness_Level'])['Threats_to_Opportunities_Ratio'].mean().reset_index()

# Pivot the data for heatmap plotting
pivot_table = grouped_data.pivot(index="Complexity_Level", columns="Completeness_Level", values="Threats_to_Opportunities_Ratio")

# Visualize the data using a heatmap
plt.figure(figsize=(10, 8))
heatmap = sns.heatmap(pivot_table, annot=True, fmt=".2f", cmap='RdYlGn_r', linewidths=.5)
heatmap.set_title('Heatmap of Complexity vs Completeness with Threats to Opportunities Ratio', pad=20)
heatmap.set_xlabel('Completeness Level')
heatmap.set_ylabel('Complexity Level')
plt.show()
