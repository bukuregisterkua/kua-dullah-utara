import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, 
  Printer, 
  Download, 
  Search, 
  Building, 
  BookOpen, 
  Heart, 
  Users, 
  User, 
  PenTool, 
  Check, 
  Send, 
  X, 
  Lock, 
  Plus, 
  CheckCircle2, 
  HelpCircle,
  Mail,
  Phone,
  Clock,
  Sparkles
} from "lucide-react";
import { SignaturePad } from './components/SignaturePad.tsx';

// Pre-configured list of default Penyuluh / Educators
const DEFAULT_PENYULUH = [
  { id: "p1", name: "Dodi, S.HI", nip: "198501272025211002", pangkat: "IX", jabatan: "Penyuluh Agama Islam", tempat: "KUA Pulau Dullah Utara", Kua: "Pulau Dullah Utara" },
  { id: "p2", name: "Hj. Rahma, S.Ag", nip: "197805122008012014", pangkat: "III/c", jabatan: "Penyuluh Madya", tempat: "KUA Pulau Dullah Utara", Kua: "Pulau Dullah Utara" },
  { id: "p3", name: "Muhammad Guntur, S.Th.I", nip: "198211032015031003", pangkat: "III/b", jabatan: "Penyuluh Pertama", tempat: "KUA Pulau Dullah Utara", Kua: "Pulau Dullah Utara" }
];

interface GuestBookEntry {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  purpose: string;
  message: string;
}

