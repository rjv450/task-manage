import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Typography, Container, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../services/authService';
import GoogleLoginButton from '../components/GoogleLoginButton'; // Adjust path as needed

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        border: '2px solid blue',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        mt: 8,
        mb: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          color: 'blue',
          fontWeight: 'bold',
        }}
      >
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '100%' }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          {...register('email', { required: 'Email Address is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Don’t have an account?{' '}
          <Link href="/signup" variant="body2" sx={{ color: 'blue' }}>
            Sign up
          </Link>
        </Typography>
        <GoogleLoginButton />
      </Box>
    </Container>
  );
};

export default LoginPage;
