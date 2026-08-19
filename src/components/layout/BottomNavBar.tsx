import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenId } from '../../types';
import { Home, BookOpen, Calendar, HelpCircle, User } from 'lucide-react';

export const BottomNavBar: React.FC = () => {
  const { currentScreen, navigate, brand } = useApp();

  // Determine active tab among the 5 main tabs
  let activeTab: ScreenId = 'home';
  if (['home'].includes(currentScreen)) activeTab = 'home';
  else if (['courses', 'course-detail', 'lesson-view', 'assignment-view', 'study-materials'].includes(currentScreen)) activeTab = 'courses';
  else if (['schedule', 'attendance'].includes(currentScreen)) activeTab = 'schedule';
  else if (['tests', 'test-taking', 'test-result'].includes(currentScreen)) activeTab = 'tests';
  else if (['profile', 'student-id', 'fee-status', 'certificates'].includes(currentScreen)) activeTab = 'profile';

  const navItems = [
    {
      id: 'home' as ScreenId,
      label: 'Home',
      icon: Home
    },
    {
      id: 'courses' as ScreenId,
      label: 'Courses',
      icon: BookOpen
    },
    {
      id: 'schedule' as ScreenId,
      label: 'Schedule',
      icon: Calendar
    },
    {
      id: 'tests' as ScreenId,
      label: 'Tests',
      icon: HelpCircle
    },
    {
      id: 'profile' as ScreenId,
      label: 'Profile',
      icon: User
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-lg border-t border-[#c3c6d7]/40 dark:border-slate-800 shadow-[0_-4px_16px_rgba(15,23,42,0.06)] pb-[env(safe-area-inset-bottom,8px)]">
      <div className="flex justify-around items-center max-w-md md:max-w-xl mx-auto px-3 py-1.5 h-16">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-bold scale-[1.02]'
                  : 'text-[#434655] dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 font-medium'
              }`}
              style={{
                color: isActive ? brand.primaryColor : undefined
              }}
            >
              <div
                className={`p-1 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 dark:bg-blue-950/50' : 'bg-transparent'
                }`}
                style={{
                  backgroundColor: isActive ? `${brand.primaryColor}18` : undefined
                }}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
