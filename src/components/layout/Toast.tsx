import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-slate-900/95 text-white dark:bg-white dark:text-slate-900 text-sm font-medium rounded-full shadow-xl flex items-center gap-2 max-w-sm text-center animate-fade-in pointer-events-none">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
      <span className="truncate">{toastMessage}</span>
    </div>
  );
};
