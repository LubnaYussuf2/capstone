import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { auth } from './firebase';

const Logout = () => {
  const handleLogout = async () => {
    try {
      // Perform logout action
      await auth.signOut();
      // Redirect or perform any other action after logout
      window.location.href = '/login'; // Redirect to login page after logout
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle error if necessary
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" gutterBottom>
        Logout
      </Typography>
      <Typography variant="body1" paragraph>
        Are you sure you want to logout?
      </Typography>
      <Button onClick={handleLogout} variant="contained" color="primary">
        Logout
      </Button>
    </Container>
  );
};

export default Logout;
