import React, { useState } from 'react';
import { Box, Button, Container, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection} from 'firebase/firestore';
import { auth, db } from './firebase';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      //await set(); // Save additional user data to Firestore
      window.location.href = '/login'; // Redirect on successful registration
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Failed to register. Please try again.');
    }
  };

  // const collectionRef = collection(db, 'mfa')
  // const set = async () => {
  //   const userDocRef = setDoc(db, 'mfa', "users");
  //   await setDoc(userDocRef, { name, email });
  //   console.log('User data submitted to Firestore');
  
  // };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
      strength++;
    }
    if (password.match(/[0-9]/)) {
      strength++;
    }
    if (password.match(/[^a-zA-Z0-9]/)) {
      strength++;
    }
    if (password.length >= 8) {
      strength++;
    }
    const percentage = (strength / 4) * 100;
    setPasswordStrength(percentage);
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
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
            />
            <Box mt={2}>
              <LinearProgress
                variant="determinate"
                value={passwordStrength}
              />
            </Box>
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ backgroundColor: '#ac90ca' }}
              >
                Register
              </Button>
            </Box>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
