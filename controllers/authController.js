// controllers/authController.js
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

// Fungsi untuk membuat token JWT
const generateToken = (admin) => {
    return jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Fungsi untuk registrasi Admin
export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cek apakah Admin sudah terdaftar
        const existingAdmin = await Admin.findOne({ where: { email } });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin sudah terdaftar.' });
        }

        // Buat Admin baru
        const admin = await Admin.create({ email, password });

        // Buat token
        const token = generateToken(admin);

        res.status(201).json({ token });
    } catch (error) {
        console.error('Error during admin registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk login Admin
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cari Admin berdasarkan email
        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            return res.status(400).json({ message: 'Email atau password salah.' });
        }

        // Cek password
        const isMatch = await admin.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Email atau password salah.' });
        }

        // Buat token
        const token = generateToken(admin);

        res.json({ token });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

