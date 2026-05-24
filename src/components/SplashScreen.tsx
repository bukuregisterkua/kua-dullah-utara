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
      className="fixed inset-0 z-[9999] bg-gradient-to-tr from-slate-50 via-white to-emerald-50/20 flex flex-col items-center justify-between py-12 px-6 select-none overflow-hidden"
      id="kua-splash-screen"
    >
      {/* Upper Subtle Branding Bar */}
      <div className="flex flex-col items-center opacity-80 mt-2">
        <div className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <Sparkles className="h-3 w-3 text-emerald-700" />
          <span>Sistem Informasi Terpadu Mandiri</span>
        </div>
      </div>

      {/* Main Focus: Logo, Titles and Interactive Trigger */}
      <div className="flex flex-col items-center max-w-sm text-center">
        
        {/* Logo Container with Smooth Motion Tap Controls */}
        <motion.div
          onClick={handleTapLogo}
          whileHover={{ scale: isTapped ? 1.05 : 1.04 }}
          whileTap={{ scale: 0.96 }}
          animate={
            isTapped 
              ? { scale: 1.06, boxShadow: "0 0 40px rgba(16, 185, 129, 0.15)" }
              : { scale: 1 }
          }
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`w-36 h-36 bg-white border border-slate-200 rounded-3xl shadow-sm flex items-center justify-center p-5 mb-8 cursor-pointer relative overflow-hidden transition-all duration-300 ${
            isTapped ? "border-emerald-500 bg-white" : "hover:border-emerald-600/50 hover:bg-slate-50/50"
          }`}
          id="splash-logo-trigger"
        >
          {/* Subtle elegant background pulsing radial light, no harsh neon or cyber effect */}
          {isTapped && (
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50 to-white/90 z-0 animate-pulse" />
          )}

          <img 
            src={displayLogo} 
            alt="Logo Kemenag" 
            className="w-full h-full object-contain relative z-10"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://kemenag.go.id/favicon.ico";
            }}
          />
        </motion.div>

        {/* Instansi & Program Titles */}
        <div className="space-y-1.5 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase leading-none font-display">
            KUA REVITALISASI
          </h1>
          <h2 className="text-sm font-bold text-emerald-800 tracking-wider uppercase">
            Pulau Dullah Utara
          </h2>
          <p className="text-[10px] text-slate-500 font-extrabold tracking-widest uppercase">
            Kementerian Agama Kota Tual
          </p>
        </div>

        {/* Interactive Helper Text / Progress Indicators */}
        <AnimatePresence mode="wait">
          {!isTapped ? (
            <motion.div
              key="tap-prompt"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.8, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex flex-col items-center cursor-pointer"
              onClick={handleTapLogo}
            >
              <p className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase animate-pulse">
                👇 Tap Logo Untuk Memulai
              </p>
              <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-wider">
                Akses cepat ramah handphone
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="loading-progress"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-48 flex flex-col items-center justify-center"
            >
              {/* Thin, Quick, High-Speed Loading Bar */}
              <div className="w-full h-[3px] bg-slate-100 rounded-full overflow-hidden mb-2 shadow-xs">
                <div 
                  className="h-full bg-emerald-700 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[10px] text-emerald-700 font-mono font-bold uppercase tracking-widest">
                Memuat Portal Resmi {progress}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Footer Branding Area - Officially Verified design */}
      <div className="text-center opacity-70">
        <p className="text-[9px] tracking-widest text-slate-500 uppercase font-black">
          Republik Indonesia • Kantor Urusan Agama
        </p>
        <p className="text-[8px] tracking-wider text-slate-400 uppercase font-bold mt-0.5">
          Revitalisasi KUA Digital Terintegrasi Resmi
        </p>
      </div>
    </div>
  );
}
