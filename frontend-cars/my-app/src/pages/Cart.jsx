import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
    Container,
    Typography,
    Button,
    Box,
    Card,
    CardMedia,
    CardContent,
    CardActions
} from "@mui/material";

const Cart = () => {
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        try {
            const { data } = await api.get("/cart");
            setCart(data);
        } catch {
            alert("Login required");
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    console.log(cart);

    const deleteItem = async (id) => {
        await api.delete("/cart/" + id);
        fetchCart();
    };

    const bookCar = async (item) => {
        await api.post("/book", {
            carName: item.carName,
            totalPrice: item.price,
            image: item.image
        });

        alert("Booked successfully ✅");

        await api.delete("/cart/" + item._id);
        fetchCart();
    };

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
                My Cart
            </Typography>

            {cart.length === 0 && (
                <Typography>No items in cart</Typography>
            )}

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
                {cart.map((item) => (
                    <Card
                        key={item._id}
                        sx={{
                            borderRadius: 3,
                            boxShadow: 3,
                            transition: "0.3s",
                            "&:hover": {
                                transform: "scale(1.03)"
                            }
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="180"
                            image={
                                item.image && item.image !== ""
                                    ? item.image
                                    : "https://via.placeholder.com/300"
                            }
                            alt={item.carName}
                        />

                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {item.carName}
                            </Typography>

                            <Typography
                                sx={{
                                    color: "#e94560",
                                    fontWeight: 600,
                                    mt: 1
                                }}
                            >
                                ₹{item.price} / day
                            </Typography>
                        </CardContent>

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
                                onClick={() => deleteItem(item._id)}
                            >
                                Delete
                            </Button>

                            <Button
                                variant="contained"
                                onClick={() => bookCar(item)}
                                sx={{
                                    background: "#e94560",
                                    "&:hover": { background: "#d63550" }
                                }}
                            >
                                Book
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default Cart;