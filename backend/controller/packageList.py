from flask import jsonify

from model.packageList import get_pack_data

def get_package():
    sales = get_pack_data()

    if sales:
        # return sales
        return jsonify(sales)
    else:
        return "no data"
