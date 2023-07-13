import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import Mahasiswa from './pages/Mahasiswa';
import AboutMe from './pages/AboutMe';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.reload(); // Refresh the page
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/mahasiswa" element={<Mahasiswa />} />
              <Route path="/aboutme" element={<AboutMe />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
