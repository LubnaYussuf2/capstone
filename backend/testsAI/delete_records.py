from pymongo import MongoClient

def delete_records(collection, field_name, value_threshold):
    """
    Delete records from a specified collection where the value of the given field is greater than the specified threshold.

    Parameters:
    - collection: The MongoDB collection object.
    - field_name: The name of the field to check.
    - value_threshold: The threshold value for deleting records.
    """
    delete_result = collection.delete_many({field_name: {"$gt": value_threshold}})
    print(f"Deleted {delete_result.deleted_count} records from the {collection.name} collection where {field_name} > {value_threshold}.")

def main():
    # Setup MongoDB connection
    client = MongoClient('mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority&appName=Cluster0')
    db = client['capstone']

    # Collection objects
    profiles_col = db['profiles']
    customers_col = db['customer']

    # Define the field and threshold value for deletion
    field_name = 'Tourist_ID'
    value_threshold = 7999

    # Delete records from profiles and customer collections
    delete_records(profiles_col, field_name, value_threshold)
    delete_records(customers_col, field_name, value_threshold)

if __name__ == "__main__":
    main()
