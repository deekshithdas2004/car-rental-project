import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
    Container,
    Typography,
    Box,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button
} from "@mui/material";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);

    // ✅ fetch bookings
    const fetchBookings = async () => {
        try {
            const res = await api.get("/bookings");
            setBookings(res.data);
        } catch (err) {
            alert("Login required");
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    console.log(bookings);

    // 🔴 Cancel booking (PUT)
    const cancelBooking = async (id) => {
        await api.put("/bookings/" + id, {
            status: "Cancelled"
        });
        fetchBookings();
    };

    // 🟢 Complete booking (PUT)
    const completeBooking = async (id) => {
        await api.put("/bookings/" + id, {
            status: "Completed"
        });
        fetchBookings();
    };

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
                My Bookings
            </Typography>

            {bookings.length === 0 && (
                <Typography>No bookings found</Typography>
            )}

            {/* GRID */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "1fr 1fr 1fr"
                    },
                    gap: 3
                }}
            >
                {bookings.map((b) => (
                    <Card
                        key={b._id}
                        sx={{
                            borderRadius: 3,
                            boxShadow: 3,
                            transition: "0.3s",
                            "&:hover": { transform: "scale(1.03)" }
                        }}
                    >
                        {/* IMAGE */}
                        <CardMedia
                            component="img"
                            height="180"
                            image={b.image || "https://via.placeholder.com/300"}
                            alt={b.carName}
                        />

                        {/* CONTENT */}
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {b.carName}
                            </Typography>

                            <Typography
                                sx={{
                                    color: "#e94560",
                                    fontWeight: 600,
                                    mt: 1
                                }}
                            >
                                ₹{b.totalPrice}
                            </Typography>

                            {/* STATUS */}
                            <Typography
                                sx={{
                                    mt: 1,
                                    fontWeight: 600,
                                    color:
                                        b.status === "Cancelled"
                                            ? "red"
                                            : b.status === "Completed"
                                            ? "green"
                                            : "#e94560"
                                }}
                            >
                                Status: {b.status || "Active"}
                            </Typography>
                        </CardContent>

                        {/* ACTIONS */}
                        <CardActions
                            sx={{
                                justifyContent: "space-between",
                                px: 2,
                                pb: 2
                            }}
                        >
                            <Button
                                variant="outlined"
                                color="error"
                                disabled={b.status === "Cancelled"}
                                onClick={() => cancelBooking(b._id)}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="contained"
                                color="success"
                                disabled={b.status === "Completed"}
                                onClick={() => completeBooking(b._id)}
                            >
                                Complete
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Container>
    );
}