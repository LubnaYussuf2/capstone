import React, { useState } from 'react';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to homepage or handle registration success in any way you prefer
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Failed to register. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" justifyContent="center">
        <Paper sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
