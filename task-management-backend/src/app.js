
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';

import handleGoogleCallback from './controllers/googleController.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());



// Route handling
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

// Google OAuth route
app.post('/auth/google/callback', async (req, res) => {
    const { tokenId } = req.body;

    try {
        const result = await handleGoogleCallback(tokenId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
