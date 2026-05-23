import { useState, useEffect } from "react";
import { Clock, Menu, X, Shield, BookOpen, MapPin, Search } from "lucide-react";
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

export default function Header({ currentTab, setCurrentTab, onAdminClick, isAdmin, onLogout, logoImg, secondaryLogoImg }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [witTime, setWitTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

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
      // Format to Indonesian locale
      setCurrentDate(wit.toLocaleDateString("id-ID", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "beranda", label: "Beranda" },
    { id: "profil", label: "Profil" },
    { id: "pengumuman", label: "Pengumuman" },
    { id: "kontak", label: "Kontak" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentTab("beranda")}
            id="brand-logo-container"
          >
            {secondaryLogoImg ? (
              <div className="w-12 h-12 flex items-center justify-center transition-all overflow-hidden">
                <img 
                  src={secondaryLogoImg} 
                  alt="Logo Kantor" 
                  className="w-full h-full object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : logoImg ? (
              <div className="w-12 h-12 flex items-center justify-center transition-all overflow-hidden">
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
              <h1 className="text-lg font-bold font-display text-emerald-900 leading-tight tracking-tight">
                KUA DULLAH UTARA
              </h1>
              <p className="text-xs font-semibold text-emerald-600 tracking-wider uppercase">
                Kementerian Agama Kota Tual
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1" id="desktop-nav-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  currentTab === item.id
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Live digital clock & CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Live WIT Clock */}
            <div className="text-right border-r border-slate-200 pr-4">
              <div className="flex items-center space-x-1.5 justify-end text-emerald-800 font-mono text-xs font-semibold">
                <Clock className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                <span>{witTime}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">{currentDate}</p>
            </div>

            {/* Admin trigger */}
            {isAdmin ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentTab("admin")}
                  className="flex items-center space-x-1 px-3.5 py-2 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold ring-2 ring-emerald-200 hover:bg-emerald-200 transition-all cursor-pointer"
                >
                  <Shield className="h-3.5 w-3.5" />
                  <span>Panel Admin</span>
                </button>
                <button
                  onClick={onLogout}
                  className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={onAdminClick}
                className="flex items-center space-x-1 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-md cursor-pointer"
                id="header-admin-login-btn"
              >
                <Shield className="h-3.5 w-3.5 text-emerald-400" />
                <span>Login Admin</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden space-x-3">
            {/* Minimal Mobile WIT Clock */}
            <div className="text-right text-[11px] font-mono text-emerald-800 font-semibold bg-emerald-50/70 border border-emerald-100 px-2 py-1 rounded-lg">
              {witTime.split(" ")[0]} WIT
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
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
            className="lg:hidden bg-white border-t border-emerald-50 shadow-inner overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    currentTab === item.id
                      ? "bg-emerald-700 text-white"
                      : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2 px-4">
                <div className="text-xs text-slate-500 mb-1 flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5 text-emerald-600" />
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
                      className="px-4 py-2.5 bg-rose-50 text-rose-700 rounded-xl text-xs font-semibold hover:bg-rose-100 transition-all cursor-pointer"
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
                    className="w-full text-center py-2.5 bg-slate-950 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 hover:bg-slate-800 transition-all shadow-inner cursor-pointer"
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
