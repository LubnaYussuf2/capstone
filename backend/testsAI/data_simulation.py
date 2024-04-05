from pymongo import MongoClient
import random
from datetime import datetime

# Setup MongoDB connection
client = MongoClient('mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority&appName=Cluster0')
db = client['capstone']
profiles_col = db['profiles']
customers_col = db['customer']


def generate_random_profile(tourist_id):
    return {
        "Tourist_ID": tourist_id,
        "Income_USD": random.randint(30000, 200000),
        "Combined_Date": datetime.now().strftime("%m/%d/%Y"),
        "Num_of_Visits": random.randint(1, 20),
        "Total_Spendings": random.uniform(1000, 10000),
        "cluster": ''
    }


def generate_random_customer(tourist_id):
    return {
        "Tourist_ID": tourist_id,
        "name": "Name_" + str(tourist_id),
        "email": "email_" + str(tourist_id) + "@example.com",
        "phone-number": "555-" + str(random.randint(1000, 9999)),
        "cluster": ''
        # Add other fields with random or static data as needed
    }


# Starting Tourist_ID after the existing range to avoid duplicates
start_tourist_id = 8000

# Generate and insert data
for i in range(start_tourist_id, start_tourist_id + 1):  # Adjust the range as needed
    customer_data = generate_random_customer(i)
    profile_data = generate_random_profile(i)

    # Insert into customer first
    customers_col.insert_one(customer_data)
    # Then into profiles
    profiles_col.insert_one(profile_data)
