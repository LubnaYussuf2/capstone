import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, TextField, Stack, Grid, Paper } from '@mui/material';
import { Notifications as NotificationsIcon, Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';

function Sales() {
    // user's name 
  const userName = "ukoo";


  return (
    <div>
    {/* header */}
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

      <Grid container spacing={2} sx={{ padding: '20px' }}>
        {/* Left side */}
        <Grid item container spacing={3} xs={8}>
          <Grid item xs={4}>
            <Paper sx={{ p: 12 }}>Section 1</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 12 }}>Section 2</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 12 }}>Section 3</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 35 }}>Section 4</Paper>
          </Grid>
        </Grid>

        {/* Right side */}
        <Grid item container  spacing={3} xs={4} >
          <Grid item xs={12}>
            <Paper sx={{ p: 15.8 }}>Section 5</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 30 }}>Section 6</Paper>
          </Grid>
        </Grid>
      </Grid>
  </div>
  )
}

export default Sales