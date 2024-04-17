import React, { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

// Register the ArcElement for drawing the doughnut pieces.
Chart.register(ArcElement);

const CusSatisfactionHalfDonut = () => {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/review')
      .then(response => response.json())
      .then(data => setReviewData(data))
      .catch(error => console.error('Error fetching review data:', error));
  }, []);

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

  const averageSentimentScore2 = Object.values(sentimentCounts).reduce((acc, { totalScore, count }) => {
    return count > 0 ? acc + totalScore / count : acc;
  }, 0);

  const formattedPercentage = (averageSentimentScore2 * 100).toFixed(0);

  const remaining = 100 - formattedPercentage

  const data = {
    datasets: [
      {
        data: [formattedPercentage, remaining],
        backgroundColor: [
          "#336699",
          "#99CCFF",
        ],
        display: true,
        borderColor: "#D1D6DC"
      }
    ]
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: '', paddingBottom: '40%' }}>
        <p style={{ fontSize: '24px', marginBottom: '5px' }}>{formattedPercentage}%</p>
        {/* chart */}
      </div>
    </div>

    );
  };
  
 


export default CusSatisfactionHalfDonut;


{/* <div style={{ width: '50%', position: 'relative', paddingLeft: '20%', paddingBottom: '10%' }}>
        <Doughnut
          data={data}
          options={{
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: false
              },
              // Custom plugin for displaying text in the center of the doughnut
              centerText: {
                text: formattedPercentage + '%',
                color: '#333333', // Text color
                fontStyle: 'Arial', // Font style
                sidePadding: 20, // Padding around the text
                minFontSize: 20 // Minimum font size
              }
            },
            rotation: -90,
            circumference: 180,
            cutout: "70%", // Adjust the cutout percentage to make the chart thinner
            maintainAspectRatio: true,
            responsive: true
          }}
        />
      </div> */}