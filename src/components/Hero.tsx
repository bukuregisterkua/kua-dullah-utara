import { Heart, Globe, ChevronRight, CheckCircle, FileText, Clock, Facebook, Instagram, Twitter, Youtube, Music } from "lucide-react";
import { motion } from "motion/react";
import { Settings } from "../types";

interface HeroProps {
  settings: Settings;
  setCurrentTab: (tab: string) => void;
  onAdminClick: () => void;
}

export default function Hero({ settings, setCurrentTab, onAdminClick }: HeroProps) {
  return (
    <div 
      className="relative overflow-hidden bg-white min-h-[calc(100vh-73px)] flex flex-col justify-center items-center transition-all px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20"
      style={settings.heroBgImg ? {
        backgroundImage: `linear-gradient(rgba(242, 249, 245, 0.5), rgba(242, 249, 245, 0.35)), url(${settings.heroBgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } : undefined}
    >
      
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-70 -z-10 animate-pulse duration-5000" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl opacity-50 -z-10" />
 
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center relative">
        
        {/* Main Hero Content - Centered Protected Glass Card */}
        <div className={`w-full max-w-4xl text-center flex flex-col items-center justify-center p-6 sm:p-10 md:p-14 rounded-[2.5rem] backdrop-blur-md bg-white/85 border border-white/90 shadow-2xl relative z-10 mb-8`}>
          
          {/* Banner Utama - Terinspirasi Desain KUA Revitalisasi Nasional */}
          <div className="w-full bg-gradient-to-br from-emerald-55/80 via-emerald-100/40 to-teal-50/50 rounded-3xl p-6 sm:p-8 md:p-10 border border-emerald-100/70 relative overflow-hidden flex flex-col items-center">
            {/* Background decorative graphic */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-200/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-200/10 rounded-full blur-3xl -z-10" />

            {/* Bait Pertama: Selamat Datang di */}
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-slate-800 font-sans font-bold text-sm sm:text-lg md:text-xl tracking-wide select-none"
            >
              Selamat Datang di
            </motion.p>
            
            {/* Bait Kedua: KUA REVITALISASI */}
            <motion.h2 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="mt-1 text-4xl sm:text-5xl lg:text-6xl font-black font-display text-emerald-600 tracking-tight leading-none uppercase select-none filter drop-shadow-[0_2px_8px_rgba(5,150,105,0.08)]"
            >
              KUA REVITALISASI
            </motion.h2>
          </div>

          {/* Big overlapping circular logo emblem (replaces standard logo view) */}
          {settings.logoImg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="relative -mt-10 sm:-mt-12 mb-6 z-20 flex justify-center"
            >
              {/* Outer bright neon lime gradient ring matches reference image logo ring */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#bef264] via-[#84cc16] to-[#4d7c0f] rounded-full p-1.5 shadow-md flex items-center justify-center">
                {/* Inner white circular core protecting the logo */}
                <div className="w-full h-full bg-white rounded-full p-2.5 flex items-center justify-center shadow-inner overflow-hidden">
                  <img 
                    src={settings.logoImg} 
                    alt="Logo Kemenag RI" 
                    className="w-full h-full object-contain filter drop-shadow-2xs"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Lower Typographic Section (Bait Ke-4 & Ke-5) - Modern, sleek & simplified */}
          <div className="flex flex-col items-center text-center select-none w-full mb-3">
            {/* Bait Ke-4: KANTOR URUSAN AGAMA */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.26 }}
              className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.3em] text-slate-500 font-bold select-none font-sans"
            >
              KANTOR URUSAN AGAMA
            </motion.span>
            
            {/* Bait Ke-5: PULAU DULLAH UTARA */}
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.32 }}
              className="mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-display tracking-wide uppercase select-none leading-none"
            >
              PULAU DULLAH UTARA
            </motion.h3>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-5 text-sm sm:text-base lg:text-lg text-slate-700 font-medium leading-relaxed max-w-3xl mx-auto text-center whitespace-pre-line"
          >
            {settings.bannerSubtitle || "Pusat Pelayanan Keagamaan Digital Pulau Dullah Utara, Kota Tual.\nMelayani Administrasi Nikah, Wakaf, Konsultasi Keagamaan, dan Bimbingan Ummat secara Profesional, Mudah, Cepat, dan Terintegrasi."}
          </motion.p>

          {/* Social Media Row for Visitors */}
          {(settings.facebookUrl || settings.instagramUrl || settings.twitterUrl || settings.tiktokUrl || settings.youtubeUrl) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="mt-6 flex flex-col items-center space-y-2 select-none"
            >
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#15803d]">Hubungi & Ikuti Media Sosial Resmi KUA:</span>
              <div className="flex items-center space-x-3.5 pt-1">
                {settings.facebookUrl && (
                  <a 
                    href={settings.facebookUrl.startsWith("http") ? settings.facebookUrl : `https://${settings.facebookUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white hover:bg-emerald-600 border border-emerald-150 flex items-center justify-center text-emerald-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5"
                    title="Facebook Resmi"
                  >
                    <Facebook className="h-4.5 w-4.5" />
                  </a>
                )}
                {settings.instagramUrl && (
                  <a 
                    href={settings.instagramUrl.startsWith("http") ? settings.instagramUrl : `https://${settings.instagramUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white hover:bg-emerald-600 border border-emerald-150 flex items-center justify-center text-emerald-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5"
                    title="Instagram Resmi"
                  >
                    <Instagram className="h-4.5 w-4.5" />
                  </a>
                )}
                {settings.twitterUrl && (
                  <a 
                    href={settings.twitterUrl.startsWith("http") ? settings.twitterUrl : `https://${settings.twitterUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white hover:bg-emerald-600 border border-emerald-150 flex items-center justify-center text-emerald-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5"
                    title="Twitter / X Resmi"
                  >
                    <Twitter className="h-4.5 w-4.5" />
                  </a>
                )}
                {settings.tiktokUrl && (
                  <a 
                    href={settings.tiktokUrl.startsWith("http") ? settings.tiktokUrl : `https://${settings.tiktokUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white hover:bg-emerald-600 border border-emerald-150 flex items-center justify-center text-emerald-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5"
                    title="TikTok Resmi"
                  >
                    <Music className="h-4.5 w-4.5" />
                  </a>
                )}
                {settings.youtubeUrl && (
                  <a 
                    href={settings.youtubeUrl.startsWith("http") ? settings.youtubeUrl : `https://${settings.youtubeUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white hover:bg-emerald-600 border border-emerald-150 flex items-center justify-center text-emerald-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5"
                    title="YouTube Resmi"
                  >
                    <Youtube className="h-4.5 w-4.5" />
                  </a>
                )}
              </div>
            </motion.div>
          )}

          {/* CTA Option Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8 flex justify-center items-center w-full"
          >
            <button
              onClick={() => setCurrentTab("layanan-pembuka")}
              className="w-full sm:w-auto px-10 py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
              id="hero-layanan-online-btn"
            >
              <span>Mulai Layanan Online</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Fast Value Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 pt-6 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
          >
            <div className="flex items-center justify-center space-x-2 text-slate-700">
              <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
              <span className="text-xs sm:text-sm font-bold">100% Gratis di KUA</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-slate-700">
              <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
              <span className="text-xs sm:text-sm font-bold">Resmi Kemenag</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-slate-700">
              <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
              <span className="text-xs sm:text-sm font-bold">Cepat & Aman</span>
            </div>
          </motion.div>
        </div>

        {/* Sesi Pelayanan Kantor KUA */}
        <div className="w-full max-w-6xl mt-4 relative z-10">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/90 px-4 py-1.5 rounded-full inline-flex items-center space-x-1.5 shadow-xxs">
              <Clock className="h-3.5 w-3.5" />
              <span>Sesi Pelayanan Kantor KUA</span>
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {/* Senin - Kamis Card */}
            <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-0.5" id="hero-schedule-senin-kamis">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Senin s/d Kamis
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <h4 className="text-lg font-bold font-display text-slate-900 mt-4 leading-relaxed font-sans tracking-tight">Hari Kerja Biasa</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed mb-4">
                  Pelayanan penuh untuk seluruh kebutuhan administrasi keagamaan, pendaftaran nikah, wakaf, konsultasi, dan bimbingan ummat secara langsung di kantor KUA.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs space-y-2">
                <span className="text-slate-700 font-bold block mb-1">Jam Pelayanan:</span>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase">Pagi</span>
                    <span className="font-extrabold text-emerald-700">08:00 – 12:00 WIT</span>
                  </div>
                  <div className="flex justify-between items-center bg-amber-50/50 p-1.5 rounded-lg border border-amber-100/40 text-amber-800">
                    <span className="text-[10px] uppercase font-bold">Istirahat</span>
                    <span className="font-bold">12:00 – 13:00 WIT</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase">Siang</span>
                    <span className="font-extrabold text-emerald-700">13:00 – 16:00 WIT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Jumat Card */}
            <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-0.5" id="hero-schedule-jumat">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Hari Jumat
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">WFA</span>
                </div>
                <h4 className="text-lg font-bold font-display text-slate-900 mt-4 leading-relaxed font-sans tracking-tight">Pelayanan WFA</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed mb-4">
                  Pelayanan dilakukan secara online dan melalui WhatsApp (Work From Anywhere) untuk memudahkan masyarakat tetap mendapatkan layanan di hari Jumat.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs space-y-2">
                <span className="text-slate-750 font-bold block mb-1">Jam Pelayanan Online & WA:</span>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase">Sesi 1</span>
                    <span className="font-extrabold text-emerald-700">08:30 – 12:00 WIT</span>
                  </div>
                  <div className="flex justify-between items-center bg-amber-50/50 p-1.5 rounded-lg border border-amber-100/40 text-amber-800">
                    <span className="text-[10px] uppercase font-bold">Istirahat</span>
                    <span className="font-bold">12:00 – 13:30 WIT</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase">Sesi 2</span>
                    <span className="font-extrabold text-emerald-700">13:30 – 17:00 WIT</span>
                  </div>
                </div>
                <div className="mt-2.5 p-2 bg-emerald-50/70 border border-emerald-100/40 rounded-xl text-[9.5px] text-emerald-850 leading-relaxed font-sans">
                  <span className="font-bold block text-emerald-950 mb-0.5">Catatan:</span>
                  Masyarakat dapat menghubungi admin layanan melalui WhatsApp atau mengakses layanan digital yang tersedia selama jam operasional.
                </div>
              </div>
            </div>

            {/* Sabtu - Minggu Card */}
            <div className="bg-white border border-red-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-0.5" id="hero-schedule-sabtu-minggu">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-800 bg-red-50 px-2.5 py-1 rounded-md">
                    Sabtu & Minggu
                  </span>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                </div>
                <h4 className="text-lg font-bold font-display text-slate-900 mt-4 leading-relaxed font-sans tracking-tight">Akhir Pekan</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed mb-4">
                  Kantor tutup untuk pelayanan tatap muka reguler. Namun seluruh layanan online dapat diakses penuh secara digital.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs space-y-2">
                <span className="text-slate-700 font-bold block mb-1">Jam Pelayanan:</span>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between items-center bg-rose-50 p-1.5 rounded-lg border border-rose-100 text-rose-800">
                    <span className="text-[10px] uppercase font-bold">Tatap Muka</span>
                    <span className="font-extrabold text-rose-600">Tutup Pelayanan</span>
                  </div>
                  <div className="flex justify-between items-center bg-emerald-50 p-1.5 rounded-lg border border-emerald-100 text-emerald-800">
                    <span className="text-[10px] uppercase font-bold">Layanan Online</span>
                    <span className="font-extrabold text-emerald-600">Aktif 24 Jam</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
