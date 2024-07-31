import express from 'express';
import { signup, signIn } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signIn);

export default router;
