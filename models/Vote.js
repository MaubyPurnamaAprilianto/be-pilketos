// models/Vote.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js'; 
import Teacher from './Teacher.js'; 

const Vote = sequelize.define('Vote', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id',
        },
        unique: true, // Hanya satu suara per pengguna
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Teacher,
            key: 'id',
        },
        unique: true, // Hanya satu suara per guru
    },
    candidateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'candidates', // Ganti jika model Candidate memiliki nama lain
            key: 'id',
        },
    },
}, {
    timestamps: true,
    tableName: 'votes',
});

export default Vote;