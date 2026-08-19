import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle2, 
  Radio, 
  ArrowRight, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ScheduleScreen: React.FC = () => {
  const { 
    schedule, 
    brand, 
    navigate, 
    setShowLiveClassModal 
  } = useApp();

  const [selectedDay, setSelectedDay] = useState<string>('Wed 19');

  const daysOfWeek = [
    { day: 'Mon', date: '17', key: 'Mon 17' },
    { day: 'Tue', date: '18', key: 'Tue 18' },
    { day: 'Wed', date: '19', key: 'Wed 19', isToday: true },
    { day: 'Thu', date: '20', key: 'Thu 20' },
    { day: 'Fri', date: '21', key: 'Fri 21' },
    { day: 'Sat', date: '22', key: 'Sat 22' },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-28 bg-[#f8fafc] dark:bg-[#0b1c30]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#f8fafc]/90 dark:bg-[#0b1c30]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#e2e8f0] dark:border-slate-800">
        <div>
          <h1 
            className="text-[20px] font-bold text-[#0b1c30] dark:text-white tracking-tight"
            style={{ color: brand.primaryColor }}
          >
            Class Schedule
          </h1>
          <p className="text-[13px] text-[#434655] dark:text-slate-400 font-medium">
            Stay organized and never miss a lecture
          </p>
        </div>
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
          style={{
            backgroundColor: `${brand.primaryColor}14`,
            color: brand.primaryColor
          }}
        >
          <CalendarIcon className="w-5 h-5" />
        </div>
      </header>

      <main className="px-4 py-4 flex flex-col gap-5 max-w-md md:max-w-xl mx-auto w-full">
        {/* Date Selector Row */}
        <section className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {daysOfWeek.map((d) => {
            const isSelected = selectedDay === d.key;
            return (
              <button
                key={d.key}
                onClick={() => setSelectedDay(d.key)}
                className={`flex flex-col items-center justify-center py-2.5 px-3.5 rounded-2xl min-w-[58px] transition-all ${
                  isSelected
                    ? 'text-white shadow-md scale-105 font-bold'
                    : 'bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
                style={{
                  backgroundColor: isSelected ? brand.primaryColor : undefined
                }}
              >
                <span className="text-[11px] uppercase tracking-wider font-semibold opacity-90">
                  {d.day}
                </span>
                <span className="text-base font-extrabold mt-0.5">
                  {d.date}
                </span>
                {d.isToday && (
                  <span className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-blue-600'}`} />
                )}
              </button>
            );
          })}
        </section>

        {/* Selected Day's Classes */}
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-[17px] font-bold text-[#0b1c30] dark:text-white">
              {selectedDay === 'Wed 19' ? "Today's Schedule" : `Schedule for ${selectedDay}`}
            </h2>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              3 Sessions
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {schedule.map((item) => {
              const isLive = item.status === 'live';
              const isCompleted = item.status === 'completed';

              return (
                <div
                  key={item.id}
                  className={`bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] border p-4.5 flex flex-col gap-3 transition-all ${
                    isLive
                      ? 'border-rose-400 dark:border-rose-800 ring-2 ring-rose-500/10'
                      : 'border-[#e2e8f0] dark:border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {item.time}
                      </span>
                      <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white mt-0.5">
                        {item.subject}
                      </h3>
                    </div>

                    {isLive ? (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-900 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                        <Radio className="w-3 h-3" />
                        LIVE NOW
                      </span>
                    ) : isCompleted ? (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3" />
                        COMPLETED
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                        UPCOMING
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#434655] dark:text-slate-400 font-medium">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.room}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.instructor}</span>
                    </div>
                  </div>

                  {isLive && (
                    <button
                      onClick={() => setShowLiveClassModal(true)}
                      className="w-full py-2.5 px-4 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-opacity hover:opacity-90 cursor-pointer"
                      style={{ backgroundColor: brand.primaryColor }}
                    >
                      <Radio className="w-4 h-4 animate-ping" />
                      <span>Join Live Interactive Classroom</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Attendance Summary Widget Card */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
              Attendance Summary
            </h3>
            <button
              onClick={() => navigate('attendance')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
              style={{ color: brand.primaryColor }}
            >
              View Details
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold shrink-0"
              style={{
                backgroundColor: `${brand.primaryColor}14`,
                color: brand.primaryColor
              }}
            >
              <span className="text-lg leading-tight">87%</span>
              <span className="text-[9px] uppercase tracking-wider">Overall</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Good Standing Attendance
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                21 of 24 scheduled classes attended this semester.
              </p>
            </div>
          </div>
        </section>

        {/* Weekly Preview Timeline */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-3">
          <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
            Upcoming This Week
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            <div className="py-2.5 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Thursday, Oct 20</p>
                <p className="text-slate-500">Python Programming • UI/UX Design</p>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">2 Classes</span>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Friday, Oct 21</p>
                <p className="text-slate-500">Data Structures • Full Stack Lab</p>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">2 Classes</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
