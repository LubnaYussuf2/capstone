import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import matplotlib.pyplot as plt
from io import BytesIO
import base64
from flask import Flask
from flask_pymongo import PyMongo
import matplotlib
matplotlib.use('Agg')  # Use a non-GUI backend



app = Flask(__name__)


def analyze_sentiment():
    # Configure Flask app for MongoDB
    app.config["MONGO_URI"] = "mongodb+srv://capstonegirls2024:capstoneWinter2024@cluster0.xgvhmkg.mongodb.net/capstone?retryWrites=true&w=majority&appName=Cluster0"
    mongo = PyMongo(app)
    db = mongo.db  # This is the MongoDB database instance  
    collection = db.review

    # Define the classify_sentiment function
    def classify_sentiment(score):
        if score >= 0.8:
            return 'Very Positive'
        elif 0.6 <= score < 0.8:
            return 'Positive'
        elif -0.2 <= score < 0.6:
            return 'Neutral'
        elif -0.6 <= score < -0.2:
            return 'Negative'
        else:
            return 'Very Negative'

    # Fetch data from MongoDB and store it in a list
    cursor = collection.find()
    documents = list(cursor)

    # Extract text data from documents
    data = [doc.get('Review') for doc in documents if doc.get('Review')]
    sentiment_scores = []

    # Perform sentiment analysis for each text
    try:
        sid = SentimentIntensityAnalyzer()
        sentiment_scores = [sid.polarity_scores(text)['compound'] for text in data]
    except Exception as e:
        print(f"Error analyzing sentiment: {e}")

    if not data:
        # Handle case where no data is retrieved
        print("No data found in the MongoDB collection.")
        return pd.DataFrame(), '', pd.DataFrame()

    print("Length of data:", len(data))
    print("Length of sentiment_scores:", len(sentiment_scores))

    # Create sentiments after sentiment_scores is populated
    sentiments = [classify_sentiment(score) for score in sentiment_scores]

    # Update MongoDB documents with sentiment scores and classifications
    for doc, score, sentiment in zip(documents, sentiment_scores, sentiments):
        try:
            collection.update_one(
                {'_id': doc['_id']},
                {'$set': {'sentiment_score': score, 'sentiment_classification': sentiment}}
            )
        except Exception as e:
            print(f"Error updating document with sentiment score: {e}")
            print(f"Document that caused the error: {doc}")

    # Create DataFrame
    df = pd.DataFrame({'Rating_Words': data, 'SentimentScore': sentiment_scores, 'Sentiment': sentiments})

    # Create a bar plot
    plt.figure(figsize=(8, 5))
    df['Sentiment'].value_counts().sort_index().plot(kind='bar', color=['#3CB371', '#98FB98', '#FFFF99', '#FF6347', '#FF4500'])
    plt.title('Customer Satisfaction Analysis', fontsize=16)
    plt.xlabel('Sentiment', fontsize=14)
    plt.ylabel('Count', fontsize=14)
    plt.xticks(fontsize=12)
    plt.yticks(fontsize=12)
    plt.tight_layout()

    # Convert the plot to base64 encoded string with error handling
    try:
        buffer = BytesIO()
        plt.savefig(buffer, format='png')
        plt.close()
        buffer.seek(0)
        plot_data = base64.b64encode(buffer.read()).decode('utf-8')
        html_plot = f'<img src="data:image/png;base64,{plot_data}" alt="Sentiment Analysis Plot">'
    except Exception as e:
        print(f"Error generating plot: {e}")
        html_plot = ''

    # Create count table
    count_table = df['Sentiment'].value_counts().reset_index()
    count_table.columns = ['Sentiment', 'Count']

    return df, html_plot, count_table


@app.route('/')
def index():
    df, html_plot, count_table = analyze_sentiment()
    
    # Calculate satisfaction percentage
    total_sentiments = count_table['Count'].sum()
    positive_sentiments = count_table[count_table['Sentiment'].isin(['Positive', 'Very Positive'])]['Count'].sum()
    satisfaction_percentage = (positive_sentiments / total_sentiments) * 100 if total_sentiments > 0 else 0
    
    # Embed the count table and the HTML plot directly in the HTML response
    html_response = f"""
    <html>
    <head>
        <title>Customer Satisfaction Analysis</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f2f2f2;
            }}
            .container {{
                max-width: 800px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }}
            h1, h2 {{
                text-align: center;
                color: #333;
            }}
            table {{
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }}
            th, td {{
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }}
            th {{
                background-color: #f2f2f2;
            }}
            img {{
                display: block;
                margin: 0 auto;
                max-width: 100%;
            }}
            .satisfaction {{
                margin-top: 20px;
                text-align: center;
            }}
            .satisfaction p {{
                font-weight: bold;
                font-size: 18px;
                color: #333;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Customer Satisfaction Analysis</h1>
            
            <h2>Count Table:</h2>
            {count_table.to_html(index=False)}

            <h2>Sentiment Analysis Plot:</h2>
            {html_plot}
            
            <div class="satisfaction">
                <p>Customer Satisfaction: {satisfaction_percentage:.2f}%</p>
            </div>
        </div>
    </body>
    </html>
    """

    return html_response
