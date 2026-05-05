import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', { email, password });
            if (res.data === 'Invalid Password' || res.data === 'unAuthorized') {
                setError('Invalid credentials');
            } else {
                login(res.data);
                navigate('/');
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
            <Paper sx={{ p: 4, maxWidth: 450, width: '100%', borderRadius: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <LoginIcon sx={{ fontSize: 48, color: '#e94560' }} />
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>Welcome Back</Typography>
                </Box>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField fullWidth label="Email" value={email} onChange={e => setEmail(e.target.value)} required sx={{ mb: 2 }} />
                    <TextField fullWidth type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} required sx={{ mb: 2 }} />
                    <Button type="submit" fullWidth variant="contained" size="large" sx={{ background: '#e94560', textTransform: 'none' }}>Sign In</Button>
                </Box>
                <Typography sx={{ mt: 2, textAlign: 'center' }}>
                    Don't have an account? <Link to="/signup" style={{ color: '#e94560', textDecoration: 'none' }}>Sign Up</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;