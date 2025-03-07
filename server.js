import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/db.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';

// routes import

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config();
const app = express();
 
// middlewares
app.use(express.json());
app.use(cors())

const port = process.env.PORT || 4000
// db connection
const mongoUri = process.env.MONGO_URI || ""
connectDB(mongoUri);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorMiddleware)

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
})