import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
            {isLoggedIn && (
              <>
                <li style={{ marginRight: '1rem' }}>
                  <Button color="inherit" component={Link} to="/" exact="true">
                    Home
                  </Button>
                </li>
                <li style={{ marginRight: '1rem' }}>
                  <Button color="inherit" component={Link} to="/mahasiswa">
                    Mahasiswa
                  </Button>
                </li>
                <li style={{ marginRight: '1rem' }}>
                  <Button color="inherit" component={Link} to="/aboutme">
                    About Me
                  </Button>
                </li>
              </>
            )}
            <li>
              {isLoggedIn ? (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                </>
              )}
            </li>
          </ul>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
