// routes/users.js
import express from 'express';
import { verifyNIS, registerNIS, castVote,getCandidates, getDataSiswa } from '../controllers/userController.js';

const router = express.Router();

// Route untuk memverifikasi NIS
router.post('/verify', verifyNIS);

// Route untuk mendaftarkan NIS baru
router.post('/register', registerNIS);

// Route untuk melakukan vote
router.post('/vote', castVote);

// Route untuk mendapatkan semua candidat
router.get('/candidates', getCandidates);

// Route untuk mendapatkan data siswa
router.get('/', getDataSiswa);

export default router;
