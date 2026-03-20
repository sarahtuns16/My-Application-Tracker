import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'; 
import authRoutes from './routes/authRoutes.js'; 
import applicationRoutes from './routes/applicationRoutes.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Routes

app.get('/', (req, res) => {
    res.send('API is running');
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});