// models/User.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import bcrypt from 'bcryptjs';

const guru = sequelize.define('guru', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nip: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [10, 10], // Misalnya NISN memiliki panjang 10 karakter
                msg: 'NIS harus terdiri dari 10 digit.',
            },
            isNumeric: {
                msg: 'NIS hanya boleh berisi angka.',
            },
        },
    },
    // Anda bisa menambahkan field lain jika diperlukan
}, {
    timestamps: true,
    tableName: 'guru',
    hooks: {
        beforeCreate: async (guru) => {
            // Jika Anda ingin mengenkripsi password, tambahkan di sini
            // Namun, sesuai permintaan terakhir, guru tidak login, jadi password mungkin tidak diperlukan
        },
    },
});

// Jika Anda menambahkan password:
guru.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default guru;
