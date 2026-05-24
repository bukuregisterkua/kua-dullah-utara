import { 
  Heart, 
  Globe, 
  ChevronRight, 
  FileText, 
  Sparkles, 
  BookOpen, 
  Send, 
  Check,
  Facebook,
  Instagram,
  Music,
  Clock
} from "lucide-react";
import { motion } from "motion/react";
import { Settings } from "../types";

interface HeroProps {
  settings: Settings;
  setCurrentTab: (tab: string) => void;
  onAdminClick: () => void;
}

export default function Hero({ settings, setCurrentTab, onAdminClick }: HeroProps) {
  // Safe extraction of social links
  const fbLink = settings.facebookUrl 
    ? (settings.facebookUrl.startsWith("http") ? settings.facebookUrl : `https://${settings.facebookUrl}`) 
    : "https://facebook.com";
  
  const igLink = settings.instagramUrl 
    ? (settings.instagramUrl.startsWith("http") ? settings.instagramUrl : `https://${settings.instagramUrl}`) 
    : "https://instagram.com";

  const ttLink = settings.tiktokUrl 
    ? (settings.tiktokUrl.startsWith("http") ? settings.tiktokUrl : `https://${settings.tiktokUrl}`) 
    : "https://tiktok.com";

  return (
    <div className="relative min-h-[85vh] text-slate-800 pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none transition-all duration-300">
      
      {/* Background Hero Image / Motif (Gambar Latar Belakang Beranda dengan blur ringan + overlay hijau transparan) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {settings.heroBgImg ? (
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={settings.heroBgImg} 
              alt="Latar Belakang Kantor KUA Pulau Dullah Utara" 
              className="w-full h-full object-cover object-center scale-100 opacity-40 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            {/* Soft government green transparent overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1F8A70]/10 via-white/40 to-[#1F8A70]/10" />
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-slate-50 via-white to-emerald-50/20" />
        )}
        
        {/* Subtle background ornamentation for high visual quality */}
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#1F8A70]/3 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-amber-500/3 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 animate-fade-in space-y-12">
        
        {/* ================= HERO CARD (Card Putih Rounded Besar, Efek Glass) ================= */}
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-[20px] p-6 sm:p-10 shadow-lg relative overflow-hidden text-center flex flex-col items-center">
          
          {/* Welcome Badge */}
          <span className="text-[10px] font-black tracking-widest text-[#1F8A70] uppercase bg-emerald-50 border border-emerald-100/60 px-3 py-1.5 rounded-full mb-5">
            Selamat Datang di
          </span>

          {/* Judul Besar 1 */}
          <h1 className="text-3xl sm:text-4.5xl font-black text-[#1F8A70] tracking-tight uppercase leading-none font-display mb-6">
            KUA REVITALISASI
          </h1>

          {/* Logo Bulat Kemenag di Tengah (Dengan Border Lingkaran Hijau) */}
          <div className="relative mb-6">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#1F8A70] bg-white shadow-md p-4 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-300">
              <img 
                src={settings.logoImg || "/uploads/logokuadullut-1779347095553.png"} 
                alt="Logo Kementerian Agama Tual" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://kemenag.go.id/favicon.ico";
                }}
              />
            </div>
          </div>

          {/* Subjudul & Judul Utama */}
          <div className="space-y-1 mb-5">
            <p className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-slate-400">
              Kantor Urusan Agama
            </p>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-wide uppercase leading-tight">
              PULAU DULLAH UTARA
            </h2>
            <p className="text-[10px] text-slate-500 font-extrabold tracking-widest uppercase mt-0.5">
              Kementerian Agama Kota Tual
            </p>
          </div>

          <div className="w-16 h-[2px] bg-[#1F8A70]/30 mb-6 rounded-full" />

          {/* Deskripsi Resmi */}
          <p className="text-slate-600 text-[12.5px] sm:text-sm leading-relaxed max-w-xl mx-auto font-sans mb-8">
            Pusat Pelayanan Keagamaan Digital Pulau Dullah Utara, Kota Tual. Melayani Administrasi Nikah, Wakaf, Konsultasi Keagamaan, dan Bimbingan Ummat secara Profesional, Mudah, Cepat, dan Terintegrasi.
          </p>

          {/* Sosial Media (Icon Bulat dengan Outline Hijau) */}
          <div className="flex items-center gap-3.5 mb-8">
            <a 
              href={fbLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#1F8A70] text-[#1F8A70] hover:bg-emerald-50 flex items-center justify-center transition-colors"
              title="Facebook KUA Pulau Dullah Utara"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a 
              href={igLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#1F8A70] text-[#1F8A70] hover:bg-emerald-50 flex items-center justify-center transition-colors"
              title="Instagram KUA Pulau Dullah Utara"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a 
              href={ttLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#1F8A70] text-[#1F8A70] hover:bg-emerald-50 flex items-center justify-center transition-colors"
              title="TikTok KUA Pulau Dullah Utara"
            >
              <Music className="h-4 w-4" />
            </a>
          </div>

          {/* Tombol Utama */}
          <button
            onClick={() => setCurrentTab("layanan-pembuka")}
            className="py-3.5 px-8 bg-[#1F8A70] hover:bg-[#19755e] text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2.5 cursor-pointer active:scale-97 mb-6"
            id="hero-redesign-start-btn"
          >
            <span>Mulai Layanan Online</span>
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Info Bawah Checklist (100% Gratis, Resmi Kemenag, Cepat & Aman) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-y-2 gap-x-6 text-[11px] font-bold text-slate-500 pt-2 border-t border-slate-100 w-full max-w-md">
            <span className="flex items-center space-x-1">
              <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>100% Gratis di KUA</span>
            </span>
            <span className="flex items-center space-x-1">
              <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Resmi Kemenag</span>
            </span>
            <span className="flex items-center space-x-1">
              <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Cepat & Aman</span>
            </span>
          </div>

        </div>

        {/* ================= SECTION JAM PELAYANAN ================= */}
        <div className="space-y-6 pt-2">
          
          <div className="flex flex-col items-center justify-center text-center">
            {/* Sesi Pelayanan Header Tag with Forest Green capsule */}
            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 text-[#1F8A70] rounded-full px-4 py-1.5 text-[10px] font-black tracking-widest uppercase">
              <span>SESI PELAYANAN KANTOR KUA</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="operasional-hours-grid">
            
            {/* CARD 1 (Senin–Kamis) */}
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:border-emerald-200 hover:shadow-md transition-all">
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Senin s/d Kamis</span>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Hari Kerja Biasa</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  Pelayanan penuh untuk semua urusan administrasi & kepanduan ummat.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-mono font-black text-[#1F8A70]">
                  <span>JAM LAYANAN:</span>
                </div>
                <div className="text-[13px] font-mono font-black text-slate-800 mt-0.5">
                  08:00 - 16:30 WIT
                </div>
              </div>
            </div>

            {/* CARD 2 (Jumat) */}
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:border-emerald-200 hover:shadow-md transition-all">
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Hari Jumat</span>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Hari Kerja Pendek</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  Diselingi ibadah shalat Jumat bersama warga Pulau Dullah Utara.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-mono font-black text-[#1F8A70]">
                  <span>JAM LAYANAN:</span>
                </div>
                <div className="text-[13px] font-mono font-black text-slate-800 mt-0.5">
                  08:30 - 17:00 WIT
                </div>
              </div>
            </div>

            {/* CARD 3 (Weekend) */}
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:border-rose-200 hover:shadow-md transition-all">
              <div>
                <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest block mb-1">Sabtu & Minggu</span>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Akhir Pekan</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  Kantor tutup, namun pendaftaran SIMKAH online tetap aktif 24 jam.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-mono font-black text-rose-500">
                  <span>STATUS LAYANAN:</span>
                </div>
                <div className="text-[13px] font-mono font-black text-rose-600 mt-0.5 uppercase">
                  Tutup Pelayanan
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================= COMPACT QUICK DIRECT ACCESS MENU ================= */}
        <div 
          id="quick-access-section" 
          className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-[9px] font-black text-emerald-800 uppercase tracking-widest">Kombinasi Akses Mandiri</span>
              <h4 className="text-xs font-black text-slate-900 mt-0.5 uppercase tracking-tight">Kanal Layanan Utama</h4>
            </div>
            <p className="text-[10.5px] text-slate-500">Pilih kanal di bawah untuk beralih langsung ke formulir pendataan.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            {/* Nikah */}
            <div 
              onClick={() => setCurrentTab("nikah")}
              className="cursor-pointer bg-slate-50/50 hover:bg-emerald-50/20 border border-slate-200/80 hover:border-[#1F8A70] p-4 rounded-xl text-center transition-all"
            >
              <div className="w-8 h-8 bg-emerald-50 text-[#1F8A70] rounded-lg flex items-center justify-center mx-auto mb-2.5">
                <Heart className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 block">Layanan Nikah</span>
              <span className="text-[9px] text-slate-400 mt-0.5 block truncate">SIMKAH & Syarat</span>
            </div>

            {/* Wakaf */}
            <div 
              onClick={() => setCurrentTab("wakaf")}
              className="cursor-pointer bg-slate-50/50 hover:bg-emerald-50/20 border border-slate-200/80 hover:border-[#1F8A70] p-4 rounded-xl text-center transition-all"
            >
              <div className="w-8 h-8 bg-emerald-50 text-[#1F8A70] rounded-lg flex items-center justify-center mx-auto mb-2.5">
                <Globe className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 block">Layanan Wakaf</span>
              <span className="text-[9px] text-slate-400 mt-0.5 block truncate">Tanah & Sertifikasi</span>
            </div>

            {/* Muallaf */}
            <div 
              onClick={() => setCurrentTab("muallaf")}
              className="cursor-pointer bg-slate-50/50 hover:bg-emerald-50/20 border border-slate-200/80 hover:border-[#1F8A70] p-4 rounded-xl text-center transition-all"
            >
              <div className="w-8 h-8 bg-emerald-50 text-[#1F8A70] rounded-lg flex items-center justify-center mx-auto mb-2.5">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 block">Muallaf Center</span>
              <span className="text-[9px] text-slate-400 mt-0.5 block truncate">Islam & Sertifikat</span>
            </div>

            {/* Buku Tamu */}
            <div 
              onClick={() => setCurrentTab("buku-tamu")}
              className="cursor-pointer bg-slate-50/50 hover:bg-emerald-50/20 border border-slate-200/80 hover:border-[#1F8A70] p-4 rounded-xl text-center transition-all"
            >
              <div className="w-8 h-8 bg-emerald-50 text-[#1F8A70] rounded-lg flex items-center justify-center mx-auto mb-2.5">
                <FileText className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 block">Buku Tamu</span>
              <span className="text-[9px] text-slate-400 mt-0.5 block truncate">Buku Kunjungan</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
