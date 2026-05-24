import { 
  Heart, 
  Globe, 
  ChevronRight, 
  FileText, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  MessageSquare, 
  BookOpen, 
  Send, 
  Check,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Music,
  Calendar,
  MapPin,
  Building
} from "lucide-react";
import { motion } from "motion/react";
import { Settings } from "../types";

interface HeroProps {
  settings: Settings;
  setCurrentTab: (tab: string) => void;
  onAdminClick: () => void;
}

export default function Hero({ settings, setCurrentTab, onAdminClick }: HeroProps) {
  return (
    <div className="relative bg-slate-100/50 text-slate-800 pt-8 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden select-none transition-all duration-300">
      
      {/* Background motif samar gedung KUA dullah utara dengan blur ringan & opacity super rendah */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full bg-emerald-500/5 blur-3xl absolute -top-1/4 -left-1/4" />
        <div className="w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-3xl absolute -bottom-1/4 -right-1/4" />
        
        {/* Samar-samar ornamen Islami kementerian agama */}
        <div className="opacity-[0.03] scale-110 saturate-50 select-none">
          <svg className="w-96 h-96 text-emerald-800" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.12 0 2.05-.74 2.38-1.75C17.08 6.45 19 9 19 12c0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 animate-fade-in space-y-8">
        
        {/* ================= HERO CARD (Card Putih Rounded Besar) ================= */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden text-center flex flex-col items-center">
          
          {/* Touch of Gold / Emerald Mini Badge */}
          <div className="mb-4 inline-flex items-center space-x-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>Kementerian Agama RI</span>
          </div>

          {/* Logo KUA exactly in the center of the hero card */}
          {settings.logoImg && (
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white border border-slate-100 rounded-2xl shadow-xs p-4 mb-6 flex items-center justify-center hover:scale-102 transition-transform duration-300">
              <img 
                src={settings.logoImg} 
                alt="Logo Kementerian Agama Republik Indonesia Resmi" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Heading utama */}
          <div className="space-y-2 mb-4">
            <h1 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight uppercase font-display leading-none">
              KUA REVITALISASI
            </h1>
            <h2 className="text-sm sm:text-base font-extrabold text-emerald-800 tracking-wider uppercase">
              Kecamatan Pulau Dullah Utara
            </h2>
            <p className="text-[10px] text-slate-500 font-extrabold tracking-widest uppercase">
              Kota Tual, Provinsi Maluku
            </p>
          </div>

          <div className="w-16 h-[2px] bg-emerald-600/30 mb-5 rounded-full" />

          {/* Deskripsi singkat pelayanan KUA */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto font-sans mb-8">
            {settings.bannerSubtitle || "Pusat pelayanan keagamaan digital mandiri untuk pendaftaran perkawinan, bimbingan berkala, sertifikasi tanah wakaf, serta pembekalan sakral keagamaan yang cepat, transparan, dan dapat diakses dengan mudah oleh seluruh lapisan masyarakat."}
          </p>

          {/* Tombol Utama “Mulai Layanan Online” */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs">
            <button
              onClick={() => setCurrentTab("layanan-pembuka")}
              className="w-full py-3 px-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
              id="hero-redesign-start-btn"
            >
              <span>Mulai Layanan Online</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Link Media Sosial Kecil dan Sederhana */}
          {(settings.facebookUrl || settings.instagramUrl || settings.twitterUrl || settings.tiktokUrl || settings.youtubeUrl) && (
            <div className="mt-8 pt-6 border-t border-slate-100 w-full flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2.5">Tautan Media Sosial Resmi</span>
              <div className="flex items-center gap-3">
                {settings.facebookUrl && (
                  <a 
                    href={settings.facebookUrl.startsWith("http") ? settings.facebookUrl : `https://${settings.facebookUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-emerald-700 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-xs"
                    title="Facebook Resmi"
                  >
                    <Facebook className="h-3.5 w-3.5" />
                  </a>
                )}
                {settings.instagramUrl && (
                  <a 
                    href={settings.instagramUrl.startsWith("http") ? settings.instagramUrl : `https://${settings.instagramUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-emerald-700 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-xs"
                    title="Instagram Resmi"
                  >
                    <Instagram className="h-3.5 w-3.5" />
                  </a>
                )}
                {settings.twitterUrl && (
                  <a 
                    href={settings.twitterUrl.startsWith("http") ? settings.twitterUrl : `https://${settings.twitterUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-emerald-700 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-xs"
                    title="X / Twitter Resmi"
                  >
                    <Twitter className="h-3.5 w-3.5" />
                  </a>
                )}
                {settings.tiktokUrl && (
                  <a 
                    href={settings.tiktokUrl.startsWith("http") ? settings.tiktokUrl : `https://${settings.tiktokUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-emerald-700 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-xs"
                    title="TikTok Resmi"
                  >
                    <Music className="h-3.5 w-3.5" />
                  </a>
                )}
                {settings.youtubeUrl && (
                  <a 
                    href={settings.youtubeUrl.startsWith("http") ? settings.youtubeUrl : `https://${settings.youtubeUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-emerald-700 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-xs"
                    title="YouTube Resmi"
                  >
                    <Youtube className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}

        </div>

        {/* ================= GRID INFORMASI (Jam Pelayanan Kantor) ================= */}
        <div className="space-y-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-black tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block uppercase">
              Informasi Operasional
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 uppercase tracking-tight">
              Jam Operasional Pelayanan Kantor
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="operasional-hours-grid">
            
            {/* Card 1: Hari Kerja Biasa */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Senin - Kamis</span>
                <h4 className="text-xs font-bold text-slate-800 uppercase">Hari Kerja Biasa</h4>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700">
                  <span>Pelayanan:</span>
                  <span className="text-emerald-800">07:30 - 16:00 WIT</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Istirahat:</span>
                  <span>12:00 - 13:00 WIT</span>
                </div>
              </div>
            </div>

            {/* Card 2: Hari Jumat */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest block mb-1">Hari Jumat</span>
                <h4 className="text-xs font-bold text-slate-800 uppercase">Jumat Khidmat</h4>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700">
                  <span>Pelayanan:</span>
                  <span className="text-emerald-800">07:30 - 16:30 WIT</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Istirahat Shalat:</span>
                  <span>11:30 - 13:15 WIT</span>
                </div>
              </div>
            </div>

            {/* Card 3: Akhir Pekan */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest block mb-1">Sabtu - Minggu</span>
                <h4 className="text-xs font-bold text-slate-800 uppercase">Akhir Pekan</h4>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700">
                  <span>Pelayanan:</span>
                  <span className="text-rose-600 font-bold">KANTOR TUTUP</span>
                </div>
                <div className="text-[9px] text-slate-400 leading-normal mt-1">
                  Pendaftaran nikah mandiri tetap aktif 24 jam melalui aplikasi SIMKAH Kemenag RI secara online.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================= COMPACT QUICK DIRECT ACCESS MENU ================= */}
        <div 
          id="quick-access-section" 
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-800">Menu Akses Mandiri</span>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5 uppercase tracking-tight">Kanal Layanan Utama Kecamatan</h4>
            </div>
            <p className="text-[11px] text-slate-500">Pilih kanal di bawah untuk mengakses dokumen & persyaratan.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            {/* Nikah */}
            <div 
              onClick={() => setCurrentTab("nikah")}
              className="cursor-pointer bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-600 p-3.5 rounded-lg text-center transition-all"
            >
              <div className="w-8 h-8 bg-emerald-100 text-emerald-800 rounded-md flex items-center justify-center mx-auto mb-2">
                <Heart className="h-4 w-4" />
              </div>
              <h5 className="text-xs font-bold text-slate-800">Layanan Nikah</h5>
              <p className="text-[9px] text-slate-400 mt-0.5 truncate">Daftar SIMKAH online</p>
            </div>

            {/* Wakaf */}
            <div 
              onClick={() => setCurrentTab("wakaf")}
              className="cursor-pointer bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-600 p-3.5 rounded-lg text-center transition-all"
            >
              <div className="w-8 h-8 bg-emerald-100 text-emerald-800 rounded-md flex items-center justify-center mx-auto mb-2">
                <Globe className="h-4 w-4" />
              </div>
              <h5 className="text-xs font-bold text-slate-800">Layanan Wakaf</h5>
              <p className="text-[9px] text-slate-400 mt-0.5 truncate">Sertifikasi & SIWAK</p>
            </div>

            {/* Muallaf */}
            <div 
              onClick={() => setCurrentTab("muallaf")}
              className="cursor-pointer bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-600 p-3.5 rounded-lg text-center transition-all"
            >
              <div className="w-8 h-8 bg-emerald-100 text-emerald-800 rounded-md flex items-center justify-center mx-auto mb-2">
                <BookOpen className="h-4 w-4" />
              </div>
              <h5 className="text-xs font-bold text-slate-800">Muallaf Center</h5>
              <p className="text-[9px] text-slate-400 mt-0.5 truncate">Ikrar & sertifikat resmi</p>
            </div>

            {/* Buku Tamu */}
            <div 
              onClick={() => setCurrentTab("buku-tamu")}
              className="cursor-pointer bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-600 p-3.5 rounded-lg text-center transition-all"
            >
              <div className="w-8 h-8 bg-emerald-100 text-emerald-800 rounded-md flex items-center justify-center mx-auto mb-2">
                <FileText className="h-4 w-4" />
              </div>
              <h5 className="text-xs font-bold text-slate-800">Buku Tamu</h5>
              <p className="text-[9px] text-slate-400 mt-0.5 truncate">Isi kunjungan warga</p>
            </div>

          </div>
        </div>

      </div>

      {/* WhatsApp Static Action Trigger - Low Overhead */}
      {settings.whatsappNumber && (
        <a
          href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappText || "Assalamu'alaikum Admin KUA Pulau Dullah Utara, saya ingin memperoleh info pelayanan.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 cursor-pointer active:scale-95 transition-all flex items-center justify-center border border-white"
          title="Hubungi WhatsApp KUA"
        >
          <Send className="w-4 h-4" />
          <span className="text-[10px] font-black ml-1.5 uppercase tracking-wider">Layanan WA</span>
        </a>
      )}

    </div>
  );
}
