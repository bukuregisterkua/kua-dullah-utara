import { Heart, Globe, MessageSquare, ChevronRight, CheckCircle, FileText, Clock, Facebook, Instagram, Twitter, Youtube, Music } from "lucide-react";
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
            className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => setCurrentTab("nikah")}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
              id="hero-layanan-online-btn"
            >
              <span>Mulai Layanan Online</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => setCurrentTab("kontak")}
              className="w-full sm:w-auto px-8 py-4 bg-white text-emerald-900 ring-2 ring-emerald-100 rounded-2xl text-sm font-bold hover:bg-emerald-50 hover:ring-emerald-200 transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-xs"
              id="hero-hubungi-kami-btn"
            >
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              <span>Hubungi Kantor</span>
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
            <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-0.5">
              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Senin s/d Kamis
                </span>
                <h4 className="text-lg font-bold font-display text-slate-900 mt-4 leading-relaxed font-sans tracking-tight">Hari Kerja Biasa</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Pelayanan penuh untuk semua urusan administrasi, nikah, wakaf, dan bimbingan ummat.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-semibold">Jam Pelayanan:</span>
                <span className="font-extrabold text-emerald-700 font-mono text-sm">08:00 - 16:30 WIT</span>
              </div>
            </div>

            {/* Jumat Card */}
            <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-0.5">
              <div>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
                  Hari Jumat
                </span>
                <h4 className="text-lg font-bold font-display text-slate-900 mt-4 leading-relaxed font-sans tracking-tight">Hari Kerja Pendek</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Pelayanan administrasi diselingi jeda ibadah Shalat Jumat. Disarankan datang lebih pagi.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-semibold">Jam Pelayanan:</span>
                <span className="font-extrabold text-amber-700 font-mono text-sm">08:30 - 17:00 WIT</span>
              </div>
            </div>

            {/* Sabtu - Minggu Card */}
            <div className="bg-white border border-red-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-0.5">
              <div>
                <span className="text-xs font-bold text-red-800 bg-red-50 px-2.5 py-1 rounded-md">
                  Sabtu & Minggu
                </span>
                <h4 className="text-lg font-bold font-display text-slate-900 mt-4 leading-relaxed font-sans tracking-tight">Akhir Pekan</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Kantor tutup untuk pelayanan reguler tatap muka. Anda tetap dapat mengajukan pendaftaran online 24 jam.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-semibold">Jam Pelayanan:</span>
                <span className="font-bold text-red-500 font-mono text-sm">Tutup Pelayanan</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
