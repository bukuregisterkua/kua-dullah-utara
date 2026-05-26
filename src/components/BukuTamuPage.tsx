import { useState } from "react";
import { BookOpen, MapPin, ClipboardCheck, Clock, ExternalLink } from "lucide-react";

interface BukuTamuPageProps {
  bukuTamuUrl: string;
}

export default function BukuTamuPage({ bukuTamuUrl }: BukuTamuPageProps) {
  const [iframeLoading, setIframeLoading] = useState(true);

  // Convert forms.gle share url or normal Google Form to embeddable viewform?
  // Google Forms can be embedded beautifully by appending /viewform?embedded=true
  let embedUrl = bukuTamuUrl;
  if (bukuTamuUrl.includes("forms.gle/")) {
    // If it's a shortened forms.gle URL, iframe will redirect, but let's keep it directly or give option
    embedUrl = bukuTamuUrl;
  } else if (bukuTamuUrl.includes("docs.google.com/forms") && !bukuTamuUrl.includes("embedded=true")) {
    embedUrl = bukuTamuUrl.split("?")[0] + "?embedded=true";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in no-print">
      
      {/* Intro section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-500/10 shadow-md ring-1 ring-cyan-500/5 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <BookOpen className="h-6 w-6 text-emerald-700 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/50">
                Pencatatan Kehadiran Warga
              </span>
              <h3 className="text-lg font-black text-slate-900 font-display mt-1">
                Buku Tamu Digital KUA Pulau Dullah Utara
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                Sesuai dengan standar baku tatalaksana birokrasi madani Kemenag RI, mohon daftarkan kedatangan dan keperluan konsultasi Anda pada lembar registrasi Google Form di bawah ini.
              </p>
            </div>
          </div>

          <a 
            href={bukuTamuUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-850 hover:text-emerald-900 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all border border-emerald-100 shrink-0 cursor-pointer shadow-xxs"
          >
            <span>Buka di Tab Baru</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Embedded Iframe Form Container */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-[2rem] p-4 shadow-sm relative overflow-hidden h-[750px] flex flex-col">
          
          {iframeLoading && (
            <div className="absolute inset-0 bg-white/95 z-20 flex flex-col justify-center items-center space-y-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-550/20 border-t-emerald-600 animate-spin" />
              </div>
              <p className="text-xs font-bold text-emerald-850 font-mono animate-pulse">Menghubungkan lembar Google Form KUA...</p>
            </div>
          )}

          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            title="Formulir Buku Tamu Digital KUA"
            onLoad={() => setIframeLoading(false)}
            style={{ border: 0, borderRadius: "1.2rem" }}
            allowFullScreen
          >
            Memuat Formulir Buku Tamu...
          </iframe>
        </div>

        {/* Right Side: Supplementary Instruction Panel */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Box 1: Why registration is needed */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            
            <h4 className="text-xs font-black uppercase text-emerald-400 tracking-wider mb-4 flex items-center gap-1.5">
              <ClipboardCheck className="h-4.5 w-4.5 shrink-0" />
              <span>Petunjuk Kehadiran</span>
            </h4>
            
            <ul className="space-y-4 text-xs text-slate-300">
              <li className="flex gap-2.5 items-start">
                <span className="w-5 h-5 rounded-full bg-emerald-600/35 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <span>Isilah data identitas, nomor WhatsApp, serta urusan bimbingan Anda (Layanan Nikah, Wakaf, atau Muallaf) secara benar.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="w-5 h-5 rounded-full bg-emerald-600/35 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <span>Setiap data yang masuk akan diteruskan ke sistem naskah digital Kepala Kantor KUA Pulau Dullah Utara untuk alokasi berkas.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="w-5 h-5 rounded-full bg-emerald-600/35 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <span>Jika pengisian iframe di sebelah kiri terhambat, klik tombol "Buka di Tab Baru" di atas untuk mengisi di layar penuh.</span>
              </li>
            </ul>
          </div>

          {/* Box 2: Operating Sessions */}
          <div className="p-5 bg-slate-50 border border-emerald-500/10 rounded-2xl">
            <h4 className="text-[10px] font-black uppercase text-emerald-950 tracking-widest mb-3 flex items-center space-x-1">
              <Clock className="h-3.5 w-3.5 text-[#1F8A70]" />
              <span>Operasional Jam Kerja</span>
            </h4>
            <ul className="space-y-2 text-[10.5px] text-slate-650 font-mono">
              <li className="flex justify-between border-b border-slate-200/80 pb-1.5">
                <span>Senin - Kamis</span> 
                <span className="font-bold text-slate-800">08:00 - 16:00 WIT</span>
              </li>
              <li className="flex justify-between border-b border-slate-200/80 pb-1.5">
                <span>Jumat (Online WFA)</span> 
                <span className="font-bold text-emerald-700">08:30 - 17:00 WIT</span>
              </li>
              <li className="flex justify-between pb-0.5">
                <span>Sabtu & Minggu</span> 
                <span className="text-emerald-600 font-bold">Respon WA Online</span>
              </li>
            </ul>
          </div>

          {/* Box 3: General Location */}
          <div className="p-5 bg-slate-50 border border-emerald-500/10 rounded-2xl flex items-start gap-3">
            <MapPin className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-left leading-normal">
              <h5 className="text-[9.5px] font-black uppercase text-slate-400">Lokasi Kantor Fisik</h5>
              <p className="text-[10.5px] font-bold text-slate-800 mt-0.5 leading-relaxed">
                Jl. Panglima Mandala, Fiditan, Kecamatan Pulau Dullah Utara, Kota Tual, Maluku.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
