import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const DB_PATH = path.join(process.cwd(), "db.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Ensure database file exists with initial data
function initDatabase() {
  if (!fs.existsSync(DB_PATH)) {
    const initialData = {
      layanan: [
        // ====== LAYANAN NIKAH ======
        {
          id: "nikah-1",
          title: "Berkas Pendaftaran Nikah",
          category: "nikah",
          type: "info",
          content: [
            "Surat Pengantar Nikah dari RT/RW setempat",
            "Surat Keterangan Untuk Nikah (Model N1) dari Desa/Kelurahan",
            "Surat Keterangan Asal-Usul (Model N2) dari Desa/Kelurahan",
            "Surat Persetujuan Mempelai (Model N3)",
            "Surat Keterangan Orang Tua (Model N4)",
            "Fotokopi KTP & Kartu Keluarga (KK) calon pengantin",
            "Fotokopi Akta Kelahiran calon pengantin",
            "Pasfoto berlatar belakang biru ukuran: 2x3 (4 lembar) dan 4x6 (2 lembar)",
            "Surat Izin Orang Tua (jika usia di bawah 21 tahun)",
            "Dispensasi Pengadilan Agama (jika pria di bawah 19 tahun / wanita di bawah 19 tahun)"
          ],
          image: "",
          icon: "file-text"
        },
        {
          id: "nikah-2",
          title: "Alur Pendaftaran Nikah",
          category: "nikah",
          type: "flow",
          content: [
            "Mendatangi RT/RW untuk mengurus surat pengantar ke Kelurahan",
            "Mendatangi Kelurahan setempat untuk mendapatkan formulir N1, N2, N3, dan N4",
            "Mendaftarkan diri secara online melalui SIMKAH Kemenag",
            "Mendatangi KUA Pulau Dullah Utara untuk menyerahkan berkas pendaftaran (maksimal 10 hari kerja sebelum akad)",
            "Pemeriksaan berkas nikah oleh Petugas/Penghulu KUA",
            "Mengikuti Bimbingan Perkawinan (Bimwin)",
            "Pelaksanaan Akad Nikah dan Penyerahan Buku Nikah"
          ],
          image: "",
          icon: "git-commit"
        },
        {
          id: "nikah-3",
          title: "Daftar Nikah Online (SIMKAH)",
          category: "nikah",
          type: "link",
          url: "https://simkah4.kemenag.go.id",
          icon: "globe",
          description: "Portal pendaftaran nikah online resmi Kementerian Agama RI."
        },
        {
          id: "nikah-4",
          title: "Pengajuan Berkas Nikah (KUA PDU)",
          category: "nikah",
          type: "link",
          url: "https://forms.gle/kuadullahnikah", // user placeholder form
          icon: "edit-3",
          description: "Formulir digital penyerahan berkas awal KUA Kecamatan Pulau Dullah Utara."
        },
        {
          id: "nikah-5",
          title: "Bimwin Online Bina Kami (WhatsApp)",
          category: "nikah",
          type: "whatsapp",
          url: "https://wa.me/6281240912842",
          icon: "message-circle",
          description: "Hubungi Bimbingan Perkawinan Online via WhatsApp: +62-812-4091-2842"
        },
        {
          id: "nikah-6",
          title: "Video Alur Pendaftaran Nikah",
          category: "nikah",
          type: "youtube",
          url: "https://www.youtube.com/watch?v=RS3Ck7rAkq0",
          icon: "youtube",
          description: "Panduan video resmi alur pendaftaran dan tata cara nikah."
        },
        {
          id: "nikah-7",
          title: "Pembuatan Surat Rekomendasi Nikah",
          category: "nikah",
          type: "link",
          url: "https://forms.gle/kuadullahrekomendasi",
          icon: "send",
          description: "Layanan permohonan surat rekomendasi numpang nikah di luar wilayah."
        },

        // ====== LAYANAN WAKAF ======
        {
          id: "wakaf-1",
          title: "Berkas Pendaftaran Wakaf",
          category: "wakaf",
          type: "info",
          content: [
            "Fotokopi KTP Wakif (pemberi wakaf)",
            "Fotokopi KTP Nadzir (pengelola wakaf, minimal 3 orang)",
            "Surat Kepengurusan Lembaga Keadilan jika Nadzir Badan Hukum",
            "Sertifikat Hak Milik (SHM) asli tanah atau surat kepemilikan tanah sah lainnya",
            "Surat Keterangan Pendaftaran Tanah (SKPT) dari BPN",
            "Surat Pernyataan Bebas Sengketa dari Kelurahan",
            "Pasfoto Wakif dan Nadzir ukuran 3x4"
          ],
          image: "",
          icon: "file-text"
        },
        {
          id: "wakaf-2",
          title: "Alur Sertifikasi Tanah Wakaf",
          category: "wakaf",
          type: "flow",
          content: [
            "Pihak Wakif dan Nadzir membawa berkas kepemilikan tanah ke kantor KUA Dullah Utara selaku PPAIW",
            "Kepala KUA melakukan verifikasi berkas dan memeriksa lokasi fisik tanah bersama saksi-saksi",
            "Wakif dan Nadzir melangsungkan Ikrar Wakaf di hadapan Kepala KUA selaku PPAIW",
            "KUA menerbitkan Akta Ikrar Wakaf (AIW) / Surat Pengesahan",
            "KUA meregistrasikan secara digital di SIWAK Kemenag",
            "Nadzir mengurus sertifikat tanah wakaf ke Kantor Pertanahan (BPN)"
          ],
          image: "",
          icon: "git-commit"
        },
        {
          id: "wakaf-3",
          title: "Sistem Informasi Wakaf (SIWAK)",
          category: "wakaf",
          type: "link",
          url: "https://siwak.kemenag.go.id/",
          icon: "globe",
          description: "Sistem Manajemen Wakaf Nasional Kementerian Agama RI."
        },
        {
          id: "wakaf-4",
          title: "Konsultasi Wakaf via WhatsApp",
          category: "wakaf",
          type: "whatsapp",
          url: "https://wa.me/6281240912842",
          icon: "message-circle",
          description: "Hubungi Penyelenggara Syariah KUA Pulau Dullah Utara via WhatsApp."
        },
        {
          id: "wakaf-5",
          title: "Tutorial Pendaftaran Wakaf Online",
          category: "wakaf",
          type: "youtube",
          url: "https://www.youtube.com/watch?v=wrejNPzi2Rc",
          icon: "youtube",
          description: "Video tutorial tata cara peng inputan SIWAK online."
        },

        // ====== MUALLAF CENTER ======
        {
          id: "muallaf-1",
          title: "Pendaftaran Muallaf Online",
          category: "muallaf",
          type: "link",
          url: "https://forms.gle/kuadullahmuallaf",
          icon: "edit-3",
          description: "Formulir pendataan dan permohonan pembimbingan ikrar serta pembuatan sertifikat Muallaf."
        },
        {
          id: "muallaf-2",
          title: "Konsultasi Calon Muallaf (WhatsApp)",
          category: "muallaf",
          type: "whatsapp",
          url: "https://wa.me/6281240912842",
          icon: "message-circle",
          description: "Layanan konseling keagamaan, pembinaan akidah, dan bimbingan membaca Al-Qur'an."
        },
        // ====== PENYULUHAN AGAMA ======
        {
          id: "penyuluhan-1",
          title: "Penyuluhan & Bimbingan Keagamaan Online",
          category: "penyuluhan",
          type: "link",
          url: "https://forms.gle/kuadullahpenyuluhan",
          icon: "edit-3",
          description: "Formulir pendaftaran Penyuluhan Agama Islam, bimbingan keagamaan, majelis taklim, dan kegiatan syiar Islam."
        },
        {
          id: "penyuluhan-2",
          title: "Konsultasi Syariah & Keluarga Sakinah (WhatsApp)",
          category: "penyuluhan",
          type: "whatsapp",
          url: "https://wa.me/6281240912842",
          icon: "message-circle",
          description: "Layanan konsultasi syariah, masalah waris, zakat infaq sadaqah, dan bimbingan pasangan keluarga sakinah via WhatsApp."
        },
        {
          id: "penyuluhan-3",
          title: "Program Kerja Penyuluh Agama",
          category: "penyuluhan",
          type: "info",
          content: [
            "Penyuluhan Peningkatan Kerukunan Umat Beragama (PKUB)",
            "Sosialisasi sertifikasi produk jaminan halal untuk UMKM Kecamatan",
            "Pembinaan spiritual berkala bagi kelompok majelis taklim",
            "Edukasi pencegahan pernikahan dini & bimbingan sakinah remaja",
            "Gerakan pemberantasan buta aksara Al-Qur'an teritorial"
          ],
          icon: "file-text"
        }
      ],
      pengumuman: [
        {
          id: "p-1",
          title: "Hari Raya Idul Fitri 1447 H",
          date: "2026-03-20",
          content: "Keluarga besar KUA Kecamatan Pulau Dullah Utara mengucapkan Selamat Hari Raya Idul Fitri 1447 H, Minal Aidin Wal Faizin, Mohon Maaf Lahir dan Batin.",
          status: "aktif"
        },
        {
          id: "p-2",
          title: "Pendaftaran Bimwin Gratis Gelombang II",
          date: "2026-05-15",
          content: "Telah dibuka pendaftaran Bimbingan perkawinan gratis untuk calon pengantin periode nikah Juni-Juli 2026. Buruan daftar, kuota terbatas hanya untuk 15 pasang!",
          status: "aktif"
        }
      ],
      settings: {
        whatsappNumber: "6281240912842",
        whatsappText: "Halo Admin KUA Pulau Dullah Utara, saya ingin mendapatkan informasi tentang layanan digital KUA.",
        youtubeNikahUrl: "https://www.youtube.com/watch?v=RS3Ck7rAkq0",
        youtubeWakafUrl: "https://www.youtube.com/watch?v=wrejNPzi2Rc",
        googleFormNikah: "https://forms.gle/kuadullahnikah",
        googleFormRekomendasi: "https://forms.gle/kuadullahrekomendasi",
        googleFormWakaf: "https://forms.gle/kuadullahwakaf",
        googleFormMuallaf: "https://forms.gle/kuadullahmuallaf",
        googleFormPenyuluhan: "https://forms.gle/kuadullahpenyuluhan",
        bannerTitle: "KANTOR URUSAN AGAMA\nPULAU DULLAH UTARA",
        bannerSubtitle: "Pusat Pelayanan Keagamaan Digital Pulau Dullah Utara, Kota Tual.\nMelayani Administrasi Nikah, Wakaf, Konsultasi Keagamaan, dan Bimbingan Ummat secara Profesional, Mudah, Cepat, dan Terintegrasi.",
        address: "Jl. Pemuda No. 12, Pulau Dullah Utara, Kota Tual, Maluku",
        email: "kuadullahutara01@gmail.com",
        phone: "+62 812 4091 2842",
        facebookUrl: "https://facebook.com/kua.dullahutara",
        instagramUrl: "https://instagram.com/kua.dullahutara",
        twitterUrl: "",
        tiktokUrl: "",
        youtubeUrl: "https://youtube.com/@kua.dullahutara",
        kepalaKuaName: "H. Ahmad, S.Ag.",
        kepalaKuaImg: ""
      },
      admin: {
        username: "admin",
        password: "kuaadmin2026"
      }
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), "utf-8");
  }
}

