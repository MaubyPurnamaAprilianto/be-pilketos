import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

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
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Nama guru tidak boleh kosong.',
            },
        },
    },
}, {
    timestamps: true,
    tableName: 'teachers',
});

export default Teacher;
