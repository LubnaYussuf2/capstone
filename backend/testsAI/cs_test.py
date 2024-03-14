from flask import Flask
from pymongo import MongoClient
import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import matplotlib.pyplot as plt
from io import BytesIO
import base64

app = Flask(__name__)

def analyze_sentiment():
    # Connect to MongoDB
    client = MongoClient('localhost', 27017)
    db = client['Capstone']  
    collection = db['Capstone'] 

    # Fetch data from MongoDB
    data = []
    for doc in collection.find():
        text = doc.get('Review')
        if text:
            data.append(text)  # Assuming 'Rating_Words' is the field containing the text data

    if not data:
        # Handle case where no data is retrieved
        return pd.DataFrame(), ''

    # Perform sentiment analysis
    sid = SentimentIntensityAnalyzer()
    sentiment_scores = []
    for text in data:
        try:
            score = sid.polarity_scores(text)['compound']
            sentiment_scores.append(score)
        except Exception as e:
            print(f"Error analyzing sentiment for text '{text}': {e}")

    # Classify sentiments
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

    sentiments = [classify_sentiment(score) for score in sentiment_scores]

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

#if __name__ == '__main__':
    #app.run(debug=True)

