import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const Footer = () => {
    return (
        <Box className="footer">
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <DirectionsCarIcon sx={{ mr: 1, color: '#e94560' }} />
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                LuxDrive
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.8 }}>
                            Experience luxury on wheels with our premium car rental service.
                            We offer the finest selection of exotic and luxury vehicles for
                            every occasion.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            Quick Links
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {['Home', 'Cars', 'About', 'Contact'].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase()}`}
                                    color="inherit"
                                    underline="hover"
                                    sx={{ opacity: 0.8 }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            Contact Info :
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 2 }}>
                            123 Luxury Avenue<br />
                            Mangalore , CA 90210<br />
                            Email: info@luxdrive.com<br />
                            Phone: 0123456789
                        </Typography>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        mt: 4,
                        pt: 3,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="body2" sx={{ opacity: 0.6 }}>
                        © {new Date().getFullYear()} LuxDrive. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;