import React, { useState } from "react";
import { motion } from "motion/react";

interface SplashScreenProps {
  logoUrl?: string;
  onComplete: () => void;
}

export default function SplashScreen({ logoUrl, onComplete }: SplashScreenProps) {
  const [isTapped, setIsTapped] = useState(false);

  // Fallback to default Kemenag/KUA logo path if not uploaded or fetched yet
  const displayLogo = logoUrl || "/uploads/logokuadullut-1779347095553.png";

  const handleTap = () => {
    if (isTapped) return;
    setIsTapped(true);
    
    // Smooth transition delay for fade-out and scale-up effect
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  // Generate a set of elegant floating gold/green light particles
  const particles = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 12 + 6; // 6px to 18px
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 12; // 12s to 22s
    const left = Math.random() * 100; // 0% to 100%
    const top = Math.random() * 100; // 0% to 100%
    
    return {
      id: i,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${top}%`,
        background: i % 2 === 0 
          ? "radial-gradient(circle, rgba(234, 179, 8, 0.4) 0%, transparent 70%)" 
          : "radial-gradient(circle, rgba(52, 211, 153, 0.4) 0%, transparent 70%)",
      },
      animate: {
        y: [0, -120, 0],
        x: [0, Math.sin(i) * 50, 0],
        opacity: [0.1, 0.8, 0.1],
        scale: [0.8, 1.3, 0.8]
      },
      transition: {
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }
    };
  });

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={isTapped ? { opacity: 0, scale: 1.05, filter: "blur(12px)" } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 overflow-hidden select-none"
      id="kua-splash-screen"
    >
      {/* Background Subtle Glassmorphism Blur Layers */}
      <div className="absolute inset-0 bg-radial-gradient from-emerald-900/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Animated Light Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none blur-xs"
          style={particle.style}
          animate={particle.animate}
          transition={particle.transition}
        />
      ))}

      {/* Grid Overlay for subtle premium tech/instansi look */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Center Interactive Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center select-none">
        
        {/* Glow Effect Aura behind the Logo */}
        <div className="absolute w-72 h-72 bg-gradient-to-tr from-emerald-500/20 to-amber-500/10 rounded-full blur-3xl pointer-events-none transform -translate-y-6" />

        {/* Outer active light flash on interact */}
        {isTapped && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 2.2, opacity: [0.8, 0] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute rounded-full w-48 h-48 bg-gradient-to-r from-emerald-400 to-amber-300 blur-md pointer-events-none"
          />
        )}

        {/* Interactive Logo Frame */}
        <motion.div
          onClick={handleTap}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.15 }}
          animate={
            isTapped 
              ? { scale: 1.25, rotate: 360, y: -20, filter: "drop-shadow(0 0 35px rgba(52,211,153,0.8))" } 
              : { y: [0, -12, 0] }
          }
          transition={
            isTapped 
              ? { duration: 0.85, ease: "backOut" } 
              : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative cursor-pointer w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center z-20 group"
          id="splash-logo-button"
        >
          {/* Glowing neon green-gold double active ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 via-emerald-400 to-amber-400 opacity-60 blur-xs group-hover:opacity-100 group-hover:blur-sm transition-all duration-300 animate-pulse" />
          
          {/* Inner core white sphere protecting the official logo */}
          <div className="absolute inset-2 bg-slate-950/80 backdrop-blur-md rounded-full flex items-center justify-center p-4 border border-emerald-500/40 group-hover:bg-slate-900 transition-colors shadow-2xl">
            <img 
              src={displayLogo} 
              alt="Logo Kemenag" 
              className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(16,185,129,0.3)] select-none pointer-events-none"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // If local path is somehow broken in development, fall back safe to online official crest
                (e.target as HTMLImageElement).src = "https://kemenag.go.id/favicon.ico";
              }}
            />
          </div>
        </motion.div>

        {/* Titles Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 space-y-2 pointer-events-none"
        >
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-wider pt-2 uppercase drop-shadow-md">
            KUA REVITALISASI
          </h1>
          <p className="text-lg sm:text-xl font-medium text-emerald-400 drop-shadow-xs font-sans">
            Pulau Dullah Utara
          </p>
        </motion.div>

        {/* Custom Loading Bar before Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-24 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent my-6"
        />

        {/* Trigger instructions text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            isTapped 
              ? { opacity: 0, scale: 0.9 } 
              : { opacity: [0.3, 0.85, 0.3] }
          }
          transition={
            isTapped 
              ? { duration: 0.3 } 
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
          className="font-mono text-[11px] font-bold text-slate-300 tracking-widest uppercase cursor-pointer py-1 select-none flex items-center gap-1.5 justify-center mt-2"
          onClick={handleTap}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>Tap Logo Untuk Memulai</span>
        </motion.div>

      </div>
      
      {/* Subtle Bottom Credit Line */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 text-[9.5px] tracking-widest text-slate-400 uppercase font-mono pointer-events-none"
      >
        Kementerian Agama Kota Tual
      </motion.p>
    </motion.div>
  );
}
