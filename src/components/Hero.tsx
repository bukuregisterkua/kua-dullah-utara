import { Heart, Globe, MessageSquare, ChevronRight, CheckCircle, FileText } from "lucide-react";
import { motion } from "motion/react";
import { Settings } from "../types";

interface HeroProps {
  settings: Settings;
  setCurrentTab: (tab: string) => void;
  onAdminClick: () => void;
}

export default function Hero({ settings, setCurrentTab, onAdminClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-12 lg:pb-20">
      
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-70 -z-10 animate-pulse duration-5000" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 tracking-wide uppercase shadow-xxs">
                🇮🇩 Pelayanan Sahabat Ummat
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-emerald-950 tracking-tight leading-none"
            >
              {settings.bannerTitle || "KUA PULAU DULLAH UTARA"}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
            >
              {settings.bannerSubtitle || "Pusat Pelayanan Keagamaan Digital Kecamatan Pulau Dullah Utara, Kota Tual. Nikah, Wakaf, & Bimbingan Ummat Terintegrasi."}
            </motion.p>

            {/* CTA Option Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 sm:flex sm:justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => setCurrentTab("nikah")}
                className="w-full sm:w-auto px-8 py-4 emerald-gradient text-white rounded-2xl text-sm font-bold hover:shadow-lg hover:brightness-110 transition-all cursor-pointer flex items-center justify-center space-x-2"
                id="hero-layanan-online-btn"
              >
                <span>Mulai Layanan Online</span>
                <ChevronRight className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => setCurrentTab("kontak")}
                className="w-full sm:w-auto mt-3 sm:mt-0 px-8 py-4 bg-white text-emerald-900 ring-2 ring-emerald-100 rounded-2xl text-sm font-bold hover:bg-emerald-50 hover:ring-emerald-200 transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-xs"
                id="hero-hubungi-kami-btn"
              >
                <MessageSquare className="h-4 w-4 text-emerald-600" />
                <span>Hubungi Kantor</span>
              </button>
            </motion.div>

            {/* Fast Value Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2 text-slate-700">
                <CheckCircle className="h-5.5 w-5.5 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">100% Gratis di KUA</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <CheckCircle className="h-5.5 w-5.5 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">Resmi Kemenag</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <CheckCircle className="h-5.5 w-5.5 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">Cepat & Aman</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Access Sidebar / Beautiful Card Panel representing Integrated Systems */}
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden emerald-gradient"
            >
              {/* Overlay graphics */}
              <div className="absolute -right-16 -top-16 w-36 h-36 bg-emerald-500/20 rounded-full blur-xl" />
              <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-emerald-500/20 rounded-full blur-xl" />

              <h3 className="text-lg font-bold font-display uppercase tracking-wider text-emerald-300">
                Sistem Terintegrasi
              </h3>
              <p className="text-xs text-emerald-100 mt-1 mb-6 font-medium">
                Akses instan ke portal resmi kementrian agama pusat & daerah
              </p>

              <div className="space-y-4">
                {/* SIMKAH */}
                <a
                  href="https://simkah4.kemenag.go.id"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-start p-4 bg-semibold bg-emerald-800/40 hover:bg-emerald-800/70 border border-emerald-700 rounded-2xl transition-all"
                >
                  <Globe className="h-8 w-8 text-emerald-300 shrink-0 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-bold font-display flex items-center">
                      <span>SIMKAH Kemenag</span>
                      <ChevronRight className="h-3.5 w-3.5 ml-1 text-emerald-400" />
                    </h4>
                    <p className="text-[11px] text-emerald-200 mt-0.5">
                      Pendaftaran nikah online, cek ketersediaan tanggal & lokasi pernikahan.
                    </p>
                  </div>
                </a>

                {/* SIWAK */}
                <a
                  href="https://siwak.kemenag.go.id"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-start p-4 bg-emerald-800/40 hover:bg-emerald-800/70 border border-emerald-700 rounded-2xl transition-all"
                >
                  <FileText className="h-8 w-8 text-emerald-300 shrink-0 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-bold font-display flex items-center">
                      <span>SIWAK (Sistem Wakaf)</span>
                      <ChevronRight className="h-3.5 w-3.5 ml-1 text-emerald-400" />
                    </h4>
                    <p className="text-[11px] text-emerald-200 mt-0.5">
                      Mendaftarkan secara resmi aset wakaf tanah dan bangunan di pangkalan data nasional.
                    </p>
                  </div>
                </a>

                {/* BIMWIN */}
                <a
                  href="https://wa.me/6281240912842"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-start p-4 bg-emerald-800/40 hover:bg-emerald-800/70 border border-emerald-700 rounded-2xl transition-all"
                >
                  <Heart className="h-8 w-8 text-emerald-300 shrink-0 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-bold font-display flex items-center">
                      <span>Bina Kami Bimwin</span>
                      <ChevronRight className="h-3.5 w-3.5 ml-1 text-emerald-400" />
                    </h4>
                    <p className="text-[11px] text-emerald-200 mt-0.5">
                      Bimbingan perkawinan online calon pengantin terintegrasi WhatsApp.
                    </p>
                  </div>
                </a>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
