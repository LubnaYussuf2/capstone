from flask import jsonify

from model.data import get_data_collection

def get_data_col():
    data = get_data_collection()

    if data:
        # return sales
        return jsonify(data)
    else:
        return "no data"