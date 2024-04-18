import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, TextField, Stack, Grid, Paper } from '@mui/material';
import { Notifications as NotificationsIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import Customer from './Customer';
import ActiveCus from './ActiveCus';
import SentimentAnalysis from '../SentimentAnalysis';
import CusGender from './CusGender';
import Age from './Age';
import GeoChart from './GeoChart';

function Customers() {

    // user's name 
  const userName = "ukoo";

  const [totalCustomers, setTotalCustomers] = useState(0);
  const [loyaltyProgramCustomersCount, setLoyaltyProgramCustomersCount] = useState(0);

  useEffect(() => {
        fetch('http://127.0.0.1:5000/data')
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data)) {
                    setTotalCustomers(data.length);

                    // Count customers subscribed to the loyalty program
                    const loyaltyProgramCount = data.reduce((count, customer) => {
                        if (customer.Subscribed_to_Loyalty_Program === true) {
                            return count + 1;
                        }
                        return count;
                    }, 0);
                    setLoyaltyProgramCustomersCount(loyaltyProgramCount);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

  return (
    <div style={{ marginLeft: '250px', backgroundColor: "#f5f5fc", flex: 0, height: '100vh'}}> 
    {/* #faf6fa */}
    <AppBar position="static" sx={{ backgroundColor: '#f5f5fc', borderBottom: '1px solid #ccc', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, ml: 0 , color: "#261c33", fontWeight: "bold" }}>
            Customers
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


      {/* <GeoChart /> */}

      {/* <CusGender /> */}
      {/* <Age /> */}

              {/* <ActiveCus />  */}

              {/* {`Total Customers: ${totalCustomers}`} <br></br> 
              {`Loyalty Program Customers: ${loyaltyProgramCustomersCount}`}  */}

              

      
        <Grid container spacing={4} sx={{ paddingTop: '20px' }}>
          {/* Left side */}
          <Grid item xs={8}>
            <Paper sx={{ height: '770px', p: 2}}><Customer /></Paper>
          </Grid>
          {/* Right side */}
          <Grid item xs={4} container direction="column" spacing={2}>
            <Grid item>
              <Paper sx={{ height: '200px', p: 2}}><SentimentAnalysis /></Paper>
            </Grid>
            <Grid item>
              <Paper sx={{ height: '250px', p: 2}}><Age /></Paper>
            </Grid>
            <Grid item>
              <Paper sx={{ height: '225px', p: 2}}><CusGender /> </Paper>
            </Grid>
          </Grid>
        </Grid>
    
      
    </div>
  )
}

export default Customers

{/* <div style={{}}>
        <Grid container spacing={4} sx={{ paddingTop: '20px' }}>
   
          <Grid item>
            <Paper sx={{ height: '95%', p: 2}}><Customer /></Paper>
          </Grid>
  

          <Grid item xs={4} container direction="column" spacing={2}>
            <Grid item>
            <Paper sx={{ height: '110%', p: 2}}> </Paper>
            </Grid>

            <Grid item>
              <Paper sx={{ height: '110%', p: 2}}>  </Paper>
            </Grid>

            <Grid item>
              <Paper sx={{ height: '110%', p: 2}}>  </Paper>
            </Grid>

          </Grid>
        </Grid>
      </div> */}