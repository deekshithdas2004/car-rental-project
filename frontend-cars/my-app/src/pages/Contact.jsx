import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Alert, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import api from '../services/api';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/contact', formData);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <Box>
            <Box sx={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: 'white', py: 8, textAlign: 'center' }}>
                <Typography variant="h2" sx={{ fontWeight: 800 }}>Contact Us</Typography>
            </Box>
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={7}>
                        <Paper sx={{ p: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Send Message</Typography>
                            {submitted && <Alert severity="success" sx={{ mb: 2 }}>Message sent successfully!</Alert>}
                            <Box component="form" onSubmit={handleSubmit}>
                                <TextField fullWidth label="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required sx={{ mb: 2 }} />
                                <TextField fullWidth label="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required sx={{ mb: 2 }} />
                                <TextField fullWidth multiline rows={4} label="Message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required sx={{ mb: 2 }} />
                                <Button type="submit" variant="contained" endIcon={<SendIcon />} sx={{ background: '#e94560', textTransform: 'none' }}>Send</Button>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Paper sx={{ p: 3, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <LocationOnIcon sx={{ color: '#e94560' }} />
                            <Box><Typography fontWeight={600}>Address</Typography><Typography variant="body2">123 Luxury Ave, Beverly Hills, CA</Typography></Box>
                        </Paper>
                        <Paper sx={{ p: 3, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <EmailIcon sx={{ color: '#e94560' }} />
                            <Box><Typography fontWeight={600}>Email</Typography><Typography variant="body2">info@luxdrive.com</Typography></Box>
                        </Paper>
                        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <PhoneIcon sx={{ color: '#e94560' }} />
                            <Box><Typography fontWeight={600}>Phone</Typography><Typography variant="body2">+1 (555) 123-4567</Typography></Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Contact;