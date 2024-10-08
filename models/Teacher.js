// models/Teacher.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import bcrypt from 'bcryptjs';

const Teacher = sequelize.define('Teacher', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nik: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [16, 16],
                msg: 'NIK harus terdiri dari 16 digit.',
            },
            isNumeric: {
                msg: 'NIK hanya boleh berisi angka.',
            },
        },
    },
}, {
    timestamps: true,
    tableName: 'teachers',
});

export default Teacher;
