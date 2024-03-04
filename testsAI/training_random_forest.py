from pymongo import MongoClient
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder


def fetch_data_from_mongodb():
    # Connect to MongoDB and fetch data
    client = MongoClient("mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority")
    db = client['capstone']
    collection = db['capstone']
    tourism_data = list(collection.find())
    df = pd.DataFrame(tourism_data)
    return df

def encode_features(df, categorical_columns):
    """Encode categorical columns using LabelEncoder."""
    label_encoders = {}
    for col in categorical_columns:
        label_encoder = LabelEncoder()
        df[col] = label_encoder.fit_transform(df[col])
        label_encoders[col] = label_encoder
    return df, label_encoders


def train_random_forest_model(df):
    # Identify categorical feature columns including 'cluster'
    categorical_columns = df.select_dtypes(include=['object', 'category']).columns.tolist()
    
    # Encode the categorical features in place
    df, feature_encoders = encode_features(df, categorical_columns)
    
    # Now 'cluster' is encoded along with the other categorical columns
    # Make sure 'cluster' is in the list of categorical_columns

    # Store the encoded 'cluster' values in a separate variable before dropping
    y = df['cluster']

    # Drop non-feature columns to create the features DataFrame X
    non_feature_columns = ['_id', 'Tourist_ID', 'Reservation_ID', 'passport_number', 
                           'name', 'email', 'phone-number', 'credit_card', 'zipcode', 'Review','cluster']
    X = df.drop(non_feature_columns, axis=1)

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train the Random Forest Classifier
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_model.fit(X_train, y_train)

    # Save the model and the feature encoders to disk
    joblib.dump(rf_model, 'random_forest_model.pkl')
    joblib.dump(feature_encoders, 'feature_encoders.pkl')

    print("Model and feature encoders trained and saved.")
