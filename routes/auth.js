// routes/auth.js
import express from 'express';
import { register, login, getVoteStatistics } from '../controllers/authController.js';
import { uploadExcel, importData } from '../controllers/importController.js';
import { uploadExcelGuru, importDataGuru } from '../controllers/importGuruController.js';

const router = express.Router();

// Route untuk registrasi Admin
router.post('/register', register);

// Route untuk login Admin
router.post('/login', login);

router.post('/importSiswa', uploadExcel, importData);

router.post('/importGuru', uploadExcelGuru, importDataGuru);

router.get('/statistics', getVoteStatistics);

export default router;
