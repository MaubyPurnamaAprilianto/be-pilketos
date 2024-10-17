import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/database.js";
import { fileURLToPath } from "url";
import "./models/index.js"; // Import dan sinkronisasi model dan asosiasi

// Load konfigurasi environment
dotenv.config();

// Inisialisasi Express
const app = express();

// Dapatkan __dirname saat menggunakan module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json()); // Untuk parsing JSON
app.use(cors({
  origin: '*', // Mengizinkan semua origin
}));


// Serving static files dari folder 'uploads/image_kandidat'
app.use(
  "/uploads/image_kandidat",
  express.static(path.join(__dirname, "uploads", "image_kandidat"))
);

// Menghubungkan ke database dan menangani error jika koneksi gagal
connectDB().then(() => {
  console.log("Database connected successfully.");
}).catch((err) => {
  console.error("Database connection failed:", err.message);
  process.exit(1); // Keluar dari aplikasi jika koneksi database gagal
});

app.get("/getImage/:imageName", (req, res) => {
  const imagePath = path.join(
    __dirname,
    "uploads",
    "image_kandidat",
    req.params.imageName
  );

  console.log("Attempting to send file from:", imagePath); // Logging path yang sedang dicoba

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error("Error sending image:", err); // Logging error
      res.status(404).send("Image not found"); // Jika gambar tidak ditemukan
    }
  });
});

// Import route
import authRoutes from "./routes/auth.js"; // Route Admin
import candidateRoutes from "./routes/candidates.js";
import userRoutes from "./routes/users.js"; // Route User
import teacherRoutes from "./routes/teacherRoutes.js";
import voteRoutes from "./routes/votes.js"; // Route Vote

// Definisikan route
app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/users", userRoutes); // Tambahkan route User
app.use("/api/teachers", teacherRoutes);
app.use("/api/votes", voteRoutes); // Tambahkan route Vote

// Route dasar
app.get("/", (req, res) => {
  res.send("Selamat datang di API Pilketos");
});

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server berjalan di port ${PORT}`)); // Mengikat ke 0.0.0.0 agar bisa diakses dari jaringan
