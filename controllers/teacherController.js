// controllers/teacherController.js
import Teacher from "../models/Teacher.js";
import Vote from "../models/Vote.js";
import Candidate from "../models/Candidate.js";

export const verifyNIK = async (req, res) => {
  const { nik } = req.body;

  try {
    const teacher = await Teacher.findOne({
      where: { nik },
      include: Vote, // Pastikan Vote di-include
    });

    if (!teacher) {
      return res.status(404).json({
        message: "NIK tidak ditemukan. Silakan mendaftarkan NIK Anda terlebih dahulu.",
      });
    }

    // Periksa apakah ada vote yang terkait dengan guru ini
    if (teacher.Vote) { // Cek apakah ada Vote
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
    const existingVote = await Vote.findOne({ where: { teacherId: teacher.id } });

    if (existingVote) {
      return res.status(400).json({ message: "Anda sudah memberikan suara." });
    }

    // Membuat voting baru
    const vote = await Vote.create({
      teacherId: teacher.id,
      candidateId,
    });

    res.status(201).json({ message: "Vote berhasil dilakukan.", vote });
  } catch (error) {
    console.error("Error during voting:", error);
    res.status(500).json({ message: "Server error" });
  }
};



