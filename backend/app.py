from flask import Flask, jsonify, render_template, request, session, redirect
from flask_pymongo import PyMongo
import firebase_admin
from firebase_admin import credentials, firestore as admin_firestore
from flask_cors import CORS
from pymongo import MongoClient
import csv
import os
import pickle
from threading import Thread
import logging
from bson import ObjectId
from testsAI.rfm_analysis import perform_rfm_analysis
from testsAI.training_random_forest import train_and_save_random_forest_model
from testsAI.targeted_marketing import perform_targetted_marketing_and_update_mongodb
from testsAI import cs_test
from testsAI.ai_email import generate_email_custom
from dotenv import load_dotenv
from datetime import datetime

# socket I/O

from flask_socketio import SocketIO

# functions
from controller.cap import get_all_cap

from controller.customer import get_all_customers
from controller.customer import get_one_customer

from controller.sales import get_sales
from controller.customerSatisfaction import get_review

from controller.data import get_data_col

from controller.packageList import get_package

load_dotenv()

# Set environment variable for Google credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:\\Users\\Lenovo\\capstone\\backend\\capstone2024-2c97b-firebase-adminsdk-xcv7f-0206a3ac43.json"

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


#authentication




# Initialize Firebase Admin SDK
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize Firebase Admin SDK
cred = credentials.Certificate("C:\\Users\\Lenovo\\capstone\\backend\\capstone2024-2c97b-firebase-adminsdk-xcv7f-0206a3ac43.json")
firebase_admin.initialize_app(cred)

# Firestore client
firebase_db = admin_firestore.client()

# Configure Flask app for MongoDB
app.config["MONGO_URI"] = "mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority&appName=Cluster0"
mongo = PyMongo(app)
# print(mongo.db)
mongo_db = mongo.db  # This is the MongoDB database instance


# Connect to MongoDB
client = MongoClient('mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority&appName=Cluster0')
db = client['capstone']
capstone = db['capstone']
reviews = db['reviews']
package = db['package']
customers = db['customer']
profiles = db['profiles']
collection = db['data']
collection = db['customer']
notifications_collection = db['notifications']


logging.basicConfig(level=logging.INFO)

# Load the pre-trained model
with open('C:\\Users\\Lenovo\\capstone\\backend\\random_forest_model.pkl', 'rb') as file:
    model = pickle.load(file)


def start_change_stream_listener():
    logging.info("Starting change stream listener...")
    try:
        with profiles.watch() as stream:
            for change in stream:
                logging.info(f"Detected change: {change}")
                if change["operationType"] == "insert":
                    update_clusters_for_new_profile(change)
    except Exception as e:
        logging.error("Error in change stream listener", exc_info=True)


# Function to run the listener in a separate thread
def run_change_stream_in_background():
    change_stream_thread = Thread(target=start_change_stream_listener)
    change_stream_thread.start()


def update_clusters_for_new_profile(change):
    document = change['fullDocument']
    new_tourist_id = document['Tourist_ID']

    # Prepare prediction features according to the model's expected input
    prediction_features = [
        document['Tourist_ID'],
        document['Income_USD'],
        document['Num_of_Visits'],
        document['Total_Spendings']
    ]

    # Convert prediction_features to a 2D list as expected by the predict method
    prediction_features_2d = [prediction_features]

    # Use the model to predict the cluster
    predicted_cluster = int(model.predict(prediction_features_2d)[0])

    try:
        # Update both collections with the predicted cluster
        profiles.update_one({"Tourist_ID": new_tourist_id}, {"$set": {"cluster": predicted_cluster}})
        customers.update_one({"Tourist_ID": new_tourist_id}, {"$set": {"cluster": predicted_cluster}})
        
        # Save notification to MongoDB
        notification_data = {
            'timestamp': datetime.now(),
            'message': f"Cluster updated for Tourist_ID: {new_tourist_id}, New Cluster: {predicted_cluster}",
            'status': 'unread'  # Add this line

        }
        notifications_collection.insert_one(notification_data)
        print("Notification saved to MongoDB:", notification_data)

        
        # Send message to frontend that cluster was updated
        socketio.emit('cluster_update', {'Tourist_ID': new_tourist_id})
        print("Cluster update message sent to frontend")
        socketio.emit('new_task', {
            'Tourist_ID': new_tourist_id,
            'cluster': predicted_cluster,
        })
        
    except Exception as e:
        logging.error("Error updating MongoDB document", exc_info=True)



#------------------------------

# test flask
@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/notifications')
def get_notifications():
    notifications_cursor = mongo.db.notifications.find()  # Assuming your collection is named 'notifications'
    notifications = []
    for notification in notifications_cursor:
        notification['_id'] = str(notification['_id'])  # Serialize ObjectId to string
        notifications.append(notification)
    return jsonify(notifications)

@app.route('/notifications', methods=['DELETE'])
def delete_all_notifications():
    result = notifications_collection.delete_many({})
    return jsonify({'message': f'{result.deleted_count} notifications deleted successfully'})

@app.route('/notification/read/<notification_id>', methods=['POST'])
def mark_notification_as_read(notification_id):
    result = notifications_collection.find_one_and_update(
        {'_id': ObjectId(notification_id), 'status': 'unread'},  # Check if notification is unread
        {'$set': {'status': 'read'}}
    )
    if result:
        return jsonify({'message': 'Notification marked as read'}), 200
    else:
        # Notification is already read or not found, handle gracefully
        return jsonify({'message': 'Notification already read or not found'}), 200  # Consider using 200 to indicate successful handling

    
