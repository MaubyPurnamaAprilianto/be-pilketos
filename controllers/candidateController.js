// controllers/candidateController.js
import Candidate from '../models/Candidate.js';

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

// Menambah kandidat baru
export const addCandidate = async (req, res) => {
    const { name, vision, mission, photo } = req.body;

    try {
        const candidate = await Candidate.create({ name, vision, mission, photo });
        res.status(201).json(candidate);
    } catch (error) {
        console.error('Error adding candidate:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Mengupdate data kandidat
export const updateCandidate = async (req, res) => {
    const { id } = req.params;
    const { name, vision, mission, photo } = req.body;

    try {
        const candidate = await Candidate.findByPk(id);

        if (!candidate) {
            return res.status(404).json({ message: 'Kandidat tidak ditemukan.' });
        }

        // Update field jika ada perubahan
        if (name) candidate.name = name;
        if (vision) candidate.vision = vision;
        if (mission) candidate.mission = mission;
        if (photo) candidate.photo = photo;

        await candidate.save();
        res.json(candidate);
    } catch (error) {
        console.error('Error updating candidate:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

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
