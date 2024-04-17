import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, TextField, Stack, Grid, Paper } from '@mui/material';
import { Notifications as NotificationsIcon, Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import CustomerCounts from './CustomerCounts';
import SalesTrend from '../Sales/SalesTrend';
import PopularPackages from './PopularPackages';
import CusSatisfactionHalfDonut from './CusSatisfactionHalfDonut';
import Section1 from './Section1';
import Section2 from './Section2';
import Section4 from './Section4';
import Navbar from '../Navbar/Navbar.js';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Home({ notifications, addNotification, clearNotifications }) {

  // user's name 
  const userName = "ukoo";
  useEffect(() => {
    socket.on('cluster_update', (data) => {
      addNotification(`Cluster updated for Tourist_ID: ${data.Tourist_ID}`);
    });

    return () => {
      socket.off('cluster_update');
    };
  }, [addNotification]);


  return (
    <div style={{ marginLeft: '250px' }}>
    {/* header */}
    <Navbar
        userName={userName}
        notifications={notifications}
        currentPage="Dashboard"
        addNotification={addNotification}
        clearNotifications={clearNotifications}
      />

      {/* Top section */}
      <Grid container spacing={2} sx={{ padding: '20px', paddingBottom: "5px" }}>
        <Grid item xs={3}>
        <Paper sx={{ height: '120px', p: 2, display: 'flex', position: 'relative' }}>

          <div style={{ flexGrow: 1, display: 'flex' }}>
            <Section1 />
          </div>

          <img
            src={process.env.PUBLIC_URL + '/mt.png'}
            alt="Target icon"
            style={{
              maxHeight: '50px',
              position: 'absolute',
              bottom: '5px',
              right: '5px',
            }}
          />
        </Paper>

        </Grid>
        <Grid item xs={3}>
          {/* <Paper sx={{ height: '150px', p: 2 }}><Section2 /></Paper> */}
          <Paper sx={{ height: '120px', p: 2, display: 'flex', position: 'relative' }}>

          <div style={{ flexGrow: 1, display: 'flex' }}>
            <Section2 />
          </div>
          {/* <p style={{ marginTop: '5px', color: "#5D5FEF" }}>See Details</p> */}
          <img
            src={process.env.PUBLIC_URL + '/customers.png'}
            alt="Target icon"
            style={{
              maxHeight: '50px',
              position: 'absolute',
              bottom: '5px',
              right: '5px',
            }}
          />
        </Paper>
        </Grid>
        <Grid item xs={3}>
        <Paper sx={{ height: '120px', p: 2, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          OVERALL SATISFACTION
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
          {/* <Paper sx={{ height: '150px', p: 2 }}><Section4 /></Paper> */}

          <Paper sx={{ height: '120px', p: 2, display: 'flex', position: 'relative' }}>

            <div style={{ flexGrow: 1, display: 'flex' }}>
              <Section4 />
            </div>
            {/* <p style={{ marginTop: '5px', color: "#5D5FEF" }}>See Details</p> */}
            <img
              src={process.env.PUBLIC_URL + '/tasks.png'}
              alt="Target icon"
              style={{
                maxHeight: '45px',
                position: 'absolute',
                bottom: '5px',
                right: '5px',
              }}
            />
          </Paper>
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
