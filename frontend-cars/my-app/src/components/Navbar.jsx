import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Box,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

    const { user, logout } = useAuth(); // ✅ simplified
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // ✅ FIXED logout (async cookie)
    const handleLogout = async () => {
        await logout();
        navigate('/');
        handleClose();
    };

    // ✅ BASE LINKS
    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/cars', label: 'Cars' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
    ];

    return (
        <AppBar position="sticky" sx={{ background: '#1a1a2e' }}>
            <Toolbar>
                <DirectionsCarIcon sx={{ mr: 1, color: '#e94560' }} />

                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'white',
                        fontWeight: 700,
                        letterSpacing: 1,
                    }}
                >
                    LuxDrive
                </Typography>

                {/* ================= MOBILE ================= */}
                {isMobile ? (
                    <>
                        <IconButton color="inherit" onClick={handleMenu}>
                            <MenuIcon />
                        </IconButton>

                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>

                            {/* Base Links */}
                            {navLinks.map((link) => (
                                <MenuItem key={link.to} component={Link} to={link.to} onClick={handleClose}>
                                    {link.label}
                                </MenuItem>
                            ))}

                            {/* ✅ USER LINKS */}
                            {user && (
                                <>
                                    <MenuItem component={Link} to="/cart" onClick={handleClose}>
                                        Cart
                                    </MenuItem>

                                    <MenuItem component={Link} to="/bookings" onClick={handleClose}>
                                        Bookings
                                    </MenuItem>
                                </>
                            )}

                            {/* ✅ ADMIN */}
                            {user?.role === "admin" && (
                                <MenuItem component={Link} to="/admin" onClick={handleClose}>
                                    Admin Dashboard
                                </MenuItem>
                            )}

                            {/* AUTH */}
                            {user ? (
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            ) : (
                                <>
                                    <MenuItem component={Link} to="/login" onClick={handleClose}>
                                        Login
                                    </MenuItem>
                                    <MenuItem component={Link} to="/signup" onClick={handleClose}>
                                        Signup
                                    </MenuItem>
                                </>
                            )}
                        </Menu>
                    </>
                ) : (

                    /* ================= DESKTOP ================= */
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                        {navLinks.map((link) => (
                            <Button
                                key={link.to}
                                component={Link}
                                to={link.to}
                                color="inherit"
                                sx={{ textTransform: 'none', '&:hover': { color: '#e94560' } }}
                            >
                                {link.label}
                            </Button>
                        ))}

                        {/* ✅ USER LINKS */}
                        {user && (
                            <>
                                <Button component={Link} to="/cart" color="inherit">
                                    Cart
                                </Button>

                                <Button component={Link} to="/bookings" color="inherit">
                                    Bookings
                                </Button>
                            </>
                        )}

                        {/* ✅ ADMIN */}
                        {user?.role === "admin" && (
                            <Button component={Link} to="/admin" color="inherit">
                                Admin
                            </Button>
                        )}

                        {user ? (
                            <>
                                <Typography sx={{ mx: 1, color: '#e94560' }}>
                                    {user.name}
                                </Typography>

                                <Button
                                    onClick={handleLogout}
                                    variant="outlined"
                                    sx={{
                                        borderColor: '#e94560',
                                        color: '#e94560',
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button component={Link} to="/login" color="inherit">
                                    Login
                                </Button>

                                <Button
                                    component={Link}
                                    to="/signup"
                                    variant="contained"
                                    sx={{
                                        background: '#e94560',
                                        '&:hover': { background: '#d63550' },
                                    }}
                                >
                                    Signup
                                </Button>
                            </>
                        )}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;