// controllers/authController.js
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Teacher from '../models/Teacher.js';
import Vote from '../models/Vote.js';
import { Op } from 'sequelize';


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

export const getVoteStatistics = async (req, res) => {
    try {
        // Hitung total siswa dan guru
        const totalStudents = await User.count();
        const totalTeachers = await Teacher.count();

        // Hitung jumlah siswa dan guru yang sudah vote
        const votedStudents = await Vote.count({ where: { userId: { [Op.ne]: null } } });
        const votedTeachers = await Vote.count({ where: { teacherId: { [Op.ne]: null } } });

        // Siswa dan guru yang belum vote
        const notVotedStudents = totalStudents - votedStudents;
        const notVotedTeachers = totalTeachers - votedTeachers;

        // Kembalikan hasil
        res.json({
            totalStudents,
            votedStudents,
            notVotedStudents,
            totalTeachers,
            votedTeachers,
            notVotedTeachers
        });
    } catch (error) {
        console.error('Error fetching vote statistics:', error);
        res.status(500).json({ message: 'Server error' });
    }
};