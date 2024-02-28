from flask import Flask, request, jsonify, render_template
import pandas as pd
import pickle

app = Flask(__name__)

# Load the trained RandomForest model
# model_path = "C:/Users/nihni/OneDrive/Desktop/capstone/testsAI/random_forest_model.pkl"
model_path = "random_forest_model.pkl"
with open(model_path, 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/')
def index():
    # Serve the HTML form using render_template
    return render_template('index.html')

# ... (rest of your code)

if __name__ == '__main__':
    app.run(debug=True)
