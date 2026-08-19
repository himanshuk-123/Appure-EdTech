import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  Clock, 
  HelpCircle, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const TestsScreen: React.FC = () => {
  const { 
    tests, 
    brand, 
    navigate, 
    setLastTestResult 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'available' | 'upcoming' | 'completed'>('all');

  const filteredTests = tests.filter((t) => {
    if (activeFilter === 'all') return true;
    return t.status === activeFilter;
  });

  const handleStartTest = (test: any) => {
    navigate('test-taking');
  };

  const handleViewResult = (test: any) => {
    setLastTestResult({
      testTitle: test.title,
      score: test.score || 18,
      maxScore: test.totalMarks || 20,
      percentage: test.percentage || 90,
      correct: 18,
      incorrect: 2,
      unanswered: 0,
      timeTaken: '16m 24s'
    });
    navigate('test-result');
  };

  return (
    <div className="flex flex-col min-h-screen pb-28 bg-[#f8fafc] dark:bg-[#0b1c30]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#f8fafc]/90 dark:bg-[#0b1c30]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#e2e8f0] dark:border-slate-800">
        <div>
          <h1 
            className="text-[20px] font-bold text-[#0b1c30] dark:text-white tracking-tight"
            style={{ color: brand.primaryColor }}
          >
            Tests & Quizzes
          </h1>
          <p className="text-[13px] text-[#434655] dark:text-slate-400 font-medium">
            Assess your understanding & earn certifications
          </p>
        </div>
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
          style={{
            backgroundColor: `${brand.accentColor}18`,
            color: brand.accentColor
          }}
        >
          <Award className="w-5 h-5" />
        </div>
      </header>

      <main className="px-4 py-4 flex flex-col gap-5 max-w-md md:max-w-xl mx-auto w-full">
        {/* Performance Banner */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div 
              className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold shrink-0"
              style={{
                backgroundColor: `${brand.primaryColor}14`,
                color: brand.primaryColor
              }}
            >
              <span className="text-xl leading-tight">82%</span>
              <span className="text-[9px] uppercase tracking-wider">Avg</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Great Performance!
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Top 15% in your batch • 4 tests completed
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('certificates')}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 text-slate-700 dark:text-slate-300 transition-colors"
          >
            Certificates
          </button>
        </section>

        {/* Filter Pills */}
        <section className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {[
            { id: 'all', label: 'All Tests' },
            { id: 'available', label: 'Available Now' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'completed', label: 'Past Results' }
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
                style={{
                  backgroundColor: isActive ? brand.primaryColor : undefined
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </section>

        {/* Available Tests */}
        {(activeFilter === 'all' || activeFilter === 'available') && (
          <section className="flex flex-col gap-3">
            <h2 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
              Available Now
            </h2>
            {tests
              .filter((t) => t.status === 'available')
              .map((test) => (
                <div
                  key={test.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.06)] border-2 border-blue-600/70 dark:border-blue-500/70 p-5 flex flex-col gap-3.5"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {test.courseName}
                      </span>
                      <h3 className="text-[17px] font-bold text-slate-900 dark:text-white mt-0.5">
                        {test.title}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                      Active
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                      <span>{test.questionsCount} Questions</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{test.durationMinutes} Minutes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-slate-400" />
                      <span>{test.totalMarks} Total Marks</span>
                    </div>
                  </div>

                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                    Available until: {test.deadline}
                  </p>

                  <button
                    onClick={() => handleStartTest(test)}
                    className="w-full py-3 px-4 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                    style={{ backgroundColor: brand.primaryColor }}
                  >
                    <span>Start Test Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
          </section>
        )}

        {/* Upcoming Tests */}
        {(activeFilter === 'all' || activeFilter === 'upcoming') && (
          <section className="flex flex-col gap-3">
            <h2 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
              Upcoming Schedule
            </h2>
            {tests
              .filter((t) => t.status === 'upcoming')
              .map((test) => (
                <div
                  key={test.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-4.5 flex flex-col gap-2.5 opacity-90"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {test.courseName}
                      </span>
                      <h3 className="text-[15px] font-bold text-slate-900 dark:text-white">
                        {test.title}
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase">
                      Scheduled
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                    <span>{test.questionsCount} Questions</span>
                    <span>•</span>
                    <span>{test.durationMinutes} Mins</span>
                    <span>•</span>
                    <span>Starts: {test.deadline}</span>
                  </div>
                </div>
              ))}
          </section>
        )}

        {/* Past Completed Results */}
        {(activeFilter === 'all' || activeFilter === 'completed') && (
          <section className="flex flex-col gap-3">
            <h2 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
              Past Results & Analytics
            </h2>
            <div className="flex flex-col gap-3">
              {tests
                .filter((t) => t.status === 'completed')
                .map((test) => (
                  <div
                    key={test.id}
                    onClick={() => handleViewResult(test)}
                    className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-4.5 flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex flex-col items-center justify-center font-bold shrink-0">
                        <span className="text-sm leading-tight">{test.percentage}%</span>
                        <span className="text-[8px] uppercase">Score</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {test.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Score: {test.score}/{test.totalMarks} • Completed on {test.completedDate}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
