import Candidate from '../models/Candidate.js';
import multer from 'multer';
import path from 'path';

// Konfigurasi multer untuk penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/image_kandidat');  // Folder tempat file akan disimpan
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Filter file agar hanya menerima foto dengan format tertentu
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('File harus berupa gambar dalam format jpeg, jpg, atau png.'));
    }
};

// Inisialisasi multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Maksimal 5 MB
    fileFilter: fileFilter
});

// Mendapatkan semua kandidat
export const getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.findAll({ order: [['id', 'ASC']] });
        res.json(candidates);
    } catch (error) {
        console.error('Error fetching candidates:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Menambah kandidat baru dengan foto
export const addCandidate = [
    upload.single('photo'),  // Middleware multer untuk upload single file
    async (req, res) => {
        const { name, name_ketua, name_wakil, vision, mission } = req.body;
        const photo = req.file ? req.file.filename : null; // Simpan nama file saja

        try {
            const candidate = await Candidate.create({ name, name_ketua, name_wakil, vision, mission, photo });
            res.status(201).json(candidate);
        } catch (error) {
            console.error('Error adding candidate:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
];

// Mengupdate data kandidat dengan opsi untuk mengupdate foto
export const updateCandidate = [
    upload.single('photo'),  // Middleware multer untuk upload single file
    async (req, res) => {
        const { id } = req.params;
        const { name, name_ketua, name_wakil, vision, mission } = req.body;
        const photo = req.file ? req.file.filename : null; // Simpan nama file baru jika ada

        try {
            const candidate = await Candidate.findByPk(id);

            if (!candidate) {
                return res.status(404).json({ message: 'Kandidat tidak ditemukan.' });
            }

            // Update field jika ada perubahan
            if (name) candidate.name = name;
            if (name_ketua) candidate.name_ketua = name_ketua;
            if (name_wakil) candidate.name_wakil = name_wakil;
            if (vision) candidate.vision = vision;
            if (mission) candidate.mission = mission;
            if (photo) candidate.photo = photo; // Update photo jika ada

            await candidate.save();
            res.json(candidate);
        } catch (error) {
            console.error('Error updating candidate:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
];


// Menghapus kandidat
export const deleteCandidate = async (req, res) => {
    const { id } = req.params;

    try {
        const candidate = await Candidate.findByPk(id);

        if (!candidate) {
            return res.status(404).json({ message: 'Kandidat tidak ditemukan.' });
        }

        await candidate.destroy();
        res.json({ message: 'Kandidat dihapus.' });
    } catch (error) {
        console.error('Error deleting candidate:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

