import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    Chip,
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import EventSeatIcon from '@mui/icons-material/EventSeat';

const CarCard = ({ car }) => {
    const navigate = useNavigate();

    return (
        <Card className="car-card" elevation={2}>
            <Box sx={{ overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    className="car-card-image"
                    image={car.image}
                    alt={car.name}
                />
            </Box>
            <CardContent className="car-card-content">
                <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                    {car.name}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip
                        icon={<SpeedIcon sx={{ fontSize: 16 }} />}
                        label={car.specs.speed}
                        size="small"
                        variant="outlined"
                    />
                    <Chip
                        icon={<EventSeatIcon sx={{ fontSize: 16 }} />}
                        label={`${car.specs.seats} Seats`}
                        size="small"
                        variant="outlined"
                    />
                    <Chip
                        icon={<LocalGasStationIcon sx={{ fontSize: 16 }} />}
                        label={car.specs.fuel}
                        size="small"
                        variant="outlined"
                    />
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {car.description}
                </Typography>

                <Box
                    sx={{
                        mt: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ color: '#e94560', fontWeight: 700 }}
                        >
                            {'\u20B9'}{car.pricePerDay}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            per day
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        onClick={() => navigate(`/cars/${car._id}`)}
                        sx={{
                            background: '#1a1a2e',
                            textTransform: 'none',
                            '&:hover': { background: '#e94560' },
                        }}
                    >
                        View Details
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CarCard;