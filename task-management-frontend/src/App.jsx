// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import HomePage from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
      </Routes>
      <ToastContainer /> {/* Add ToastContainer here */}
    </Router>
  );
}

export default App;
