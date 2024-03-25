from flask import jsonify

from model.customerSatisfaction import get_review_data

def get_review():
    review = get_review_data()

    if review:
        # return sales
        return jsonify(review)
    else:
        return "no data"
