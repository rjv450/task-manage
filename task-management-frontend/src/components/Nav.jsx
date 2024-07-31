import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar'; // Import Avatar component
import { useLocation, Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person'; // Import default avatar icon

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/home';
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  // Retrieve user picture from local storage
  const userPicture = localStorage.getItem('picture');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('picture');
    navigate('/'); 
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'blue' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TM
          </Typography>
          {!isHomePage && !isLoggedIn && (
            <>
              <Button
                component={Link}
                to="/"
                sx={{
                  color: location.pathname === '/' ? 'yellow' : 'inherit',
                  fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                sx={{
                  color: location.pathname === '/signup' ? 'yellow' : 'inherit',
                  fontWeight: location.pathname === '/signup' ? 'bold' : 'normal',
                }}
              >
                Sign Up
              </Button>
            </>
          )}
          {isHomePage && isLoggedIn && (
            <>
              <Button
                onClick={handleLogout}
                sx={{
                  ml: 2,
                  backgroundColor: 'red',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'darkred',
                  },
                }}
              >
                Logout
              </Button>
              <Avatar
                src={userPicture || undefined} // Use default avatar if picture is not found
                alt="User Avatar"
                sx={{
                  ml: 2,
                  width: 24,
                  height: 24,
                  bgcolor: userPicture ? undefined : 'grey', // Set background color if no picture
                }}
              >
                {!userPicture && <PersonIcon />} {/* Fallback icon */}
              </Avatar>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
