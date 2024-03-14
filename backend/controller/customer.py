from flask import jsonify
from model.customer import get_customer_data

def get_mongodata():
    customers = get_customer_data()

    customerData = []

    for i in customers:
        customer = {"name": i.get("name"), 
                    "age": i.get("Age"), 
                    "gender": i.get("gender"), 
                    "email": i.get("email"), 
                    "phoneno": i.get("phone-number"), 
                    "origin": i.get("arrivals_by_region"), 
                    "frequency": i.get("Frequency_of_Travel"), 
                    "visits": i.get("Num_of_Visits")
                    }
        customerData.append(customer)

    if customers:
        return jsonify({'customers': customerData})
    else:
        return "no data"
