import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Shield, Lock, Brain, Network, Blocks, Zap, Activity, Settings, Users, Database, CheckCircle, Eye, EyeOff, RefreshCw, Cpu, HardDrive, Wifi, Server, Grid } from 'lucide-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AIOperations from './components/AIOperations';
import FederatedLearning from './components/FederatedLearning';
import SwarmIntelligence from './components/SwarmIntelligence';
import BlockchainOperations from './components/BlockchainOperations';
import TaskManagement from './components/TaskManagement';
import EcommerceOperations from './components/EcommerceOperations';
import './App.css';

// Configuration
const CONFIG = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  THEME: {
    primary: '#4f46e5',
    secondary: '#7c3aed',
    accent: '#06b6d4',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    background: '#0f172a',
    card: '#1e293b',
    text: '#e2e8f0'
  }
};

// Authentication Context
const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jtsales_token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.get(`${CONFIG.API_URL}/api/status`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => {
        setUser({ id: 'user_001', email: 'user@example.com', role: 'user' });
      }).catch(() => {
        setToken('');
        localStorage.removeItem('jtsales_token');
      }).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await axios.post(`${CONFIG.API_URL}/auth/login`, credentials);
      setToken(response.data.access_token);
      localStorage.setItem('jtsales_token', response.data.access_token);
      setUser({ id: 'user_001', email: credentials.email, role: 'user' });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('jtsales_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Axios Interceptor
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('jtsales_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

// Main App
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/ai" element={<ProtectedRoute><AIOperations /></ProtectedRoute>} />
          <Route path="/federated" element={<ProtectedRoute><FederatedLearning /></ProtectedRoute>} />
          <Route path="/swarm" element={<ProtectedRoute><SwarmIntelligence /></ProtectedRoute>} />
          <Route path="/blockchain" element={<ProtectedRoute><BlockchainOperations /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><TaskManagement /></ProtectedRoute>} />
          <Route path="/ecommerce" element={<ProtectedRoute><EcommerceOperations /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
export { AuthContext, CONFIG };
