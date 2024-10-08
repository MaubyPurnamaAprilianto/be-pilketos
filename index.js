// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database.js';
import './models/index.js'; // Import dan sinkronisasi model dan asosiasi

// Import route
import authRoutes from './routes/auth.js';          // Route Admin
import candidateRoutes from './routes/candidates.js';
import userRoutes from './routes/users.js';         // Route User
import teacherRoutes from './routes/teacherRoutes.js';
import voteRoutes from './routes/votes.js';         // Route Vote

// Load konfigurasi environment
dotenv.config();

// Inisialisasi Express
const app = express();

// Middleware
app.use(express.json()); // Untuk parsing JSON
app.use(cors());         // Mengizinkan Cross-Origin Resource Sharing

// Menghubungkan ke database dan menyinkronkan model
connectDB();

// Definisikan route
app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/users', userRoutes);       // Tambahkan route User
app.use('/api/teachers', teacherRoutes);
app.use('/api/votes', voteRoutes);       // Tambahkan route Vote

// Route dasar
app.get('/', (req, res) => {
    res.send('Selamat datang di API Pilketos');
});

// Menjalankan server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
