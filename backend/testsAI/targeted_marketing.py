import random
import pandas as pd
from pymongo import MongoClient


def perform_targetted_marketing_and_update_mongodb():
    # Connect to MongoDB
    client = MongoClient("mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority")
    db = client['capstone']
    collection = db['capstone']

    # Retrieve data from MongoDB
    tourism_data = list(collection.find())

    # Convert MongoDB data to DataFrame
    df = pd.DataFrame(tourism_data)

    # Perform RFM analysis and assign clusters
    df = assign_package(df)

    # Update MongoDB with assigned recommended packages
    for index, row in df.iterrows():
        collection.update_one({'_id': row['_id']}, {'$set': {'Recommended_package': row['Recommended_package']}})

    print("Recommended packages updated in the MongoDB database.")



def assign_package(df):

    basic_packages = ["Sightseeing Tours", "Adventure Tours", "Cultural Exploration Package"]
    standard_packages = ["Cultural Tours", "Beach and Resort Tours"]
    premium_packages = ["Luxury and VIP Tours", "Adventure and Wellness Escape"]

    # Function to assign package to each row
    def assign_package_row(row):
        if row['package_types'] == 'Basic':
            return random.choice(basic_packages)
        elif row['package_types'] == 'Standard':
            return random.choice(standard_packages)
        elif row['package_types'] == 'Premium':
            return random.choice(premium_packages)
        else:
            return ''
        
    # Add a new column 'Recommended_package' to DataFrame
    df['Recommended_package'] = df.apply(assign_package_row, axis=1)

    return df