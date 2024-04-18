import React, { useState } from 'react';
import { Box, Button, Container, Modal, Paper, TextField, Typography, CircularProgress } from '@mui/material';
import { AppBar, Toolbar, IconButton, Avatar, Stack, Grid } from '@mui/material';
import { Notifications as NotificationsIcon, Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';

function MultiFactorAuthentication() {
  const userName = "ukoo";

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to start enrollment
  const startEnrollMultiFactor = async () => {
    try {
      // Simulate starting enrollment
      console.log('Enrollment started...');
      setLoading(true); // Set loading state to true to show loading message
      setTimeout(() => {
        setVerificationId('dummy_verification_id');
        setLoading(false); // Set loading state to false after delay to stop loading message
      }, 2000); // Simulate delay of 2 seconds before showing verification code input field
    } catch (error) {
      console.error('Error starting enrollment:', error);
    }
  };

  // Function to finish enrollment
  const finishEnrollMultiFactor = async () => {
    try {
      // Simulate finishing enrollment
      console.log('Enrollment finished successfully!');
      setEnrolled(true);
    } catch (error) {
      console.error('Error finishing enrollment:', error);
    }
  };

  // Function to handle verification code submission
  const handleFinishEnrollment = async () => {
    try {
      // Simulate verifying verification code
      console.log('Verifying verification code...');
      if (verificationCode === '1447') {
        console.log('Verification code verified successfully!');
        await finishEnrollMultiFactor();
      } else {
        console.log('Invalid verification code!');
      }
    } catch (error) {
      console.error('Error verifying verification code:', error);
    }
  };

  // Redirect to homepage when modal is closed
  const handleModalClose = () => {
    console.log('Redirecting to homepage...');
    // Replace this with actual redirection logic
    window.location.href = '/'; // Redirect to homepage
  };

  return (
    <div style={{ marginLeft: '250px', height:'100vh' }}>
    {/* header */}
      <AppBar position="static" sx={{ backgroundColor: '#f5f5fc', borderBottom: '1px solid #ccc', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, ml: 0 , color: "#261c33", fontWeight: "bold" }}>
            Multi Factor Authentication
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


  


      
    
    <Container maxWidth="sm" style={{justifyContent:"center", alignContent:"center"}}>
      <Paper sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Multi-Factor Authentication
        </Typography>
        <Box>
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
          />
          <Button variant="contained" onClick={startEnrollMultiFactor} sx={{ backgroundColor: '#ac90ca', mt: 2 }}>
            Start Enrollment
          </Button>
          {loading && <CircularProgress sx={{ mt: 2 }} />}
        </Box>
        {verificationId && (
          <Box mt={3}>
            <TextField
              label="Verification Code"
              fullWidth
              margin="normal"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
            />
            <Button variant="contained" onClick={handleFinishEnrollment} sx={{ backgroundColor: '#ac90ca', mt: 2 }}>
              Finish Enrollment
            </Button>
          </Box>
        )}
      </Paper>
      <Modal open={enrolled} onClose={() => setEnrolled(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Enrollment completed successfully!
          </Typography>
          <Button variant="contained" onClick={handleModalClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </Container>

    </div>
  );
}

export default MultiFactorAuthentication;
