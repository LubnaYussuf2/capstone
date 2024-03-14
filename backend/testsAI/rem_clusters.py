from pymongo import MongoClient
import random


def remove_cluster_from_percentage_of_data(percentage):
    client = MongoClient("mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority")
    db = client['capstone']
    collection = db['capstone']

    # Calculate the number of documents to update
    total_documents = collection.count_documents({})
    documents_to_update = int(total_documents * percentage)

    # Get all document IDs
    document_ids = [doc['_id'] for doc in collection.find({}, {'_id': 1})]

    # Randomly select a subset of document IDs to update
    ids_to_update = random.sample(document_ids, documents_to_update)

    # Update the selected documents to clear the 'cluster' field
    collection.update_many({'_id': {'$in': ids_to_update}}, {'$set': {'cluster': ""}})

    print(f"Cleared 'cluster' from {documents_to_update} documents.")
