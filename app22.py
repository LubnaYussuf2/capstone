from flask import Flask, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
from pymongo import MongoClient
from google.cloud import firestore

import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/nihni/OneDrive/Desktop/capstone/capstone2024-2c97b-firebase-adminsdk-xcv7f-0206a3ac43.json"

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db_mongo = client['capstone_features_database']  # Renamed to avoid conflict with Firestore db variable


#test


app = Flask(__name__)

# Initialize Firebase
cred = credentials.Certificate("/Users/nihni/OneDrive/Desktop/capstone/capstone2024-2c97b-firebase-adminsdk-xcv7f-0206a3ac43.json")
firebase_admin.initialize_app(cred)
#db = firestore.client()

# Initialize Firestore client
db = firestore.Client()

@app.route('/')
def hello():
    return 'Hello, World!'



# Route to save data to Firestore
@app.route('/save-data')
def save_data():
    data = {
        'name': 'John Doe',
        'email': 'john@example.com'
    }
    # Add a new document with a generated ID
    db.collection('users').add(data)
    return 'Data saved successfully'



# Route to retrieve data from Firestore
@app.route('/get-data')
def get_data():
    users_ref = db.collection('users')
    users = users_ref.get()
    data = []
    for user in users:
        data.append(user.to_dict())
    return jsonify(data)



# In your Flask route or wherever you want to perform database operations
@app.route('/mongo')
def index():
    try:
        # Example: Query documents from MongoDB
        result = db_mongo.capstone.find_one({"name": "Ernest Barnes"})  # Replace 'capstone' with your collection name

        if result:
            return f"Hello {result['name']}"
        else:
            return "No matching document found in the 'capstone' collection."

    except Exception as e:
        return f"An error occurred: {str(e)}"



# @app.route('/get_data')
# def get_data():
#     # Example: Fetch data from a Firestore collection
#     data = db.collection('your_collection').document('your_document').get().to_dict()
#     return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
