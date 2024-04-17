import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@mui/material';

const Age = () => {
  const [ageData, setAgeData] = useState({});

  useEffect(() => {
    fetch('http://127.0.0.1:5000/data')
      .then(response => response.json())
      .then(data => {
        const ageGroups = {
          '18-30': 0,
          '31-40': 0,
          '41-50': 0,
          '51-60': 0,
          '61-70': 0,
          '70+': 0,
        };

        data.forEach(item => {
          const age = item.Age;
          if (age >= 18 && age <= 30) {
            ageGroups['18-30'] += 1;
          } else if (age >= 31 && age <= 40) {
            ageGroups['31-40'] += 1;
          } else if (age >= 41 && age <= 50) {
            ageGroups['41-50'] += 1;
          } else if (age >= 51 && age <= 60) {
            ageGroups['51-60'] += 1;
          } else if (age >= 61 && age <= 70) {
            ageGroups['61-70'] += 1;
          } else {
            ageGroups['70+'] += 1;
          }
        });

        setAgeData(ageGroups);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const data = {
    labels: Object.keys(ageData),
    datasets: [
      {
        label: 'Number of Customers',
        data: Object.values(ageData),
        borderColor: '#a663cc',
        backgroundColor: '#a663cc',
        borderWidth: 1,
      },
    ],
  };

  // '#6f2dbd', '#a663cc', '#b298dc', '#b8d0eb', '#b9faf8'

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ height: '200px', width: '400px' }}>
      {/* <h2>Customer Age Distribution</h2> */}
      <Typography variant="h5" sx={{ pb: 2 , color: "#261c33" }} > Customer Age Distribution </Typography>

      <Bar data={data} options={options} />
    </div>
  );
};

export default Age;
