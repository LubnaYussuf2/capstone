import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Typography } from '@mui/material';

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

  const averageSentimentScore = Object.values(sentimentCounts).reduce((acc, { totalScore, count }) => acc + (count ? totalScore / count : 0), 0) / Object.values(sentimentCounts).filter(({ count }) => count > 0).length;
  
  // Calculate average sentiment score
  const averageSentimentScore2 = Object.values(sentimentCounts).reduce((acc, { totalScore, count }) => {
    if (count > 0) {
      return acc + totalScore / count;
    }
    return acc;
  }, 0);
  
  const chartData = {
    labels: Object.keys(sentimentCounts),
    datasets: [
      {
        label: 'Sentiment Counts',
        data: Object.values(sentimentCounts).map(({ count }) => count),
        backgroundColor: [
          '#6f2dbd', '#a663cc', '#b298dc', '#b8d0eb', '#b9faf8'
        ],
        hoverOffset: 4
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            const total = context.dataset.data.reduce((acc, value) => acc + value, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            label += `${value} (${percentage})`;
            return label;
          }
        }
      },
    },
  };

  return (
    <div style={{ height: '150px', width: '350px' }}>
      {/* {(averageSentimentScore2*100).toFixed(0)}% */}
      {/* <h2></h2> */}
      <Typography variant="h5" sx={{ pb: 2 , color: "#261c33" }} > Sentiment Analysis </Typography>
      <Doughnut 
        data={chartData} 
        options={options}
        // plugins={[centerTextPlugin]} // Register the plugin for use
      />
    </div>
  );
};

export default SentimentAnalysis;
// export { averageSentimentScore2 };