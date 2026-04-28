import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    Box,
    Grid,
    Paper,
    CircularProgress,
    Chip,
    Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import api from '../services/api';

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const { data } = await api.get(`/cars/${id}`);
                setCar(data);
            } catch (error) {
                console.error('Error fetching car:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    if (loading) {
        return (
            <Box className="loading-container">
                <CircularProgress sx={{ color: '#e94560' }} />
            </Box>
        );
    }

    if (!car) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h4">Car not found</Typography>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/cars')}
                    sx={{ mt: 2 }}
                >
                    Back to Cars
                </Button>
            </Container>
        );
    }

    const specs = [
        { icon: <SpeedIcon />, label: 'Top Speed', value: car.specs.speed },
        { icon: <SettingsIcon />, label: 'Engine', value: car.specs.engine },
        { icon: <EventSeatIcon />, label: 'Seats', value: `${car.specs.seats} Seats` },
        { icon: <LocalGasStationIcon />, label: 'Fuel Type', value: car.specs.fuel },
    ];

    return (
        <Box>
            <Box className="car-details-hero">
                <img src={car.image} alt={car.name} />
                <Box className="car-details-overlay">
                    <Container maxWidth="lg">
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/cars')}
                            sx={{ color: 'white', mb: 2, textTransform: 'none' }}
                        >
                            Back to Fleet
                        </Button>
                        <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
                            {car.name}
                        </Typography>
                        <Chip
                            label={`$${car.pricePerDay} / day`}
                            sx={{
                                background: '#e94560',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                px: 1,
                            }}
                        />
                    </Container>
                </Box>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={7}>
                        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                                About This Vehicle
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ lineHeight: 1.8, color: 'text.secondary', fontSize: '1.05rem' }}
                            >
                                {car.description}
                            </Typography>
                        </Paper>

                        <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mt: 3 }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                                Specifications
                            </Typography>
                            <Grid container spacing={3}>
                                {specs.map((spec, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Box className="spec-item">
                                            <Box sx={{ color: '#e94560', mb: 1 }}>{spec.icon}</Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                {spec.label}
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {spec.value}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                position: 'sticky',
                                top: 100,
                                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                                color: 'white',
                            }}
                        >
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                                Book This Car
                            </Typography>
                            <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 2 }} />

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                                    Daily Rate
                                </Typography>
                                <Typography variant="h3" sx={{ fontWeight: 800, color: '#e94560' }}>
                                    ${car.pricePerDay}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                                    Included Features
                                </Typography>
                                {['Full Insurance', 'Unlimited Mileage', '24/7 Roadside Assistance', 'Free Cancellation'].map(
                                    (feature) => (
                                        <Box key={feature} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <CalendarTodayIcon sx={{ fontSize: 16, color: '#e94560' }} />
                                            <Typography variant="body2">{feature}</Typography>
                                        </Box>
                                    )
                                )}
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={async () => {
                                    try {
                                        await api.post("/cart", {
                                            carId: car._id,
                                            carName: car.name,
                                            price: car.pricePerDay,
                                            image: car.image || " "
                                        });

                                        alert("Added to cart ");
                                    } catch (err) {
                                        alert("Please login first ");
                                    }
                                }}
                                sx={{
                                    background: '#e94560',
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    textTransform: 'none',
                                }}
                            >
                                Add to Cart
                            </Button>

                            <Typography
                                variant="caption"
                                sx={{ display: 'block', textAlign: 'center', mt: 2, opacity: 0.7 }}
                            >
                                No credit card required for reservation
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CarDetails;