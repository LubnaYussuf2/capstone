from pymongo import MongoClient
from bson import ObjectId  # Import ObjectId from bson module


client = MongoClient('mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority&appName=Cluster0')
db = client['capstone']
dataCollection = db['data']
reviewCollection = db['review']
packageCollection = db['package']


#-------------------------------------------------------------
def get_all_customer_data():
    data = []
    cursor = dataCollection.find({})

    for document in cursor:
        data.append(document)

    return data



def get_one_customer_data(customer_id):
    customer = dataCollection.find_one({"Tourist_ID": int(customer_id)})
    review = reviewCollection.find_one({"Tourist_ID": int(customer_id)})
    packages = packageCollection.find()

    if review:
        # Remove the ObjectId field from review
        del review['_id']
        customer["review"] = review

    custPackages = []

    for i in packages:
        if i["Tourist_ID"] ==  int(customer_id):
            # Remove the ObjectId field from each package
            del i['_id']
            custPackages.append(i)

    if custPackages:
        customer["packages"] = custPackages

    # Remove the ObjectId field from customer
    if '_id' in customer:
        del customer['_id']
    
    return customer
