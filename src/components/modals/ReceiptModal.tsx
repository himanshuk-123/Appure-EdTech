import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, Download, Printer, Share2, Building2 } from 'lucide-react';

export const ReceiptModal: React.FC = () => {
  const { activeReceipt, setActiveReceipt, brand, showToast } = useApp();

  if (!activeReceipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast(`Receipt ${activeReceipt.receiptNumber} downloaded successfully (PDF).`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Receipt</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              PAID
            </span>
          </div>
          <button
            onClick={() => setActiveReceipt(null)}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Receipt Paper */}
        <div className="p-5 space-y-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" id="printable-receipt">
          <div className="text-center pb-3 border-b border-dashed border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-blue-600 font-bold text-sm mb-0.5">
              <Building2 className="w-4 h-4" />
              <span>{brand.academyName}</span>
            </div>
            <p className="text-[11px] text-slate-500">{brand.academyTagline}</p>
          </div>

          <div className="flex justify-between items-center py-1">
            <div>
              <p className="text-[11px] text-slate-500">Receipt No.</p>
              <p className="text-xs font-mono font-bold">{activeReceipt.receiptNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-500">Payment Date</p>
              <p className="text-xs font-medium">{activeReceipt.date}</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Student Name</span>
              <span className="font-semibold">{brand.studentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Student ID</span>
              <span className="font-mono">{brand.studentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Course / Program</span>
              <span className="font-medium">{brand.courseEnrolled}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Mode</span>
              <span>{activeReceipt.paymentMethod}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-500">Amount Paid</p>
              <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {brand.currencySymbol}{activeReceipt.amount.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 pt-1">
            Computer generated voucher. Verification valid at {brand.supportEmail}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="py-2.5 px-3 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
        </div>
      </div>
    </div>
  );
};
