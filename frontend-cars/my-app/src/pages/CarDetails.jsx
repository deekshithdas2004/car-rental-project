import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    Box,
    Grid,
    Paper,
    Chip,
    CircularProgress,
    Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsIcon from '@mui/icons-material/Settings';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    const RUPEE = "\u20B9"; // ₹ symbol

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        api.get(`/cars/${id}`).then(res => {
            setCar(res.data);
            setLoading(false);
        });
    }, [id, user]);

    if (!user) {
        return (
            <Container maxWidth="sm" sx={{ py: 8 }}>
                <Alert severity="warning" icon={<LockIcon />}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        Login Required
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        Please login to view car details and make bookings.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/login')}
                        sx={{ background: '#e94560', textTransform: 'none' }}
                    >
                        Login
                    </Button>
                </Alert>
            </Container>
        );
    }

    if (loading)
        return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10 }} />;

    return (
        <Box>
            {/* HERO IMAGE */}
            <Box sx={{ position: 'relative', height: '60vh', overflow: 'hidden' }}>
                <img
                    src={car.image}
                    alt={car.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background:
                            'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        p: 4,
                        color: 'white'
                    }}
                >
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/cars')}
                        sx={{ color: 'white', mb: 2 }}
                    >
                        Back
                    </Button>

                    <Typography variant="h2" sx={{ fontWeight: 800 }}>
                        {car.name}
                    </Typography>

                    {/* ✅ RUPEE HERE */}
                    <Chip
                        label={`${RUPEE}${car.pricePerDay}/day`}
                        sx={{
                            background: '#e94560',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1.2rem',
                            mt: 1
                        }}
                    />
                </Box>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Grid container spacing={6}>
                    {/* LEFT SIDE */}
                    <Grid item xs={12} md={7}>
                        <Paper sx={{ p: 4, mb: 3 }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                                About This Vehicle
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                {car.description}
                            </Typography>
                        </Paper>

                        <Paper sx={{ p: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                                Specifications
                            </Typography>

                            <Grid container spacing={3}>
                                {[
                                    { icon: <SpeedIcon />, label: 'Top Speed', value: car.specs.speed },
                                    { icon: <SettingsIcon />, label: 'Engine', value: car.specs.engine },
                                    { icon: <EventSeatIcon />, label: 'Seats', value: `${car.specs.seats} Seats` },
                                    { icon: <LocalGasStationIcon />, label: 'Fuel', value: car.specs.fuel },
                                ].map((s, i) => (
                                    <Grid item xs={6} key={i}>
                                        <Box
                                            sx={{
                                                p: 3,
                                                background: '#f8f9fa',
                                                borderRadius: 2,
                                                textAlign: 'center'
                                            }}
                                        >
                                            <Box sx={{ color: '#e94560', mb: 1 }}>{s.icon}</Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {s.label}
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {s.value}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* RIGHT SIDE */}
                    <Grid item xs={12} md={5}>
                        <Paper
                            sx={{
                                p: 4,
                                background:
                                    'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                                color: 'white',
                                position: 'sticky',
                                top: 100
                            }}
                        >
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                                Book This Car
                            </Typography>

                            {/* ✅ RUPEE HERE */}
                            <Typography
                                variant="h3"
                                sx={{ color: '#e94560', fontWeight: 800, mb: 3 }}
                            >
                                {RUPEE}{car.pricePerDay}
                                <Typography component="span" variant="body1">
                                    {' '} /day
                                </Typography>
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                {[
                                    'Full Insurance',
                                    'Unlimited Mileage',
                                    '24/7 Support',
                                    'Free Cancellation'
                                ].map(f => (
                                    <Box
                                        key={f}
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
                                        <Typography variant="body2">{f}</Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={() => navigate(`/booking/${car._id}`)}
                                sx={{
                                    background: '#e94560',
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontSize: '1.1rem'
                                }}
                            >
                                Book Now
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CarDetails;