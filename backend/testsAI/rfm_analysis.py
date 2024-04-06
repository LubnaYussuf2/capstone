import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans


def perform_rfm_analysis(collection):
    # Fetch data from MongoDB and convert to DataFrame
    data = list(collection.find())
    df = pd.DataFrame(data)

    # Ensure 'Combined_Date' is in datetime format and perform calculations
    df['Combined_Date'] = pd.to_datetime(df['Combined_Date'])
    most_recent_date = df['Combined_Date'].max()
    df['Recency'] = (most_recent_date - df['Combined_Date']).dt.days
    df['Frequency'] = df['Num_of_Visits']
    df['Monetary'] = df['Total_Spendings']

    # Normalize the RFM scores
    scaler = StandardScaler()
    rfm_scaled = scaler.fit_transform(df[['Recency', 'Frequency', 'Monetary']])

    # Clustering with KMeans
    kmeans = KMeans(n_clusters=4, random_state=42)
    df['cluster'] = kmeans.fit_predict(rfm_scaled)

    # Return the DataFrame with the added 'cluster' column
    return df
