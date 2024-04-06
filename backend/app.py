from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
import firebase_admin
from firebase_admin import credentials, firestore as admin_firestore
from flask_cors import CORS
from pymongo import MongoClient
import csv
import os

from testsAI.rfm_analysis import perform_rfm_analysis_and_update_mongodb
from testsAI.training_random_forest import fetch_data_from_mongodb, train_random_forest_model
from testsAI.targeted_marketing import perform_targetted_marketing_and_update_mongodb
from testsAI.rem_clusters import remove_cluster_from_percentage_of_data
from testsAI.predict_clusters import fill_empty_clusters
from testsAI import cs_test  

# functions
from controller.cap import get_all_cap

from controller.customer import get_all_customers
from controller.customer import get_one_customer

from controller.sales import get_sales
from controller.customerSatisfaction import get_review 

from controller.data import get_data_col

from controller.packageList import get_package

# Set environment variable for Google credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/adnanfaruk/Documents/GitHub/capstone/backend/capstone2024-2c97b-firebase-adminsdk-xcv7f-0206a3ac43.json"

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


# Initialize Firebase Admin SDK
cred = credentials.Certificate("/Users/adnanfaruk/Documents/GitHub/capstone/backend/capstone2024-2c97b-firebase-adminsdk-xcv7f-0206a3ac43.json")
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
collection = db['capstone']


# test flask
@app.route('/')
def hello():
    return 'Hello, World!'


#Customers screen
@app.route('/customers')
def customers_data():
    return get_all_customers()


#Customer profile screen
@app.route('/customers/<customer_id>')
def get_customer_data(customer_id):
    return get_one_customer(customer_id)


# Sales Screen
@app.route('/sales')
def sales_data():
    # s=get_sales()
    # print(s)
    return get_sales()

#Customers count
@app.route('/cap')
def cap_data():
    return get_all_cap()

#Customers review
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
    # Call the function to perform RFM analysis and update MongoDB
    perform_rfm_analysis_and_update_mongodb()

    # You can return a response if needed
    return 'RFM analysis completed and MongoDB updated.'


@app.route('/train_randomforest')
def training():
    df = fetch_data_from_mongodb()
    train_random_forest_model(df)
    return "Model training initiated. Check server logs for completion status."


@app.route('/targeted_marketing')
def targeted_marketing():
    perform_targetted_marketing_and_update_mongodb()

    return jsonify({'message': 'Recommended package added successfully'})


@app.route('/clear_cluster')
def clear_cluster():
    remove_cluster_from_percentage_of_data(0.3)
    return jsonify({'message': 'Clusters removed successfully'})


@app.route('/fill_empty_clusters')
def fill_empty_clusters_route():
    fill_empty_clusters()
    return jsonify({'message': 'Empty clusters filled successfully'})


@app.route('/cs-test')
def cs_test_route():
    df, html_plot, count_table = cs_test.analyze_sentiment()

    # Calculate satisfaction percentage as before
    total_sentiments = count_table['Count'].sum()
    positive_sentiments = count_table[count_table['Sentiment'].isin(['Positive', 'Very Positive'])]['Count'].sum()
    satisfaction_percentage = (positive_sentiments / total_sentiments) * 100 if total_sentiments > 0 else 0

    # Render the template with the analysis results passed as context
    return render_template('cs_test_output.html', count_table=count_table, html_plot=html_plot, satisfaction_percentage=satisfaction_percentage)


# if __name__ == '__main__':
#     # app = create_app()
#     app.run('127.0.0.1', 5000)

#Merina, this is very important. Pls, leave her alone or I'll come for you.
if __name__ == "__main__":
    app.run(debug=True)
