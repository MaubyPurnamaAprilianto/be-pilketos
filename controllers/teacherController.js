// controllers/teacherController.js
import Teacher from "../models/Teacher.js";
import Vote from "../models/Vote.js";
import Candidate from "../models/Candidate.js";
import crypto from "crypto";

const generateRandomCode = () => {
  return crypto.randomBytes(3).toString("hex"); // Menghasilkan kode acak dengan panjang 6 karakter
};

export const verifyNIK = async (req, res) => {
  const { nik } = req.body;

  try {
    const teacher = await Teacher.findOne({
      where: { nik },
      include: Vote, // Pastikan Vote di-include
    });

    if (!teacher) {
      return res.status(404).json({
        message:
          "NIK tidak ditemukan. Silakan mendaftarkan NIK Anda terlebih dahulu.",
      });
    }

    // Periksa apakah ada vote yang terkait dengan guru ini
    if (teacher.Vote) {
      // Cek apakah ada Vote
      return res.status(400).json({ message: "Anda sudah melakukan vote." });
    }

    res.json({ message: "NIK valid dan Anda dapat melakukan vote." });
  } catch (error) {
    console.error("Error during NIK verification:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerNIK = async (req, res) => {
  const { nik } = req.body;

  try {
    const existingTeacher = await Teacher.findOne({ where: { nik } });

    if (existingTeacher) {
      return res.status(400).json({ message: "NIK sudah terdaftar." });
    }

    const teacher = await Teacher.create({ nik });

    res.status(201).json({ message: "NIK berhasil didaftarkan.", teacher });
  } catch (error) {
    console.error("Error during NIK registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const castVote = async (req, res) => {
  const { nik, candidateId } = req.body;

  try {
    // Verifikasi NIK
    const teacher = await Teacher.findOne({ where: { nik } });

    if (!teacher) {
      return res.status(404).json({ message: "NIK tidak ditemukan." });
    }

    // Cek apakah guru sudah memberikan vote
    const existingVote = await Vote.findOne({
      where: { teacherId: teacher.id },
    });

    if (existingVote) {
      return res.status(400).json({ message: "Anda sudah memberikan suara." });
    }

    // Buat kode acak untuk disimpan di tabel Vote
    const randomCode = generateRandomCode();
    console.log(`Generated voteCode: ${randomCode}`); // Logging

    // Membuat voting baru dengan menyimpan kode acak
    const vote = await Vote.create({
      teacherId: teacher.id,
      candidateId,
      voteCode: randomCode, // Simpan kode acak di kolom voteCode
    });

    console.log(`Vote created: ${JSON.stringify(vote)}`); // Logging

    res.status(201).json({ message: "Vote berhasil dilakukan.", vote });
  } catch (error) {
    console.error("Error during voting:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/teacherController.js

// Fungsi untuk mendapatkan data guru berdasarkan teacherId
export const getDataTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findAll({ order: [["id", "ASC"]] });
    res.json(teacher);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Server error" });
  }
};
