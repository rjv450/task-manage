import apiClient from './api';
import axios from 'axios';

export const login = async (email, password) => {
    try {
        const response = await apiClient.post('/signin', {
            email,
            password,
        });
        const { token } = response.data;
        localStorage.setItem('token', token); 
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Login failed');
        }
        throw new Error('Network error');
    }
};


export const signup = async (firstName, lastName, email, password) => {
    try {
        const response = await apiClient.post('/signup', {
            firstName,
            lastName,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Signup failed');
        }
        throw new Error('Network error');
    }
};

export const loginWithGoogle = async (tokenId) => {
    try {
      const response = await axios.post(`http://localhost:3000/auth/google/callback`, { tokenId });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('picture',response.data.user.profilePicture)
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };