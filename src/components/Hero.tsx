import { Heart, Globe, ChevronRight, FileText, Clock, Sparkles, ShieldCheck, Smartphone, MessageSquare, BookOpen, Send, Check } from "lucide-react";
import { motion } from "motion/react";
import { Settings } from "../types";

interface HeroProps {
  settings: Settings;
  setCurrentTab: (tab: string) => void;
  onAdminClick: () => void;
}

export default function Hero({ settings, setCurrentTab, onAdminClick }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-b from-emerald-50/60 via-white to-white text-slate-900 pt-6 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-100 transition-all duration-300">
      
      {/* Short & Clean Hero Layout (Mobile Optimized) */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Banner Pemisah Halal/Resmi */}
        <div className="flex justify-center lg:justify-start mb-4 select-none">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-600 text-white px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Portal Resmi Kemenag RI</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4 lg:py-8">
          
          {/* ================= COLUMN LEFT (Texts & Actions) ================= */}
          <div className="lg:col-span-7 flex flex-col space-y-5 text-center lg:text-left">
            <div>
              <span className="text-xs font-black tracking-widest text-emerald-800 uppercase block mb-1">
                Selamat Datang di
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-emerald-700 font-display leading-tight uppercase">
                KUA REVITALISASI
              </h1>
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 tracking-tight leading-snug mt-1">
                Kantor Urusan Agama Kecamatan Pulau Dullah Utara
              </h2>
            </div>
            
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
              {settings.bannerSubtitle || "Pusat pelayanan keagamaan digital untuk administrasi nikah, wakaf, konsultasi, penyuluhan, dan pemberdayaan ummat secara cepat, aman, dan terintegrasi."}
            </p>

            {/* Quick Action Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => setCurrentTab("layanan-pembuka")}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                id="hero-redesign-start-btn"
              >
                <span>Mulai Pelayanan Digital</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("quick-access-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-5 py-3 bg-white text-emerald-800 hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold shadow-xs hover:border-emerald-700 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                id="hero-redesign-info-btn"
              >
                <span>Informasi Layanan</span>
              </button>
            </div>

            {/* Mini Statistics - White Cards with Emerald Accents (Android friendly) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-100 max-w-2xl mx-auto lg:mx-0 text-left select-none">
              
              <div 
                className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center space-x-2"
                title="Akses kapan saja untuk pelayanan administrasi"
              >
                <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-md">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">Online 24 Jam</h4>
                  <p className="text-[10px] text-emerald-600 font-bold tracking-wide mt-1">SISTEM AKTIF</p>
                </div>
              </div>

              <div 
                className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center space-x-2"
                title="Sistem tervalidasi oleh Kementerian Agama"
              >
                <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-md">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">Resmi Kemenag</h4>
                  <p className="text-[10px] text-emerald-600 font-bold tracking-wide mt-1">KREDIBEL & SAH</p>
                </div>
              </div>

              <div 
                className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center space-x-2"
                title="Proses administrasi cepat tanggap"
              >
                <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-md">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">Layanan Cepat</h4>
                  <p className="text-[10px] text-emerald-600 font-bold tracking-wide mt-1">CEPAT TANGGAP</p>
                </div>
              </div>

              <div 
                className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center space-x-2"
                title="Integrasi data kependudukan & SIMKAH"
              >
                <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-md">
                  <Smartphone className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">Sistem Digital</h4>
                  <p className="text-[10px] text-emerald-600 font-bold tracking-wide mt-1">TERINTEGRASI</p>
                </div>
              </div>

            </div>
          </div>

          {/* ================= COLUMN RIGHT (Official Focal Point: Clean Logo) ================= */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center select-none">
              
              {/* Minimalist White Card Background for the National Logo */}
              <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 bg-white border border-slate-200 rounded-2xl shadow-md flex flex-col items-center justify-center p-6">
                
                {/* Master Logo Container */}
                {settings.logoImg && (
                  <div className="relative w-32 h-32 flex items-center justify-center mb-3">
                    <img 
                      src={settings.logoImg} 
                      alt="Logo Kementerian Agama Republik Indonesia" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Indonesian Ministry branding text */}
                <div className="text-center select-none">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800">
                    Kementerian Agama RI
                  </span>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                    Revitalisasi KUA
                  </p>
                </div>
              </div>

              {/* Minimal Clean Badges - Flat design without heavy animations */}
              <div className="absolute top-1 -left-4 sm:-left-8 z-20 flex items-center space-x-1.5 bg-white border border-emerald-600 px-3 py-1 rounded-full text-[9px] uppercase font-extrabold text-emerald-800 shadow-xs cursor-default">
                <span className="h-2 w-2 rounded-full bg-emerald-600 inline-block"></span>
                <span>Layanan Aktif</span>
              </div>

              <div className="absolute bottom-4 -right-2 sm:-right-6 z-20 flex items-center space-x-1 bg-white border border-emerald-600 px-3 py-1 rounded-full text-[9px] uppercase font-extrabold text-emerald-800 shadow-xs cursor-default">
                <Check className="h-3 w-3 text-emerald-600" />
                <span>Resmi Kemenag</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ================= QUICK ACCESS MENU (Compact Standard Minimal Grid) ================= */}
      <div 
        id="quick-access-section"
        className="max-w-7xl mx-auto w-full relative z-10 mt-6 scroll-mt-24"
      >
        <div className="text-center sm:text-left mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block select-none">
              Akses Cepat
            </span>
            <h4 className="text-lg font-bold text-slate-900 mt-1 select-none">
              Menu Utama Pelayanan Keagamaan
            </h4>
          </div>
          <p className="hidden sm:block text-xs text-slate-500">
            Pilih menu di bawah ini untuk pendaftaran langsung & konsultasi.
          </p>
        </div>

        {/* 5-Column High-Speed Low-Latency Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          
          {/* Menu 1: Nikah Online */}
          <div 
            onClick={() => setCurrentTab("nikah")}
            className="group cursor-pointer bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-700 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all shadow-xs"
            id="quick-access-nikah"
          >
            <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center mb-2">
              <Heart className="h-5 w-5" />
            </div>
            <h5 className="text-xs font-extrabold text-slate-800">Nikah Online</h5>
            <p className="text-[9px] text-slate-500 mt-1 line-clamp-1">Syarat & SIMKAH online</p>
          </div>

          {/* Menu 2: Layanan Wakaf */}
          <div 
            onClick={() => setCurrentTab("wakaf")}
            className="group cursor-pointer bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-700 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all shadow-xs"
            id="quick-access-wakaf"
          >
            <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center mb-2">
              <Globe className="h-5 w-5" />
            </div>
            <h5 className="text-xs font-extrabold text-slate-800">Layanan Wakaf</h5>
            <p className="text-[9px] text-slate-500 mt-1 line-clamp-1">Sertifikasi tanah & SIWAK</p>
          </div>

          {/* Menu 3: Buku Tamu Digital */}
          <div 
            onClick={() => setCurrentTab("buku-tamu")}
            className="group cursor-pointer bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-700 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all shadow-xs"
            id="quick-access-bukutamu"
          >
            <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center mb-2">
              <FileText className="h-5 w-5" />
            </div>
            <h5 className="text-xs font-extrabold text-slate-800">Buku Tamu</h5>
            <p className="text-[9px] text-slate-500 mt-1 line-clamp-1">Registrasi kehadiran tamu</p>
          </div>

          {/* Menu 4: Konsultasi Keagamaan */}
          <div 
            onClick={() => {
              setCurrentTab("penyuluhan");
              setTimeout(() => {
                const el = document.getElementById("form-konsultasi-penyuluh");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 150);
            }}
            className="group cursor-pointer bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-700 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all shadow-xs"
            id="quick-access-konsultasi"
          >
            <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center mb-2">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h5 className="text-xs font-extrabold text-slate-800">Konsultasi</h5>
            <p className="text-[9px] text-slate-500 mt-1 line-clamp-1">Konsultasi sakinah & hukum</p>
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
            className="group cursor-pointer bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-700 rounded-xl p-4 col-span-2 md:col-span-1 flex flex-col items-center justify-center text-center transition-all shadow-xs"
            id="quick-access-penyuluhan"
          >
            <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center mb-2">
              <BookOpen className="h-5 w-5" />
            </div>
            <h5 className="text-xs font-extrabold text-slate-800">Penyuluhan</h5>
            <p className="text-[9px] text-slate-500 mt-1 line-clamp-1">Bimbingan dakwah & muallaf</p>
          </div>

        </div>
      </div>

      {/* Floating Low-Overhead WhatsApp CTA (Standard clean green, no animation ping loop) */}
      {settings.whatsappNumber && (
        <a
          href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappText || "Assalamu'alaikum Admin KUA Pulau Dullah Utara, saya ingin bertanya.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 cursor-pointer active:scale-95 transition-all flex items-center justify-center border border-white"
          title="Kirim WhatsApp Layanan KUA"
        >
          <Send className="w-5 h-5" />
          <span className="hidden sm:inline text-xs font-bold ml-1.5 whitespace-nowrap uppercase">WhatsApp KUA</span>
        </a>
      )}

    </div>
  );
}
