import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nis: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [10, 10], // Misalnya NIS memiliki panjang 10 karakter
                msg: 'NIS harus terdiri dari 10 digit.',
            },
            isNumeric: {
                msg: 'NIS hanya boleh berisi angka.',
            },
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Nama tidak boleh kosong.',
            },
        },
    },
    kelas: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Kelas tidak boleh kosong.',
            },
        },
    },
    // Anda bisa menambahkan field lain jika diperlukan
}, {
    timestamps: true,
    tableName: 'users',
    hooks: {
        beforeCreate: async (user) => {
            // Jika Anda ingin mengenkripsi password, tambahkan di sini
        },
    },
});

// Jika Anda menambahkan password:
User.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default User;
