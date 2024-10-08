// controllers/voteController.js
import { sequelize } from '../config/database.js';
import Candidate from '../models/Candidate.js';
import Vote from '../models/Vote.js';

// Mendapatkan hasil vote (jumlah vote per kandidat)
export const getVoteResults = async (req, res) => {
    try {
        const results = await Candidate.findAll({
            attributes: [
                'id',
                'name',
                [sequelize.fn('COUNT', sequelize.col('Votes.id')), 'voteCount']
            ],
            include: [{
                model: Vote,
                attributes: [],
            }],
            group: ['Candidate.id'],
            order: [['id', 'ASC']],
            raw: true,
        });

        res.json(results);
    } catch (error) {
        console.error('Error fetching vote results:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
