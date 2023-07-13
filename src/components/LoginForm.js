import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, TextField, Typography, Link, Snackbar } from '@mui/material';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Kirim permintaan ke backend untuk otentikasi
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Simpan token di localStorage
        localStorage.setItem('token', token);

        // Menampilkan notifikasi login berhasil

        // Melakukan navigasi ke halaman utama
        navigate('/home');
        window.location.reload();
      } else {
        // Menampilkan pesan error jika otentikasi gagal
        toast.error('Login gagal. Periksa kredensial Anda dan coba lagi.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat login:', error);
      toast.error('Terjadi kesalahan saat login. Silakan coba lagi.');
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: '1rem' }}>
        Don't have an account? <Link component={RouterLink} to="/register">Register</Link>
      </Typography>
      <Snackbar open={showNotification} autoHideDuration={3000} onClose={handleCloseNotification} message="Login berhasil!" />
    </div>
  );
};

export default LoginForm;
