from flask import Flask, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
from pymongo import MongoClient
import os
from flask_pymongo import PyMongo

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:\\Users\\Lenovo\\capstone\\capstone2024-2c97b-firebase-adminsdk-xcv7f-0206a3ac43.json"

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority&appName=Cluster0"
mongo = PyMongo(app)
# print(mongo.db)
mongo_db = mongo.db  # This is the MongoDB database instance

# Initialize Firebase
cred = credentials.Certificate("C:\\Users\\Lenovo\\capstone\\capstone2024-2c97b-firebase-adminsdk-xcv7f-0206a3ac43.json")
firebase_admin.initialize_app(cred)
db_firestore = firestore.client()  # Renamed to avoid conflict with MongoDB db variable

@app.route('/')
def hello():
    return 'Hello, World!'

# In your Flask route or wherever you want to perform database operations
@app.route('/mongo')
def index():
    try:
        # Example: Query documents from MongoDB
        result = mongo_db.capstone.find_one({"name": "Ernest Barnes"})  # Replace 'capstone' with your collection name

        if result:
            return f"Hello {result['name']}"
        else:
            return "No matching document found in the 'capstone' collection."

    except Exception as e:
        return f"An error occurred: {str(e)}"

# Route to save data to Firestore
@app.route('/save-data')
def save_data():
    data = {
        'name': 'John Doe',
        'email': 'john@example.com'
    }
    # Add a new document with a generated ID
    db_firestore.collection('users').add(data)
    return 'Data saved successfully'

# Route to retrieve data from Firestore
@app.route('/get-data')
def get_data():
    users_ref = db_firestore.collection('users')
    users = users_ref.get()
    data = []
    for user in users:
        data.append(user.to_dict())
    return jsonify(data)

if __name__ == '_main_':
    app.run(debug=True)