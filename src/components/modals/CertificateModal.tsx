import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Award, Download, Printer, Share2, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CertificateModal: React.FC = () => {
  const { activeCertificate, setActiveCertificate, brand, showToast } = useApp();

  if (!activeCertificate) return null;

  const handleCelebrate = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleDownload = () => {
    handleCelebrate();
    showToast(`Certificate for ${activeCertificate.courseName} downloaded!`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Certificate of Completion</h3>
          </div>
          <button
            onClick={() => setActiveCertificate(null)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Frame */}
        <div className="p-6 bg-slate-100/70 dark:bg-slate-950 flex items-center justify-center">
          <div 
            className="w-full bg-white text-slate-900 p-7 rounded-xl border-4 border-double border-amber-300/80 shadow-lg relative text-center"
            style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #fafafa 100%)' }}
          >
            {/* Corner Filigrees */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-500"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-500"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-500"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-500"></div>

            <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-slate-500 mb-1">
              {brand.academyName}
            </p>
            <h2 className="text-xl font-bold text-slate-900 font-serif tracking-tight mb-3">
              Certificate of Completion
            </h2>

            <p className="text-xs text-slate-500 italic mb-1">This is proudly presented to</p>
            <h3 className="text-lg font-bold text-blue-600 font-serif italic mb-3">
              {activeCertificate.studentName || brand.studentName}
            </h3>

            <p className="text-xs text-slate-600 mb-1">for successfully mastering the curriculum and projects in</p>
            <p className="text-sm font-bold text-slate-900 mb-5">
              {activeCertificate.courseName}
            </p>

            <div className="flex justify-between items-end pt-4 border-t border-slate-200 text-left text-[10px] text-slate-500">
              <div>
                <p className="font-semibold text-slate-700">Issued On:</p>
                <p>{activeCertificate.issueDate}</p>
                <p className="font-mono text-[9px] mt-0.5 text-slate-400">ID: {activeCertificate.verificationId}</p>
              </div>
              <div className="text-center">
                <div className="w-16 border-b border-slate-400 mb-1 mx-auto"></div>
                <p className="font-serif italic text-slate-700 font-medium">Academic Director</p>
                <p>{brand.academyName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2.5">
          <button
            onClick={handleDownload}
            className="flex-1 py-2.5 px-4 rounded-xl text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-sm"
            style={{ backgroundColor: brand.primaryColor }}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={() => showToast('Certificate verification link copied to clipboard!')}
            className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
