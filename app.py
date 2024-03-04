from flask import Flask, jsonify
from flask_pymongo import PyMongo
import firebase_admin
from firebase_admin import credentials, firestore as admin_firestore
import os
from testsAI.rfm_analysis import perform_rfm_analysis_and_update_mongodb
from testsAI.training_random_forest import fetch_data_from_mongodb, train_random_forest_model

# Set environment variable for Google credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:\\Users\\Lenovo\\capstone\\capstone2024-2c97b-firebase-adminsdk-xcv7f-0206a3ac43.json"

app = Flask(__name__)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("C:\\Users\\Lenovo\\capstone\\capstone2024-2c97b-firebase-adminsdk-xcv7f-0206a3ac43.json")
firebase_admin.initialize_app(cred)

# Firestore client
firebase_db = admin_firestore.client()

# Configure Flask app for MongoDB
app.config["MONGO_URI"] = "mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority&appName=Cluster0"
mongo = PyMongo(app)
# print(mongo.db)
mongo_db = mongo.db  # This is the MongoDB database instance


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/mongo')
def mongo_test():
    # Example: Find one document in the 'capstone' collection
    some_document = mongo_db.capstone.find_one()

    # Convert ObjectId to string for JSON serialization
    if some_document:
        some_document['_id'] = str(some_document.get('_id'))

    # Convert the document to a JSON response
    return jsonify(some_document) if some_document else "No document found"


@app.route('/perform_rfm_analysis')
def perform_rfm_analysis_route():
    # Call the function to perform RFM analysis and update MongoDB
    perform_rfm_analysis_and_update_mongodb()

    # You can return a response if needed
    return 'RFM analysis completed and MongoDB updated.'


@app.route('/train_randomforest')
def training():
    df = fetch_data_from_mongodb()
    train_random_forest_model(df)
    return "Model training initiated. Check server logs for completion status."


if __name__ == '__main__':
    app.run(debug=True)
