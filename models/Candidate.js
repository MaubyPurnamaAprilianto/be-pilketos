// models/Candidate.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Candidate = sequelize.define('Candidate', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vision: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    mission: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING, // URL atau path ke foto
        allowNull: true,
    },
}, {
    timestamps: true,
    tableName: 'candidates',
});

export default Candidate;
