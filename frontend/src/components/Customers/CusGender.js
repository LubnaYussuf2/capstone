import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Typography } from '@mui/material';

const CusGender = () => {
  const [genderData, setGenderData] = useState({});

  useEffect(() => {
    fetch('http://127.0.0.1:5000/data')
      .then(response => response.json())
      .then(data => {
        const genders = data.map(item => item.gender);
        const genderCounts = genders.reduce((acc, gender) => {
          acc[gender] = (acc[gender] || 0) + 1;
          return acc;
        }, {});
        setGenderData(genderCounts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const data = {
    labels: Object.keys(genderData),
    datasets: [
      {
        label: 'Gender Distribution',
        data: Object.values(genderData),
        backgroundColor: [
          '#b8d0eb',
          '#b298dc',
        ],
      },
    ],
  };


  // '#6f2dbd', '#a663cc', '#b298dc', '#b8d0eb', '#b9faf8'

  const options = {
    responsive: true, // Add this to make the chart responsive
    maintainAspectRatio: false, // Add this to not maintain the aspect ratio
    plugins: {
      legend: {
        position: 'right',
        paddingLeft: 50,
        labels: {
          boxWidth: 20, // You can adjust the boxWidth for the legend items here
          paddingLeft: 50
        },
      },
    },
    layout: {
      padding: {
        // Adjust the padding if necessary
        left: 10,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  };

  return (
    <div style={{ height: '200px', width: '300px' }}> {/* Adjust the size of this div as necessary */}
    <Typography variant="h6" sx={{ color: "#261c33" }}>Gender Distribution</Typography>
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Pie data={data} options={options} />
    </div>
  </div>
  );
};

export default CusGender;
