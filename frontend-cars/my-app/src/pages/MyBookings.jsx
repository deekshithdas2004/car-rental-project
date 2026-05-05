import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Chip,
    Button,
    Grid,
    CardMedia
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import api from '../services/api';

const MyBookings = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);

    const RUPEE = "\u20B9";

    useEffect(() => {
        if (user) {
            api.get(`/bookings/user/${user._id}`).then(res =>
                setBookings(res.data)
            );
        }
    }, [user]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'success';
            case 'pending':
                return 'warning';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
                My Bookings
            </Typography>

            {bookings.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                        No bookings yet
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ mt: 2, background: '#e94560' }}
                        onClick={() => navigate('/cars')}
                    >
                        Browse Cars
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {bookings.map((booking) => (
                        <Grid item xs={12} md={6} key={booking._id}>
                            <Paper sx={{ p: 3 }}>
                                {/* ✅ CAR IMAGE ADDED HERE */}
                                {booking.carImage && (
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={booking.carImage}
                                        alt={booking.carName}
                                        sx={{ borderRadius: 2, mb: 2, objectFit: 'cover' }}
                                    />
                                )}

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        mb: 2
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        {booking.carName}
                                    </Typography>
                                    <Chip
                                        label={booking.status}
                                        color={getStatusColor(booking.status)}
                                        size="small"
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 1
                                    }}
                                >
                                    <CalendarTodayIcon
                                        sx={{ fontSize: 16, color: '#e94560' }}
                                    />
                                    <Typography variant="body2">
                                        {booking.pickupDate} to {booking.returnDate}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 2
                                    }}
                                >
                                    <DirectionsCarIcon
                                        sx={{ fontSize: 16, color: '#e94560' }}
                                    />
                                    <Typography variant="body2">
                                        {booking.totalDays} days
                                    </Typography>
                                </Box>

                                <Typography
                                    variant="h6"
                                    sx={{ color: '#e94560', fontWeight: 700 }}
                                >
                                    {RUPEE}{booking.totalAmount}
                                </Typography>

                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Payment:{' '}
                                    <Chip
                                        label={booking.paymentStatus}
                                        size="small"
                                        color={
                                            booking.paymentStatus === 'paid'
                                                ? 'success'
                                                : 'warning'
                                        }
                                    />
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default MyBookings;