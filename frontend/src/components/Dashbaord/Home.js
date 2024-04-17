import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, TextField, Stack, Grid, Paper } from '@mui/material';
import { Notifications as NotificationsIcon, Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import CustomerCounts from './CustomerCounts';
import SalesTrend from '../Sales/SalesTrend';
import PopularPackages from './PopularPackages';
import CusSatisfactionHalfDonut from './CusSatisfactionHalfDonut';

function Home() {

  // user's name 
  const userName = "ukoo";


  return (
    <div style={{ marginLeft: '250px' }}>
    {/* header */}
      <AppBar position="static" sx={{ backgroundColor: '#f5f5fc', borderBottom: '1px solid #ccc', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, ml: 0 , color: "#261c33", fontWeight: "bold" }}>
            Dashboard
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

  


      {/* Top section */}
      <Grid container spacing={2} sx={{ padding: '20px', paddingBottom: "5px" }}>
        <Grid item xs={3}>
          <Paper sx={{ height: '120px', p: 2 }}>Section 1</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ height: '120px', p: 2 }}>Section 2</Paper>
        </Grid>
        <Grid item xs={3}>
        <Paper sx={{ height: '120px', p: 2, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          Overall satisfaction
          <div style={{ flexGrow: 1, display: 'flex', }}>
            <CusSatisfactionHalfDonut />
          </div>
          <p style={{ marginTop: '5px', color: "#5D5FEF" }}>View all reviews</p>
          <img
            src={process.env.PUBLIC_URL + '/cusSatis.png'}
            alt="Logo"
            style={{
              width: '15%',
              position: 'absolute',
              bottom: '5px',
              right: '5px',
            }}
          />
        </Paper>

        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ height: '120px', p: 2 }}>Section 4</Paper>
        </Grid>
      </Grid>

      {/* Middle section */}

      <Grid container spacing={3} sx={{ padding: '20px', paddingBottom: "5px" }}>
        <Grid item xs={6}>
          <Paper sx={{ height: '90%', p: 2, pb: 3.4}}> <SalesTrend /> </Paper>
        </Grid>
        <Grid item xs={6}>
          {/* <Paper sx={{ height: '470px', p: 2 }}>Email Campaign</Paper> */}
          <Paper sx={{ height: '470px', p: 2}}> <CustomerCounts /> </Paper>
        </Grid>
      </Grid>

      {/* Last section */}

      <Grid sx={{ padding: '20px' }}>
         <Paper sx={{ p: 2}}> <PopularPackages /> </Paper>
      </Grid>
    </div>
  );
}

export default Home;
