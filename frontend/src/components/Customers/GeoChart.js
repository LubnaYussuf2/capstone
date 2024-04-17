import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const GeoChart = () => {
  const [nationalityData, setNationalityData] = useState({});

  useEffect(() => {
    fetch('http://127.0.0.1:5000/data')
      .then(response => response.json())
      .then(data => {
        const nationalityCounts = {};

        data.forEach(item => {
          const nationality = item.Nationality;
          nationalityCounts[nationality] = (nationalityCounts[nationality] || 0) + 1;
        });

        setNationalityData(nationalityCounts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const data = {
    labels: Object.keys(nationalityData),
    datasets: [
      {
        label: 'Number of Customers',
        data: Object.values(nationalityData),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h2>Customer Nationality Distribution</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GeoChart;
