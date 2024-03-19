from pymongo import MongoClient

client = MongoClient('mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority&appName=Cluster0')
db = client['capstone']
collection = db['sales']

#-------------------------------------------------------------

def get_sales_data():
    data = []
    cursor = collection.find({})

    for document in cursor:
        # Convert ObjectId to string for _id field
        document['_id'] = str(document['_id'])
        data.append(document)
    
    return data
