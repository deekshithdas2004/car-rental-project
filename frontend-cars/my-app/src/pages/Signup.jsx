import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import api from "../services/api";

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/signup", formData);

            if (
                res.data ===
                "Email Address Already in use! please try different one."
            ) {
                setError("Email already in use");
            } else {
                navigate("/login");
            }
        } catch (err) {
            setError("Signup failed. Please try again.");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                    "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            }}
        >
            <Paper
                sx={{
                    p: 4,
                    maxWidth: 450,
                    width: "100%",
                    borderRadius: 3,
                }}
            >
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <PersonAddIcon sx={{ fontSize: 48, color: "#e94560" }} />
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Create Account
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                            background: "#e94560",
                            textTransform: "none",
                            "&:hover": {
                                background: "#d73750",
                            },
                        }}
                    >
                        Create Account
                    </Button>
                </Box>

                <Typography sx={{ mt: 2, textAlign: "center" }}>
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        style={{
                            color: "#e94560",
                            textDecoration: "none",
                            fontWeight: 500,
                        }}
                    >
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Signup;