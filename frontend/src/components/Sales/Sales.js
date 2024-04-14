import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, TextField, Stack, Grid, Paper } from '@mui/material';
import { Notifications as NotificationsIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import SalesOverTime from './SalesOverTime';
import SalesTrend from './SalesTrend';
import PackagePerformance from './PackagePerformance';

function Sales() {
  const userName = "ukoo";
  const [totalSalesLastYear, setTotalSalesLastYear] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/sales')
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          const currentDate = new Date();
          const lastYear = currentDate.getFullYear() - 1;
          const totalSales = data.reduce((total, sale) => {
            const saleYear = new Date(sale.Year, 0).getFullYear();
            if (saleYear === lastYear) {
              return total + sale.package_sold;
            }
            return total;
          }, 0);
          setTotalSalesLastYear(totalSales);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
    <div style={{ marginLeft: '250px' }}>
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

      <SalesTrend />
      <PackagePerformance />

      <Grid container spacing={3} sx={{ padding: '20px' }}>
        {/* Left side */}
        <Grid item container spacing={4} xs={8}>
          <Grid item xs={4}>
            <Paper sx={{ height: '200px', p: 2 }}>Total Sales Last Year: {totalSalesLastYear}</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ height: '200px', p: 2 }}>Section 2</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ height: '200px', p: 2 }}>Section 3</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ height: '550px', pl: 2 }}><SalesOverTime /></Paper>
          </Grid>
        </Grid>

        {/* Right side */}
        <Grid item container  spacing={3} xs={4} >
          <Grid item xs={12}>
            <Paper sx={{ height: '300px', p: 2 }}>Section 5</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ height: '400px', p: 2}}>Section 6</Paper>
          </Grid>
        </Grid>
      </Grid>

      {/* <MonthlySales />
      <SalesOverTime /> */}

    </div>
  );
}

export default Sales;
