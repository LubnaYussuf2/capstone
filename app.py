from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import firebase_admin
from firebase_admin import credentials, firestore as admin_firestore
import os
from bson.json_util import dumps
from testsAI.ai_profiling import run_ai_profiling
import pandas as pd

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

@app.route('/ai_profiling', methods=['GET'])
def ai_profiling_route():
    page = int(request.args.get('page', 1))
    pageSize = int(request.args.get('pageSize', 1000))
    offset = (page - 1) * pageSize
    
    # Fetch paginated data from MongoDB
    cursor = mongo_db['capstone'].find().skip(offset).limit(pageSize)
    tourism_data = list(cursor)
    
    # Convert ObjectId to string for JSON serialization
    for doc in tourism_data:
        doc['_id'] = str(doc['_id'])
    
    # Convert the list of dictionaries to a DataFrame
    df = pd.DataFrame(tourism_data)
    
    # Assuming run_ai_profiling accepts a DataFrame and returns a dictionary
    # You might need to adjust arguments based on your actual function definition
    profiling_results = run_ai_profiling(df, 'Combined_Date', 'Num_of_Visits', 'Total_Spendings')
    
    # Prepare and return the response
    response = {
        'profilingResults': profiling_results,
        'page': page,
        'pageSize': pageSize
    }
    return jsonify(response)


# # Route to save data to Firestore
# @app.route('/save-data')
# def save_data():
#     data = {
#         'name': 'John Doe',
#         'email': 'john@example.com'
#     }
#     # Add a new document with a generated ID to Firestore 'users' collection
#     firebase_db.collection('users').add(data)
#     return 'Data saved successfully'


if __name__ == '__main__':
    app.run(debug=True)
