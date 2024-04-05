import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, TextField, Stack, Grid, Paper } from '@mui/material';
import { Notifications as NotificationsIcon, Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import CustomerCounts from './CustomerCounts';
import io from 'socket.io-client';

// Establish connection with the backend server using Socket.IO
const socket = io('http://localhost:5000'); // Adjust this URL to match your server's address and port

function Home() {
  const userName = "ukoo";
  const [notifications, setNotifications] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to handle the visibility of the dropdown

  useEffect(() => {
    // Listen for 'cluster_update' events from the server
    socket.on('cluster_update', data => {
      // Upon receiving a notification, add it to the notifications state
      // Assuming the backend sends the Tourist_ID, adjust if the data structure is different
      setNotifications(notifications => [...notifications, `Cluster updated for Tourist_ID: ${data.Tourist_ID}`]);
    });

    // Clean up the effect to avoid memory leaks and multiple listeners
    return () => {
      socket.off('cluster_update');
    };
  }, []);

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  return (
    <div style={{ marginLeft: '250px' }}>
      <AppBar position="static" sx={{ backgroundColor: '#fff', borderBottom: '1px solid #ccc', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 0, color: "black", fontWeight: "bold" }}>
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

          {/* Notification Icon Button and Dropdown */}
          <IconButton aria-label="notifications" onClick={toggleDropdown}>
            <NotificationsIcon />
            {notifications.length > 0 && (
              <span>({notifications.length})</span>
            )}
          </IconButton>

          {isDropdownVisible && (
          <div style={{
            position: 'absolute',
            right: '20px',
            top: '60px',
            width: '300px',
            border: '1px solid #ccc',
            boxShadow: '0px 0px 15px rgba(0,0,0,0.2)',
            backgroundColor: '#f9f9f9',
            color: '#333',
            zIndex: '1000',
            padding: '10px',
            borderRadius: '4px'
          }}>
            {notifications.length === 0 ? (
              <p>No notifications</p>
            ) : (
              notifications.map((notification, index) => (
                <p key={index} style={{ padding: '8px 12px', borderBottom: '1px solid #ddd' }}>{notification}</p>
              ))
            )}
          </div>
        )}

          <Typography variant="body1" sx={{ mr: 2, color: 'black' }}>
              Welcome, {userName}
          </Typography>
          <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
         
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} sx={{ padding: '20px', paddingBottom: "5px" }}>
        <Grid item xs={3}>
          <Paper sx={{ height: '120px', p: 2 }}>Section 1</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ height: '120px', p: 2 }}>Section 2</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ height: '120px', p: 2 }}>Section 3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ height: '120px', p: 2 }}>Section 4</Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ padding: '20px', paddingBottom: "5px" }}>
        <Grid item xs={6}>
          <Paper sx={{ height: '470px', p: 2}}> <CustomerCounts /> </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ height: '470px', p: 2 }}>Email Campaign</Paper>
        </Grid>
      </Grid>

      <Grid sx={{ padding: '20px' }}>
        <Paper sx={{ height: '200px', p: 2 }}> Popular Packages </Paper>
      </Grid>
    </div>
  );
}

export default Home;
