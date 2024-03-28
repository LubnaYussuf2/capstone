# training_random_forest.py
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pickle


def train_and_save_random_forest_model(collection):
    # Fetch data from MongoDB collection
    data = list(collection.find())
    df = pd.DataFrame(data)
    # Prepare your data for training here
    X = df.drop(['_id', 'cluster', 'Combined_Date'], axis=1)  # Features
    y = df['cluster']  # Target variable

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Initialize and train the Random Forest model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Save the trained model as a pickle file
    with open('random_forest_model.pkl', 'wb') as file:
        pickle.dump(model, file)

    print("Model training complete and saved as random_forest_model.pkl")
