import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginWithGoogle } from '../services/authService'; 

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    try {
      const tokenId = response.credential;
      await loginWithGoogle(tokenId);
      toast.success('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onFailure={(error) => toast.error(error.message || 'Google login failed')}
        style={{ width: '100%' }} 
      />
    </div>
  );
};

export default GoogleLoginButton;
