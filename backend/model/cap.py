from pymongo import MongoClient

client = MongoClient('mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority&appName=Cluster0')
db = client['capstone']
collection = db['capstone']


#-------------------------------------------------------------
def get_all_cap_data():
    data = []
    cursor = collection.find({})

    for document in cursor:
        data.append(document)

    return data



