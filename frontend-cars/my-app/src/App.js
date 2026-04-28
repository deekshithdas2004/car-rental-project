import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';

// ✅ NEW PAGES
import Cart from './pages/Cart';
import Bookings from './pages/Bookings';
import AdminDashboard from './pages/AdminDashboard';

// ✅ AUTH + PROTECTION
import { AuthProvider } from './context/AuthContext';
import AdminRoute from './components/AdminRoute';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        <Navbar />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />

            {/* USER ROUTES */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/bookings" element={<Bookings />} />

            {/* ADMIN ROUTE */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

          </Routes>
        </Box>

        <Footer />

      </Box>
    </AuthProvider>
  );
}

export default App;