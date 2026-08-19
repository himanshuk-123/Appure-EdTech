import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  FileText, 
  Download, 
  CheckSquare, 
  HelpCircle, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LessonViewScreen: React.FC = () => {
  const { 
    brand, 
    goBack, 
    navigate, 
    selectedCourseId, 
    selectedLessonId, 
    setSelectedLessonId,
    markLessonComplete, 
    setShowDoubtModal, 
    showToast 
  } = useApp();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(522); // 8:42 in seconds
  const [isMuted, setIsMuted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const totalDuration = 1110; // 18:30 in seconds

  // Video playback timer simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleMarkCompleted = () => {
    setIsCompleted(true);
    markLessonComplete(selectedCourseId, selectedLessonId);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleNextLesson = () => {
    setSelectedLessonId('les-11');
    showToast('Switched to Lesson 4: Events & Event Listeners');
  };

  const handlePreviousLesson = () => {
    setSelectedLessonId('les-09');
    showToast('Switched to Lesson 2: Functions & Scope');
  };

  return (
    <div className="flex flex-col min-h-screen pb-28 bg-[#f8fafc] dark:bg-[#0b1c30]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#f8fafc]/90 dark:bg-[#0b1c30]/90 backdrop-blur-md px-4 py-3 flex items-center border-b border-[#e2e8f0] dark:border-slate-800">
        <button
          onClick={goBack}
          aria-label="Go back"
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0b1c30] dark:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="ml-3 truncate flex-1">
          <h1 className="text-[16px] font-bold text-[#0b1c30] dark:text-white truncate">
            Lesson 3: DOM Manipulation
          </h1>
          <p className="text-[12px] text-[#434655] dark:text-slate-400 truncate">
            JavaScript Essentials
          </p>
        </div>
      </header>

      <main className="px-4 py-4 flex flex-col gap-5 max-w-md md:max-w-xl mx-auto w-full">
        {/* Interactive Video Player */}
        <section className="rounded-2xl overflow-hidden shadow-[0px_4px_16px_rgba(15,23,42,0.1)] border border-[#e2e8f0] dark:border-slate-800 bg-slate-950 relative group flex flex-col">
          {/* Main Video Viewport */}
          <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfZeJNOmAis163U0wfj5QHWeN4cEMLKTpLh2tl8rWEKh9sb_kBhPP31jGUBux-KWfTKW4ALAKSeftQoyxOgLBZufuzFNEM6pyavsbt8b-aL4OJZmor7BgP_EkLVuaVjdt1cCPT_iz6_ZnOGcA8KkOoUUp0acDGuLCntdsGNhfST9Q1ZUKEwgl5UsptBMzcrsf9ZI7NRXs3831j0gFdtbEPFwCiiBJu_Z64A0lGAfAOUUpm9sPIR9faxA"
              alt="DOM Manipulation Coding Lesson"
              className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-85' : 'opacity-70'}`}
            />

            {/* Big Center Play/Pause button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="absolute w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform backdrop-blur-sm cursor-pointer"
              style={{ backgroundColor: brand.primaryColor }}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7" />
              ) : (
                <Play className="w-7 h-7 fill-white translate-x-0.5" />
              )}
            </button>

            {/* Quality Badge */}
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono font-bold text-white">
              1080p HD
            </div>
          </div>

          {/* Bottom Player Controls */}
          <div className="bg-slate-950 p-3 flex flex-col gap-2 border-t border-slate-800">
            {/* Scrubber Bar */}
            <div className="relative w-full h-2 bg-slate-800 rounded-full cursor-pointer flex items-center">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(currentTime / totalDuration) * 100}%`,
                  backgroundColor: brand.primaryColor
                }}
              />
              <div
                className="w-3.5 h-3.5 rounded-full bg-white shadow-md -ml-1.5"
                style={{
                  left: `${(currentTime / totalDuration) * 100}%`
                }}
              />
            </div>

            <div className="flex justify-between items-center text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-[11px]">
                  {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">1.0x</span>
                <button
                  onClick={() => showToast('Fullscreen mode simulated')}
                  className="hover:text-white transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Lesson Progress Status */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Lesson Progress</span>
            <span className="font-bold text-blue-600 dark:text-blue-400" style={{ color: brand.primaryColor }}>
              {Math.round((currentTime / totalDuration) * 100)}% Watched
            </span>
          </div>
          <div className="w-full h-2 bg-[#eff4ff] dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(currentTime / totalDuration) * 100}%`,
                backgroundColor: brand.primaryColor
              }}
            />
          </div>
        </section>

        {/* About This Lesson */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-2">
          <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
            About This Lesson
          </h3>
          <p className="text-[13px] text-[#434655] dark:text-slate-300 leading-relaxed">
            Learn how to select, modify, and dynamically create Document Object Model (DOM) elements using vanilla JavaScript. We will dive deep into <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-600">document.querySelector</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-600">classList.toggle</code>, event listeners, and building reactive interfaces without frameworks.
          </p>
        </section>

        {/* Course Progress Snapshot */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
              Course Progress
            </h3>
            <span className="text-[13px] font-bold text-blue-600 dark:text-blue-400" style={{ color: brand.primaryColor }}>
              50%
            </span>
          </div>
          <p className="text-[12px] text-[#434655] dark:text-slate-400">
            12 of 24 lessons completed in Full Stack Development
          </p>
          <div className="w-full h-2 bg-[#eff4ff] dark:bg-slate-800 rounded-full overflow-hidden mt-1">
            <div
              className="h-full rounded-full"
              style={{
                width: '50%',
                backgroundColor: brand.primaryColor
              }}
            />
          </div>
        </section>

        {/* Resources Attached */}
        <section className="flex flex-col gap-2.5">
          <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
            Lesson Resources
          </h3>
          <div
            onClick={() => showToast('Downloading DOM Manipulation Cheat Sheet (PDF)...')}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-4 flex items-center justify-between hover:border-blue-500/60 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${brand.primaryColor}14`,
                  color: brand.primaryColor
                }}
              >
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#0b1c30] dark:text-white">
                  DOM Manipulation Cheat Sheet
                </h4>
                <p className="text-[12px] text-[#434655] dark:text-slate-400">
                  PDF Document • 2.4 MB
                </p>
              </div>
            </div>
            <button className="p-2 text-slate-400 group-hover:text-blue-600 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Assignment Attached */}
        <section className="flex flex-col gap-2.5">
          <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
            Practical Assignment
          </h3>
          <div
            onClick={() => navigate('assignment-view')}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-4 flex items-center justify-between hover:border-blue-500/60 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${brand.accentColor}18`,
                  color: brand.accentColor
                }}
              >
                <CheckSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#0b1c30] dark:text-white">
                  Build an Interactive To-Do List
                </h4>
                <p className="text-[12px] text-amber-600 dark:text-amber-400 font-semibold">
                  Due: Aug 22, 2026 • 20 Points
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50">
              Open Task
            </span>
          </div>
        </section>

        {/* Ask a Doubt */}
        <section className="bg-[#eff4ff] dark:bg-slate-800/80 rounded-2xl border border-blue-100 dark:border-slate-700 p-5 flex flex-col gap-3 text-center items-center">
          <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
            Stuck on this lesson?
          </h3>
          <p className="text-[13px] text-[#434655] dark:text-slate-400 font-medium">
            Our teaching assistants typically respond in under 15 minutes.
          </p>
          <button
            onClick={() => setShowDoubtModal(true)}
            className="w-full max-w-[200px] border border-blue-600 text-blue-600 dark:text-blue-400 font-semibold text-[13px] py-2.5 px-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
            style={{
              borderColor: brand.primaryColor,
              color: brand.primaryColor
            }}
          >
            Ask a Question
          </button>
        </section>

        {/* Lesson Navigation Footer Controls */}
        <section className="pt-2 flex flex-col gap-3">
          <button
            onClick={handleMarkCompleted}
            disabled={isCompleted}
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 shadow-sm transition-all ${
              isCompleted
                ? 'bg-emerald-600 text-white cursor-default'
                : 'text-white hover:opacity-95'
            }`}
            style={{
              backgroundColor: isCompleted ? '#059669' : brand.primaryColor
            }}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{isCompleted ? 'Lesson Completed ✓' : 'Mark Lesson as Completed'}</span>
          </button>

          <div className="flex gap-3">
            <button
              onClick={handlePreviousLesson}
              className="flex-1 py-3 px-4 rounded-xl border border-[#e2e8f0] dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center justify-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Lesson
            </button>
            <button
              onClick={handleNextLesson}
              className="flex-1 py-3 px-4 rounded-xl border border-[#e2e8f0] dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center justify-center gap-1"
            >
              Next Lesson
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
