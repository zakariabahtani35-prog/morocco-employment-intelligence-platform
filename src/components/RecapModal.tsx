import React from 'react';
import { X } from 'lucide-react';

interface RecapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecapModal: React.FC<RecapModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-4xl p-4 sm:p-6 relative shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2 font-sans-body text-xs uppercase font-bold text-[#E6004D]">
            <span>MEIP POWER BI & ETL PIPELINE</span>
            <span className="text-gray-400">•</span>
            <span className="text-[#3B388E]">DECISION SUPPORT DEMO</span>
          </div>

          <button
            onClick={onClose}
            className="bg-[#F4F5F7] hover:bg-gray-200 p-2 rounded-xl text-gray-600 hover:text-[#3B388E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full bg-black rounded-xl border border-[#E2E8F0] overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/5m3O1pAnb18?autoplay=1"
            title="MEIP Data Pipeline & Interactive Dashboard Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
