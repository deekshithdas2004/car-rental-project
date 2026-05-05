import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyBookings from './pages/MyBookings';
import Bookings from './pages/Bookings';
import Payment from './pages/Payment';
import Profile from './pages/Profile';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ flex: 1 }}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    
                    <Route path='/cars' element={
                        <ProtectedRoute>
                            <Cars />
                        </ProtectedRoute>
                    } />
                    <Route path='/cars/:id' element={
                        <ProtectedRoute>
                            <CarDetails />
                        </ProtectedRoute>
                    } />
                    <Route path='/my-bookings' element={
                        <ProtectedRoute>
                            <MyBookings />
                        </ProtectedRoute>
                    } />
                    <Route path='/booking/:carId' element={
                        <ProtectedRoute>
                            <Bookings />
                        </ProtectedRoute>
                    } />
                    <Route path='/payment/:bookingId' element={
                        <ProtectedRoute>
                            <Payment />
                        </ProtectedRoute>
                    } />
                    <Route path='/profile' element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}

export default App;