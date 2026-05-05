import React from 'react';
import { Container, Typography, Grid, Box, Paper } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const About = () => {
    const values = [
        { icon: <DirectionsCarIcon sx={{ fontSize: 40, color: '#e94560' }} />, title: 'Premium Fleet', desc: 'Curated collection of world\'s finest vehicles' },
        { icon: <SecurityIcon sx={{ fontSize: 40, color: '#e94560' }} />, title: 'Trusted Service', desc: 'Over a decade of excellence in car rentals' },
        { icon: <SupportAgentIcon sx={{ fontSize: 40, color: '#e94560' }} />, title: '24/7 Support', desc: 'Round-the-clock assistance for peace of mind' },
        { icon: <EmojiEventsIcon sx={{ fontSize: 40, color: '#e94560' }} />, title: 'Excellence', desc: 'Committed to perfection in every interaction' },
        {
            icon: <SecurityIcon sx={{ fontSize: 40, color: '#e94560' }} />,
            title: 'Safety',
            desc: 'Ensuring secure and reliable rides for every customer'
        },
    ];

    return (
        <Box>
            <Box sx={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: 'white', py: 10, textAlign: 'center' }}>
                <Container maxWidth="lg">
                    <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>About LuxDrive</Typography>
                    <Typography variant="h5">Redefining luxury car rentals with passion and precision</Typography>
                </Container>
            </Box>
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={4} sx={{ mb: 8 }}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 4, height: '100%' }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1a1a2e' }}>Our Mission</Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>To provide extraordinary driving experiences by offering access to the world's most prestigious vehicles.</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 4, height: '100%' }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1a1a2e' }}>Our Vision</Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>To become the world's most trusted luxury car rental service, known for exceptional fleet and service.</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Typography variant="h3" sx={{ textAlign: 'center', mb: 4, fontWeight: 700 }}>Why Choose Us</Typography>
                <Grid container spacing={4}>
                    {values.map((v, i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                                <Box sx={{ mb: 2 }}>{v.icon}</Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{v.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{v.desc}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default About;