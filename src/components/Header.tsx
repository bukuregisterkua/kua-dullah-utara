import { useState, useEffect } from "react";
import { 
  Building, 
  Clock, 
  Menu, 
  X, 
  LogOut, 
  Sliders,
  UserCheck
} from "lucide-react";

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
  const [time, setTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Force Eastern Indonesia Time (WIT, UTC+9) for Kota Tual context
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jayapura",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatted = new Intl.DateTimeFormat("id-ID", options).format(now);
      setTime(formatted + " WIT");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "beranda", label: "Beranda" },
    { id: "profil", label: "Profil Kantor" },
    { id: "layanan-pembuka", label: "Pilihan Layanan" },
    { id: "buku-tamu", label: "Buku Tamu Digital" },
    { id: "pengumuman", label: "Informasi & Pengumuman" },
    { id: "kontak", label: "Hubungi Kami" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-teal-500/10 shadow-sm no-print">
      {/* Top Banner with Kemenag Branding */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white text-[10px] font-black tracking-widest uppercase py-1.5 px-4 flex justify-between items-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" />
          <span>Kantor Urusan Agama Kecamatan Pulau Dullah Utara, Kota Tual</span>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <span className="text-yellow-400 font-extrabold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{time}</span>
          </span>
          <span className="hidden sm:inline-block text-emerald-200">Kemenag RI · Bebas Pungli · Bersih & Melayani</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Group */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setCurrentTab("beranda")}>
            {secondaryLogoImg || logoImg ? (
              <div className="w-11 h-11 flex items-center justify-center filter drop-shadow-sm shrink-0">
                <img 
                  src={secondaryLogoImg || logoImg} 
                  alt="Logo KUA" 
                  className="max-h-full max-w-full object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold tracking-tight shadow-md border border-emerald-600 shrink-0">
                <Building className="h-6 w-6" />
              </div>
            )}
            
            <div className="text-left">
              <h1 className="text-sm font-black text-slate-900 tracking-tight uppercase flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span>KUA Pulau Dullah Utara</span>
                <span className="text-[8.5px] w-fit font-black bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded uppercase font-sans tracking-wide mt-0.5 sm:mt-0">
                  Kemah Madani
                </span>
              </h1>
              <p className="text-[9px] text-[#059669] font-black uppercase tracking-wider">
                Pusat Pelayanan Keagamaan Digital Terpadu
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-550/5 p-1 rounded-xl border border-slate-100">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`px-3 py-2 rounded-lg text-[11px] font-black transition-all cursor-pointer whitespace-nowrap ${
                  currentTab === item.id || (item.id === "layanan-pembuka" && ["nikah", "wakaf", "muallaf", "penyuluhan"].includes(currentTab))
                    ? "bg-slate-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Row */}
          <div className="hidden lg:flex items-center gap-2">
            {!isAdmin ? (
              <button
                onClick={onAdminClick}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-md"
              >
                <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Login Admin</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentTab("admin")}
                  className={`px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-sm border ${
                    currentTab === "admin"
                      ? "bg-emerald-700 text-white border-emerald-600"
                      : "bg-emerald-50 text-emerald-800 border-emerald-100 hover:bg-emerald-100"
                  }`}
                >
                  <Sliders className="h-3.5 w-3.5" />
                  <span>Panel Admin</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl text-rose-700 cursor-pointer transition-colors"
                  title="Logout Admin Sesi"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburg Trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md py-4 px-4 space-y-2.5 box-sizing">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg text-xs font-black transition-all ${
                currentTab === item.id
                  ? "bg-emerald-800 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {!isAdmin ? (
              <button
                onClick={() => {
                  onAdminClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-slate-950 text-white py-2.5 rounded-lg text-xs font-black text-center flex items-center justify-center gap-1.5 uppercase"
              >
                <UserCheck className="h-4 w-4 text-emerald-450" />
                <span>Masuk Kasir Admin</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCurrentTab("admin");
                    setMobileMenuOpen(false);
                  }}
                  className="flex-grow bg-emerald-700 text-white py-2.5 rounded-lg text-xs font-black text-center flex items-center justify-center gap-1.5 uppercase"
                >
                  <Sliders className="h-4 w-4" />
                  <span>Panel Admin</span>
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg flex items-center justify-center"
                  title="Logout Sesi"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </header>
  );
}
