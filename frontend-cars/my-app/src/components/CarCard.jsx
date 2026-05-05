import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    Chip
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

const CarCard = ({ car }) => {
    const navigate = useNavigate();

    const RUPEE = "\u20B9"; // ₹ symbol

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-8px)' }
            }}
        >
            <CardMedia
                component="img"
                height="220"
                image={car.image}
                alt={car.name}
                sx={{ objectFit: 'cover' }}
            />

            <CardContent
                sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
            >
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {car.name}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip icon={<SpeedIcon />} label={car.specs?.speed} size="small" variant="outlined" />
                    <Chip icon={<EventSeatIcon />} label={`${car.specs?.seats} Seats`} size="small" variant="outlined" />
                    <Chip icon={<LocalGasStationIcon />} label={car.specs?.fuel} size="small" variant="outlined" />
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {car.description}
                </Typography>

                <Box
                    sx={{
                        mt: 'auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ color: '#e94560', fontWeight: 700 }}
                        >
                            {RUPEE}{car.pricePerDay}
                        </Typography>
                        <Typography variant="caption">per day</Typography>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={() => navigate(`/cars/${car._id}`)}
                        sx={{ background: '#1a1a2e', textTransform: 'none' }}
                    >
                        View Details
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CarCard;