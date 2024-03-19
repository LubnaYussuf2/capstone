from flask import jsonify

# functions
from model.customer import get_all_customer_data
from model.customer import get_one_customer_data


def get_all_customers():
    customers = get_all_customer_data()

    customerData = []
    counter = 1

    for i in customers:
        # customer = {"id": counter,
        customer = {"id": i.get("Tourist_ID"),
                    "name": i.get("name"), 
                    "age": i.get("Age"), 
                    "gender": i.get("gender"), 
                    "email": i.get("email"), 
                    "phoneno": i.get("phone-number"), 
                    "origin": i.get("arrivals_by_region"), 
                    "frequency": i.get("Frequency_of_Travel"), 
                    "visits": i.get("Num_of_Visits")
                    }
        customerData.append(customer)
        counter = counter + 1

    if customers:
        return jsonify(customerData)
    else:
        return "no data"



def get_one_customer(customer_id):
    customer = get_one_customer_data(customer_id)

    if customer:
        customer_data = {
            "id": customer.get("Tourist_ID"),
            "name": customer.get("name"),
            "age": customer.get("Age"),
            "gender": customer.get("gender"),
            "email": customer.get("email"),
            "phoneno": customer.get("phone-number"),
            "origin": customer.get("arrivals_by_region"),
            "frequency": customer.get("Frequency_of_Travel"),
            "visits": customer.get("Num_of_Visits")
        }

        print("from controller")
        print(customer_data)

        return jsonify(customer_data)
    else:
        return "Customer not found"

