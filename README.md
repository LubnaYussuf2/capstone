# Capstone Project Winter 2024

Nomad Manager is an AI-driven CRM built for travel and tourism agencies — helping agents manage clients, track leads, and get AI-assisted insight into who to prioritize and what to offer them.

## What it does

- **Client & lead management** — a central dashboard for tracking clients and their status through the sales pipeline
- **AI-powered lead scoring** — uses NLP to analyze client communication and surface which leads are most likely to convert
- **Sentiment analysis** — flags client sentiment from messages/interactions, so agents can catch dissatisfaction or high interest early
- **Recommendations** — suggests packages/offers tailored to each client based on their profile and history
- **Live updates** — real-time dashboard notifications via WebSockets, so agents see changes as they happen
- **Analytics dashboard** — visualizes client and pipeline data with charts (built with Recharts / Chart.js)


## Team

Built by a 6-person team split into an AI subteam and a dev team. The dev team built the application layer, i.e., the React frontend, the Flask backend, API integration, real-time features, and the analytics dashboards. The AI subteam built the underlying ML/NLP models and supplied the data our app consumes.



## Tech stack

**Backend:** Flask, PyMongo (MongoDB), Firebase Admin, Flask-SocketIO, OpenAI API, scikit-learn, NLTK, pandas
**Frontend:** React, React Router, Material UI, Recharts, Chart.js, Socket.IO client, Firebase

## Running locally

### Backend

```bash
# from the backend directory
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

pip3 install Flask-PyMongo firebase-admin flask-cors nltk scikit-learn pandas matplotlib flask-socketio openai
# Windows: pip install Flask-PyMongo (then install the rest similarly)

# add your environment variables — see .env.example
python3 app.py                # or whatever your entry point is
```

### Frontend

```bash
# from the frontend directory
npm install
npm start
```


The app should then be running at `http://localhost:3000` (frontend) with the backend on `http://localhost:5000` (adjust if different).

### Environment variables

You'll need:
- Firebase config/credentials
- MongoDB connection string
- OpenAI API key
