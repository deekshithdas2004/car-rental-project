import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    Grid,
    Box,
    CircularProgress,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import api from '../services/api';
import CarCard from '../components/CarCard';

const Home = () => {
    const navigate = useNavigate();
    const [featuredCars, setFeaturedCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const { data } = await api.get('/cars');
                setFeaturedCars(data.slice(0, 3));
            } catch (error) {
                console.error('Error fetching cars:', error);
                setFeaturedCars([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    return (
        <Box>
            <Box className="hero-section">
                <Box className="hero-content">
                    <Typography variant="h1" className="hero-title">
                        Drive Your Dreams
                    </Typography>
                    <br />
                    <Typography variant="h5" className="hero-subtitle">
                        Experience the thrill of luxury with our exclusive collection of
                        premium vehicles. From supercars to luxury sedans, we have the
                        perfect ride for every occasion.
                    </Typography>
                    <br />
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => navigate('/cars')}
                        className="hero-button"
                        sx={{
                            background: '#e94560',
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            textTransform: 'none',
                            '&:hover': { background: '#d63550' },
                        }}
                    >
                        Explore Our Fleet
                    </Button>
                </Box>
            </Box>

            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                        Featured Vehicles
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                        Handpicked from our premium collection, these vehicles represent the
                        pinnacle of automotive excellence.
                    </Typography>
                </Box>

                {loading ? (
                    <Box className="loading-container">
                        <CircularProgress sx={{ color: '#e94560' }} />
                    </Box>
                ) : (
                    <>
                        {featuredCars.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="h6" color="text.secondary">
                                    No cars available yet. Visit the Cars page to add them!
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2, background: '#e94560', textTransform: 'none' }}
                                    onClick={() => navigate('/cars')}
                                >
                                    Go to Fleet
                                </Button>
                            </Box>
                        ) : (
                            <Grid container spacing={4}>
                                {featuredCars.map((car) => (
                                    <Grid item xs={12} md={4} key={car._id}>
                                        <CarCard car={car} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </>
                )}

                <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <Button
                        variant="outlined"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => navigate('/cars')}
                        sx={{
                            borderColor: '#1a1a2e',
                            color: '#1a1a2e',
                            textTransform: 'none',
                            px: 4,
                            '&:hover': {
                                borderColor: '#e94560',
                                color: '#e94560',
                                background: 'transparent',
                            },
                        }}
                    >
                        View All Cars
                    </Button>
                </Box>
            </Container>

            <Box sx={{ background: '#f8f9fa', py: 8 }}>
    <Container maxWidth="lg">

        <Box
            sx={{
                display: "flex",
                gap: 4,
                justifyContent: "space-between",
                flexWrap: "nowrap" // 🔥 keeps in one line
            }}
        >
            {[
                { title: 'Premium Selection', desc: 'Curated fleet of the world\'s most prestigious vehicles' },
                { title: 'Best Rates', desc: 'Competitive pricing with no hidden fees or surprises' },
                { title: '24/7 Support', desc: 'Round-the-clock assistance for peace of mind' },
            ].map((feature, index) => (
                <Box
                    key={index}
                    sx={{
                        flex: 1,
                        textAlign: 'center',
                        p: 4,
                        background: 'white',
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                        {feature.title}
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        {feature.desc}
                    </Typography>
                </Box>
            ))}
        </Box>

    </Container>
</Box>
        </Box>
    );
};

export default Home;