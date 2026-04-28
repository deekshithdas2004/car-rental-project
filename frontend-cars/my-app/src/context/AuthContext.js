import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Check user on page load (cookie-based)
    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const { data } = await api.get('/me'); // ✅ correct route
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // ✅ LOGIN
    const login = async (email, password) => {
        await api.post('/login', { email, password }); // ✅ correct route
        await checkUser(); // refresh user after login
    };

    // ✅ SIGNUP
    const signup = async (name, email, password) => {
        await api.post('/signup', { name, email, password }); // ✅ correct route
        await login(email, password); // auto login
    };

    // ✅ LOGOUT
    const logout = async () => {
        await api.get('/logout'); // clears cookie
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);