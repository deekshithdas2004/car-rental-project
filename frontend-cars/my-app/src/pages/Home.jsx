import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    Box,
    Grid,
    Paper
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockIcon from '@mui/icons-material/Lock';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useAuth } from '../context/AuthContext';
import SpeedIcon from '@mui/icons-material/Speed';
import VerifiedIcon from '@mui/icons-material/Verified';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <Box>

            <Box
                sx={{
                    height: '80vh',
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'white',
                    position: 'relative'
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.6)',
                        zIndex: 0
                    }}
                />

                <Box sx={{ maxWidth: 800, p: 3, zIndex: 1 }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            fontSize: { xs: '2.5rem', md: '4rem' }
                        }}
                    >
                        LuxDrive
                    </Typography>

                    <Typography variant="h4" sx={{ mb: 2 }}>
                        Premium Car Rental
                    </Typography>

                    <Typography variant="h6" sx={{ mb: 4 }}>
                        Experience luxury on wheels with our exclusive fleet
                    </Typography>

                    {user ? (
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForwardIcon />}
                            onClick={() => navigate('/cars')}
                            sx={{
                                background: '#e94560',
                                px: 4,
                                py: 1.5,
                                textTransform: 'none'
                            }}
                        >
                            Explore Our Fleet
                        </Button>
                    ) : (
                        <Box>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<LockIcon />}
                                onClick={() => navigate('/login')}
                                sx={{
                                    background: '#e94560',
                                    px: 4,
                                    py: 1.5,
                                    textTransform: 'none'
                                }}
                            >
                                Login to View Cars
                            </Button>

                            <Typography sx={{ mt: 2 }}>
                                New user?{' '}
                                <Button
                                    onClick={() => navigate('/signup')}
                                    sx={{ color: '#e94560', textTransform: 'none' }}
                                >
                                    Sign Up
                                </Button>
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: 'center',
                        mb: 6,
                        fontWeight: 700,
                        color: '#1a1a2e'
                    }}
                >
                    Why Choose LuxDrive
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {[
                        {
                            icon: <DirectionsCarIcon sx={{ fontSize: 48, color: '#e94560' }} />,
                            title: 'Premium Fleet',
                            desc: "Curated collection of world's finest luxury vehicles"
                        },
                        {
                            icon: <SecurityIcon sx={{ fontSize: 48, color: '#e94560' }} />,
                            title: 'Secure Booking',
                            desc: 'Safe and encrypted payment system'
                        },
                        {
                            icon: <SupportAgentIcon sx={{ fontSize: 48, color: '#e94560' }} />,
                            title: '24/7 Support',
                            desc: 'Always here to help you anytime'
                        },
                        {
                            icon: <EmojiEventsIcon sx={{ fontSize: 48, color: '#e94560' }} />,
                            title: 'Best Rates',
                            desc: 'Affordable luxury with no hidden charges'
                        },
                        {
                            icon: <SpeedIcon sx={{ fontSize: 48, color: '#e94560' }} />,
                            title: 'Fast Booking',
                            desc: 'Book your dream car in just a few clicks'
                        },
                        {
                            icon: <VerifiedIcon sx={{ fontSize: 48, color: '#e94560' }} />,
                            title: 'Trusted Service',
                            desc: 'Thousands of happy customers trust our service'
                        },
                    ].map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper
                                sx={{
                                    p: 4,
                                    textAlign: 'center',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-8px)' }
                                }}
                            >
                                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {feature.desc}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {user && (
                <Box sx={{ background: '#f8f9fa', py: 8 }}>
                    <Container maxWidth="lg">
                        <Typography
                            variant="h3"
                            sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}
                        >
                            Featured Vehicles
                        </Typography>

                        <Grid container spacing={3} justifyContent="center">
                            {[
                                {
                                    name: 'Lamborghini Aventador',
                                    price: '\u20B925,000/day',
                                    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80'
                                },
                                {
                                    name: 'Rolls Royce Phantom',
                                    price: '\u20B930,000/day',
                                    img: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=400&q=80'
                                },
                                {
                                    name: 'Porsche 911',
                                    price: '\u20B915,000/day',
                                    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80'
                                },
                                {
                                    name: 'Lamborghini Aventador',
                                    price: '\u20B925,000/day',
                                    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80'
                                }
                            ].map((car, i) => (
                                <Grid item xs={12} md={4} key={i}>
                                    <Paper sx={{ overflow: 'hidden', borderRadius: 3 }}>
                                        <Box sx={{ height: 200 }}>
                                            <img
                                                src={car.img}
                                                alt={car.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </Box>

                                        <Box sx={{ p: 3, textAlign: 'center' }}>
                                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                {car.name}
                                            </Typography>

                                            <Typography
                                                variant="h6"
                                                sx={{ color: '#e94560', fontWeight: 700 }}
                                            >
                                                {car.price}
                                            </Typography>

                                            <Button
                                                fullWidth
                                                variant="contained"
                                                onClick={() => navigate('/cars')}
                                                sx={{
                                                    mt: 2,
                                                    background: '#1a1a2e',
                                                    textTransform: 'none'
                                                }}
                                            >
                                                View Details
                                            </Button>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            )}
        </Box>
    );
};

export default Home;