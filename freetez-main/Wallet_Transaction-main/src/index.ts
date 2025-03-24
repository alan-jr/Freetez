import express from 'express';
import walletRoutes from './routes/wallet';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use('/wallet', walletRoutes); // Register wallet routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
