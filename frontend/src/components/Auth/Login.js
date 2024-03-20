import React from 'react';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" justifyContent="center">
        <Paper sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Email" fullWidth margin="normal" />
            <TextField label="Password" fullWidth margin="normal" type="password" />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
