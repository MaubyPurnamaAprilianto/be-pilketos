// routes/teacherRoutes.js
import express from 'express';
import { verifyNIK, registerNIK, castVote } from '../controllers/teacherController.js';

const router = express.Router();

router.post('/verify', verifyNIK);
router.post('/register', registerNIK);
router.post('/vote', castVote); // Route untuk melakukan vote

export default router;
