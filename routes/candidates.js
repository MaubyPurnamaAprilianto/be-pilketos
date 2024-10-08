// routes/candidates.js
import express from 'express';
import {
    getAllCandidates,
    addCandidate,
    updateCandidate,
    deleteCandidate
} from '../controllers/candidateController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Semua route di bawah ini memerlukan autentikasi
router.use(authMiddleware);

// Route untuk mendapatkan semua kandidat
router.get('/', getAllCandidates);

// Route untuk menambah kandidat baru
router.post('/', addCandidate);

// Route untuk mengupdate data kandidat
router.put('/:id', updateCandidate);

// Route untuk menghapus kandidat
router.delete('/:id', deleteCandidate);

export default router;
