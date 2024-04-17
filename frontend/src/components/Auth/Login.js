import React, { useState } from 'react';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false); // Initially set to false
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
     // setShowVerification(true); // Show verification form after successful login REMOVE IT IN BEGINNING
     if (!showVerification) {
      window.location.href = '/';
    }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" justifyContent="center">
        <Paper sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
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
              Login
            </Button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
