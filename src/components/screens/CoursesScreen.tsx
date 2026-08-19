import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';

export const CoursesScreen: React.FC = () => {
  const { courses, setSelectedCourseId, navigate, brand } = useApp();
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const filteredCourses = courses.filter((course) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'in-progress'
        ? course.status === 'in-progress'
        : course.status === 'completed';

    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredCourse = courses.find((c) => c.id === 'full-stack-dev') || courses[0];

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    navigate('course-detail');
  };

  return (
    <div className="flex flex-col min-h-screen pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#f8f9ff]/95 dark:bg-[#0b1c30]/95 backdrop-blur-md px-4 py-3 border-b border-[#c3c6d7]/30 dark:border-slate-800">
        <div className="flex items-center justify-between max-w-md md:max-w-xl mx-auto w-full h-14">
          <div className="flex flex-col">
            <h1 
              className="text-[20px] font-bold tracking-tight text-[#0b1c30] dark:text-white"
              style={{ color: brand.primaryColor }}
            >
              My Courses
            </h1>
            <p className="text-[13px] text-[#434655] dark:text-slate-400 font-medium">
              Keep learning and build your skills
            </p>
          </div>
          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            aria-label="Search"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0b1c30] dark:text-white hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Expandable Search Input */}
        {showSearchInput && (
          <div className="max-w-md md:max-w-xl mx-auto w-full pt-2 pb-1 animate-fade-in">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search enrolled courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </header>

      <main className="flex flex-col px-4 gap-5 pt-3 max-w-md md:max-w-xl mx-auto w-full">
        {/* Filter Pills */}
        <section className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' }
          ].map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'border border-[#c3c6d7]/60 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0b1c30] dark:text-slate-300 hover:bg-slate-50'
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

        {/* Continue Learning Featured Card */}
        {filter !== 'completed' && featuredCourse && (
          <section className="flex flex-col gap-2.5">
            <h2 className="text-[17px] font-bold text-[#0b1c30] dark:text-white">
              Continue Learning
            </h2>
            <div 
              onClick={() => handleSelectCourse(featuredCourse.id)}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] border border-[#c3c6d7]/50 dark:border-slate-800 overflow-hidden flex flex-col p-5 gap-3 relative group active:scale-[0.99] transition-transform duration-200 cursor-pointer"
            >
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfZeJNOmAis163U0wfj5QHWeN4cEMLKTpLh2tl8rWEKh9sb_kBhPP31jGUBux-KWfTKW4ALAKSeftQoyxOgLBZufuzFNEM6pyavsbt8b-aL4OJZmor7BgP_EkLVuaVjdt1cCPT_iz6_ZnOGcA8KkOoUUp0acDGuLCntdsGNhfST9Q1ZUKEwgl5UsptBMzcrsf9ZI7NRXs3831j0gFdtbEPFwCiiBJu_Z64A0lGAfAOUUpm9sPIR9faxA"
                    alt={featuredCourse.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white truncate">
                    {featuredCourse.title}
                  </h3>
                  <p className="text-[13px] text-[#434655] dark:text-slate-400 mt-0.5 font-medium">
                    {featuredCourse.completedLessons} of {featuredCourse.totalLessons} lessons completed
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 mt-1">
                <div className="flex justify-between items-center">
                  <span 
                    className="text-[12px] font-semibold"
                    style={{ color: brand.primaryColor }}
                  >
                    {featuredCourse.progressPercent}% complete
                  </span>
                </div>
                <div className="w-full h-2 bg-[#e5eeff] dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${featuredCourse.progressPercent}%`,
                      backgroundColor: brand.primaryColor
                    }}
                  />
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectCourse(featuredCourse.id);
                }}
                className="w-full h-12 mt-1 rounded-xl text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition-opacity hover:opacity-90 shadow-sm cursor-pointer"
                style={{ backgroundColor: brand.primaryColor }}
              >
                <span>Continue Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* My Courses List */}
        <section className="flex flex-col gap-3">
          <h2 className="text-[17px] font-bold text-[#0b1c30] dark:text-white">
            My Courses
          </h2>
          <div className="flex flex-col gap-3">
            {filteredCourses.map((course) => {
              const isCompleted = course.progressPercent === 100;
              return (
                <div
                  key={course.id}
                  onClick={() => handleSelectCourse(course.id)}
                  className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#c3c6d7]/50 dark:border-slate-800 p-4 flex gap-4 items-center active:scale-[0.99] hover:border-blue-500/50 transition-all cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative">
                    <img
                      src={course.heroImage}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col flex-1 min-w-0 gap-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-[15px] font-bold text-[#0b1c30] dark:text-white truncate">
                        {course.title}
                      </h3>
                      {isCompleted && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider shrink-0 border border-emerald-500/30">
                          COMPLETED
                        </span>
                      )}
                    </div>

                    <p className="text-[12px] text-[#434655] dark:text-slate-400 font-medium">
                      {course.completedLessons} of {course.totalLessons} lessons
                    </p>

                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex-1 h-1.5 bg-[#e5eeff] dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${course.progressPercent}%`,
                            backgroundColor: isCompleted ? '#059669' : brand.primaryColor
                          }}
                        />
                      </div>
                      <span
                        className="text-[12px] font-semibold shrink-0"
                        style={{ color: isCompleted ? '#059669' : brand.primaryColor }}
                      >
                        {course.progressPercent}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};
