from pymongo import MongoClient
import pandas as pd
import joblib
from sklearn.preprocessing import LabelEncoder
import numpy as np

class CustomLabelEncoder(LabelEncoder):
    def fit(self, y):
        super().fit(y)
        self.classes_ = np.append(self.classes_, 'unknown')  # Add 'unknown' as a new class
        return self

    def transform(self, y):
        y = np.array(y)
        unknown_mask = ~np.isin(y, self.classes_)  # Mask for unknown categories
        y[unknown_mask] = 'unknown'  # Replace unknown categories with 'unknown'
        return super().transform(y)

def fill_empty_clusters():
    # Load the trained model and feature encoders
    rf_model = joblib.load('random_forest_model.pkl')
    feature_encoders = joblib.load('feature_encoders.pkl')

    # Connect to MongoDB
    client = MongoClient("mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority")
    db = client['capstone']
    collection = db['capstone']

    # Fetch documents where 'cluster' is empty
    documents = list(collection.find({'cluster': ''}))

    # If no documents to update, exit
    if not documents:
        print("No documents with empty 'cluster' to update.")
        return

    # Prepare a list of columns to fetch from MongoDB
    feature_names = list(feature_encoders.keys())

    # Convert documents to DataFrame
    df = pd.DataFrame(documents)

    # Ensure feature names are aligned
    common_feature_names = set(feature_names) & set(df.columns)

    # Check for any missing feature names
    if not common_feature_names:
        print("Error: No common feature names found between the data and the feature encoders.")
        return

    # Iterate over each common feature and encode it
    for col in common_feature_names:
        encoder = feature_encoders[col]
        label_encoder = CustomLabelEncoder()
        label_encoder.fit(encoder.classes_)
        df[col] = label_encoder.transform(df[col].astype(str))

    # Predict the 'cluster' for each document
    X = df[list(common_feature_names)]
    y_pred = rf_model.predict(X)

    # Update the documents in MongoDB with the new 'cluster' values
    for i, doc in enumerate(documents):
        predicted_cluster = y_pred[i]
        # Update the document with the predicted cluster
        collection.update_one({'_id': doc['_id']}, {'$set': {'cluster': predicted_cluster}})

    print(f"Updated {len(documents)} documents with predicted clusters.")
