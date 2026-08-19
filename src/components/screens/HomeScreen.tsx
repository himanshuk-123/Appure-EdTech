import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Video, 
  ArrowRight, 
  PlayCircle, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  DoorOpen, 
  Clock, 
  UploadCloud, 
  FileText, 
  HelpCircle, 
  Terminal,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { 
    brand, 
    navigate, 
    setSelectedCourseId, 
    setSelectedLessonId, 
    setShowLiveClassModal,
    activityNotifications
  } = useApp();

  const handleContinueLearning = () => {
    setSelectedCourseId('full-stack-dev');
    setSelectedLessonId('les-10');
    navigate('lesson-view');
  };

  const handleJoinClass = () => {
    setShowLiveClassModal(true);
  };

  return (
    <main className="px-4 py-4 flex flex-col gap-5 max-w-md md:max-w-xl mx-auto w-full pb-28">
      {/* 1. Live Class Announcement Banner */}
      {brand.enableLiveClassBanner && (
        <section className="animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-[#c3c6d7]/50 dark:border-slate-800 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] overflow-hidden">
            <div className="p-4 sm:p-5 flex flex-col gap-3.5">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <span className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50">
                  <Video className="w-5 h-5 animate-pulse" />
                </span>
                <span className="font-bold text-[16px] text-[#0b1c30] dark:text-white">
                  Live Class Today
                </span>
              </div>
              <p className="text-[14px] text-[#434655] dark:text-slate-300 leading-snug">
                Join your <span className="font-semibold text-slate-800 dark:text-white">{brand.courseEnrolled}</span> session at 6:00 PM
              </p>
              <button
                onClick={handleJoinClass}
                className="w-full text-white font-medium text-[14px] h-12 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-95 active:scale-[0.99] shadow-sm cursor-pointer"
                style={{ backgroundColor: brand.primaryColor }}
              >
                <span>Join Class</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 2. Continue Learning Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-bold text-[#0b1c30] dark:text-white">
            Continue Learning
          </h2>
          <button
            onClick={() => navigate('courses')}
            className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
            style={{ color: brand.primaryColor }}
          >
            All Courses
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-[#c3c6d7]/50 dark:border-slate-800 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] overflow-hidden relative group">
          {/* Subtle grid accent background */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #0b1c30 1px, transparent 0)',
              backgroundSize: '16px 16px'
            }}
          />

          <div className="p-4 sm:p-5 flex flex-col gap-4 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0"
                  style={{ backgroundColor: `${brand.primaryColor}14` }}
                >
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-[#0b1c30] dark:text-white">
                    {brand.courseEnrolled}
                  </h3>
                  <p className="text-[12px] text-[#434655] dark:text-slate-400 mt-0.5 font-medium">
                    {brand.academyName}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex justify-between items-end">
                <span className="text-[12px] text-[#434655] dark:text-slate-400 font-medium">
                  12 of 24 lessons completed
                </span>
                <span 
                  className="font-bold text-[14px]"
                  style={{ color: brand.primaryColor }}
                >
                  50%
                </span>
              </div>
              <div className="h-2 w-full bg-[#e5eeff] dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: '50%', 
                    backgroundColor: brand.primaryColor 
                  }}
                />
              </div>
            </div>

            <button
              onClick={handleContinueLearning}
              className="w-full bg-[#eff4ff] dark:bg-slate-800 hover:bg-[#e5eeff] dark:hover:bg-slate-700/80 text-[#0b1c30] dark:text-white font-medium text-[14px] h-12 rounded-xl flex items-center justify-center gap-2 transition-colors border border-[#c3c6d7]/40 dark:border-slate-700 cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" style={{ color: brand.primaryColor }} />
              <span>Continue Learning</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Quick Stats Bento Grid (Clickable) */}
      <section className="grid grid-cols-3 gap-2.5">
        <button
          onClick={() => navigate('attendance')}
          className="bg-white dark:bg-slate-900 border border-[#c3c6d7]/50 dark:border-slate-800 rounded-2xl p-3 flex flex-col items-center text-center gap-1.5 shadow-[0px_4px_12px_rgba(15,23,42,0.04)] hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-[17px] font-bold text-[#0b1c30] dark:text-white leading-tight">
            87%
          </span>
          <span className="text-[11px] text-[#434655] dark:text-slate-400 font-medium">
            Attendance
          </span>
        </button>

        <button
          onClick={() => navigate('courses')}
          className="bg-white dark:bg-slate-900 border border-[#c3c6d7]/50 dark:border-slate-800 rounded-2xl p-3 flex flex-col items-center text-center gap-1.5 shadow-[0px_4px_12px_rgba(15,23,42,0.04)] hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center mb-0.5"
            style={{ 
              backgroundColor: `${brand.primaryColor}15`,
              color: brand.primaryColor
            }}
          >
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-[17px] font-bold text-[#0b1c30] dark:text-white leading-tight">
            64%
          </span>
          <span className="text-[11px] text-[#434655] dark:text-slate-400 font-medium">
            Progress
          </span>
        </button>

        <button
          onClick={() => navigate('tests')}
          className="bg-white dark:bg-slate-900 border border-[#c3c6d7]/50 dark:border-slate-800 rounded-2xl p-3 flex flex-col items-center text-center gap-1.5 shadow-[0px_4px_12px_rgba(15,23,42,0.04)] hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center mb-0.5"
            style={{ 
              backgroundColor: `${brand.accentColor}18`,
              color: brand.accentColor
            }}
          >
            <Award className="w-4 h-4" />
          </div>
          <span className="text-[17px] font-bold text-[#0b1c30] dark:text-white leading-tight">
            82%
          </span>
          <span className="text-[11px] text-[#434655] dark:text-slate-400 font-medium">
            Test Avg
          </span>
        </button>
      </section>

      {/* 4. Today's Classes Section */}
      <section className="flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <h2 className="text-[17px] font-bold text-[#0b1c30] dark:text-white">
            Today's Classes
          </h2>
          <button
            onClick={() => navigate('schedule')}
            className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            style={{ color: brand.primaryColor }}
          >
            See Schedule
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-[#c3c6d7]/50 dark:border-slate-800 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] flex flex-col overflow-hidden divide-y divide-[#c3c6d7]/30 dark:divide-slate-800">
          {/* Class 1 */}
          <div 
            onClick={() => navigate('schedule')}
            className="p-4 flex items-start gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <div className="flex flex-col items-center shrink-0 w-12 pt-0.5">
              <span className="font-bold text-[15px] text-[#0b1c30] dark:text-white">
                10:00
              </span>
              <span className="text-[11px] text-[#434655] dark:text-slate-400 font-semibold uppercase">
                AM
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-[15px] text-[#0b1c30] dark:text-white">
                  Python Programming
                </h3>
                <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase">
                  Upcoming
                </span>
              </div>
              <div className="flex items-center gap-4 mt-0.5 text-[#434655] dark:text-slate-400 text-[12px]">
                <div className="flex items-center gap-1">
                  <DoorOpen className="w-3.5 h-3.5" />
                  <span>Room 204</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>1h 30m</span>
                </div>
              </div>
            </div>
          </div>

          {/* Class 2 */}
          <div 
            onClick={() => navigate('schedule')}
            className="p-4 flex items-start gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors cursor-pointer opacity-85 hover:opacity-100"
          >
            <div className="flex flex-col items-center shrink-0 w-12 pt-0.5">
              <span className="font-bold text-[15px] text-[#0b1c30] dark:text-white">
                2:00
              </span>
              <span className="text-[11px] text-[#434655] dark:text-slate-400 font-semibold uppercase">
                PM
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-[15px] text-[#0b1c30] dark:text-white">
                  Data Structures
                </h3>
              </div>
              <div className="flex items-center gap-4 mt-0.5 text-[#434655] dark:text-slate-400 text-[12px]">
                <div className="flex items-center gap-1">
                  <DoorOpen className="w-3.5 h-3.5" />
                  <span>Room 102</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>2h 00m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Recent Activity Timeline */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[17px] font-bold text-[#0b1c30] dark:text-white">
          Recent Activity
        </h2>
        <div className="bg-white dark:bg-slate-900 border border-[#c3c6d7]/50 dark:border-slate-800 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] p-4 sm:p-5 flex flex-col gap-4">
          {activityNotifications.slice(0, 3).map((item, idx) => {
            const isLast = idx === 2;
            return (
              <div key={item.id} className={`flex gap-3.5 items-start relative ${!isLast ? 'pb-3.5' : ''}`}>
                {!isLast && (
                  <div className="absolute left-4 top-8 bottom-0 w-[1px] bg-[#c3c6d7]/40 dark:bg-slate-800 -z-0" />
                )}
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                  item.type === 'submission'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
                    : item.type === 'quiz'
                    ? 'bg-purple-50 text-purple-600 border border-purple-200 dark:bg-purple-950/60 dark:text-purple-400 dark:border-purple-800'
                    : 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-800'
                }`}>
                  {item.type === 'submission' ? (
                    <UploadCloud className="w-4 h-4" />
                  ) : item.type === 'quiz' ? (
                    <HelpCircle className="w-4 h-4" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 pt-0.5">
                  <p className="text-[14px] font-medium text-[#0b1c30] dark:text-white leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[12px] text-[#434655] dark:text-slate-400 mt-1 font-normal">
                    {item.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};
