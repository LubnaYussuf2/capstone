from flask import jsonify

from model.sales import get_sales_data

def get_sales():
    sales = get_sales_data()

    if sales:
        # return sales
        return jsonify(sales)
    else:
        return "no data"
