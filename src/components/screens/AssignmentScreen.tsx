import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  UploadCloud, 
  FileCode, 
  CheckCircle2, 
  Calendar, 
  Award, 
  AlertCircle, 
  FileText,
  X,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AssignmentScreen: React.FC = () => {
  const { 
    brand, 
    goBack, 
    submitAssignment, 
    hasSubmittedAssignment, 
    assignmentSubmissionDate,
    showToast 
  } = useApp();

  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>(
    hasSubmittedAssignment ? { name: 'todo_app_submission.zip', size: '2.4 MB' } : null
  );
  const [comment, setComment] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      });
      showToast(`Attached file: ${file.name}`);
    }
  };

  const handleSimulatedDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setSelectedFile({
      name: 'todo_app_project_v1.zip',
      size: '3.1 MB'
    });
    showToast('File dropped: todo_app_project_v1.zip');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      showToast('Please attach a zip file or project archive first.');
      return;
    }
    submitAssignment('Build an Interactive To-Do List', selectedFile.name);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-[#f8fafc] dark:bg-[#0b1c30]">
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
            Assignment: Build a To-Do List
          </h1>
          <p className="text-[12px] text-[#434655] dark:text-slate-400 truncate">
            JavaScript Essentials • Module 3
          </p>
        </div>
      </header>

      <main className="px-4 py-4 flex flex-col gap-5 max-w-md md:max-w-xl mx-auto w-full">
        {/* Meta Card */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                PRACTICAL TASK
              </span>
              <h2 className="text-[18px] font-bold text-[#0b1c30] dark:text-white mt-0.5">
                Interactive To-Do Application
              </h2>
            </div>
            <span 
              className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                hasSubmittedAssignment
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
              }`}
            >
              {hasSubmittedAssignment ? 'Submitted' : 'Pending'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Max Score: <strong className="text-slate-900 dark:text-white">20 Points</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>Due: <strong className="text-slate-900 dark:text-white">Aug 22, 11:59 PM</strong></span>
            </div>
          </div>
        </section>

        {/* Task Brief & Instructions */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-3">
          <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
            Requirements & Acceptance Criteria
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                1
              </span>
              <span><strong>DOM Manipulation:</strong> Build a clean form to add, toggle completed state, and delete task items without page reloading.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                2
              </span>
              <span><strong>Data Persistence:</strong> Save tasks inside browser <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-[11px]">localStorage</code> so they persist upon closing or refreshing.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                3
              </span>
              <span><strong>Filter Tabs:</strong> Implement dynamic filter tabs for <em>All</em>, <em>Active</em>, and <em>Completed</em> tasks with item counters.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                4
              </span>
              <span><strong>Code Architecture:</strong> Keep HTML, CSS, and JS modular with meaningful variable and function naming.</span>
            </li>
          </ul>
        </section>

        {/* Upload Form */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-4">
          <h3 className="text-[16px] font-bold text-[#0b1c30] dark:text-white">
            Upload Project Submission
          </h3>

          {/* Drag and Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleSimulatedDrop}
            className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-colors ${
              isDragging
                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 bg-slate-50/50 dark:bg-slate-800/30'
            }`}
          >
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2"
              style={{
                backgroundColor: `${brand.primaryColor}15`,
                color: brand.primaryColor
              }}
            >
              <UploadCloud className="w-6 h-6" />
            </div>

            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Drag & drop your zipped project folder here
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Supports .ZIP, .RAR, .TAR.GZ (Maximum size: 25MB)
            </p>

            <label className="mt-3 cursor-pointer">
              <span 
                className="px-4 py-2 rounded-xl text-white text-xs font-semibold inline-block shadow-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: brand.primaryColor }}
              >
                Browse Files
              </span>
              <input
                type="file"
                accept=".zip,.rar,.tar.gz,.html,.js"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Selected File Card */}
          {selectedFile && (
            <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileCode className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                    {selectedFile.name}
                  </p>
                  <p className="text-[10px] text-slate-500">{selectedFile.size}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-slate-400 hover:text-rose-500 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Submission Notes / Comment */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Student Remarks or Live Demo URL (Optional)
            </label>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. GitHub repo link or deployed Vercel preview"
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 px-6 rounded-xl text-white font-semibold text-[14px] flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
            style={{ backgroundColor: brand.primaryColor }}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{hasSubmittedAssignment ? 'Re-Submit Assignment' : 'Submit Assignment'}</span>
          </button>
        </section>

        {/* History / Status Section */}
        {hasSubmittedAssignment && (
          <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-3">
            <h3 className="text-[15px] font-bold text-[#0b1c30] dark:text-white flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              Submission Log
            </h3>
            <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-xl flex justify-between items-center text-xs">
              <div>
                <p className="font-semibold text-emerald-900 dark:text-emerald-200">
                  Version 1.0 Uploaded
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  {assignmentSubmissionDate || 'Today'}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 text-[10px] font-bold">
                Under Grading
              </span>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
