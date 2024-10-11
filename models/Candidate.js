// models/Candidate.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Candidate = sequelize.define(
  "Candidate",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_ketua: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nama ketua tidak boleh kosong.",
        },
      },
    },
    name_wakil: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nama wakil tidak boleh kosong.",
        },
      },
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
  },
  {
    timestamps: true,
    tableName: "candidates",
  }
);

export default Candidate;
