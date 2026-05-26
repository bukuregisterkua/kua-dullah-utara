import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ClipboardList, 
  Users, 
  User, 
  Printer, 
  Download, 
  CheckCircle2, 
  PenTool 
} from "lucide-react";
import { SignaturePad } from "./SignaturePad";
import { Penyuluh } from "../types";
// @ts-ignore
import html2pdf from "html2pdf.js";

interface EvaluasiModalProps {
  isOpen: boolean;
  onClose: () => void;
  penyuluhList: Penyuluh[];
}

export default function EvaluasiModal({ isOpen, onClose, penyuluhList }: EvaluasiModalProps) {
  const [evaluasiTahun, setEvaluasiTahun] = useState("2026");
  const [evaluasiCatinPria, setEvaluasiCatinPria] = useState("RAHMANI");
  const [evaluasiCatinWanita, setEvaluasiCatinWanita] = useState("SIFA AZAHRA TEMARWUT");
  const [evaluasiHariTanggal, setEvaluasiHariTanggal] = useState("Selasa, 10 Februari 2026");
  const [evaluasiCatinPhone, setEvaluasiCatinPhone] = useState("081240912842");
  const [evaluasiKegiatan, setEvaluasiKegiatan] = useState("Bimbingan Perkawinan");
  const [evaluasiTema, setEvaluasiTema] = useState("Psikologi Keluarga");

  const [evaluasiPenyuluhId, setEvaluasiPenyuluhId] = useState("");
  const [evaluasiPenyuluhName, setEvaluasiPenyuluhName] = useState("H. Kamaruddin, SH");
  const [evaluasiPenyuluhNip, setEvaluasiPenyuluhNip] = useState("197208152003121001");
  const [evaluasiPenyuluhPangkat, setEvaluasiPenyuluhPangkat] = useState("Penata / IVa");
  const [evaluasiPenyuluhJabatan, setEvaluasiPenyuluhJabatan] = useState("Penyuluh Agama Islam");

  // Signatures
  const [evaluasiSigPria, setEvaluasiSigPria] = useState("");
  const [evaluasiSigWanita, setEvaluasiSigWanita] = useState("");
  const [evaluasiSigPenyuluh, setEvaluasiSigPenyuluh] = useState("");

  const [evaluasiRatings, setEvaluasiRatings] = useState<Record<string, string>>({
    q3: "Cukup Baik",
    q4: "Sangat Baik",
    q5: "Sangat Baik",
    q6: "Cukup Baik",
    q7: "Cukup Baik",
    q8: "Sangat Baik"
  });

  const [evaluasiComments, setEvaluasiComments] = useState<Record<string, string>>({
    q3: "Sesuai dengan kebutuhan penyuluhan",
    q4: "Sangat sistematis dan interaktif",
    q5: "Pesan sangat jelas dan mendidik",
    q6: "Sarana bimbingan sangat memadai",
    q7: "Sangat bersemangat dan komunikatif",
    q8: "Sangat bermanfaat untuk kehidupan sakinah"
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handlePenyuluhSelect = (id: string) => {
    setEvaluasiPenyuluhId(id);
    const p = penyuluhList.find(item => item.id === id);
    if (p) {
      setEvaluasiPenyuluhName(p.name);
      setEvaluasiPenyuluhNip(p.nip || "198501272025211002");
      setEvaluasiPenyuluhPangkat(p.pangkat || "IX");
      setEvaluasiPenyuluhJabatan(p.jabatan || "Penyuluh Agama Islam");
    }
  };

  // Direct print action
  const handlePrintDirect = () => {
    // Add print class to body
    document.body.classList.add("printing-kua-active");
    window.getSelection()?.removeAllRanges();

    const originalTitle = document.title;
    const cleanPria = evaluasiCatinPria ? evaluasiCatinPria.replace(/[^a-zA-Z0-9\s]/g, "").trim() : "Pria";
    const cleanWanita = evaluasiCatinWanita ? evaluasiCatinWanita.replace(/[^a-zA-Z0-9\s]/g, "").trim() : "Wanita";
    document.title = `Kuesioner_Evaluasi_KUA_${cleanPria.replace(/\s+/g, "_")}_&_${cleanWanita.replace(/\s+/g, "_")}`;

    setTimeout(() => {
      window.print();
      document.title = originalTitle;
      document.body.classList.remove("printing-kua-active");
      
      setToastMessage("Notifikasi: Proses Cetak Selesai! Halaman kembali aktif.");
      setTimeout(() => setToastMessage(null), 4000);
    }, 150);
  };

  // High-fidelity direct client-side PDF download using html2pdf.js
  const handleDownloadPdf = () => {
    const element = document.getElementById("kua-print-document-modal");
    if (!element) {
      alert("Elemen dokumen untuk di-download tidak ditemukan!");
      return;
    }

    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "-9999px";
    tempContainer.style.background = "white";
    tempContainer.style.width = "210mm";

    const clone = element.cloneNode(true) as HTMLElement;
    clone.classList.remove("hidden");
    clone.style.display = "block";
    clone.style.width = "100%";
    clone.style.padding = "20mm 15mm";
    clone.style.boxSizing = "border-box";
    clone.style.color = "black";
    clone.style.backgroundColor = "white";

    // Set page breaks for A4 pages
    const pages = clone.querySelectorAll(".print-page");
    pages.forEach((page, index) => {
      const p = page as HTMLElement;
      p.style.backgroundColor = "white";
      p.style.color = "black";
      p.style.width = "100%";
      p.style.boxSizing = "border-box";
      if (index > 0) {
        p.style.pageBreakBefore = "always";
      }
    });

    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);

    const cleanPria = evaluasiCatinPria ? evaluasiCatinPria.replace(/[^a-zA-Z0-9]/g, "_") : "Pria";
    const cleanWanita = evaluasiCatinWanita ? evaluasiCatinWanita.replace(/[^a-zA-Z0-9]/g, "_") : "Wanita";

    const opt = {
      margin:       0,
      filename:     `Kuesioner_Evaluasi_KUA_${cleanPria}_&_${cleanWanita}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: 'css', before: '.page-break' }
    } as any;

    setToastMessage("Notifikasi: Sedang mengonversi dan mengunduh berkas laporan PDF...");
    setTimeout(() => setToastMessage(null), 3500);

    // @ts-ignore
    html2pdf()
      .from(tempContainer)
      .set(opt)
      .save()
      .then(() => {
        document.body.removeChild(tempContainer);
        setToastMessage("Notifikasi: Sukses! File PDF evaluasi bimbingan berhasil diunduh.");
        setTimeout(() => setToastMessage(null), 4000);
      })
      .catch((err: any) => {
        console.error(err);
        document.body.removeChild(tempContainer);
        alert("Gagal mengunduh PDF. Silakan cetak manual!");
      });
  };

  const handleApplyForm = () => {
    setToastMessage("Notifikasi: Data isian berhasil diperbarui di lembar pratinjau!");
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 overflow-y-auto no-print">
          <div className="bg-slate-550/30 backdrop-blur-md absolute inset-0 -z-10" onClick={onClose} />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-slate-50 rounded-3xl overflow-hidden max-w-6xl w-full border border-slate-150 shadow-2xl p-4 sm:p-6 relative cursor-default max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4 shrink-0">
              <div className="flex items-center space-x-2 text-emerald-800">
                <ClipboardList className="h-5 w-5 text-emerald-600" />
                <h3 className="text-sm font-extrabold text-slate-900">Penyesuaian Format & Cetak PDF Kuesioner Evaluasi KUA</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-650 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Split Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-y-auto flex-grow pr-1">
              
              {/* COLUMN 1: EDIT LAYOUT DETAILS (LEFT) */}
              <div className="lg:col-span-5 space-y-4 max-h-[75vh] overflow-y-auto pr-1">
                <div className="bg-amber-50 border border-amber-200/65 p-3 rounded-2xl text-[11px] text-amber-905 leading-relaxed font-semibold">
                  ✍️ <strong>Tata Cara Pembuatan PDF:</strong> Lengkapilah isian Identitas Catin, data narasumber penyuluh serta bubuhkan tanda tangan di layar bawah. Pratinjau Kertas Resmi di sebelah kanan akan terisi secara dinamis, setelah selesai klik <strong className="text-emerald-800">"Terapkan Perubahan"</strong> sebelum mengunggah/mengunduh PDF.
                </div>

                {/* SECTION 1: IDENTITAS PESERTA */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-slate-605" />
                    <span>Identitas Pasangan (Catin)</span>
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Nama Peserta Pria</label>
                      <input 
                        type="text"
                        value={evaluasiCatinPria}
                        onChange={(e) => setEvaluasiCatinPria(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-bold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Nama Peserta Wanita</label>
                      <input 
                        type="text"
                        value={evaluasiCatinWanita}
                        onChange={(e) => setEvaluasiCatinWanita(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-bold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">No. WhatsApp / HP</label>
                      <input 
                        type="text"
                        value={evaluasiCatinPhone}
                        onChange={(e) => setEvaluasiCatinPhone(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-mono text-slate-800 bg-slate-50 focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Tahun Kegiatan</label>
                      <input 
                        type="text"
                        value={evaluasiTahun}
                        onChange={(e) => setEvaluasiTahun(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-bold text-slate-800 bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: IDENTITAS PENYULUH */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-slate-605" />
                    <span>Penyuluh / Narasumber</span>
                  </h4>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Pilih Cepat dari Database</label>
                    <select
                      value={evaluasiPenyuluhId}
                      onChange={(e) => handlePenyuluhSelect(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-805 bg-slate-50 font-bold"
                    >
                      <option value="">-- Pilih & Gunakan Data Penyuluh --</option>
                      {penyuluhList.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Nama Lengkap & Gelar</label>
                      <input 
                        type="text"
                        value={evaluasiPenyuluhName}
                        onChange={(e) => setEvaluasiPenyuluhName(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-800 font-bold bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">NIP</label>
                      <input 
                        type="text"
                        value={evaluasiPenyuluhNip}
                        onChange={(e) => setEvaluasiPenyuluhNip(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-mono text-slate-800 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Pangkat/Golongan</label>
                      <input 
                        type="text"
                        value={evaluasiPenyuluhPangkat}
                        onChange={(e) => setEvaluasiPenyuluhPangkat(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-800 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Jabatan Pokok</label>
                      <input 
                        type="text"
                        value={evaluasiPenyuluhJabatan}
                        onChange={(e) => setEvaluasiPenyuluhJabatan(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-800 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: KEGIATAN & TEMA */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-100">Kegiatan & Tanggal</h4>
                  
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Nama Kegiatan</label>
                    <input 
                      type="text"
                      value={evaluasiKegiatan}
                      onChange={(e) => setEvaluasiKegiatan(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-800 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Tema Penataran</label>
                    <input 
                      type="text"
                      value={evaluasiTema}
                      onChange={(e) => setEvaluasiTema(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-800 font-bold bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Waktu Pelaksanaan</label>
                    <input 
                      type="text"
                      value={evaluasiHariTanggal}
                      onChange={(e) => setEvaluasiHariTanggal(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs text-slate-800 bg-white"
                    />
                  </div>
                </div>

                {/* SECTION 4: RATINGS & COMMENTS */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-4">
                  <h4 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-100">Hasil Penilaian Ceklist</h4>
                  
                  {[
                    { key: "q3", num: "3", text: "Kesesuaian penyampaian materi dengan tema:" },
                    { key: "q4", num: "4", text: "Kesesuaian metode penyampaian secara sistematis:" },
                    { key: "q5", num: "5", text: "Kejelasan pesan tema tersampaikan ke peserta:" },
                    { key: "q6", num: "6", text: "Kelayakan sarana prasarana penunjang kegiatan:" },
                    { key: "q7", num: "7", text: "Antusiasme narasumber, motivasi, dan keaktifan:" },
                    { key: "q8", num: "8", text: "Kelayakan manfaat materi bimbingan di masa depan:" }
                  ].map((item) => (
                    <div key={item.key} className="p-3 bg-slate-50 border border-slate-205 rounded-xl space-y-2">
                      <div className="text-xs">
                        <span className="font-bold text-emerald-800 font-mono">{item.num}.</span> <span className="text-slate-700 font-medium">{item.text}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {["Cukup", "Sedang", "Baik", "Cukup Baik", "Sangat Baik"].map((scale) => (
                          <button
                            key={scale}
                            type="button"
                            onClick={() => setEvaluasiRatings(prev => ({ ...prev, [item.key]: scale }))}
                            className={`px-2 py-0.5 text-[9px] font-bold rounded-md border transition-all cursor-pointer ${
                              evaluasiRatings[item.key] === scale 
                                ? "bg-emerald-600 text-white border-emerald-600" 
                                : "bg-white text-slate-600 border-slate-250 hover:bg-slate-100"
                            }`}
                          >
                            {scale}
                          </button>
                        ))}
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">Hasil Pemantauan / Penjelasan</label>
                        <input 
                          type="text"
                          value={evaluasiComments[item.key] || ""}
                          onChange={(e) => setEvaluasiComments(prev => ({ ...prev, [item.key]: e.target.value }))}
                          className="w-full px-2 py-1 border border-slate-200 rounded text-[10px] text-slate-800 bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* SECTION 5: SIGNATURE RESMI */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center gap-1.5">
                    <PenTool className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Otorisasi & Tanda Tangan</span>
                  </h4>
                  
                  <SignaturePad 
                    label={`1. Peserta Pria (${evaluasiCatinPria})`}
                    savedValue={evaluasiSigPria}
                    onSave={(url) => setEvaluasiSigPria(url)}
                    onClear={() => setEvaluasiSigPria("")}
                    placeholderText="Ttd Catin Pria di sini..."
                  />

                  <SignaturePad 
                    label={`2. Peserta Wanita (${evaluasiCatinWanita})`}
                    savedValue={evaluasiSigWanita}
                    onSave={(url) => setEvaluasiSigWanita(url)}
                    onClear={() => setEvaluasiSigWanita("")}
                    placeholderText="Ttd Catin Wanita di sini..."
                  />

                  <SignaturePad 
                    label={`3. Narasumber/Penyuluh (${evaluasiPenyuluhName})`}
                    savedValue={evaluasiSigPenyuluh}
                    onSave={(url) => setEvaluasiSigPenyuluh(url)}
                    onClear={() => setEvaluasiSigPenyuluh("")}
                    placeholderText="Ttd Penyuluh di sini..."
                  />
                </div>

                <button
                  type="button"
                  onClick={handleApplyForm}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black uppercase tracking-wider select-none shadow-md hover:scale-[1.01] active:scale-97 transition-all cursor-pointer"
                >
                  ✓ Terapkan Perubahan
                </button>
              </div>

              {/* COLUMN 2: PRATINJAU KERTAS DOKUMEN RESMI (RIGHT) */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div className="flex items-center justify-between no-print">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lembar Fisik Dokumen KUA (Pratinjau)</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full uppercase font-mono">Pristine A4 Layout</span>
                </div>

                {/* VIRTUAL PAPER VIEW */}
                <div className="bg-white shadow-inner border border-slate-300 text-black leading-normal p-6 sm:p-10 font-serif text-[10.5px] max-h-[64vh] overflow-y-auto rounded-2xl select-text cursor-default space-y-4">
                  
                  {/* PRISTINE DYNAMIC A4 REPORT (Target for PDF) */}
                  <div 
                    id="kua-print-document-modal" 
                    className="bg-white text-black font-serif leading-relaxed text-xs space-y-6"
                    style={{ color: "black", backgroundColor: "white", fontFamily: "'Times New Roman', serif" }}
                  >
                    
                    {/* PAGE 1 CONTENT */}
                    <div className="print-page">
                      {/* Logo & Header */}
                      <div className="border-b-4 border-double border-black pb-3 text-center space-y-1">
                        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider leading-tight">
                          KEMENTERIAN AGAMA REPUBLIK INDONESIA
                        </h2>
                        <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wide leading-tight">
                          KANTOR KEMENTERIAN AGAMA KOTA TUAL
                        </h3>
                        <h1 className="text-xs sm:text-sm font-black uppercase tracking-widest leading-none" style={{ fontSize: "14px" }}>
                          KANTOR URUSAN AGAMA KECAMATAN PULAU DULLAH UTARA
                        </h1>
                        <p className="text-[9.5px] font-bold tracking-wide leading-tight" style={{ fontFamily: "Arial, sans-serif" }}>
                          Alamat: JL. Panglima Mandala, Fiditan, Kota Tual · Prov. Maluku (97611) · Telp : +62 812 4091 2842
                        </p>
                      </div>

                      {/* Title */}
                      <div className="text-center space-y-1 my-3">
                        <h2 className="text-xs font-bold uppercase underline leading-tight">
                          INSTRUMEN MONITORING DAN EVALUASI BIMBINGAN PERKAWINAN
                        </h2>
                        <p className="text-[9px] font-semibold leading-none">
                          KUA Kecamatan Pulau Dullah Utara, Kota Tual, Provinsi Maluku
                        </p>
                      </div>

                      {/* Identification Table */}
                      <div className="space-y-2 my-4">
                        <h3 className="text-[10px] font-bold uppercase underline">I. INFORMASI PELAKSANAAN DAN PENILAI</h3>
                        <table className="w-full border border-black border-collapse text-[10px]">
                          <tbody>
                            <tr className="border-b border-black">
                              <td className="w-1/3 p-2 font-bold border-r border-black bg-slate-50">1. Nama Kegiatan</td>
                              <td className="p-2 font-medium">{evaluasiKegiatan}</td>
                            </tr>
                            <tr className="border-b border-black">
                              <td className="p-2 font-bold border-r border-black bg-slate-50">2. Tema Bimbingan</td>
                              <td className="p-2 font-medium italic">"{evaluasiTema}"</td>
                            </tr>
                            <tr className="border-b border-black">
                              <td className="p-2 font-bold border-r border-black bg-slate-50">3. Narasumber / Penyuluh</td>
                              <td className="p-2 font-bold font-serif">{evaluasiPenyuluhName}</td>
                            </tr>
                            <tr className="border-b border-black">
                              <td className="p-2 font-bold border-r border-black bg-slate-50">4. Pangkat / NIP</td>
                              <td className="p-2 font-mono font-medium">{evaluasiPenyuluhPangkat} · NIP. {evaluasiPenyuluhNip}</td>
                            </tr>
                            <tr className="border-b border-black">
                              <td className="p-2 font-bold border-r border-black bg-slate-50">5. Pasangan Catin (Penilai)</td>
                              <td className="p-2 font-medium">
                                <span className="font-bold">{evaluasiCatinPria}</span> &amp; <span className="font-bold">{evaluasiCatinWanita}</span>
                              </td>
                            </tr>
                            <tr className="border-b border-black">
                              <td className="p-2 font-bold border-r border-black bg-slate-50">6. Waktu Pelaksanaan</td>
                              <td className="p-2 font-medium">{evaluasiHariTanggal} / Tahun {evaluasiTahun}</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border-r border-black bg-slate-50">7. No. Kontak Catin</td>
                              <td className="p-2 font-mono">{evaluasiCatinPhone}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Core Ratings Block */}
                      <div className="space-y-2 leading-relaxed">
                        <h3 className="text-[10px] font-bold uppercase underline">II. INSTRUMEN INDIKATOR KELAYAKAN MUTU</h3>
                        <table className="w-full border border-black border-collapse text-[9.5px]">
                          <thead>
                            <tr className="bg-slate-50 border-b border-black font-sans text-[8.5px]">
                              <th className="p-1.5 border-r border-black text-center w-8">No</th>
                              <th className="p-1.5 border-r border-black text-left">Aspek Indikator Yang Dinilai</th>
                              <th className="p-1.5 border-r border-black text-center w-12">Cukup</th>
                              <th className="p-1.5 border-r border-black text-center w-12">Sedang</th>
                              <th className="p-1.5 border-r border-black text-center w-12">Baik</th>
                              <th className="p-1.5 border-r border-black text-center w-14">Cukup B.</th>
                              <th className="p-1.5 border-r border-black text-center w-14">Sangat B.</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { key: "q3", num: "1", label: "Kesesuaian penyampaian materi dengan tema bimbingan." },
                              { key: "q4", num: "2", label: "Sistematika langkah penyampaian & keaktifan interaktif." },
                              { key: "q5", num: "3", label: "Kejelasan penyampaian pesan tema kepada pasangan Catin." },
                              { key: "q6", num: "4", label: "Kelayakan penggunaan fasilitas, sarana & prasarana KUA." },
                              { key: "q7", num: "5", label: "Antusiasme narasumber, motivasi belajar, dan keteladanan." },
                              { key: "q8", num: "6", label: "Kebermanfaatan materi bimbingan di jenjang pernikahan." }
                            ].map((row) => {
                              const rating = evaluasiRatings[row.key];
                              return (
                                <tr key={row.key} className="border-b border-black">
                                  <td className="p-1.5 border-r border-black text-center font-bold font-sans">{row.num}</td>
                                  <td className="p-1.5 border-r border-black leading-tight">
                                    <span className="font-bold">{row.label}</span>
                                    <span className="block text-[8px] text-slate-500 font-bold font-serif pt-0.5 italic">
                                      Hasil Pemantauan : "{evaluasiComments[row.key] || "-"}"
                                    </span>
                                  </td>
                                  <td className="p-1.5 border-r border-black text-center font-bold">{rating === "Cukup" ? "✓" : ""}</td>
                                  <td className="p-1.5 border-r border-black text-center font-bold">{rating === "Sedang" ? "✓" : ""}</td>
                                  <td className="p-1.5 border-r border-black text-center font-bold">{rating === "Baik" ? "✓" : ""}</td>
                                  <td className="p-1.5 border-r border-black text-center font-bold">{rating === "Cukup Baik" ? "✓" : ""}</td>
                                  <td className="p-1.5 border-r border-black text-center font-bold">{rating === "Sangat Baik" ? "✓" : ""}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Footer Signature Box */}
                      <div className="pt-6 font-serif">
                        <div className="flex justify-end pr-4 text-[10.5px]">
                          <p>Fiditan, {evaluasiHariTanggal.replace(/^(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu),\s*/i, "")}</p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mt-4 text-center text-[10px]">
                          <div>
                            <span className="block font-bold">Peserta Pria</span>
                            <div className="h-12 flex items-center justify-center p-0.5 my-1">
                              {evaluasiSigPria ? (
                                <img src={evaluasiSigPria} alt="Sign Pria" className="max-h-12 max-w-[100px] object-contain" />
                              ) : (
                                <span className="text-[8px] text-slate-350 italic font-bold">Belum TTD</span>
                              )}
                            </div>
                            <span className="font-bold underline uppercase">{evaluasiCatinPria || "-"}</span>
                          </div>

                          <div>
                            <span className="block font-bold">Peserta Wanita</span>
                            <div className="h-12 flex items-center justify-center p-0.5 my-1">
                              {evaluasiSigWanita ? (
                                <img src={evaluasiSigWanita} alt="Sign Wanita" className="max-h-12 max-w-[100px] object-contain" />
                              ) : (
                                <span className="text-[8px] text-slate-350 italic font-bold">Belum TTD</span>
                              )}
                            </div>
                            <span className="font-bold underline uppercase">{evaluasiCatinWanita || "-"}</span>
                          </div>

                          <div>
                            <span className="block font-bold leading-tight">Mengetahui<br/>Narasumber</span>
                            <div className="h-12 flex items-center justify-center p-0.5 my-1">
                              {evaluasiSigPenyuluh ? (
                                <img src={evaluasiSigPenyuluh} alt="Sign Penyuluh" className="max-h-12 max-w-[100px] object-contain" />
                              ) : (
                                <span className="text-[8px] text-slate-350 italic font-bold">Belum TTD</span>
                              )}
                            </div>
                            <span className="font-bold underline">{evaluasiPenyuluhName || "-"}</span>
                            <span className="block text-[8.5px] text-slate-500">NIP. {evaluasiPenyuluhNip}</span>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

                {/* ACTION BUTTON GRID inside popup */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1 shrink-0 no-print">
                  <button
                    type="button"
                    onClick={handlePrintDirect}
                    className="py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black transition-all cursor-pointer text-center flex items-center justify-center space-x-1.5 active:scale-97 shadow-md"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Cetak Dokumen</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    className="py-3 px-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-black transition-all cursor-pointer text-center flex items-center justify-center space-x-1.5 active:scale-97 shadow-md"
                  >
                    <Download className="h-4 w-4" />
                    <span>Unduh PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="py-3 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-black transition-all cursor-pointer text-center flex items-center justify-center space-x-1.5 active:scale-97"
                  >
                    <X className="h-4 w-4 text-slate-500" />
                    <span>Kembali</span>
                  </button>
                </div>

              </div>

            </div>

          </motion.div>

          {/* Clean, Elegant Floating Notification for Print/PDF Status inside Modal */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="fixed bottom-6 right-6 z-[9999] max-w-sm bg-slate-900 border border-slate-800 text-white shadow-2xl rounded-2xl p-4 flex items-start space-x-3"
              >
                <div className="flex-shrink-0 bg-emerald-500/20 text-emerald-400 p-1.5 rounded-lg">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="flex-1 text-sm pt-0.5">
                  <p className="font-semibold text-white">Notifikasi KUA</p>
                  <p className="text-slate-400 text-xs mt-0.5">{toastMessage}</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setToastMessage(null)}
                  className="flex-shrink-0 text-slate-500 hover:text-slate-305 p-1 rounded-sm cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
