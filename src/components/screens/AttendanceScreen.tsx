import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Award, 
  Calendar, 
  Info,
  ChevronDown
} from 'lucide-react';

export const AttendanceScreen: React.FC = () => {
  const { 
    attendanceSummary, 
    attendanceLogs, 
    goBack, 
    brand 
  } = useApp();

  const [selectedTerm, setSelectedTerm] = useState('Current Term (Fall 2026)');

  const totalAttended = 21;
  const totalAbsent = 3;
  const overallPercentage = 87;

  return (
    <div className="flex flex-col min-h-screen pb-28 bg-[#f8fafc] dark:bg-[#0b1c30]">
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
            Attendance Record
          </h1>
        </div>

        <div className="relative">
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="text-xs font-semibold pl-3 pr-7 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 appearance-none focus:outline-none"
          >
            <option>Fall 2026</option>
            <option>Summer 2026</option>
            <option>Spring 2026</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </header>

      <main className="px-4 py-4 flex flex-col gap-5 max-w-md md:max-w-xl mx-auto w-full">
        {/* Main Attendance Gauge Card */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-6 flex flex-col items-center text-center gap-4">
          {/* Circular Progress Display */}
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
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - overallPercentage / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white leading-none">
                {overallPercentage}%
              </span>
              <span className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                Overall
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold uppercase tracking-wide border border-emerald-300 dark:border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Good Standing
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
              You meet the minimum 75% attendance criterion required for university exams.
            </p>
          </div>
        </section>

        {/* Bento Stats */}
        <section className="grid grid-cols-3 gap-2.5">
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-3 flex flex-col items-center text-center gap-1 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white">{totalAttended}</span>
            <span className="text-[10px] text-slate-500 font-medium">Attended</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-3 flex flex-col items-center text-center gap-1 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mb-0.5">
              <XCircle className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white">{totalAbsent}</span>
            <span className="text-[10px] text-slate-500 font-medium">Absent</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-3 flex flex-col items-center text-center gap-1 shadow-sm">
            <div 
              className="w-7 h-7 rounded-full flex items-center justify-center mb-0.5"
              style={{
                backgroundColor: `${brand.primaryColor}14`,
                color: brand.primaryColor
              }}
            >
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white">24</span>
            <span className="text-[10px] text-slate-500 font-medium">Total Sessions</span>
          </div>
        </section>

        {/* Course Breakdown */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-3.5">
          <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
            Attendance by Course
          </h3>

          <div className="flex flex-col gap-4">
            {attendanceSummary.map((item) => (
              <div key={item.courseId} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {item.courseTitle}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {item.percentage}% ({item.attendedClasses}/{item.totalClasses})
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.percentage >= 75 ? brand.primaryColor : '#e11d48'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Attendance Logs */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-3">
          <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
            Recent Attendance Logs
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {attendanceLogs.map((log) => {
              const isPresent = log.status === 'present';
              return (
                <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isPresent
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                    }`}>
                      {isPresent ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{log.courseTitle}</p>
                      <p className="text-[11px] text-slate-500">{log.date} • {log.time}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wide ${
                    isPresent
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'
                  }`}>
                    {log.status}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};