export default function App() {
  // Navigation Tabs
  const [currentTab, setCurrentTab] = useState<"nikah" | "buku-tamu" | "informasi">("nikah");
  
  // Evaluation Modal Controls
  const [showEvaluasiModal, setShowEvaluasiModal] = useState(false);
  const [evaluasiSubmitted, setEvaluasiSubmitted] = useState(false);
  const [showDownloadHelper, setShowDownloadHelper] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Kuesioner Evaluasi Inputs
  const [evaluasiCatinPria, setEvaluasiCatinPria] = useState("RAHMANI");
  const [evaluasiCatinWanita, setEvaluasiCatinWanita] = useState("SIFA AZAHRA TEMARWUT");
  const [evaluasiCatinPhone, setEvaluasiCatinPhone] = useState("081240912842");
  const [evaluasiTahun, setEvaluasiTahun] = useState("2025");
  const [evaluasiKegiatan, setEvaluasiKegiatan] = useState("BIMBINGAN PERKAWINAN CATIN MANDIRI");
  const [evaluasiTema, setEvaluasiTema] = useState("MEMBINA KELUARGA SAKINAH MAWADDAH WARAHMAH");
  const [evaluasiHariTanggal, setEvaluasiHariTanggal] = useState("Selasa, 26 Mei 2026");

  // Selected Penyuluh
  const [evaluasiPenyuluhId, setEvaluasiPenyuluhId] = useState("p1");
  const [evaluasiPenyuluhName, setEvaluasiPenyuluhName] = useState("Dodi, S.HI");
  const [evaluasiPenyuluhNip, setEvaluasiPenyuluhNip] = useState("198501272025211002");
  const [evaluasiPenyuluhPangkat, setEvaluasiPenyuluhPangkat] = useState("IX");
  const [evaluasiPenyuluhJabatan, setEvaluasiPenyuluhJabatan] = useState("Penyuluh Agama Islam");

  // Ratings for Questionnaire (q3 to q8)
  const [evaluasiRatings, setEvaluasiRatings] = useState<Record<string, string>>({
    q3: "Sangat Baik",
    q4: "Sangat Baik",
    q5: "Sangat Baik",
    q6: "Cukup Baik",
    q7: "Sangat Baik",
    q8: "Sangat Baik"
  });

  // Comments for each instrument
  const [evaluasiComments, setEvaluasiComments] = useState<Record<string, string>>({
    q3: "Sesuai dengan kebutuhan penyuluhan",
    q4: "Sangat sistematis dan interaktif",
    q5: "Pesan sangat jelas dan mendidik",
    q6: "Sarana bimbingan sangat memadai",
    q7: "Sangat bersemangat dan komunikatif",
    q8: "Sangat bermanfaat untuk kehidupan sakinah"
  });

  // Digital Signatures
  const [evaluasiSigPria, setEvaluasiSigPria] = useState("");
  const [evaluasiSigWanita, setEvaluasiSigWanita] = useState("");
  const [evaluasiSigPenyuluh, setEvaluasiSigPenyuluh] = useState("");

  // Guestbook registration inputs
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestPurpose, setGuestPurpose] = useState("Konsultasi Perkawinan");
  const [guestMessage, setGuestMessage] = useState("");
  const [guestSearchQuery, setGuestSearchQuery] = useState("");

  // List of guest entries
  const [guestList, setGuestList] = useState<GuestBookEntry[]>([]);

  // Load custom list data on mount
  useEffect(() => {
    const cachedGuests = localStorage.getItem("kua_guestbook");
    if (cachedGuests) {
      setGuestList(JSON.parse(cachedGuests));
    } else {
      const mockGuests: GuestBookEntry[] = [
        {
          id: "g1",
          name: "Syarifudin Kabalmay",
          phone: "082344158912",
          date: "2026-05-25",
          time: "09:15",
          purpose: "Berkas Pengajuan Nikah",
          message: "Menyerahkan dokumen persyaratan pernikahan model N1-N4."
        },
        {
          id: "g2",
          name: "Laila Retob",
          phone: "081148293021",
          date: "2026-05-25",
          time: "10:30",
          purpose: "Konsultasi BP4 / Penasihatan",
          message: "Konsultasi singkat pra-nikah dengan Penyuluh Agama."
        }
      ];
      setGuestList(mockGuests);
      localStorage.setItem("kua_guestbook", JSON.stringify(mockGuests));
    }
  }, []);

  // Sync state transitions during print dialog closes
  useEffect(() => {
    const handleAfterPrint = () => {
      document.body.classList.remove("printing-kua-active");
      showToast("Proses Cetak / Ekspor PDF selesai dijalankan.");
    };
    window.addEventListener("afterprint", handleAfterPrint);
    return () => window.removeEventListener("afterprint", handleAfterPrint);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Quick select Penyuluh handler
  const handlePenyuluhSelectForEvaluasi = (id: string) => {
    const selected = DEFAULT_PENYULUH.find(p => p.id === id);
    if (selected) {
      setEvaluasiPenyuluhId(selected.id);
      setEvaluasiPenyuluhName(selected.name);
      setEvaluasiPenyuluhNip(selected.nip);
      setEvaluasiPenyuluhPangkat(selected.pangkat);
      setEvaluasiPenyuluhJabatan(selected.jabatan);
    }
  };

  // Submit Guestbook entry
  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) {
      showToast("Peringatan: Nama Lengkap dan No. Handphone wajib diisi!");
      return;
    }

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const formattedTime = today.toTimeString().split(' ')[0].substring(0, 5);

    const newEntry: GuestBookEntry = {
      id: Math.random().toString(36).substring(2, 9),
      name: guestName.trim(),
      phone: guestPhone.trim(),
      date: formattedDate,
      time: formattedTime,
      purpose: guestPurpose,
      message: guestMessage.trim() || "-"
    };

    const updatedList = [newEntry, ...guestList];
    setGuestList(updatedList);
    localStorage.setItem("kua_guestbook", JSON.stringify(updatedList));

    // Reset inputs
    setGuestName("");
    setGuestPhone("");
    setGuestPurpose("Konsultasi Perkawinan");
    setGuestMessage("");

    import('canvas-confetti').then((m) => {
      m.default({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
    });

    showToast("Sukses: Data Buku Tamu berhasil disimpan secara digital.");
  };

  // Document print triggers
  const handlePrintDirect = () => {
    document.body.classList.add("printing-kua-active");
    window.getSelection()?.removeAllRanges();
    
    // Set official filename title for browsers
    const prevTitle = document.title;
    document.title = `Evaluasi_Bimwin_KUA_${evaluasiCatinPria.replace(/\s+/g, '_')}_${evaluasiCatinWanita.replace(/\s+/g, '_')}`;
    
    setTimeout(() => {
      window.print();
      document.title = prevTitle;
    }, 250);
  };

  // PDF Trigger with user overlays
  const handleDownloadPdfTrigger = () => {
    setShowDownloadHelper(true);
  };

  // Filtered guest list
  const filteredGuests = guestList.filter(entry => 
    entry.name.toLowerCase().includes(guestSearchQuery.toLowerCase()) ||
    entry.purpose.toLowerCase().includes(guestSearchQuery.toLowerCase()) ||
    entry.message.toLowerCase().includes(guestSearchQuery.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between no-print bg-[#fbfdfa]">
        
        {/* Dynamic Navigation Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-emerald-100 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-18">
              
              {/* Logo / Kemenag Branded Titles */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold tracking-tight shadow-sm border border-emerald-600">
                  <Building className="h-6 w-6 text-emerald-100" />
                </div>
                <div>
                  <h1 className="text-sm font-black text-slate-900 tracking-tight font-display flex items-center gap-1.5 uppercase">
                    KUA Pulau Dullah Utara
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded-md uppercase">REKREASI</span>
                  </h1>
                  <p className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">Kementerian Agama Kota Tual</p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="hidden md:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200/50">
                {[
                  { id: "nikah", label: "Evaluasi Bimwin", icon: ClipboardList },
                  { id: "buku-tamu", label: "Buku Tamu Digital", icon: BookOpen },
                  { id: "informasi", label: "Syarat & Layanan KUA", icon: HelpCircle }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setCurrentTab(tab.id as any)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                        currentTab === tab.id
                          ? "bg-emerald-700 text-white shadow-sm"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/40"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Direct Quick Action (Modal Trigger) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEvaluasiSubmitted(false);
                    setShowEvaluasiModal(true);
                  }}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all shadow-md active:scale-97 cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="h-4 w-4" />
                  <span>Isi Kuesioner</span>
                </button>
              </div>

            </div>
          </div>

          {/* Mobile Tab Rail */}
          <div className="md:hidden flex border-t border-slate-100 bg-slate-50/60 p-1">
            {[
              { id: "nikah", label: "Evaluasi", icon: ClipboardList },
              { id: "buku-tamu", label: "Buku Tamu", icon: BookOpen },
              { id: "informasi", label: "Info Layanan", icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id as any)}
                  className={`flex-1 flex flex-col items-center py-2 rounded-lg transition-all ${
                    currentTab === tab.id 
                      ? "text-emerald-700 font-extrabold bg-slate-100" 
                      : "text-slate-500 font-medium"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5 mb-0.5" />
                  <span className="text-[10px] tracking-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* Informative Banner Carousel */}
        <section className="bg-slate-900 text-white py-12 relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 opacity-15 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
            <span className="text-[10px] uppercase font-black tracking-widest bg-emerald-800 text-emerald-100 px-3 py-1 rounded-full border border-emerald-600 inline-block animate-pulse">
              🏛️ Portal Pelayanan Digital KUA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-display text-white max-w-2xl mx-auto leading-tight">
              Sistem Penjaminan Mutu & Administrasi Kantor Urusan Agama
            </h2>
            <p className="text-xs sm:text-sm text-slate-350 max-w-xl mx-auto leading-relaxed">
              Mewujudkan pelayanan prima, transparan, dan berlandaskan integritas tinggi bagi masyarakat Kecamatan Pulau Dullah Utara, Kota Tual.
            </p>
          </div>
        </section>

        {/* Main Tab Area Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
          <div className="space-y-6">

            {/* TAB 1: EVALUASI BIMBINAN PERKAWINAN */}
            {currentTab === "nikah" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xxs animate-fade-in space-y-6">
                
                {/* Intro Headers */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-5 pb-5 border-b border-slate-100">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0 shadow-xs">
                    <ClipboardList className="h-8 w-8 text-emerald-650" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#15803d] bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block border border-emerald-100">
                      BIMBINGAN PERKAWINAN (BIMWIN)
                    </span>
                    <h3 className="text-lg font-black text-slate-900 font-display">
                      Kuesioner Evaluasi Pelayanan Nikah & Pranikah
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
                      Demi meningkatkan mutu bimbingan, silakan lengkapi evaluasi digital di bawah ini. Dokumen laporan kuesioner dicetak langsung dalam format fisik A4 Kemenag resmi untuk berkas arsip KUA.
                    </p>
                  </div>
                </div>

                {/* Step Guidelines */}
                <div className="bg-emerald-50/60 border border-emerald-100/70 rounded-2xl p-5 space-y-3 font-sans">
                  <h4 className="text-[11px] font-black uppercase text-emerald-900 tracking-wide flex items-center gap-1.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-750" />
                    Alur Dan Petunjuk Pengisian Dokumen Evaluasi:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4.5 text-[11px] text-slate-650 font-bold">
                    <li className="p-3 bg-white rounded-xl border border-emerald-600/10 space-y-1 shadow-xxs">
                      <span className="text-emerald-750 font-black">1. Lengkapi Biodata</span>
                      <p className="text-[10px] text-slate-500 font-medium">Klik tombol pengisian di bawah untuk memasukkan nama pengantin, tema, dan penyuluh Anda.</p>
                    </li>
                    <li className="p-3 bg-white rounded-xl border border-emerald-600/10 space-y-1 shadow-xxs">
                      <span className="text-emerald-750 font-black">2. Penilaian Ceklist & TTD</span>
                      <p className="text-[10px] text-slate-500 font-medium">Beri skor kelayakan serta bubuhkan tanda tangan digital langsung di layar komputer atau HP.</p>
                    </li>
                    <li className="p-3 bg-white rounded-xl border border-emerald-600/10 space-y-1 shadow-xxs">
                      <span className="text-emerald-750 font-black">3. Cetak & Unduh PDF</span>
                      <p className="text-[10px] text-slate-500 font-medium">Simpan kuesioner, lalu cetak fisik atau download dalam format PDF resmi 2-halaman siap pakai.</p>
                    </li>
                  </ul>
                </div>

                {/* Main Action Call */}
                <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200/50 text-center space-y-4">
                  <div className="max-w-md mx-auto space-y-2">
                    <h4 className="text-sm font-extrabold text-slate-950">Mulai Mengisi Kuesioner Baru?</h4>
                    <p className="text-xs text-slate-500 leading-normal">
                      Biodata narasumber dan peserta dapat disesuaikan langsung secara live sebelum dicetak.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEvaluasiSubmitted(false);
                      setShowEvaluasiModal(true);
                    }}
                    className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all inline-flex items-center gap-2 cursor-pointer active:scale-97"
                  >
                    <ClipboardList className="h-4.5 w-4.5" />
                    <span>Mulai Kuesioner Evaluasi</span>
                  </button>
                </div>

              </div>
            )}

            {/* TAB 2: BUKU TAMU DIGITAL */}
            {currentTab === "buku-tamu" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
                
                {/* Form Registrasi Tamu (Left - 5 col) */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-xxs space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-slate-900 font-display">Registrasi Buku Tamu</h3>
                    <p className="text-xs text-slate-500">
                      Harap daftarkan identitas Anda saat melakukan kunjungan pelayanan fisik di KUA.
                    </p>
                  </div>

                  <form onSubmit={handleGuestSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-500 tracking-wide mb-1">Nama Lengkap Anda</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Contoh: Ahmad Sanusi"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-250 rounded-xl text-xs font-black text-slate-800 focus:border-emerald-500 focus:outline-hidden bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-500 tracking-wide mb-1">No. WhatsApp / HP</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Contoh: 0812XXXXXXXX"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-250 rounded-xl text-xs font-mono text-slate-800 focus:border-emerald-500 focus:outline-hidden bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-500 tracking-wide mb-1">Keperluan / Layanan KUA</label>
                      <select
                        value={guestPurpose}
                        onChange={(e) => setGuestPurpose(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-250 rounded-xl text-xs font-black text-slate-800 bg-white"
                      >
                        <option value="Konsultasi Perkawinan">Konsultasi Perkawinan (BP4)</option>
                        <option value="Pendaftaran Berkas Nikah">Pendaftaran Berkas Nikah (N1-N4)</option>
                        <option value="Layanan Wakaf & Sertifikasi">Layanan Wakaf & Sertifikasi</option>
                        <option value="Muallaf Center / Rekomendasi">Muallaf Center / Pengislaman</option>
                        <option value="Pengajuan Rekomendasi Nikah">Pengajuan Rekomendasi Nikah Luar</option>
                        <option value="Kunjungan Koordinasi / Lainnya">Kunjungan Koordinasi / Lainnya</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-500 tracking-wide mb-1">Pesan / keterangan tambahan (opsional)</label>
                      <textarea 
                        rows={3}
                        placeholder="Jelaskan kebutuhan konsultasi atau berkas Anda..."
                        value={guestMessage}
                        onChange={(e) => setGuestMessage(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-250 rounded-xl text-xs font-bold text-slate-800 focus:border-emerald-500 focus:outline-hidden bg-slate-50/50"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-750 hover:bg-emerald-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-97 shadow-md"
                    >
                      <Send className="h-4 w-4" />
                      <span>Simpan Kunjungan Tamu</span>
                    </button>
                  </form>
                </div>

                {/* Ledger / Register Buku Tamu Digital (Right - 7 col) */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 shadow-xxs space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <h3 className="text-base font-black text-slate-900 font-display">Daftar Kehadiran Digital</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Register Terkini Kunjungan KUA</p>
                      </div>

                      {/* Search Bar */}
                      <div className="relative w-full sm:w-60">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="Cari nama atau keperluan..."
                          value={guestSearchQuery}
                          onChange={(e) => setGuestSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-1.5 border border-slate-200 rounded-lg text-xs font-medium focus:border-emerald-500 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    {/* Guest Ledger Row List */}
                    <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                      {filteredGuests.length === 0 ? (
                        <div className="p-12 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                          <BookOpen className="h-10 w-10 mx-auto mb-2 text-slate-350" />
                          <p className="text-xs font-bold">Tidak ada daftar tamu yang ditemukan.</p>
                        </div>
                      ) : (
                        filteredGuests.map((item) => (
                          <div key={item.id} className="p-3.5 bg-slate-50/85 border border-slate-150 rounded-2xl flex items-start gap-3 shadow-3xs hover:border-emerald-100 transition-all">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                              {item.name.substring(0, 1).toUpperCase()}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex justify-between items-start">
                                <h4 className="text-xs font-black text-slate-900">{item.name}</h4>
                                <span className="text-[8.5px] font-bold text-slate-400 font-mono">
                                  {item.date} {item.time}
                                </span>
                              </div>
                              <div className="flex gap-2 text-[9px] font-extrabold uppercase tracking-wide">
                                <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-sm">
                                  {item.purpose}
                                </span>
                                <span className="text-slate-600 font-mono bg-slate-100 px-1.5 py-0.5 rounded-sm">
                                  {item.phone}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic bg-white p-2 rounded-lg border border-slate-100 mt-1.5">
                                "{item.message}"
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-wider pt-4 border-t border-slate-100 mt-4 leading-relaxed">
                    Menampilkan total sebanyak: {filteredGuests.length} kunjungan dari masyarakat.
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: INFORMASI LAYANAN */}
            {currentTab === "informasi" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xxs animate-fade-in space-y-6">
                <div>
                  <h3 className="text-base font-black text-slate-900 font-display">Persyaratan Layanan Administrasi KUA</h3>
                  <p className="text-xs text-slate-500">
                    Ketahui kelengkapan dokumen pendukung sebelum berkunjung ke KUA Pulau Dullah Utara.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    {
                      title: "Layanan Nikah / Rujuk",
                      icon: Heart,
                      color: "border-rose-100 bg-rose-50/40 text-rose-800",
                      steps: [
                        "Surat pengantar nikah kelurahan (Model N1-N4)",
                        "FC Kartu Tanda Penduduk (Katin & Orang Tua)",
                        "FC Kartu Keluarga (KK) & Akta Kelahiran",
                        "Ijazah Terakhir / Surat Keterangan Lahir",
                        "Pasfoto ukuran 2x3 (4 lbr) & 4x6 (2 lbr) biru"
                      ]
                    },
                    {
                      title: "Layanan Wakaf & Aset",
                      icon: Building,
                      color: "border-indigo-100 bg-indigo-50/40 text-indigo-800",
                      steps: [
                        "Sertifikat Tanah Hak Milik asli atau dokumen kepemilikan",
                        "Surat pengantar permohonan wakaf kelurahan",
                        "KTP Wakif (pemberi), Nazhir (pengelola) & 2 Saksi",
                        "Surat pernyataan Nazhir bermeterai",
                        "Akta Ikrar Wakaf (AIW) / AP-AIW dari Pejabat KUA"
                      ]
                    },
                    {
                      title: "Muallaf Center / Pengislaman",
                      icon: Sparkles,
                      color: "border-amber-100 bg-amber-50/40 text-amber-800",
                      steps: [
                        "Surat pernyataan sukarela masuk Islam bermeterai",
                        "FC Kartu Tanda Penduduk / Identitas Resmi",
                        "Pasfoto ukuran 3x4 sebanyak 3 lembar",
                        "Hadir didampingi 2 orang saksi muslim dewasa",
                        "Sertifikat Syahadat diterbitkan resmi oleh Kepala KUA"
                      ]
                    }
                  ].map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div key={index} className="border border-slate-205/60 p-5 rounded-2xl space-y-3.5 hover:border-emerald-300 transition-all flex flex-col justify-start">
                        <div className={`p-2 rounded-xl text-emerald-800 max-w-fit border ${service.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <h4 className="text-xs font-black text-slate-950 uppercase tracking-wide">{service.title}</h4>
                        <ol className="list-inside list-decimal text-[11px] text-slate-650 space-y-1.5 font-bold leading-relaxed">
                          {service.steps.map((st, sidx) => (
                            <li key={sidx} className="font-semibold text-slate-600">
                              <span className="text-slate-700">{st}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </main>

        {/* Dynamic Footer Area */}
        <footer className="bg-slate-900 text-slate-400 py-10 pr-2 border-t border-slate-805 shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <span className="text-xs font-black tracking-widest text-[#15803d] uppercase">Kontak Kantor KUA</span>
                <p className="text-xs font-medium text-slate-350 leading-relaxed">
                  Kecamatan Pulau Dullah Utara, Kota Tual, Provinsi Maluku.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-black tracking-wide">
                <a href="mailto:kuadullahutara01@gmail.com" className="hover:text-white transition-all flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-emerald-500" />
                  <span>kuadullahutara01@gmail.com</span>
                </a>
                <span className="text-slate-700">|</span>
                <span className="flex items-center gap-1.5 text-slate-350">
                  <Phone className="h-4 w-4 text-emerald-500" />
                  <span>+62 822 4091 2842</span>
                </span>
                <span className="text-slate-700">|</span>
                <span className="flex items-center gap-1.5 text-slate-350">
                  <Clock className="h-4 w-4 text-emerald-500" />
                  <span>Senin - Jumat 08:00 - 16:00 WIT</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
              <p>&copy; 2026 KUA Kecamatan Pulau Dullah Utara. Hak Cipta Dilindungi.</p>
              <p className="text-emerald-600/90 font-black">Standard Pelayanan Mutu Kementerian Agama RI</p>
            </div>
          </div>
        </footer>

      </div>

      {/* ========================================================
          POPUP MODAL: SIDE-BY-SIDE QUESTIONNAIRE EDIT & PREVIEW
          ======================================================== */}
      {showEvaluasiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto no-print">
          <div className="bg-slate-50 w-full max-w-7xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh] border border-slate-200 overflow-hidden relative">
            
            {/* Modal Title Bar */}
            <div className="bg-white px-5 sm:px-6 py-4 border-b border-slate-200 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2.5">
                <ClipboardList className="h-5.5 w-5.5 text-emerald-700" />
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 font-display uppercase tracking-tight">
                    Penyesuaian Format & Cetak PDF Kuesioner Evaluasi KUA
                  </h3>
                  <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">FORMULIR PERNYATAAN EVALUASI LAYANAN NIKAH</p>
                </div>
              </div>
              <button 
                onClick={() => setShowEvaluasiModal(false)}
                className="p-1.5 hover:bg-slate-100 text-slate-450 hover:text-slate-800 rounded-lg transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Split Content Area: Inputs on Left, A4 Preview on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-y-auto flex-grow pr-1 no-print">
              
              {/* COLUMN 1: EDIT LAYOUT DETAILS (LEFT - 5 cols) */}
              <div className="lg:col-span-5 space-y-4 max-h-[75vh] overflow-y-auto p-4 sm:p-5">
                {!evaluasiSubmitted ? (
                  <>
                    <div className="bg-[#f0fdf4] border border-emerald-100 p-4 rounded-xl text-[10.5px] text-[#125B49] leading-relaxed font-semibold shadow-3xs">
                      ✍️ <strong>Langkah Pengisian Kuesioner:</strong> Lengkapi isian biodata pasangan Catin, data narasumber penyuluh, beri penilaian ceklist evaluasi, dan tanda tangan di bagian bawah. 
                      Setelah semua lengkap, klik <strong className="text-emerald-800">"Simpan & Selesaikan Kuesioner"</strong> di paling bawah.
                    </div>

                    {/* SECTION 1: IDENTITAS PESERTA */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                      <h4 className="text-[10px] font-extrabold text-[#125B49] uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-emerald-700" />
                        <span>Identitas Pasangan (Catin)</span>
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[8.5px] font-bold text-slate-500 uppercase mb-0.5">Nama Peserta Pria</label>
                          <input 
                            type="text"
                            value={evaluasiCatinPria}
                            onChange={(e) => setEvaluasiCatinPria(e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-bold text-slate-805 bg-slate-50"
                          />
                        </div>
                        <div>
                          <label className="block text-[8.5px] font-bold text-slate-500 uppercase mb-0.5">Nama Peserta Wanita</label>
                          <input 
                            type="text"
                            value={evaluasiCatinWanita}
                            onChange={(e) => setEvaluasiCatinWanita(e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-bold text-slate-805 bg-slate-50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[8.5px] font-bold text-slate-500 uppercase mb-0.5">No. WhatsApp / HP</label>
                          <input 
                            type="text"
                            value={evaluasiCatinPhone}
                            onChange={(e) => setEvaluasiCatinPhone(e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-mono text-slate-805 bg-slate-50"
                          />
                        </div>
                        <div>
                          <label className="block text-[8.5px] font-bold text-slate-500 uppercase mb-0.5">Tahun Kegiatan</label>
                          <input 
                            type="text"
                            value={evaluasiTahun}
                            onChange={(e) => setEvaluasiTahun(e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-bold text-slate-805 bg-slate-50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: IDENTITAS PENYULUH */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                      <h4 className="text-[10px] font-extrabold text-[#125B49] uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-emerald-700" />
                        <span>Penyuluh / Narasumber</span>
                      </h4>

                      <div>
                        <label className="block text-[8.5px] font-bold text-slate-500 uppercase mb-0.5">Gunakan Cepat Database KUA</label>
                        <select
                          value={evaluasiPenyuluhId}
                          onChange={(e) => handlePenyuluhSelectForEvaluasi(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-805 bg-slate-50 font-black"
                        >
                          {DEFAULT_PENYULUH.map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[8.5px] font-bold text-slate-500 uppercase mb-0.5">Nama Lengkap & Gelar</label>
                          <input 
                            type="text"
                            value={evaluasiPenyuluhName}
                            onChange={(e) => setEvaluasiPenyuluhName(e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-805 font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[8.5px] font-bold text-slate-500 uppercase mb-0.5">NIP</label>
                          <input 
                            type="text"
                            value={evaluasiPenyuluhNip}
                            onChange={(e) => setEvaluasiPenyuluhNip(e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-mono text-slate-850 bg-slate-50/30"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[8.5px] font-bold text-slate-500 uppercase mb-0.5">Jabatan Pokok</label>
                          <input 
                            type="text"
                            value={evaluasiPenyuluhJabatan}
                            onChange={(e) => setEvaluasiPenyuluhJabatan(e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-805"
                          />
                        </div>
                        <div>
                          <label className="block text-[8.5px] font-bold text-slate-500 uppercase mb-0.5">Pangkat/Gol</label>
                          <input 
                            type="text"
                            value={evaluasiPenyuluhPangkat}
                            onChange={(e) => setEvaluasiPenyuluhPangkat(e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-mono text-slate-805"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: TANGGAL & TEMA */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/90 space-y-3">
                      <h4 className="text-[10px] font-extrabold text-[#125B49] uppercase tracking-wider pb-1.5 border-b border-slate-100">Detail Bimbingan</h4>
                      <div>
                        <label className="block text-[8.5px] font-bold text-slate-500 uppercase mb-0.5">Nama Kegiatan Resmi</label>
                        <input 
                          type="text"
                          value={evaluasiKegiatan}
                          onChange={(e) => setEvaluasiKegiatan(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-805 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-[8.5px] font-bold text-slate-500 uppercase mb-0.5">Tema Bimbingan</label>
                        <input 
                          type="text"
                          value={evaluasiTema}
                          onChange={(e) => setEvaluasiTema(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-805 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-[8.5px] font-bold text-slate-500 uppercase mb-0.5">Hari & Tanggal Pelaksanaan</label>
                        <input 
                          type="text"
                          value={evaluasiHariTanggal}
                          onChange={(e) => setEvaluasiHariTanggal(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-805 bg-slate-50"
                        />
                      </div>
                    </div>

                    {/* SECTION 4: INSTRUMEN EVALUASI PENILAIAN */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-4">
                      <h4 className="text-[10px] font-extrabold text-[#125B49] uppercase tracking-wider pb-1.5 border-b border-slate-100">Penilaian Evaluasi Ceklist</h4>
                      {[
                        { key: "q3", num: "3", text: "Kesesuaian penyampaian materi dengan tema:" },
                        { key: "q4", num: "4", text: "Kesesuaian metode penyampaian secara sistematis:" },
                        { key: "q5", num: "5", text: "Kejelasan pesan tema tersampaikan ke peserta:" },
                        { key: "q6", num: "6", text: "Kelayakan sarana prasarana penunjang kegiatan:" },
                        { key: "q7", num: "7", text: "Antusiasme narasumber, motivasi, dan keaktifan:" },
                        { key: "q8", num: "8", text: "Kelayakan manfaat materi bimbingan di masa depan:" }
                      ].map((item) => (
                        <div key={item.key} className="p-3 bg-slate-50 border border-slate-205/60 rounded-xl space-y-2">
                          <div className="text-[11px] font-bold text-slate-900 leading-normal">
                            <span className="text-emerald-800 font-mono text-[11px]">{item.num}.</span> {item.text}
                          </div>
                          
                          {/* Scale options */}
                          <div className="flex flex-wrap gap-1">
                            {["Cukup", "Sedang", "Baik", "Cukup Baik", "Sangat Baik"].map((scale) => (
                              <button
                                key={scale}
                                type="button"
                                onClick={() => setEvaluasiRatings(prev => ({ ...prev, [item.key]: scale }))}
                                className={`px-2.5 py-1 text-[9px] font-black rounded-md border transition-all cursor-pointer ${
                                  evaluasiRatings[item.key] === scale 
                                    ? "bg-emerald-750 text-white border-emerald-750 scale-102" 
                                    : "bg-white text-slate-600 border-slate-250 hover:bg-slate-100"
                                }`}
                              >
                                {scale}
                              </button>
                            ))}
                          </div>

                          {/* Specific explanation */}
                          <div>
                            <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">Hasil Pemantauan / Penjelasan Singkat</label>
                            <input 
                              type="text"
                              value={evaluasiComments[item.key] || ""}
                              placeholder="Tulis alasan..."
                              onChange={(e) => setEvaluasiComments(prev => ({ ...prev, [item.key]: e.target.value }))}
                              className="w-full px-2 py-1 border border-slate-200 rounded text-[10px] text-slate-750 font-bold bg-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* SECTION 5: SIGNATURE PADS */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-4">
                      <h4 className="text-[10px] font-extrabold text-[#125B49] uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center gap-1.5">
                        <PenTool className="h-3.5 w-3.5 text-emerald-700" />
                        <span>Otorisasi & Tanda Tangan Virtual</span>
                      </h4>

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
                        label={`3. Narasumber/Penyuluh (${evaluasiPenyuluhName || "Penyuluh"})`}
                        savedValue={evaluasiSigPenyuluh}
                        onSave={(dataUrl) => setEvaluasiSigPenyuluh(dataUrl)}
                        onClear={() => setEvaluasiSigPenyuluh("")}
                        placeholderText="Goreskan tanda tangan Penyuluh KUA di sini..."
                      />
                    </div>

                    {/* CONFIRMATION SUBMIT ROW */}
                    <div className="sticky bottom-0 bg-slate-50 py-3 border-t border-slate-200/50 flex flex-col z-10">
                      <button
                        type="button"
                        onClick={() => {
                          if (!evaluasiCatinPria.trim() || !evaluasiCatinWanita.trim()) {
                            alert("Peringatan: Harap masukkan nama calon penganten pria & wanita terlebih dahulu.");
                            return;
                          }
                          setEvaluasiSubmitted(true);
                          import('canvas-confetti').then((m) => {
                            m.default({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
                          });
                        }}
                        className="w-full py-3.5 bg-emerald-750 hover:bg-emerald-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <Check className="h-4.5 w-4.5" />
                        <span>Simpan & Selesaikan Kuesioner</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4 animate-fade-in py-2">
                    {/* SUCCESS BLOCK */}
                    <div className="bg-white rounded-2xl border border-emerald-200 p-5 text-center space-y-3 shadow-xxs">
                      <div className="w-11 h-11 bg-emerald-50 text-emerald-800 border border-emerald-150 rounded-full flex items-center justify-center mx-auto shadow-2xs">
                        <Check className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#15803d] bg-emerald-100/50 px-2 py-0.5 rounded-full inline-block">
                          DOKUMEN SIAP
                        </span>
                        <h4 className="text-sm font-black text-slate-900 leading-tight">
                          Evaluasi Sukses Disimpan!
                        </h4>
                        <p className="text-[11px] text-slate-500 font-bold">
                          Kuesioner atas nama pasangan <br />
                          <strong className="text-emerald-800 font-extrabold">{evaluasiCatinPria}</strong> & <strong className="text-emerald-805 font-extrabold">{evaluasiCatinWanita}</strong> telah siap diunduh secara resmi dalam bentuk PDF terpisah.
                        </p>
                      </div>
                    </div>

                    {/* DOWNLOAD OPTIONS AND ACTIONS */}
                    <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4.5 space-y-2.5">
                      <h5 className="text-[10.5px] font-black uppercase tracking-wide text-emerald-950 flex items-center gap-1">
                        <Printer className="h-4 w-4 text-emerald-750 animate-pulse" />
                        <span>Petunjuk Unduh / Simpan Cetak PDF:</span>
                      </h5>
                      <ol className="list-decimal list-inside text-[10.5px] text-slate-650 space-y-2 font-bold leading-relaxed">
                        <li>Klik salah satu tombol aksi di bawah.</li>
                        <li>Di jendela pratinjau cetak browser yang muncul:
                          <ul className="list-disc list-inside ml-4 mt-1 font-medium text-emerald-850 space-y-0.5">
                            <li>Ubah <strong className="text-slate-950">Tujuan (Destination)</strong> menjadi <strong className="text-slate-950">"Simpan sebagai PDF" (Save as PDF)</strong>.</li>
                            <li>Centang pilihan <strong className="text-slate-950">"Grafik Latar Belakang" (Background Graphics)</strong>.</li>
                          </ul>
                        </li>
                        <li>Tekan <strong className="text-emerald-800">"Simpan / Save"</strong> untuk mengunduh PDF ke perangkat Anda secara aman.</li>
                      </ol>
                    </div>

                    {/* NEW DETACHED PRINT & DOWNLOAD ACTIONS IN MODAL SIDEBAR */}
                    <div className="space-y-2 pt-2">
                      
                      <button
                        type="button"
                        onClick={handlePrintDirect}
                        className="w-full py-3.5 bg-emerald-750 hover:bg-emerald-800 text-white rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <Printer className="h-4.5 w-4.5" />
                        <span>Cetak Dokumen Fisik</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadPdfTrigger}
                        className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <Download className="h-4.5 w-4.5" />
                        <span>Unduh Laporan PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setEvaluasiSubmitted(false)}
                        className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Ubah / Edit Ulang Isian data</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* COLUMN 2: PRATINJAU KERTAS DOKUMEN RESMI (RIGHT - 7 cols) */}
              <div className="lg:col-span-7 p-4 sm:p-5 flex flex-col max-h-[75vh] overflow-y-auto">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#15803d] bg-white px-3 py-1.5 rounded-t-xl inline-block border-t border-x border-slate-200 max-w-fit self-start translate-y-[1px] relative z-10 shadow-3xs">
                  Lembar Fisik Kuesioner (PRATINJAU DOKUMEN ADM)
                </span>
                
                {/* Parchment preview border */}
                <div className="bg-white border border-slate-300 rounded-2xl rounded-tl-none p-6 shadow-md overflow-x-auto min-w-[550px]">
                  
                  {/* LIVE PARCHMENT KUA DOCUMENT INSIDE POPUP MODAL */}
                  <div className="text-black font-serif text-[11px] leading-relaxed max-w-[210mm] mx-auto select-none bg-white">
                    
                    {/* Header Kop Surat KUA */}
                    <div className="text-center font-sans space-y-0.5 border-b-2 border-black pb-2.5">
                      <h4 className="text-[11px] font-bold tracking-tight uppercase">KEMENTERIAN AGAMA REPUBLIK INDONESIA</h4>
                      <h4 className="text-[11.5px] font-black tracking-tight uppercase">KANTOR KEMENTERIAN AGAMA KOTA TUAL</h4>
                      <h5 className="text-[11px] font-extrabold uppercase">KANTOR URUSAN AGAMA KECAMATAN PULAU DULLAH UTARA</h5>
                      <p className="text-[8.5px] italic text-slate-505 font-mono">Jl. Dupa, Desa Fiditan Kec. Pulau Dullah Utara Kota Tual - Maluku</p>
                    </div>

                    <div className="mt-4 text-center space-y-1">
                      <h3 className="text-xs font-black uppercase tracking-wide underline font-sans">
                        MONITORING DAN EVALUASI PELAKSANAAN BIMBINGAN PERKAWINAN
                      </h3>
                      <p className="text-[10px] font-mono font-bold uppercase">TAHUN ANGGARAN {evaluasiTahun}</p>
                    </div>

                    {/* Metadata Table */}
                    <div className="mt-4 grid grid-cols-12 gap-y-1.5 text-[10.5px] font-sans">
                      <div className="col-span-4 font-bold">1. Nama Pasangan Terbimbing</div>
                      <div className="col-span-8 font-bold flex gap-1">
                        <span>:</span> 
                        <span className="uppercase">{evaluasiCatinPria || "........"}</span> 
                        <span>dan</span> 
                        <span className="uppercase">{evaluasiCatinWanita || "........"}</span>
                      </div>

                      <div className="col-span-4 font-bold">2. No. WhatsApp / HP</div>
                      <div className="col-span-8 font-bold">: {evaluasiCatinPhone || "........"}</div>

                      <div className="col-span-4 font-bold">3. Nama Kegiatan / Tema</div>
                      <div className="col-span-8">: <span className="font-extrabold">{evaluasiKegiatan}</span> (Tema: {evaluasiTema})</div>

                      <div className="col-span-4 font-bold">4. Hari, Tanggal Pelaksanaan</div>
                      <div className="col-span-8">: {evaluasiHariTanggal}</div>

                      <div className="col-span-4 font-bold">5. Nama Narasumber Penyuluh</div>
                      <div className="col-span-8 flex gap-1 font-bold">
                        <span>: {evaluasiPenyuluhName || "........"}</span> 
                        <span className="font-mono text-[9px] text-slate-600 font-medium">(NIP: {evaluasiPenyuluhNip || "-"})</span>
                      </div>
                    </div>

                    {/* Instrumental Rating Grid Table */}
                    <table className="w-full mt-4 border-collapse border border-black text-[10px] font-sans">
                      <thead>
                        <tr className="bg-slate-100 text-center font-extrabold uppercase">
                          <th className="border border-black p-1.5 w-6">No</th>
                          <th className="border border-black p-1.5 text-left">Aspek Instrumen Evaluasi</th>
                          <th className="border border-black p-1.5 w-18">Penilaian</th>
                          <th className="border border-black p-1.5 text-left">Catatan Keterangan Hasil Pemantauan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { key: "q3", num: "1", text: "Aspek kesesuaian penyampaian materi dengan topik tema yang dibagikan" },
                          { key: "q4", num: "2", text: "Kerapian metode penyampaian narasumber secara runut, sistematis & mendidik" },
                          { key: "q5", num: "3", text: "Kejelasan penuaian pesan moral bimbingan terserap sepenuhnya oleh peserta" },
                          { key: "q6", num: "4", text: "Kelayakan sarana, prasarana fisik, dan kenyamanan lokasi bimbingan KUA" },
                          { key: "q7", num: "5", text: "Aspek memotivasi, keaktifan interaksi, serta keramahan narasumber penyuluh" },
                          { key: "q8", num: "6", text: "Aplikasi kemanfaatan materi bimbingan perkawinan di kehidupan rumah tangga" }
                        ].map((row) => (
                          <tr key={row.key} className="align-middle">
                            <td className="border border-black p-1.5 text-center font-bold">{row.num}</td>
                            <td className="border border-black p-1.5 font-bold">{row.text}</td>
                            <td className="border border-black p-1.5 text-center font-black text-emerald-850">
                              {evaluasiRatings[row.key] || "Cukup"}
                            </td>
                            <td className="border border-black p-1.5 italic font-medium">
                              {evaluasiComments[row.key] || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Official Signatures Row */}
                    <div className="mt-5 grid grid-cols-3 text-center text-[10px] font-sans font-bold leading-normal">
                      <div className="space-y-12">
                        <p>Peserta Pria (Catin)</p>
                        <div className="h-14 flex items-center justify-center border-b border-black md:mx-6">
                          {evaluasiSigPria ? (
                            <img src={evaluasiSigPria} alt="Sign Pria" className="max-h-12 object-contain" />
                          ) : (
                            <span className="text-[9px] text-slate-300 italic font-medium">Belum TTD</span>
                          )}
                        </div>
                        <p className="uppercase underline font-extrabold">{evaluasiCatinPria || "(................)"}</p>
                      </div>

                      <div className="space-y-12 border-x border-slate-100">
                        <p>Peserta Wanita (Catin)</p>
                        <div className="h-14 flex items-center justify-center border-b border-black md:mx-6">
                          {evaluasiSigWanita ? (
                            <img src={evaluasiSigWanita} alt="Sign Wanita" className="max-h-12 object-contain" />
                          ) : (
                            <span className="text-[9px] text-slate-300 italic font-medium">Belum TTD</span>
                          )}
                        </div>
                        <p className="uppercase underline font-extrabold">{evaluasiCatinWanita || "(................)"}</p>
                      </div>

                      <div className="space-y-12">
                        <p>Narasumber / Penyuluh</p>
                        <div className="h-14 flex items-center justify-center border-b border-black md:mx-6">
                          {evaluasiSigPenyuluh ? (
                            <img src={evaluasiSigPenyuluh} alt="Sign Penyuluh" className="max-h-12 object-contain" />
                          ) : (
                            <span className="text-[9px] text-slate-300 italic font-medium">Belum TTD</span>
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <p className="underline font-extrabold">{evaluasiPenyuluhName || "(................)"}</p>
                          <p className="text-[8px] font-mono text-slate-650 font-medium">NIP. {evaluasiPenyuluhNip || "................."}</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-6 pt-3 text-[8.5px] border-t border-slate-205 border-dashed text-slate-450 uppercase tracking-widest leading-loose font-sans font-bold">
                      --- Diterbitkan secara digital oleh KUA Pulau Dullah Utara ---
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Rows / Action Footer Row */}
            <div className="bg-white px-5 sm:px-6 py-4 border-t border-slate-200 shrink-0 no-print">
              <div className="flex flex-col sm:flex-row gap-3.5 justify-end">
                {evaluasiSubmitted ? (
                  <>
                    <button
                      type="button"
                      onClick={handlePrintDirect}
                      className="py-3 px-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer text-center flex items-center justify-center gap-1.5 active:scale-98 shadow-md"
                    >
                      <Printer className="h-4.5 w-4.5" />
                      <span>Cetak Dokumen</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadPdfTrigger}
                      className="py-3 px-6 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer text-center flex items-center justify-center gap-1.5 active:scale-98 shadow-md"
                    >
                      <Download className="h-4.5 w-4.5" />
                      <span>Unduh Laporan PDF</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="py-3 px-6 bg-slate-100 text-slate-400 border border-slate-200 rounded-xl text-xs font-bold cursor-not-allowed text-center flex items-center justify-center gap-2"
                  >
                    <Lock className="h-4.5 w-4.5 text-slate-400" />
                    <span>Lengkapi & Simpan Isian Di Sisi Kiri Terlebih Dahulu</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowEvaluasiModal(false)}
                  className="py-3 px-6 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer text-center flex items-center justify-center gap-1.5 active:scale-98 shadow-sm"
                >
                  <X className="h-4 w-4" />
                  <span>Tutup Jendela</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          USER INSTRUCTION OVERLAY (HELPFUL DIALOG FOR DOWNLOADS)
          ======================================================== */}
      {showDownloadHelper && (
        <div className="fixed inset-0 z-52 flex items-center justify-center bg-black/80 p-4 no-print animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 border border-emerald-100 flex flex-col space-y-4 text-slate-900 font-sans relative">
            <button 
              onClick={() => setShowDownloadHelper(false)}
              className="absolute right-3.5 top-3.5 p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-11 h-11 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mx-auto border border-amber-100 shadow-2xs">
                <Download className="h-5.5 w-5.5" />
              </div>
              <h4 className="text-xs font-black text-slate-950 uppercase tracking-tight">Prosedur Konversi & Unduh PDF Resmi</h4>
              <p className="text-[11px] text-slate-500 font-bold leading-normal">
                Untuk menjaga tata letak A4 yang presisi tinggi dan tanda tangan digital, konversi PDF dikompresi langsung melalui mesin cetak browser.
              </p>
            </div>

            <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-4.5 text-[11px] font-bold text-slate-755 leading-relaxed space-y-2">
              <div className="flex gap-2.5 items-start">
                <span className="bg-amber-500 text-white font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0">1</span>
                <div>
                  <p className="text-slate-900 font-black">Ubah "Tujuan (Destination)"</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Ubah dari printer fisik Anda menjadi <strong className="text-amber-805">"Simpan sebagai PDF" / "Save as PDF"</strong> pada dialog.</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start pt-1.5 border-t border-amber-200/30">
                <span className="bg-amber-500 text-white font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="text-slate-900 font-black">Aktifkan "Grafik Latar Belakang"</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Centang opsi <strong className="text-amber-805">"Grafik Latar Belakang" (Background Graphics)</strong> agar dekorasi Kop Surat & Ceklist berwarna tampil.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowDownloadHelper(false);
                  handlePrintDirect();
                }}
                className="flex-1 py-3 bg-emerald-750 hover:bg-emerald-800 text-white rounded-xl text-xs font-black tracking-wider uppercase transition-all shadow-md active:scale-97 cursor-pointer text-center"
              >
                Mulai Unduh Sekarang
              </button>
              <button
                type="button"
                onClick={() => setShowDownloadHelper(false)}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          HIGH-FIDELITY FLUID 2-PAGE PRINTABLE OFFICIAL KUA FORM
          (Only active during body.printing-kua-active)
          ======================================================== */}
      <div id="kua-print-document" className="hidden bg-white text-black select-text">
        
        {/* PAGE 1 CONTENT */}
        <div className="print-page select-text font-sans">
          
          {/* Official Ministry Header */}
          <div className="text-center font-bold tracking-tight uppercase space-y-0.5 select-text font-sans pb-3 border-b-3 border-black">
            <h2 className="text-[13px] font-bold">MONITORING DAN EVALUASI PELAKSANAAN BIMBINGAN PERKAWINAN</h2>
            <h2 className="text-[13px] font-bold">KANTOR KEMENTERIAN AGAMA KOTA TUAL</h2>
            <h3 className="text-[12px] font-black">KANTOR URUSAN AGAMA KECAMATAN PULAU DULLAH UTARA</h3>
            <p className="text-[9px] font-medium font-mono lowercase tracking-normal">Jl. Dupa, Desa Fiditan Kec. Pulau Dullah Utara Kota Tual - Maluku</p>
          </div>

          <div className="mt-6 text-center space-y-1">
            <h3 className="text-[13px] font-black uppercase tracking-wide underline decoration-1.5">
              LEMBAR LAPORAN EVALUASI BIMWIN CATIN MANDIRI
            </h3>
            <p className="text-[10px] font-bold">TAHUN ANGGARAN {evaluasiTahun}</p>
          </div>

          {/* Metadata Block */}
          <div className="mt-6 space-y-2 text-[11px] font-sans">
            <div className="grid grid-cols-12">
              <div className="col-span-4 font-bold">Sifat Dokumen</div>
              <div className="col-span-8">: Arsip Negara Pelayanan KUA (Sangat Penting / Sah)</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-4 font-bold">Nama Pasangan Calon Pengantin</div>
              <div className="col-span-8 font-extrabold uppercase">: {evaluasiCatinPria} & {evaluasiCatinWanita}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-4 font-bold">No. WhatsApp Registrasi</div>
              <div className="col-span-8 font-mono">: {evaluasiCatinPhone}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-4 font-bold">Penyuluh / Narasumber Utama</div>
              <div className="col-span-8 font-extrabold">: {evaluasiPenyuluhName} <span className="text-[10px] font-medium font-mono">(NIP: {evaluasiPenyuluhNip})</span></div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-4 font-bold">Kegiatan & Tema Penataran</div>
              <div className="col-span-8">: {evaluasiKegiatan} - {evaluasiTema}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-4 font-bold">Waktu Pelaksanaan</div>
              <div className="col-span-8">: {evaluasiHariTanggal}</div>
            </div>
          </div>

          {/* Official Evaluation Matrix */}
          <div className="mt-6">
            <h4 className="text-[11px] font-black uppercase tracking-wide mb-2.5">Tabel Matriks Penilaian Ceklist Kelayakan Layanan:</h4>
            <table className="w-full border-collapse border border-black text-[10.5px]">
              <thead>
                <tr className="bg-gray-100 text-center font-bold uppercase">
                  <th className="border border-black p-2 w-8">No</th>
                  <th className="border border-black p-2 text-left">Aspek Pokok Penilaian Layanan Pranikah</th>
                  <th className="border border-black p-2 w-28">Nilai Kelayakan</th>
                  <th className="border border-black p-2 text-left">Catatan Keterangan Hasil Pemantauan</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { key: "q3", num: "1", text: "Aspek kesesuaian penyampaian materi narasumber dengan topik tema" },
                  { key: "q4", num: "2", text: "Kerapian metode penyampaian yang interaktif, sistematis dan mendidik" },
                  { key: "q5", num: "3", text: "Kejelasan penuaian pesan moral terserap dengan utuh oleh seluruh peserta" },
                  { key: "q6", num: "4", text: "Kelayakan sarana, prasarana penunjang kegiatan bimbingan dan kebersihan" },
                  { key: "q7", num: "5", text: "Aspek dedikasi, motivasi tinggi, keaktifan, dan keramahan penyuluh" },
                  { key: "q8", num: "6", text: "Aplikasi kemanfaatan materi bimbingan perkawinan di kehidupan masa depan" }
                ].map((row) => (
                  <tr key={row.key} className="align-middle">
                    <td className="border border-black p-2 text-center font-bold">{row.num}</td>
                    <td className="border border-black p-2 font-bold">{row.text}</td>
                    <td className="border border-black p-2 text-center font-black">{evaluasiRatings[row.key] || "Cukup"}</td>
                    <td className="border border-black p-2 italic font-medium">{evaluasiComments[row.key] || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[9.5px] text-gray-500 italic mt-6 text-center leading-relaxed">
            *Laporan kuesioner evaluasi bimbingan nikah ini diterbitkan secara sah dan tervalidasi digital oleh Kantor Urusan Agama Kecamatan Pulau Dullah Utara Kota Tual.*
          </p>

          <div className="text-right mt-16 text-[10.5px]">
            <p className="font-bold">Pulau Dullah Utara, {evaluasiHariTanggal.split(',')[1] || "26 Mei 2026"}</p>
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-mono">--- Bersambung ke Halaman Penandatanganan (Page 2) ---</p>
          </div>

        </div>

        {/* PAGE 2 CONTENT (SIGNATURES) */}
        <div className="print-page select-text font-sans">
          
          <div className="text-center font-bold tracking-tight uppercase space-y-0.5 select-text font-sans pb-3 border-b-3 border-black">
            <h2 className="text-[13px] font-bold">MONITORING DAN EVALUASI PELAKSANAAN BIMBINGAN PERKAWINAN</h2>
            <h2 className="text-[13px] font-bold">KANTOR KEMENTERIAN AGAMA KOTA TUAL</h2>
            <h3 className="text-[12px] font-black">KANTOR URUSAN AGAMA KECAMATAN PULAU DULLAH UTARA</h3>
          </div>

          <div className="mt-8 text-center space-y-2">
            <h3 className="text-[12px] font-extrabold uppercase tracking-widest font-sans">
              LEMBAR PENGESAHAN DAN OTORISASI VALIDASI
            </h3>
            <p className="text-[10px] font-medium leading-relaxed max-w-2xl mx-auto">
              Segala lampiran isian tanggapan evaluasi dan otorisasi di bawah ini dibuat dalam keadaan sadar, bersungguh-sungguh dengan membubuhkan tanda tangan elektronik legal.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 text-center text-[11px] font-sans font-bold leading-relaxed">
            
            {/* Groom Sign */}
            <div className="space-y-16">
              <p className="uppercase">PESERTA PRIA (CATIN)</p>
              <div className="h-16 flex items-center justify-center border-b border-black mx-4">
                {evaluasiSigPria ? (
                  <img src={evaluasiSigPria} alt="Groom Sign" className="max-h-14 object-contain" />
                ) : (
                  <span className="text-[10px] text-gray-400 italic">Belum Tanda Tangan</span>
                )}
              </div>
              <p className="uppercase font-extrabold underline">{evaluasiCatinPria || "................."}</p>
            </div>

            {/* Bride Sign */}
            <div className="space-y-16">
              <p className="uppercase">PESERTA WANITA (CATIN)</p>
              <div className="h-16 flex items-center justify-center border-b border-black mx-4">
                {evaluasiSigWanita ? (
                  <img src={evaluasiSigWanita} alt="Bride Sign" className="max-h-14 object-contain" />
                ) : (
                  <span className="text-[10px] text-gray-400 italic">Belum Tanda Tangan</span>
                )}
              </div>
              <p className="uppercase font-extrabold underline">{evaluasiCatinWanita || "................."}</p>
            </div>

            {/* Educator Sign */}
            <div className="space-y-16">
              <p className="uppercase">NARASUMBER / PENYULUH</p>
              <div className="h-16 flex items-center justify-center border-b border-black mx-4">
                {evaluasiSigPenyuluh ? (
                  <img src={evaluasiSigPenyuluh} alt="Educator Sign" className="max-h-14 object-contain" />
                ) : (
                  <span className="text-[10px] text-gray-400 italic">Belum Tanda Tangan</span>
                )}
              </div>
              <div className="space-y-0.5">
                <p className="uppercase font-extrabold underline">{evaluasiPenyuluhName || "................."}</p>
                <p className="text-[9px] font-mono text-gray-500">NIP. {evaluasiPenyuluhNip || ".................."}</p>
              </div>
            </div>

          </div>

          {/* Validation Seal info */}
          <div className="mt-28 p-5 bg-gray-50 border border-black rounded-lg text-left text-[10px] font-sans leading-relaxed space-y-1">
            <p className="font-extrabold uppercase">DEKLARASI INTEGRITAS PELAYANAN:</p>
            <p className="text-gray-700 font-medium">
              Formulir kuesioner evaluasi di atas disimpan dan dikelola oleh Sub Bagian Layanan Informasi KUA Pulau Dullah Utara Kota Tual demi penyempurnaan bimbingan perkawinan sakinah secara berkelanjutan. Dokumen ini sah digunakan sebagai bukti kredibilitas fisik kepuasan keterlibatan bimbingan.
            </p>
            <div className="pt-2 text-[9px] text-gray-505 font-mono text-right font-semibold">
              WAKTU PENERBITAN BERKAS DIGITAL: 26 MEI 2026 - KUA PULAU DULLAH UTARA.
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================
          TOAST SYSTEM Elegant notification display
          ======================================================== */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-55 bg-indigo-900 border border-indigo-500/30 text-white font-black text-xs px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-2.5 animate-fade-in no-print font-sans">
          <div className="w-5 h-5 bg-indigo-505/30 text-emerald-400 rounded-full flex items-center justify-center">
            <Check className="h-3.5 w-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
