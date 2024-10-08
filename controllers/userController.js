// controllers/userController.js
import User from "../models/User.js";
import Vote from "../models/Vote.js";
import Candidate from "../models/Candidate.js";

// Fungsi untuk memverifikasi NIS
export const verifyNIS = async (req, res) => {
  const { nis } = req.body;

  try {
    // Cari User berdasarkan NIS
    const user = await User.findOne({ where: { nis }, include: Vote });

    if (!user) {
      return res
        .status(404)
        .json({
          message:
            "NIS tidak ditemukan. Silakan mendaftarkan NIS Anda terlebih dahulu.",
        });
    }

    if (user.Vote) {
      return res.status(400).json({ message: "Anda sudah melakukan vote." });
    }

    // Jika belum vote
    res.json({ message: "NIS valid dan Anda dapat melakukan vote." });
  } catch (error) {
    console.error("Error during NIS verification:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fungsi untuk mendaftarkan NIS baru
export const registerNIS = async (req, res) => {
  const { nis } = req.body;

  try {
    // Cek apakah NIS sudah terdaftar
    const existingUser = await User.findOne({ where: { nis } });

    if (existingUser) {
      return res.status(400).json({ message: "NIS sudah terdaftar." });
    }

    // Buat User baru
    const user = await User.create({ nis });

    res.status(201).json({ message: "NIS berhasil didaftarkan.", user });
  } catch (error) {
    console.error("Error during NIS registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fungsi untuk melakukan vote
export const castVote = async (req, res) => {
    const { nis, candidateId } = req.body;
  
    try {
      // Cari User berdasarkan NIS
      const user = await User.findOne({ where: { nis } });
  
      if (!user) {
        return res.status(404).json({ message: "NIS tidak ditemukan." });
      }
  
      // Cek apakah pengguna sudah memberikan vote
      const existingVote = await Vote.findOne({ where: { userId: user.id } });
  
      if (existingVote) {
        return res.status(400).json({ message: "Anda sudah memberikan suara." });
      }
  
      // Cek apakah kandidat ada
      const candidate = await Candidate.findByPk(candidateId);
      if (!candidate) {
        return res.status(404).json({ message: "Kandidat tidak ditemukan." });
      }
  
      // Membuat voting baru
      const vote = await Vote.create({
        userId: user.id,
        candidateId,
      });
  
      res.status(201).json({ message: "Vote berhasil dilakukan.", vote });
    } catch (error) {
      console.error("Error during casting vote:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.findAll({
      order: [["id", "ASC"]],
    });
    res.json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Server error" });
  }
};