initDatabase();

// Load Database
function readDB() {
  if (fs.existsSync(DB_PATH)) {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  }
  return {};
}

// Write Database
function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Support upload folder as static
app.use("/uploads", express.static(UPLOADS_DIR));

// ================== API ENDPOINTS ==================

// GET /api/db - Get all database elements (for general state)
app.get("/api/db", (req, res) => {
  try {
    const db = readDB();
    // Exclude password on read
    const { admin, ...safeDB } = db;
    res.json(safeDB);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const db = readDB();
  if (username === db.admin.username && password === db.admin.password) {
    res.json({ success: true, token: "kua-auth-token-2026", username });
  } else {
    res.status(401).json({ success: false, message: "Username atau password salah!" });
  }
});

// GET /api/layanan
app.get("/api/layanan", (req, res) => {
  const db = readDB();
  res.json(db.layanan || []);
});

// POST /api/layanan
app.post("/api/layanan", (req, res) => {
  try {
    const db = readDB();
    const newLayanan = req.body;
    if (!newLayanan.title || !newLayanan.category) {
      return res.status(400).json({ error: "Title dan Category wajib diisi!" });
    }
    const id = `${newLayanan.category}-${Date.now()}`;
    const added = { id, ...newLayanan };
    db.layanan.push(added);
    writeDB(db);
    res.json(added);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/layanan/:id
app.put("/api/layanan/:id", (req, res) => {
  try {
    const db = readDB();
    const id = req.params.id;
    const updateIdx = db.layanan.findIndex((l: any) => l.id === id);
    if (updateIdx === -1) {
      return res.status(404).json({ error: "Layanan tidak ditemukan" });
    }
    db.layanan[updateIdx] = { ...db.layanan[updateIdx], ...req.body, id };
    writeDB(db);
    res.json(db.layanan[updateIdx]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/layanan/:id
app.delete("/api/layanan/:id", (req, res) => {
  try {
    const db = readDB();
    const id = req.params.id;
    db.layanan = db.layanan.filter((l: any) => l.id !== id);
    writeDB(db);
    res.json({ success: true, message: "Layanan berhasil dihapus" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/announcements
app.get("/api/announcements", (req, res) => {
  const db = readDB();
  res.json(db.pengumuman || []);
});

// POST /api/announcements
app.post("/api/announcements", (req, res) => {
  try {
    const db = readDB();
    const { title, content, status } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title dan Content pengumuman wajib diisi!" });
    }
    const newAn = {
      id: `p-${Date.now()}`,
      title,
      content,
      date: new Date().toISOString().split("T")[0],
      status: status || "aktif"
    };
    db.pengumuman.unshift(newAn);
    writeDB(db);
    res.json(newAn);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/announcements/:id
app.delete("/api/announcements/:id", (req, res) => {
  try {
    const db = readDB();
    db.pengumuman = db.pengumuman.filter((p: any) => p.id !== req.params.id);
    writeDB(db);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/settings - Update general config (links, title, contact, etc.)
app.put("/api/settings", (req, res) => {
  try {
    const db = readDB();
    db.settings = { ...db.settings, ...req.body };
    writeDB(db);
    res.json(db.settings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/upload - Single JPG upload base64 or form payload
app.post("/api/upload", (req, res) => {
  try {
    const { filename, base64Data } = req.body;
    if (!filename || !base64Data) {
      return res.status(400).json({ error: "filename & base64Data wajib dikirim" });
    }

    // Clean up base64 prefix
    const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const fileBuffer = Buffer.from(base64Clean, "base64");
    
    // Ensure filename ends safely and contains a unique suffix to prevent concurrency issues
    const ext = path.extname(filename) || ".jpg";
    const base = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, "");
    const safeFilename = `${base}-${Date.now()}${ext}`;
    const destination = path.join(UPLOADS_DIR, safeFilename);

    fs.writeFileSync(destination, fileBuffer);
    
    // Return relative url accessible from /uploads/<filename>
    res.json({ success: true, url: `/uploads/${safeFilename}` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


// Reset / Set Admin Creds API
app.get("/api/ping", (req, res) => {
  res.json({ ping: "pong", time: new Date().toISOString() });
});

// Vite Integration Setup & Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[KUA SYSTEM] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
