import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Calendar, Clock } from "lucide-react";

interface SplashScreenProps {
  logoUrl?: string;
  onComplete: () => void;
}

export default function SplashScreen({ logoUrl, onComplete }: SplashScreenProps) {
  const [isTapped, setIsTapped] = useState(false);
  const [progress, setProgress] = useState(0);

  // Fallback to default Kemenag logo path
  const displayLogo = logoUrl || "/uploads/logokuadullut-1779347095553.png";

  const handleTapLogo = () => {
    if (isTapped) return;
    setIsTapped(true);

    // Speedily simulate progress bar filling up to 100% after tapping logo
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 8;
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 400); // Elegant timing for a smooth exit transition
      } else {
        setProgress(currentProgress);
      }
    }, 30);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#091524] via-[#082d23] to-[#021410] flex flex-col items-center justify-center py-12 px-6 select-none overflow-hidden text-white"
      id="kua-splash-screen"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.07)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Focus: Logo, Titles and Interactive Trigger */}
      <div className="flex flex-col items-center max-w-sm w-full text-center relative z-10">
        
        {/* Interactive Helper Text - Tap Prompt (Positioned ABOVE logo) */}
        {!isTapped && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.9, y: 0 }}
            className="flex flex-col items-center cursor-pointer mb-6"
            onClick={handleTapLogo}
          >
            <p className="text-[11px] font-black text-emerald-300 tracking-widest uppercase animate-pulse select-none bg-[#1F8A70]/20 border border-emerald-500/30 px-3 py-1 rounded-full">
              👇 Tap Logo Untuk Memulai
            </p>
          </motion.div>
        )}

        {/* Logo Container with Smooth Motion Tap Controls & Pure Glow Effect - ENLARGED */}
        <motion.div
          onClick={handleTapLogo}
          whileHover={{ scale: isTapped ? 1.05 : 1.12 }}
          whileTap={{ scale: 0.94 }}
          animate={
            isTapped 
              ? { scale: 1.15 }
              : { scale: 1 }
          }
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center mb-8 cursor-pointer relative"
          id="splash-logo-trigger"
        >
          {/* Subtle elegant ambient background glowing radial light, no harsh block borders */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl animate-pulse" />
          <div className="absolute inset-2 rounded-full border border-teal-500/20 animate-spin-slow pointer-events-none" />
          <div className="absolute inset-4 rounded-full border border-emerald-400/10 pointer-events-none" />

          {/* Soft inner radial glow */}
          <div className="absolute w-24 h-24 bg-teal-400/10 rounded-full blur-xl z-0" />

          <img 
            src={displayLogo} 
            alt="Logo Kemenag" 
            className="w-28 h-28 sm:w-32 sm:h-32 object-contain relative z-10 transition-transform duration-300 filter drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://kemenag.go.id/favicon.ico";
            }}
          />
        </motion.div>

        {/* Instansi & Program Titles */}
        <div className="space-y-1.5 mb-6">
          <h1 className="text-3xl sm:text-4.5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-200 tracking-tight uppercase leading-none font-display">
            KUA REVITALISASI
          </h1>
          <h2 className="text-base font-black text-emerald-400 tracking-wider uppercase">
            Pulau Dullah Utara
          </h2>
          <p className="text-[10px] text-slate-400 font-extrabold tracking-widest uppercase">
            Kementerian Agama Kota Tual
          </p>
        </div>

        {/* Progress Loading Bar (Shown only when tapped) */}
        {isTapped && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-48 flex flex-col items-center justify-center"
          >
            {/* Thin, Quick, High-Speed Loading Bar */}
            <div className="w-full h-[4px] bg-white/10 rounded-full overflow-hidden mb-2.5">
              <div 
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-75 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] text-emerald-300 font-mono font-bold uppercase tracking-widest">
              MEMUAT PORTAL {progress}%
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
