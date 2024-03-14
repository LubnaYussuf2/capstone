# model/mongo_model.py

from pymongo import MongoClient

def get_customer_data():
    client = MongoClient('mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority&appName=Cluster0')
    db = client['capstone']
    collection = db['capstone']

    data = []
    cursor = collection.find({})

    for document in cursor:
        data.append(document)

    return data
