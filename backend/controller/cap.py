from flask import jsonify
# functions
from model.cap import get_all_cap_data


def get_all_cap():
    customers = get_all_cap_data()

    customerData = []
    counter = 1

    for i in customers:
        customer = {"id": i.get("Tourist_ID"),
                    "Year": i.get("Year"), 
                    "Month": i.get("Month")
                    }
        customerData.append(customer)
        counter = counter + 1

    if customers:
        return jsonify(customerData)
    else:
        return "no data"