#auth
# @app.route('/')
# def hello():
#     return 'Hello, World!'



# Customers screen
@app.route('/customers')
def customers_data():
    return get_all_customers()


# Define a constant for the number of items per page
ITEMS_PER_PAGE = 5

@app.route('/fetchdata', methods=['GET'])
def get_data():
    page = request.args.get('page', 1, type=int)
    total_items = collection.count_documents({})
    
    # Calculate the total pages based on the total number of items and items per page
    total_pages = (total_items + ITEMS_PER_PAGE - 1) // ITEMS_PER_PAGE
    
    # Calculate the starting and ending indexes for pagination
    start_index = (page - 1) * ITEMS_PER_PAGE
    end_index = min(start_index + ITEMS_PER_PAGE, total_items)

    # Fetch data for the current page
    data = []
    for document in collection.find().skip(start_index).limit(ITEMS_PER_PAGE):
        document['_id'] = str(document['_id'])
        data.append(document)

    return jsonify({
        'data': data,
        'total_pages': total_pages
    })


ITEMS_PER_PAGE = 5  # Number of items per page for pagination

@app.route('/fetchcustomer', methods=['GET'])
def get_customer():
    page = request.args.get('page', 1, type=int)
    total_items = collection.count_documents({})

    # Calculate the total pages based on the total number of items and items per page
    total_pages = (total_items + ITEMS_PER_PAGE - 1) // ITEMS_PER_PAGE

    # Calculate the starting and ending indexes for pagination
    start_index = (page - 1) * ITEMS_PER_PAGE
    end_index = min(start_index + ITEMS_PER_PAGE, total_items)

    # Fetch data for the current page
    data = []
    
    # Modify the query to sort data in descending order based on some field, for example, "_id"
    for document in collection.find().sort('_id', -1).skip(start_index).limit(ITEMS_PER_PAGE):
        document['_id'] = str(document['_id'])
        data.append(document)

    return jsonify({
        'data': data,
        'total_pages': total_pages
    })



# Customer profile screen
@app.route('/customers/<customer_id>')
def get_customer_data(customer_id):
    return get_one_customer(customer_id)


# Sales Screen
@app.route('/sales')
def sales_data():
    # s=get_sales()
    # print(s)
    return get_sales()


# Customers count
@app.route('/cap')
def cap_data():
    return get_all_cap()


# Customers review
@app.route('/review')
def review_data():
    return get_review()

#data collection
@app.route('/data')
def data_collection():
    return get_data_col()

#package collection
@app.route('/package')
def package_data():
    return get_package()

# ------------------------------------------------------------------------------------

# raw data
@app.route('/api/csvdata')
def get_csvdata():
    data = []
    with open('testsAI/tourism_df.csv', newline='') as csvfile: 
        csvreader = csv.DictReader(csvfile)
        for row in csvreader:
            data.append(row)
    return jsonify(data)


# test front end
@app.route("/members")
def members():
    response_data = {"members" : ["Member 1", "Member 2", "Member 3"]}
    print("Response data:", response_data)
    return jsonify(response_data)

# ------------------------------------------------------------------------------------

@app.route('/mongo')
def mongo_test():
    # Example: Find one document in the 'capstone' collection
    some_document = mongo_db.capstone.find_one()

    # Convert ObjectId to string for JSON serialization
    if some_document:
        some_document['_id'] = str(some_document.get('_id'))
        response_data = {"mongo" : some_document}


    # Convert the document to a JSON response
    return jsonify(response_data) if response_data else "No document found"


@app.route('/perform_rfm_analysis')
def perform_rfm_analysis_route():
    # Perform RFM analysis and get DataFrame with clusters
    df = perform_rfm_analysis(profiles)

    # Iterate over DataFrame rows and update both profiles and customers collections
    for index, row in df.iterrows():
        # Update profiles collection
        profiles.update_one(
            {'Tourist_ID': row['Tourist_ID']},  # Ensure 'Tourist_ID' is the correct field name
            {'$set': {'cluster': int(row['cluster'])}}
        )
        
        # Update customers collection
        customers.update_one(
            {'Tourist_ID': row['Tourist_ID']},  # Ensure 'Tourist_ID' is the correct field name
            {'$set': {'cluster': int(row['cluster'])}}
        )

    return jsonify({"message": "Clusters updated successfully in both profiles and customers collections"})


@app.route('/train_randomforest')
def train_random_forest_route():
    # Call the function to train the model and save it
    train_and_save_random_forest_model(profiles)
    return jsonify({"message": "Random Forest model trained and saved."})


@app.route('/targeted_marketing')
def targeted_marketing():
    perform_targetted_marketing_and_update_mongodb()

    return jsonify({'message': 'Recommended package added successfully'})



@app.route('/cs-test')
def cs_test_route():
    df, html_plot, count_table = cs_test.analyze_sentiment()

    # Calculate satisfaction percentage as before
    total_sentiments = count_table['Count'].sum()
    positive_sentiments = count_table[count_table['Sentiment'].isin(['Positive', 'Very Positive'])]['Count'].sum()
    satisfaction_percentage = (positive_sentiments / total_sentiments) * 100 if total_sentiments > 0 else 0

    # Render the template with the analysis results passed as context
    return render_template('cs_test_output.html', count_table=count_table, html_plot=html_plot, satisfaction_percentage=satisfaction_percentage)


if __name__ == "__main__":
    run_change_stream_in_background()
    app.run(debug=True)
