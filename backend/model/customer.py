from pymongo import MongoClient

client = MongoClient('mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority&appName=Cluster0')
db = client['capstone']
collection = db['data']


#-------------------------------------------------------------
def get_all_customer_data():
    data = []
    cursor = collection.find({})

    for document in cursor:
        data.append(document)

    return data



def get_one_customer_data(customer_id):
    customer = collection.find_one({"Tourist_ID": int(customer_id)})
    return customer


