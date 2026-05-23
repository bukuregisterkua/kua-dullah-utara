import React, { useRef, useState, useEffect } from "react";
import { Pen, Trash2, CheckCircle2 } from "lucide-react";

interface SignaturePadProps {
  label: string;
  onSave: (dataUrl: string) => void;
  onClear: () => void;
  savedValue?: string;
  placeholderText?: string;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  label,
  onSave,
  onClear,
  savedValue = "",
  placeholderText = "Sentuh atau seret mouse untuk tanda tangan..."
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isSaved, setIsSaved] = useState(!!savedValue);
  const justSavedRef = useRef(false);

  // Synchronize internal hasDrawn and isSaved states with external savedValue updates
  useEffect(() => {
    if (savedValue) {
      setIsSaved(true);
      setHasDrawn(true);
      
      if (justSavedRef.current) {
        justSavedRef.current = false;
        return;
      }
      
      // Attempt to load the saved image directly into canvas if needed for display
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const img = new Image();
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset scale temporarily
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.restore();
          };
          img.src = savedValue;
        }
      }
    } else {
      setIsSaved(false);
      setHasDrawn(false);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  }, [savedValue]);

  // Handle canvas sizing on mount and resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width || 300;
      const height = 140; // Fixed physical aspect height for elegant signature block

      // Only backup if drawing exists
      let backupImg = "";
      if (hasDrawn || savedValue) {
        try {
          backupImg = canvas.toDataURL();
        } catch (e) {
          // ignore
        }
      }

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      // Actual pixel density
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#1e293b"; // Slate 800 for elegant black-ink signature

        // If there was something drawn before resizing, redraw it
        if (backupImg || savedValue) {
          const img = new Image();
          img.onload = () => {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset scale temporarily to draw 1:1 backup image
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.restore();
          };
          img.src = savedValue || backupImg;
        }
      }
    };

    // Initialize size
    handleResize();

    // Listen to resize events beautifully
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [hasDrawn, savedValue]);

  // Extract pointer coordinates safely across responsive mobile client and canvas
  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    
    // Exact relative math mapping pointer position relative to standard layout bounds
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  };

  // Begin Drawing Action
  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use Pointer Capture to keep track of pointer moves outside target boundary elegantly
    canvas.setPointerCapture(e.pointerId);

    const coords = getCoordinates(e);
    if (!coords) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      setIsDrawing(true);
      setHasDrawn(true);
    }
  };

  // Perform Drawing Stroke
  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const coords = getCoordinates(e);
    if (!coords) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  // Terminate Drawing Action
  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Safe fall-through
      }
    }
    setIsDrawing(false);
  };

  // Action: Clear Signature Pad
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasDrawn(false);
    setIsSaved(false);
    onClear();
  };

  // Action: Save Current Stroke to Parent State
  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!hasDrawn) {
      alert("Harap goreskan tanda tangan Anda sebelum menyimpan!");
      return;
    }

    // Capture drawn canvas content
    const dpr = window.devicePixelRatio || 1;
    // To trim whitespace or output perfectly crisp: standard toDataURL is elegant
    const dataUrl = canvas.toDataURL("image/png");
    justSavedRef.current = true;
    setIsSaved(true);
    onSave(dataUrl);
  };

  return (
    <div className="border border-slate-200 rounded-2xl bg-slate-50 p-3.5 space-y-3 shadow-inner">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 matches-label-theme">
          <Pen className="h-3.5 w-3.5 text-emerald-600" />
          <span>{label}</span>
        </label>
        {isSaved ? (
          <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 font-extrabold px-2 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="h-3 w-3" />
            <span>Tersimpan</span>
          </span>
        ) : (
          <span className="text-[9px] text-slate-400 italic">Belum disimpan</span>
        )}
      </div>

      {/* Signature Canvas Area wrapper */}
      <div 
        ref={containerRef}
        className="relative border border-dashed border-slate-300 rounded-xl bg-white overflow-hidden h-[142px] cursor-crosshair transition-all duration-300 hover:border-slate-400 focus-within:ring-2 focus-within:ring-emerald-500"
      >
        <canvas
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
          className="block touch-none select-none w-full h-[140px]"
        />

        {/* Dynamic Instructional Placeholder Overlay */}
        {!hasDrawn && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none select-none text-slate-350 bg-transparent transition-opacity duration-300">
            <p className="text-[10.5px] font-medium leading-relaxed max-w-[220px]">
              {placeholderText}
            </p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleClear}
          className="flex-1 py-1.5 px-3 border border-slate-200 hover:border-red-200 bg-white hover:bg-red-50 text-slate-600 hover:text-red-700 rounded-xl text-[10px] font-bold transition-all duration-200 flex items-center justify-center space-x-1 cursor-pointer"
        >
          <Trash2 className="h-3 w-3" />
          <span>Hapus</span>
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!hasDrawn}
          className={`flex-1 py-1.5 px-3 rounded-xl text-[10px] font-bold transition-all duration-200 flex items-center justify-center space-x-1 cursor-pointer ${
            isSaved 
              ? "bg-slate-200 text-slate-500 border border-slate-200 cursor-not-allowed" 
              : hasDrawn
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow active:scale-98"
                : "bg-slate-100 text-slate-300 border border-slate-150 cursor-not-allowed"
          }`}
        >
          <CheckCircle2 className="h-3 w-3" />
          <span>{isSaved ? "Simpan Ulang" : "Simpan TTD"}</span>
        </button>
      </div>
    </div>
  );
};
