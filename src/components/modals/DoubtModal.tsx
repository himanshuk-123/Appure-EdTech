import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, HelpCircle, Send, Paperclip } from 'lucide-react';

export const DoubtModal: React.FC = () => {
  const { showDoubtModal, setShowDoubtModal, brand, showToast } = useApp();
  const [subject, setSubject] = useState('DOM Manipulation & Event Listeners');
  const [question, setQuestion] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');

  if (!showDoubtModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setShowDoubtModal(false);
    showToast('Your doubt has been assigned to instructor Alex Mercer! Expected reply in ~15 mins.');
    setQuestion('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: brand.primaryColor }}
            >
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Ask a Doubt</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Get help from instructors or teaching assistants</p>
            </div>
          </div>
          <button
            onClick={() => setShowDoubtModal(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Course / Topic
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Describe your question or code issue
            </label>
            <textarea
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. When calling element.addEventListener('click', my event target is undefined inside the child node..."
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <button
              type="button"
              onClick={() => showToast('Screenshot attachment simulated.')}
              className="flex items-center gap-1.5 hover:text-blue-600 py-1"
            >
              <Paperclip className="w-3.5 h-3.5" />
              Attach code snippet or screenshot
            </button>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={urgency === 'urgent'}
                  onChange={(e) => setUrgency(e.target.checked ? 'urgent' : 'normal')}
                  className="rounded text-blue-600 focus:ring-0"
                />
                <span>Urgent</span>
              </label>
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={() => setShowDoubtModal(false)}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-sm"
              style={{ backgroundColor: brand.primaryColor }}
            >
              <Send className="w-3.5 h-3.5" />
              Submit Doubt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
