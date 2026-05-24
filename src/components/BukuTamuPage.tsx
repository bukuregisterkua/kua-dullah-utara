import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  BookOpen, 
  Users, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  ShieldAlert, 
  CheckCheck,
  Award
} from "lucide-react";

interface BukuTamuPageProps {
  bukuTamuUrl: string;
}

export default function BukuTamuPage({ bukuTamuUrl }: BukuTamuPageProps) {
  const [isLoadingLink, setIsLoadingLink] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);

  const handleOpenBukuTamu = () => {
    if (isLoadingLink) return;
    
    // Trigger ripple visual event
    setRippleActive(true);
    setTimeout(() => setRippleActive(false), 800);

    // Show loading state
    setIsLoadingLink(true);

    // Simulate short modern loading animation, then redirect to external url
    setTimeout(() => {
      setIsLoadingLink(false);
      const targetUrl = bukuTamuUrl || "https://forms.gle/kuadullahbukutamu";
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }, 1200);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-950 overflow-hidden select-none">
      
      {/* 1. Ornamental Islamic SVG Background Watermarks */}
      <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
        {/* Top left star pattern */}
        <svg className="absolute top-10 left-10 w-64 h-64 text-emerald-400" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L61.2 38.8 L100 50 L61.2 61.2 L50 100 L38.8 61.2 L0 50 L38.8 38.8 Z" />
          <circle cx="50" cy="50" r="16" className="text-slate-950" />
          <path d="M50 20 L58.3 41.7 L80 50 L58.3 58.3 L50 80 L41.7 58.3 L20 50 L41.7 41.7 Z" className="text-amber-400" />
        </svg>

        {/* Bottom right star pattern */}
        <svg className="absolute bottom-10 right-10 w-80 h-80 text-emerald-400" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L61.2 38.8 L100 50 L61.2 61.2 L50 100 L38.8 61.2 L0 50 L38.8 38.8 Z" />
          <circle cx="50" cy="50" r="16" className="text-slate-950" />
          <path d="M50 20 L58.3 41.7 L80 50 L58.3 58.3 L50 80 L41.7 58.3 L20 50 L41.7 41.7 Z" className="text-amber-400" />
        </svg>
      </div>

      {/* 2. Abstract Glowing Lights & Magic Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-emerald-600/5 blur-[80px] rounded-full" />
      </div>

      {/* 3. Floating Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/5 text-amber-350/40 p-1"
        >
          <Sparkles className="w-5 h-5 text-amber-400" />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, -45, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-2/3 right-1/4 text-emerald-400/30 p-1"
        >
          <Sparkles className="w-6 h-6 text-emerald-500" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, -25, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/3 text-amber-400/20 p-1"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
        </motion.div>
      </div>

      {/* 4. Main Glassmorphism Presentation Panel */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative max-w-2xl w-full z-10"
        id="buku-tamu-card"
      >
        {/* Subtle glow border */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/30 via-amber-400/30 to-emerald-500/30 rounded-3xl blur-[1px]" />
        
        {/* Main Content Pane */}
        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
          
          {/* Badge: Online 24 Jam */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/35 text-emerald-300 font-mono text-[10px] tracking-widest uppercase font-extrabold"
            id="buku-tamu-badge"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Online 24 Jam</span>
          </motion.div>

          {/* Premium Decorative Star framing Guestbook Icon */}
          <div className="relative mb-8" id="buku-tamu-icon-container">
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl scale-75 animate-pulse" />
            
            {/* Islamic Geometry Backdrop Frame */}
            <div className="relative w-24 h-24 flex items-center justify-center text-white">
              {/* Rotating golden Islamic star background */}
              <motion.svg 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-full text-amber-500/20" 
                viewBox="0 0 100 100"
              >
                <path d="M50 2 L62 38 L98 50 L62 62 L50 98 L38 62 L2 50 L38 38 Z" fill="currentColor" />
                <path d="M50 12 L59 41 L88 50 L59 59 L50 88 L41 59 L12 50 L41 41 Z" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
              </motion.svg>
              
              {/* Floating Book / Guests Center Icon */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 p-5 bg-gradient-to-br from-emerald-600 to-emerald-950 rounded-2xl border border-emerald-400/40 shadow-lg text-emerald-100"
              >
                <BookOpen className="w-10 h-10 filter drop-shadow" />
              </motion.div>
            </div>
          </div>

          {/* Hero Header Section */}
          <div className="space-y-4 max-w-lg mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-wide uppercase drop-shadow-sm">
              Buku Tamu <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-300">Digital</span> KUA
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
            <p className="text-sm font-medium text-slate-300 leading-relaxed">
              Silakan melakukan pengisian buku tamu digital untuk pendataan kunjungan layanan KUA secara cepat, aman, dan modern.
            </p>
          </div>

          {/* Main Action Call to Action Button */}
          <div className="w-full max-w-sm mb-12 relative" id="buku-tamu-cta-button-wrapper">
            {/* Glow backing */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition duration-1000" />
            
            <button
              onClick={handleOpenBukuTamu}
              disabled={isLoadingLink}
              className="relative w-full py-4 px-6 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-500 hover:via-emerald-650 hover:to-emerald-700 text-white font-bold text-sm tracking-widest uppercase rounded-2xl shadow-xl transition-all duration-300 transform active:scale-[0.98] border border-emerald-400/30 flex items-center justify-center gap-3 overflow-hidden cursor-pointer group"
              id="buku-tamu-submit-button"
            >
              {/* Click ripple representation */}
              {rippleActive && (
                <span className="absolute inset-0 bg-white/20 animate-ping rounded-2xl pointer-events-none" />
              )}
              
              {isLoadingLink ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Membuka Halaman...</span>
                </>
              ) : (
                <>
                  <Users className="w-4 h-4 text-amber-300" />
                  <span>Isi Buku Tamu</span>
                  <ExternalLink className="w-4 h-4 text-emerald-250 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-400 font-mono mt-3 uppercase tracking-wider">
              Membuka formulir resmi di jendela baru
            </p>
          </div>

          {/* Quick Modern Real-time Statistics Section */}
          <div className="w-full border-t border-slate-800 pt-8" id="buku-tamu-stats-container">
            <div className="grid grid-cols-3 gap-4">
              
              {/* Stat 1 */}
              <div className="flex flex-col items-center">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl mb-2.5">
                  <CheckCheck className="w-4 h-4 text-amber-400" />
                </div>
                <h4 className="text-[11px] font-extrabold text-white uppercase tracking-wider mb-0.5">Pendataan</h4>
                <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Digital</p>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center border-l border-slate-800">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl mb-2.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-[11px] font-extrabold text-white uppercase tracking-wider mb-0.5">Akses</h4>
                <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Super Cepat</p>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center border-l border-slate-800">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl mb-2.5">
                  <Award className="w-4 h-4 text-emerald-300" />
                </div>
                <h4 className="text-[11px] font-extrabold text-white uppercase tracking-wider mb-0.5">Layanan</h4>
                <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Modern</p>
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
