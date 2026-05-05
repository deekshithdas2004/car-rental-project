import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper, Grid } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Booking = () => {
    const { carId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [car, setCar] = useState(null);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [phone, setPhone] = useState(user?.phone || '');

    useEffect(() => {
        api.get(`/cars/${carId}`).then(res => setCar(res.data));
    }, [carId]);

    const calculateDays = () => {
        if (!pickupDate || !returnDate) return 0;
        const diff = new Date(returnDate) - new Date(pickupDate);
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const totalAmount = calculateDays() * (car?.pricePerDay || 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const days = calculateDays();
        if (days <= 0) {
            alert('Please select valid dates');
            return;
        }

        const bookingData = {
            userId: user._id,
            carId: car._id,
            carName: car.name,
            carImage: car.image,        // ← SEND CAR IMAGE
            userName: user.name,
            userEmail: user.email,
            phone,
            pickupDate,
            returnDate,
            totalDays: days,
            totalAmount
        };

        try {
            const res = await api.post('/bookings', bookingData);
            if (res.data.booking) {
                navigate(`/payment/${res.data.booking._id}`);
            }
        } catch (err) {
            alert('Booking failed');
        }
    };

    if (!car) return null;

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
                Complete Your Booking
            </Typography>
            <Paper sx={{ p: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <img src={car.image} alt={car.name} style={{ width: '100%', borderRadius: 8 }} />
                        <Typography variant="h5" sx={{ mt: 2, fontWeight: 700 }}>{car.name}</Typography>
                        <Typography variant="h6" sx={{ color: '#e94560' }}>₹{car.pricePerDay}/day</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField fullWidth label="Full Name" value={user?.name || ''} disabled sx={{ mb: 2 }} />
                            <TextField fullWidth label="Email" value={user?.email || ''} disabled sx={{ mb: 2 }} />
                            <TextField fullWidth label="Phone" value={phone} onChange={e => setPhone(e.target.value)} required sx={{ mb: 2 }} />
                            <TextField fullWidth type="date" label="Pickup Date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} required sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
                            <TextField fullWidth type="date" label="Return Date" value={returnDate} onChange={e => setReturnDate(e.target.value)} required sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
                            
                            <Box sx={{ p: 2, background: '#f8f9fa', borderRadius: 2, mb: 2 }}>
                                <Typography>Total Days: {calculateDays()}</Typography>
                                <Typography variant="h5" sx={{ color: '#e94560', fontWeight: 700 }}>Total: ₹{totalAmount}</Typography>
                            </Box>
                            
                            <Button type="submit" fullWidth variant="contained" size="large" sx={{ background: '#e94560', textTransform: 'none' }}>
                                Proceed to Payment
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Booking;