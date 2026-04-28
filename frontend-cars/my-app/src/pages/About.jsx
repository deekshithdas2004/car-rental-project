import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Box,
    Paper,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const About = () => {
    const values = [
        {
            icon: <DirectionsCarIcon sx={{ fontSize: 40, color: '#e94560' }} />,
            title: 'Premium Fleet',
            description:
                'Our carefully curated collection features only the finest luxury and exotic vehicles from world-renowned manufacturers.',
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 40, color: '#e94560' }} />,
            title: 'Trusted Service',
            description:
                'With over a decade of experience, we have built a reputation for reliability, transparency, and exceptional customer care.',
        },
        {
            icon: <SupportAgentIcon sx={{ fontSize: 40, color: '#e94560' }} />,
            title: '24/7 Support',
            description:
                'Our dedicated team is available around the clock to ensure your rental experience is smooth and worry-free.',
        },
        {
            icon: <EmojiEventsIcon sx={{ fontSize: 40, color: '#e94560' }} />,
            title: 'Excellence',
            description:
                'We strive for perfection in every interaction, from the moment you browse our fleet to the moment you return your vehicle.',
        },
    ];

    return (
        <Box>
            <Box className="about-hero">
                <Container maxWidth="lg">
                    <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
                        About LuxDrive
                    </Typography>
                    <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: 700, mx: 'auto' }}>
                        Redefining luxury car rentals with passion, precision, and unparalleled service
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 8 }}>
                {/* Mission & Vision */}
                <Grid container spacing={4} sx={{ mb: 8 }}>
                    <Grid item xs={12} md={6}>
                        <Paper className="mission-card">
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1a1a2e' }}>
                                Our Mission
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                                To provide an extraordinary driving experience by offering access to the world's
                                most prestigious vehicles. We believe that luxury should be accessible, and every
                                journey should be memorable. Our mission is to deliver not just a car, but an
                                unforgettable experience that exceeds expectations.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className="mission-card">
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1a1a2e' }}>
                                Our Vision
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                                To become the world's most trusted luxury car rental service, known for our
                                exceptional fleet, impeccable service, and commitment to customer satisfaction.
                                We envision a future where anyone can experience the thrill of driving their
                                dream car, creating lasting memories on every journey.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                        Why Choose Us
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                        We are committed to delivering excellence in every aspect of our service
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
    <Grid
        container
        spacing={4}
        sx={{
            maxWidth: "1000px", // ✅ controls width
            justifyContent: "center"
        }}
    >
        {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        borderRadius: 3,
                        height: '100%',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-8px)' },
                    }}
                    elevation={2}
                >
                    <Box sx={{ mb: 2 }}>{value.icon}</Box>

                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {value.title}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.7 }}
                    >
                        {value.description}
                    </Typography>
                </Paper>
            </Grid>
        ))}
    </Grid>
</Box>

                <Box sx={{ mt: 8, background: '#f8f9fa', borderRadius: 4, p: 6 }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
                        Our Services
                    </Typography>
                    <Grid container spacing={3}>
                        {[
                            'Luxury Car Rentals',
                            'Corporate Fleet Solutions',
                            'Wedding & Event Rentals',
                            'Airport Pickup & Drop-off',
                            'Long-term Leasing',
                            'Chauffeur Services',
                            'Self-Drive Rentals',
                            'Hourly Car Rentals',
                        ].map((service, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 2,
                                        background: 'white',
                                        borderRadius: 2,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            background: '#e94560',
                                        }}
                                    />
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                        {service}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default About;