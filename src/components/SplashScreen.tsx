import { useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

interface SplashScreenProps {
  logoUrl?: string;
  onComplete: () => void;
}

export default function SplashScreen({ logoUrl, onComplete }: SplashScreenProps) {
  useEffect(() => {
    // Automatically dismiss the splash screen after 2.0 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center relative overflow-hidden select-none">
      {/* Background soft radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_70%)] pointer-events-none" />
      
      {/* Centered Showcase */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-6 max-w-sm px-6 relative z-10"
      >
        {/* Animated logo border ring */}
        <div className="relative w-20 h-20 mx-auto">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-emerald-500/40"
          />
          <div className="absolute inset-2 rounded-full border border-emerald-500/20" />
          
          <div className="absolute inset-4 rounded-3xl bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center shadow-lg">
            {logoUrl && !logoUrl.startsWith("data:image/png;base64,iVB") ? (
              <img 
                src={logoUrl} 
                alt="Logo KUA" 
                className="w-10 h-10 object-contain" 
              />
            ) : (
              <BookOpen className="h-8 w-8 text-emerald-400 animate-pulse" />
            )}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#059669] bg-emerald-950 border border-emerald-900/60 px-3 py-1 rounded-full inline-block shadow-inner">
            Kementerian Agama Kota Tual
          </span>
          <h2 className="text-xl font-extrabold font-display tracking-tight text-white uppercase leading-snug">
            KUA Pulau Dullah Utara
          </h2>
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
            Pelayanan Keagamaan Digital Terpadu
          </p>
        </div>

        {/* Progress Bar Loader */}
        <div className="w-40 mx-auto h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full"
          />
        </div>

        <p className="text-[9px] text-slate-500 font-mono">Menyiapkan halaman selamat datang yang asri...</p>
      </motion.div>

      {/* Decorative footer credits */}
      <div className="absolute bottom-8 inset-x-0 text-center select-none pointer-events-none">
        <p className="text-[8px] font-bold tracking-widest font-mono text-slate-600 uppercase">
          Layanan Unggulan, Akuntabel, dan Bersahaja
        </p>
      </div>
    </div>
  );
}
