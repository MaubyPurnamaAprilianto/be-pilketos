// config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, // e.g., 'mysql', 'postgres', 'sqlite'
    logging: false, // Nonaktifkan logging SQL
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Sequelize Connected to the database.');
        // Sinkronisasi model (force: false untuk tidak menghapus tabel yang sudah ada)
        await sequelize.sync({ force: false });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

export { sequelize, connectDB };
