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
  Download,
  Clock, 
  Shield, 
  User, 
  Users,
  ClipboardList,
  Printer,
  PenTool,
  Lock, 
  Settings as SettingsIcon, 
  LogOut, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  Maximize2,
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
  Calendar,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Music
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
// @ts-ignore
import html2pdf from "html2pdf.js";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { SignaturePad } from "./components/SignaturePad";
import { Layanan, Pengumuman, Settings, DBState } from "./types";
import berkasUmum from "./assets/images/berkas_umum_1779246456217.png";
import berkasKhusus from "./assets/images/berkas_khusus_1779246479558.png";
import kepalaKuaPlaceholder from "./assets/images/kepala_kua_1779336160767.png";
import statistikKuaPlaceholder from "./assets/images/statistik_kua_1779338497688.png";
import penyuluhPria1 from "./assets/images/penyuluh_pria_1_1779371506296.png";
import penyuluhWanita1 from "./assets/images/penyuluh_wanita_1_1779371527770.png";
import penyuluhPria2 from "./assets/images/penyuluh_pria_2_1779371547245.png";
import penyuluhWanita2 from "./assets/images/penyuluh_wanita_2_1779371567528.png";
import penyuluhPria3 from "./assets/images/penyuluh_pria_3_1779372465474.png";
import penyuluhWanita3 from "./assets/images/penyuluh_wanita_3_1779372486923.png";
import penyuluhWanita4 from "./assets/images/penyuluh_wanita_4_1779372505456.png";

