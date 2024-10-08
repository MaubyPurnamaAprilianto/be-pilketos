// routes/auth.js
import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Route untuk registrasi Admin
router.post('/register', register);

// Route untuk login Admin
router.post('/login', login);

export default router;
