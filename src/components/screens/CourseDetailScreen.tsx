import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  BookOpen, 
  Layers, 
  Clock, 
  CheckCircle2, 
  PlayCircle, 
  Circle, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  CheckSquare, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const CourseDetailScreen: React.FC = () => {
  const { 
    courses, 
    selectedCourseId, 
    navigate, 
    goBack, 
    setSelectedLessonId, 
    brand,
    setShowDoubtModal 
  } = useApp();

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const [expandedModule, setExpandedModule] = useState<string>('mod-3'); // JavaScript Essentials open by default

  const toggleModule = (modId: string) => {
    setExpandedModule(expandedModule === modId ? '' : modId);
  };

  const handleOpenLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    navigate('lesson-view');
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-[#f8fafc] dark:bg-[#0b1c30]">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-[#f8fafc]/90 dark:bg-[#0b1c30]/90 backdrop-blur-md px-4 py-3 flex items-center border-b border-[#e2e8f0] dark:border-slate-800">
        <button
          onClick={goBack}
          aria-label="Go back"
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0b1c30] dark:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="ml-3 text-[18px] font-bold text-[#0b1c30] dark:text-white truncate flex-1">
          Course Details
        </h1>
      </header>

      <main className="px-4 py-4 flex flex-col gap-5 max-w-md md:max-w-xl mx-auto w-full">
        {/* Course Hero Card */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 overflow-hidden flex flex-col">
          <div className="h-44 w-full relative">
            <img
              src={course.heroImage}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-5 flex flex-col gap-3.5">
            <div>
              <h2 className="text-[20px] font-bold text-[#0b1c30] dark:text-white">
                {course.title}
              </h2>
              <p className="text-[13px] text-[#434655] dark:text-slate-400 mt-1 font-medium leading-relaxed">
                {course.description.split('.')[0]}.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-[12px] text-[#434655] dark:text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{course.totalLessons} Lessons</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{course.modulesCount || 8} Modules</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{course.totalHours}</span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#e2e8f0] dark:bg-slate-800 my-1" />

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-end text-[12px]">
                <span className="text-[#0b1c30] dark:text-white font-bold">
                  {course.progressPercent}% Complete
                </span>
                <span className="text-[#434655] dark:text-slate-400 font-medium">
                  {course.completedLessons} of {course.totalLessons} lessons completed
                </span>
              </div>
              <div className="w-full h-2 bg-[#eff4ff] dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${course.progressPercent}%`,
                    backgroundColor: brand.primaryColor
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Primary CTA */}
        <section className="flex flex-col gap-1.5 items-center">
          <button
            onClick={() => {
              setSelectedLessonId('les-10');
              navigate('lesson-view');
            }}
            className="w-full text-white font-semibold text-[14px] py-3.5 px-6 rounded-xl transition-all hover:opacity-95 shadow-[0px_4px_16px_rgba(37,99,235,0.25)] flex justify-center items-center h-[48px] cursor-pointer"
            style={{ backgroundColor: brand.primaryColor }}
          >
            Continue Learning
          </button>
          <p className="text-[12px] text-[#434655] dark:text-slate-400 font-medium">
            Next: React Components & Hooks
          </p>
        </section>

        {/* About This Course */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-2">
          <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
            About This Course
          </h3>
          <p className="text-[13px] text-[#434655] dark:text-slate-300 leading-relaxed font-normal">
            {course.description}
          </p>
        </section>

        {/* Course Content Modules */}
        <section className="flex flex-col gap-3">
          <h3 className="text-[17px] font-bold text-[#0b1c30] dark:text-white">
            Course Content
          </h3>

          <div className="flex flex-col gap-2.5">
            {course.modules && course.modules.length > 0 ? (
              course.modules.map((mod, idx) => {
                const isExpanded = expandedModule === mod.id;
                const isCompleted = mod.status === 'completed';
                const isLocked = mod.status === 'locked';
                const isActive = mod.status === 'active';

                if (isActive) {
                  return (
                    <div
                      key={mod.id}
                      className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_12px_24px_rgba(15,23,42,0.08)] border-2 border-blue-600 dark:border-blue-500 overflow-hidden flex flex-col"
                    >
                      {/* Active Module Header */}
                      <div
                        onClick={() => toggleModule(mod.id)}
                        className="p-4 flex items-start gap-3.5 bg-blue-50/70 dark:bg-blue-950/40 cursor-pointer"
                      >
                        <div
                          className="mt-0.5 w-6 h-6 rounded-full text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm"
                          style={{ backgroundColor: brand.primaryColor }}
                        >
                          {idx + 1}
                        </div>
                        <div className="flex-1 flex flex-col">
                          <h4 className="text-[15px] font-bold text-[#0b1c30] dark:text-white">
                            {mod.title}
                          </h4>
                          <div className="flex flex-col gap-1 mt-1">
                            <p 
                              className="text-[12px] font-semibold"
                              style={{ color: brand.primaryColor }}
                            >
                              {mod.completedLessons} of {mod.lessonCount} lessons completed
                            </p>
                            <div className="w-full h-1 bg-blue-200 dark:bg-slate-700 rounded-full overflow-hidden mt-0.5">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${(mod.completedLessons / mod.lessonCount) * 100}%`,
                                  backgroundColor: brand.primaryColor
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <button className="text-blue-600 dark:text-blue-400 p-1">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>

                      {/* Expanded Lessons List */}
                      {isExpanded && (
                        <div className="flex flex-col bg-white dark:bg-slate-900 divide-y divide-[#e2e8f0] dark:divide-slate-800">
                          {mod.lessons.map((lesson) => {
                            const isPlaying = lesson.status === 'playing';
                            const isLessonCompleted = lesson.status === 'completed';

                            return (
                              <div
                                key={lesson.id}
                                onClick={() => handleOpenLesson(lesson.id)}
                                className={`px-4 py-3.5 flex items-center gap-3 transition-colors cursor-pointer min-h-[56px] ${
                                  isPlaying ? 'bg-blue-50/40 dark:bg-blue-950/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                                }`}
                              >
                                {isLessonCompleted ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                ) : isPlaying ? (
                                  <PlayCircle 
                                    className="w-5 h-5 shrink-0 animate-pulse"
                                    style={{ color: brand.primaryColor }}
                                  />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 shrink-0" />
                                )}

                                <span
                                  className={`text-[14px] flex-1 font-medium ${
                                    isPlaying
                                      ? 'font-bold text-blue-600 dark:text-blue-400'
                                      : 'text-[#0b1c30] dark:text-white'
                                  }`}
                                >
                                  {lesson.title}
                                </span>

                                {isPlaying && (
                                  <span
                                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                                    style={{
                                      backgroundColor: `${brand.primaryColor}18`,
                                      color: brand.primaryColor
                                    }}
                                  >
                                    Playing
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                // Completed or Locked Modules
                return (
                  <div
                    key={mod.id}
                    className={`bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-4 flex items-start gap-3.5 transition-all ${
                      isLocked ? 'opacity-70' : 'hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Lock className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h4
                        className={`text-[15px] font-semibold ${
                          isLocked ? 'text-slate-500 dark:text-slate-400' : 'text-[#0b1c30] dark:text-white'
                        }`}
                      >
                        {mod.title}
                      </h4>
                      <p className="text-[12px] text-[#434655] dark:text-slate-400 mt-0.5 font-medium">
                        {mod.lessonCount} lessons • {isCompleted ? 'Completed' : 'Upcoming'}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            ) : null}
          </div>
        </section>

        {/* Learning Resources (Study Materials & Assignments) */}
        <section className="flex flex-col gap-3">
          <h3 className="text-[17px] font-bold text-[#0b1c30] dark:text-white">
            Learning Resources
          </h3>
          <div className="grid grid-cols-2 gap-3.5">
            <div
              onClick={() => navigate('study-materials')}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-4 flex flex-col gap-2 hover:border-blue-500/70 transition-all cursor-pointer group"
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: `${brand.primaryColor}14`,
                  color: brand.primaryColor
                }}
              >
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#0b1c30] dark:text-white">
                  Study Materials
                </h4>
                <p className="text-[12px] text-[#434655] dark:text-slate-400 font-medium">
                  {course.studyMaterialsCount || 12} files
                </p>
              </div>
            </div>

            <div
              onClick={() => navigate('assignment-view')}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-4 flex flex-col gap-2 hover:border-blue-500/70 transition-all cursor-pointer group"
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: `${brand.accentColor}18`,
                  color: brand.accentColor
                }}
              >
                <CheckSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#0b1c30] dark:text-white">
                  Assignments
                </h4>
                <p className="text-[12px] text-[#434655] dark:text-slate-400 font-medium">
                  {course.assignmentsCount || 3} assignments
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ask a Doubt Banner */}
        <section className="bg-[#f1f5f9] dark:bg-slate-800/70 rounded-2xl border border-[#e2e8f0] dark:border-slate-700 p-5 flex flex-col gap-3.5 text-center items-center">
          <div className="flex flex-col gap-1">
            <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
              Need help with this course?
            </h3>
            <p className="text-[13px] text-[#434655] dark:text-slate-400 font-medium">
              Ask a question about a lesson or code topic.
            </p>
          </div>
          <button
            onClick={() => setShowDoubtModal(true)}
            className="w-full max-w-[200px] border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 font-semibold text-[13px] py-2.5 px-4 rounded-xl transition-colors flex justify-center items-center h-[46px] cursor-pointer"
            style={{
              borderColor: brand.primaryColor,
              color: brand.primaryColor
            }}
          >
            Ask a Doubt
          </button>
        </section>
      </main>
    </div>
  );
};
