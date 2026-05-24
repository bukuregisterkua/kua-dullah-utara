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

  // Update real-time WIT Clock (UTC+9) and current date
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
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

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 text-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none animate-fade-in"
            onClick={() => setCurrentTab("beranda")}
            id="brand-logo-container"
          >
            {secondaryLogoImg ? (
              <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                <img 
                  src={secondaryLogoImg} 
                  alt="Logo Kantor" 
                  className="w-full h-full object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : logoImg ? (
              <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                <img 
                  src={logoImg} 
                  alt="Logo Kantor" 
                  className="w-full h-full object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="p-2 bg-[#1F8A70] text-white rounded-lg">
                <BookOpen className="h-5 w-5" id="brand-logo-icon" />
              </div>
            )}
            <div>
              <h1 className="text-base font-black text-[#1F8A70] leading-tight tracking-tight uppercase">
                KUA DULLAH UTARA
              </h1>
              <p className="text-[9px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                Kementerian Agama Kota Tual
              </p>
            </div>
          </div>

          {/* Desktop Navigation, Live Clock & Admin CTA */}
          <div className="hidden lg:flex items-center space-x-6" id="desktop-nav-right-container">
            <nav className="flex items-center space-x-1" id="desktop-nav-menu">
              {navItems.map((item) => {
                const isActive = currentTab === item.id || (item.id === "beranda" && currentTab === "layanan-pembuka");
                
                const btnStyle = isActive
                  ? "bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400/20"
                  : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60";

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${btnStyle}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="h-8 w-[1px] bg-slate-200"></div>

            {/* Live Clock & Admin Trigger */}
            <div className="flex items-center space-x-3">
              {/* Official-style modern premium beige clock card */}
              <div className="bg-emerald-50/50 border border-emerald-100/60 rounded-lg px-2.5 py-1.5 flex items-center space-x-2 select-none shadow-xs">
                <Clock className="h-3.5 w-3.5 text-[#1F8A70] shrink-0 animate-pulse" />
                <div className="text-left font-mono">
                  <div className="text-[11px] font-black text-emerald-800 leading-tight">
                    {witTime}
                  </div>
                  <div className="text-[9px] text-slate-500 font-sans font-bold leading-none mt-0.5 truncate max-w-[120px]">
                    {currentDate}
                  </div>
                </div>
              </div>

              {isAdmin ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentTab("admin")}
                    className="flex items-center space-x-1 px-3 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    <Shield className="h-3.5 w-3.5 text-emerald-800" />
                    <span>Panel Admin</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAdminClick}
                  className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-900 text-white hover:bg-emerald-800 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
                  id="header-admin-login-btn"
                >
                  <Shield className="h-3.5 w-3.5 text-white" />
                  <span>Login Admin</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden space-x-2">
            {/* Highly Compact Official Digital Clock Widget for Mobile */}
            <div className="bg-emerald-50/50 border border-emerald-100/60 rounded-lg px-2 py-1.5 flex items-center space-x-1 select-none shadow-xs">
              <Clock className="h-3 w-3 text-[#1F8A70] shrink-0" />
              <div className="text-left font-mono leading-none">
                <span className="text-[10px] font-black text-emerald-800">
                   {witTime.replace(" WIT", "")}
                </span>
                <span className="text-[8px] font-black text-emerald-800 ml-0.5">WIT</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-750 hover:text-emerald-800 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            transition={{ duration: 0.15 }}
            className="lg:hidden border-t border-slate-200 bg-white text-slate-900 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => {
                const isActive = currentTab === item.id || (item.id === "beranda" && currentTab === "layanan-pembuka");
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400/10"
                        : "text-slate-700 hover:bg-emerald-50/50"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              
              <div className="pt-3 mt-3 border-t border-slate-100 flex flex-col space-y-2">
                <div className="text-[10px] font-bold text-slate-500 flex items-center space-x-1 px-4">
                  <Clock className="h-3.5 w-3.5 text-emerald-700" />
                  <span>{currentDate} - {witTime}</span>
                </div>
                
                <div className="px-4">
                  {isAdmin ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setCurrentTab("admin");
                          setIsOpen(false);
                        }}
                        className="flex-grow text-center py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Panel Admin
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          setIsOpen(false);
                        }}
                        className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
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
                      className="w-full text-center py-2.5 bg-slate-900 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Shield className="h-4 w-4" />
                      <span>Login Portal Admin</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
