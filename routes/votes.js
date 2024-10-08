// routes/votes.js
import express from 'express';
import { getVoteResults } from '../controllers/voteController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Middleware untuk Admin

const router = express.Router();

// Route untuk mendapatkan hasil vote (hanya Admin yang bisa)
router.get('/results', authMiddleware, getVoteResults);

export default router;
