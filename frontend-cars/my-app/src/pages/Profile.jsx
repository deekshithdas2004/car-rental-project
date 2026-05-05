import React from 'react';
import { Container, Typography, Paper, Box, Avatar, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>My Profile</Typography>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, background: '#e94560' }}>
                    <AccountCircleIcon sx={{ fontSize: 60 }} />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{user.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                    <EmailIcon sx={{ color: '#e94560' }} />
                    <Typography variant="body1">{user.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                    <PhoneIcon sx={{ color: '#e94560' }} />
                    <Typography variant="body1">{user.phone || 'No phone added'}</Typography>
                </Box>
                <Button variant="contained" onClick={handleLogout} sx={{ background: '#e94560', textTransform: 'none' }}>
                    Logout
                </Button>
            </Paper>
        </Container>
    );
};

export default Profile;