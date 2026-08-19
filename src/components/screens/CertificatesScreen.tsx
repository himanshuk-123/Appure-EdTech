import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Award, 
  Download, 
  Eye, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  Building2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CertificatesScreen: React.FC = () => {
  const { certificates, setActiveCertificate, goBack, brand, showToast } = useApp();

  const handleCelebrate = (certName: string) => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
    showToast(`Certificate for ${certName} downloaded!`);
  };

  return (
    <div className="flex flex-col min-h-screen pb-28 bg-[#f8fafc] dark:bg-[#0b1c30]">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-[#f8fafc]/90 dark:bg-[#0b1c30]/90 backdrop-blur-md px-4 py-3 flex items-center border-b border-[#e2e8f0] dark:border-slate-800">
        <button
          onClick={goBack}
          aria-label="Go back"
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0b1c30] dark:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="ml-3 truncate flex-1">
          <h1 className="text-[18px] font-bold text-[#0b1c30] dark:text-white truncate">
            Certificates & Badges
          </h1>
          <p className="text-[12px] text-[#434655] dark:text-slate-400 truncate">
            Official verified achievements
          </p>
        </div>
      </header>

      <main className="px-4 py-4 flex flex-col gap-5 max-w-md md:max-w-xl mx-auto w-full">
        {/* Achievement Summary Card */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shrink-0">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {certificates.length} Verified Certificates
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Accredited and signed by {brand.academyName}
            </p>
          </div>
        </section>

        {/* Certificates List */}
        <section className="flex flex-col gap-4">
          <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
            Earned Accreditations
          </h3>

          <div className="flex flex-col gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 overflow-hidden flex flex-col"
              >
                {/* Certificate Visual Banner */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-850 p-4.5 border-b border-amber-200/60 dark:border-slate-700 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                      ID: {cert.verificationId}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                    VERIFIED
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {cert.courseName}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Issued to {brand.studentName} on {cert.issueDate}
                    </p>
                  </div>

                  <div className="pt-2 flex gap-2.5">
                    <button
                      onClick={() => setActiveCertificate(cert)}
                      className="flex-1 py-2.5 px-3 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: brand.primaryColor }}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Certificate
                    </button>
                    <button
                      onClick={() => handleCelebrate(cert.courseName)}
                      className="py-2.5 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
