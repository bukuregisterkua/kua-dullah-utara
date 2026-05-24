import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, BookOpen } from "lucide-react";

interface SplashScreenProps {
  logoUrl?: string;
  onComplete: () => void;
}

export default function SplashScreen({ logoUrl, onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  // Fallback to default Kemenag logo path
  const displayLogo = logoUrl || "/uploads/logokuadullut-1779347095553.png";

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-gradient-to-b from-emerald-50/40 via-white to-white py-12 px-6 select-none"
      id="kua-splash-screen"
    >
      <div></div> {/* Spacer */}

      <div className="flex flex-col items-center max-w-sm text-center">
        {/* Core Clean Official Logo (No neon glow) */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-center p-4 mb-6">
          <img 
            src={displayLogo} 
            alt="Logo Kemenag" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://kemenag.go.id/favicon.ico";
            }}
          />
        </div>

        {/* Instansi Titles */}
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">
          KANTOR URUSAN AGAMA
        </h1>
        <p className="text-sm font-bold text-emerald-800 tracking-wider mt-1.5 uppercase">
          Kecamatan Pulau Dullah Utara
        </p>
        <p className="text-[10px] text-slate-500 font-extrabold tracking-widest mt-0.5 uppercase">
          Kementerian Agama Kota Tual
        </p>

        {/* Lightweight Progress Bar */}
        <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden mt-8">
          <div 
            className="h-full bg-emerald-700 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-[10px] text-slate-400 font-mono mt-2 uppercase tracking-widest">
          Menyiapkan Portal Desa...
        </p>

        {/* Direct Access CTA for Instant Entry */}
        <button
          onClick={onComplete}
          className="mt-6 inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <span>Masuk Portal</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Understated Public Sector Verification Footer */}
      <div className="text-center">
        <p className="text-[9px] tracking-widest text-slate-400 uppercase font-bold">
          TERREGISTRASI RESMI KEMENAG RI
        </p>
      </div>
    </div>
  );
}
