// controllers/importController.js
import multer from "multer";
import xlsx from "xlsx";
import Admin from "../models/Admin.js"; // Pastikan ini adalah model yang benar
import User from "../models/User.js";   // Tambahkan model User untuk tabel users
import Teacher from "../models/Teacher.js";

// Konfigurasi multer untuk penyimpanan file sementara
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + unique + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Fungsi untuk mengimpor data dari file Excel
export const importDataGuru = async (req, res) => {
  try {
    const file = req.file;

    // Pastikan file ada
    if (!file) {
      return res.status(400).json({ message: "Silakan unggah file Excel." });
    }

    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Tempatkan data __EMPTY_1 yang valid dalam array untuk bulk insert
    const guruToInsert = [];

    // Simpan data ke database
    for (const item of data) {
      const { __EMPTY ,__EMPTY_4 } = item; // Tambahkan kolom __EMPTY_1
      // console.log(item);



      // Simpan ke array untuk bulk insert ke tabel User (kolom nis)
      if (__EMPTY !== undefined) {
    
        guruToInsert.push({
          name: __EMPTY, // Masukkan __EMPTY ke kolom name di tabel users
          nik: __EMPTY_4, // Masukkan __EMPTY_4 ke kolom kelas di tabel users
        });
      }
    }

    const filterData = guruToInsert.slice(2)

    console.log(guruToInsert);
    // Jika ada data yang valid, lakukan bulk insert ke tabel User
    if (guruToInsert.length > 0) {
      try {
        await Teacher.bulkCreate(filterData); // Masukkan data array ke tabel users
        res.status(200).json({ message: "Data berhasil diimpor." });
      } catch (err) {
        console.error("Gagal mengimpor data ke users:", err);
        res.status(500).json({ message: "Gagal mengimpor data ke users." });
      }
    } else {
      res.status(400).json({ message: "Tidak ada data valid untuk diimpor." });
    }
  } catch (error) {
    console.error("Error importing data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Export multer untuk digunakan dalam rute
export const uploadExcelGuru = upload.single("file"); // 'file' adalah nama field dalam form
