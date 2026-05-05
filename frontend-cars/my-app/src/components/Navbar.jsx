import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Don't show navbar on login/signup pages (optional - remove if you want it everywhere)
    const hideOnAuth = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <AppBar position="sticky" sx={{ background: '#1a1a2e' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DirectionsCarIcon sx={{ color: '#e94560' }} />
                    <Typography 
                        variant="h6" 
                        component={Link} 
                        to="/" 
                        sx={{ textDecoration: 'none', color: 'white', fontWeight: 700 }}
                    >
                        LuxDrive
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button component={Link} to="/" sx={{ color: 'white', textTransform: 'none' }}>
                        Home
                    </Button>
                    
                    {/* ONLY SHOW CARS IF LOGGED IN */}
                    {user && (
                        <Button component={Link} to="/cars" sx={{ color: 'white', textTransform: 'none' }}>
                            Cars
                        </Button>
                    )}
                    
                    <Button component={Link} to="/about" sx={{ color: 'white', textTransform: 'none' }}>
                        About
                    </Button>
                    <Button component={Link} to="/contact" sx={{ color: 'white', textTransform: 'none' }}>
                        Contact
                    </Button>
                    
                    {user ? (
                        <>
                            <Button component={Link} to="/my-bookings" sx={{ color: 'white', textTransform: 'none' }}>
                                My Bookings
                            </Button>
                            <Button 
                                startIcon={<AccountCircleIcon />}
                                component={Link} 
                                to="/profile" 
                                sx={{ color: '#e94560', textTransform: 'none' }}
                            >
                                {user.name}
                            </Button>
                            <Button 
                                onClick={handleLogout} 
                                variant="outlined" 
                                size="small"
                                sx={{ color: '#e94560', borderColor: '#e94560', textTransform: 'none' }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button component={Link} to="/login" sx={{ color: 'white', textTransform: 'none' }}>
                                Login
                            </Button>
                            <Button 
                                component={Link} 
                                to="/signup" 
                                variant="contained" 
                                sx={{ background: '#e94560', textTransform: 'none' }}
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;