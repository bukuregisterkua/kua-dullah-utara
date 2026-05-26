import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  X, 
  Lock
} from "lucide-react";
import confetti from "canvas-confetti";

import Header from "./components/Header";
import Hero from "./components/Hero";
import SplashScreen from "./components/SplashScreen";
import BukuTamuPage from "./components/BukuTamuPage";
import EvaluasiModal from "./components/EvaluasiModal";

import { PENYULUH_AGAMA_LIST } from "./components/penyuluhData";
import { Layanan, Pengumuman, Settings, DBState } from "./types";

import kepalaKuaImg from "./assets/images/kepala_kua_1779336160767.png";
import statistikKuaImg from "./assets/images/statistik_kua_1779338497688.png";
import berkasUmumImg from "./assets/images/berkas_umum_1779246456217.png";
import berkasKhususImg from "./assets/images/berkas_khusus_1779246479558.png";

// Standard default static list of Kemenag services
const INITIAL_LAYANAN: Layanan[] = [
  {
    id: "l1",
    category: "nikah",
    type: "info",
    title: "Sistem Administrasi Nikah (Simkah)",
    description: "Panduan lengkap pengurusan berkas pendaftaran nikah dan alur Rekomendasi Nikah.",
    content: [
      "Mengisi formulir model N1, N2, N4 di desa/kelurahan setempat.",
      "Fotokopi KTP, KK, dan Akta Kelahiran calon pengantin.",
      "Surat izin tertulis dari orang tua (bagi yang berumur di bawah 21 tahun).",
      "Membayar biaya PNBP Rp 600.000 jika akad dilangsungkan di luar KUA."
    ]
  },
  {
    id: "l2",
    category: "wakaf",
    type: "info",
    title: "Sertifikasi & Ikrar Wakaf Kantor KUA",
    description: "Pelayanan pendaftaran, pengukuran, penyusunan ikrar wakaf (AIW), dan legalisasi tanah wakaf ummat.",
    content: [
      "Fotokopi sertifikat tanah atau surat bukti kepemilikan sah lainnya.",
      "Identitas autentik Wakif (pemberi wakaf) dan para saksi.",
      "Pernyataan kehendak ikrar wakaf bermaterai di hadapan Kepala KUA.",
      "Alokasi peruntukan wakaf secara syariah (Masjid, Pesantren, Makam)."
    ]
  },
  {
    id: "l3",
    category: "muallaf",
    type: "info",
    title: "Pembinaan Khusus & Muallaf Center",
    description: "Layanan pensyahadatan resmi, menerbitkan sertifikat pengislaman, dan kurikulum pembinaan terpadu.",
    content: [
      "Pernyataan tulus masuk Islam tanpa paksaan dari pihak manapun.",
      "Pas foto pribadi calon muallaf berukuran 3x4 (3 lembar).",
      "Hadirnya minimal 2 orang saksi muslim dewasa yang sah.",
      "Penerbitan surat keterangan syahadat resmi bercap stempel KUA."
    ]
  }
];

// Standard default listings for Announcement board
const INITIAL_PENGUMUMAN: Pengumuman[] = [
  {
    id: "e1",
    title: "Bimwin Catin Angkatan II Tahun 2026",
    content: "Diberitahukan kepada seluruh pasangan calon pengantin yang telah mendaftar akad nikah pada bulan Februari, wajib menghadiri kelas Bimbingan Perkawinan (Bimwin) pada hari Selasa bertempat di Balai Nikah KUA Pulau Dullah Utara.",
    date: "25 Mei 2026",
    status: "aktif"
  },
  {
    id: "e2",
    title: "Sosialisasi Sertifikasi Halal Gratis (SEHATI)",
    content: "KUA bersama Badan Penyelenggara Jaminan Produk Halal (BPJPH) menyelenggarakan panduan sertifikasi halal gratis bagi pemilik warung dan UKM binaan di Dullah Utara.",
    date: "14 Mei 2026",
    status: "aktif"
  }
];

