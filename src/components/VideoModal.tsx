import { X } from 'lucide-react';
import { useEffect } from 'react';
import { PRESENTATION_VIDEO_PATH } from '../data/prodwareData';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="w-full max-w-4xl bg-[#0A0A0A] border border-neutral-800">
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between gap-4">
          <h2 id="video-modal-title" className="text-sm font-medium text-white">
            Presentazione ProdWare — Business Plan e ProdIntelligence
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi video di presentazione"
            className="w-9 h-9 inline-flex items-center justify-center text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-black aspect-video w-full">
          <video
            src={PRESENTATION_VIDEO_PATH}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
