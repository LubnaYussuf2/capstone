import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, TextField, Stack, Grid, Paper } from '@mui/material';
import { Notifications as NotificationsIcon, Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';

function Profile() {
    // user's name 
  const userName = "ukoo";

  return (
    <div style={{ marginLeft: '250px' }}>
    <AppBar position="static" sx={{ backgroundColor: '#fff', borderBottom: '1px solid #ccc', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 0 , color: "black", fontWeight: "bold" }}>
          Profile
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
        <Avatar alt="User Avatar" />
       
      </Toolbar>
    </AppBar>

    <img src='../public/workinprogress.pn' alt="Logo" style={{ width: '100px', height: '100px', marginTop: '50px' }} />

<h1 style={{ fontSize: '36px', marginTop: '20px' }}>Work in Progress</h1>


    <h2>Main Content</h2>

    {/* Add more content here */}
  </div>
  )
}

export default Profile