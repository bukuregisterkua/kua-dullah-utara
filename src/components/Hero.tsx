import { Heart, Globe, ChevronRight, CheckCircle, FileText, Clock, Sparkles, ShieldCheck, Smartphone, MessageSquare, BookOpen, Send, Check } from "lucide-react";
import { motion } from "motion/react";
import { Settings } from "../types";

interface HeroProps {
  settings: Settings;
  setCurrentTab: (tab: string) => void;
  onAdminClick: () => void;
}

export default function Hero({ settings, setCurrentTab, onAdminClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white min-h-[calc(100vh-80px)] xl:min-h-[85vh] flex flex-col justify-between pt-10 pb-12 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      
      {/* 1. Cinematic Background with Overlay, Vignette & Blur */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center scale-105 pointer-events-none filter blur-[3px] opacity-70 md:opacity-[0.78] transition-all duration-700"
        style={{
          backgroundImage: `url(${settings.heroBgImg || "/uploads/kua_building_bg_1779609029982.png"})`
        }}
        id="hero-cinematic-bg"
      />
      
      {/* Vignette & Gradient Overlays (Center-focused cinematic lighting) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/60 to-emerald-950/90 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.1)_0%,rgba(2,6,23,0.95)_100%)] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-0 pointer-events-none" />
      
      {/* Glowing Soft Emerald Spheres (Aesthetic glow in corners & backdrop) */}
      <div className="absolute -top-24 -left-20 w-[450px] h-[450px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse duration-7000" />
      <div className="absolute bottom-24 right-[10%] w-[550px] h-[550px] bg-emerald-400/15 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-1/4 right-[40%] w-96 h-96 bg-amber-400/5 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-6 lg:py-12">
          
          {/* ================= COLUMN LEFT (Texts & Actions) ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col space-y-6 text-left"
          >
            {/* Elegant Welcome Badge */}
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full w-max text-[11px] font-extrabold text-emerald-300 uppercase tracking-widest shadow-[0_4px_15px_rgba(16,185,129,0.05)] select-none">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Selamat Datang di Portal Resmi</span>
            </div>

            {/* Main Premium Typography */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-300 font-display uppercase select-none drop-shadow-[0_2px_15px_rgba(16,185,129,0.2)]">
                KUA REVITALISASI
              </h1>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#f1f5f9] tracking-tight font-display drop-shadow-md leading-tight">
                Kantor Urusan Agama Kecamatan Pulau Dullah Utara
              </h2>
            </div>
            
            {/* Elegant Modern Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-sans drop-shadow-sm">
              {settings.bannerSubtitle || "Pusat pelayanan keagamaan digital modern untuk administrasi nikah, wakaf, konsultasi, penyuluhan, dan pelayanan ummat secara cepat, aman, dan terintegrasi."}
            </p>

            {/* Double Premium Glowing Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => setCurrentTab("layanan-pembuka")}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-full text-xs sm:text-sm font-extrabold shadow-[0_4px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2.5 border border-emerald-400/30 cursor-pointer group"
                id="hero-redesign-start-btn"
              >
                <span>Mulai Pelayanan Digital</span>
                <ChevronRight className="h-4.5 w-4.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("quick-access-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-4 bg-slate-900/40 hover:bg-slate-800/60 text-slate-200 hover:text-white rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center space-x-2 border border-slate-700/60 hover:border-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md"
                id="hero-redesign-info-btn"
              >
                <span>Informasi Layanan</span>
              </button>
            </div>

            {/* Mini Statistics - Compact Glass Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8 border-t border-slate-800/60 max-w-2xl select-none">
              
              <div 
                className="px-4 py-3 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl flex items-center space-x-2.5 hover:border-emerald-500/20 hover:bg-slate-900/60 transition-all duration-300 group"
                title="Akses kapan saja untuk pelayanan administrasi"
              >
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 group-hover:scale-105 transition-transform">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white leading-none">Online 24 Jam</h4>
                  <p className="text-[9px] text-[#10b981] font-bold tracking-wider mt-1">SISTEM AKTIF</p>
                </div>
              </div>

              <div 
                className="px-4 py-3 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl flex items-center space-x-2.5 hover:border-emerald-500/20 hover:bg-slate-900/60 transition-all duration-300 group"
                title="Sistem tervalidasi oleh Kementerian Agama"
              >
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white leading-none">Resmi Kemenag</h4>
                  <p className="text-[9px] text-emerald-300 font-bold tracking-wider mt-1">KREDIBEL & SAH</p>
                </div>
              </div>

              <div 
                className="px-4 py-3 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl flex items-center space-x-2.5 hover:border-emerald-500/20 hover:bg-slate-900/60 transition-all duration-300 group"
                title="Proses administrasi cepat tanggap"
              >
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 group-hover:scale-105 transition-transform">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white leading-none">Layanan Cepat</h4>
                  <p className="text-[9px] text-emerald-300 font-bold tracking-wider mt-1">TANPA ANTREAN</p>
                </div>
              </div>

              <div 
                className="px-4 py-3 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl flex items-center space-x-2.5 hover:border-emerald-500/20 hover:bg-slate-900/60 transition-all duration-300 group"
                title="Integrasi data kependudukan & SIMKAH"
              >
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 group-hover:scale-105 transition-transform">
                  <Smartphone className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white leading-none">Sistem Digital</h4>
                  <p className="text-[9px] text-amber-400 font-bold tracking-wider mt-1">TERINTEGRASI</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ================= COLUMN RIGHT (Grand Focal Point - Large Logo & Deco) ================= */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            {/* Ambient Behind-Glow Area */}
            <div className="absolute w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px] animate-pulse duration-4000" />
            
            {/* Outer Concentric Animated Spin Ring */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center select-none">
              
              {/* Geometric Background Mandala Pattern */}
              <div className="absolute inset-0 opacity-15 text-emerald-500 scale-110 pointer-events-none animate-spin-slow">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.4">
                  <circle cx="50" cy="50" r="45" strokeDasharray="2,2"/>
                  <circle cx="50" cy="50" r="40"/>
                  <path d="M50 5 L50 95 M5 50 L95 50" />
                  <polygon points="50,5 95,50 50,95 5,50" />
                  <polygon points="50,15 85,50 50,85 15,50" />
                  <polygon points="50,25 75,50 50,75 25,50" strokeWidth="0.2" />
                  <rect x="25" y="25" width="50" height="50" rx="4" />
                  <rect x="35" y="35" width="30" height="30" rx="3" strokeDasharray="1,2" />
                </svg>
              </div>

              {/* Glassmorphic Central Shield Card */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="relative z-10 w-64 h-64 sm:w-76 sm:h-76 backdrop-blur-xl bg-slate-900/50 border border-white/10 rounded-full shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center p-6 sm:p-8 hover:border-emerald-500/40 transition-colors duration-500 group"
              >
                {/* Embedded Shining Light Swipe */}
                <div className="absolute top-0 -left-60 w-32 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-30 group-hover:left-60 transition-all duration-1000" />

                {/* Inner Glowing Ring */}
                <div className="absolute inset-4 border border-emerald-500/25 rounded-full pointer-events-none animate-pulse" />
                <div className="absolute inset-6 border border-amber-400/15 rounded-full pointer-events-none" />

                {/* Giant Master Logo Container */}
                {settings.logoImg && (
                  <div className="relative w-36 h-36 flex items-center justify-center filter drop-shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-transform duration-500 group-hover:scale-105 active:scale-95 cursor-pointer">
                    {/* Ring Accents */}
                    <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-400/90 via-emerald-500/90 to-teal-400/95 rounded-full p-[3px] shadow-2xl">
                      <div className="w-full h-full bg-[#030712] rounded-full flex items-center justify-center overflow-hidden">
                        <img 
                          src={settings.logoImg} 
                          alt="Logo Kementerian Agama Republik Indonesia" 
                          className="w-full h-full p-2 object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Micro branding content */}
                <div className="mt-4 text-center z-10 select-none">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#10b981] drop-shadow-sm">
                    Kementerian Agama RI
                  </span>
                  <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">
                    Revitalisasi KUA
                  </p>
                </div>
              </motion.div>

              {/* SURROUNDING FLOATING BADGES (Asynchronous delay floats) */}
              {/* Badge 1: Pelayanan Digital Aktif */}
              <motion.div 
                animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.2 }}
                className="absolute top-2 -left-4 sm:-left-12 z-20 flex items-center space-x-1.5 bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-[9px] uppercase font-black tracking-wider text-emerald-300 shadow-[0_4px_15px_rgba(16,185,129,0.15)] hover:border-emerald-400 cursor-default select-none group/badge"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="group-hover/badge:text-white transition-colors">Pelayanan Digital Aktif</span>
              </motion.div>

              {/* Badge 2: Revitalisasi KUA */}
              <motion.div 
                animate={{ y: [0, 10, 0], x: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.8 }}
                className="absolute bottom-6 -right-6 sm:-right-10 z-20 flex items-center space-x-1 bg-slate-900/90 backdrop-blur-md border border-amber-500/30 px-3.5 py-1.5 rounded-full text-[9px] font-black tracking-wider text-amber-300 shadow-[0_4px_15px_rgba(245,158,11,0.12)] hover:border-amber-400 cursor-default select-none group/badge"
              >
                <Check className="h-3 w-3 text-amber-400" />
                <span className="group-hover/badge:text-white transition-colors text-[9px] uppercase tracking-wide">Revitalisasi KUA</span>
              </motion.div>

              {/* Badge 3: Online Service 100% */}
              <motion.div 
                animate={{ y: [0, -12, 0], x: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 1.4 }}
                className="absolute -bottom-2 lg:-bottom-6 left-6 z-20 flex items-center space-x-1 bg-slate-900/95 backdrop-blur-md border border-teal-500/30 px-3.5 py-1.5 rounded-full text-[9px] font-black tracking-wider text-teal-300 shadow-[0_4px_15px_rgba(20,184,166,0.1)] hover:border-teal-400 cursor-default select-none group/badge"
              >
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
                <span className="group-hover/badge:text-white transition-colors text-[9px] uppercase tracking-wide">Online Kemenag</span>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* ================= 2. QUICK ACCESS MENU (Compact Glassmorphism Grid) ================= */}
      <motion.div 
        id="quick-access-section"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        className="max-w-7xl mx-auto w-full relative z-10 mt-8 scroll-mt-24"
      >
        <div className="text-center md:text-left mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10b981] bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-max inline-block select-none">AKSES CEPAT</span>
            <h4 className="text-xl font-extrabold text-white font-display mt-2 flex items-center justify-center md:justify-start gap-2 select-none">
              <span>⚡ Menu Pelayanan Digital Utama</span>
              <span className="text-[10px] bg-emerald-400/20 text-[#10b981] border border-emerald-500/20 font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide">Premium Portal</span>
            </h4>
          </div>
          <div className="hidden md:block select-none">
            <span className="text-[11px] text-slate-400 font-medium">Klik menu berikut untuk melakukan pendaftaran berkas, konsultasi, &amp; informasi kunjungan langsung.</span>
          </div>
        </div>

        {/* 5-Column Compact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          
          {/* Menu 1: Nikah Online */}
          <div 
            onClick={() => setCurrentTab("nikah")}
            className="group cursor-pointer bg-slate-900/40 hover:bg-slate-950/95 backdrop-blur-md border border-white/5 hover:border-emerald-500/40 rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] shadow-xl"
            id="quick-access-nikah"
          >
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-500 group-hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-inner group-hover:scale-110">
              <Heart className="h-6 w-6" />
            </div>
            <div className="mt-3.5 flex-grow flex flex-col justify-center select-none">
              <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Nikah Online</h5>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">Persyaratan syariat & SIMKAH online</p>
            </div>
          </div>

          {/* Menu 2: Layanan Wakaf */}
          <div 
            onClick={() => setCurrentTab("wakaf")}
            className="group cursor-pointer bg-slate-900/40 hover:bg-slate-950/95 backdrop-blur-md border border-white/5 hover:border-emerald-500/40 rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] shadow-xl"
            id="quick-access-wakaf"
          >
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-500 group-hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-inner group-hover:scale-110">
              <Globe className="h-6 w-6" />
            </div>
            <div className="mt-3.5 flex-grow flex flex-col justify-center select-none">
              <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Layanan Wakaf</h5>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">Sertifikasi tanah wakaf & SIWAK</p>
            </div>
          </div>

          {/* Menu 3: Buku Tamu Digital */}
          <div 
            onClick={() => setCurrentTab("buku-tamu")}
            className="group cursor-pointer bg-slate-900/40 hover:bg-slate-950/95 backdrop-blur-md border border-white/5 hover:border-emerald-500/40 rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] shadow-xl"
            id="quick-access-bukutamu"
          >
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-500 group-hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-inner group-hover:scale-110">
              <FileText className="h-6 w-6" />
            </div>
            <div className="mt-3.5 flex-grow flex flex-col justify-center select-none">
              <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Buku Tamu</h5>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">Registrasi kehadiran kunjungan kantor</p>
            </div>
          </div>

          {/* Menu 4: Konsultasi Keagamaan / Penyuluh */}
          <div 
            onClick={() => {
              setCurrentTab("penyuluhan");
              setTimeout(() => {
                const el = document.getElementById("form-konsultasi-penyuluh");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 150);
            }}
            className="group cursor-pointer bg-slate-900/40 hover:bg-slate-950/95 backdrop-blur-md border border-white/5 hover:border-emerald-500/40 rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] shadow-xl"
            id="quick-access-konsultasi"
          >
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-500 group-hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-inner group-hover:scale-110">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="mt-3.5 flex-grow flex flex-col justify-center select-none">
              <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Konsultasi</h5>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">Konsultasi keluarga sakinah & hukum</p>
            </div>
          </div>

          {/* Menu 5: Penyuluhan Agama */}
          <div 
            onClick={() => {
              setCurrentTab("penyuluhan");
              setTimeout(() => {
                const el = document.getElementById("program-penyuluhan-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 150);
            }}
            className="group cursor-pointer bg-slate-900/40 hover:bg-slate-950/95 backdrop-blur-md border border-white/5 hover:border-emerald-500/40 rounded-2xl p-5 col-span-2 md:col-span-1 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] shadow-xl"
            id="quick-access-penyuluhan"
          >
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-500 group-hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-inner group-hover:scale-110">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="mt-3.5 flex-grow flex flex-col justify-center select-none">
              <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Penyuluhan</h5>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">Informasi bimbingan dakwah & muallaf</p>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Modern Compact Floating WhatsApp Button with pulsing echo effect */}
      {settings.whatsappNumber && (
        <a
          href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappText || "Assalamu'alaikum Admin KUA Pulau Dullah Utara, saya ingin konsultasi.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 p-3 sm:p-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-[0_4px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.6)] cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center border border-white/25"
          title="Kirim Pesan WhatsApp Layanan KUA"
        >
          {/* Ripple Ring effects */}
          <span className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-25 -z-10 group-hover:animate-none"></span>
          <Send className="w-5.5 h-5.5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 group-hover:ml-2 text-xs font-black tracking-wide whitespace-nowrap uppercase">Konsultasi WA</span>
        </a>
      )}

    </div>
  );
}
