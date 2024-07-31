// auth.test.js
import { signup, signIn } from '../userController.js';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../../models/User.js'); 
jest.mock('bcryptjs'); 
jest.mock('jsonwebtoken'); 

describe('Authentication', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    describe('signup', () => {
        it('should create a new user and return a success message', async () => {
  
            const req = {
                body: {
                    email: 'test@example.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    password: 'password123',
                    googleToken: 'google-token'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

  
            bcrypt.hash.mockResolvedValue('hashedPassword');

 
            User.prototype.save = jest.fn().mockResolvedValue();

            await signup(req, res);

     
            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
            expect(User.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
        });

        it('should handle errors', async () => {

            const req = {
                body: {
                    email: 'test@example.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    password: 'password123',
                    googleToken: 'google-token'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            bcrypt.hash.mockRejectedValue(new Error('Hashing error'));

   
            await signup(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Hashing error' });
        });
    });

    describe('signIn', () => {
        it('should authenticate a user and return a token', async () => {

            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'password123'
                }
            };

            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            const user = {
                _id: 'user-id',
                password: 'hashedPassword'
            };

  
            bcrypt.compare.mockResolvedValue(true);

  
            User.findOne = jest.fn().mockResolvedValue(user);

  
            jwt.sign.mockReturnValue('jwt-token');

      
            await signIn(req, res);

 
            expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
            expect(jwt.sign).toHaveBeenCalledWith({ id: 'user-id' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            expect(res.json).toHaveBeenCalledWith({ token: 'jwt-token' });
        });

        it('should handle invalid credentials', async () => {

            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'password123'
                }
            };

            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            User.findOne = jest.fn().mockResolvedValue(null);

            await signIn(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
        });

        it('should handle errors', async () => {
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'password123'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            User.findOne = jest.fn().mockRejectedValue(new Error('Database error'));
            await signIn(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });
    });
});
