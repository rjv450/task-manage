import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Typography, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import { signup } from '../services/authService';
import GoogleLoginButton from '../components/GoogleLoginButton';


const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await signup(data.firstName, data.lastName, data.email, data.password);
            toast.success('Sign up successful! Redirecting...');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            toast.error(error.message || 'Sign up failed');
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
                Sign Up
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
                    label="First Name"
                    name="firstName"
                    autoComplete="given-name"
                    autoFocus
                    {...register('firstName', { required: 'First Name is required' })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    {...register('lastName', { required: 'Last Name is required' })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    {...register('email', { required: 'Email Address is required' })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                        validate: value =>
                            value === getValues('password') || 'Passwords must match',
                    })}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Already have an account?{' '}
                    <Link href="/" variant="body2" sx={{ color: 'blue' }}>
                        Login
                    </Link>
                </Typography>
                <GoogleLoginButton />
            </Box>
            <ToastContainer /> {/* Add ToastContainer here to display toasts */}
        </Container>
    );
};

export default SignUpPage;
