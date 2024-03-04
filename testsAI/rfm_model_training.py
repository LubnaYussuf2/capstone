import pandas as pd
from datetime import datetime
from pymongo import MongoClient


# Assuming 'df' is your DataFrame with all the data
def rfm_analysis(df):
    # Convert 'Combined_Date' to datetime if it's not already
    df['Combined_Date'] = pd.to_datetime(df['Combined_Date'])

    # Calculate Recency, Frequency, and Monetary values
    current_date = datetime.now()
    df['Recency'] = (current_date - df['Combined_Date']).dt.days
    df['Frequency'] = df['Num_of_Visits']
    df['Monetary'] = df['Total_Spendings']

    # Create RFM Segments
    r_labels = range(4, 0, -1)
    f_labels = range(1, 5)
    m_labels = range(1, 5)
    r_groups = pd.qcut(df['Recency'], q=4, labels=r_labels)
    f_groups = pd.qcut(df['Frequency'].rank(method='first'), q=4, labels=f_labels)
    m_groups = pd.qcut(df['Monetary'], q=4, labels=m_labels)

    df['R'] = r_groups
    df['F'] = f_groups
    df['M'] = m_groups

    # Combine RFM quartile values to create RFM Segments
    df['RFM_Segment'] = df.apply(lambda x: str(x['R']) + str(x['F']) + str(x['M']), axis=1)
    df['RFM_Score'] = df[['R', 'F', 'M']].sum(axis=1)

    # Score thresholds for clusters
    score_thresholds = {
        'Top': 9,
        'High': 7,
        'Middle': 5,
        'Low': 3
    }

    # Function to assign clusters based on RFM score
    def assign_cluster(x):
        if x >= score_thresholds['Top']:
            return 'Top'
        elif x >= score_thresholds['High']:
            return 'High'
        elif x >= score_thresholds['Middle']:
            return 'Middle'
        else:
            return 'Low'

    # Calculate RFM Score and assign clusters
    df['RFM_Score'] = df['R'].astype(int) + df['F'].astype(int) + df['M'].astype(int)
    df['cluster'] = df['RFM_Score'].apply(assign_cluster)

    return df


# Connect to MongoDB
client = MongoClient("mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority")
db = client['capstone']
collection = db['capstone']

# Retrieve data from MongoDB
tourism_data = list(collection.find())

# Convert MongoDB data to DataFrame
df = pd.DataFrame(tourism_data)

# Perform RFM analysis and assign clusters
df = rfm_analysis(df)

# Update MongoDB with assigned clusters
for index, row in df.iterrows():
    collection.update_one({'_id': row['_id']}, {'$set': {'cluster': row['cluster']}})

print("Clusters assigned and updated in the MongoDB database.")
