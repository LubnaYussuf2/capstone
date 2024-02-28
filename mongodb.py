from flask import Flask
from flask_pymongo import PyMongo


app = Flask(__name__)


app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)


@app.route('/')
def hello():
    return 'Hello, beautiful!'


app.run(debug=True)
