import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Search, 
  FileText, 
  Download, 
  Eye, 
  BookOpen, 
  Video, 
  FileCode, 
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const StudyMaterialsScreen: React.FC = () => {
  const { 
    studyMaterials, 
    courses, 
    selectedCourseId, 
    setSelectedCourseId, 
    goBack, 
    brand,
    showToast 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'notes' | 'pdf' | 'video'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(selectedCourseId);

  const filteredMaterials = studyMaterials.filter((item) => {
    const matchesCourse = selectedCourse === 'all' || item.courseId === selectedCourse;
    const matchesType = activeFilter === 'all' || item.type === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesType && matchesSearch;
  });

  const recentlyAdded = studyMaterials[0];

  const handleDownload = (title: string) => {
    showToast(`Downloading: ${title}`);
  };

  const handleView = (title: string) => {
    showToast(`Opening viewer for: ${title}`);
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-[#f8fafc] dark:bg-[#0b1c30]">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-[#f8fafc]/90 dark:bg-[#0b1c30]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#e2e8f0] dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={goBack}
            aria-label="Go back"
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0b1c30] dark:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[18px] font-bold text-[#0b1c30] dark:text-white">
            Study Materials
          </h1>
        </div>

        {/* Course Filter Dropdown */}
        <div className="relative">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="text-xs font-semibold pl-3 pr-7 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </header>

      <main className="px-4 py-4 flex flex-col gap-4 max-w-md md:max-w-xl mx-auto w-full">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search notes, slides, cheat sheets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {[
            { id: 'all', label: `All (${studyMaterials.length})` },
            { id: 'pdf', label: 'PDFs' },
            { id: 'notes', label: 'Notes' },
            { id: 'video', label: 'Recordings' }
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
                style={{
                  backgroundColor: isActive ? brand.primaryColor : undefined
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Recently Added Card */}
        {recentlyAdded && activeFilter === 'all' && !searchQuery && (
          <section className="flex flex-col gap-2">
            <h2 className="text-[15px] font-bold text-[#0b1c30] dark:text-white">
              Recently Added
            </h2>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${brand.primaryColor}14`,
                    color: brand.primaryColor
                  }}
                >
                  <FileCode className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {recentlyAdded.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {recentlyAdded.size} • Added {recentlyAdded.uploadDate}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleView(recentlyAdded.title)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: brand.primaryColor }}
              >
                View
              </button>
            </div>
          </section>
        )}

        {/* All Materials List */}
        <section className="flex flex-col gap-2.5">
          <h2 className="text-[15px] font-bold text-[#0b1c30] dark:text-white">
            All Materials ({filteredMaterials.length})
          </h2>

          <div className="flex flex-col gap-2.5">
            {filteredMaterials.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.04)] border border-[#e2e8f0] dark:border-slate-800 p-4 flex items-center justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    item.type === 'pdf'
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                      : item.type === 'video'
                      ? 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400'
                      : 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                  }`}>
                    {item.type === 'pdf' ? (
                      <FileText className="w-5 h-5" />
                    ) : item.type === 'video' ? (
                      <Video className="w-5 h-5" />
                    ) : (
                      <BookOpen className="w-5 h-5" />
                    )}
                  </div>

                  <div className="truncate">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      <span className="uppercase font-semibold tracking-wider text-[9px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                        {item.type}
                      </span>
                      <span>{item.size}</span>
                      <span>•</span>
                      <span>{item.uploadDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleView(item.title)}
                    title="View Document"
                    className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDownload(item.title)}
                    title="Download File"
                    className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
