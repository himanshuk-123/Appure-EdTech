import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenId } from '../../types';
import { ArrowLeft, Bell, Settings2, Palette, Moon, Sun } from 'lucide-react';

interface TopHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  subtitle,
  showBack,
  onBack,
  rightAction
}) => {
  const { 
    brand, 
    currentScreen, 
    goBack, 
    canGoBack, 
    setShowBrandingModal, 
    darkMode, 
    setDarkMode, 
    showToast 
  } = useApp();

  // Root screens that show the primary branded header
  const isHomeScreen = currentScreen === 'home';

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  if (isHomeScreen) {
    return (
      <header className="sticky top-0 z-40 bg-[#f8f9ff]/95 dark:bg-[#0b1c30]/95 backdrop-blur-md border-b border-[#c3c6d7]/30 dark:border-slate-800 transition-colors">
        <div className="max-w-md md:max-w-2xl mx-auto w-full px-4 py-2.5">
          {/* Academy Brand Banner */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-blue-200 dark:border-slate-700 shadow-sm shrink-0 bg-white">
                <img
                  src={brand.academyLogoUrl || '/logo.jpg'}
                  alt={brand.academyName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[13px] font-extrabold tracking-wide uppercase text-blue-600 dark:text-blue-400 block leading-tight">
                  {brand.academyName}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block leading-none">
                  {brand.academyTagline}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Light/Dark mode quick toggle */}
              <button
                onClick={() => {
                  setDarkMode((prev) => !prev);
                  showToast(darkMode ? 'Switched to Light Mode ☀️' : 'Switched to Dark Mode 🌙');
                }}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 text-amber-500 dark:text-amber-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              </button>

              {/* White-label branding quick gear */}
              <button
                onClick={() => setShowBrandingModal(true)}
                title="Customize App & Branding (White-label Suite)"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 hover:bg-blue-50 transition-colors shadow-sm"
              >
                <Palette className="w-3.5 h-3.5" />
              </button>

              {/* Notification button */}
              <button
                onClick={() => showToast('You have 2 upcoming test reminders and 1 live class today.')}
                aria-label="Notifications"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#434655] dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors relative shadow-sm"
              >
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
              </button>
            </div>
          </div>

          {/* Student Profile Greeting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm shrink-0 relative">
                <img
                  src={brand.studentAvatar}
                  alt={brand.studentName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white dark:border-slate-900"></span>
              </div>
              <div>
                <h1 className="text-[17px] font-bold text-[#0b1c30] dark:text-white leading-tight flex items-center gap-1.5">
                  Good morning, {brand.studentName.split(' ')[0]} <span>👋</span>
                </h1>
                <p className="text-[12px] text-[#434655] dark:text-slate-400 font-medium">
                  Ready to continue learning?
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Sub-screen header
  return (
    <header className="sticky top-0 z-40 bg-[#f8f9ff]/95 dark:bg-[#0b1c30]/95 backdrop-blur-md border-b border-[#c3c6d7]/30 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between px-4 py-3 max-w-md md:max-w-2xl mx-auto w-full min-h-[56px]">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {(showBack !== false && (canGoBack || onBack)) && (
            <button
              onClick={handleBack}
              aria-label="Go back"
              className="w-9 h-9 -ml-1 flex items-center justify-center rounded-full text-[#0b1c30] dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="truncate">
            <h1 className="text-[18px] font-bold text-[#0b1c30] dark:text-white truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[12px] text-[#434655] dark:text-slate-400 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <button
            onClick={() => {
              setDarkMode((prev) => !prev);
              showToast(darkMode ? 'Switched to Light Mode ☀️' : 'Switched to Dark Mode 🌙');
            }}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-8 h-8 flex items-center justify-center rounded-full text-amber-500 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
          {rightAction ? (
            rightAction
          ) : (
            <>
              <button
                onClick={() => setShowBrandingModal(true)}
                title="White-label Branding"
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Palette className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
