import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    Box,
    CircularProgress,
    TextField,
    InputAdornment,
    Button,
    Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import api from '../services/api';
import CarCard from '../components/CarCard';
import carsData from '../data/carsData';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cars = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [seedMessage, setSeedMessage] = useState('');

    const fetchCars = async () => {
        try {
            setLoading(true);
            setError('');

            const { data } = await api.get('/cars');
            setCars(data);
            setFilteredCars(data);

        } catch (err) {
            console.error(err);

            if (err.response?.status === 401) {
                setError("Please login to view cars");
                navigate('/login');
            } else {
                setError("Failed to load cars");
            }

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    useEffect(() => {
        const filtered = cars.filter(
            (car) =>
                car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCars(filtered);
    }, [searchTerm, cars]);

    const seedCars = async () => {
        try {
            for (const car of carsData) {
                await api.post('/admin/cars', car);
            }
            setSeedMessage("Cars added successfully!");
            fetchCars();
        } catch (err) {
            setSeedMessage("Only admin can add cars");
        }
    };

    return (
        <Box>

            <Box
                sx={{
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    color: 'white',
                    py: 6,
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                        Our Fleet
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>



                <Box sx={{ maxWidth: 500, mx: 'auto', mb: 6 }}>
                    <TextField
                        fullWidth
                        placeholder="Search cars..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#e94560' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {loading ? (
                    <Box className="loading-container">
                        <CircularProgress sx={{ color: '#e94560' }} />
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={4}>
                            {filteredCars.map((car) => (
                                <Grid item xs={12} sm={6} md={4} key={car._id}>
                                    <CarCard car={car} />
                                </Grid>
                            ))}
                        </Grid>

                        {filteredCars.length === 0 && (
                            <Typography textAlign="center" mt={5}>
                                No cars found
                            </Typography>
                        )}
                    </>
                )}
            </Container>
        </Box>
    );
};

export default Cars;