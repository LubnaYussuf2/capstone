import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const SentimentAnalysis = () => {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/review')
      .then(response => response.json())
      .then(data => setReviewData(data))
      .catch(error => console.error('Error fetching review data:', error));
  }, []);

  // Initialize sentimentCounts
  const initialSentimentCounts = {
    'Very Positive': { count: 0, totalScore: 0 },
    'Positive': { count: 0, totalScore: 0 },
    'Neutral': { count: 0, totalScore: 0 },
    'Negative': { count: 0, totalScore: 0 },
    'Very Negative': { count: 0, totalScore: 0 },
  };
  const [sentimentCounts, setSentimentCounts] = useState(initialSentimentCounts);

  useEffect(() => {
    // Update sentimentCounts when reviewData changes
    const updatedSentimentCounts = reviewData.reduce((acc, review) => {
      const sentiment = review.sentiment_classification;
      const score = review.sentiment_score;
      if (acc[sentiment]) {
        acc[sentiment].count += 1;
        acc[sentiment].totalScore += score;
      }
      return acc;
    }, { ...initialSentimentCounts });

    setSentimentCounts(updatedSentimentCounts);
  }, [reviewData]);

  // Calculate average sentiment score
  const averageSentimentScore = Object.values(sentimentCounts).reduce((acc, { totalScore, count }) => {
    if (count > 0) {
      return acc + totalScore / count;
    }
    return acc;
  }, 0);

  // Prepare data for the chart
  const labels = Object.keys(sentimentCounts);
  const data = Object.values(sentimentCounts).map(({ count }) => count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Sentiment Counts',
        data,
        backgroundColor: [
            '#bee9e8', '#62b6cb', '#ece4db', '#cae9ff', '#7ca2a6', '#b8bedd'
        ],
      },
    ],
  };

  return (
    <div style={{  }}>
      <h2>Sentiment Analysis</h2>
      <div style={{ height: '300px', width: '500px'}}>
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: { stacked: true,
                grid: {
                    display: false, // Adjust grid line display here
                },
             },
              y: { stacked: true,
                grid: {
                    display: false, // Adjust grid line display here
                },
             },
            
            },
            plugins: {
                legend: { display: false }, // Hide the legend
            },
            barPercentage: 0.8,
            categoryPercentage: 0.8,
          }}
        />
      </div>
      <p>Average Sentiment Score: {averageSentimentScore.toFixed(2)}</p>
    </div>
  );
};

export default SentimentAnalysis;
