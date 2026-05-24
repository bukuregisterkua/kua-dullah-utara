import { Heart, Globe, ChevronRight, CheckCircle, FileText, Clock, Facebook, Instagram, Twitter, Youtube, Music, Calendar, Smartphone, Sparkles, Coffee, ShieldCheck, Award, MessageSquare, BookOpen, Send } from "lucide-react";
import { motion } from "motion/react";
import { Settings } from "../types";

interface HeroProps {
  settings: Settings;
  setCurrentTab: (tab: string) => void;
  onAdminClick: () => void;
}

export default function Hero({ settings, setCurrentTab, onAdminClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white min-h-[calc(100vh-73px)] flex flex-col justify-between transition-all pt-8 pb-14 px-4 sm:px-6 lg:px-8">
      
      {/* 1. Cinematic Background & Overlays */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center scale-102 pointer-events-none filter blur-[2px] opacity-75 md:opacity-85"
        style={{
          backgroundImage: `url(${settings.heroBgImg || "/uploads/kua_building_bg_1779609029982.png"})`
        }}
      />
      {/* Dark Government Aesthetic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/75 to-emerald-950/85 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30 z-0 pointer-events-none" />
      
      {/* Soft Glowing Emerald Corner Accents */}
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse duration-5000" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-amber-400/5 rounded-full blur-[90px] pointer-events-none z-0" />

      {/* Main Structural Grid */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex-grow flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center py-6 sm:py-10">
          
          {/* ================= COLUMN LEFT ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col space-y-6 text-left"
          >
            {/* Teks Kecil Welcome Badge */}
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full w-max text-xs font-bold text-emerald-300 uppercase tracking-widest shadow-[0_4px_12px_rgba(16,185,129,0.05)] select-none">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span>Selamat Datang di</span>
            </div>

            {/* Judul Besar Premium */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-300 font-display uppercase select-none drop-shadow-[0_2px_10px_rgba(5,150,105,0.15)]">
                KUA REVITALISASI
              </h1>
              {/* Subjudul */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#f8fafc] tracking-tight font-display drop-shadow-sm leading-tight">
                Kantor Urusan Agama Kecamatan Pulau Dullah Utara
              </h2>
            </div>
            
            {/* Deskripsi Singkat */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-sans drop-shadow-xs">
              {settings.bannerSubtitle || "Pusat pelayanan keagamaan digital modern untuk administrasi nikah, wakaf, konsultasi, penyuluhan, dan pelayanan ummat secara cepat, aman, dan terintegrasi."}
            </p>

            {/* Tombol Utama Premium */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => setCurrentTab("layanan-pembuka")}
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center space-x-2.5 border border-emerald-400/20 cursor-pointer group"
                id="hero-redesign-start-btn"
              >
                <span>Mulai Pelayanan Digital</span>
                <ChevronRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("quick-access-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-white rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center space-x-2 border border-slate-700/60 hover:border-emerald-500/30 cursor-pointer"
                id="hero-redesign-info-btn"
              >
                <span>Lihat Informasi Layanan</span>
              </button>
            </div>

            {/* Statistik Kecil Modern Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/60 max-w-2xl">
              <div className="flex items-center space-x-2 text-slate-300/90 hover:text-emerald-400 transition-colors duration-200">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <Globe className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black tracking-wide leading-none text-white">Online 24 Jam</span>
                  <span className="text-[9px] text-slate-400/80 uppercase font-bold tracking-widest mt-0.5">Sistem Aktif</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-slate-300/90 hover:text-emerald-400 transition-colors duration-200">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black tracking-wide leading-none text-white">Resmi Kemenag</span>
                  <span className="text-[9px] text-slate-400/80 uppercase font-bold tracking-widest mt-0.5">Kredibel & Sah</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-slate-300/90 hover:text-emerald-400 transition-colors duration-200">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <Clock className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black tracking-wide leading-none text-white">Pelayanan Cepat</span>
                  <span className="text-[9px] text-slate-400/80 uppercase font-bold tracking-widest mt-0.5">Tanpa Antre</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-slate-300/90 hover:text-emerald-400 transition-colors duration-200">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <Smartphone className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black tracking-wide leading-none text-white">Terintegrasi</span>
                  <span className="text-[9px] text-slate-400/80 uppercase font-bold tracking-widest mt-0.5">Digital Modern</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================= COLUMN RIGHT ================= */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end xl:pr-4"
          >
            {/* Premium Glass Card */}
            <div className="w-full max-w-sm rounded-[2.25rem] backdrop-blur-md bg-slate-900/40 border border-white/10 p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col items-center justify-between text-center select-none group hover:border-emerald-500/35 transition-all duration-500">
              
              {/* Subtle shining light effects */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-[60px] pointer-events-none" />
              
              {/* Floating Badge */}
              <div className="absolute top-4 right-4 flex items-center space-x-1.5 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 rounded-full text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-emerald-300 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Pelayanan Digital Aktif</span>
              </div>

              {/* Logo Kemenag with Grand Gold Ring */}
              {settings.logoImg && (
                <div className="relative mt-8 mb-6 flex justify-center">
                  <div className="w-24 h-24 bg-gradient-to-tr from-amber-400 via-emerald-500 to-teal-400 rounded-full p-1.5 shadow-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-700">
                    {/* Inner core */}
                    <div className="w-full h-full bg-[#030712] rounded-full p-2.5 flex items-center justify-center shadow-inner overflow-hidden">
                      <img 
                        src={settings.logoImg} 
                        alt="Logo Kemenag RI" 
                        className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Islamic digital illustration - Geometric pattern composite */}
              <div className="w-full relative py-3 px-4 bg-emerald-950/20 border border-emerald-900/30 rounded-2xl mb-5 text-center flex flex-col items-center">
                <svg className="w-12 h-12 text-amber-300 opacity-80 mb-2 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.3)] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {/* Digital Islamic Star Pattern / Mandala Vector */}
                  <path d="M12 2L15.09 5.09L19.5 5.5L18.91 9.91L22 13L18.91 16.09L19.5 20.5L15.09 19.91L12 23L8.91 19.91L4.5 20.5L5.09 16.09L2 13L5.09 9.91L4.5 5.5L8.91 5.09L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="13" r="4.5" />
                  <path d="M12 9.5V16.5" />
                  <path d="M8.5 13H15.5" />
                </svg>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-400">Kementerian Agama RI</span>
                <h3 className="text-base font-black font-display text-white uppercase tracking-tight mt-0.5">KUA PULAU DULLAH UTARA</h3>
                <p className="text-[11px] text-slate-300 mt-1 max-w-xs leading-normal font-sans">
                  Sistem Informasi Pelayanan Keagamaan dan Pernikahan Profesional, Transparan, Mudah, dan Bebas Gratifikasi.
                </p>
              </div>

              {/* Geometric Islamic Line Deco */}
              <div className="pt-3 border-t border-white/10 w-full flex justify-center items-center gap-2">
                <div className="h-px bg-gradient-to-r from-transparent to-white/10 flex-grow" />
                <span className="text-amber-400 font-serif text-sm">☪</span>
                <div className="h-px bg-gradient-to-l from-transparent to-white/10 flex-grow" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ================= 2. QUICK ACCESS MENU ================= */}
      <motion.div 
        id="quick-access-section"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        className="max-w-7xl mx-auto w-full relative z-10 mt-6 scroll-mt-24"
      >
        <div className="text-center md:text-left mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10b981] bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-max inline-block">AKSES CEPAT</span>
            <h4 className="text-xl font-extrabold text-white font-display mt-2 flex items-center justify-center md:justify-start gap-2">
              <span>⚡ Menu Pelayanan Digital Utama</span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide">Premium</span>
            </h4>
          </div>
          <div className="hidden md:block">
            <span className="text-xs text-slate-400/80 font-mono">Pilih menu di bawah ini untuk memulai pengurusan berkas atau konsultasi gratis</span>
          </div>
        </div>

        {/* 5-Column Grid with Hover Glow Emerald */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          
          {/* Menu 1: Nikah Online */}
          <div 
            onClick={() => setCurrentTab("nikah")}
            className="group cursor-pointer bg-slate-900/40 hover:bg-slate-900/95 backdrop-blur-md border border-white/10 hover:border-emerald-500/50 rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] shadow-lg"
            id="quick-access-nikah"
          >
            <div className="w-12 h-12 bg-emerald-500/10 group-hover:bg-emerald-600 group-hover:text-white rounded-xl flex items-center justify-center text-emerald-400 transition-colors shadow-inner">
              <Heart className="h-6 w-6" />
            </div>
            <div className="mt-3 flex-grow flex flex-col justify-center">
              <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Nikah Online</h5>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">Persyaratan umum & SIMKAH online</p>
            </div>
          </div>

          {/* Menu 2: Layanan Wakaf */}
          <div 
            onClick={() => setCurrentTab("wakaf")}
            className="group cursor-pointer bg-slate-900/40 hover:bg-slate-900/95 backdrop-blur-md border border-white/10 hover:border-emerald-500/50 rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] shadow-lg"
            id="quick-access-wakaf"
          >
            <div className="w-12 h-12 bg-emerald-500/10 group-hover:bg-emerald-600 group-hover:text-white rounded-xl flex items-center justify-center text-emerald-400 transition-colors shadow-inner">
              <Globe className="h-6 w-6" />
            </div>
            <div className="mt-3 flex-grow flex flex-col justify-center">
              <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Layanan Wakaf</h5>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">Sertifikasi tanah wakaf & SIWAK</p>
            </div>
          </div>

          {/* Menu 3: Buku Tamu Digital */}
          <div 
            onClick={() => setCurrentTab("buku-tamu")}
            className="group cursor-pointer bg-slate-900/40 hover:bg-slate-900/95 backdrop-blur-md border border-white/10 hover:border-emerald-500/50 rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] shadow-lg"
            id="quick-access-bukutamu"
          >
            <div className="w-12 h-12 bg-emerald-500/10 group-hover:bg-emerald-600 group-hover:text-white rounded-xl flex items-center justify-center text-emerald-400 transition-colors shadow-inner">
              <FileText className="h-6 w-6" />
            </div>
            <div className="mt-3 flex-grow flex flex-col justify-center">
              <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Buku Tamu</h5>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">Mengisi registrasi kunjungan KUA resmi</p>
            </div>
          </div>

          {/* Menu 4: Konsultasi Keagamaan */}
          <div 
            onClick={() => setCurrentTab("penyuluhan")}
            className="group cursor-pointer bg-slate-900/40 hover:bg-slate-900/95 backdrop-blur-md border border-white/10 hover:border-emerald-500/50 rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] shadow-lg"
            id="quick-access-konsultasi"
          >
            <div className="w-12 h-12 bg-emerald-500/10 group-hover:bg-emerald-600 group-hover:text-white rounded-xl flex items-center justify-center text-emerald-400 transition-colors shadow-inner">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="mt-3 flex-grow flex flex-col justify-center">
              <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Konsultasi WA</h5>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">Konsultasi gratis & bimbingan syariah</p>
            </div>
          </div>

          {/* Menu 5: Penyuluhan Agama */}
          <div 
            onClick={() => {
              setCurrentTab("penyuluhan");
              setTimeout(() => {
                const el = document.getElementById("form-konsultasi-penyuluh");
                el?.scrollIntoView({ behavior: "smooth" });
              }, 150);
            }}
            className="group cursor-pointer bg-slate-900/40 hover:bg-slate-900/95 backdrop-blur-md border border-white/10 hover:border-emerald-500/50 rounded-2xl p-5 col-span-2 md:col-span-1 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] shadow-lg"
            id="quick-access-penyuluhan"
          >
            <div className="w-12 h-12 bg-emerald-500/10 group-hover:bg-emerald-600 group-hover:text-white rounded-xl flex items-center justify-center text-emerald-400 transition-colors shadow-inner">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="mt-3 flex-grow flex flex-col justify-center">
              <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Penyuluhan</h5>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">Jadwal bimbingan & materi dakwah</p>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Modern Compact Floating WhatsApp Button */}
      {settings.whatsappNumber && (
        <a
          href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappText || "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 p-3 sm:p-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.6)] cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center border border-white/20"
          title="Hubungi WhatsApp KUA"
        >
          {/* Ripple rings */}
          <span className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20 -z-10 group-hover:animate-none"></span>
          <Send className="w-5.5 h-5.5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 group-hover:ml-2 text-xs font-black tracking-wide whitespace-nowrap uppercase">Konsultasi WA</span>
        </a>
      )}

    </div>
  );
}