// Default configurations
const DEFAULT_SETTINGS: Settings = {
  whatsappNumber: "6281240912842",
  whatsappText: "Assalamualaikum%20KUA%20Pulau%20Dullah%20Utara,%20saya%20ingin%20konsultasi%25...",
  youtubeNikahUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  youtubeWakafUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  googleFormBukuTamu: "https://docs.google.com/forms/d/e/1FAIpQLSdwC776xZId3A9F6PuxI79GkP5z0r912Sg618Y8Y0f2u8f29g/viewform?embedded=true",
  googleFormPenyuluhan: "https://forms.gle/kuadullahbukutamu",
  bannerTitle: "KANTOR URUSAN AGAMA\nPULAU DULLAH UTARA",
  bannerSubtitle: "Pusat Pelayanan Keagamaan Digital Pulau Dullah Utara, Kota Tual. Melayani Administrasi Nikah, Wakaf, Pembinaan Muallaf, serta Bimbingan Ummat secara Transparan, Amanah, dan Bersahaja.",
  address: "Jl. Panglima Mandala, Fiditan, Kecamatan Pulau Dullah Utara, Kota Tual, Maluku",
  email: "kuadullahutaratual@kemenag.go.id",
  phone: "081240912842",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  logoImg: ""
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentTab, setCurrentTab] = useState<string>("beranda");
  
  // Database state persisting in client storage
  const [db, setDb] = useState<DBState>(() => {
    const saved = localStorage.getItem("kua_digital_vault_v1");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to restore storage", e);
      }
    }
    return {
      layanan: INITIAL_LAYANAN,
      pengumuman: INITIAL_PENGUMUMAN,
      settings: DEFAULT_SETTINGS,
      penyuluh: PENYULUH_AGAMA_LIST
    };
  });

  // Save to locale storage whenever state variables change
  useEffect(() => {
    localStorage.setItem("kua_digital_vault_v1", JSON.stringify(db));
  }, [db]);

  const defaultSettings = db.settings;
  const penyuluhList = db.penyuluh;
  const servicesList = db.layanan;
  const announcementList = db.pengumuman;

  // Evaluation trigger modal state
  const [showEvaluasiModal, setShowEvaluasiModal] = useState(false);

  // Administrative login
  const [passwordInput, setPasswordInput] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("kua_admin_token") === "active_session_yes";
  });

  // Editor states in Admin Area
  const [editBannerTitle, setEditBannerTitle] = useState(defaultSettings.bannerTitle || "");
  const [editBannerSubtitle, setEditBannerSubtitle] = useState(defaultSettings.bannerSubtitle || "");
  const [editWaNum, setEditWaNum] = useState(defaultSettings.whatsappNumber);
  const [editFormBukuTamu, setEditFormBukuTamu] = useState(defaultSettings.googleFormBukuTamu || "");
  
  const [toast, setToast] = useState<string | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "admin123") {
      setIsAdminLoggedIn(true);
      localStorage.setItem("kua_admin_token", "active_session_yes");
      setShowLoginModal(false);
      setPasswordInput("");
      confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } });
      triggerToast("Akses Diterima: Berhasil Masuk Panel Administrasi!");
      setCurrentTab("admin");
    } else {
      alert("Sandi Salah! Gunakan sandi standard: admin123");
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("kua_admin_token");
    triggerToast("Informasi: Sesi Panel Administrasi Telah Ditutup.");
    setCurrentTab("beranda");
  };

  const handleSaveConfigs = () => {
    setDb(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        bannerTitle: editBannerTitle,
        bannerSubtitle: editBannerSubtitle,
        whatsappNumber: editWaNum,
        googleFormBukuTamu: editFormBukuTamu
      }
    }));
    triggerToast("Sukses: Pengaturan Website Berhasil Diperbaharui!");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans selection:bg-emerald-600 selection:text-white relative">
      <AnimatePresence>
        {showSplash && (
          <SplashScreen 
            logoUrl={defaultSettings.logoImg} 
            onComplete={() => setShowSplash(false)} 
          />
        )}
      </AnimatePresence>

      {!showSplash && (
        <>
          {/* Header Component inside navigation row */}
          <Header 
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            onAdminClick={() => setShowLoginModal(true)}
            isAdmin={isAdminLoggedIn}
            onLogout={handleLogout}
            logoImg={defaultSettings.logoImg}
          />

          <main className="flex-grow py-8 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* ==================== TAB: ROOT BERANDA ==================== */}
            {currentTab === "beranda" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                {/* Visual Hero Billboard overlay */}
                <Hero 
                  settings={defaultSettings}
                  setCurrentTab={setCurrentTab}
                  onAdminClick={() => setShowLoginModal(true)}
                />

                {/* Grid features blocks (Interactive Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Card 1: Simkah Layanan */}
                  <div 
                    onClick={() => setCurrentTab("layanan-pembuka")}
                    className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all cursor-pointer hover:border-emerald-550/25 relative overflow-hidden"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold mb-4 border border-emerald-100/50 group-hover:scale-105 transition-transform">
                      📖
                    </div>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors">01. Layanan Nikah (SIMKAH)</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Unduh berkas model N1-N4, pelajari syarat mutlak wali nikah, dispensasi usia Pengadilan Agama, dan verifikasi biaya nikah resmi.
                    </p>
                  </div>

                  {/* Card 2: Wakaf */}
                  <div 
                    onClick={() => setCurrentTab("layanan-pembuka")}
                    className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all cursor-pointer hover:border-emerald-550/25 relative overflow-hidden"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold mb-4 border border-emerald-100/50 group-hover:scale-105 transition-transform">
                      🕌
                    </div>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors">02. Sertifikasi Wakaf Digital</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Daftarkan kepemilikan tanah wakaf keluarga untuk rumah ibadah/makam di hadapan Kepala KUA selaku Penjabat Pembuat Akta Ikrar Wakaf.
                    </p>
                  </div>

                  {/* Card 3: Evaluasi Bimwin (CRITICAL PATH) */}
                  <div 
                    onClick={() => setShowEvaluasiModal(true)}
                    className="group bg-gradient-to-br from-emerald-900 to-[#1F8A70] text-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
                  >
                    {/* Glowing design elements to signal importance */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl pointer-events-none" />
                    
                    <div className="w-11 h-11 rounded-2xl bg-yellow-400/20 text-yellow-400 font-bold flex items-center justify-center mb-4 border border-yellow-400/30">
                      🎯
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-white">03. Evaluasi Bimwin (Cepat)</h4>
                      <span className="text-[8px] bg-yellow-400 text-slate-950 font-black px-1.5 py-0.5 rounded uppercase">Baru</span>
                    </div>
                    <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
                      Isi evaluasi kuesioner penyuluhan sakinah secara digital. Tanda tangan langsung di HP/Laptop &amp; langsung download file PDF A4 resmi Kemenag RI!
                    </p>
                  </div>

                </div>

                {/* Struktur Kepala KUA Section */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-4 flex justify-center">
                    <div 
                      onClick={() => setActiveLightboxImage(kepalaKuaImg)}
                      className="relative w-48 h-48 rounded-[2rem] overflow-hidden bg-slate-100 border-4 border-emerald-50 shadow-md cursor-pointer hover:opacity-95 transition-opacity"
                    >
                      <img 
                        src={kepalaKuaImg} 
                        alt="Umar Letsoin, S.HI" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-8 text-left space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-[#1F8A70] tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        Kepala Kantor Urusan Agama
                      </span>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight mt-1.5">Umar Letsoin, S.HI</h3>
                      <p className="text-xs text-slate-400 font-bold font-mono">NIP. 197412032009121002 · Pembina Utama / IIIb</p>
                    </div>

                    <p className="text-xs text-slate-650 leading-relaxed italic">
                      "Selamat datang di website KUA Kecamatan Pulau Dullah Utara Kota Tual. Kami berkomitmen memberikan layanan berciri Kemah Madani yang andal, akuntabel, bebas praktek pungli, ramah keluarga, serta siap membina generasi ummat yang damai, religius, berkomitmen kebangsaan, serta menjunjung tinggi pilar kebaikan."
                    </p>

                    <div className="pt-2 flex items-center gap-3">
                      <a 
                        href={`https://wa.me/${defaultSettings.whatsappNumber}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>Hubungi Kepala WA</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Penyuluh Agama Islam Directory Grid on Home screen */}
                <div className="space-y-6">
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-black text-slate-900 uppercase">Daftar Penyuluh Agama Kantor KUA</h3>
                    <p className="text-xs text-slate-500">Hubungi langsung penyuluh kami untuk konsultasi perihal pernikahan, zakat, sengketa waris, muallaf, atau ibadah kurban.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
                    {penyuluhList.map((p) => (
                      <div key={p.id} className="bg-white rounded-2xl p-4 border border-slate-200/85 hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-4 shadow-3xs">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-xl shrink-0">
                              {p.avatar}
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-slate-805 leading-snug">{p.name}</h4>
                              <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">{p.role}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-1.5 text-[10px] leading-relaxed">
                            <div className="flex justify-between border-b pb-1 border-slate-100">
                              <span className="text-slate-400">Pangkat/Gol</span>
                              <span className="font-bold text-slate-800">{p.pangkat}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1 border-slate-100">
                              <span className="text-slate-400">Spesialisasi</span>
                              <span className="font-bold text-[#1F8A70]">{p.specialty}</span>
                            </div>
                            <div className="text-slate-400 flex flex-col pt-0.5">
                              <span>Jadwal Bimbingan:</span>
                              <span className="font-bold text-slate-700 mt-0.5">{p.schedule}</span>
                            </div>
                          </div>
                        </div>

                        <a 
                          href={`https://wa.me/${p.contact || defaultSettings.whatsappNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-100 hover:bg-emerald-50 text-slate-750 hover:text-emerald-950 rounded-xl text-[10px] font-black text-center border border-slate-200 hover:border-emerald-200 transition-colors"
                        >
                          Chat WhatsApp Konsultasi
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* ==================== TAB: PROFIL KANTOR ==================== */}
            {currentTab === "profil" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-xs space-y-8"
              >
                <div className="border-b pb-4 mb-4 text-left">
                  <h3 className="text-xl font-black text-slate-900 uppercase">Sejarah & Profil KUA</h3>
                  <p className="text-xs text-slate-500 uppercase font-mono mt-1">Kecamatan Pulau Dullah Utara, Kota Tual, Maluku</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 leading-relaxed text-xs text-slate-700">
                  <div className="space-y-4">
                    <h4 className="text-sm font-black text-slate-900 border-l-4 border-[#1F8A70] pl-3 uppercase">Sejarah Singkat & Landasan Pelayanan</h4>
                    <p>
                      Kantor Urusan Agama (KUA) Kecamatan Pulau Dullah Utara berkedudukan di wilayah Kota Tual, Maluku, didirikan untuk melayani kebutuhan bimbingan keagamaan yang kian dinamis bagi warga pulau di pesisir utara tual.
                    </p>
                    <p>
                      Sebagai kepanjangan tangan dari Kementerian Agama Republik Indonesia tingkat kecamatan, KUA tidak sekadar memfasilitasi administrasi legalitas akad nikah, melainkan juga memantapkan pembelaan iman warga lewat sertifikasi wakaf digital, bimbingan mualaf, pembinaan zakat, serta monitoring masjid.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-black text-slate-900 border-l-4 border-[#1F8A70] pl-3 uppercase">Visi & Misi KUA Kemah Madani</h4>
                    <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-[11px] text-slate-800 space-y-2">
                      <p className="font-bold text-[#1F8A70]">VISI:</p>
                      <p className="italic">"Terwujudnya Masyarakat Pulau Dullah Utara yang Taat Beragama, Harmonis, Cerdas, Sejahtera lahir batin, serta Berakhlak Mulia Berlandaskan Keberagaman."</p>
                      <p className="font-bold text-[#1F8A70] pt-1">MISI UTAMA:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Meningkatkan kualitas pendaftaran layanan nikah bebas pungutan liar.</li>
                        <li>Memaksimalkan bimbingan penataran pranikah (Bimwin) yang berstandar nasional.</li>
                        <li>Membina penyebaran moderasi beragama berasaskan iman kepada Tuhan Yang Maha Esa.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Statistik Kinerja Section */}
                <div className="border-t pt-8 space-y-4 text-center">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Statistik & Kinerja Pelayanan KUA</h4>
                  <p className="text-xs text-slate-500 max-w-2xl mx-auto font-medium">Grafik pencapaian kegiatan bimbingan perkawinan (Bimwin), sertifikasi wakaf digital, serta pembinaan muallaf di wilayah Pulau Dullah Utara.</p>
                  <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs cursor-pointer group hover:bg-slate-50 hover:border-emerald-500/20 hover:opacity-95 transition-all p-3 bg-white" onClick={() => setActiveLightboxImage(statistikKuaImg)}>
                    <img
                      src={statistikKuaImg}
                      alt="Statistik Pelayanan KUA"
                      className="w-full h-auto object-contain rounded-2xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block font-mono">Klik diagram untuk memperbesar pratinjau</span>
                </div>
              </motion.div>
            )}

            {/* ==================== TAB: PILIHAN LAYANAN ==================== */}
            {currentTab === "layanan-pembuka" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-wrap gap-4 items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900 uppercase">Informasi Syarat Pengurusan Layanan KUA</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Berkas pendaftaran, kurikulum bimbingan, serta persyaratan legalisasi di KUA Pulau Dullah Utara.</p>
                  </div>
                  <button 
                    onClick={() => setShowEvaluasiModal(true)}
                    className="px-4 py-2 bg-[#1F8A70] text-white text-xs font-black uppercase rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  >
                    <span>Lompat ke Evaluasi Bimwin</span>
                    <FileText className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {servicesList.map((service) => (
                    <div key={service.id} className="bg-white border rounded-3xl p-6 border-slate-200 relative overflow-hidden flex flex-col justify-between shadow-3xs hover:shadow-md transition-all">
                      <div className="space-y-4">
                        <div className="inline-block bg-teal-50 border border-teal-100 text-teal-800 text-[9px] font-black uppercase px-2 py-0.5 rounded-md">
                          💼 Layanan {service.category}
                        </div>
                        <h4 className="text-sm font-black text-slate-900 leading-snug">{service.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{service.description}</p>
                        
                        <div className="pt-2 border-t border-slate-100">
                          <span className="block text-[10px] uppercase font-black tracking-wider text-slate-400 mb-2">Tahapan Persyaratan:</span>
                          <ul className="space-y-2 text-[11px] text-slate-600">
                            {service.content?.map((text, idx) => (
                              <li key={idx} className="flex gap-2 items-start leading-normal">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                                <span>{text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <a 
                        href={`https://wa.me/${defaultSettings.whatsappNumber}?text=Saya%20ingin%20mengurus%20layanan%20${service.category}%20di%20KUA...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-6 py-2.5 bg-slate-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-black tracking-wider text-center flex items-center justify-center gap-1.5 transition-all shadow-xxs"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>Konsultasi Syarat WhatsApp</span>
                      </a>
                    </div>
                  ))}
                </div>

                {/* Diagram Berkas Alur Persyaratan */}
                <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                  <div className="text-left border-b pb-4">
                    <h4 className="text-base font-black text-slate-900 uppercase">Diagram Alur &amp; Persyaratan Berkas</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Panduan visual pendaftaran nikah dengan skema kelengkapan berkas umum dan berkas khusus.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Berkas Umum Card */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-58 border border-emerald-100 px-3 py-1 rounded-full">
                          Dokumen Persyaratan Umum
                        </span>
                      </div>
                      <div 
                        onClick={() => setActiveLightboxImage(berkasUmumImg)}
                        className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-3xs cursor-pointer hover:border-emerald-500/20 hover:opacity-95 transition-all p-3 bg-white hover:shadow-md"
                      >
                        <img 
                          src={berkasUmumImg} 
                          alt="Berkas Umum Nikah" 
                          className="max-h-[300px] mx-auto object-contain rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <p className="text-[10.5px] text-slate-500 leading-relaxed">Berkas utama bagi calon pengantin berstatus lajang (N1-N4, fotokopi KTP, KK, ijazah, imunisasi catin, dll).</p>
                    </div>

                    {/* Berkas Khusus Card */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-amber-850 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full">
                          Dokumen Persyaratan Khusus
                        </span>
                      </div>
                      <div 
                        onClick={() => setActiveLightboxImage(berkasKhususImg)}
                        className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-3xs cursor-pointer hover:border-amber-500/20 hover:opacity-95 transition-all p-3 bg-white hover:shadow-md"
                      >
                        <img 
                          src={berkasKhususImg} 
                          alt="Berkas Khusus Nikah" 
                          className="max-h-[300px] mx-auto object-contain rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <p className="text-[10.5px] text-slate-500 leading-relaxed">Syarat tambahan khusus bagi duda/janda, anggota TNI/Polri, WNA, poligami, di bawah umur, atau mualaf.</p>
                    </div>
                  </div>
                  <div className="text-center pt-4 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 font-mono">Klik masing-masing gambar diagram di atas untuk memperbesar tampilan pratinjau</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==================== TAB: BUKU TAMU DIGITAL (IFRAME) ==================== */}
            {currentTab === "buku-tamu" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <BukuTamuPage 
                  bukuTamuUrl={defaultSettings.googleFormBukuTamu || "https://forms.gle/kuadullahbukutamu"} 
                />
              </motion.div>
            )}

            {/* ==================== TAB: PENGUMUMAN BOARD ==================== */}
            {currentTab === "pengumuman" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-black text-slate-900 uppercase">Papan Informasi &amp; Pendaftaran</h3>
                  <p className="text-xs text-slate-500">Pengumuman resmi balai nikah, jadwal penyuluhan, dan program syiar sosial KUA Pulau Dullah Utara.</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                  {announcementList.map((ann) => (
                    <div key={ann.id} className="bg-white border p-6 border-slate-205 rounded-3xl shadow-3xs flex flex-col sm:flex-row items-start gap-4 hover:border-emerald-500/20 transition-all">
                      <div className="w-12 h-12 bg-amber-50 text-amber-800 border border-amber-100 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0">
                        📣
                      </div>
                      <div className="text-left space-y-2 flex-grow">
                        <div className="flex justify-between items-start gap-3 flex-wrap">
                          <h4 className="text-sm font-black text-slate-900 leading-snug">{ann.title}</h4>
                          <span className="text-[9.5px] font-bold text-slate-400 font-mono tracking-wider uppercase">{ann.date}</span>
                        </div>
                        <p className="text-xs text-slate-650 leading-relaxed">
                          {ann.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ==================== TAB: HUBUNGI KAMI ==================== */}
            {currentTab === "kontak" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-xs max-w-4xl mx-auto space-y-8"
              >
                <div className="border-b pb-4 mb-4 text-left">
                  <h3 className="text-xl font-black text-slate-900 uppercase">Hubungi Kantor Layanan</h3>
                  <p className="text-xs text-slate-400">Hubungi petugas atau layangkan surat resmi ke dinas layanan Kecamatan Dullah Utara.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4 text-xs text-slate-650">
                    <h4 className="text-sm font-black text-slate-909 uppercase">Informasi Korespondensi KUA</h4>
                    
                    <div className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl">
                      <MapPin className="h-5 w-5 text-emerald-800 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-black text-[10px] text-slate-400 uppercase">Alamat Kantor Fisik</span>
                        <p className="text-[12px] text-slate-800 font-semibold mt-0.5">{defaultSettings.address}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl">
                      <Mail className="h-5 w-5 text-emerald-800 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-black text-[10px] text-slate-400 uppercase">Surel Elektronik (Email)</span>
                        <p className="text-[12px] text-slate-800 font-mono mt-0.5">{defaultSettings.email}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl">
                      <Phone className="h-5 w-5 text-emerald-800 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-black text-[10px] text-slate-400 uppercase">Nomor Kontak WhatsApp</span>
                        <p className="text-[12px] text-slate-800 font-mono mt-0.5">+{defaultSettings.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 border border-emerald-500/10 rounded-2xl text-center flex flex-col justify-center items-center space-y-4">
                    <h5 className="text-sm font-bold text-slate-900">Saluran Layanan Pengaduan Langsung</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Menemukan hambatan dalam pendaftaran nikah atau menemui pungutan liar? Hubungi nomor saluran siaga KUA Pulau Dullah Utara di bawah ini.
                    </p>
                    <a 
                      href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black uppercase text-center flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Laporkan Pengaduan</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==================== TAB: PANEL ADMINISTRASI (ADMIN) ==================== */}
            {currentTab === "admin" && isAdminLoggedIn && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4">
                  <div className="text-left">
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded uppercase font-black tracking-widest">
                      Akses Administrator Aktif
                    </span>
                    <h3 className="text-lg font-black text-slate-900 uppercase mt-1">Konfigurasi & Sunting Sitem Informasi</h3>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-xl text-xs font-black uppercase transition-colors shrink-0 cursor-pointer"
                  >
                    Logout Sesi Admin
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  
                  {/* Configuration Form */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 text-xs">
                    <h4 className="text-xs font-black uppercase text-slate-900 border-b pb-2">Identitas &amp; Teks Spanduk Utama</h4>
                    
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Judul Utama Spanduk (Banner Title)</label>
                      <textarea 
                        rows={2}
                        value={editBannerTitle}
                        onChange={(e) => setEditBannerTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-250 bg-white rounded-xl font-bold font-sans text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Sub-judul Spanduk (Banner Subtitle)</label>
                      <textarea 
                        rows={3}
                        value={editBannerSubtitle}
                        onChange={(e) => setEditBannerSubtitle(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-250 bg-white rounded-xl text-xs font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Operational Settings */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 text-xs">
                    <h4 className="text-xs font-black uppercase text-slate-900 border-b pb-2">Integrasi Hubungan & Perpesanan</h4>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Nomor WA Hotline (Gunakan format 62...)</label>
                      <input 
                        type="text"
                        value={editWaNum}
                        onChange={(e) => setEditWaNum(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-250 bg-white rounded-xl font-mono text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Google Form Buku Tamu Digital (src url)</label>
                      <input 
                        type="text"
                        value={editFormBukuTamu}
                        onChange={(e) => setEditFormBukuTamu(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-250 bg-white rounded-xl font-mono text-xs focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveConfigs}
                      className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                    >
                      ✓ Simpan Semua Perubahan
                    </button>
                  </div>

                </div>

                <div className="bg-emerald-50 border border-emerald-150 p-4 rounded-2xl text-[10.5px] text-emerald-900 leading-relaxed font-semibold">
                  ℹ️ <strong>Informasi Keamanan Vaket:</strong> Data isian dikonsolidasikan dan disimpan di database lokal <code>localStorage</code> peramban Anda. Melakukan pembersihan data penjelajah dapat mereset data isian ini kembali ke rancangan KUA standard.
                </div>
              </motion.div>
            )}

          </main>

          {/* Footer Copyright layout */}
          <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800 text-center no-print">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <p className="text-[12px] font-black uppercase tracking-widest text-[#059669]">
                KUA Kecamatan Pulau Dullah Utara · Kemenag Kota Tual
              </p>
              <p className="text-[10px] leading-relaxed max-w-xl mx-auto">
                Sistem Informasi Digital Terpadu KUA Kecamatan Pulau Dullah Utara Kota Tual Provinsi Maluku. Seluruh layanan kependudukan keagamaan dilindungi ketetapan Kemenag RI bebas pungutan liar.
              </p>
              <div className="w-20 h-0.5 bg-emerald-800 mx-auto rounded-full" />
              <p className="text-[8px] font-mono tracking-widest text-slate-500">
                © {new Date().getFullYear()} KANTOR URUSAN AGAMA KECAMATAN PULAU DULLAH UTARA · KEMAH MADANI. ALL RIGHTS RESERVED.
              </p>
            </div>
          </footer>
        </>
      )}

      {/* ========================================================
          MODAL 1: LOGIN ADMINISTRATOR ADM123
          ======================================================== */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 no-print">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl space-y-4 relative"
            >
              <div className="flex items-center space-x-2 text-rose-700">
                <Lock className="h-5 w-5" />
                <h4 className="text-sm font-black text-slate-900 uppercase">Login Otoritas Admin</h4>
              </div>
              
              <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute right-4 top-4 p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="h-4 w-4" />
              </button>

              <form onSubmit={handleLogin} className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-[9px] font-black uppercase text-slate-500">Masukkan Sandi Otoritas</label>
                  <input 
                    type="password"
                    required
                    placeholder="Sandi default: admin123"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-250 rounded-xl text-center text-xs font-mono tracking-widest focus:outline-none focus:border-emerald-600"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-slate-950 hover:bg-slate-900 text-white rounded-xl text-xs font-black uppercase py-2.5 transition-colors cursor-pointer"
                >
                  Konfirmasi Masuk
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================
          MODAL 2: HIGH-FIDELITY MODULAR EVALUASIMODAL (CRITICAL)
          ======================================================== */}
      {showEvaluasiModal && (
        <EvaluasiModal 
          isOpen={showEvaluasiModal}
          onClose={() => setShowEvaluasiModal(false)}
          penyuluhList={penyuluhList}
        />
      )}

      {/* Floating alert/success Toast across page turns */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[9999] max-w-sm bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 shadow-xl flex items-start gap-3 no-print"
          >
            <div className="bg-emerald-500/20 text-emerald-400 p-1 rounded-lg">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold font-sans">Sistem KUA</p>
              <p className="text-[10.5px] text-slate-400 leading-normal mt-0.5">{toast}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Overlay for Diagram & Statistics Visuals */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 no-print"
            onClick={() => setActiveLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveLightboxImage(null)}
                className="absolute -top-12 right-0 p-2 text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer shadow-md"
                title="Tutup Pratinjau"
              >
                <X className="h-6 w-6" />
              </button>
              <img
                src={activeLightboxImage}
                alt="Pratinjau Diagram KUA"
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10 bg-white"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
