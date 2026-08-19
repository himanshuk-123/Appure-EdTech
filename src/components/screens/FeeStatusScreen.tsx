import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  Phone, 
  ChevronRight, 
  DollarSign,
  Building2,
  Sparkles
} from 'lucide-react';

export const FeeStatusScreen: React.FC = () => {
  const { brand, receipts, setActiveReceipt, goBack, showToast } = useApp();

  const totalFee = 45000;
  const paidFee = 30000;
  const remainingFee = totalFee - paidFee;
  const percentPaid = Math.round((paidFee / totalFee) * 100);

  const handlePayInstallment = () => {
    showToast('Payment gateway simulated. Thank you for your payment!');
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
            Fee Status & Invoices
          </h1>
          <p className="text-[12px] text-[#434655] dark:text-slate-400 truncate">
            {brand.courseEnrolled}
          </p>
        </div>
      </header>

      <main className="px-4 py-4 flex flex-col gap-5 max-w-md md:max-w-xl mx-auto w-full">
        {/* Fee Summary Card */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                TOTAL COURSE TUITION
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {brand.currencySymbol}{totalFee.toLocaleString()}
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[10px] font-bold uppercase tracking-wider">
              ON SCHEDULE
            </span>
          </div>

          {/* Progress bar */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-emerald-600 dark:text-emerald-400">
                {percentPaid}% Paid ({brand.currencySymbol}{paidFee.toLocaleString()})
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                Remaining: {brand.currencySymbol}{remainingFee.toLocaleString()}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${percentPaid}%`,
                  backgroundColor: '#059669'
                }}
              />
            </div>
          </div>

          {/* Next Installment Due Box */}
          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Next Installment: {brand.currencySymbol}{remainingFee.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-500">Due Date: November 15, 2026</p>
              </div>
            </div>
            <button
              onClick={handlePayInstallment}
              className="px-3.5 py-1.5 rounded-xl text-white text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: brand.primaryColor }}
            >
              Pay Now
            </button>
          </div>
        </section>

        {/* Fee Breakdown */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-3">
          <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
            Tuition Fee Breakdown
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Core Curriculum & Lectures</span>
              <span className="font-semibold text-slate-900 dark:text-white">{brand.currencySymbol}35,000</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Cloud Labs & Coding Sandbox</span>
              <span className="font-semibold text-slate-900 dark:text-white">{brand.currencySymbol}7,000</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Exams & Certification Authority</span>
              <span className="font-semibold text-slate-900 dark:text-white">{brand.currencySymbol}3,000</span>
            </div>
            <div className="py-2.5 flex justify-between font-bold text-sm">
              <span className="text-slate-900 dark:text-white">Total Enrolled Amount</span>
              <span className="text-blue-600 dark:text-blue-400">{brand.currencySymbol}{totalFee.toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* Payment Receipts History */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
              Payment Receipts
            </h3>
            <span className="text-xs text-slate-400 font-medium">{receipts.length} Invoices</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {receipts.map((rec) => (
              <div
                key={rec.id}
                onClick={() => setActiveReceipt(rec)}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {rec.receiptNumber}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {rec.date} • {rec.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {brand.currencySymbol}{rec.amount.toLocaleString()}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Finance Support Box */}
        <section className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
          <div>
            <p className="font-bold text-slate-900 dark:text-white">Payment Help & EMI Queries</p>
            <p className="text-slate-500">{brand.supportPhone} • {brand.supportEmail}</p>
          </div>
          <a
            href={`tel:${brand.supportPhone}`}
            className="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-50"
          >
            <Phone className="w-4 h-4" />
          </a>
        </section>
      </main>
    </div>
  );
};
