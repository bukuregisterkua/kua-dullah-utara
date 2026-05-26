import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen, ClipboardList, HelpCircle } from "lucide-react";
import { Settings } from "../types";

interface HeroProps {
  settings: Settings;
  setCurrentTab: (tab: string) => void;
  onAdminClick?: () => void;
}

export default function Hero({ settings, setCurrentTab, onAdminClick: _onAdminClick }: HeroProps) {
  // Clean multiline titles
  const formattedTitleLines = settings.bannerTitle 
    ? settings.bannerTitle.split("\n") 
    : ["KANTOR URUSAN AGAMA", "PULAU DULLAH UTARA"];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-24 px-6 sm:px-12 rounded-[2rem] border border-teal-500/10 shadow-[0_15px_60px_rgba(20,184,166,0.05)] mx-4 sm:mx-8 lg:mx-auto max-w-7xl">
      
      {/* Dynamic Background Image Overlay if settings.heroBgImg exists, else gradient flow */}
      {settings.heroBgImg ? (
        <div className="absolute inset-0 z-0">
          <img 
            src={settings.heroBgImg} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-15"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/90 to-emerald-950/20 pointer-events-none" />
        </div>
      ) : (
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <div className="absolute -top-12 -left-12 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-16 -right-16 w-120 h-120 bg-teal-500 rounded-full blur-3xl" />
        </div>
      )}

      {/* Floating horizontal light beam details */}
      <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 bg-emerald-950 border border-emerald-550/40 text-emerald-300 font-extrabold text-[9px] sm:text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>Sistem Informasi & Evaluasi Keagamaan Terpadu</span>
        </motion.div>

        {/* Big Displays Title */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.1] text-white">
            {formattedTitleLines.map((line, idx) => (
              <span key={idx} className="block last:text-emerald-400 last:drop-shadow-[0_4px_16px_rgba(16,185,129,0.15)]">
                {line}
              </span>
            ))}
          </h1>
        </div>

        {/* Subtext description paragraph */}
        <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-medium">
          {settings.bannerSubtitle || "Pusat Pelayanan Keagamaan Digital Pulau Dullah Utara, Kota Tual. Melayani Administrasi Nikah, Wakaf, Konsultasi Keagamaan, dan Bimbingan Ummat secara Profesional, Mudah, Cepat, dan Terintegrasi."}
        </p>

        {/* Main call-to-actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setCurrentTab("layanan-pembuka")}
            className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-950/20 active:scale-97 cursor-pointer transition-all flex items-center justify-center gap-2"
          >
            <span>Daftar Persyaratan & Layanan</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setCurrentTab("buku-tamu")}
            className="px-6 py-4 bg-slate-900 hover:bg-slate-850 text-slate-100 border border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest active:scale-97 cursor-pointer transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <span>Isi Buku Tamu Digital</span>
          </button>
        </div>

        {/* Supplimental 3-column features details in small boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-slate-800/60 max-w-3xl mx-auto">
          <div className="p-4 bg-slate-950/45 border border-slate-800 rounded-2xl flex flex-col items-center text-center">
            <ClipboardList className="h-5 w-5 text-emerald-400 mb-2" />
            <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-tight text-white">100% Bebas Pungli</h5>
            <p className="text-[9.5px] text-slate-400 mt-1 leading-normal">Segala pengurusan di KUA gratis (RP 0,-) jika dilangsungkan di dalam kantor pada jam operasional.</p>
          </div>

          <div className="p-4 bg-slate-950/45 border border-slate-800 rounded-2xl flex flex-col items-center text-center">
            <HelpCircle className="h-5 w-5 text-emerald-400 mb-2" />
            <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-tight text-white">Sertifikat Syariah</h5>
            <p className="text-[9.5px] text-slate-400 mt-1 leading-normal">Membimbing penandatanganan Muallaf, memandu pendaftaran legalitas Wakaf, serta perumusan berkas Nikah.</p>
          </div>

          <div className="p-4 bg-slate-950/45 border border-slate-800 rounded-2xl flex flex-col items-center text-center">
            <Sparkles className="h-5 w-5 text-emerald-400 mb-2" />
            <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-tight text-white">Evaluasi Bimwin</h5>
            <p className="text-[9.5px] text-slate-400 mt-1 leading-normal">Isi lembar kuesioner monitoring untuk mencetak kop Kemenag RI, TTD Catin, dan simpan laporan PDF A4.</p>
          </div>
        </div>

      </div>

    </section>
  );
}
