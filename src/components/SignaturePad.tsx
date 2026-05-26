import React, { useRef, useState, useEffect } from 'react';
import { Trash2, CheckCircle2 } from 'lucide-react';

interface SignaturePadProps {
  label: string;
  savedValue: string;
  onSave: (dataUrl: string) => void;
  onClear: () => void;
  placeholderText?: string;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  label,
  savedValue,
  onSave,
  onClear,
  placeholderText = "Bubuhkan tanda tangan Anda di sini..."
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set scaling for high resolution displays
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = 120 * 2; // Fixed on-screen height
    ctx.scale(2, 2);

    ctx.strokeStyle = '#0f172a'; // Deep slate ink
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    setHasDrawn(!!savedValue);
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    // Check if Touch or Mouse Event
    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCoordinates(e);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveSignature();
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSave(dataUrl);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    onClear();
  };

  return (
    <div className="space-y-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl relative">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700">{label}</label>
        {savedValue && (
          <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1 animate-fade-in">
            <CheckCircle2 className="h-3 w-3" />
            <span>Tersimpan</span>
          </span>
        )}
      </div>

      <div className="relative border border-slate-200 rounded-lg overflow-hidden bg-white shadow-inner">
        {savedValue ? (
          <div className="h-[120px] flex items-center justify-center bg-slate-50/50 relative">
            <img 
              src={savedValue} 
              alt={`TTD ${label}`}
              className="max-h-[100px] object-contain select-none"
            />
            <button
              type="button"
              onClick={clearCanvas}
              className="absolute right-2.5 bottom-2.5 p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-150 rounded-lg transition-all cursor-pointer"
              title="Hapus Tanda Tangan"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-[120px] block touch-none cursor-crosshair bg-white"
            />
            {!hasDrawn && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none select-none">
                <p className="text-[10px] font-bold text-slate-400 capitalize">{placeholderText}</p>
                <p className="text-[8px] text-slate-350 mt-1">Gunakan jari (HP) atau mouse (PC)</p>
              </div>
            )}
            {hasDrawn && (
              <button
                type="button"
                onClick={clearCanvas}
                className="absolute right-2 bottom-2 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-all pointer-events-auto cursor-pointer"
                title="Hapus"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
