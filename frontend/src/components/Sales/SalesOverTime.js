import React, { useState, useEffect, useRef } from 'react';
import { Grid, Paper, MenuItem, Select } from '@mui/material';
import Chart from 'chart.js/auto';

function SalesOverTime() {
  const [salesData, setSalesData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2023);
  const chartRef = useRef(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/sales')
      .then(response => response.json())
      .then(data => {
        setSalesData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // This effect runs when salesData or selectedYear changes
    renderChart();
  }, [salesData, selectedYear]); // Adding selectedYear as a dependency

  const renderChart = () => {
    if (!salesData || !selectedYear) return;
  
    const filteredData = salesData.filter(entry => entry.Year === selectedYear);
  
    const monthlyProfitMap = {};
    filteredData.forEach(entry => {
      const monthKey = entry.Month; // Use month names directly
      if (!monthlyProfitMap[monthKey]) {
        monthlyProfitMap[monthKey] = entry["Total profit"];
      } else {
        monthlyProfitMap[monthKey] += entry["Total profit"];
      }
    });
  
    // a mapping from month names to numbers
    const monthOrder = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12
    };
  
    // Use the mapping to sort the months
    const sortedMonths = Object.keys(monthlyProfitMap).sort((a, b) => monthOrder[a] - monthOrder[b]);
  
    const months = sortedMonths; // Already sorted month names
    const totalProfits = sortedMonths.map(month => monthlyProfitMap[month]);
  
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  
    const ctx = document.getElementById('salesChart');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Total Profit Over Time',
          data: totalProfits,
          borderColor: '#9f86c0',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false, // Hide x-axis grid lines
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          }
        }
      }
    });
  };
  
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ paddingLeft: '10px' }}>
        
        <Grid item xs={8}>
          <h2>Total Profit Over Time</h2>
          <Select
            value={selectedYear || ''}
            onChange={handleYearChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Select Year' }}
            sx={{ marginBottom: 0 }}
          >
            <MenuItem value="" disabled>Select Year</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <canvas id="salesChart" width="400" height="200"></canvas> 
        </Grid>
      </Grid>
    </div>
  )
}

export default SalesOverTime
