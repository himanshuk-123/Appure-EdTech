import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  ShieldCheck, 
  Building2, 
  QrCode, 
  Calendar, 
  Mail, 
  Phone,
  Sparkles
} from 'lucide-react';

export const StudentIdScreen: React.FC = () => {
  const { brand, goBack, showToast } = useApp();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${brand.studentName} - Digital Student ID`,
        text: `Student ID: ${brand.studentId} at ${brand.academyName}`,
        url: window.location.href
      }).catch(() => {
        showToast('ID link copied to clipboard!');
      });
    } else {
      showToast('Student ID verification link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    showToast('Digital ID card image downloaded!');
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-[#f8fafc] dark:bg-[#0b1c30]">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-[#f8fafc]/90 dark:bg-[#0b1c30]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#e2e8f0] dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={goBack}
            aria-label="Go back"
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0b1c30] dark:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[18px] font-bold text-[#0b1c30] dark:text-white">
            Digital Student ID
          </h1>
        </div>

        <button
          onClick={handleShare}
          aria-label="Share ID"
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </header>

      <main className="px-4 py-4 flex flex-col gap-5 max-w-md md:max-w-xl mx-auto w-full">
        {/* Digital Identity Card */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0px_12px_32px_rgba(15,23,42,0.1)] border border-[#e2e8f0] dark:border-slate-800 overflow-hidden relative">
          {/* Branded Top Banner */}
          <div 
            className="p-5 text-white flex items-center justify-between relative overflow-hidden"
            style={{ backgroundColor: brand.primaryColor }}
          >
            {/* Background geometric accents */}
            <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-white/10 -mr-10 -mt-10 pointer-events-none" />

            <div className="flex items-center gap-2.5 z-10">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold leading-tight">{brand.academyName}</h2>
                <p className="text-[11px] opacity-85">{brand.academyTagline}</p>
              </div>
            </div>

            <span className="z-10 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
              STUDENT ID
            </span>
          </div>

          {/* Card Body */}
          <div className="p-6 flex flex-col items-center text-center gap-4">
            {/* Student Photo */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg">
                <img
                  src={brand.studentAvatar}
                  alt={brand.studentName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center border-2 border-white dark:border-slate-800 shadow">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {brand.studentName}
              </h3>
              <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5" style={{ color: brand.primaryColor }}>
                ID: {brand.studentId}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {brand.courseEnrolled} • {brand.batchName}
              </p>
            </div>

            {/* QR Code Verification Section */}
            <div className="w-full pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between px-3">
              <div className="text-left text-xs">
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                  Validity
                </p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">Dec 2026</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                  ● ACTIVE STATUS
                </p>
              </div>

              {/* QR Box */}
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                <QrCode className="w-12 h-12 text-slate-900 dark:text-white" />
                <span className="text-[8px] font-mono text-slate-400 mt-0.5">SCAN TO VERIFY</span>
              </div>
            </div>
          </div>
        </section>

        {/* Student Details Sheet */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-3">
          <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
            Official Records
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-500">Registered Email</span>
              <span className="font-semibold text-slate-900 dark:text-white">{brand.studentEmail}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-500">Contact Number</span>
              <span className="font-semibold text-slate-900 dark:text-white">+1 (555) 234-8900</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-500">Enrolled Program</span>
              <span className="font-semibold text-slate-900 dark:text-white">{brand.courseEnrolled}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-500">Current Batch</span>
              <span className="font-semibold text-slate-900 dark:text-white">{brand.batchName}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-500">Blood Group</span>
              <span className="font-semibold text-slate-900 dark:text-white">O+ Positive</span>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="flex-1 py-3 px-4 rounded-xl text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: brand.primaryColor }}
          >
            <Share2 className="w-4 h-4" />
            Share ID Card
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Pass
          </button>
        </div>
      </main>
    </div>
  );
};
