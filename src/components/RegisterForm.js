import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Link as MuiLink } from '@mui/material';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register', { username, password });
      console.log(response.data); // Optional: handle successful registration response

      // Clear field dan state error
      setUsername('');
      setPassword('');
      setError('');
    } catch (error) {
      setError('Failed to register');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </Box>
        <Typography variant="body2" color="textSecondary">
          Already have an account? <MuiLink component={Link} to="/login">Login</MuiLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterForm;
