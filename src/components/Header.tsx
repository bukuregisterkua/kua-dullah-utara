import { useState, useEffect } from "react";
import { Clock, Menu, X, Shield, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onAdminClick: () => void;
  isAdmin: boolean;
  onLogout: () => void;
  logoImg?: string;
  secondaryLogoImg?: string;
}

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  onAdminClick, 
  isAdmin, 
  onLogout, 
  logoImg, 
  secondaryLogoImg 
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [witTime, setWitTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll state for transparent-to-glass transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update real-time WIT Clock (UTC+9)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Calculate WIT (UTC+9)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const wit = new Date(utc + 3600000 * 9);

      const hours = String(wit.getHours()).padStart(2, "0");
      const minutes = String(wit.getMinutes()).padStart(2, "0");
      const seconds = String(wit.getSeconds()).padStart(2, "0");
      setWitTime(`${hours}:${minutes}:${seconds} WIT`);

      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setCurrentDate(wit.toLocaleDateString("id-ID", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "beranda", label: "Beranda" },
    { id: "profil", label: "Profil" },
    { id: "buku-tamu", label: "Buku Tamu" },
    { id: "pengumuman", label: "Pengumuman" },
    { id: "kontak", label: "Kontak" },
  ];

  // Detect whether we are in "Beranda" to apply transparent/dark cinematic look
  const isBeranda = currentTab === "beranda";

  // Floating navbar styling based on state
  const navbarBgClass = isBeranda
    ? scrolled
      ? "bg-slate-950/80 backdrop-blur-md border-b border-emerald-500/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] shadow-emerald-950/20 text-white"
      : "bg-transparent border-b border-transparent text-white"
    : scrolled
      ? "bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-md shadow-emerald-950/5 text-slate-900"
      : "bg-white border-b border-slate-100 text-slate-900";

  const brandTitleClass = isBeranda
    ? "text-white"
    : "text-emerald-950";

  const brandSubtitleClass = isBeranda
    ? "text-emerald-400"
    : "text-emerald-600";

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${navbarBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group select-none"
            onClick={() => setCurrentTab("beranda")}
            id="brand-logo-container"
          >
            {secondaryLogoImg ? (
              <div className="w-12 h-12 flex items-center justify-center transition-transform duration-500 overflow-hidden group-hover:scale-105 active:scale-95">
                <img 
                  src={secondaryLogoImg} 
                  alt="Logo Kantor" 
                  className="w-full h-full object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : logoImg ? (
              <div className="w-12 h-12 flex items-center justify-center transition-transform duration-500 overflow-hidden group-hover:scale-105 active:scale-95">
                <img 
                  src={logoImg} 
                  alt="Logo Kantor" 
                  className="w-full h-full object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="p-2.5 bg-emerald-700 text-white rounded-xl shadow-md group-hover:bg-emerald-600 transition-colors">
                <BookOpen className="h-6 w-6" id="brand-logo-icon" />
              </div>
            )}
            <div>
              <h1 className={`text-lg font-black font-display leading-tight tracking-tight uppercase transition-colors duration-300 ${brandTitleClass}`}>
                KUA DULLAH UTARA
              </h1>
              <p className={`text-[10px] font-extrabold tracking-widest uppercase transition-colors duration-300 ${brandSubtitleClass}`}>
                Kementerian Agama Kota Tual
              </p>
            </div>
          </div>

          {/* Desktop Navigation, Live Clock & Admin CTA */}
          <div className="hidden lg:flex items-center space-x-6" id="desktop-nav-right-container">
            <nav className="flex items-center space-x-1" id="desktop-nav-menu">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                let btnStyle = "";
                
                if (isBeranda) {
                  btnStyle = isActive
                    ? "bg-emerald-600/90 text-white shadow-lg border border-emerald-400/20"
                    : "text-slate-300 hover:text-white hover:bg-white/10";
                } else {
                  btnStyle = isActive
                    ? "bg-emerald-700 text-white shadow-md shadow-emerald-950/10"
                    : "text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/50";
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`relative px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${btnStyle}`}
                  >
                    <span>{item.label}</span>
                    {/* Hover indicator underline */}
                    {!isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-emerald-400 group-hover:w-1/2 transition-all duration-300" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Premium Divider */}
            <div className={`h-8 w-[1px] ${isBeranda ? "bg-white/10" : "bg-slate-200"}`}></div>

            {/* Live Digital Clock & CTA Buttons */}
            <div className="flex items-center space-x-4">
              {/* Live WIT Clock */}
              <div className={`text-right border-r pr-4 ${isBeranda ? "border-white/10" : "border-slate-200"}`}>
                <div className={`flex items-center space-x-1.5 justify-end font-mono text-xs font-bold ${isBeranda ? "text-emerald-400" : "text-emerald-800"}`}>
                  <Clock className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
                  <span>{witTime}</span>
                </div>
                <p className={`text-[9px] font-semibold mt-0.5 tracking-wide ${isBeranda ? "text-slate-400" : "text-slate-500"}`}>{currentDate}</p>
              </div>

              {/* Admin CTA Trigger */}
              {isAdmin ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentTab("admin")}
                    className="flex items-center space-x-1 px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 rounded-xl text-xs font-bold ring-1 ring-emerald-500/25 transition-all cursor-pointer"
                  >
                    <Shield className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Panel Admin</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAdminClick}
                  className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                    isBeranda 
                      ? "bg-slate-900 border border-white/10 text-white hover:bg-slate-800"
                      : "bg-slate-950 text-white hover:bg-slate-800"
                  }`}
                  id="header-admin-login-btn"
                >
                  <Shield className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                  <span>Login Admin</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden space-x-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isBeranda
                  ? "text-slate-200 hover:text-white hover:bg-white/10"
                  : "text-slate-700 hover:text-emerald-800 hover:bg-emerald-50"
              }`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`lg:hidden border-t shadow-inner overflow-hidden ${
              isBeranda 
                ? "bg-slate-950/95 border-emerald-500/10 text-white" 
                : "bg-white border-emerald-50 text-slate-900"
            }`}
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${
                    currentTab === item.id
                      ? "bg-emerald-700 text-white shadow-sm"
                      : isBeranda
                        ? "text-slate-300 hover:bg-white/10 hover:text-white"
                        : "text-slate-600 hover:bg-emerald-55 hover:text-emerald-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className={`pt-4 border-t flex flex-col space-y-2 px-4 ${isBeranda ? "border-white/10" : "border-slate-100"}`}>
                <div className={`text-[10px] font-bold mb-1 flex items-center space-x-1 ${isBeranda ? "text-slate-400" : "text-slate-500"}`}>
                  <Clock className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{currentDate} - {witTime}</span>
                </div>
                
                {isAdmin ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setCurrentTab("admin");
                        setIsOpen(false);
                      }}
                      className="flex-1 text-center py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Buka Panel Admin
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsOpen(false);
                      }}
                      className="px-4 py-2.5 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Keluar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onAdminClick();
                      setIsOpen(false);
                    }}
                    className={`w-full text-center py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow-inner cursor-pointer ${
                      isBeranda
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "bg-slate-950 text-white hover:bg-slate-800"
                    }`}
                  >
                    <Shield className="h-4 w-4 text-emerald-400" />
                    <span>Login Sebagai Administrator</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
