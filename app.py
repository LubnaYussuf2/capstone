from flask import Flask, jsonify
import firebase_admin
from firebase_admin import credentials, firestore

from google.cloud import firestore

import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/tumaalshirazi/Documents/Lubna/Winter2024/Capstone2024/capstone/capstone2024-2c97b-firebase-adminsdk-xcv7f-0206a3ac43.json"

#test


app = Flask(__name__)

# Initialize Firebase
cred = credentials.Certificate("/Users/tumaalshirazi/Documents/Lubna/Winter2024/Capstone2024/capstone/capstone2024-2c97b-firebase-adminsdk-xcv7f-0206a3ac43.json")
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



# @app.route('/get_data')
# def get_data():
#     # Example: Fetch data from a Firestore collection
#     data = db.collection('your_collection').document('your_document').get().to_dict()
#     return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