export const PENYULUH_AGAMA_LIST = [
  {
    id: "p1",
    name: "H. Kamaruddin, SH",
    role: "Penyuluh Agama Islam",
    gender: "male",
    phone: "6281240912842",
    photo: "/uploads/penyuluh_pria_1_1779371506296.png",
    fallbackPhoto: penyuluhPria1
  },
  {
    id: "p2",
    name: "Khadijah Al-Munawwarah, M.Ag",
    role: "Penyuluh Agama Islam",
    gender: "female",
    phone: "6281240912842",
    photo: "/uploads/penyuluh_wanita_1_1779371527770.png",
    fallbackPhoto: penyuluhWanita1
  },
  {
    id: "p3",
    name: "Ustadz H. Abdullah, Lc",
    role: "Penyuluh Agama Islam",
    gender: "male",
    phone: "6281240912842",
    photo: "/uploads/penyuluh_pria_3_1779372465474.png",
    fallbackPhoto: penyuluhPria3
  },
  {
    id: "p4",
    name: "Siti Rahmawati, S.Sos",
    role: "Penyuluh Agama Islam",
    gender: "female",
    phone: "6281240912842",
    photo: "/uploads/penyuluh_wanita_3_1779372486923.png",
    fallbackPhoto: penyuluhWanita3
  },
  {
    id: "p5",
    name: "Ahmad Fauzan, S.Pd.I",
    role: "Penyuluh Agama Islam",
    gender: "male",
    phone: "6281240912842",
    photo: "/uploads/penyuluh_pria_2_1779371547245.png",
    fallbackPhoto: penyuluhPria2
  },
  {
    id: "p6",
    name: "Dr. Maryam Shofia, S.Th.I",
    role: "Penyuluh Agama Islam",
    gender: "female",
    phone: "6281240912842",
    photo: "/uploads/penyuluh_wanita_2_1779371567528.png",
    fallbackPhoto: penyuluhWanita2
  },
  {
    id: "p7",
    name: "Aisyah Humaira, S.Th.I",
    role: "Penyuluh Agama Islam",
    gender: "female",
    phone: "6281240912842",
    photo: "/uploads/penyuluh_wanita_4_1779372505456.png",
    fallbackPhoto: penyuluhWanita4
  }
];

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

  const openModal = (url: string) => {
    setCustomModalImage(url);
  };

  // Form states for Admin actions
  const [adminActiveTab, setAdminActiveTab] = useState<"layanan" | "pengumuman" | "settings" | "penyuluh">("layanan");
  
  // State for Penyuluh editing
  const [editingPenyuluh, setEditingPenyuluh] = useState<any | null>(null);
  const [editingPenyuluhName, setEditingPenyuluhName] = useState("");
  const [editingPenyuluhPhone, setEditingPenyuluhPhone] = useState("");
  const [editingPenyuluhPhoto, setEditingPenyuluhPhoto] = useState("");
  const [isSubmittingPenyuluh, setIsSubmittingPenyuluh] = useState(false);
  
  // Layanan form
  const [editingLayanan, setEditingLayanan] = useState<Partial<Layanan> | null>(null);
  const [layananFormContentInput, setLayananFormContentInput] = useState<string>("");

  // Pengumuman form
  const [newPengumumanTitle, setNewPengumumanTitle] = useState("");
  const [newPengumumanContent, setNewPengumumanContent] = useState("");
  const [newPengumumanStatus, setNewPengumumanStatus] = useState("aktif");

  // Settings form
  const [settingsForm, setSettingsForm] = useState<Partial<Settings>>({});

  // Active Nikah Slide Carousel
  const [activeNikahSlide, setActiveNikahSlide] = useState(0);

  // Delete confirmation dialog state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    type: "layanan" | "pengumuman";
    title: string;
  } | null>(null);

  // Loading indicator
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Citizen Contact Form State (for WhatsApp forwarding)
  const [contactName, setContactName] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Penyuluh Agama Custom Consultation Form State
  const [penyuluhSenderName, setPenyuluhSenderName] = useState("");
  const [penyuluhSenderWa, setPenyuluhSenderWa] = useState("");
  const [penyuluhSelectedId, setPenyuluhSelectedId] = useState("");
  const [penyuluhTopic, setPenyuluhTopic] = useState("Bimbingan Perkawinan");
  const [penyuluhQuery, setPenyuluhQuery] = useState("");
  const [penyuluhSubmitted, setPenyuluhSubmitted] = useState(false);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [selectedPhotoViewer, setSelectedPhotoViewer] = useState<any | null>(null);

  // States for Kuesioner Evaluasi Layanan Pembinaan (Kemenag PDF Format)
  const [showEvaluasiModal, setShowEvaluasiModal] = useState(false);
  const [evaluasiTahun, setEvaluasiTahun] = useState("2025");
  const [evaluasiCatinPria, setEvaluasiCatinPria] = useState("RAHMANI");
  const [evaluasiCatinWanita, setEvaluasiCatinWanita] = useState("SIFA AZAHRA TEMARWUT");
  const [evaluasiHariTanggal, setEvaluasiHariTanggal] = useState("Selasa, 10 Februari Tahun 2026");
  const [evaluasiCatinPhone, setEvaluasiCatinPhone] = useState("081240912842");
  const [evaluasiKegiatan, setEvaluasiKegiatan] = useState("Bimbingan Perkawinan");
  const [evaluasiTema, setEvaluasiTema] = useState("Psikologi Keluarga");
  
  // Digital / manual signature states for Evaluasi Form
  const [evaluasiSigPria, setEvaluasiSigPria] = useState<string>("");
  const [evaluasiSigWanita, setEvaluasiSigWanita] = useState<string>("");
  const [evaluasiSigPenyuluh, setEvaluasiSigPenyuluh] = useState<string>("");
  
  // Identitas Penyuluh Agama
  const [evaluasiPenyuluhId, setEvaluasiPenyuluhId] = useState("");
  const [evaluasiPenyuluhName, setEvaluasiPenyuluhName] = useState("Dodi, S.HI");
  const [evaluasiPenyuluhNip, setEvaluasiPenyuluhNip] = useState("198501272025211002");
  const [evaluasiPenyuluhPangkat, setEvaluasiPenyuluhPangkat] = useState("IX");
  const [evaluasiPenyuluhJabatan, setEvaluasiPenyuluhJabatan] = useState("Penyuluh Agama Islam");
  const [evaluasiPenyuluhTempatTugas, setEvaluasiPenyuluhTempatTugas] = useState("Kantor Kementerian Agama Kota Tual");
  const [evaluasiPenyuluhUnitKerja, setEvaluasiPenyuluhUnitKerja] = useState("KUA Pulau Dullah Utara");

  // Ratings for 6 instruments (Q3 to Q8)
  const [evaluasiRatings, setEvaluasiRatings] = useState<Record<string, string>>({
    q3: "Cukup Baik",
    q4: "Sangat Baik",
    q5: "Sangat Baik",
    q6: "Cukup Baik",
    q7: "Cukup Baik",
    q8: "Sangat Baik"
  });

  // Comments / Hasil Pemantauan for each instrument
  const [evaluasiComments, setEvaluasiComments] = useState<Record<string, string>>({
    q3: "Sesuai dengan kebutuhan penyuluhan",
    q4: "Sangat sistematis dan interaktif",
    q5: "Pesan sangat jelas dan mendidik",
    q6: "Sarana bimbingan sangat memadai",
    q7: "Sangat bersemangat dan komunikatif",
    q8: "Sangat bermanfaat untuk kehidupan sakinah"
  });

  const [evaluasiSubmitted, setEvaluasiSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Event listener to restore page states seamlessly after print closes
  useEffect(() => {
    const handleAfterPrint = () => {
      document.body.classList.remove("printing-kua-active");
      
      // Show custom elegant notification (toast) as requested
      setToastMessage("Notifikasi: Proses cetak selesai. Halaman kembali aktif secara normal!");
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    };

    window.addEventListener("afterprint", handleAfterPrint);
    
    // Fallback in case of some legacy browsers
    if (typeof window !== "undefined") {
      window.onafterprint = handleAfterPrint;
    }

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
      if (typeof window !== "undefined") {
        window.onafterprint = null;
      }
    };
  }, []);

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

  const deleteLayanan = (id: string, title: string) => {
    setDeleteConfirm({
      id,
      type: "layanan",
      title
    });
  };

  const deletePengumuman = (id: string, title: string) => {
    setDeleteConfirm({
      id,
      type: "pengumuman",
      title
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;
    const { id, type } = deleteConfirm;
    try {
      setIsSubmitting(true);
      const endpoint = type === "layanan" ? `/api/layanan/${id}` : `/api/announcements/${id}`;
      const res = await fetch(endpoint, { method: "DELETE" });
      if (res.ok) {
        await fetchData();
        setDeleteConfirm(null);
      } else {
        alert("Gagal menghapus data!");
      }
    } catch (err) {
      alert("Koneksi terganggu!");
    } finally {
      setIsSubmitting(false);
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

  // Derived list of Islamic religious educators (reactive to db changes)
  const penyuluhList = db?.penyuluh || PENYULUH_AGAMA_LIST;

  // Forward custom Penyuluh consultation form inputs to WhatsApp of target educator
  const handlePenyuluhSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!penyuluhSenderName || !penyuluhSenderWa || !penyuluhQuery) {
      alert("Harap lengkapi nama, nomor WhatsApp, dan isi pertanyaan Anda!");
      return;
    }

    const educator = penyuluhList.find(p => p.id === penyuluhSelectedId) || penyuluhList[0];
    const textFormatted = `Assalamu'alaikum Warahmatullahi Wabarakatuh,\n\nYth. *${educator.name}*\n(Penyuluh KUA Pulau Dullah Utara)\n\nPerihal: *Konsultasi ${penyuluhTopic}*\n\nBerikut adalah identitas saya:\n- Nama: *${penyuluhSenderName}*\n- No. WA: *${penyuluhSenderWa}*\n\nPertanyaan/Detail Konsultasi:\n_"${penyuluhQuery}"_\n\nMohon petunjuk dan bimbingannya. Terima kasih.`;
    
    const waUrl = `https://wa.me/${educator.phone}?text=${encodeURIComponent(textFormatted)}`;
    
    // Set status to true to show elegant success visual feedback
    setPenyuluhSubmitted(true);
    
    // Open WA Link
    window.open(waUrl, "_blank");
  };

  const handlePenyuluhSelectForEvaluasi = (id: string) => {
    setEvaluasiPenyuluhId(id);
    if (!id) return;
    const p = (db?.penyuluh || PENYULUH_AGAMA_LIST).find(item => item.id === id);
    if (p) {
      setEvaluasiPenyuluhName(p.name);
      // Give realistic stable NIPS for our default ones
      const nips: Record<string, string> = {
        p1: "197208152003121001",
        p2: "198004122008012015",
        p3: "197811052006041003",
        p4: "198305142010012022",
        p5: "198501272025211002", // Matches Dodi
        p6: "197509202005012008",
        p7: "198812252014022011"
      };
      setEvaluasiPenyuluhNip(nips[id] || "198501272025211002");
      setEvaluasiPenyuluhPangkat(id === "p1" || id === "p3" ? "IV/a" : "IX");
      setEvaluasiPenyuluhJabatan("Penyuluh Agama Islam");
      setEvaluasiPenyuluhTempatTugas("Kantor Kementerian Agama Kota Tual");
      setEvaluasiPenyuluhUnitKerja("KUA Pulau Dullah Utara");
    }
  };

  const handleEvaluasiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluasiCatinPria || !evaluasiCatinWanita || !evaluasiCatinPhone || !evaluasiPenyuluhName) {
      alert("Harap lengkapi semua isian formulir evaluasi!");
      return;
    }
    
    // Create detailed rating text summary
    const ratingSummary = `3. Kesesuaian materi: ${evaluasiRatings.q3 || "Sangat Baik"}\n` +
      `4. Sistematis penyampaian: ${evaluasiRatings.q4 || "Sangat Baik"}\n` +
      `5. Ketercapaian pesan: ${evaluasiRatings.q5 || "Sangat Baik"}\n` +
      `6. Sarana prasarana: ${evaluasiRatings.q6 || "Sangat Baik"}\n` +
      `7. Sikap penasihat/sumber: ${evaluasiRatings.q7 || "Sangat Baik"}\n` +
      `8. Manfaat materi rumah tangga: ${evaluasiRatings.q8 || "Sangat Baik"}`;

    const formattedText = `*KUESIONER MONITORING & EVALUASI BIMWIN KUA PULAU DULLAH UTARA TAHUN ${evaluasiTahun}*\n\n` +
      `Saya telah mengisi laporan kuesioner evaluasi bimbingan perkawinan/keluarga sakinah:\n\n` +
      `*Identitas Peserta:*\n` +
      `- *Peserta Pria:* ${evaluasiCatinPria}\n` +
      `- *Peserta Wanita:* ${evaluasiCatinWanita}\n` +
      `- *No. WA / HP:* ${evaluasiCatinPhone}\n` +
      `- *Hari & Tanggal:* ${evaluasiHariTanggal}\n` +
      `- *Kegiatan:* ${evaluasiKegiatan} - Tema: ${evaluasiTema}\n\n` +
      `*Identitas Narasumber:*\n` +
      `- *Nama Penyuluh:* ${evaluasiPenyuluhName}\n` +
      `- *NIP:* ${evaluasiPenyuluhNip}\n` +
      `- *Jabatan:* ${evaluasiPenyuluhJabatan}\n\n` +
      `*Penilaian Instrumen:*\n${ratingSummary}\n\n` +
      `Kuesioner siap dicetak resmi sebagai arsip KUA Pulau Dullah Utara.`;

    const waUrl = `https://wa.me/${defaultSettings.whatsappNumber}?text=${encodeURIComponent(formattedText)}`;
    
    setEvaluasiSubmitted(true);
    window.open(waUrl, "_blank");
  };

  // Native high-fidelity print handler that triggers window.print() and manages state
  const handlePrintDirect = () => {
    // 1. Add class to body to signal printing state and trigger CSS print display overrides
    document.body.classList.add("printing-kua-active");
    
    // 2. Clear any browser selection to ensure a perfect render output
    window.getSelection()?.removeAllRanges();

    // 3. Temporarily set document title so that if the user saves or prints as PDF,
    // the output filename suggestion is perfectly professional
    const originalTitle = document.title;
    const cleanPria = evaluasiCatinPria ? evaluasiCatinPria.replace(/[^a-zA-Z0-9\s]/g, "").trim() : "Pria";
    const cleanWanita = evaluasiCatinWanita ? evaluasiCatinWanita.replace(/[^a-zA-Z0-9\s]/g, "").trim() : "Wanita";
    
    const formattedPria = cleanPria.replace(/\s+/g, "_");
    const formattedWanita = cleanWanita.replace(/\s+/g, "_");
    document.title = `Kuesioner_Evaluasi_KUA_${formattedPria}_&_${formattedWanita}`;

    // 4. Trigger print with a tiny delay to yield keyframes & styles to the browser layout engine
    setTimeout(() => {
      window.print();
      // Restore page title immediately in JavaScript microtask
      document.title = originalTitle;
    }, 150);
  };

  // Legacy unused popup print handler
  const handlePrintDirect_UNUSED = (autoDownloadParam: any = false) => {
    return;
    // Explicitly check for actual boolean true to avoid React mouse events causing true coercion
    const autoDownload = autoDownloadParam === true;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Popup diblokir oleh browser! Harap izinkan popup di peramban Anda untuk mengaktifkan cetak langsung.");
      return;
    }

    const items = [
      { key: "q3", num: "3.", q: "Bagaimanakah penyampaian materi apakah sudah sesuai dengan tema?" },
      { key: "q4", num: "4.", q: "Bagaimana langkah penyampaian materi apakah sudah sistematis?" },
      { key: "q5", num: "5.", q: "Bagaimanakah pesan dari tema apakah sudah tersampaikan?" },
      { key: "q6", num: "6.", q: "Bagaimanakah penggunaan sarana dan prasarana selama kegiatan, apakah sudah membantu?" },
      { key: "q7", num: "7.", q: "Bagaimana penilaian peserta terhadap sikap narasumber, apakah narasumber menyampaikan materi dengan antusias, semangat, dan memberikan motivasi yang baik?" },
      { key: "q8", num: "8.", q: "Apakah materi yang disampaikan memberikan manfaat bagi kehidupan rumah tangga nantinya?" }
    ];

    const generateRowsHTML = (list: typeof items) => {
      return list.map((item) => {
        const selectedRating = evaluasiRatings[item.key] || "";
        const comment = evaluasiComments[item.key] || "-";
        
        return `
          <tr>
            <td style="border: 1px solid black; text-align: center; font-weight: bold; padding: 6px 4px;">${item.num}</td>
            <td style="border: 1px solid black; padding: 6px 8px; text-align: left;">
              <span style="font-weight: bold;">${item.q}</span>
              <div style="font-size: 8.5pt; font-style: italic; color: #4b5563; margin-top: 4px; font-family: 'Times New Roman', serif;">
                Hasil Pemantauan : ${comment}
              </div>
            </td>
            <td style="border: 1px solid black; text-align: center; font-weight: bold; font-size: 11pt; color: #047857; width: 8%;">${selectedRating === "Cukup" ? "✓" : ""}</td>
            <td style="border: 1px solid black; text-align: center; font-weight: bold; font-size: 11pt; color: #047857; width: 8%;">${selectedRating === "Sedang" ? "✓" : ""}</td>
            <td style="border: 1px solid black; text-align: center; font-weight: bold; font-size: 11pt; color: #047857; width: 8%;">${selectedRating === "Baik" ? "✓" : ""}</td>
            <td style="border: 1px solid black; text-align: center; font-weight: bold; font-size: 11pt; color: #047857; width: 8%;">${selectedRating === "Cukup Baik" ? "✓" : ""}</td>
            <td style="border: 1px solid black; text-align: center; font-weight: bold; font-size: 11pt; color: #047857; width: 8%;">${selectedRating === "Sangat Baik" ? "✓" : ""}</td>
          </tr>
        `;
      }).join("");
    };

    const parentDate = evaluasiHariTanggal ? evaluasiHariTanggal.replace(/^(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu),\s*/i, "") : "10 Februari 2026";

    // Form clean filename
    const cleanPria = evaluasiCatinPria ? evaluasiCatinPria.replace(/[^a-zA-Z0-9]/g, "_") : "Pria";
    const cleanWanita = evaluasiCatinWanita ? evaluasiCatinWanita.replace(/[^a-zA-Z0-9]/g, "_") : "Wanita";

    const popupHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cetak Kuesioner Evaluasi KUA Dullah Utara</title>
          <style>
            @page {
              size: A4;
              margin: 0 !important;
            }
            body {
              font-family: "Times New Roman", Times, Georgia, serif;
              font-size: 11pt;
              line-height: 1.4;
              color: black;
              background-color: white;
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @media screen {
              body {
                background-color: #f1f5f9 !important;
                padding: 30px !important;
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              .paper-container {
                background: white;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                border: 1px solid #e2e8f0;
                width: 210mm;
                min-height: 297mm;
                box-sizing: border-box;
                padding: 20mm 15mm 20mm 15mm !important;
              }
            }
            @media print {
              .no-print {
                display: none !important;
              }
              body {
                padding: 20mm 15mm 20mm 15mm !important;
                background-color: white !important;
              }
              .paper-container {
                width: auto !important;
                min-height: auto !important;
                box-shadow: none !important;
                border: none !important;
                padding: 0 !important;
              }
            }
            .text-center {
              text-align: center;
            }
            .font-bold {
              font-weight: bold;
            }
            .uppercase {
              text-transform: uppercase;
            }
            .header-kua {
              text-align: center;
              font-weight: bold;
              text-transform: uppercase;
              font-family: Arial, sans-serif;
              font-size: 11pt;
              margin: 0;
              line-height: 1.35;
            }
            .double-line {
              border-bottom: 3.5px double black;
              margin: 10px 0 15px 0;
            }
            .doc-title-box {
              border: 1px solid black;
              padding: 8px 10px;
              text-align: center;
              font-family: Arial, sans-serif;
              font-weight: bold;
              text-transform: uppercase;
              font-size: 10pt;
              margin-bottom: 20px;
              line-height: 1.4;
            }
            .section-header {
              font-weight: bold;
              text-decoration: underline;
              font-size: 11pt;
              font-family: "Times New Roman", Times, serif;
              margin-top: 15px;
              margin-bottom: 6px;
              display: block;
            }
            .identity-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 12px;
            }
            .identity-table td {
              padding: 2.5px 0;
              font-size: 11pt;
              font-family: "Times New Roman", Times, serif;
              border: none !important;
            }
            .instrumen-table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
              font-family: Arial, sans-serif;
              font-size: 9pt;
            }
            .instrumen-table th, .instrumen-table td {
              border: 1px solid black;
            }
            .instrumen-table th {
              background-color: #f3f4f6 !important;
              font-weight: bold;
              text-align: center;
              padding: 6px 4px;
            }
            .page-break {
              page-break-before: always;
              break-before: page;
            }
            .signatures-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 10px;
              margin-top: 20px;
              font-family: "Times New Roman", Times, serif;
              font-size: 11pt;
            }
            .sig-col {
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 120px;
            }
            .sig-title {
              font-weight: bold;
              line-height: 1.2;
            }
            .sig-name {
              font-weight: bold;
              text-decoration: underline;
              text-transform: uppercase;
            }
          </style>
        </head>
        <body>
          <!-- Control Panel (Hidden during Print) -->
          <div class="no-print" style="background: #0f172a; color: white; padding: 16px 20px; font-family: sans-serif; border-bottom: 3px solid #10b981; width: 100%; max-width: 210mm; box-sizing: border-box; margin-bottom: 20px; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
              <div>
                <h3 style="margin: 0; font-size: 13pt; color: #10b981; font-weight: bold; font-family: Arial, sans-serif;">Menu Cetak & Unduh Evaluasi KUA Dullah Utara</h3>
                <p style="margin: 4px 0 0 0; font-size: 9pt; color: #94a3b8; font-family: Arial, sans-serif;">Silakan cetak sebagai dokumen fisik atau simpan dalam format PDF kualitas tinggi.</p>
              </div>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button onclick="window.print()" style="background: #10b981; color: white; border: none; padding: 10px 18px; font-weight: bold; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 9.5pt; font-family: Arial, sans-serif; transition: background 0.2s;">
                  🖨️ Cetak Dokumen
                </button>
                <button id="btn-download-pdf" onclick="downloadPDF()" style="background: #2563eb; color: white; border: none; padding: 10px 18px; font-weight: bold; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 9.5pt; font-family: Arial, sans-serif; transition: background 0.2s;">
                  💾 Unduh PDF
                </button>
                <button onclick="window.close()" style="background: #e11d48; color: white; border: none; padding: 10px 18px; font-weight: bold; border-radius: 6px; cursor: pointer; font-size: 9.5pt; font-family: Arial, sans-serif; transition: background 0.2s;">
                  ✕ Tutup
                </button>
              </div>
            </div>
            <div style="font-size: 8.5pt; color: #cbd5e1; border-top: 1px solid #334155; padding-top: 10px; margin-top: 10px; line-height: 1.4; font-family: Arial, sans-serif;">
              <strong>Tips Hasil Cetak Sempurna:</strong> Gunakan peramban Google Chrome atau Microsoft Edge. Jika tombol <strong>Unduh PDF</strong> terhambat oleh kebijakan browser Anda, klik <strong>Cetak Dokumen</strong>, lalu pilih opsi tujuan <strong>"Simpan sebagai PDF" / "Save as PDF"</strong> pada layar print browser Anda.
            </div>
          </div>

          <div id="printable-content" class="paper-container">
            <!-- PAGE 1 -->
            <div class="header-kua">MONITORING DAN EVALUASI PELAKSANAAN BIMBINGAN PERKAWINAN</div>
            <div class="header-kua">KANTOR KEMENTERIAN AGAMA KOTA TUAL</div>
            <div class="header-kua">KANTOR URUSAN AGAMA PULAU DULLAH UTARA</div>
            <div class="header-kua" style="font-size: 9pt; font-weight: normal; text-transform: none; font-style: italic;">
              Alamat : Jl. Panglima Mandala, Fiditan, Kota Tual
            </div>

            <div class="double-line"></div>

            <div class="doc-title-box">
              PELAKSANAAN MONITORING DAN EVALUASI TAHUN ${evaluasiTahun}<br>
              NAMA PESERTA BIMWIN ${evaluasiCatinPria} & ${evaluasiCatinWanita}<br>
              <span style="font-family: 'Times New Roman', Times, serif; font-style: italic; font-weight: normal; text-transform: none; font-size: 9.5pt;">
                ${evaluasiHariTanggal}
              </span>
            </div>

            <div class="section-header">Identitas Penyuluh Agama</div>
            <table class="identity-table">
              <tr>
                <td style="width: 170px;">Nama Lengkap</td>
                <td style="width: 15px;">:</td>
                <td style="font-weight: bold;">${evaluasiPenyuluhName || "-"}</td>
              </tr>
              <tr>
                <td>NIP</td>
                <td>:</td>
                <td>${evaluasiPenyuluhNip || "-"}</td>
              </tr>
              <tr>
                <td>Pangkat/Golongan</td>
                <td>:</td>
                <td>${evaluasiPenyuluhPangkat || "-"}</td>
              </tr>
              <tr>
                <td>Jabatan</td>
                <td>:</td>
                <td>${evaluasiPenyuluhJabatan || "-"}</td>
              </tr>
              <tr>
                <td>Tempat tugas</td>
                <td>:</td>
                <td>${evaluasiPenyuluhTempatTugas || "-"}</td>
              </tr>
              <tr>
                <td>Unit Kerja</td>
                <td>:</td>
                <td>${evaluasiPenyuluhUnitKerja || "-"}</td>
              </tr>
            </table>

            <p style="font-weight: bold; font-style: italic; font-size: 10.5pt; margin: 12px 0 8px 0;">
              Mohon diisi dengan baik dan benar sesuai kegiatan yang baru saja Anda ikuti saat ini!
            </p>

            <table class="identity-table" style="margin-bottom: 12px;">
              <tr>
                <td style="width: 120px; font-weight: bold;">1. Kegiatan</td>
                <td style="width: 15px;">:</td>
                <td>${evaluasiKegiatan}</td>
              </tr>
              <tr>
                <td style="font-weight: bold;">2. Tema</td>
                <td>:</td>
                <td>${evaluasiTema}</td>
              </tr>
            </table>

            <div class="header-kua" style="text-align: center; text-decoration: underline; margin: 15px 0 10px 0; font-family: 'Times New Roman', Times, serif;">
              HASIL LAPORAN BERDASARKAN INSTRUMEN YANG DIISI OLEH PESERTA
            </div>

            <table class="instrumen-table">
              <thead>
                <tr>
                  <th style="width: 6%;" rowspan="2">No.</th>
                  <th style="width: 54%; text-align: left;" rowspan="2">Pertanyaan Instrumen</th>
                  <th style="width: 40%;" colspan="5">Jumlah</th>
                </tr>
                <tr>
                  <th style="font-size: 8pt; width: 8%;">Cukup</th>
                  <th style="font-size: 8pt; width: 8%;">Sedang</th>
                  <th style="font-size: 8pt; width: 8%;">Baik</th>
                  <th style="font-size: 8pt; width: 8%;">Cukup Baik</th>
                  <th style="font-size: 8pt; width: 8%;">Sangat Baik</th>
                </tr>
              </thead>
              <tbody>
                ${generateRowsHTML(items.slice(0, 5))}
              </tbody>
            </table>

            <div class="page-break"></div>

            <!-- PAGE 2 -->
            <table class="instrumen-table" style="margin-top: 15px;">
              <thead>
                <tr>
                  <th style="width: 6%;" rowspan="2">No.</th>
                  <th style="width: 54%; text-align: left;" rowspan="2">Pertanyaan Instrumen</th>
                  <th style="width: 40%;" colspan="5">Jumlah</th>
                </tr>
                <tr>
                  <th style="font-size: 8pt; width: 8%;">Cukup</th>
                  <th style="font-size: 8pt; width: 8%;">Sedang</th>
                  <th style="font-size: 8pt; width: 8%;">Baik</th>
                  <th style="font-size: 8pt; width: 8%;">Cukup Baik</th>
                  <th style="font-size: 8pt; width: 8%;">Sangat Baik</th>
                </tr>
              </thead>
              <tbody>
                ${generateRowsHTML(items.slice(5))}
              </tbody>
            </table>

            <!-- Footnote Info / Signature Section -->
            <div style="display: flex; justify-content: flex-end; margin-top: 30px; font-family: 'Times New Roman', Times, serif; font-size: 11pt;">
              Fiditan, ${parentDate}
            </div>

            <div class="signatures-grid">
              <div class="sig-col">
                <div class="sig-title">Peserta Pria</div>
                <div class="sig-name">${evaluasiCatinPria}</div>
              </div>
              <div class="sig-col">
                <div class="sig-title">Peserta Wanita</div>
                <div class="sig-name">${evaluasiCatinWanita}</div>
              </div>
              <div class="sig-col">
                <div class="sig-title">Mengetahui<br>Narasumber</div>
                <div>
                  <div class="sig-name" style="text-decoration: underline; text-transform: none;">${evaluasiPenyuluhName}</div>
                  <div style="font-size: 9.5pt; margin-top: 2px;">NIP. ${evaluasiPenyuluhNip}</div>
                </div>
              </div>
            </div>

          </div>

          <!-- Load html2pdf from CDN inside the new window bypass context -->
          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
          <script>
            const shouldAutoDownload = ${autoDownload};

            function downloadPDF() {
              const btn = document.getElementById("btn-download-pdf");
              if (!window.html2pdf) {
                alert("Pustaka PDF sedang dimuat. Silakan tunggu sebentar dan coba lagi.");
                return;
              }
              
              const element = document.getElementById("printable-content");
              if (!element) {
                alert("Elemen dokumen tidak ditemukan!");
                return;
              }

              const originalText = btn.innerHTML;
              btn.innerHTML = "⏳ Memproses...";
              btn.style.opacity = "0.7";
              btn.disabled = true;

              const opt = {
                margin:       12,
                filename:     'Kuesioner_Evaluasi_KUA_${cleanPria}_&_${cleanWanita}.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, logging: false },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak:    { mode: 'css', before: '.page-break' }
              };

              html2pdf()
                .from(element)
                .set(opt)
                .save()
                .then(() => {
                  btn.innerHTML = originalText;
                  btn.style.opacity = "1";
                  btn.disabled = false;
                })
                .catch(err => {
                  console.error(err);
                  alert("Gagal mengunduh PDF secara langsung. Silakan klik 'Cetak' dan pilih 'Simpan sebagai PDF'.");
                  btn.innerHTML = originalText;
                  btn.style.opacity = "1";
                  btn.disabled = false;
                });
            }

            window.onload = function() {
              if (shouldAutoDownload) {
                setTimeout(downloadPDF, 400);
              } else {
                setTimeout(function() {
                  window.print();
                }, 400);
              }
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(popupHtml);
    printWindow.document.close();
  };

  // Handle uploading photos specifically for a profile change
  const handlePenyuluhPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      alert("Harap pilih file gambar (JPG/PNG/WEBP)!");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      try {
        setIsSubmittingPenyuluh(true);
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
          setEditingPenyuluhPhoto(uploadData.url);
        } else {
          alert("Gagal mengunggah foto: " + (uploadData.error || "Ukurannya mungkin terlalu besar"));
        }
      } catch (err) {
        console.error("Photo upload error:", err);
        alert("Gagal menghubungi server untuk mengunggah foto.");
      } finally {
        setIsSubmittingPenyuluh(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Persist updated educator profile details
  const handleSavePenyuluh = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPenyuluh) return;
    if (!editingPenyuluhName || !editingPenyuluhPhone) {
      alert("Nama dan Nomor WA wajib diisi!");
      return;
    }

    try {
      setIsSubmittingPenyuluh(true);
      const updatedList = penyuluhList.map((p) => {
        if (p.id === editingPenyuluh.id) {
          return {
            ...p,
            name: editingPenyuluhName,
            phone: editingPenyuluhPhone,
            photo: editingPenyuluhPhoto
          };
        }
        return p;
      });

      // Save to server
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          penyuluh: updatedList
        })
      });

      if (res.ok) {
        // Refresh local state
        setDb(prev => prev ? { ...prev, penyuluh: updatedList } : null as any);
        setEditingPenyuluh(null);
        alert("Profil Penyuluh Agama berhasil diperbarui!");
      } else {
        alert("Gagal menyimpan profil penyuluh.");
      }
    } catch (err) {
      console.error("Error saving penyuluh:", err);
      alert("Terjadi kesalahan koneksi saat menyimpan.");
    } finally {
      setIsSubmittingPenyuluh(false);
    }
  };

  // Populate form states to edit a religious educator's metadata
  const handleEditPenyuluh = (educator: any) => {
    setEditingPenyuluh(educator);
    setEditingPenyuluhName(educator.name || "");
    setEditingPenyuluhPhone(educator.phone || "");
    setEditingPenyuluhPhoto(educator.photo || "");
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
    bannerTitle: "KANTOR URUSAN AGAMA\nPULAU DULLAH UTARA",
    bannerSubtitle: "Pusat Pelayanan Keagamaan Digital Pulau Dullah Utara, Kota Tual.\nMelayani Administrasi Nikah, Wakaf, Konsultasi Keagamaan, dan Bimbingan Ummat secara Profesional, Mudah, Cepat, dan Terintegrasi.",
    address: "Jl. Pemuda No. 12, Pulau Dullah Utara, Kota Tual, Maluku",
    email: "kuadullahutara01@gmail.com",
    phone: "+62 812 4091 2842",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    tiktokUrl: "",
    youtubeUrl: "",
    kepalaKuaName: "H. Ahmad, S.Ag.",
    kepalaKuaImg: kepalaKuaPlaceholder,
    statistikImg: statistikKuaPlaceholder
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between no-print">
      
      {/* Dynamic Header */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab}
        onAdminClick={() => setShowLoginModal(true)}
        isAdmin={isAdminLoggedIn}
        onLogout={handleLogout}
        logoImg={defaultSettings.logoImg}
        secondaryLogoImg={defaultSettings.secondaryLogoImg}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {/* Layanan Nikah Category Card */}
                    <div 
                      onClick={() => setCurrentTab("nikah")}
                      className="group bg-white rounded-3xl p-6 border border-emerald-50 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer relative overflow-hidden"
                      id="shortcut-nikah-box"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full group-hover:bg-emerald-100 transition-colors -z-1" />
                      
                      <div className="w-14 h-14 bg-emerald-50 group-hover:bg-emerald-700 hover:text-white text-emerald-700 rounded-2xl flex items-center justify-center transition-all shadow-xxs">
                        <Heart className="h-7 w-7 group-hover:text-white" />
                      </div>
                      
                      <h4 className="text-lg font-bold font-display text-slate-900 mt-6 group-hover:text-emerald-800 transition-colors">
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
                      className="group bg-white rounded-3xl p-6 border border-emerald-50 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer relative overflow-hidden"
                      id="shortcut-wakaf-box"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full group-hover:bg-teal-100 transition-colors -z-1" />
                      
                      <div className="w-14 h-14 bg-teal-50 group-hover:bg-emerald-700 text-emerald-800 rounded-2xl flex items-center justify-center transition-all shadow-xxs">
                        <FileText className="h-7 w-7 group-hover:text-white" />
                      </div>
                      
                      <h4 className="text-lg font-bold font-display text-slate-900 mt-6 group-hover:text-emerald-800 transition-colors">
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
                      className="group bg-white rounded-3xl p-6 border border-emerald-50 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer relative overflow-hidden"
                      id="shortcut-muallaf-box"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-bl-full group-hover:bg-sky-100 transition-colors -z-1" />
                      
                      <div className="w-14 h-14 bg-sky-50 group-hover:bg-emerald-700 text-sky-700 rounded-2xl flex items-center justify-center transition-all shadow-xxs">
                        <Globe className="h-7 w-7 group-hover:text-white" />
                      </div>
                      
                      <h4 className="text-lg font-bold font-display text-slate-900 mt-6 group-hover:text-emerald-800 transition-colors">
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

                    {/* Penyuluhan Agama Category Card */}
                    <div 
                      onClick={() => setCurrentTab("penyuluhan")}
                      className="group bg-white rounded-3xl p-6 border border-emerald-50 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer relative overflow-hidden"
                      id="shortcut-penyuluhan-box"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full group-hover:bg-amber-100 transition-colors -z-1" />
                      
                      <div className="w-14 h-14 bg-amber-50 group-hover:bg-emerald-700 text-amber-700 rounded-2xl flex items-center justify-center transition-all shadow-xxs">
                        <BookOpen className="h-7 w-7 group-hover:text-white" />
                      </div>
                      
                      <h4 className="text-lg font-bold font-display text-slate-900 mt-6 group-hover:text-emerald-800 transition-colors">
                        📢 PENYULUHAN AGAMA
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        Penyandaran bimbingan keagamaan syiar Islam, penyuluhan keluarga sakinah, konsultasi syariah digital, dan pendaftaran kegiatannya.
                      </p>
                      
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-700 mt-6 group-hover:translate-x-1.5 transition-transform">
                        <span>Layanan Konseling & Syiar</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* STATISTIK SECTION */}
              <section className="bg-emerald-950 py-8 text-white relative overflow-hidden" id="section-statistik">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_40%)] pointer-events-none" />
                <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center px-4 sm:px-6">
                  <div className="w-full relative overflow-hidden rounded-2xl border border-emerald-800/30 shadow-2xl bg-emerald-950 flex justify-center">
                    <img 
                      src={defaultSettings.statistikImg || statistikKuaPlaceholder} 
                      alt="Statistik Pelayanan KUA" 
                      className="w-full h-auto select-none block"
                      referrerPolicy="no-referrer"
                    />
                    {/* Subtle micro blend overlays on the extreme outer edges for flawless background integration */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                      <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-r from-emerald-950 to-transparent" />
                      <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-l from-emerald-950 to-transparent" />
                    </div>
                  </div>
                </div>
              </section>

              {/* QUICK LATEST ANNOUNCEMENT SECTION */}
              <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/60 px-2.5 py-1 rounded-full inline-block">
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
                  <div className="bg-emerald-950 rounded-3xl text-white relative shadow-xl overflow-hidden min-h-[510px] max-w-[325px] mx-auto w-full flex flex-col justify-between group select-none border border-emerald-800/25">
                    {/* Background Subtle Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950 via-emerald-900 to-emerald-950/90 -z-10" />
                    
                    {/* Vertically elongated photo integrated directly at the top of the card (narrower and taller) */}
                    <div className="w-full h-[320px] relative overflow-hidden bg-emerald-900/30">
                      <img 
                        src={defaultSettings.kepalaKuaImg || kepalaKuaPlaceholder} 
                        alt={defaultSettings.kepalaKuaName || "Kepala Kantor KUA"} 
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                        referrerPolicy="no-referrer"
                      />
                      {/* Elegant dark gradient blending the portrait bottom edge smoothly into the dark card background */}
                      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-emerald-950 to-transparent" />
                    </div>
                    
                    {/* Writing content - identical to the beautiful dark design */}
                    <div className="relative z-10 text-center px-6 pb-6 pt-2">
                      <h4 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white drop-shadow-sm">
                        {defaultSettings.kepalaKuaName || "H. Ahmad, S.Ag."}
                      </h4>
                      <p className="text-xs text-emerald-300 mt-1 uppercase font-extrabold tracking-widest drop-shadow-xs">
                        Kepala Kantor Urusan Agama
                      </p>
                      <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">
                        Pulau Dullah Utara
                      </p>
                      <hr className="border-emerald-700/60 my-3" />
                      <p className="text-[11px] text-slate-300 italic leading-relaxed font-sans drop-shadow-xs max-w-sm mx-auto px-1">
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
          {["nikah", "wakaf", "muallaf", "penyuluhan"].includes(currentTab) && (
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
                    <span className="font-semibold text-emerald-700 capitalize">
                      {currentTab === "muallaf" ? "Muallaf" : currentTab === "penyuluhan" ? "Penyuluhan Agama Islam" : currentTab}
                    </span>
                  </div>
                  <h2 className="text-3xl font-extrabold font-display text-emerald-950 uppercase tracking-tight">
                    {currentTab === "nikah" && "💍 Layanan Nikah Terpadu"}
                    {currentTab === "wakaf" && "📜 Layanan Manajemen Wakaf"}
                    {currentTab === "muallaf" && "🕌 Muallaf Center Pulau Dullah Utara"}
                    {currentTab === "penyuluhan" && "📢 Penyuluhan Agama Islam"}
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
              <div className={`grid grid-cols-1 gap-6 md:gap-8 ${(currentTab === "nikah" || currentTab === "penyuluhan") ? "max-w-4xl mx-auto w-full" : "lg:grid-cols-12"}`}>
                
                {/* Left side checklist / files & instructions */}
                <div className={`${(currentTab === "nikah" || currentTab === "penyuluhan") ? "" : "lg:col-span-8"} space-y-5 sm:space-y-6`}>
                  {/* LAYANAN NIKAH TERPADU - CUSTOM CARS MODULE */}
                  {currentTab === "nikah" && (() => {
                    const nikahSlides = [
                      {
                        title: "Berkas Pendaftaran Nikah Umum",
                        subtitle: "Dokumen Persyaratan Umum WNI",
                        description: "Dokumen esensial yang wajib dipenuhi oleh calon pengantin Warga Negara Indonesia (WNI) seperti KTP, Kartu Keluarga, ijazah, akta lahir, rekomendasi nikah luar daerah, dsb.",
                        img: defaultSettings.berkasNikahImg || berkasUmum,
                        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
                      },
                      {
                        title: "Berkas Pendaftaran Nikah Khusus",
                        subtitle: "Persyaratan Kondisional Pasangan",
                        description: "Persyaratan tambahan khusus bagi calon pengantin dengan status tertentu seperti anggota TNI/POLRI, Warga Negara Asing (WNA), status janda/duda cerai, izin poligami, maupun dispensasi nikah.",
                        img: defaultSettings.alurNikahImg || berkasKhusus,
                        badgeColor: "bg-blue-50 text-blue-700 border-blue-100",
                      },
                      {
                        title: "Alur Proses Pendaftaran Nikah",
                        subtitle: "Langkah Prosedural Resmi Kemenag",
                        description: "Bagan langkah demi langkah pengurusan nikah: dari pengajuan berkas di Kelurahan, pendaftaran online SIMKAH di KUA, verifikasi dokumen oleh Penghulu, s/d pelaksanaan ijab kabul akad nikah.",
                        img: defaultSettings.alurProsesNikahImg || berkasKhusus,
                        badgeColor: "bg-amber-50 text-amber-700 border-amber-100",
                      }
                    ];

                    const currentSlide = nikahSlides[activeNikahSlide] || nikahSlides[0];

                    return (
                      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-xxs">
                        {/* Header Slide Info */}
                        <div className="text-center max-w-xl mx-auto mb-4">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#15803d] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                            Kanal Dokumen Utama Warga
                          </span>
                          <h3 className="text-lg font-extrabold font-display text-emerald-950 mt-1">
                            📂 Dokumen & Alur Pendaftaran Nikah
                          </h3>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Gunakan tombol navigasi &larr; &rarr; di bawah untuk beralih antara berkas umum, berkas khusus, dan alur pendaftaran secara praktis.
                          </p>
                        </div>

                        {/* Slide Display Container */}
                        <div className="relative bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden p-3 sm:p-4.5 transition-all">
                          
                          {/* Inner Slide Layout */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                            
                            {/* Image Part */}
                            <div className="md:col-span-6 relative group flex flex-col justify-center">
                              <div className="overflow-hidden rounded-xl border border-slate-200 shadow-xs bg-white h-[200px] sm:h-[250px] w-full flex items-center justify-center relative">
                                <motion.img
                                  key={activeNikahSlide}
                                  initial={{ opacity: 0, scale: 0.98 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.98 }}
                                  transition={{ duration: 0.3 }}
                                  src={currentSlide.img}
                                  alt={currentSlide.title}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-101"
                                  onClick={() => openModal(currentSlide.img)}
                                />
                                
                                {/* Live Hover Overlay badge to zoom */}
                                <div className="absolute top-3 right-3 bg-black/60 text-white font-semibold text-[10px] px-2.5 py-1 rounded-full flex items-center space-x-1 backdrop-blur-xs select-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Maximize2 className="h-3 w-3" />
                                  <span>Klik Untuk Memperbesar</span>
                                </div>
                              </div>
                            </div>

                            {/* Info text Part */}
                            <div className="md:col-span-6 flex flex-col justify-between h-full py-1 space-y-3">
                              <div className="space-y-2.5">
                                <div className="flex items-center space-x-2">
                                  <span className={`text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md border ${currentSlide.badgeColor}`}>
                                    {currentSlide.subtitle}
                                  </span>
                                  <span className="text-[9px] text-slate-400 font-mono">
                                    Slide {activeNikahSlide + 1} dari {nikahSlides.length}
                                  </span>
                                </div>
                                <h4 className="text-base font-extrabold text-emerald-950 font-display leading-snug">
                                  {currentSlide.title}
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                                  {currentSlide.description}
                                </p>
                              </div>

                              {/* Navigation Controls */}
                              <div className="flex items-center justify-between pt-3 border-t border-slate-200/50 mt-1">
                                <div className="flex space-x-1">
                                  {nikahSlides.map((_, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => setActiveNikahSlide(idx)}
                                      className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                        activeNikahSlide === idx ? "bg-emerald-700 w-4.5" : "bg-slate-300 hover:bg-slate-400"
                                      }`}
                                      aria-label={`Ke slide ${idx + 1}`}
                                    />
                                  ))}
                                </div>

                                <div className="flex space-x-1.5">
                                  <button
                                    onClick={() => setActiveNikahSlide((prev) => (prev === 0 ? nikahSlides.length - 1 : prev - 1))}
                                    className="w-7 h-7 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                                    title="Slide Sebelumnya"
                                  >
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setActiveNikahSlide((prev) => (prev === nikahSlides.length - 1 ? 0 : prev + 1))}
                                    className="w-7 h-7 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                                    title="Slide Selanjutnya"
                                  >
                                    <ChevronRight className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>

                          </div>

                        </div>
                      </div>
                    );
                  })()}

                  {currentTab === "penyuluhan" && (
                    <div className="space-y-6">
                      {/* Banner Info */}
                      <div className="bg-[#f0fdf4] border border-emerald-100 rounded-3xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-xl pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-5">
                          <div className="w-14 h-14 bg-emerald-700 text-white rounded-2xl flex items-center justify-center shadow-md grow-0 shrink-0">
                            <Sparkles className="h-7 w-7 animate-pulse" />
                          </div>
                          <div>
                            <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                              DIREKTORI RESMI KUA
                            </span>
                            <h3 className="text-lg font-extrabold text-emerald-950 mt-1 font-display">
                              Penyuluh Agama Islam KUA Pulau Dullah Utara
                            </h3>
                            <p className="text-xs text-emerald-800/80 mt-1 leading-relaxed">
                              Konsultasikan problematika keagamaan, bimbingan keluarga sakinah, muallaf, zakat/infak, waris, dan pembelajaran Al-Qur'an secara gratis langsung ke penyuluh tersertifikasi kami.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Educators Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {penyuluhList.map((educator) => (
                          <div 
                            key={educator.id}
                            className="bg-white rounded-3xl border border-slate-150 shadow-xxs hover:shadow-md hover:border-emerald-250 transition-all overflow-hidden flex flex-col justify-between"
                            id={`educator-card-${educator.id}`}
                          >
                            {/* Profile Header & Picture */}
                            <div className="p-5 flex gap-4 items-center">
                              {/* 3D Passport Photo */}
                              <div 
                                onClick={() => setSelectedPhotoViewer(educator)}
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-xs grow-0 shrink-0 relative group cursor-zoom-in"
                                title="Klik untuk memperbesar foto profil"
                              >
                                <img 
                                  src={educator.photo || educator.fallbackPhoto} 
                                  alt={educator.name} 
                                  className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-110"
                                  onError={(e) => {
                                    if (educator.fallbackPhoto) {
                                      e.currentTarget.src = educator.fallbackPhoto;
                                    }
                                  }}
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Maximize2 className="h-4 w-4 text-white drop-shadow-sm" />
                                </div>
                              </div>

                              {/* Details */}
                              <div className="space-y-1 truncate flex-1">
                                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug whitespace-normal">
                                  {educator.name}
                                </h4>
                                <p className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block max-w-full truncate">
                                  {educator.role || "Penyuluh Agama Islam"}
                                </p>
                                <p className="text-[10px] text-slate-450 font-mono">
                                  WhatsApp: +{educator.phone}
                                </p>
                              </div>
                            </div>

                            {/* Contact Action row */}
                            <div className="px-5 pb-5 pt-3 border-t border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center gap-2">
                              <a
                                href={`https://wa.me/${educator.phone}?text=Assalamu%27alaikum%20Warahmatullahi%20Wabarakatuh.%20Yth.%20${encodeURIComponent(educator.name)}.%20Saya%20ingin%2520berkonsultasi%2520mengenai%2520masalah%2520keagamaan.`}
                                target="_blank"
                                referrerPolicy="no-referrer"
                                className="w-full md:flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold flex items-center justify-center space-x-1 shadow-xxs transition-colors"
                              >
                                <Phone className="h-3 w-3" />
                                <span>Hubungi WA</span>
                              </a>
                              <div className="flex w-full md:w-auto items-center gap-2">
                                <button
                                  onClick={() => {
                                    setPenyuluhSelectedId(educator.id);
                                    setShowConsultationForm(true);
                                    setTimeout(() => {
                                      const element = document.getElementById("form-konsultasi-penyuluh");
                                      element?.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }, 150);
                                  }}
                                  className="flex-1 md:flex-none px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-750 hover:text-emerald-800 rounded-xl text-[11px] font-bold transition-all shadow-xxs flex items-center justify-center cursor-pointer border border-transparent"
                                  title="Pilih untuk Konsultasi"
                                >
                                  <FileText className="h-3.5 w-3.5 mr-1" />
                                  <span>Pilih</span>
                                </button>
                                
                                {isAdminLoggedIn && (
                                  <button
                                    onClick={() => handleEditPenyuluh(educator)}
                                    className="flex-1 md:flex-none px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 rounded-xl text-[11px] font-bold transition-all shadow-xxs flex items-center justify-center cursor-pointer"
                                    title="Edit Profil Penyuluh"
                                  >
                                    <Edit className="h-3.5 w-3.5 mr-1" />
                                    <span>Edit</span>
                                  </button>
                                )}
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>

                      {/* Interactive Consultation Form with Modern Reveal */}
                      <AnimatePresence>
                        {showConsultationForm && (
                          <motion.div 
                            id="form-konsultasi-penyuluh" 
                            initial={{ opacity: 0, height: 0, y: 20 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="bg-white rounded-3xl border border-slate-150 p-6 md:p-8 shadow-xs relative overflow-hidden mb-4"
                          >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
                            
                            <div className="mb-6 flex justify-between items-start gap-4">
                              <div>
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#15803d] bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                                  FORM KONSULTASI ONLINE
                                </span>
                                <h3 className="text-lg font-extrabold font-display text-emerald-950 mt-1.5 font-display">
                                  Konsultasi Langsung dengan Penyuluh Agama
                                </h3>
                                <p className="text-xs text-slate-500 mt-1 leading-normal">
                                  Isi formulir bimbingan rohani di bawah ini. Tombol kirim akan memformat pesan Anda secara rapi dan meneruskannya langsung via chat WhatsApp ke Penyuluh pilihan Anda.
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setShowConsultationForm(false)}
                                className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors cursor-pointer shrink-0"
                                title="Sembunyikan Form"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>

                            {penyuluhSubmitted ? (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-6 bg-[#f0fdf4] border border-emerald-100 rounded-2xl text-center space-y-4"
                              >
                                <div className="w-12 h-12 bg-emerald-105 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-md">
                                  <CheckCircle2 className="h-6 w-6 text-emerald-600 animate-bounce" />
                                </div>
                                <div>
                                  <h4 className="font-extrabold text-emerald-950 text-sm">Draft Konsultasi Berhasil Dibuat!</h4>
                                  <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto leading-relaxed">
                                    Teks konsultasi Anda telah diformat secara otomatis. Silakan selesaikan pengiriman chat di aplikasi WhatsApp yang baru saja terbuka.
                                  </p>
                                </div>
                                <div className="pt-2 flex justify-center gap-2">
                                  <button
                                    onClick={() => {
                                      const educator = penyuluhList.find(p => p.id === penyuluhSelectedId) || penyuluhList[0];
                                      const textFormatted = `Assalamu'alaikum Warahmatullahi Wabarakatuh,\n\nYth. *${educator.name}*\n(Penyuluh KUA Pulau Dullah Utara)\n\nPerihal: *Konsultasi ${penyuluhTopic}*\n\nBerikut adalah identitas saya:\n- Nama: *${penyuluhSenderName}*\n- No. WA: *${penyuluhSenderWa}*\n\nPertanyaan/Detail Konsultasi:\n_"${penyuluhQuery}"_\n\nMohon petunjuk dan bimbingannya. Terima kasih.`;
                                      const waUrl = `https://wa.me/${educator.phone}?text=${encodeURIComponent(textFormatted)}`;
                                      window.open(waUrl, "_blank");
                                    }}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xxs transition-colors cursor-pointer"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    <span>Kirim Ulang / Buka Lagi</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      setPenyuluhSubmitted(false);
                                      setPenyuluhQuery("");
                                    }}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                                  >
                                    Buat Pertanyaan Baru
                                  </button>
                                </div>
                              </motion.div>
                            ) : (
                              <form onSubmit={handlePenyuluhSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-705 uppercase mb-1">Nama Lengkap</label>
                                    <input
                                      type="text"
                                      required
                                      placeholder="Contoh: Husin Bugis"
                                      value={penyuluhSenderName}
                                      onChange={(e) => setPenyuluhSenderName(e.target.value)}
                                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-705 uppercase mb-1">Nomor WhatsApp Anda</label>
                                    <input
                                      type="text"
                                      required
                                      placeholder="Contoh: 081234xxxx"
                                      value={penyuluhSenderWa}
                                      onChange={(e) => setPenyuluhSenderWa(e.target.value)}
                                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-705 uppercase mb-1">Pilih Penyuluh Agama</label>
                                    <select
                                      value={penyuluhSelectedId}
                                      onChange={(e) => setPenyuluhSelectedId(e.target.value)}
                                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                                    >
                                      <option value="" disabled>-- Pilih Penyuluh --</option>
                                      {penyuluhList.map((educator) => (
                                        <option key={educator.id} value={educator.id}>
                                          {educator.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-705 uppercase mb-1">Topik Bimbingan</label>
                                    <select
                                      value={penyuluhTopic}
                                      onChange={(e) => setPenyuluhTopic(e.target.value)}
                                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                                    >
                                      <option value="Bimbingan Perkawinan">Bimbingan Pernikahan / Pranikah</option>
                                      <option value="Keluarga Sakinah">Hukum Syariah & Keluarga Sakinah</option>
                                      <option value="Muallaf Center">Bimbingan Muallaf & Pembinaan Aqidah</option>
                                      <option value="Zakat, Waris & Wakaf">Konsultasi Zakat, Waris, & Wakaf</option>
                                      <option value="Pembelajaran Al-Quran">Pembelajaran Al-Qur'an / Buta Aksara Huruf</option>
                                      <option value="Konsultasi Syariah Umum">Konsultasi Keagamaan / Syariah Umum</option>
                                    </select>
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-[10px] font-bold text-slate-705 uppercase mb-1">Detail Pertanyaan / Konsultasi</label>
                                  <textarea
                                    rows={4}
                                    required
                                    placeholder="Silakan tulis detail persoalan atau bimbingan yang ingin dikonsultasikan secara santun..."
                                    value={penyuluhQuery}
                                    onChange={(e) => setPenyuluhQuery(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
                                  />
                                </div>

                                <button
                                  type="submit"
                                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1 cursor-pointer"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  <span>Hubungi via WhatsApp &rarr;</span>
                                </button>
                              </form>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Header for supplementary materials */}
                      {currentLayanans.length > 0 && (
                        <div className="pt-6 border-t border-slate-100">
                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                            Materi Pendukung & Program Kerja Penyuluhan:
                          </h4>
                        </div>
                      )}
                    </div>
                  )}

                  {currentTab !== "penyuluhan" && (
                    currentLayanans.length === 0 ? (
                      <div className="p-8 border border-dashed border-slate-350 rounded-2xl text-center text-slate-400">
                        <AlertCircle className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                        <p className="text-sm">Belum ada item layanan terdaftar di kategori ini.</p>
                      </div>
                    ) : currentTab === "nikah" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {currentLayanans.map((serv) => {
                        const isLink = serv.type === "link";
                        const isYoutube = serv.type === "youtube";
                        const isWhatsapp = serv.type === "whatsapp";

                        return (
                          <div 
                            key={serv.id}
                            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-150 shadow-xxs hover:border-emerald-500 hover:shadow-xs hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between h-full min-h-[180px]"
                          >
                            <div className="space-y-3">
                              {/* Top Icon & Badge Row */}
                              <div className="flex items-center justify-between">
                                <div className="w-9 h-9 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center shrink-0">
                                  {renderLayananIcon(serv.icon)}
                                </div>
                                {isLink && <span className="text-[9px] bg-slate-100 text-slate-600 font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider text-right">Web</span>}
                                {isYoutube && <span className="text-[9px] bg-rose-50 text-rose-700 font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider text-right">Video</span>}
                                {isWhatsapp && <span className="text-[9px] bg-emerald-50 text-emerald-700 font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider text-right">WhatsApp</span>}
                              </div>

                              {/* Title & Description */}
                              <div className="space-y-1">
                                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                                  {serv.title}
                                </h4>
                                {serv.description && (
                                  <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">
                                    {serv.description}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Action Button at the bottom */}
                            <div className="pt-3 mt-auto border-t border-slate-100/50">
                              {isLink && serv.url && (
                                <a
                                  href={serv.url}
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  className="w-full py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-[10px] font-bold flex items-center justify-center space-x-1 transition-colors"
                                >
                                  <span>Buka Link Layanan</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}

                              {isYoutube && serv.url && (
                                <button
                                  onClick={() => playYoutubeVideo(serv.url!, serv.title)}
                                  className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-[10px] font-bold flex items-center justify-center space-x-1 cursor-pointer transition-colors"
                                >
                                  <span>Tonton Panduan</span>
                                  <Video className="h-3 w-3" />
                                </button>
                              )}

                              {isWhatsapp && serv.url && (
                                <a
                                  href={`${serv.url}?text=Assalamu%27alaikum%20Admin%20KUA%20Pulau%20Dullah%20Utara.%20Mohon%20konsultasi%20layanan%20${currentTab}.`}
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  className="w-full py-1.5 px-3 bg-emerald-600 hover:bg-emerald-750 text-white rounded-xl text-[10px] font-bold flex items-center justify-center space-x-1.5 transition-colors"
                                >
                                  <MessageSquare className="h-3.5 w-3.5" />
                                  <span>Mulai Konsultasi WA</span>
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
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
                                    <Info className="h-3 w-3" /> {currentTab === "penyuluhan" ? "detail program & materi bimbingan:" : "berkas persyaratan yang wajib disediakan:"}
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
                                        <div className="space-y-0.5">
                                          <h5 className="text-xs font-bold text-emerald-950">{step}</h5>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {serv.image && (
                                <div className="mt-4 overflow-hidden rounded-xl border border-slate-150 bg-slate-50 relative group">
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
                  ))}

                  {/* Standard bottom safety card */}
                  <div className="p-4 sm:p-5 bg-emerald-900 rounded-2xl text-white relative overflow-hidden shadow-md">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-700/30 rounded-full blur-xl" />
                    <h5 className="font-extrabold font-display text-xs mb-1 uppercase tracking-wider">PENTING BAGI WARGA</h5>
                    <p className="text-[10px] sm:text-[11px] text-emerald-100 font-normal leading-relaxed">
                      Segala pengurusan naskah, berkas dsb di Kantor KUA Pulau Dullah Utara **SAMA SEKALI TIDAK DIKENAKAN BIAYA (RP 0,-)** jika dilangsungkan di dalam kantor pada jam kerja operasional madani. Segera laporkan penyalahgunaan melalui link WhatsApp aduan kami.
                    </p>
                  </div>
                </div>

                {/* Right side contact information / sidebar widget instructions */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Category Fast Information Form */}
                  {currentTab !== "nikah" && (
                    <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs">
                      <h4 className="text-sm font-extrabold uppercase tracking-wide text-slate-400 mb-4">
                        {currentTab === "penyuluhan" ? "Pembinaan & Evaluasi" : "Layanan Cepat"}
                      </h4>
                      <div className="space-y-4">
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

                        {currentTab === "penyuluhan" && (
                          <div className="space-y-4">
                            {/* Card 1: Pembinaan Catin */}
                            <div className="bg-emerald-50/40 p-4 border border-emerald-100 rounded-2xl">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
                                  <Users className="h-4 w-4" />
                                </div>
                                <h5 className="text-[11px] font-extrabold text-emerald-950 uppercase tracking-wide">
                                  Pembinaan & Pendampingan Catin
                                </h5>
                              </div>
                              <p className="text-[11px] text-slate-650 leading-relaxed mb-3">
                                Pembinaan keluarga sakinah untuk calon pengantin (catin) secara terkonsep melalui bimbingan tatap muka atau konsultasi online bersama Penyuluh Agama Islam.
                              </p>
                              <button
                                onClick={() => {
                                  if (penyuluhList.length > 0) {
                                    setPenyuluhSelectedId(penyuluhList[0].id);
                                  }
                                  setShowConsultationForm(true);
                                  setTimeout(() => {
                                    const el = document.getElementById("form-konsultasi-penyuluh");
                                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                                  }, 150);
                                }}
                                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-[10px] font-bold shadow-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                              >
                                <MessageSquare className="h-3 w-3" />
                                <span>Hubungi Penyuluh Pembimbing</span>
                              </button>
                            </div>

                            {/* Card 2: Kuisioner Evaluasi */}
                            <div className="bg-[#fffbeb] p-4 border border-amber-200 rounded-2xl">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                                  <ClipboardList className="h-4 w-4" />
                                </div>
                                <h5 className="text-[11px] font-extrabold text-amber-950 uppercase tracking-wide">
                                  Kuesioner Evaluasi Layanan
                                </h5>
                              </div>
                              <p className="text-[11px] text-slate-650 leading-relaxed mb-3">
                                Berikan umpan balik evaluasi pelaksanaan bimbingan demi peningkatan mutu pembinaan kemasyarakatan di Pulau Dullah Utara.
                              </p>
                              <button
                                onClick={() => {
                                  setEvaluasiSubmitted(false);
                                  setShowEvaluasiModal(true);
                                }}
                                className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-[10px] font-bold shadow-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                              >
                                <ClipboardList className="h-3 w-3" />
                                <span>Mulai Isi Kuesioner</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Operation Hour Badge */}
                  {currentTab !== "nikah" && (
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                      <h4 className="text-[10px] font-extrabold uppercase text-emerald-950 tracking-wider mb-1.5 flex items-center space-x-1">
                        <Clock className="h-3.5 w-3.5 text-emerald-800" />
                        <span>Sesi Pelayanan Kantor</span>
                      </h4>
                      <ul className="space-y-1 text-[11px] text-slate-600 font-mono">
                        <li className="flex justify-between"><span>Senin - Kamis</span> <span className="font-bold text-slate-800">08:00 - 16:30 WIT</span></li>
                        <li className="flex justify-between"><span>Jumat</span> <span className="font-bold text-slate-800">08:30 - 17:00 WIT</span></li>
                        <li className="flex justify-between"><span>Sabtu - Minggu</span> <span className="text-rose-600 font-bold">Tutup</span></li>
                      </ul>
                    </div>
                  )}

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
                <button
                  onClick={() => setAdminActiveTab("penyuluh")}
                  className={`px-6 py-3 font-semibold text-xs tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                    adminActiveTab === "penyuluh"
                      ? "border-emerald-700 text-emerald-800 font-extrabold"
                      : "border-transparent text-slate-500 hover:text-emerald-700"
                  }`}
                >
                  Kelola Penyuluh Agama
                </button>
              </div>

              {/* VIEW 1: KELOLA LAYANAN */}
              {adminActiveTab === "layanan" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Form Create / Edit Layanan */}
                  <div id="form-layanan-edit" className="lg:col-span-5 bg-white p-6 rounded-3xl border border-emerald-50 shadow-xxs scroll-mt-24">
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
                          onChange={(e) => setEditingLayanan({ ...(editingLayanan || {}), title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Kategori</label>
                          <select
                            value={editingLayanan?.category || "nikah"}
                            onChange={(e) => setEditingLayanan({ ...(editingLayanan || {}), category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          >
                            <option value="nikah">💍 Nikah</option>
                            <option value="wakaf">📜 Wakaf</option>
                            <option value="muallaf">🕌 Muallaf</option>
                            <option value="penyuluhan">📢 Penyuluhan Agama Islam</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Tipe Aksi / Rendering</label>
                          <select
                            value={editingLayanan?.type || "info"}
                            onChange={(e) => setEditingLayanan({ ...(editingLayanan || {}), type: e.target.value as any })}
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
                          onChange={(e) => setEditingLayanan({ ...(editingLayanan || {}), icon: e.target.value })}
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
                          onChange={(e) => setEditingLayanan({ ...(editingLayanan || {}), url: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Deskripsi Ringkas</label>
                        <textarea
                          rows={2}
                          placeholder="Keterangan singkat tentang relevansi item layanan ini..."
                          value={editingLayanan?.description || ""}
                          onChange={(e) => setEditingLayanan({ ...(editingLayanan || {}), description: e.target.value })}
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
                              setEditingLayanan({ ...(editingLayanan || {}), image: url });
                            })}
                            className="block w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                          />
                        </div>
                        {editingLayanan?.image && (
                          <div className="mt-2 text-[11px] text-green-700 bg-green-50 p-2 rounded-lg flex items-center justify-between">
                            <span className="truncate">Telah terpilih: {editingLayanan.image}</span>
                            <button 
                              onClick={() => setEditingLayanan({ ...(editingLayanan || {}), image: "" })}
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
                      {db?.layanan.map((serv) => {
                        const isBeingEdited = editingLayanan?.id === serv.id;
                        return (
                          <div 
                            key={serv.id}
                            className={`p-4 rounded-2xl flex items-center justify-between gap-4 transition-all duration-200 border ${
                              isBeingEdited 
                                ? "bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs" 
                                : "bg-slate-50 border-slate-100"
                            }`}
                          >
                            <div className="truncate">
                              <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                                <span className={`text-xs font-bold truncate ${isBeingEdited ? "text-emerald-900 font-extrabold" : "text-slate-900"}`}>{serv.title}</span>
                                <span className="text-[9px] uppercase font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-sm shrink-0">
                                  {serv.category}
                                </span>
                                {isBeingEdited && (
                                  <span className="text-[9px] uppercase font-bold bg-amber-100 text-amber-850 px-1.5 py-0.5 rounded-sm shrink-0 animate-pulse">
                                    ✏️ Sedang Diedit
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-500 truncate mt-0.5">Tipe-Aksi: <span className="font-mono text-emerald-700">{serv.type}</span> {serv.url ? `| URL: ${serv.url}` : ""}</p>
                            </div>

                            <div className="flex items-center space-x-1 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingLayanan(serv);
                                  setLayananFormContentInput(serv.content ? serv.content.join("\n") : "");
                                  setTimeout(() => {
                                    const element = document.getElementById("form-layanan-edit");
                                    element?.scrollIntoView({ behavior: "smooth", block: "start" });
                                  }, 50);
                                }}
                                className="p-1.5 hover:bg-emerald-50 text-emerald-700 rounded-lg transition-colors cursor-pointer"
                                title="Edit Layanan"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteLayanan(serv.id, serv.title)}
                                className="p-1.5 hover:bg-rose-50 text-rose-700 rounded-lg transition-colors cursor-pointer"
                                title="Hapus Layanan"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
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
                            onClick={() => deletePengumuman(item.id, item.title)}
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
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Form Penyuluhan Agama Islam</label>
                          <input
                            type="text"
                            placeholder="https://forms.gle/..."
                            value={settingsForm.googleFormPenyuluhan || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, googleFormPenyuluhan: e.target.value })}
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

                  {/* Integrasi Akun Media Sosial */}
                  <div className="space-y-4 mb-6">
                    <div className="border border-emerald-100/50 rounded-2xl p-4 bg-emerald-50/10">
                      <h4 className="text-xs font-extrabold uppercase text-emerald-950 mb-1 tracking-wider">Integrasi Media Sosial Resmi KUA</h4>
                      <p className="text-[10px] text-slate-500 mb-4 font-sans">Koneksikan platform media sosial resmi KUA agar pengguna dapat mengeklik ikon media sosial langsung di bagian kanan/bawah halaman depan.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">URL Facebook KUA</label>
                          <input
                            type="text"
                            placeholder="https://facebook.com/..."
                            value={settingsForm.facebookUrl || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">URL Instagram KUA</label>
                          <input
                            type="text"
                            placeholder="https://instagram.com/..."
                            value={settingsForm.instagramUrl || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">URL Twitter / X KUA</label>
                          <input
                            type="text"
                            placeholder="https://twitter.com/..."
                            value={settingsForm.twitterUrl || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, twitterUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">URL TikTok KUA</label>
                          <input
                            type="text"
                            placeholder="https://tiktok.com/@..."
                            value={settingsForm.tiktokUrl || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, tiktokUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">URL YouTube KUA</label>
                          <input
                            type="text"
                            placeholder="https://youtube.com/@..."
                            value={settingsForm.youtubeUrl || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, youtubeUrl: e.target.value })}
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
                      <textarea
                        rows={2}
                        placeholder="KANTOR URUSAN AGAMA\nPULAU DULLAH UTARA"
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

                  <hr className="border-slate-100 my-6" />

                  {/* Kepala KUA config */}
                  <div className="space-y-4 mb-6">
                    <h4 className="text-xs font-extrabold uppercase text-emerald-950 tracking-wider">Identitas Kepala Kantor KUA</h4>
                    <p className="text-[10px] text-slate-500">Sesuaikan nama resmi dan foto/gambar Kepala Kantor Urusan Agama Kecamatan Pulau Dullah Utara yang akan tampil pada halaman profil.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Nama Lengkap Kepala KUA (Beserta Gelar)</label>
                        <input
                          type="text"
                          placeholder="H. Ahmad, S.Ag."
                          value={settingsForm.kepalaKuaName || ""}
                          onChange={(e) => setSettingsForm({ ...settingsForm, kepalaKuaName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      {/* Photo upload for Kepala KUA */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Foto Kepala KUA</label>
                        {settingsForm.kepalaKuaImg ? (
                          <div className="flex items-center space-x-3 bg-slate-50 p-2 border border-slate-200 rounded-xl">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-300">
                              <img src={settingsForm.kepalaKuaImg} alt="Kepala KUA Preview" className="w-full h-full object-cover" />
                            </div>
                            <button 
                              type="button" 
                              onClick={() => setSettingsForm({ ...settingsForm, kepalaKuaImg: "" })}
                              className="text-white text-[10px] font-bold bg-rose-600 px-2.5 py-1 rounded cursor-pointer hover:bg-rose-700 transition"
                            >
                              Hapus Foto
                            </button>
                          </div>
                        ) : (
                          <div className="relative border border-dashed border-slate-300 rounded-xl bg-white p-3 hover:bg-slate-50 transition flex items-center justify-center">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, "settings", (url) => setSettingsForm({ ...settingsForm, kepalaKuaImg: url }))}
                              className="hidden"
                              id="settings-kepala-kua-img"
                            />
                            <label htmlFor="settings-kepala-kua-img" className="cursor-pointer text-center flex items-center space-x-1.5">
                              <Upload className="h-4 w-4 text-emerald-700" />
                              <span className="text-[11px] text-emerald-700 font-bold hover:underline">Unggah Foto Kepala KUA</span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100 my-6" />

                  {/* Statistik KUA Image Config */}
                  <div className="space-y-4 mb-6">
                    <h4 className="text-xs font-extrabold uppercase text-emerald-950 tracking-wider">Gambar Infografis Statistik KUA</h4>
                    <p className="text-[10px] text-slate-500">Gunakan fitur ini untuk merubah gambar data/statistik yang tampil di halaman beranda. Anda dapat mengunggah gambar buatan sendiri yang memuat informasi statistik secara visual.</p>
                    
                    <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-4 max-w-lg">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Gambar Banner Statistik</label>
                      {settingsForm.statistikImg ? (
                        <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-emerald-950 max-h-56">
                          <img src={settingsForm.statistikImg} alt="Preview Statistik" className="w-full h-auto object-cover max-h-56" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <button 
                              type="button" 
                              onClick={() => setSettingsForm({ ...settingsForm, statistikImg: "" })}
                              className="text-white text-[10px] font-bold bg-rose-600 px-3 py-1.5 rounded cursor-pointer hover:bg-rose-700 transition"
                            >
                              Ganti / Hapus Gambar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-32 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center bg-white p-3">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "settings", (url) => setSettingsForm({ ...settingsForm, statistikImg: url }))}
                            className="hidden"
                            id="settings-statistik-img"
                          />
                          <label htmlFor="settings-statistik-img" className="cursor-pointer text-center">
                            <Upload className="h-6 w-6 mx-auto text-slate-400 mb-1.5" />
                            <span className="text-xs text-emerald-700 font-bold hover:underline">Unggah Gambar Statistik Baru</span>
                          </label>
                        </div>
                      )}
                      <p className="text-[9px] text-slate-450">Rekomendasi format: PNG/JPG memanjang ke samping (landscape) dengan resolusi tajam agar teks terbaca jelas.</p>
                    </div>
                  </div>

                  <hr className="border-slate-100 my-6" />

                  {/* Poster uploaders for Berkas Umum, Berkas Khusus, and Alur Nikah */}
                  <div className="space-y-4 mb-6">
                    <h4 className="text-xs font-extrabold uppercase text-emerald-950 tracking-wider">Poster Persyaratan & Alur Nikah</h4>
                    <p className="text-[10px] text-slate-500">Anda dapat mengunggah atau mengganti gambar/poster Syarat Berkas Nikah Umum, Khusus, dan Alur Pendaftaran secara dinamis di sini.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Upload Berkas Umum */}
                      <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                        <label className="block text-xs font-bold text-slate-705 mb-1">Poster Berkas Nikah Umum</label>
                        {settingsForm.berkasNikahImg ? (
                          <div className="relative group w-32 h-32 mx-auto rounded-lg overflow-hidden border border-slate-200">
                            <img src={settingsForm.berkasNikahImg} alt="Preview Umum" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <button 
                                type="button" 
                                onClick={() => setSettingsForm({ ...settingsForm, berkasNikahImg: "" })}
                                className="text-white text-[10px] font-bold bg-rose-600 px-2 py-1 rounded cursor-pointer"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-24 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center bg-white p-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, "settings", (url) => setSettingsForm({ ...settingsForm, berkasNikahImg: url }))}
                              className="hidden"
                              id="settings-berkas-umum"
                            />
                            <label htmlFor="settings-berkas-umum" className="cursor-pointer text-center">
                              <Upload className="h-5 w-5 mx-auto text-slate-400 mb-1" />
                              <span className="text-[10px] text-emerald-700 font-bold hover:underline">Unggah Gambar Umum</span>
                            </label>
                          </div>
                        )}
                        <p className="text-[9px] text-slate-450 text-center">Rekomendasi format: PNG/JPG persegi atau portrait</p>
                      </div>

                      {/* Upload Berkas Khusus */}
                      <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                        <label className="block text-xs font-bold text-slate-705 mb-1">Poster Berkas Nikah Khusus</label>
                        {settingsForm.alurNikahImg ? (
                          <div className="relative group w-32 h-32 mx-auto rounded-lg overflow-hidden border border-slate-200">
                            <img src={settingsForm.alurNikahImg} alt="Preview Khusus" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <button 
                                type="button" 
                                onClick={() => setSettingsForm({ ...settingsForm, alurNikahImg: "" })}
                                className="text-white text-[10px] font-bold bg-rose-600 px-2 py-1 rounded cursor-pointer"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-24 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center bg-white p-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, "settings", (url) => setSettingsForm({ ...settingsForm, alurNikahImg: url }))}
                              className="hidden"
                              id="settings-berkas-khusus"
                            />
                            <label htmlFor="settings-berkas-khusus" className="cursor-pointer text-center">
                              <Upload className="h-5 w-5 mx-auto text-slate-400 mb-1" />
                              <span className="text-[10px] text-emerald-700 font-bold hover:underline">Unggah Gambar Khusus</span>
                            </label>
                          </div>
                        )}
                        <p className="text-[9px] text-slate-450 text-center">Rekomendasi format: PNG/JPG persegi atau portrait</p>
                      </div>

                      {/* Upload Alur Pendaftaran Nikah */}
                      <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                        <label className="block text-xs font-bold text-slate-750 mb-1">Poster Alur Pendaftaran</label>
                        {settingsForm.alurProsesNikahImg ? (
                          <div className="relative group w-32 h-32 mx-auto rounded-lg overflow-hidden border border-slate-200">
                            <img src={settingsForm.alurProsesNikahImg} alt="Preview Alur" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <button 
                                type="button" 
                                onClick={() => setSettingsForm({ ...settingsForm, alurProsesNikahImg: "" })}
                                className="text-white text-[10px] font-bold bg-rose-600 px-2 py-1 rounded cursor-pointer"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-24 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center bg-white p-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, "settings", (url) => setSettingsForm({ ...settingsForm, alurProsesNikahImg: url }))}
                              className="hidden"
                              id="settings-alur-proses"
                            />
                            <label htmlFor="settings-alur-proses" className="cursor-pointer text-center">
                              <Upload className="h-5 w-5 mx-auto text-slate-400 mb-1" />
                              <span className="text-[10px] text-emerald-700 font-bold hover:underline">Unggah Gambar Alur</span>
                            </label>
                          </div>
                        )}
                        <p className="text-[9px] text-slate-450 text-center">Rekomendasi format: PNG/JPG persegi atau portrait</p>
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100 my-6" />

                  {/* Logo Kantor & Gambar Latar Beranda (Hero Background) */}
                  <div className="space-y-4 mb-6">
                    <h4 className="text-xs font-extrabold uppercase text-emerald-950 tracking-wider">Logo & Latar Belakang Depan</h4>
                    <p className="text-[10px] text-slate-500">Anda dapat mengubah logo instansi (logo utama bulat di tengah & logo pendamping pojok atas/bawah) serta gambar latar belakang (background) beranda depan di bawah ini.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Upload Logo Kantor */}
                      <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                        <label className="block text-xs font-bold text-slate-750 mb-1">Logo Instansi Utama (Bulat Tengah)</label>
                        {settingsForm.logoImg ? (
                          <div className="relative group w-32 h-32 mx-auto rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center bg-white p-2">
                            <img src={settingsForm.logoImg} alt="Preview Logo" className="max-w-full max-h-full object-contain" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <button 
                                type="button" 
                                onClick={() => setSettingsForm({ ...settingsForm, logoImg: "" })}
                                className="text-white text-[10px] font-bold bg-rose-600 px-2 py-1 rounded cursor-pointer"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-24 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center bg-white p-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, "settings", (url) => setSettingsForm({ ...settingsForm, logoImg: url }))}
                              className="hidden"
                              id="settings-logo-kantor"
                            />
                            <label htmlFor="settings-logo-kantor" className="cursor-pointer text-center">
                              <Upload className="h-5 w-5 mx-auto text-slate-400 mb-1" />
                              <span className="text-[10px] text-emerald-700 font-bold hover:underline">Unggah Logo Utama</span>
                            </label>
                          </div>
                        )}
                        <p className="text-[9px] text-slate-450 text-center">Disarankan format PNG transparan berkualitas tinggi</p>
                      </div>

                      {/* Upload Logo Pojok Instansi */}
                      <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                        <label className="block text-xs font-bold text-slate-750 mb-1">Logo Pendamping Pojok (Header & Footer)</label>
                        {settingsForm.secondaryLogoImg ? (
                          <div className="relative group w-32 h-32 mx-auto rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center bg-white p-2">
                            <img src={settingsForm.secondaryLogoImg} alt="Preview Logo Pojok" className="max-w-full max-h-full object-contain" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <button 
                                type="button" 
                                onClick={() => setSettingsForm({ ...settingsForm, secondaryLogoImg: "" })}
                                className="text-white text-[10px] font-bold bg-rose-600 px-2 py-1 rounded cursor-pointer"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-24 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center bg-white p-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, "settings", (url) => setSettingsForm({ ...settingsForm, secondaryLogoImg: url }))}
                              className="hidden"
                              id="settings-logo-secondary"
                            />
                            <label htmlFor="settings-logo-secondary" className="cursor-pointer text-center">
                              <Upload className="h-5 w-5 mx-auto text-slate-400 mb-1" />
                              <span className="text-[10px] text-emerald-700 font-bold hover:underline">Unggah Logo Pojok</span>
                            </label>
                          </div>
                        )}
                        <p className="text-[9px] text-slate-450 text-center">Tampil di header samping teks & footer</p>
                      </div>

                      {/* Upload Latar Belakang Beranda */}
                      <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                        <label className="block text-xs font-bold text-slate-750 mb-1">Gambar Latar Belakang Beranda (Hero Background)</label>
                        {settingsForm.heroBgImg ? (
                          <div className="relative group w-48 h-32 mx-auto rounded-lg overflow-hidden border border-slate-200">
                            <img src={settingsForm.heroBgImg} alt="Preview Background" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <button 
                                type="button" 
                                onClick={() => setSettingsForm({ ...settingsForm, heroBgImg: "" })}
                                className="text-white text-[10px] font-bold bg-rose-600 px-2 py-1 rounded cursor-pointer"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-24 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center bg-white p-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, "settings", (url) => setSettingsForm({ ...settingsForm, heroBgImg: url }))}
                              className="hidden"
                              id="settings-bg-beranda"
                            />
                            <label htmlFor="settings-bg-beranda" className="cursor-pointer text-center">
                              <Upload className="h-5 w-5 mx-auto text-slate-400 mb-1" />
                              <span className="text-[10px] text-emerald-700 font-bold hover:underline">Unggah Gambar Background</span>
                            </label>
                          </div>
                        )}
                        <p className="text-[9px] text-slate-450 text-center">Format landscape berkualitas tinggi (min. 1280x720)</p>
                      </div>
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

              {/* VIEW 4: KELOLA PENYULUH AGAMA */}
              {adminActiveTab === "penyuluh" && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-50 shadow-xxs max-w-4xl mx-auto">
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-sm font-extrabold uppercase tracking-widest text-emerald-800">
                        Kelola Profil Penyuluh Agama Islam
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Daftar lengkap 7 penyuluh agama (4 perempuan, 3 laki-laki) yang terdaftar aktif dalam pangkalan data KUA. Hubungkan foto 3D dan atur nomor WA aktif masing-masing.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {penyuluhList.map((p) => (
                      <div 
                        key={p.id}
                        className="bg-slate-50/50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 hover:border-emerald-250 transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-200 grow-0 shrink-0">
                            <img 
                              src={p.photo || p.fallbackPhoto} 
                              alt={p.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                if (p.fallbackPhoto) {
                                  e.currentTarget.src = p.fallbackPhoto;
                                }
                              }}
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">{p.name}</h4>
                            <p className="text-[9px] text-slate-550 font-mono truncate">WA: +{p.phone}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleEditPenyuluh(p)}
                          className="px-3 py-1.5 bg-white hover:bg-amber-50 text-amber-850 hover:text-amber-900 border border-slate-200 hover:border-amber-200 rounded-xl text-[10px] font-bold transition-all shadow-xxs cursor-pointer flex items-center space-x-1"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>
                      </div>
                    ))}
                  </div>
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
                {defaultSettings.secondaryLogoImg || defaultSettings.logoImg ? (
                  <div className="w-11 h-11 flex items-center justify-center overflow-hidden">
                    <img 
                      src={defaultSettings.secondaryLogoImg || defaultSettings.logoImg} 
                      alt="Logo Footer" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="p-2.5 bg-emerald-700 rounded-xl">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-bold font-display uppercase tracking-widest text-emerald-300">
                    KUA PULAU DULLAH UTARA
                  </h4>
                  <p className="text-[10px] text-emerald-600 font-extrabold tracking-wider uppercase">
                    Kementerian Agama Kota Tual
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Portal Pelayanan Terpadu Digital Mandiri Kecamatan Pulau Dullah Utara, Kota Tual. Nikah, Wakaf dan Konseling Muallaf Center berbasis keterbukaan teknologi publik.
              </p>

              {/* Clickable Social Media Links */}
              {(defaultSettings.facebookUrl || defaultSettings.instagramUrl || defaultSettings.twitterUrl || defaultSettings.tiktokUrl || defaultSettings.youtubeUrl) && (
                <div className="flex flex-col space-y-2 pt-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-400">Media Sosial Kami:</span>
                  <div className="flex items-center space-x-2.5">
                    {defaultSettings.facebookUrl && (
                      <a 
                        href={defaultSettings.facebookUrl.startsWith("http") ? defaultSettings.facebookUrl : `https://${defaultSettings.facebookUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 border border-slate-700/50 shadow-sm"
                        title="Facebook Resmi KUA"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                    )}
                    {defaultSettings.instagramUrl && (
                      <a 
                        href={defaultSettings.instagramUrl.startsWith("http") ? defaultSettings.instagramUrl : `https://${defaultSettings.instagramUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 border border-slate-700/50 shadow-sm"
                        title="Instagram Resmi KUA"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                    )}
                    {defaultSettings.twitterUrl && (
                      <a 
                        href={defaultSettings.twitterUrl.startsWith("http") ? defaultSettings.twitterUrl : `https://${defaultSettings.twitterUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 border border-slate-700/50 shadow-sm"
                        title="Twitter / X Resmi KUA"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                    {defaultSettings.tiktokUrl && (
                      <a 
                        href={defaultSettings.tiktokUrl.startsWith("http") ? defaultSettings.tiktokUrl : `https://${defaultSettings.tiktokUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 border border-slate-700/50 shadow-sm"
                        title="TikTok Resmi KUA"
                      >
                        <Music className="h-4 w-4" />
                      </a>
                    )}
                    {defaultSettings.youtubeUrl && (
                      <a 
                        href={defaultSettings.youtubeUrl.startsWith("http") ? defaultSettings.youtubeUrl : `https://${defaultSettings.youtubeUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 border border-slate-700/50 shadow-sm"
                        title="YouTube Resmi KUA"
                      >
                        <Youtube className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick map links */}
            <div>
              <h5 className="font-bold font-display text-emerald-300 text-xs font-mono uppercase tracking-widest mb-4">Layanan Cepat</h5>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => setCurrentTab("nikah")} className="hover:text-emerald-300">💍 Layanan Nikah Online</button></li>
                <li><button onClick={() => setCurrentTab("wakaf")} className="hover:text-emerald-300">📜 Sertifikasi Tanah Wakaf</button></li>
                <li><button onClick={() => setCurrentTab("muallaf")} className="hover:text-emerald-300">🕌 Persyaratan Ikrar Muallaf</button></li>
                <li><button onClick={() => setCurrentTab("penyuluhan")} className="hover:text-emerald-300">📢 Penyuluhan Agama Islam</button></li>
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
      <AnimatePresence>
        {customModalImage && (
          <div 
            id="imageModal" 
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 cursor-pointer"
            onClick={(e) => {
              // Tutup saat klik background luar
              if (e.target === e.currentTarget) {
                setCustomModalImage(null);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tutup Button */}
              <button
                onClick={() => setCustomModalImage(null)}
                className="absolute -top-12 right-0 md:-top-3 md:-right-12 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105"
                title="Tutup Preview"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Box Image Wrapper */}
              <div className="bg-white/5 p-1 rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center max-w-full max-h-[80vh] md:max-h-[85vh]">
                <img 
                  className="max-h-[75vh] md:max-h-[80vh] max-w-full object-contain rounded-2xl" 
                  id="modalImage" 
                  src={customModalImage} 
                  alt="Pratinjau Berkas Persyaratan"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Footer text preview info */}
              <span className="text-[11px] text-slate-400 mt-4 text-center font-medium select-none tracking-wide bg-slate-900/50 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-xs">
                Klik area luar gambar atau tombol (X) untuk kembali
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PENYULUH PHOTO LIGHTBOX POPUP */}
      <AnimatePresence>
        {selectedPhotoViewer && (
          <div 
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 cursor-pointer"
            onClick={() => setSelectedPhotoViewer(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-md w-full flex flex-col items-center bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-2xl p-6 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhotoViewer(null)}
                className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-all cursor-pointer"
                title="Tutup"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center w-full mt-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#15803d] bg-emerald-50 px-2.5 py-1 rounded-md inline-block mb-3">
                  Profil Penyuluh Agama Islam
                </span>
                <h3 className="text-base font-extrabold text-slate-900 font-display">
                  {selectedPhotoViewer.name}
                </h3>
                <p className="text-xs text-emerald-600 font-bold mt-0.5">
                  {selectedPhotoViewer.role || "Penyuluh Agama Islam"}
                </p>
              </div>

              {/* Photo Frame with 3D passport feel & border */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden bg-slate-50 border-4 border-slate-100 shadow-lg mt-4 mb-4 relative">
                <img 
                  src={selectedPhotoViewer.photo || selectedPhotoViewer.fallbackPhoto} 
                  alt={selectedPhotoViewer.name}
                  className="w-full h-full object-cover select-none"
                  onError={(e) => {
                    if (selectedPhotoViewer.fallbackPhoto) {
                      e.currentTarget.src = selectedPhotoViewer.fallbackPhoto;
                    }
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full bg-slate-50 hover:bg-emerald-50/50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between text-xs transition-colors">
                <div className="text-left font-mono">
                  <p className="text-[10px] text-slate-450 font-bold uppercase">Nomor WhatsApp</p>
                  <p className="font-bold text-slate-800">+{selectedPhotoViewer.phone}</p>
                </div>
                <a
                  href={`https://wa.me/${selectedPhotoViewer.phone}?text=Assalamu%27alaikum%20Warahmatullahi%20Wabarakatuh.%20Yth.%20${encodeURIComponent(selectedPhotoViewer.name)}.%20Saya%20ingin%2520berkonsultasi.`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xxs transition-colors"
                >
                  <Phone className="h-3 w-3" />
                  <span>Kirim Pesan</span>
                </a>
              </div>

              <span className="text-[10px] text-slate-400 mt-3 text-center">
                Klik area mana saja di luar untuk kembali
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================
         CUSTOM DELETE CONFIRMATION MODAL POPUP
      ========================= */}
      <AnimatePresence>
        {deleteConfirm && (
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 cursor-pointer animate-fade-in"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl overflow-hidden max-w-sm w-full border border-slate-100 shadow-2xl p-6 relative cursor-default space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 text-rose-600">
                <div className="p-3 bg-rose-50 rounded-2xl">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Konfirmasi Hapus</h3>
                  <p className="text-[10px] text-slate-500 font-medium">Tindakan ini tidak dapat dibatalkan</p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  Apakah Anda yakin ingin menghapus {deleteConfirm.type === "layanan" ? "layanan" : "pengumuman"} berikut?
                </p>
                <p className="text-xs font-black text-rose-700 mt-1 truncate">
                  "{deleteConfirm.title}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(null)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                >
                  Batalkan
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={isSubmitting}
                  className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer text-center flex items-center justify-center space-x-1"
                >
                  <span>{isSubmitting ? "Menghapus..." : "Ya, Hapus"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================
         EDIT PROFIL PENYULUH MODAL POPUP
      ========================= */}
      <AnimatePresence>
        {editingPenyuluh && (
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 cursor-pointer animate-fade-in"
            onClick={() => setEditingPenyuluh(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl overflow-hidden max-w-md w-full border border-slate-100 shadow-2xl p-6 relative cursor-default space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2 text-emerald-800">
                  <Edit className="h-5 w-5" />
                  <h3 className="text-sm font-extrabold text-slate-900">Edit Profil Penyuluh Agama</h3>
                </div>
                <button 
                  onClick={() => setEditingPenyuluh(null)}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-650 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSavePenyuluh} className="space-y-4">
                {/* Photo Upload and Preview section */}
                <div className="flex flex-col items-center space-y-3 bg-slate-50 border border-slate-150 rounded-2xl p-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 bg-white relative group shadow-sm">
                    <img 
                      src={editingPenyuluhPhoto || editingPenyuluh.fallbackPhoto} 
                      alt="Preview Foto" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="w-full">
                    <label className="block text-center text-[10px] font-bold text-slate-500 uppercase mb-1">Unggah / Ganti Foto Penyuluh</label>
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={handlePenyuluhPhotoUpload}
                      className="block w-full text-xs text-slate-550 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Name field */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Nama Penyuluh</label>
                  <input 
                    type="text"
                    required
                    value={editingPenyuluhName}
                    onChange={(e) => setEditingPenyuluhName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
                    placeholder="Contoh: Khadijah Al-Munawwarah, M.Ag"
                  />
                </div>

                {/* WhatsApp field */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Nomor WhatsApp (Kode Negara, Tanpa '+')</label>
                  <input 
                    type="text"
                    required
                    value={editingPenyuluhPhone}
                    onChange={(e) => setEditingPenyuluhPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono bg-slate-50/50"
                    placeholder="Contoh: 6281240912842"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingPenyuluh(null)}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    Batalkan
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingPenyuluh}
                    className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer text-center flex items-center justify-center"
                  >
                    <span>{isSubmittingPenyuluh ? "Menyimpan..." : "Simpan"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showEvaluasiModal && (
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 cursor-pointer animate-fade-in"
            onClick={() => setShowEvaluasiModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-50 rounded-3xl overflow-hidden max-w-6xl w-full border border-slate-150 shadow-2xl p-4 sm:p-6 relative cursor-default max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4 no-print">
                <div className="flex items-center space-x-2 text-emerald-800">
                  <ClipboardList className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-sm font-extrabold text-slate-900">Penyesuaian Format & Cetak PDF Kuesioner Evaluasi KUA</h3>
                </div>
                <button 
                  onClick={() => setShowEvaluasiModal(false)}
                  className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-650 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Split Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-y-auto flex-grow pr-1 no-print">
                {/* COLUMN 1: EDIT LAYOUT DETAILS (LEFT) */}
                <div className="lg:col-span-5 space-y-4 max-h-[75vh] overflow-y-auto pr-1">
                  <div className="bg-amber-50/70 border border-amber-200/60 p-3 rounded-2xl text-[11px] text-amber-900 leading-relaxed">
                    <strong>Petunjuk Format KUA:</strong> Sesuaikan isian di bawah ini. Tabel pratinjau di sebelah kanan akan berubah secara langsung. Anda dapat langsung mengunduh/mencetak dokumen hasil bimbingan perkawinan berupa PDF.
                  </div>

                  {/* SECTION 1: IDENTITAS PESERTA */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-slate-600" />
                      <span>Identitas Pasangan (Catin)</span>
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Nama Peserta Pria</label>
                        <input 
                          type="text"
                          value={evaluasiCatinPria}
                          onChange={(e) => setEvaluasiCatinPria(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-bold text-slate-800 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Nama Peserta Wanita</label>
                        <input 
                          type="text"
                          value={evaluasiCatinWanita}
                          onChange={(e) => setEvaluasiCatinWanita(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-bold text-slate-800 bg-slate-50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">No. WhatsApp / HP</label>
                        <input 
                          type="text"
                          value={evaluasiCatinPhone}
                          onChange={(e) => setEvaluasiCatinPhone(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-mono text-slate-800 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Tahun Kegiatan</label>
                        <input 
                          type="text"
                          value={evaluasiTahun}
                          onChange={(e) => setEvaluasiTahun(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-bold text-slate-800 bg-slate-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: IDENTITAS PENYULUH / NARASUMBER */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-slate-600" />
                      <span>Penyuluh / Narasumber</span>
                    </h4>

                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Pilih Cepat dari Database</label>
                      <select
                        value={evaluasiPenyuluhId}
                        onChange={(e) => handlePenyuluhSelectForEvaluasi(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-800 bg-slate-50 font-bold"
                      >
                        <option value="">-- Pilih & Gunakan Data Penyuluh --</option>
                        {penyuluhList.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Nama Lengkap & Gelar</label>
                        <input 
                          type="text"
                          value={evaluasiPenyuluhName}
                          onChange={(e) => setEvaluasiPenyuluhName(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-800 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">NIP</label>
                        <input 
                          type="text"
                          value={evaluasiPenyuluhNip}
                          onChange={(e) => setEvaluasiPenyuluhNip(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-mono text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Pangkat/Golongan</label>
                        <input 
                          type="text"
                          value={evaluasiPenyuluhPangkat}
                          onChange={(e) => setEvaluasiPenyuluhPangkat(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Jabatan Pokok</label>
                        <input 
                          type="text"
                          value={evaluasiPenyuluhJabatan}
                          onChange={(e) => setEvaluasiPenyuluhJabatan(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Tempat Tugas</label>
                        <input 
                          type="text"
                          value={evaluasiPenyuluhTempatTugas}
                          onChange={(e) => setEvaluasiPenyuluhTempatTugas(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Unit Kerja KUA</label>
                        <input 
                          type="text"
                          value={evaluasiPenyuluhUnitKerja}
                          onChange={(e) => setEvaluasiPenyuluhUnitKerja(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-800 font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: KEGIATAN & TEMA */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-100">Kegiatan & Tanggal</h4>
                    
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Nama Kegiatan</label>
                      <input 
                        type="text"
                        value={evaluasiKegiatan}
                        onChange={(e) => setEvaluasiKegiatan(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Tema Penataran</label>
                      <input 
                        type="text"
                        value={evaluasiTema}
                        onChange={(e) => setEvaluasiTema(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-800 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Waktu Pelaksanaan (Hari, Tanggal Bulan Tahun)</label>
                      <input 
                        type="text"
                        value={evaluasiHariTanggal}
                        onChange={(e) => setEvaluasiHariTanggal(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-800"
                      />
                    </div>
                  </div>

                  {/* SECTION 4: PEMANTAUAN & RATING INSTRUMEN */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-4">
                    <h4 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-100">Hasil Penilaian Ceklist</h4>
                    
                    {[
                      { key: "q3", num: "3", text: "Kesesuaian penyampaian materi dengan tema:" },
                      { key: "q4", num: "4", text: "Kesesuaian metode penyampaian secara sistematis:" },
                      { key: "q5", num: "5", text: "Kejelasan pesan tema tersampaikan ke peserta:" },
                      { key: "q6", num: "6", text: "Kelayakan sarana prasarana penunjang kegiatan:" },
                      { key: "q7", num: "7", text: "Antusiasme narasumber, motivasi, dan keaktifan:" },
                      { key: "q8", num: "8", text: "Kelayakan manfaat materi bimbingan di masa depan:" }
                    ].map((item) => (
                      <div key={item.key} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                        <div className="text-xs">
                          <span className="font-bold text-emerald-800 font-mono">{item.num}.</span> <span className="text-slate-700 font-medium">{item.text}</span>
                        </div>
                        {/* Rating scale radio list */}
                        <div className="flex flex-wrap gap-1">
                          {["Cukup", "Sedang", "Baik", "Cukup Baik", "Sangat Baik"].map((scale) => (
                            <button
                              key={scale}
                              type="button"
                              onClick={() => setEvaluasiRatings(prev => ({ ...prev, [item.key]: scale }))}
                              className={`px-2 py-1 text-[9px] font-bold rounded-md border transition-all cursor-pointer ${
                                evaluasiRatings[item.key] === scale 
                                  ? "bg-emerald-600 text-white border-emerald-600 scale-102" 
                                  : "bg-white text-slate-600 border-slate-250 hover:bg-slate-100"
                              }`}
                            >
                              {scale}
                            </button>
                          ))}
                        </div>
                        {/* Comments */}
                        <div>
                          <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">Hasil Pemantauan / Penjelasan</label>
                          <input 
                            type="text"
                            placeholder="Tulis hasil pemantauan untuk item ini..."
                            value={evaluasiComments[item.key] || ""}
                            onChange={(e) => setEvaluasiComments(prev => ({ ...prev, [item.key]: e.target.value }))}
                            className="w-full px-2 py-1 border border-slate-200 rounded text-[10px] text-slate-800"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* SECTION 5: OTORISASI TANDA TANGAN DIGITAL */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                    <div>
                      <h4 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center gap-1.5 font-sans">
                        <PenTool className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Otorisasi & Tanda Tangan</span>
                      </h4>
                      <p className="text-[9.5px] text-slate-500 mt-1 leading-relaxed">
                        Bubuhkan tanda tangan resmi langsung memakai jari (pada HP Android) atau mouse. Klik tombol <strong>Simpan TTD</strong> agar tanda tangan otomatis tampil pada laporan akhir dan siap dicetak.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <SignaturePad 
                        label={`1. Peserta Pria (${evaluasiCatinPria || "Pria"})`}
                        savedValue={evaluasiSigPria}
                        onSave={(dataUrl) => setEvaluasiSigPria(dataUrl)}
                        onClear={() => setEvaluasiSigPria("")}
                        placeholderText="Goreskan tanda tangan Catin Pria di sini..."
                      />

                      <SignaturePad 
                        label={`2. Peserta Wanita (${evaluasiCatinWanita || "Wanita"})`}
                        savedValue={evaluasiSigWanita}
                        onSave={(dataUrl) => setEvaluasiSigWanita(dataUrl)}
                        onClear={() => setEvaluasiSigWanita("")}
                        placeholderText="Goreskan tanda tangan Catin Wanita di sini..."
                      />

                      <SignaturePad 
                        label={`3. Narasumber / Penyuluh (${evaluasiPenyuluhName || "Penyuluh"})`}
                        savedValue={evaluasiSigPenyuluh}
                        onSave={(dataUrl) => setEvaluasiSigPenyuluh(dataUrl)}
                        onClear={() => setEvaluasiSigPenyuluh("")}
                        placeholderText="Goreskan tanda tangan Penyuluh Agama di sini..."
                      />
                    </div>
                  </div>
                </div>

                {/* COLUMN 2: PRATINJAU KERTAS DOKUMEN RESMI (RIGHT) */}
                <div className="lg:col-span-7 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lembar Fisik Dokumen KUA (Pratinjau)</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full uppercase">Pristine A4 Layout</span>
                  </div>

                  {/* VIRTUAL PAPER CARD */}
                  <div className="bg-white shadow-inner border border-slate-300 text-black leading-snug p-6 sm:p-10 font-serif text-[10.5px] max-h-[64vh] overflow-y-auto rounded-2xl select-none select-text cursor-default space-y-4">
                    {/* Header */}
                    <div className="text-center font-bold tracking-tight uppercase space-y-0.5 select-text">
                      <h4 className="text-[11px] font-bold font-sans">MONITORING DAN EVALUASI PELAKSANAAN BIMBINGAN PERKAWINAN</h4>
                      <h4 className="text-[11px] font-bold font-sans">KANTOR KEMENTERIAN AGAMA KOTA TUAL</h4>
                      <h4 className="text-[11px] font-bold font-sans">KANTOR URUSAN AGAMA PULAU DULLAH UTARA</h4>
                      <p className="text-[9px] lowercase italic font-normal normal-case font-sans">Alamat : Jl. Panglima Mandala, Fiditan, Kota Tual</p>
                    </div>
                    
                    {/* double rule */}
                    <div className="border-b-[3px] border-double border-black my-2" />
                    
                    {/* Title box */}
                    <div className="border border-black p-2.5 text-center uppercase font-bold my-3 space-y-0.5 text-[10px] font-sans">
                      <p>PELAKSANAAN MONITORING DAN EVALUASI TAHUN {evaluasiTahun}</p>
                      <p>NAMA PESERTA BIMWIN {evaluasiCatinPria} & {evaluasiCatinWanita}</p>
                      <p className="normal-case font-normal italic text-[9.5px] font-serif">{evaluasiHariTanggal}</p>
                    </div>

                    {/* Identitas Penyuluh */}
                    <div className="space-y-1">
                      <h5 className="font-bold underline text-[10.5px] mb-1 font-sans">Identitas Penyuluh Agama</h5>
                      <div className="grid grid-cols-12 gap-x-1 pl-1 leading-normal font-sans">
                        <div className="col-span-3">Nama Lengkap</div>
                        <div className="col-span-1">:</div>
                        <div className="col-span-8 font-bold">{evaluasiPenyuluhName || "-"}</div>

                        <div className="col-span-3">NIP</div>
                        <div className="col-span-1">:</div>
                        <div className="col-span-8">{evaluasiPenyuluhNip || "-"}</div>

                        <div className="col-span-3">Pangkat/Golongan</div>
                        <div className="col-span-1">:</div>
                        <div className="col-span-8">{evaluasiPenyuluhPangkat || "-"}</div>

                        <div className="col-span-3">Jabatan</div>
                        <div className="col-span-1">:</div>
                        <div className="col-span-8">{evaluasiPenyuluhJabatan || "-"}</div>

                        <div className="col-span-3">Tempat tugas</div>
                        <div className="col-span-1">:</div>
                        <div className="col-span-8">{evaluasiPenyuluhTempatTugas || "-"}</div>

                        <div className="col-span-3">Unit Kerja</div>
                        <div className="col-span-1">:</div>
                        <div className="col-span-8">{evaluasiPenyuluhUnitKerja || "-"}</div>
                      </div>
                    </div>

                    <p className="font-bold italic text-[10px] my-2 font-sans">Mohon diisi dengan baik dan benar sesuai kegiatan yang baru saja Anda ikuti saat ini!</p>

                    <div className="border border-black/25 p-2 bg-slate-50/20 my-2 space-y-0.5 text-[10px] font-sans">
                      <p><span className="font-bold">Kegiatan</span> : {evaluasiKegiatan}</p>
                      <p><span className="font-bold">Tema</span> : {evaluasiTema}</p>
                    </div>

                    <p className="font-bold text-center uppercase my-2 underline font-sans text-[10px]">HASIL LAPORAN BERDASARKAN INSTRUMEN YANG DIISI OLEH PESERTA</p>

                    {/* Table */}
                    <table className="w-full border-collapse border border-black my-2 font-sans text-[9px]">
                      <thead>
                        <tr className="bg-slate-50/50">
                          <th className="border border-black text-center py-1 w-[6%]" rowSpan={2}>No.</th>
                          <th className="border border-black text-left px-2 py-1 w-[54%]" rowSpan={2}>Pertanyaan Instrumen</th>
                          <th className="border border-black text-center py-0.5" colSpan={5}>Jumlah</th>
                        </tr>
                        <tr className="bg-slate-50/50">
                          <th className="border border-black text-center py-0.5 w-[8%] text-[8px]">Cukup</th>
                          <th className="border border-black text-center py-0.5 w-[8%] text-[8px]">Sedang</th>
                          <th className="border border-black text-center py-0.5 w-[8%] text-[8px]">Baik</th>
                          <th className="border border-black text-center py-0.5 w-[8%] text-[8px]">Cukup Baik</th>
                          <th className="border border-black text-center py-0.5 w-[8%] text-[8px]">Sangat Baik</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { key: "q3", num: "1.", q: "Bagaimanakah penyampaian materi apakah sudah sesuai dengan tema?" },
                          { key: "q4", num: "2.", q: "Bagaimana langkah penyampaian materi apakah sudah sistematis?" },
                          { key: "q5", num: "3.", q: "Bagaimanakah pesan dari tema apakah sudah tersampaikan?" },
                          { key: "q6", num: "4.", q: "Bagaimanakah penggunaan sarana dan prasarana selama kegiatan, apakah sudah membantu?" },
                          { key: "q7", num: "5.", q: "Bagaimana penilaian peserta terhadap sikap narasumber,apakah narasumber menyampaikan materi dengan antusias, semangat, and memberikan motivasi yang baik?" }
                        ].map((m) => (
                          <tr key={m.key}>
                            <td className="border border-black text-center font-bold py-1">{m.num}</td>
                            <td className="border border-black px-2 py-1">
                              <span className="font-bold">{m.q}</span>
                              <div className="text-[8px] italic font-serif text-slate-650 mt-0.5">Hasil Pemantauan : {evaluasiComments[m.key] || "-"}</div>
                            </td>
                            {["Cukup", "Sedang", "Baik", "Cukup Baik", "Sangat Baik"].map((scale) => (
                              <td key={scale} className="border border-black text-center font-bold text-emerald-800 text-[11px]">
                                {evaluasiRatings[m.key] === scale ? "✓" : ""}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="text-center text-[8px] text-slate-400 italic font-sans my-1">--- Bersambung ke halaman berikutnya (Lembar Fisik ke-2) ---</div>

                    {/* Integrated Signature Pratinjau Block */}
                    <div className="pt-3.5 border-t border-slate-105 mt-4 leading-normal select-none">
                      <p className="text-[8.5px] font-bold text-slate-505 uppercase tracking-wider mb-2 font-sans">Otorisasi Tanda Tangan Tersemat (Pratinjau)</p>
                      <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-sans">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 h-24 flex flex-col justify-between">
                          <span className="font-bold text-slate-500 block text-[7.5px] uppercase">Peserta Pria</span>
                          <div className="flex-grow flex items-center justify-center p-0.5">
                            {evaluasiSigPria ? (
                              <img src={evaluasiSigPria} alt="TTD Pria" className="max-h-12 max-w-[80px] object-contain cursor-default" referrerPolicy="no-referrer" />
                            ) : (
                              <span className="text-slate-300 italic text-[7.5px]">Belum TTD</span>
                            )}
                          </div>
                          <span className="font-semibold block truncate text-[7.5px] text-slate-700 uppercase">{evaluasiCatinPria || "-"}</span>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 h-24 flex flex-col justify-between">
                          <span className="font-bold text-slate-500 block text-[7.5px] uppercase">Peserta Wanita</span>
                          <div className="flex-grow flex items-center justify-center p-0.5">
                            {evaluasiSigWanita ? (
                              <img src={evaluasiSigWanita} alt="TTD Wanita" className="max-h-12 max-w-[80px] object-contain cursor-default" referrerPolicy="no-referrer" />
                            ) : (
                              <span className="text-slate-300 italic text-[7.5px]">Belum TTD</span>
                            )}
                          </div>
                          <span className="font-semibold block truncate text-[7.5px] text-slate-700 uppercase">{evaluasiCatinWanita || "-"}</span>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 h-24 flex flex-col justify-between">
                          <span className="font-bold text-slate-500 block text-[7.5px] uppercase">Narasumber</span>
                          <div className="flex-grow flex items-center justify-center p-0.5">
                            {evaluasiSigPenyuluh ? (
                              <img src={evaluasiSigPenyuluh} alt="TTD Penyuluh" className="max-h-12 max-w-[80px] object-contain cursor-default" referrerPolicy="no-referrer" />
                            ) : (
                              <span className="text-slate-300 italic text-[7.5px]">Belum TTD</span>
                            )}
                          </div>
                          <span className="font-semibold block truncate text-[7.5px] text-slate-700">{evaluasiPenyuluhName || "-"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons below inside Modal - Streamlined to Cetak Dokumen & Kembali as requested */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1 no-print">
                    <button
                      type="button"
                      onClick={handlePrintDirect}
                      className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer text-center flex items-center justify-center space-x-1.5 active:scale-98 shadow-md"
                    >
                      <Printer className="h-4 w-4 text-emerald-100" />
                      <span>Cetak Dokumen</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowEvaluasiModal(false)}
                      className="py-2.5 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer text-center flex items-center justify-center space-x-1.5 active:scale-98 shadow-sm"
                    >
                      <X className="h-4 w-4 text-slate-500" />
                      <span>Kembali</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>

    {/* ========================================================
        HIGH-FIDELITY FLUID 2-PAGE PRINTABLE OFFICIAL KUA FORM
        ======================================================== */}
    <div id="kua-print-document" className="print-document hidden bg-white text-black select-text">
      {/* PAGE 1 CONTENT */}
      <div className="print-page">
        <div className="text-center font-bold tracking-tight uppercase space-y-0.5 select-text font-sans">
          <h2 className="text-[13px] font-bold">MONITORING DAN EVALUASI PELAKSANAAN BIMBINGAN PERKAWINAN</h2>
          <h2 className="text-[13px] font-bold">KANTOR KEMENTERIAN AGAMA KOTA TUAL</h2>
          <h2 className="text-[13px] font-bold">KANTOR URUSAN AGAMA PULAU DULLAH UTARA</h2>
          <p className="text-[10px] lowercase italic font-normal normal-case font-serif">Alamat : Jl. Panglima Mandala, Fiditan, Kota Tual</p>
        </div>
        
        {/* Thick double line */}
        <div className="border-b-[3px] border-double border-black my-2" />
        
        {/* Title Box */}
        <div className="border border-black p-2.5 text-center uppercase font-bold my-2 space-y-1 font-sans">
          <p className="text-[11.5px] tracking-wide">PELAKSANAAN MONITORING DAN EVALUASI TAHUN {evaluasiTahun}</p>
          <p className="text-[11.5px] tracking-wide">NAMA PESERTA BIMWIN {evaluasiCatinPria} & {evaluasiCatinWanita}</p>
          <p className="text-[10.5px] normal-case font-normal italic font-serif">{evaluasiHariTanggal}</p>
        </div>

        {/* Identitas Penyuluh */}
        <div className="my-2 space-y-1">
          <h4 className="font-bold underline text-[11.5px] mb-1 font-serif">Identitas Penyuluh Agama</h4>
          <table className="w-full text-[11px] table-fixed border-none">
            <tbody className="border-none">
              <tr className="border-none">
                <td className="w-[180px] border-none py-0.5 pl-0 pr-4 font-normal">Nama Lengkap</td>
                <td className="w-[15px] border-none py-0.5 px-0 font-normal">:</td>
                <td className="border-none py-0.5 px-0 font-bold">{evaluasiPenyuluhName}</td>
              </tr>
              <tr className="border-none font-serif">
                <td className="border-none py-0.5 pl-0 pr-4 font-normal">NIP</td>
                <td className="border-none py-0.5 px-0 font-normal">:</td>
                <td className="border-none py-0.5 px-0">{evaluasiPenyuluhNip}</td>
              </tr>
              <tr className="border-none font-serif">
                <td className="border-none py-0.5 pl-0 pr-4 font-normal">Pangkat/Golongan</td>
                <td className="border-none py-0.5 px-0 font-normal">:</td>
                <td className="border-none py-0.5 px-0">{evaluasiPenyuluhPangkat}</td>
              </tr>
              <tr className="border-none font-serif">
                <td className="border-none py-0.5 pl-0 pr-4 font-normal">Jabatan</td>
                <td className="border-none py-0.5 px-0 font-normal">:</td>
                <td className="border-none py-0.5 px-0">{evaluasiPenyuluhJabatan}</td>
              </tr>
              <tr className="border-none font-serif">
                <td className="border-none py-0.5 pl-0 pr-4 font-normal">Tempat tugas</td>
                <td className="border-none py-0.5 px-0 font-normal">:</td>
                <td className="border-none py-0.5 px-0">{evaluasiPenyuluhTempatTugas}</td>
              </tr>
              <tr className="border-none font-serif">
                <td className="border-none py-0.5 pl-0 pr-4 font-normal">Unit Kerja</td>
                <td className="border-none py-0.5 px-0 font-normal">:</td>
                <td className="border-none py-0.5 px-0">{evaluasiPenyuluhUnitKerja}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="font-bold text-[11px] italic my-2 font-sans text-left">Mohon diisi dengan baik dan benar sesuai kegiatan yang baru saja Anda ikuti saat ini!</p>

        {/* Kegiatan and Tema (without numbered prefix) */}
        <table className="w-full border-none my-1.5 text-[11px]">
          <tbody className="border-none">
            <tr className="border-none">
              <td className="border-none py-0.5 pl-0 w-[120px] font-bold">Kegiatan</td>
              <td className="border-none py-0.5 px-0 w-[15px]">:</td>
              <td className="border-none py-0.5 px-0">{evaluasiKegiatan}</td>
            </tr>
            <tr className="border-none">
              <td className="border-none py-0.5 pl-0 font-bold">Tema</td>
              <td className="border-none py-0.5 px-0">:</td>
              <td className="border-none py-0.5 px-0">{evaluasiTema}</td>
            </tr>
          </tbody>
        </table>

        {/* Centered table title */}
        <p className="font-bold underline text-center uppercase my-3 font-sans tracking-wide">HASIL LAPORAN BERDASARKAN INSTRUMEN YANG DIISI OLEH PESERTA</p>
   
        {/* Evaluation Table Page 1 */}
        <table className="w-full border-collapse border border-black my-2 text-[10.5px]">
          <thead>
            <tr className="bg-slate-50/20 font-sans">
              <th className="border border-black text-center py-2 px-1 w-[8%]" rowSpan={2}>No.</th>
              <th className="border border-black text-center py-2 px-2 w-[52%]" rowSpan={2}>Pertanyaan Instrumen</th>
              <th className="border border-black text-center py-1 w-[40%]" colSpan={5}>Jumlah</th>
            </tr>
            <tr className="bg-slate-50/20 font-sans">
              <th className="border border-black text-center text-[9px] py-1">Cukup</th>
              <th className="border border-black text-center text-[9px] py-1">Sedang</th>
              <th className="border border-black text-center text-[9px] py-1">Baik</th>
              <th className="border border-black text-center text-[9px] py-1">Cukup Baik</th>
              <th className="border border-black text-center text-[9px] py-1">Sangat Baik</th>
            </tr>
          </thead>
          <tbody>
            {[
              { key: "q3", num: "1.", q: "Bagaimanakah penyampaian materi apakah sudah sesuai dengan tema?" },
              { key: "q4", num: "2.", q: "Bagaimana langkah penyampaian materi apakah sudah sistematis?" },
              { key: "q5", num: "3.", q: "Bagaimanakah pesan dari tema apakah sudah tersampaikan?" },
              { key: "q6", num: "4.", q: "Bagaimanakah penggunaan sarana dan prasarana selama kegiatan, apakah sudah membantu?" },
              { key: "q7", num: "5.", q: "Bagaimana penilaian peserta terhadap sikap narasumber,apakah narasumber menyampaikan materi dengan antusias, semangat, dan memberikan motivasi yang baik?" }
            ].map((item) => (
              <tr key={item.key}>
                <td className="border border-black text-center font-bold py-2">{item.num}</td>
                <td className="border border-black px-2.5 py-1.5">
                  <span className="font-bold">{item.q}</span>
                  <div className="text-[9.5px] italic mt-0.5 font-serif">Hasil Pemantauan : {evaluasiComments[item.key] || ""}</div>
                </td>
                {["Cukup", "Sedang", "Baik", "Cukup Baik", "Sangat Baik"].map((scale) => (
                  <td key={scale} className="border border-black text-center font-bold text-[14px] w-[8%] text-emerald-700 font-sans">
                    {evaluasiRatings[item.key] === scale ? "✓" : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGE 2 CONTENT */}
      <div className="print-page flex flex-col justify-between">
        <div>
          <table className="w-full border-collapse border border-black my-2 text-[10.5px]">
            <thead>
              <tr className="bg-slate-50/20 font-sans">
                <th className="border border-black text-center py-2 px-1 w-[8%]" rowSpan={2}>No.</th>
                <th className="border border-black text-center py-2 px-2 w-[52%]" rowSpan={2}>Pertanyaan Instrumen</th>
                <th className="border border-black text-center py-1 w-[40%]" colSpan={5}>Jumlah</th>
              </tr>
              <tr className="bg-slate-50/20 font-sans">
                <th className="border border-black text-center text-[9px] py-1">Cukup</th>
                <th className="border border-black text-center text-[9px] py-1">Sedang</th>
                <th className="border border-black text-center text-[9px] py-1">Baik</th>
                <th className="border border-black text-center text-[9px] py-1">Cukup Baik</th>
                <th className="border border-black text-center text-[9px] py-1">Sangat Baik</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black text-center font-bold py-2">6.</td>
                <td className="border border-black px-2.5 py-1.5">
                  <span className="font-bold">Apakah materi yang disampaikan memberikan manfaat bagi kehidupan rumah tangga nantinya?</span>
                  <div className="text-[9.5px] italic mt-0.5 font-serif">Hasil Pemantauan : {evaluasiComments.q8 || ""}</div>
                </td>
                {["Cukup", "Sedang", "Baik", "Cukup Baik", "Sangat Baik"].map((scale) => (
                  <td key={scale} className="border border-black text-center font-bold text-[14px] w-[8%] text-emerald-700 font-sans">
                    {evaluasiRatings.q8 === scale ? "✓" : ""}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signature Area */}
        <div className="mt-4 text-center text-[10.5pt] font-serif w-full flex flex-col justify-end">
          <div className="flex justify-end mr-6 mb-4 font-serif text-[10.5pt]">
            <p>Fiditan, {evaluasiHariTanggal.replace(/^(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu),\s*/i, "") || "10 Februari 2026"}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-2 content-center mt-2">
            {/* COLUMN 1: CATIN PRIA */}
            <div className="flex flex-col items-center justify-between">
              <div className="h-8 flex items-end justify-center text-center">
                <p className="font-bold text-[11px] font-sans">Peserta Pria</p>
              </div>
              <div className="h-14 flex items-center justify-center my-0.5 select-none">
                {evaluasiSigPria ? (
                  <img src={evaluasiSigPria} alt="Sign Pria" className="max-h-14 max-w-[140px] object-contain" referrerPolicy="no-referrer" />
                ) : (
                  <div className="border-b border-dashed border-slate-400 w-28 h-5"></div>
                )}
              </div>
              <div className="text-center">
                <p className="font-bold underline uppercase text-[10.5px] font-sans">{evaluasiCatinPria}</p>
                <p className="text-[9.5px] text-center font-sans invisible select-none pointer-events-none">&nbsp;</p>
              </div>
            </div>

            {/* COLUMN 2: CATIN WANITA */}
            <div className="flex flex-col items-center justify-between">
              <div className="h-8 flex items-end justify-center text-center">
                <p className="font-bold text-[11px] font-sans">Peserta Wanita</p>
              </div>
              <div className="h-14 flex items-center justify-center my-0.5 select-none">
                {evaluasiSigWanita ? (
                  <img src={evaluasiSigWanita} alt="Sign Wanita" className="max-h-14 max-w-[140px] object-contain" referrerPolicy="no-referrer" />
                ) : (
                  <div className="border-b border-dashed border-slate-400 w-28 h-5"></div>
                )}
              </div>
              <div className="text-center">
                <p className="font-bold underline uppercase text-[10.5px] font-sans">{evaluasiCatinWanita}</p>
                <p className="text-[9.5px] text-center font-sans invisible select-none pointer-events-none">&nbsp;</p>
              </div>
            </div>

            {/* COLUMN 3: NARASUMBER */}
            <div className="flex flex-col items-center justify-between">
              <div className="h-8 flex items-end justify-center text-center">
                <p className="font-bold text-[11px] text-center font-sans leading-none">Mengetahui<br />Narasumber</p>
              </div>
              <div className="h-14 flex items-center justify-center my-0.5 select-none">
                {evaluasiSigPenyuluh ? (
                  <img src={evaluasiSigPenyuluh} alt="Sign Penyuluh" className="max-h-14 max-w-[150px] object-contain" referrerPolicy="no-referrer" />
                ) : (
                  <div className="border-b border-dashed border-slate-400 w-32 h-5"></div>
                )}
              </div>
              <div className="text-center">
                <p className="font-bold underline text-[10.5px] text-center font-sans">{evaluasiPenyuluhName}</p>
                <p className="text-[9.5px] text-center font-sans">NIP. {evaluasiPenyuluhNip}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Clean, Elegant Floating Notification for Print Status */}
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[9999] max-w-md bg-slate-900 border border-slate-800 text-white shadow-2xl rounded-2xl p-4 flex items-start space-x-3 no-print"
        >
          <div className="flex-shrink-0 bg-emerald-500/20 text-emerald-400 p-1.5 rounded-lg">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="flex-1 text-sm pt-0.5">
            <p className="font-semibold text-white">Sukses Mencetak</p>
            <p className="text-slate-400 text-xs mt-0.5">{toastMessage}</p>
          </div>
          <button 
            type="button" 
            onClick={() => setToastMessage(null)}
            className="flex-shrink-0 text-slate-500 hover:text-slate-300 p-1 rounded-sm cursor-pointer transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
