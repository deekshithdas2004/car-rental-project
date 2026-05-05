import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Box, CircularProgress, TextField, InputAdornment, Alert, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import CarCard from '../components/CarCard';

const Cars = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        api.get('/cars').then(res => {
            setCars(res.data);
            setFiltered(res.data);
            setLoading(false);
        });
    }, [user]);

    useEffect(() => {
        const f = cars.filter(c => 
            c.name.toLowerCase().includes(search.toLowerCase()) || 
            c.description.toLowerCase().includes(search.toLowerCase())
        );
        setFiltered(f);
    }, [search, cars]);

    // If not logged in, show login prompt
    if (!user) {
        return (
            <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Container maxWidth="sm">
                    <Alert 
                        severity="warning" 
                        icon={<LockIcon />}
                        sx={{ mb: 3, py: 3 }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                            Access Restricted
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Please login to view our premium car fleet and make bookings.
                        </Typography>
                        <Button 
                            variant="contained" 
                            onClick={() => navigate('/login')}
                            sx={{ background: '#e94560', textTransform: 'none' }}
                        >
                            Login Now
                        </Button>
                    </Alert>
                </Container>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: 'white', py: 6, textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>Our Fleet</Typography>
                <Typography variant="body1" sx={{ mt: 1, opacity: 0.8 }}>Welcome back, {user.name}!</Typography>
            </Box>
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <TextField 
                    fullWidth 
                    placeholder="Search cars..." 
                    value={search} 
                    onChange={e => setSearch(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                    sx={{ mb: 4, maxWidth: 500, mx: 'auto', display: 'block' }} 
                />
                {loading ? <CircularProgress sx={{ display: 'block', mx: 'auto' }} /> : (
                    <>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {filtered.length} vehicles found
                        </Typography>
                        <Grid container spacing={4}>
                            {filtered.map(car => (
                                <Grid item xs={12} sm={6} md={4} key={car._id}>
                                    <CarCard car={car} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default Cars;