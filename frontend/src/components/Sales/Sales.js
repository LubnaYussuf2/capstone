import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, TextField, Stack, Grid, Paper, MenuItem, Select } from '@mui/material';
import { Notifications as NotificationsIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import Chart from 'chart.js/auto'; // Import Chart.js library
import MonthlySales from './MonthlySales';

function Sales() {
  const userName = "ukoo";
  const [salesData, setSalesData] = useState(null); // State to store fetched sales data
  const [selectedYear, setSelectedYear] = useState(2023); // State to store selected year
  const chartRef = useRef(null); // Reference to the chart instance
  

  // Fetch sales data from backend API
  useEffect(() => {
    fetch('http://127.0.0.1:5000/sales')
      .then(response => response.json())
      .then(data => {
        setSalesData(data); // Set fetched data to state
        renderChart(data); // Render chart with fetched data
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Function to render the line chart
const renderChart = (data) => {
  if (!data || !selectedYear) return;

  const ctx = document.getElementById('salesChart');

  // Filter data by selected year
  const filteredData = data.filter(entry => entry.Year === selectedYear);

  // Group and aggregate total profit by month
  const monthlyProfitMap = {};
  filteredData.forEach(entry => {
    const monthKey = `${entry.Year}-${entry.Month}`;
    if (!monthlyProfitMap[monthKey]) {
      monthlyProfitMap[monthKey] = entry["Total profit"];
    } else {
      monthlyProfitMap[monthKey] += entry["Total profit"];
    }
  });

  // Sort months
  const sortedMonths = Object.keys(monthlyProfitMap).sort((a, b) => {
    const [yearA, monthA] = a.split('-');
    const [yearB, monthB] = b.split('-');
    if (yearA !== yearB) {
      return parseInt(yearA) - parseInt(yearB);
    } else {
      const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return monthsOrder.indexOf(monthA) - monthsOrder.indexOf(monthB);
    }
  });

  // Extracting months and total profits from the sorted data
  const months = sortedMonths.map(month => month.split('-')[1]);
  const totalProfits = sortedMonths.map(month => monthlyProfitMap[month]);

  // Destroy previous chart instance if it exists
  if (chartRef.current !== null) {
    chartRef.current.destroy();
  }

  // Create new chart instance
  chartRef.current = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Total Profit Over Time',
        data: totalProfits,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};


  // Function to handle year selection
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value); // Update selected year
    renderChart(salesData); // Re-render chart with updated data
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#fff', borderBottom: '1px solid #ccc', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 0 , color: "black", fontWeight: "bold" }}>
            Sales
          </Typography>
          <Stack direction="row" spacing={0} alignItems="center">
            <TextField
              placeholder="Search..."
              size="medium"
              variant="standard"
              sx={{ borderBottom: '1px solid', borderRadius: 0, minWidth: '30ch' }}
            />
            <IconButton color="disabled" aria-label="filter" sx={{ mr: 5 }}>
              <FilterListIcon />
            </IconButton>
          </Stack>
          <IconButton color="disabled" aria-label="notifications">
            <NotificationsIcon />
          </IconButton>
          <Typography variant="body1" sx={{ mr: 2, color: 'black' }}>
              Welcome, {userName}
          </Typography>
          <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
        </Toolbar>
      </AppBar>

      <MonthlySales />

      <Grid container spacing={2} sx={{ padding: '20px' }}>
        
        <Grid item xs={8}>
          <h2>Total Profit Over Time</h2>
          <Select
            value={selectedYear || ''}
            onChange={handleYearChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Select Year' }}
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="" disabled>Select Year</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={8}>
          <Paper>
            <canvas id="salesChart" width="400" height="200"></canvas> {/* Render the chart */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Sales;
