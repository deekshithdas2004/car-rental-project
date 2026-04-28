import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Grid,
    Paper,
    Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
    };

    const contactInfo = [
        {
            icon: <LocationOnIcon sx={{ color: '#e94560', fontSize: 28 }} />,
            title: 'Address',
            detail: '123 Luxury Avenue, Beverly Hills, CA 90210',
        },
        {
            icon: <EmailIcon sx={{ color: '#e94560', fontSize: 28 }} />,
            title: 'Email',
            detail: 'info@luxdrive.com',
        },
        {
            icon: <PhoneIcon sx={{ color: '#e94560', fontSize: 28 }} />,
            title: 'Phone',
            detail: '+1 (555) 123-4567',
        },
    ];

    return (
        <Box>
            <Box className="contact-hero">
                <Container maxWidth="lg">
                    <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
                        Contact Us
                    </Typography>
                    <Typography variant="h5" sx={{ opacity: 0.9 }}>
                        We'd love to hear from you. Get in touch with our team.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={7}>
                        <Paper className="contact-form-container">
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                                Send us a Message
                            </Typography>

                            {submitted && (
                                <Alert severity="success" sx={{ mb: 3 }}>
                                    Thank you for your message! We'll get back to you soon.
                                </Alert>
                            )}

                            <Box component="form" onSubmit={handleSubmit} noValidate>
                                <TextField
                                    fullWidth
                                    label="Your Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    margin="normal"
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    margin="normal"
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Your Message"
                                    name="message"
                                    multiline
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    error={!!errors.message}
                                    helperText={errors.message}
                                    margin="normal"
                                    required
                                    sx={{ mb: 3 }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    endIcon={<SendIcon />}
                                    fullWidth
                                    sx={{
                                        background: '#e94560',
                                        py: 1.5,
                                        textTransform: 'none',
                                        fontSize: '1.1rem',
                                        '&:hover': { background: '#d63550' },
                                    }}
                                >
                                    Send Message
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>

                    <Container maxWidth="lg">
    <Grid container justifyContent="center">
        
        {/* CENTERED COLUMN */}
        <Grid item xs={12} md={8}>

            {/* CONTACT CARDS */}
            <Box sx={{ mb: 4 }}>
                {contactInfo.map((info, index) => (
                    <Paper
                        key={index}
                        elevation={2}
                        sx={{
                            p: 3,
                            mb: 2,
                            borderRadius: 3,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        {info.icon}

                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {info.title}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {info.detail}
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </Box>

            {/* MAP */}
            <Paper
                elevation={2}
                sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    width: '100%',
                    height: 400
                }}
            >
                <iframe
                    title="LuxDrive Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.0!2d-118.4004!3d34.0736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA0JzI1LjAiTiAxMTjCsDI0JzAxLjQiVw!5e0!3m2!1sen!2sus!4v1"
                />
            </Paper>

        </Grid>

    </Grid>
</Container>
                </Grid>
            </Container>
        </Box>
    );
};

export default Contact;