import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, TextField, Stack, Grid, Paper } from '@mui/material';
import { Notifications as NotificationsIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import SalesOverTime from './SalesOverTime';
import RadarChart from './RadarChart';
// import SalesTrend from './SalesTrend';
// import PackagePerformance from './PackagePerformance';
import RadarChart2 from './RadarChart2';

function Sales() {
  const userName = "ukoo";
  const [totalSalesLastYear, setTotalSalesLastYear] = useState(0);
  // const [elastLastYear, setelastLastYear] = useState(0);
  // const [elastLasLastYear, setelastLastLastYear] = useState(0);
  const [totalSalesThisYear, setTotalSalesThisYear] = useState(0);
  const [salesData, setSalesData] = useState([])
  const [thisYearRevenue, setThisYearRevenue] = useState(0)
  const [lastYearRevenue, setLastYearRevenue] = useState(0)
  const [thisYearProfit, setThisYearProfit] = useState(0)
  const [lastYearProfit, setLastYearProfit] = useState(0)


  useEffect(() => {
    fetch('http://127.0.0.1:5000/sales')
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          setSalesData(data);

          // Count total sales for the current and previous year
          // const currentDate = new Date();
          const currentYear = 2023;
          const lastYear = 2022;
          // const lastlastYear = 2021;
          // const lastlastlastYear = 2020;

          let totalSalesLastYearCount = 0;
          let totalSalesThisYearCount = 0;
          let thisProfit = 0
          let lastProfit = 0
          let thisRevenue = 0
          let lastRevenue = 100

          data.forEach(sale => {
            const saleYear = sale.Year
            if (saleYear == lastYear) {
              totalSalesLastYearCount++;
              lastRevenue = lastRevenue + sale["Total Package Cost"]
              // console.log(sale["Total Package Cost"])
              // console.log(typeof(sale["Total Package Cost"]))
              // console.log(lastRevenue)
              lastProfit = lastProfit + sale["Total Profit"]
            }
            else if (saleYear == currentYear) {
              totalSalesThisYearCount++;
              thisRevenue += sale["Total Package Cost"]
              thisProfit += sale["Total Profit"]
            }

          });

          setTotalSalesLastYear(totalSalesLastYearCount);
          setTotalSalesThisYear(totalSalesThisYearCount);
          setLastYearRevenue(lastRevenue)
          setLastYearProfit(lastProfit)
          setThisYearRevenue(thisRevenue)
          setThisYearProfit(thisProfit)


          console.log(lastYearRevenue)
          console.log(lastYearProfit)
          console.log(thisYearRevenue)
          console.log(thisYearProfit)
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
    <div style={{ marginLeft: '250px' }}>
      <AppBar position="static" sx={{ backgroundColor: '#f5f5fc', borderBottom: '1px solid #ccc', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, ml: 0 , color: "#261c33", fontWeight: "bold" }}>
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

      {/* <SalesTrend />
      <PackagePerformance /> */}
      {/* <RadarChart /> */}
      
      {/* <RadarChart2 /> */}

      <Grid container spacing={2} sx={{ padding: '20px' }}>
        {/* Left side */}
        <Grid item container spacing={4} xs={7}>

          {/* sales this year */}
          <Grid item xs={4}>
            <Paper sx={{ height: '200px', p: 2 }}>
              <div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ marginRight: '10px' }}>Total Sales This Year:</h3>
                  <p style={{ color: "#009E60" }}>+{(totalSalesThisYear / totalSalesLastYear) * 100}%</p>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <h2>{totalSalesLastYear}</h2>
                </div>
              </div>
            </Paper>
          </Grid>

          {/* Revenue this month */}
          <Grid item xs={4}>
            <Paper sx={{ height: '200px', p: 2 }}>
              <div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ marginRight: '10px' }}>Revenue</h3>
                  {/* <p style={{ color: "#009E60" }}>+{(thisYearRevenue / lastYearRevenue) * 100}%</p> */}
                  <p style={{ color: "#009E60" }}>+{((thisYearRevenue / lastYearRevenue) * 100).toFixed(0)}%</p>

                </div>

                <div style={{ textAlign: 'center' }}>
                  <h2>{thisYearRevenue}</h2>
                </div>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper sx={{ height: '200px', p: 2 }}>
              <div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ marginRight: '10px' }}>Profit - This Year</h3>
                  <p style={{ color: "#009E60" }}>+{((thisYearProfit / lastYearProfit) * 100).toFixed(0)}%</p>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <h2>{thisYearProfit}</h2>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ height: '500px', pl: 2, pb: 8 }}><SalesOverTime /></Paper>
          </Grid>
        </Grid>

        {/* Right side */}
        <Grid item container spacing={1} xs={5} >
          <Grid item xs={12}>
            <Paper sx={{ height: '150px', p: 2 }}>Section 5</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ height: '510px', p: 2, pb:5}}><RadarChart2 /></Paper>
          </Grid>
        </Grid>
      </Grid>


    </div>
  );
}

export default Sales;


// data.forEach(sale => {
//   const saleYear = sale.Year
//   if (saleYear == lastYear) {
//     totalSalesLastYearCount++;
//     setLastYearRevenue(lastRevenue)
//     setLastYearProfit(lastProfit)
//   } 
//   else if (saleYear == currentYear) {
//     totalSalesThisYearCount++;
//     setThisYearRevenue(thisRevenue)
//     setThisYearProfit(lastRevenue)
//   }
// });

// setTotalSalesLastYear(totalSalesLastYearCount);
// setTotalSalesThisYear(totalSalesThisYearCount);
// setLastYearRevenue(lastRevenue)
// setLastYearProfit(lastProfit)
// setThisYearRevenue(thisRevenue)
// setThisYearProfit(thisProfit)


// console.log(lastYearRevenue)
// console.log(lastYearProfit)
// console.log(thisYearRevenue)
// console.log(thisYearProfit)