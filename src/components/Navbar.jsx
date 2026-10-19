
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import {
  checkAuthentication,
  LoginWithCookie,
  Logout,
} from '../services/AuthService';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const menuOpen = Boolean(anchorElUser);

  
  useEffect(() => {
    let isMounted = true;

    const checkAuthStatus = async () => {
      try {
        const result = await checkAuthentication();

console.log('Auth result:', result);
console.log('Is boolean false:', result === false);

if (isMounted) {
  setIsLoggedIn(result !== false && result != null);
}
      } catch (error) {
        console.error('Authentication check failed:', error);

        if (isMounted) {
          setIsLoggedIn(false);
        }
      }
    };

    checkAuthStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    setErrorMessage('');
  };

  const handleCloseMenu = () => {
    setAnchorElUser(null);
    setErrorMessage('');
  };


  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage('');

    try {
      await LoginWithCookie(email, password);

      
      const result = await checkAuthentication();

      if (result === false || result == null) {
        setIsLoggedIn(false);
        setErrorMessage(
          'Login could not be verified. Please check your credentials.'
        );
        return;
      }

      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
      handleCloseMenu();
    } catch (error) {
      console.error('Login failed:', error);

      setErrorMessage(
        error.response?.status === 401
          ? 'Invalid email or password.'
          : 'Unable to log in. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

 
  const handleLogout = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const result = await Logout();

      if (result !== true) {
        setErrorMessage(
          'Logout could not be confirmed. Please try again.'
        );
        return;
      }

      setIsLoggedIn(false);
      setEmail('');
      setPassword('');
      handleCloseMenu();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      setErrorMessage('Unable to log out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo container pushes elements following it to the right */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            Cost Tracker
          </Typography>
        </Box>

        {/* Navigation links: logged-in users only */}
        {isLoggedIn && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mr: 2,
            }}
          >
            <Button
              color="inherit"
              component={RouterLink}
              to="/subscriptions"
            >
              My Subscriptions
            </Button>

            <Button
              color="inherit"
              component={RouterLink}
              to="/dashboard"
            >
              My Dashboard
            </Button>
          </Box>
        )}

        {/* Login / Profile button */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title={isLoggedIn ? "Account settings" : "Log in"}>
            {isLoggedIn ? (
              <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" />
              </IconButton>
            ) : (
              <Button color="inherit" onClick={handleOpenMenu}>
                Login
              </Button>
            )}
          </Tooltip>
        </Box>

        {/* Dropdown content - auth sensitive */}
        <Menu
          anchorEl={anchorElUser}
          open={menuOpen}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                width: isLoggedIn ? 200 : 320,
                maxWidth: 'calc(100vw - 32px)',
                p: isLoggedIn ? 0 : 2,
              },
            },
          }}
        >
          {isLoggedIn ? (
            <MenuItem
              onClick={handleLogout}
              disabled={loading}
              sx={{ color: 'error.main' }}
            >
              Log Out
            </MenuItem>
          ) : (
            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="h6">
                Welcome back
              </Typography>

              {errorMessage && (
                <Alert severity="error">
                  {errorMessage}
                </Alert>
              )}

              <TextField
                label="E-mail"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                size="small"
                fullWidth
                required
                disabled={loading}
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                size="small"
                fullWidth
                required
                disabled={loading}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  'Log In'
                )}
              </Button>

              <Button
                component={RouterLink}
                to="/register"
                variant="outlined"
                fullWidth
                disabled={loading}
                onClick={handleCloseMenu}
              >
                Register
              </Button>
            </Box>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
