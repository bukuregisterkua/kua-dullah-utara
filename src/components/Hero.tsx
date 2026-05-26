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
    <div className="relative min-h-[85vh] bg-[#faf9f6] text-slate-800 pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none transition-all duration-300">
      
      {/* Background Hero Image / Motif (Gambar Latar Belakang Beranda dengan blur ringan + overlay hijau transparan) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {settings.heroBgImg ? (
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={settings.heroBgImg} 
              alt="Latar Belakang Kantor KUA Pulau Dullah Utara" 
              className="w-full h-full object-cover object-center scale-100 opacity-35 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            {/* Soft government green transparent overlay transitioning to solid alabaster at bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1F8A70]/10 to-[#faf9f6]" />
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-slate-50 via-white to-emerald-50/20" />
        )}
        
        {/* Subtle background ornamentation for high visual quality */}
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-emerald-500/3 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-teal-500/3 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 animate-fade-in space-y-12">
        
        {/* ================= HERO CARD (Card Putih Rounded Besar, Efek Glass) ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-500/10 ring-1 ring-cyan-500/5 relative overflow-hidden text-center flex flex-col items-center">
          
          {/* Welcome Badge with premium modern emerald/cyan aspect */}
          <span className="text-[10px] font-black tracking-widest text-[#1F8A70] uppercase bg-[#e6f4f1] border border-emerald-250 px-3.5 py-1.5 rounded-full mb-5 shadow-xxs flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-emerald-600 animate-pulse" />
            <span>Selamat Datang di</span>
          </span>

          {/* Judul Besar 1 */}
          <h1 className="text-3xl sm:text-4.5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700 tracking-tight uppercase leading-none font-display mb-6">
            KUA REVITALISASI
          </h1>

          {/* Logo Bulat Kemenag di Tengah (Dengan Border Lingkaran Emerald & Soft Cyan Glow) */}
          <div className="relative mb-6">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-emerald-500/10 bg-white shadow-lg p-4 flex items-center justify-center overflow-hidden hover:scale-103 transition-transform duration-300 ring-4 ring-emerald-500/5">
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
            {/* Soft cyan glow background */}
            <div className="absolute -inset-1 rounded-full bg-teal-400/10 blur-md -z-10 pointer-events-none" />
          </div>

          {/* Subjudul & Judul Utama */}
          <div className="space-y-1 mb-5">
            <p className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-slate-400">
              Kantor Urusan Agama
            </p>
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1528] tracking-tight uppercase leading-tight">
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

          {/* Sosial Media (Icon Bulat dengan Outline Emerald & Hover Teal) */}
          <div className="flex items-center gap-3 w-full justify-center mb-8">
            <a 
              href={fbLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-emerald-500/10 text-[#1F8A70] bg-[#e6f4f1]/40 hover:bg-[#1F8A70] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xxs cursor-pointer"
              title="Facebook KUA Pulau Dullah Utara"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a 
              href={igLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-emerald-500/10 text-[#1F8A70] bg-[#e6f4f1]/40 hover:bg-[#1F8A70] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xxs cursor-pointer"
              title="Instagram KUA Pulau Dullah Utara"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a 
              href={ttLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-emerald-500/10 text-[#1F8A70] bg-[#e6f4f1]/40 hover:bg-[#1F8A70] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xxs cursor-pointer"
              title="TikTok KUA Pulau Dullah Utara"
            >
              <Music className="h-4 w-4" />
            </a>
          </div>

          {/* Tombol Utama */}
          <button
            onClick={() => setCurrentTab("layanan-pembuka")}
            className="py-4 px-8 bg-gradient-to-r from-emerald-600 via-[#1F8A70] to-[#125B49] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:shadow-lg hover:shadow-emerald-600/15 transition-all flex items-center justify-center space-x-2.5 cursor-pointer active:scale-97 mb-6"
            id="hero-redesign-start-btn"
          >
            <span>Mulai Layanan Online</span>
            <ChevronRight className="h-4 w-4 shrink-0" />
          </button>

          {/* Info Bawah Checklist (100% Gratis, Resmi Kemenag, Cepat & Aman) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-y-2 gap-x-6 text-[10px] font-black uppercase tracking-wider text-slate-500 pt-4 border-t border-slate-100 w-full max-w-md mb-8">
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

          {/* Subtle line divider before schedule */}
          <div className="w-full h-[1px] bg-slate-100 mb-6" />

          {/* ================= SECTION SESI PELAYANAN KUA INTEGRATED ================= */}
          <div className="w-full text-left space-y-4">
            <div className="text-center space-y-1">
              <h3 className="text-sm sm:text-base font-black text-[#125B49] tracking-tight uppercase font-display">
                Jam & Sesi Pelayanan KUA
              </h3>
              <p className="text-slate-500 text-[10.5px] sm:text-[11px] max-w-md mx-auto leading-relaxed">
                Informasi jadwal pelayanan Kantor Urusan Agama untuk memudahkan masyarakat memperoleh layanan secara cepat dan nyaman.
              </p>
            </div>

            {/* Cards Grid: Tampilan stack vertikal untuk mobile, grid rapi untuk desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              {/* CARD 1: Jam Operasional */}
              <div className="bg-emerald-50/40 hover:bg-emerald-50/70 border border-emerald-500/10 p-3.5 rounded-xl flex flex-col justify-between hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 group">
                <div className="space-y-2.5">
                  {/* Header Icon & Title */}
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#1F8A70] to-[#125B49] text-white shadow-sm">
                      <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="text-[8px] font-black text-[#D4AF37] uppercase tracking-wider">Operasional</h4>
                      <span className="text-[10px] font-black text-[#0B1528] block leading-none">Jam Kerja Kantor</span>
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-slate-150/60" />

                  {/* Content list */}
                  <div className="space-y-1.5 text-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-[9.5px] font-black text-slate-500 uppercase tracking-wide">Senin — Kamis</span>
                      <span className="text-[9.5px] font-mono font-bold text-slate-900 bg-white/80 px-1 py-0.5 rounded border border-slate-100">08.00 - 16.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[9.5px] font-black text-slate-500 uppercase tracking-wide">Jumat</span>
                      <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-100/50 px-1 py-0.5 rounded">WFA (Online)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[9.5px] font-black text-slate-500 uppercase tracking-wide">Sabtu & Minggu</span>
                      <span className="text-[9.5px] font-bold text-rose-600 bg-rose-50 px-1 py-0.5 rounded">Tutup</span>
                    </div>
                  </div>
                </div>

                {/* Keterangan Kecil */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 text-[9px] text-slate-500 font-bold leading-normal">
                  💡 <span className="text-[#1F8A70] font-black uppercase">Note:</span> Hari Jumat pelayanan tetap online.
                </div>
              </div>

              {/* CARD 2: Sesi Pagi */}
              <div className="bg-emerald-50/40 hover:bg-emerald-50/70 border border-emerald-500/10 p-3.5 rounded-xl flex flex-col justify-between hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 group">
                <div className="space-y-2.5">
                  {/* Header Icon & Title */}
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-[#1F8A70] border border-emerald-100">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-[8px] font-black text-[#1F8A70] uppercase tracking-wider">Sesi Pagi</h4>
                      <span className="text-[10px] font-black text-[#0B1528] block leading-none">08.00 — 12.00 WIB</span>
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-slate-150/60" />

                  <p className="text-[10px] text-slate-500 leading-normal font-medium">
                    Pelayanan administrasi nikah, wakaf, konsultasi keluarga, dan pelayanan mualaf secara penuh.
                  </p>
                </div>
                
                <div className="mt-3 text-center text-[7.5px] font-black tracking-widest text-[#125B49] bg-emerald-100/30 border border-emerald-100/50 py-1 rounded-lg uppercase">
                  Aktif Pelayanan Prima
                </div>
              </div>

              {/* CARD 3: Sesi Siang */}
              <div className="bg-emerald-50/40 hover:bg-emerald-50/70 border border-emerald-500/10 p-3.5 rounded-xl flex flex-col justify-between hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 group">
                <div className="space-y-2.5">
                  {/* Header Icon & Title */}
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-[#1F8A70] border border-emerald-100">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-[8px] font-black text-[#1F8A70] uppercase tracking-wider">Sesi Siang</h4>
                      <span className="text-[10px] font-black text-[#0B1528] block leading-none">13.00 — 16.00 WIB</span>
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-slate-150/60" />

                  <p className="text-[10px] text-slate-500 leading-normal font-medium">
                    Penyuluhan keagamaan, bimbingan pasangan, pengambilan dokumen selesai, dan pelayanan administrasi susulan.
                  </p>
                </div>

                <div className="mt-3 text-center text-[7.5px] font-black tracking-widest text-slate-700 bg-slate-50 border border-slate-200/50 py-1 rounded-lg uppercase">
                  Aktif Pelayanan Sore
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
