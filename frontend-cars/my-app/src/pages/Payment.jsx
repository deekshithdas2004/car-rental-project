import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper, Grid, Stepper, Step, StepLabel } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import api from '../services/api';

const Payment = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [paid, setPaid] = useState(false);

    useEffect(() => {
        api.get(`/bookings/${bookingId}`).then(res => setBooking(res.data));
    }, [bookingId]);

    const handlePayment = async (e) => {
        e.preventDefault();
        
        const paymentData = {
            bookingId,
            userId: booking.userId,
            amount: booking.totalAmount,
            paymentMethod: 'Credit Card',
            cardNumber: cardNumber.slice(-4),
            cardHolder
        };

        try {
            await api.post('/payments', paymentData);
            setPaid(true);
            setTimeout(() => navigate('/my-bookings'), 2000);
        } catch (err) {
            alert('Payment failed');
        }
    };

    if (!booking) return null;

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Stepper activeStep={paid ? 2 : 1} sx={{ mb: 4 }}>
                <Step><StepLabel>Booking</StepLabel></Step>
                <Step><StepLabel>Payment</StepLabel></Step>
                <Step><StepLabel>Confirmation</StepLabel></Step>
            </Stepper>

            {paid ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <CheckCircleIcon sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>Payment Successful!</Typography>
                    <Typography>Redirecting to your bookings...</Typography>
                </Box>
            ) : (
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Payment Details</Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 3, background: '#f8f9fa', borderRadius: 2, mb: 2 }}>
                                <Typography variant="h6" sx={{ mb: 1 }}>Booking Summary</Typography>
                                <Typography>Car: {booking.carName}</Typography>
                                <Typography>Days: {booking.totalDays}</Typography>
                                <Typography variant="h5" sx={{ color: '#e94560', fontWeight: 700, mt: 2 }}>Total: ${booking.totalAmount}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box component="form" onSubmit={handlePayment}>
                                <TextField fullWidth label="Card Number" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={e => setCardNumber(e.target.value)} required sx={{ mb: 2 }} />
                                <TextField fullWidth label="Card Holder Name" value={cardHolder} onChange={e => setCardHolder(e.target.value)} required sx={{ mb: 2 }} />
                                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                    <TextField label="MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)} required />
                                    <TextField label="CVV" type="password" value={cvv} onChange={e => setCvv(e.target.value)} required />
                                </Box>
                                <Button type="submit" fullWidth variant="contained" size="large" startIcon={<CreditCardIcon />} sx={{ background: '#e94560', textTransform: 'none', py: 1.5 }}>
                                    Pay ${booking.totalAmount}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Container>
    );
};

export default Payment;