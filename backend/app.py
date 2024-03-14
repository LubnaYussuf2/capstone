from flask import Flask, jsonify
from flask_pymongo import PyMongo
import firebase_admin
from firebase_admin import credentials, firestore as admin_firestore
import os
from testsAI.rfm_analysis import perform_rfm_analysis_and_update_mongodb
from testsAI.training_random_forest import fetch_data_from_mongodb, train_random_forest_model
from testsAI.targeted_marketing import perform_targetted_marketing_and_update_mongodb
from testsAI.rem_clusters import remove_cluster_from_percentage_of_data
from testsAI.predict_clusters import fill_empty_clusters
from flask import Flask, render_template
from testsAI import cs_test  

from flask_cors import CORS
from pymongo import MongoClient
import csv

from controller.customer import get_mongodata




# Set environment variable for Google credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/tumaalshirazi/Documents/Lubna/Winter2024/Capstone2024/capstone/backend/capstone2024-2c97b-firebase-adminsdk-xcv7f-0206a3ac43.json"

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


# Initialize Firebase Admin SDK
cred = credentials.Certificate("/Users/tumaalshirazi/Documents/Lubna/Winter2024/Capstone2024/capstone/backend/capstone2024-2c97b-firebase-adminsdk-xcv7f-0206a3ac43.json")
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


@app.route('/api/mongodata')
def api_mongodata():
    return get_mongodata()
    # data = []
    # cursor = collection.find({})
    # for document in cursor:
    #     data.append(document)

    # # response_data = {"customers" : data}
    # # print(data)

    # customers = []
    # for i in data:
    #     # Access values using dictionary keys
    #     customer = {"name": i.get("name"), "age": i.get("Age"), "gender": i.get("gender")}
    #     customers.append(customer)

    # print(customers)

    # if customers:
    #     return jsonify({'customers': customers})
    # else:
        # return "no data"



@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/api/csvdata')
def get_csvdata():
    data = []
    with open('testsAI/tourism_df.csv', newline='') as csvfile: 
        csvreader = csv.DictReader(csvfile)
        for row in csvreader:
            data.append(row)
    return jsonify(data)


@app.route("/members")
def members():
    response_data = {"members" : ["Member 1", "Member 2", "Member 3"]}
    print("Response data:", response_data)
    return jsonify(response_data)



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