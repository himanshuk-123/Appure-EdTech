import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  TrendingUp, 
  RotateCcw, 
  FileText,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const TestResultScreen: React.FC = () => {
  const { lastTestResult, goBack, navigate, brand } = useApp();
  const [showReview, setShowReview] = useState(false);

  const res = lastTestResult || {
    testTitle: 'HTML & CSS Quiz',
    score: 18,
    maxScore: 20,
    percentage: 90,
    correct: 18,
    incorrect: 2,
    unanswered: 0,
    timeTaken: '16m 24s'
  };

  const topics = [
    { title: 'HTML Semantic Structure', score: 100 },
    { title: 'CSS Flexbox & Grid Layouts', score: 85 },
    { title: 'Responsive Media Queries', score: 90 },
    { title: 'CSS Selectors & Specificity', score: 80 }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-28 bg-[#f8fafc] dark:bg-[#0b1c30]">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-[#f8fafc]/90 dark:bg-[#0b1c30]/90 backdrop-blur-md px-4 py-3 flex items-center border-b border-[#e2e8f0] dark:border-slate-800">
        <button
          onClick={() => navigate('tests')}
          aria-label="Back to tests"
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0b1c30] dark:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="ml-3 truncate flex-1">
          <h1 className="text-[16px] font-bold text-[#0b1c30] dark:text-white truncate">
            Test Results
          </h1>
          <p className="text-[12px] text-[#434655] dark:text-slate-400 truncate">
            {res.testTitle}
          </p>
        </div>
      </header>

      <main className="px-4 py-4 flex flex-col gap-5 max-w-md md:max-w-xl mx-auto w-full">
        {/* Main Score Hero */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-6 flex flex-col items-center text-center gap-4">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke={brand.primaryColor}
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - res.percentage / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                {res.percentage}%
              </span>
              <span className="text-xs font-bold text-slate-400 mt-1">
                {res.score} / {res.maxScore}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
              <span>Outstanding Work, {brand.studentName.split(' ')[0]}!</span>
              <span>🎉</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
              You scored above the 80% passing threshold and qualified for the module badge.
            </p>
          </div>
        </section>

        {/* Breakdown Bento */}
        <section className="grid grid-cols-3 gap-2.5">
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-3 flex flex-col items-center text-center gap-1 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white">{res.correct}</span>
            <span className="text-[10px] text-slate-500 font-medium">Correct</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-3 flex flex-col items-center text-center gap-1 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mb-0.5">
              <XCircle className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white">{res.incorrect}</span>
            <span className="text-[10px] text-slate-500 font-medium">Incorrect</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-3 flex flex-col items-center text-center gap-1 shadow-sm">
            <div 
              className="w-7 h-7 rounded-full flex items-center justify-center mb-0.5"
              style={{
                backgroundColor: `${brand.primaryColor}14`,
                color: brand.primaryColor
              }}
            >
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white">{res.timeTaken}</span>
            <span className="text-[10px] text-slate-500 font-medium">Time Taken</span>
          </div>
        </section>

        {/* Topic Breakdown */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-3.5">
          <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
            Topic Performance
          </h3>

          <div className="flex flex-col gap-3.5">
            {topics.map((t, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{t.title}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{t.score}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${t.score}%`,
                      backgroundColor: brand.primaryColor
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-col gap-3 pt-1">
          <button
            onClick={() => navigate('certificates')}
            className="w-full py-3.5 px-6 rounded-xl text-white font-semibold text-[14px] flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
            style={{ backgroundColor: brand.primaryColor }}
          >
            <Award className="w-4 h-4" />
            <span>View Earned Certificate</span>
          </button>

          <button
            onClick={() => navigate('tests')}
            className="w-full py-3.5 px-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Return to Tests Dashboard</span>
          </button>
        </section>
      </main>
    </div>
  );
};
