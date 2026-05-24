import React, { useState } from "react";
import { BookOpen, Users, Clock, CheckCircle2, ExternalLink, Sparkles, ShieldAlert, CheckCheck, Award } from "lucide-react";

interface BukuTamuPageProps {
  bukuTamuUrl: string;
}

export default function BukuTamuPage({ bukuTamuUrl }: BukuTamuPageProps) {
  const [isLoadingLink, setIsLoadingLink] = useState(false);

  const handleOpenBukuTamu = () => {
    if (isLoadingLink) return;
    setIsLoadingLink(true);

    // Short standard delay for feedback
    setTimeout(() => {
      setIsLoadingLink(false);
      const targetUrl = bukuTamuUrl || "https://forms.gle/kuadullahbukutamu";
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }, 400);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white select-none">
      
      {/* 4. Main White Presentation Panel */}
      <div 
        className="relative max-w-xl w-full z-10"
        id="buku-tamu-card"
      >
        {/* Main Content Pane */}
        <div className="relative bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-md flex flex-col items-center text-center">
          
          {/* Badge: Online 24 Jam */}
          <div 
            className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold tracking-wider"
            id="buku-tamu-badge"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block animation-pulse" />
            <span>Sistem Online Kemenag</span>
          </div>

          <div className="relative mb-6" id="buku-tamu-icon-container">
            {/* Simple Official Icon Frame */}
            <div className="relative z-10 p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100">
              <BookOpen className="w-8 h-8" />
            </div>
          </div>

          {/* Header Section */}
          <div className="space-y-3 max-w-lg mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">
              Buku Tamu Digital KUA
            </h2>
            <div className="w-12 h-[2px] bg-emerald-600 mx-auto" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Silakan melakukan pengisian buku tamu digital untuk pendataan kunjungan layanan KUA Kecamatan Pulau Dullah Utara secara cepat, aman, resmi, dan terdokumentasi dengan baik.
            </p>
          </div>

          {/* Action Trigger Card */}
          <div className="w-full max-w-xs mb-8" id="buku-tamu-cta-button-wrapper">
            <button
              onClick={handleOpenBukuTamu}
              disabled={isLoadingLink}
              className="w-full py-3 px-5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="buku-tamu-submit-button"
            >
              {isLoadingLink ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Membuka Formulir...</span>
                </>
              ) : (
                <>
                  <Users className="w-4 h-4" />
                  <span>Isi Buku Tamu Digital</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-400 font-mono mt-2.5 uppercase tracking-wider">
              Buka Google Form resmi di tab baru
            </p>
          </div>

          {/* Static Stats Indicators */}
          <div className="w-full border-t border-slate-100 pt-6" id="buku-tamu-stats-container">
            <div className="grid grid-cols-3 gap-2">
              
              <div className="flex flex-col items-center">
                <div className="p-2 bg-slate-50 text-emerald-800 rounded-lg mb-1.5">
                  <CheckCheck className="w-4 h-4" />
                </div>
                <h4 className="text-[10px] font-bold text-slate-800 uppercase">Resmi</h4>
                <p className="text-[8px] text-slate-400 uppercase">Kemenag RI</p>
              </div>

              <div className="flex flex-col items-center border-l border-slate-100">
                <div className="p-2 bg-slate-50 text-emerald-800 rounded-lg mb-1.5">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="text-[10px] font-bold text-slate-800 uppercase">Cepat</h4>
                <p className="text-[8px] text-slate-400 uppercase">Tanpa Antre</p>
              </div>

              <div className="flex flex-col items-center border-l border-slate-100">
                <div className="p-2 bg-slate-50 text-emerald-800 rounded-lg mb-1.5">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="text-[10px] font-bold text-slate-800 uppercase">Aman</h4>
                <p className="text-[8px] text-slate-400 uppercase">Terlindungi</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
