import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  CreditCard, 
  Award, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  ShieldCheck, 
  Edit3, 
  Mail, 
  Phone, 
  Palette,
  Moon,
  Sun,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { 
    brand, 
    navigate, 
    setShowBrandingModal, 
    darkMode, 
    setDarkMode, 
    showToast 
  } = useApp();

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleLogout = () => {
    showToast('Logged out of demo session.');
  };

  return (
    <div className="flex flex-col min-h-screen pb-28 bg-[#f8fafc] dark:bg-[#0b1c30]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#f8fafc]/90 dark:bg-[#0b1c30]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#e2e8f0] dark:border-slate-800">
        <h1 
          className="text-[20px] font-bold text-[#0b1c30] dark:text-white tracking-tight"
          style={{ color: brand.primaryColor }}
        >
          Student Profile
        </h1>
        <button
          onClick={() => setShowBrandingModal(true)}
          title="White-label Suite"
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400"
        >
          <Palette className="w-5 h-5" />
        </button>
      </header>

      <main className="px-4 py-4 flex flex-col gap-5 max-w-md md:max-w-xl mx-auto w-full">
        {/* Student ID Card Header */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex items-center gap-4 relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-700 shadow-md shrink-0 relative">
            <img
              src={brand.studentAvatar}
              alt={brand.studentName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-slate-900 dark:text-white truncate">
                {brand.studentName}
              </h2>
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              ID: {brand.studentId}
            </p>
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 truncate mt-0.5" style={{ color: brand.primaryColor }}>
              {brand.courseEnrolled}
            </p>
          </div>

          <button
            onClick={() => setShowBrandingModal(true)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors shrink-0"
            title="Edit info"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </section>

        {/* Academic Snapshot */}
        <section className="grid grid-cols-3 gap-2.5">
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-3 flex flex-col items-center text-center shadow-sm">
            <span className="text-base font-bold text-slate-900 dark:text-white">64%</span>
            <span className="text-[10px] text-slate-500 font-medium">Syllabus Done</span>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-3 flex flex-col items-center text-center shadow-sm">
            <span className="text-base font-bold text-slate-900 dark:text-white">87%</span>
            <span className="text-[10px] text-slate-500 font-medium">Attendance</span>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-3 flex flex-col items-center text-center shadow-sm">
            <span className="text-base font-bold text-slate-900 dark:text-white">82%</span>
            <span className="text-[10px] text-slate-500 font-medium">Test Average</span>
          </div>
        </section>

        {/* Student Services (Nav to dedicated screens) */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
          <div className="px-5 py-3.5 bg-slate-50/70 dark:bg-slate-800/40">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Student Services
            </h3>
          </div>

          {/* Student Digital ID */}
          <div
            onClick={() => navigate('student-id')}
            className="p-4 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${brand.primaryColor}14`,
                  color: brand.primaryColor
                }}
              >
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Digital Student ID Card
                </h4>
                <p className="text-xs text-slate-500">Official verified academy credential</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Fee Status & Receipts */}
          <div
            onClick={() => navigate('fee-status')}
            className="p-4 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Fee Status & Receipts
                </h4>
                <p className="text-xs text-slate-500">
                  {brand.currencySymbol}30,000 paid • 1 pending installment
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Certificates */}
          <div
            onClick={() => navigate('certificates')}
            className="p-4 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${brand.accentColor}18`,
                  color: brand.accentColor
                }}
              >
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Certificates & Credentials
                </h4>
                <p className="text-xs text-slate-500">2 verified course completions</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </section>

        {/* Reseller & App Settings */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
          <div className="px-5 py-3.5 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              App & Branding Preferences
            </h3>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">
              White-label
            </span>
          </div>

          {/* White-label suite button */}
          <div
            onClick={() => setShowBrandingModal(true)}
            className="p-4 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Brand Customizer & Theme Editor
                </h4>
                <p className="text-xs text-slate-500">Customize logos, colors, institute info</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Dark Mode switch */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 flex items-center justify-center">
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Dark Mode Theme
                </h4>
                <p className="text-xs text-slate-500">Adjust screen contrast</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                darkMode ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  darkMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Help & Support */}
          <div
            onClick={() => showToast(`Support email: ${brand.supportEmail}`)}
            className="p-4 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Help & Academy Support
                </h4>
                <p className="text-xs text-slate-500">{brand.supportEmail}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </section>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-3.5 px-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center justify-center gap-2 hover:bg-rose-100/60 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </main>
    </div>
  );
};
