import React, { useState, useEffect, useRef } from "react";
import { 
  Heart, 
  FileText, 
  Globe, 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Upload, 
  Clock, 
  Shield, 
  User, 
  Lock, 
  Settings as SettingsIcon, 
  LogOut, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  MapPin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Eye, 
  Video, 
  X, 
  AlertCircle, 
  Info,
  Layers,
  Sparkles,
  BookOpen,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Layanan, Pengumuman, Settings, DBState } from "./types";
import berkasUmum from "./assets/berkas-umum.jpg";
import berkasKhusus from "./assets/berkas-khusus.jpg";

export default function App() {
  const [db, setDb] = useState<DBState | null>(null);
  const [currentTab, setCurrentTab] = useState<string>("beranda");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  
  // Login credentials state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Search and filter for general announcements
  const [searchTerm, setSearchTerm] = useState("");
  
  // Media Preview modal states
  const [activeMediaPreview, setActiveMediaPreview] = useState<{
    type: "image" | "youtube";
    url: string;
    title: string;
  } | null>(null);

  // Custom Modal state for specific image preview
  const [customModalImage, setCustomModalImage] = useState<string | null>(null);

  // Form states for Admin actions
  const [adminActiveTab, setAdminActiveTab] = useState<"layanan" | "pengumuman" | "settings">("layanan");
  
  // Layanan form
  const [editingLayanan, setEditingLayanan] = useState<Partial<Layanan> | null>(null);
  const [layananFormContentInput, setLayananFormContentInput] = useState<string>("");

  // Pengumuman form
  const [newPengumumanTitle, setNewPengumumanTitle] = useState("");
  const [newPengumumanContent, setNewPengumumanContent] = useState("");
  const [newPengumumanStatus, setNewPengumumanStatus] = useState("aktif");

  // Settings form
  const [settingsForm, setSettingsForm] = useState<Partial<Settings>>({});

  // Loading indicator
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Citizen Contact Form State (for WhatsApp forwarding)
  const [contactName, setContactName] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Fetch complete database state
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/db");
      if (res.ok) {
        const data = await res.json();
        setDb(data);
        if (data.settings) {
          setSettingsForm(data.settings);
        }
      } else {
        console.error("Gagal memuat database");
      }
    } catch (err) {
      console.error("Koneksi gagal:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Restore session if token exists
    const token = localStorage.getItem("kua_admin_token");
    if (token) {
      setIsAdminLoggedIn(true);
      setAdminToken(token);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdminLoggedIn(true);
        setAdminToken(data.token);
        localStorage.setItem("kua_admin_token", data.token);
        setShowLoginModal(false);
        setCurrentTab("admin");
        setUsername("");
        setPassword("");
      } else {
        setLoginError(data.message || "Username atau password salah!");
      }
    } catch (err) {
      setLoginError("Koneksi ke server gagal!");
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminToken(null);
    localStorage.removeItem("kua_admin_token");
    if (currentTab === "admin") {
      setCurrentTab("beranda");
    }
  };

  // Image Upload handler for layanans (JPG/PNG conversion to Base64 first)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: "layanan" | "settings", callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      alert("Harap pilih file gambar (JPG/PNG)!");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      try {
        setIsSubmitting(true);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            base64Data
          })
        });
        const uploadData = await uploadRes.json();
        if (uploadRes.ok && uploadData.url) {
          callback(uploadData.url);
        } else {
          alert("Gagal mengunggah gambar: " + (uploadData.error || "Ukurannya mungkin terlalu besar"));
        }
      } catch (err) {
        console.error("Upload error", err);
        alert("Koneksi ke server terputus saat mengunggah!");
      } finally {
        setIsSubmitting(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Layanan mutations (Add / Edit / Delete)
  const saveLayanan = async () => {
    if (!editingLayanan || !editingLayanan.title || !editingLayanan.category) {
      alert("Judul dan Kategori wajib diisi!");
      return;
    }

    const formattedContent = layananFormContentInput
      ? layananFormContentInput.split("\n").map(line => line.trim()).filter(Boolean)
      : [];

    const payload = {
      ...editingLayanan,
      content: formattedContent
    };

    try {
      setIsSubmitting(true);
      const isNew = !editingLayanan.id;
      const url = isNew ? "/api/layanan" : `/api/layanan/${editingLayanan.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        await fetchData();
        setEditingLayanan(null);
        setLayananFormContentInput("");
      } else {
        const errData = await res.json();
        alert("Gagal menyimpan layanan: " + (errData.error || "Error server"));
      }
    } catch (err) {
      alert("Koneksi terganggu!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteLayanan = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus layanan ini?")) return;
    try {
      const res = await fetch(`/api/layanan/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchData();
      } else {
        alert("Gagal menghapus layanan");
      }
    } catch (err) {
      alert("Koneksi terganggu!");
    }
  };

  // Announcement mutations (Add / Delete)
  const savePengumuman = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPengumumanTitle || !newPengumumanContent) {
      alert("Judul dan Isi pengumuman wajib diisi!");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPengumumanTitle,
          content: newPengumumanContent,
          status: newPengumumanStatus
        })
      });
      if (res.ok) {
        await fetchData();
        setNewPengumumanTitle("");
        setNewPengumumanContent("");
        setNewPengumumanStatus("aktif");
      } else {
        alert("Gagal menambahkan pengumuman");
      }
    } catch (err) {
      alert("Koneksi terganggu!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deletePengumuman = async (id: string) => {
    if (!confirm("Hapus pengumuman ini?")) return;
    try {
      const res = await fetch(`/api/announcements/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchData();
      } else {
        alert("Gagal menghapus pengumuman");
      }
    } catch (err) {
      alert("Koneksi terganggu!");
    }
  };

  // Settings modification
  const saveSettings = async () => {
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsForm)
      });
      if (res.ok) {
        const savedSettings = await res.json();
        if (db) {
          setDb({ ...db, settings: savedSettings });
        }
        alert("Pengaturan website berhasil disimpan!");
      } else {
        alert("Gagal menyimpan pengaturan");
      }
    } catch (err) {
      alert("Koneksi terganggu!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Forward contact form inputs to WhatsApp
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactSubject || !contactMessage) {
      alert("Semua kolom pengirim wajib diisi!");
      return;
    }

    const phone = db?.settings.whatsappNumber || "6281240912842";
    const textFormatted = `Halo Admin KUA Pulau Dullah Utara,\n\nSaya: *${contactName}*\nPerihal: *${contactSubject}*\n\nPesan:\n_${contactMessage}_`;
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(textFormatted)}`;
    
    // Clear inputs after opening WA link
    window.open(waUrl, "_blank");
    setContactName("");
    setContactSubject("");
    setContactMessage("");
  };

  // Safe renderer for dynamic icons
  const renderLayananIcon = (iconName?: string) => {
    switch (iconName) {
      case "file-text": return <FileText className="h-6 w-6" />;
      case "git-commit": return <Layers className="h-6 w-6" />;
      case "globe": return <Globe className="h-6 w-6" />;
      case "edit-3": return <Edit className="h-6 w-6" />;
      case "message-circle": return <MessageSquare className="h-6 w-6 animate-pulse" />;
      case "youtube": return <Video className="h-6 w-6 text-rose-600" />;
      case "send": return <CheckCircle2 className="h-6 w-6" />;
      default: return <BookOpen className="h-6 w-6" />;
    }
  };

  // Render YouTube video safely in modern government UI layout or redirect to embed modal
  const playYoutubeVideo = (url: string, title: string) => {
    // Extract video ID dynamically
    let videoId = "";
    if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    }
    
    if (videoId) {
      setActiveMediaPreview({
        type: "youtube",
        url: `https://www.youtube.com/embed/${videoId}`,
        title: title
      });
    } else {
      window.open(url, "_blank");
    }
  };

  // Filter layanans by active categories
  const currentLayanans = db?.layanan.filter(l => l.category === currentTab) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
        <div className="p-8 glass-panel rounded-3xl text-center space-y-4 shadow-xl border border-emerald-100 max-w-sm">
          <BookOpen className="h-12 w-12 text-emerald-700 mx-auto animate-bounce" />
          <h3 className="text-xl font-extrabold font-display text-emerald-950">
            KUA PULAU DULLAH UTARA
          </h3>
          <p className="text-sm font-medium text-emerald-600 tracking-wider uppercase mb-2">
            Pusat Pelayanan Keagamaan Digital
          </p>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full animate-pulse w-3/4 mx-auto" style={{ width: "60%" }}></div>
          </div>
          <p className="text-xs text-slate-500 font-mono">Mengunduh konfig & database sistem...</p>
        </div>
      </div>
    );
  }

  const defaultSettings: Settings = db?.settings || {
    whatsappNumber: "6281240912842",
    whatsappText: "Halo Admin KUA Pulau Dullah Utara, saya ingin mendapatkan informasi tentang layanan digital KUA.",
    youtubeNikahUrl: "https://www.youtube.com/watch?v=RS3Ck7rAkq0",
    youtubeWakafUrl: "https://www.youtube.com/watch?v=wrejNPzi2Rc",
    googleFormNikah: "https://forms.gle/kuadullahnikah",
    googleFormRekomendasi: "https://forms.gle/kuadullahrekomendasi",
    googleFormWakaf: "https://forms.gle/kuadullahwakaf",
    googleFormMuallaf: "https://forms.gle/kuadullahmuallaf",
    bannerTitle: "KUA PULAU DULLAH UTARA",
    bannerSubtitle: "Pusat Pelayanan Keagamaan Digital Kecamatan Pulau Dullah Utara, Kota Tual. Nikah, Wakaf, & Bimbingan Ummat Terintegrasi.",
    address: "Jl. Pemuda No. 12, Pulau Dullah Utara, Kota Tual, Maluku",
    email: "kuadullahutara01@gmail.com",
    phone: "+62 812 4091 2842"
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      {/* Dynamic Header */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab}
        onAdminClick={() => setShowLoginModal(true)}
        isAdmin={isAdminLoggedIn}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: BERANDA */}
          {currentTab === "beranda" && (
            <motion.div
              key="beranda"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Responsive Hero Header */}
              <Hero 
                settings={defaultSettings} 
                setCurrentTab={setCurrentTab} 
                onAdminClick={() => setShowLoginModal(true)}
              />

              {/* Dynamic Shortcut Cards Grid */}
              <section className="bg-slate-50/50 py-16 border-y border-emerald-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-100/60 px-3 py-1 rounded-full">
                      Pilihan Navigasi Layanan
                    </span>
                    <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-2">
                      Sistem Pelayanan Agama & Keagamaan Digital
                    </h3>
                    <p className="text-sm text-slate-500 mt-3">
                      Lanjutkan proses administrasi perkawinan, audit sertifikasi waqaf dan bimbingan ummat dengan mengklik salah satu kategori di bawah ini.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Layanan Nikah Category Card */}
                    <div 
                      onClick={() => setCurrentTab("nikah")}
                      className="group bg-white rounded-3xl p-8 border border-emerald-50 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer relative overflow-hidden"
                      id="shortcut-nikah-box"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full group-hover:bg-emerald-100 transition-colors -z-1" />
                      
                      <div className="w-14 h-14 bg-emerald-50 group-hover:bg-emerald-700 hover:text-white text-emerald-700 rounded-2xl flex items-center justify-center transition-all shadow-xxs">
                        <Heart className="h-7 w-7 group-hover:text-white" />
                      </div>
                      
                      <h4 className="text-xl font-bold font-display text-slate-900 mt-6 group-hover:text-emerald-800 transition-colors">
                        💍 LAYANAN NIKAH
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        Pemberkasan nikah, pendaftaran SIMKAH, bimbingan perkawinan (Bimwin) online, video alur pendaftaran, dan pembuatan surat rekomendasi nikah luar daerah.
                      </p>
                      
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-700 mt-6 group-hover:translate-x-1.5 transition-transform">
                        <span>Layanan Nikah Online</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    {/* Layanan Wakaf Category Card */}
                    <div 
                      onClick={() => setCurrentTab("wakaf")}
                      className="group bg-white rounded-3xl p-8 border border-emerald-50 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer relative overflow-hidden"
                      id="shortcut-wakaf-box"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full group-hover:bg-teal-100 transition-colors -z-1" />
                      
                      <div className="w-14 h-14 bg-teal-50 group-hover:bg-emerald-700 text-emerald-800 rounded-2xl flex items-center justify-center transition-all shadow-xxs">
                        <FileText className="h-7 w-7 group-hover:text-white" />
                      </div>
                      
                      <h4 className="text-xl font-bold font-display text-slate-900 mt-6 group-hover:text-emerald-800 transition-colors">
                        📜 LAYANAN WAKAF
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        Persyaratan berkas sertifikasi tanah wakaf, informasi alur pembukuan, SIWAK Kemenag online, konsultasi wakaf terintegrasi WhatsApp, dan tutorial.
                      </p>
                      
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-teal-700 mt-6 group-hover:translate-x-1.5 transition-transform">
                        <span>Database SIWAK</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    {/* Muallaf Center Category Card */}
                    <div 
                      onClick={() => setCurrentTab("muallaf")}
                      className="group bg-white rounded-3xl p-8 border border-emerald-50 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer relative overflow-hidden"
                      id="shortcut-muallaf-box"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-bl-full group-hover:bg-sky-100 transition-colors -z-1" />
                      
                      <div className="w-14 h-14 bg-sky-50 group-hover:bg-emerald-700 text-sky-700 rounded-2xl flex items-center justify-center transition-all shadow-xxs">
                        <Globe className="h-7 w-7 group-hover:text-white" />
                      </div>
                      
                      <h4 className="text-xl font-bold font-display text-slate-900 mt-6 group-hover:text-emerald-800 transition-colors">
                        🕌 MUALLAF CENTER
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        Bimbingan ikrar muallaf, penerbitan sertifikat pemeluk agama islam resmi, pembinaan akidah berkelanjutan, konseling keagamaan, dan konsultasi.
                      </p>
                      
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-sky-700 mt-6 group-hover:translate-x-1.5 transition-transform">
                        <span>Pendaftaran Muallaf</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* STATISTIK SECTION */}
              <section className="bg-emerald-950 py-16 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_40%)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div className="p-4" id="stat-nikah">
                      <p className="text-4xl sm:text-5xl font-extrabold font-display text-emerald-400">987+</p>
                      <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider mt-2">Pernikahan Tercatat</p>
                    </div>
                    <div className="p-4" id="stat-wakaf">
                      <p className="text-4xl sm:text-5xl font-extrabold font-display text-emerald-400">120+</p>
                      <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider mt-2">Hektar Tanah Wakaf</p>
                    </div>
                    <div className="p-4" id="stat-muallaf">
                      <p className="text-4xl sm:text-5xl font-extrabold font-display text-emerald-400">45+</p>
                      <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider mt-2">Binaan Muallaf</p>
                    </div>
                    <div className="p-4" id="stat-layanan">
                      <p className="text-4xl sm:text-5xl font-extrabold font-display text-emerald-400">100%</p>
                      <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider mt-2">Pelayanan KUA Digital</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* QUICK LATEST ANNOUNCEMENT SECTION */}
              <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/60 px-3 py-10 rounded-full">
                        Informasi Penting
                      </span>
                      <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-2.5">
                        Pengumuman Kantor Urusan Agama
                      </h3>
                      <p className="text-sm text-slate-500 mt-2">
                        Dapatkan maklumat, jadwal bimbingan bimwin, pengumuman Idul Fitri, dan ketentuan administrasi terbaru.
                      </p>
                    </div>
                    <button 
                      onClick={() => setCurrentTab("pengumuman")}
                      className="mt-4 md:mt-0 flex items-center space-x-1 text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
                    >
                      <span>Lihat Semua Pengumuman</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {db?.pengumuman.slice(0, 2).map((item) => (
                      <div 
                        key={item.id} 
                        className="p-6 bg-slate-50 border border-emerald-50/50 rounded-2xl hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-100/50 px-2.5 py-1 rounded-md">
                            UMUM
                          </span>
                          <span className="text-xs text-slate-400 flex items-center space-x-1 font-mono">
                            <Clock className="h-3 w-3" />
                            <span>{item.date}</span>
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* TAB 2: PROFIL */}
          {currentTab === "profil" && (
            <motion.div
              key="profil"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            >
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/50 px-3 py-1 rounded-full">
                  Mengenal Kami
                </span>
                <h2 className="text-4xl font-extrabold font-display text-emerald-950 mt-2">
                  Profil KUA Pulau Dullah Utara
                </h2>
                <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                  Melayani Administrasi Nikah, Pencatatan Rujuk, Wakaf Tanah, Pembinaan Kerukunan Umat Beragama di wilayah hukum Kecamatan Pulau Dullah Utara, Kota Tual.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
                <div className="lg:col-span-5 relative">
                  <div className="absolute inset-0 bg-emerald-100 rounded-3xl -rotate-3 transform -z-10 scale-95" />
                  <div className="bg-emerald-900 rounded-3xl p-8 text-white relative shadow-xl overflow-hidden min-h-[350px] flex flex-col justify-end">
                    <div className="absolute top-6 left-6 text-emerald-300">
                      <Sparkles className="h-8 w-8 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold font-display">Kepala Kantor KUA</h4>
                      <p className="text-xs text-emerald-300 mt-1 uppercase font-semibold tracking-wider">Kecamatan Pulau Dullah Utara</p>
                      <hr className="border-emerald-700 my-4" />
                      <p className="text-sm text-slate-200 italic leading-relaxed">
                        "Pelayanan digital modern ini diluncurkan untuk mempermudah, mempercepat, dan menjamin keterbukaan urusan dokumen keagamaan bagi seluruh ummat di Pulau Dullah Utara."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 font-display">Tugas & Fungsi Kantor Urusan Agama</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Berdasarkan Peraturan Menteri Agama Republik Indonesia, Kantor Urusan Agama Kecamatan bertugas melaksanakan tugas umum pemerintahan tertentu di bidang pelayanan hukum Islam dan urusan keagamaan Islam di tingkat kecamatan.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-xxs">
                      <h5 className="font-bold text-emerald-900 mb-1 flex items-center space-x-1.5">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                        <span>Pelayanan Nikah & Rujuk</span>
                      </h5>
                      <p className="text-xs text-slate-500 leading-relaxed">Mulai dari pendaftaran, koreksi, pemeriksanaan saksi & berkas, pelaksanaan akad nikah hingga penyerahan buku nikah resmi.</p>
                    </div>

                    <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-xxs">
                      <h5 className="font-bold text-emerald-900 mb-1 flex items-center space-x-1.5">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                        <span>Sertifikasi Kemaslahatan Wakaf</span>
                      </h5>
                      <p className="text-xs text-slate-500 leading-relaxed">Melakukan pendataan saksi, menyelenggarakan majelis ikrar wakaf, menyusun AIW, dan integrasi pendaftaran digital SIWAK.</p>
                    </div>

                    <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-xxs">
                      <h5 className="font-bold text-emerald-900 mb-1 flex items-center space-x-1.5">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                        <span>Muallaf Center</span>
                      </h5>
                      <p className="text-xs text-slate-500 leading-relaxed">Membimbing penyyahadatan secara verbal, membuat arsip konversi keyakinan, dan melakukan syiar bimbingan tarbiyah muallaf baru.</p>
                    </div>

                    <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-xxs">
                      <h5 className="font-bold text-emerald-900 mb-1 flex items-center space-x-1.5">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                        <span>Kemitraan & Syiar Islam</span>
                      </h5>
                      <p className="text-xs text-slate-500 leading-relaxed">Pembinaan produk jaminan halal, kemaslahatan masjid takmir, pembinaan hisab rukyat, serta bimbingan haji dan umrah.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visi & Misi Canvas */}
              <div className="bg-emerald-50/50 rounded-3xl p-8 sm:p-12 border border-emerald-100 shadow-xxs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-emerald-200">
                  <div className="md:pr-8">
                    <h4 className="text-2xl font-bold font-display text-emerald-900 mb-4 uppercase tracking-wider">Visi</h4>
                    <p className="text-sm text-slate-700 leading-relaxed font-semibold">
                      "Terwujudnya Masyarakat Pulau Dullah Utara yang Taat Beragama, Rukun, Cerdas, dan Sejahtera Lahir Batin dalam Pelayanan Publik yang Handal, Bersih, dan Berwibawa."
                    </p>
                  </div>
                  <div className="md:pl-8 pt-8 md:pt-0">
                    <h4 className="text-2xl font-bold font-display text-emerald-900 mb-4 uppercase tracking-wider">Misi</h4>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-start">
                        <span className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center font-mono text-xs font-bold mr-2 shrink-0 mt-0.5">1</span>
                        <span>Meningkatkan kualitas kerukunan dan pemahaman moderasi beragama bagi seluruh masyarakat kecamatan.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center font-mono text-xs font-bold mr-2 shrink-0 mt-0.5">2</span>
                        <span>Memberikan kemudahan pelayanan pencatatan nikah yang transparan, kredibel, akuntabel melalui instrumen IT mutakhir.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center font-mono text-xs font-bold mr-2 shrink-0 mt-0.5">3</span>
                        <span>Mengakselerasi legalitas serta ketertiban administrasi tanah wakaf demi keselamatan kemaslahatan aset umat Islam.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3, 4, 5: LAYANAN DIGITALS (NIKAH, WAKAF, MUALLAF) */}
          {["nikah", "wakaf", "muallaf"].includes(currentTab) && (
            <motion.div
              key={currentTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
              {/* Category Breadcrumbs & Title */}
              <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-2">
                    <span className="hover:underline cursor-pointer" onClick={() => setCurrentTab("beranda")}>Beranda</span>
                    <span>/</span>
                    <span className="font-semibold text-emerald-700 capitalize">Layanan {currentTab === "muallaf" ? "Muallaf" : currentTab}</span>
                  </div>
                  <h2 className="text-3xl font-extrabold font-display text-emerald-950 uppercase tracking-tight">
                    {currentTab === "nikah" && "💍 Layanan Nikah Terpadu"}
                    {currentTab === "wakaf" && "📜 Layanan Manajemen Wakaf"}
                    {currentTab === "muallaf" && "🕌 Muallaf Center Pulau Dullah Utara"}
                  </h2>
                </div>
                
                <button
                  onClick={() => setCurrentTab("beranda")}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1"
                >
                  <span>&larr; Kembali ke Beranda</span>
                </button>
              </div>

              {/* Dynamic Categories Services Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left side checklist / files & instructions */}
                <div className="lg:col-span-8 space-y-6">
                  {/* LAYANAN NIKAH TERPADU - CUSTOM CARS MODULE */}
                  {currentTab === "nikah" && (
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xxs">
                      <div className="text-center max-w-xl mx-auto mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                          Kanal Dokumen Utama Warga
                        </span>
                        <h3 className="text-xl font-extrabold font-display text-emerald-950 mt-1.5">
                          📂 Dokumen Persyaratan Nikah Terpadu
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Silakan klik poster atau gambar di bawah untuk memperbesar berkas pendaftaran nikah umum maupun berkas khusus secara presisi.
                        </p>
                      </div>

                      <div className="layanan-container">
                        {/* BERKAS UMUM */}
                        <div className="card-berkas">
                          <img
                            src={berkasUmum}
                            alt="Berkas Nikah Umum"
                            referrerPolicy="no-referrer"
                            onClick={() => setCustomModalImage(berkasUmum)}
                          />
                          <div className="judul-card">
                            Berkas Pendaftaran Nikah Umum
                          </div>
                        </div>

                        {/* BERKAS KHUSUS */}
                        <div className="card-berkas">
                          <img
                            src={berkasKhusus}
                            alt="Berkas Nikah Khusus"
                            referrerPolicy="no-referrer"
                            onClick={() => setCustomModalImage(berkasKhusus)}
                          />
                          <div className="judul-card">
                            Berkas Pendaftaran Nikah Khusus
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {currentLayanans.length === 0 ? (
                    <div className="p-8 border border-dashed border-slate-350 rounded-2xl text-center text-slate-400">
                      <AlertCircle className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                      <p className="text-sm">Belum ada item layanan terdaftar di kategori ini.</p>
                    </div>
                  ) : (
                    currentLayanans.map((serv) => {
                      const isInfo = serv.type === "info";
                      const isFlow = serv.type === "flow";

                      return (
                        <div 
                          key={serv.id}
                          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs hover:border-emerald-100 hover:shadow-md transition-all relative"
                        >
                          {/* Top row */}
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
                              {renderLayananIcon(serv.icon)}
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <span>{serv.title}</span>
                                {serv.type === "link" && <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-sm">WEBSITE</span>}
                                {serv.type === "youtube" && <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-sm">VIDEO TUTORIAL</span>}
                                {serv.type === "whatsapp" && <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-sm">WHATSAPP</span>}
                              </h4>
                              
                              {serv.description && (
                                <p className="text-xs text-slate-500 mt-1">{serv.description}</p>
                              )}

                              {/* Standard text elements for step documents */}
                              {isInfo && serv.content && (
                                <div className="mt-4 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                                    <Info className="h-3 w-3" /> berkas persyaratan yang wajib disediakan:
                                  </p>
                                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {serv.content.map((doc, idx) => (
                                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                                        <span>{doc}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Step Alurs */}
                              {isFlow && serv.content && (
                                <div className="mt-4 space-y-4 bg-emerald-50/20 p-5 rounded-xl border border-emerald-50">
                                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
                                    Tahapan alur proses registrasi:
                                  </p>
                                  <div className="relative pl-4 border-l-2 border-emerald-200 space-y-4">
                                    {serv.content.map((step, idx) => (
                                      <div key={idx} className="relative">
                                        <span className="absolute -left-[25px] top-0.5 w-4 h-4 rounded-full bg-white ring-2 ring-emerald-500 text-[10px] font-bold text-emerald-800 flex items-center justify-center font-mono">
                                          {idx + 1}
                                        </span>
                                        <p className="text-xs text-slate-700 font-medium">{step}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Dynamic Image Display if present */}
                              {serv.image && (
                                <div className="mt-4 relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 max-h-60 flex justify-center items-center">
                                  <img 
                                    src={serv.image} 
                                    alt={serv.title}
                                    className="object-contain max-h-60 w-full"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button 
                                      onClick={() => setActiveMediaPreview({ type: "image", url: serv.image!, title: serv.title })}
                                      className="px-4 py-2 bg-white text-emerald-950 font-bold text-xs rounded-xl flex items-center space-x-1 hover:bg-slate-100"
                                    >
                                      <Eye className="h-3.5 w-3.5" />
                                      <span>Perbesar Gambar</span>
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* Direct action buttons depends on properties */}
                              <div className="mt-4 flex flex-wrap gap-2">
                                {serv.type === "link" && serv.url && (
                                  <a
                                    href={serv.url}
                                    target="_blank"
                                    referrerPolicy="no-referrer"
                                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
                                  >
                                    <span>Buka Portal Pendaftaran</span>
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                )}

                                {serv.type === "youtube" && serv.url && (
                                  <button
                                    onClick={() => playYoutubeVideo(serv.url!, serv.title)}
                                    className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer"
                                  >
                                    <span>Nonton Video Alur</span>
                                    <Video className="h-3 w-3" />
                                  </button>
                                )}

                                {serv.type === "whatsapp" && serv.url && (
                                  <a
                                    href={`${serv.url}?text=Assalamu%27alaikum%20Admin%20KUA%20Pulau%20Dullah%20Utara.%20Mohon%20konsultasi%20layanan%20${currentTab}.`}
                                    target="_blank"
                                    referrerPolicy="no-referrer"
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5"
                                  >
                                    <MessageSquare className="h-3.5 w-3.5" />
                                    <span>Mulai Kirim WhatsApp</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}

                  {/* Standard bottom safety card */}
                  <div className="p-6 bg-emerald-900 rounded-3xl text-white relative overflow-hidden shadow-md">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-700/30 rounded-full blur-xl" />
                    <h5 className="font-bold font-display text-lg mb-1 uppercase tracking-wide">PENTING BAGI WARGA</h5>
                    <p className="text-xs text-emerald-100 font-normal leading-relaxed">
                      Segala pengurusan naskah, berkas dsb di Kantor KUA Pulau Dullah Utara **SAMA SEKALI TIDAK DIKENAKAN BIAYA (RP 0,-)** jika dilangsungkan di dalam kantor pada jam kerja operasional madani. Segera laporkan penyalahgunaan melalui link WhatsApp aduan kami.
                    </p>
                  </div>
                </div>

                {/* Right side contact information / sidebar widget instructions */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Category Fast Information Form */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs">
                    <h4 className="text-sm font-extrabold uppercase tracking-wide text-slate-400 mb-4">Layanan Cepat</h4>
                    <div className="space-y-4">
                      {currentTab === "nikah" && (
                        <>
                          <div className="space-y-2">
                            <p className="text-xs font-bold text-slate-700">Pendaftaran Nikah Cepat: </p>
                            <a
                              href="https://simkah4.kemenag.go.id"
                              target="_blank"
                              className="block p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-xl text-xs font-bold text-emerald-800 text-center"
                            >
                              🚀 Klik SIMKAH online4
                            </a>
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs font-bold text-slate-700">Kirim Berkas awal KUA: </p>
                            <a
                              href={defaultSettings.googleFormNikah}
                              target="_blank"
                              className="block p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 text-center"
                            >
                              📂 Isi Google Form Berkas
                            </a>
                          </div>
                        </>
                      )}

                      {currentTab === "wakaf" && (
                        <>
                          <div className="space-y-2">
                            <p className="text-xs font-bold text-slate-700">Portal Wakaf Nasional: </p>
                            <a
                              href="https://siwak.kemenag.go.id"
                              target="_blank"
                              className="block p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-xl text-xs font-bold text-emerald-800 text-center"
                            >
                              🌍 Daftar Online di SIWAK
                            </a>
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs font-bold text-slate-700">Konsultasi Syariah Wakaf: </p>
                            <a
                              href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                              target="_blank"
                              className="block p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center space-x-1"
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>Hubungi Adm. Wakaf (WA)</span>
                            </a>
                          </div>
                        </>
                      )}

                      {currentTab === "muallaf" && (
                        <>
                          <div className="space-y-2">
                            <p className="text-xs font-bold text-slate-700">Form Pendaftaran Calon Muallaf: </p>
                            <a
                              href={defaultSettings.googleFormMuallaf}
                              target="_blank"
                              className="block p-3 bg-sky-50 hover:bg-sky-100 border border-sky-150 rounded-xl text-xs font-bold text-sky-800 text-center"
                            >
                              ✏️ Google Form Pendaftaran
                            </a>
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs font-bold text-slate-700">Hubungi Ustadz Pembimbing: </p>
                            <a
                              href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                              target="_blank"
                              className="block p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center space-x-1"
                            >
                              <MessageSquare className="h-4 w-4 animate-bounce" />
                              <span>Bimbingan & Konseling</span>
                            </a>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Operation Hour Badge */}
                  <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl">
                    <h4 className="text-xs font-bold uppercase text-emerald-900 tracking-wider mb-2 flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Sesi Pelayanan Kantor</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 font-mono">
                      <li className="flex justify-between"><span>Senin - Kamis</span> <span className="font-bold">08:00 - 16:30 WIT</span></li>
                      <li className="flex justify-between"><span>Jumat</span> <span className="font-bold">08:30 - 17:00 WIT</span></li>
                      <li className="flex justify-between"><span>Sabtu - Minggu</span> <span className="text-red-500 font-bold">Tutup</span></li>
                    </ul>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 6: PENGUMUMAN COMPLETE */}
          {currentTab === "pengumuman" && (
            <motion.div
              key="pengumuman"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/50 px-3 py-1 rounded-full">
                  Papan Informasi
                </span>
                <h2 className="text-3xl font-extrabold font-display text-emerald-950 mt-2">
                  Pengumuman Resmi KUA Pulau Dullah Utara
                </h2>
                <p className="text-sm text-slate-500 mt-2">
                  Temukan maklumat publikasi terbaru, perubahan struktur kepemimpinan, juknis bimbingan, dsb.
                </p>
                
                {/* Search Bar input */}
                <div className="mt-8 max-w-md mx-auto relative">
                  <input
                    type="text"
                    placeholder="Cari judul atau isi pengumuman..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-emerald-100 rounded-2xl text-xs font-bold shadow-xxs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Dynamic Search result filtered list */}
              <div className="space-y-6 max-w-4xl mx-auto">
                {db?.pengumuman
                  .filter((p) => 
                    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    p.content.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((ann) => (
                    <div 
                      key={ann.id} 
                      className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-emerald-100 shadow-xxs transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs text-slate-400 font-mono">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-emerald-600" />
                          <span>Tanggal rilis: {ann.date}</span>
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-bold rounded-sm uppercase text-[9px]">
                          AKTIF
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">{ann.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{ann.content}</p>
                    </div>
                  ))}

                {(db?.pengumuman || []).filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                  <div className="text-center p-12 text-slate-400">
                    <p>Tidak ditemukan pengumuman yang sesuai kunci pencarian.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 7: KONTAK */}
          {currentTab === "kontak" && (
            <motion.div
              key="kontak"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/50 px-3 py-1 rounded-full">
                  Hubungi Kami
                </span>
                <h2 className="text-3xl font-extrabold font-display text-emerald-950 mt-2">
                  Kontak & Lokasi Kantor
                </h2>
                <p className="text-sm text-slate-500 mt-2">
                  Silakan sampaikan pertanyaan, koordinasi lokasi safari dakwah atau keluhan kepada kami lewat data di bawah.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form to Submit Questions to WhatsApp */}
                <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-100 shadow-xs">
                  <h3 className="text-xl font-bold font-display text-emerald-950 mb-4 uppercase tracking-tight">Kirim Pesan Langsung</h3>
                  <p className="text-xs text-slate-500 mb-6">Pesan Anda akan otomatis diposisikan dalam format ramah WhatsApp dan siap dikirim ke administrator KUA.</p>
                  
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Lengkap Pengirim</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Muhammad Yusuf"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Perihal Layanan / Subjek</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Jadwal bimbingan nikah atau Konsultasi Wakaf"
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Isi Pesan Pertanyaan Anda</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tulis detail aduan atau pertanyaan warga di sini..."
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Kirim via WhatsApp</span>
                    </button>
                  </form>
                </div>

                {/* Map Directions & Contact info in nice card list */}
                <div className="lg:col-span-6 space-y-6">
                  
                  {/* Detailed Interactive contacts card */}
                  <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs space-y-4">
                    <h3 className="text-xl font-bold font-display text-emerald-950 mb-2 uppercase tracking-tight">Kanal Resmi Kantor</h3>
                    
                    <div className="flex items-start space-x-3.5">
                      <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">Alamat Kantor Fisik</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{defaultSettings.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="p-2.5 bg-emerald-25 text-emerald-700 rounded-lg">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">Surat Elektronik Resmi (Email)</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 font-mono">{defaultSettings.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">Telepon Hubungan Pengurus</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 font-mono">{defaultSettings.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Standard Map Directions Map Frame */}
                  <div className="bg-white rounded-3xl p-3 border border-slate-150 overflow-hidden shadow-xs h-[250px] relative">
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white p-3 text-[11px] z-10 font-bold flex justify-between items-center">
                      <span>Peta Administratif Pulau Dullah Utara, Kota Tual</span>
                      <a 
                        href={`https://maps.google.com/?q=${encodeURIComponent(defaultSettings.address)}`} 
                        target="_blank" 
                        className="underline"
                      >
                        Buka Google Maps
                      </a>
                    </div>
                    {/* A nice embed map representing Kota Tual context */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127129.56936357917!2d132.70992389146146!3d-5.6025134764831205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d30230f8df73617%3A0xe5a36ebd7e6005c0!2sKabupaten%20Maluku%20Tenggara%2C%20Maluku!5e0!3m2!1sid!2sid!4v1716167192800"
                      width="100%"
                      height="100%"
                      style={{ border: 0, borderRadius: "20px" }}
                      allowFullScreen={true}
                      loading="lazy"
                    ></iframe>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 8: ADMIN AREA (DASHBOARD) */}
          {currentTab === "admin" && isAdminLoggedIn && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
              
              {/* Dashboard header stats */}
              <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold font-display text-emerald-950 uppercase tracking-tight flex items-center gap-1">
                    <Shield className="h-8 w-8 text-emerald-700" />
                    <span>Panel Administrasi KUA</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Konfigurasi data layanan online, berkas persyaratan, kelola youtube tutorial dan pengumuman.</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Keluar Sesi</span>
                  </button>
                </div>
              </div>

              {/* Admin Mode Sub-nav tabs */}
              <div className="flex border-b border-emerald-100 mb-8" id="admin-sub-tabs">
                <button
                  onClick={() => { setAdminActiveTab("layanan"); setEditingLayanan(null); }}
                  className={`px-6 py-3 font-semibold text-xs tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                    adminActiveTab === "layanan"
                      ? "border-emerald-700 text-emerald-800 font-extrabold"
                      : "border-transparent text-slate-500 hover:text-emerald-700"
                  }`}
                >
                  Kelola Layanan
                </button>
                <button
                  onClick={() => setAdminActiveTab("pengumuman")}
                  className={`px-6 py-3 font-semibold text-xs tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                    adminActiveTab === "pengumuman"
                      ? "border-emerald-700 text-emerald-800 font-extrabold"
                      : "border-transparent text-slate-500 hover:text-emerald-700"
                  }`}
                >
                  Kelola Pengumuman
                </button>
                <button
                  onClick={() => setAdminActiveTab("settings")}
                  className={`px-6 py-3 font-semibold text-xs tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                    adminActiveTab === "settings"
                      ? "border-emerald-700 text-emerald-800 font-extrabold"
                      : "border-transparent text-slate-500 hover:text-emerald-700"
                  }`}
                >
                  Pengaturan Umum Website
                </button>
              </div>

              {/* VIEW 1: KELOLA LAYANAN */}
              {adminActiveTab === "layanan" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Form Create / Edit Layanan */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-emerald-50 shadow-xxs">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-emerald-800 mb-4 flex items-center justify-between">
                      <span>{editingLayanan?.id ? "Edit Item Layanan" : "Tambah Item Layanan"}</span>
                      {editingLayanan && (
                        <button 
                          onClick={() => { setEditingLayanan(null); setLayananFormContentInput(""); }}
                          className="text-[10px] bg-slate-100 hover:bg-slate-205 text-slate-600 font-bold p-1 px-2 rounded-md"
                        >
                          Batal
                        </button>
                      )}
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Judul Layanan</label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Berkas Pas foto Nikah"
                          value={editingLayanan?.title || ""}
                          onChange={(e) => setEditingLayanan({ ...editingLayanan, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Kategori</label>
                          <select
                            value={editingLayanan?.category || "nikah"}
                            onChange={(e) => setEditingLayanan({ ...editingLayanan, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          >
                            <option value="nikah">💍 Nikah</option>
                            <option value="wakaf">📜 Wakaf</option>
                            <option value="muallaf">🕌 Muallaf</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Tipe Aksi / Rendering</label>
                          <select
                            value={editingLayanan?.type || "info"}
                            onChange={(e) => setEditingLayanan({ ...editingLayanan, type: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          >
                            <option value="info">Info / Persyaratan Dokumen</option>
                            <option value="flow">Alur Tahapan Registrasi</option>
                            <option value="link">Tautan Eksternal (Website)</option>
                            <option value="whatsapp">Chat WhatsApp Admin</option>
                            <option value="youtube">Embedded Video (YouTube)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Pilih Icon Tampilan</label>
                        <select
                          value={editingLayanan?.icon || "file-text"}
                          onChange={(e) => setEditingLayanan({ ...editingLayanan, icon: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        >
                          <option value="file-text">Memo / Lembar Dokumen</option>
                          <option value="git-commit">Alur / Rantai Alur</option>
                          <option value="globe">Globe / Link Website</option>
                          <option value="edit-3">Formulir / Pensil</option>
                          <option value="message-circle">Chat WA</option>
                          <option value="youtube">Video YouTube</option>
                          <option value="send">Kirim Rekomendasi/Direct</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Tautan URL (SIMKAH/SIWAK/YT/Google Form)</label>
                        <input
                          type="text"
                          placeholder="https://..."
                          value={editingLayanan?.url || ""}
                          onChange={(e) => setEditingLayanan({ ...editingLayanan, url: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Deskripsi Ringkas</label>
                        <textarea
                          rows={2}
                          placeholder="Keterangan singkat tentang relevansi item layanan ini..."
                          value={editingLayanan?.description || ""}
                          onChange={(e) => setEditingLayanan({ ...editingLayanan, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Dokumen / Alur (Satu baris per entri, pisah dengan ENTER)
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Contoh:&#10;KTP Suami&#10;Surat Rekomendasi RT&#10;Melunasi Adm Kantor"
                          value={layananFormContentInput}
                          onChange={(e) => setLayananFormContentInput(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none font-mono text-[11px]"
                        />
                      </div>

                      {/* Image uploader file area */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Visual Poster / Alur (Format .JPG maks 3MB)</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="file"
                            accept="image/jpeg, image/png, image/jpg"
                            onChange={(e) => handleImageUpload(e, "layanan", (url) => {
                              setEditingLayanan({ ...editingLayanan, image: url });
                            })}
                            className="block w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                          />
                        </div>
                        {editingLayanan?.image && (
                          <div className="mt-2 text-[11px] text-green-700 bg-green-50 p-2 rounded-lg flex items-center justify-between">
                            <span className="truncate">Telah terpilih: {editingLayanan.image}</span>
                            <button 
                              onClick={() => setEditingLayanan({ ...editingLayanan, image: "" })}
                              className="text-red-600 font-bold hover:underline"
                            >
                              Hapus
                            </button>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={saveLayanan}
                        disabled={isSubmitting}
                        className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-350 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <Save className="h-4 w-4" />
                        <span>{isSubmitting ? "Menyimpan perubahan..." : "Simpan Layanan"}</span>
                      </button>
                    </div>

                  </div>

                  {/* List of Registered Layanan */}
                  <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-100 shadow-xxs">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-4">
                      Daftar Layanan Digital Tersimpan (Total: {db?.layanan.length || 0})
                    </h3>

                    <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
                      {db?.layanan.map((serv) => (
                        <div 
                          key={serv.id}
                          className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between gap-4"
                        >
                          <div className="truncate">
                            <div className="flex items-center space-x-1.5">
                              <span className="text-xs font-bold text-slate-900 truncate">{serv.title}</span>
                              <span className="text-[9px] uppercase font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-sm shrink-0">
                                {serv.category}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 truncate mt-0.5">Tipe-Aksi: <span className="font-mono text-emerald-700">{serv.type}</span> {serv.url ? `| URL: ${serv.url}` : ""}</p>
                          </div>

                          <div className="flex items-center space-x-1 shrink-0">
                            <button
                              onClick={() => {
                                setEditingLayanan(serv);
                                setLayananFormContentInput(serv.content ? serv.content.join("\n") : "");
                              }}
                              className="p-1.5 hover:bg-emerald-50 text-emerald-700 rounded-lg transition-colors cursor-pointer"
                              title="Edit Layanan"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteLayanan(serv.id)}
                              className="p-1.5 hover:bg-rose-50 text-rose-700 rounded-lg transition-colors cursor-pointer"
                              title="Hapus Layanan"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>
              )}

              {/* VIEW 2: KELOLA PENGUMUMAN */}
              {adminActiveTab === "pengumuman" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Create Announcement Form */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-emerald-50 shadow-xxs">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-emerald-800 mb-4">
                      Tulis Pengumuman Baru
                    </h3>

                    <form onSubmit={savePengumuman} className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Judul Pengumuman</label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Penutupan Layanan Selama Libur Idul Fitri"
                          value={newPengumumanTitle}
                          onChange={(e) => setNewPengumumanTitle(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Status Keaktifan</label>
                        <select
                          value={newPengumumanStatus}
                          onChange={(e) => setNewPengumumanStatus(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        >
                          <option value="aktif">Aktif / Publikasikan Sekarang</option>
                          <option value="arsip">Arsip / Simpan Draft</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Isi Detail Informasi Maklumat</label>
                        <textarea
                          rows={6}
                          required
                          placeholder="Tulis maklumat pengumuman selengkapnya di sini untuk warga..."
                          value={newPengumumanContent}
                          onChange={(e) => setNewPengumumanContent(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>{isSubmitting ? "Menyimpan data..." : "Publikasikan Pengumuman"}</span>
                      </button>
                    </form>
                  </div>

                  {/* Registered List */}
                  <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-100 shadow-xxs">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-4">
                      Daftar Pengumuman Aktif
                    </h3>

                    <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
                      {db?.pengumuman.map((item) => (
                        <div 
                          key={item.id}
                          className="p-5 bg-slate-50 border border-slate-100 rounded-2xl relative"
                        >
                          <button
                            onClick={() => deletePengumuman(item.id)}
                            className="absolute top-4 right-4 p-1 hover:bg-rose-50 text-rose-700 rounded-md transition-all cursor-pointer"
                            title="Hapus Pengumuman"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono mb-2">
                            <span>{item.date}</span>
                            <span>•</span>
                            <span className="text-emerald-700 font-extrabold tracking-wider uppercase">{item.status}</span>
                          </div>

                          <h4 className="text-sm font-bold text-slate-900 pr-8">{item.title}</h4>
                          <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* VIEW 3: KONFIGURASI TAUTAN & TEKS */}
              {adminActiveTab === "settings" && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-50 shadow-xxs max-w-4xl mx-auto">
                  <h3 className="text-sm font-extrabold uppercase tracking-widest text-emerald-800 mb-6 pb-2 border-b border-slate-100">
                    Konfigurasi Tautan, Form & Personalisasi Banner KUA
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-extrabold uppercase text-emerald-950 mb-3 tracking-wider">Tautan Google Form</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Form Pengajuan Berkas Nikah</label>
                          <input
                            type="text"
                            placeholder="https://forms.gle/..."
                            value={settingsForm.googleFormNikah || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, googleFormNikah: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Form Pendaftaran Calon Muallaf</label>
                          <input
                            type="text"
                            placeholder="https://forms.gle/..."
                            value={settingsForm.googleFormMuallaf || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, googleFormMuallaf: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Form Rekomendasi Nikah Luar Daerah</label>
                          <input
                            type="text"
                            placeholder="https://forms.gle/..."
                            value={settingsForm.googleFormRekomendasi || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, googleFormRekomendasi: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-extrabold uppercase text-emerald-950 mb-3 tracking-wider">Integrasi Chat WhatsApp & YouTube</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">No. WhatsApp Admin (Gunakan Kode Negara: 62812...)</label>
                          <input
                            type="text"
                            placeholder="6281240912842"
                            value={settingsForm.whatsappNumber || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Default No. Telp Umum Kantor</label>
                          <input
                            type="text"
                            placeholder="+62 812 4091 2842"
                            value={settingsForm.phone || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Alamat Email KUA Resmi</label>
                          <input
                            type="email"
                            placeholder="kuadullahutara01@gmail.com"
                            value={settingsForm.email || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100 my-6" />

                  {/* Banner config */}
                  <div className="space-y-4 mb-6">
                    <h4 className="text-xs font-extrabold uppercase text-emerald-950 tracking-wider">Personalisasi Teks Landing</h4>
                    
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Judul Banner Utama (Hero)</label>
                      <input
                        type="text"
                        placeholder="KUA KECAMATAN PULAU DULLAH UTARA"
                        value={settingsForm.bannerTitle || ""}
                        onChange={(e) => setSettingsForm({ ...settingsForm, bannerTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Subtitle Penjelasan Pelayanan Digital</label>
                      <textarea
                        rows={2}
                        placeholder="..."
                        value={settingsForm.bannerSubtitle || ""}
                        onChange={(e) => setSettingsForm({ ...settingsForm, bannerSubtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Alamat Kantor Fisik Lengkap</label>
                      <input
                        type="text"
                        placeholder="Jl. Pemuda No. 12..."
                        value={settingsForm.address || ""}
                        onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={saveSettings}
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-350 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>{isSubmitting ? "Menyimpan konfigurasi..." : "Terapkan Perubahan Website"}</span>
                  </button>
                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER AREA */}
      <footer className="bg-slate-900 text-white pt-16 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent_40%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Identity element */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-emerald-700 rounded-xl">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-display uppercase tracking-widest text-emerald-300">
                    KUA PULAU DULLAH UTARA
                  </h4>
                  <p className="text-[10px] text-emerald-600 font-extrabold tracking-wider uppercase">
                    Kementerian Agama Republik Indonesia
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Portal Pelayanan Terpadu Digital Mandiri Kecamatan Pulau Dullah Utara, Kota Tual. Nikah, Wakaf dan Konseling Muallaf Center berbasis keterbukaan teknologi publik.
              </p>
            </div>

            {/* Quick map links */}
            <div>
              <h5 className="font-bold font-display text-emerald-300 text-xs font-mono uppercase tracking-widest mb-4">Layanan Cepat</h5>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => setCurrentTab("nikah")} className="hover:text-emerald-300">💍 Layanan Nikah Online</button></li>
                <li><button onClick={() => setCurrentTab("wakaf")} className="hover:text-emerald-300">📜 Sertifikasi Tanah Wakaf</button></li>
                <li><button onClick={() => setCurrentTab("muallaf")} className="hover:text-emerald-300">🕌 Persyaratan Ikrar Muallaf</button></li>
                <li><button onClick={() => setCurrentTab("pengumuman")} className="hover:text-emerald-300">📢 Papan Maklumat Umum</button></li>
              </ul>
            </div>

            {/* Contact details */}
            <div>
              <h5 className="font-bold font-display text-emerald-300 text-xs font-mono uppercase tracking-widest mb-4">Pelayanan Kantor</h5>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                {defaultSettings.address}<br />
                Email: {defaultSettings.email}<br />
                Telp: {defaultSettings.phone}
              </p>
            </div>

          </div>

          <hr className="border-slate-800 my-8" />

          {/* Copyright claims */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Kantor Urusan Agama Kecamatan Pulau Dullah Utara. Hak Cipta Dilindungi Undang-Undang.</p>
            <p>Diregistrasi Resmi Kemenag RI • Kota Tual, Maluku.</p>
          </div>

        </div>
      </footer>

      {/* SLEEK BOTTOM STATUS BAR */}
      <div className="fixed bottom-0 inset-x-0 h-12 bg-slate-950 flex items-center px-4 sm:px-10 justify-between text-slate-400 text-[11px] sm:text-xs z-40 border-t border-slate-900">
        <div className="flex items-center gap-6 overflow-hidden w-full">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping shrink-0" />
            <span>KUA Server Status: <span className="text-white font-semibold">Online</span></span>
          </div>
          <div className="w-[1px] h-4 bg-slate-800 shrink-0 hidden sm:block" />
          <div className="overflow-hidden relative w-full hidden sm:block">
            <div className="animate-marquee whitespace-nowrap text-slate-300 flex items-center space-x-1 font-mono">
              <Calendar className="h-4 w-4 text-emerald-500 shrink-0 mr-1.5" />
              <span>Bimbingan Perkawinan (Bimwin) GRATIS Gelombang II diselenggarakan tiap hari Rabu pukul 09:00 WIT di aula serbaguna KUA. Hubungi petugas via WhatsApp.</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0 font-mono text-[10px] opacity-60">
          <span>v1.0.6-LIVE</span>
        </div>
      </div>

      {/* FLOATING WHATSAPP CTA ELEMENT WITH DESCRIPTIVE BANNER */}
      <a
        href={`https://wa.me/${defaultSettings.whatsappNumber}?text=${encodeURIComponent(defaultSettings.whatsappText)}`}
        target="_blank"
        referrerPolicy="no-referrer"
        className="fixed bottom-16 right-6 sm:right-10 flex items-center gap-3 z-40 group animate-bounce hover:animate-none cursor-pointer"
        id="floating-whatsapp-widget"
      >
        <div className="bg-white px-3 py-2 rounded-xl shadow-lg border border-slate-100 text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
          Butuh Pelayanan Cepat? Chat Adm KUA Pulau Dullah Utara
        </div>
        <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-lg shadow-green-200/50 hover:scale-105 active:scale-95 transition-transform" id="floating-whatsapp-button">
          {/* Custom SVG logo representing WhatsApp */}
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </div>
      </a>

      {/* LOGIN MODAL POPUP */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full border border-emerald-50 shadow-2xl relative"
            >
              <button
                onClick={() => { setShowLoginModal(false); setLoginError(""); }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center mb-6">
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl inline-block mb-3">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900">Login Administrator</h3>
                <p className="text-xs text-slate-400 mt-1">Gunakan kredensial admin KUA untuk mengelola data website digital.</p>
              </div>

              {loginError && (
                <div className="mb-4 p-3 bg-rose-50 text-rose-800 text-xs rounded-xl flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4 text-rose-600 mr-1 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Pengguna (Username)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400"><User className="h-4 w-4" /></span>
                    <input
                      type="text"
                      required
                      placeholder="admin"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi (Password)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400"><Lock className="h-4 w-4" /></span>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer"
                  >
                    Masuk ke Dashboard
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MEDIA PREVIEW MODAL */}
      <AnimatePresence>
        {activeMediaPreview && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full border border-slate-100 shadow-2xl relative"
            >
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <span className="text-xs font-extrabold text-emerald-850 truncate pr-4">{activeMediaPreview.title}</span>
                <button
                  onClick={() => setActiveMediaPreview(null)}
                  className="p-1 hover:bg-slate-200 rounded-md text-slate-500 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-2 bg-slate-950 aspect-video flex items-center justify-center">
                {activeMediaPreview.type === "youtube" ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={activeMediaPreview.url}
                    title={activeMediaPreview.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="aspect-video"
                  ></iframe>
                ) : (
                  <img
                    src={activeMediaPreview.url}
                    alt={activeMediaPreview.title}
                    className="max-h-[70vh] object-contain"
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================
         CUSTOM SPECIFIC MODAL POPUP
      ========================= */}
      {customModalImage && (
        <div 
          id="imageModal" 
          className="modal" 
          style={{ display: "flex" }}
          onClick={(e) => {
            // Tutup saat klik background
            if (e.target === e.currentTarget) {
              setCustomModalImage(null);
            }
          }}
        >
          <span className="close" onClick={() => setCustomModalImage(null)}>
            &times;
          </span>
          <img 
            className="modal-content" 
            id="modalImage" 
            src={customModalImage} 
            alt="Pratinjau Berkas"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

    </div>
  );
}
