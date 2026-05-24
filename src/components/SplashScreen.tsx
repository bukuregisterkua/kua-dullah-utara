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
      <div className="flex flex-col items-center max-w-sm w-full text-center">
        
        {/* Interactive Helper Text - Tap Prompt (Positioned ABOVE logo) */}
        {!isTapped && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.8, y: 0 }}
            className="flex flex-col items-center cursor-pointer mb-6"
            onClick={handleTapLogo}
          >
            <p className="text-[11px] font-black text-emerald-700 tracking-widest uppercase animate-pulse">
              👇 Tap Logo Untuk Memulai
            </p>
          </motion.div>
        )}

        {/* Logo Container with Smooth Motion Tap Controls (Transparent - NO WHITE BOX) */}
        <motion.div
          onClick={handleTapLogo}
          whileHover={{ scale: isTapped ? 1.05 : 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={
            isTapped 
              ? { scale: 1.10 }
              : { scale: 1 }
          }
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-32 h-32 flex items-center justify-center mb-8 cursor-pointer relative"
          id="splash-logo-trigger"
        >
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
        <div className="space-y-1.5 mb-6">
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

        {/* Progress Loading Bar (Shown only when tapped) */}
        {isTapped && (
          <motion.div
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

      </div>

      {/* Footer Branding Area - Simplified to Kementerian Agama Kota Tual */}
      <div className="text-center opacity-70">
        <p className="text-[10px] tracking-widest text-slate-500 uppercase font-black">
          Kementerian Agama Kota Tual
        </p>
      </div>
    </div>
  );
}
