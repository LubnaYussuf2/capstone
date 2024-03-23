import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, TextField, Stack, Grid, Paper } from '@mui/material';
import { Notifications as NotificationsIcon, Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import CustomerCounts from './CustomerCounts';

function Home() {

  // user's name 
  const userName = "ukoo";


  return (
    <div style={{ marginLeft: '250px' }}>
    {/* header */}
      <AppBar position="static" sx={{ backgroundColor: '#fff', borderBottom: '1px solid #ccc', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 0 , color: "black", fontWeight: "bold" }}>
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
      <CustomerCounts />
      <Grid container spacing={2} sx={{ padding: '20px' }}>
        <Grid item xs={3}>
          <Paper sx={{ p: 8 }}>Section 1</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ p: 8 }}>Section 2</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ p: 8 }}>Section 2</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ p: 8 }}>Section 4</Paper>
        </Grid>
      </Grid>

      {/* Middle section */}

      <Grid container spacing={2} sx={{ padding: '20px' }}>
        <Grid item xs={6}>
          <Paper sx={{ p: 20 }}> Cutomer Count </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 20 }}>Email Campaign</Paper>
        </Grid>
      </Grid>

      {/* Last section */}

      <Grid sx={{ padding: '20px' }}>
        <Paper sx={{ p: 20 }}> Popular Packages </Paper>
      </Grid>
    </div>
  );
}

export default Home;
