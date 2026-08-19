import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  BrandConfig, 
  ScreenId, 
  Course, 
  ScheduleItem, 
  TestItem, 
  StudyMaterial, 
  CourseAttendanceSummary, 
  AttendanceRecord, 
  Receipt, 
  CertificateItem, 
  ActivityNotification 
} from '../types';
import { 
  DEFAULT_BRAND_CONFIG, 
  INITIAL_COURSES, 
  INITIAL_SCHEDULE, 
  INITIAL_STUDY_MATERIALS, 
  INITIAL_TESTS, 
  INITIAL_ATTENDANCE_SUMMARY, 
  INITIAL_ATTENDANCE_LOGS, 
  INITIAL_RECEIPTS, 
  INITIAL_CERTIFICATES, 
  INITIAL_NOTIFICATIONS,
  PRESET_THEMES
} from '../data/initialData';

interface AppContextType {
  brand: BrandConfig;
  updateBrand: (newBrand: Partial<BrandConfig>) => void;
  resetBrand: () => void;
  setThemePreset: (presetId: BrandConfig['themePreset']) => void;
  currentScreen: ScreenId;
  navigate: (screen: ScreenId) => void;
  goBack: () => void;
  canGoBack: boolean;
  selectedCourseId: string;
  setSelectedCourseId: (id: string) => void;
  selectedLessonId: string;
  setSelectedLessonId: (id: string) => void;
  courses: Course[];
  schedule: ScheduleItem[];
  studyMaterials: StudyMaterial[];
  tests: TestItem[];
  attendanceSummary: CourseAttendanceSummary[];
  attendanceLogs: AttendanceRecord[];
  receipts: Receipt[];
  certificates: CertificateItem[];
  activityNotifications: ActivityNotification[];
  markLessonComplete: (courseId: string, lessonId: string) => void;
  submitAssignment: (title: string, fileName: string) => void;
  hasSubmittedAssignment: boolean;
  assignmentSubmissionDate: string | null;
  // Modals & Drawers
  showBrandingModal: boolean;
  setShowBrandingModal: (show: boolean) => void;
  showDoubtModal: boolean;
  setShowDoubtModal: (show: boolean) => void;
  activeReceipt: Receipt | null;
  setActiveReceipt: (rec: Receipt | null) => void;
  activeCertificate: CertificateItem | null;
  setActiveCertificate: (cert: CertificateItem | null) => void;
  showLiveClassModal: boolean;
  setShowLiveClassModal: (show: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  lastTestResult: {
    testTitle: string;
    score: number;
    maxScore: number;
    percentage: number;
    correct: number;
    incorrect: number;
    unanswered: number;
    timeTaken: string;
  } | null;
  setLastTestResult: (res: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Brand state from localStorage
  const [brand, setBrand] = useState<BrandConfig>(() => {
    try {
      const saved = localStorage.getItem('learnova_brand_config');
      return saved ? { ...DEFAULT_BRAND_CONFIG, ...JSON.parse(saved) } : DEFAULT_BRAND_CONFIG;
    } catch {
      return DEFAULT_BRAND_CONFIG;
    }
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('learnova_dark_mode');
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Navigation Stack
  const [screenStack, setScreenStack] = useState<ScreenId[]>(['home']);
  const currentScreen = screenStack[screenStack.length - 1] || 'home';

  const navigate = (screen: ScreenId) => {
    if (screen === currentScreen) return;
    setScreenStack((prev) => {
      // If navigating to a main tab, reset stack to that tab
      if (['home', 'courses', 'schedule', 'tests', 'profile'].includes(screen)) {
        return [screen];
      }
      return [...prev, screen];
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setScreenStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const canGoBack = screenStack.length > 1;

  // Selected State
  const [selectedCourseId, setSelectedCourseId] = useState<string>('full-stack-dev');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('les-10'); // DOM Manipulation

  // Data State
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [schedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [studyMaterials] = useState<StudyMaterial[]>(INITIAL_STUDY_MATERIALS);
  const [tests, setTests] = useState<TestItem[]>(INITIAL_TESTS);
  const [attendanceSummary] = useState<CourseAttendanceSummary[]>(INITIAL_ATTENDANCE_SUMMARY);
  const [attendanceLogs] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE_LOGS);
  const [receipts] = useState<Receipt[]>(INITIAL_RECEIPTS);
  const [certificates] = useState<CertificateItem[]>(INITIAL_CERTIFICATES);
  const [activityNotifications, setActivityNotifications] = useState<ActivityNotification[]>(INITIAL_NOTIFICATIONS);

  // Assignment submission state
  const [hasSubmittedAssignment, setHasSubmittedAssignment] = useState(false);
  const [assignmentSubmissionDate, setAssignmentSubmissionDate] = useState<string | null>(null);

  // Modals state
  const [showBrandingModal, setShowBrandingModal] = useState(false);
  const [showDoubtModal, setShowDoubtModal] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<Receipt | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<CertificateItem | null>(null);
  const [showLiveClassModal, setShowLiveClassModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Test Results
  const [lastTestResult, setLastTestResult] = useState<{
    testTitle: string;
    score: number;
    maxScore: number;
    percentage: number;
    correct: number;
    incorrect: number;
    unanswered: number;
    timeTaken: string;
  } | null>({
    testTitle: 'HTML & CSS Quiz',
    score: 18,
    maxScore: 20,
    percentage: 90,
    correct: 18,
    incorrect: 2,
    unanswered: 0,
    timeTaken: '16m 24s'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const updateBrand = (newBrand: Partial<BrandConfig>) => {
    setBrand((prev) => {
      const updated = { ...prev, ...newBrand };
      try {
        localStorage.setItem('learnova_brand_config', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving brand config', e);
      }
      return updated;
    });
    showToast('Brand settings updated successfully!');
  };

  const resetBrand = () => {
    setBrand(DEFAULT_BRAND_CONFIG);
    try {
      localStorage.removeItem('learnova_brand_config');
    } catch (e) {
      console.error(e);
    }
    showToast('Brand configuration reset to defaults.');
  };

  const setThemePreset = (presetId: BrandConfig['themePreset']) => {
    const found = PRESET_THEMES.find((t) => t.id === presetId);
    if (found) {
      updateBrand({
        themePreset: presetId,
        primaryColor: found.primary,
        accentColor: found.accent,
      });
    }
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;
        const updatedModules = course.modules.map((mod) => {
          const updatedLessons = mod.lessons.map((les) => {
            if (les.id === lessonId) {
              return { ...les, status: 'completed' as const };
            }
            return les;
          });
          const completedCount = updatedLessons.filter((l) => l.status === 'completed').length;
          return {
            ...mod,
            lessons: updatedLessons,
            completedLessons: completedCount,
            status: completedCount === mod.lessonCount ? ('completed' as const) : mod.status
          };
        });

        const totalCompleted = updatedModules.reduce((acc, m) => acc + m.completedLessons, 0);
        const progress = Math.min(100, Math.round((totalCompleted / course.totalLessons) * 100));

        return {
          ...course,
          modules: updatedModules,
          completedLessons: totalCompleted,
          progressPercent: progress
        };
      })
    );

    // Add activity log
    setActivityNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `Lesson completed: DOM Manipulation`,
        time: 'Just now',
        type: 'material'
      },
      ...prev
    ]);

    showToast('Lesson marked as completed! 🎉');
  };

  const submitAssignment = (title: string, fileName: string) => {
    setHasSubmittedAssignment(true);
    const now = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    setAssignmentSubmissionDate(now);

    setActivityNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `Assignment submitted: ${title} (${fileName})`,
        time: 'Just now',
        type: 'submission'
      },
      ...prev
    ]);

    showToast('Assignment submitted successfully! Score pending evaluation.');
  };

  // Sync custom theme CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', brand.primaryColor);
    root.style.setProperty('--brand-accent', brand.accentColor);
    try {
      localStorage.setItem('learnova_dark_mode', JSON.stringify(darkMode));
    } catch (e) {
      console.error(e);
    }
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [brand.primaryColor, brand.accentColor, darkMode]);

  return (
    <AppContext.Provider
      value={{
        brand,
        updateBrand,
        resetBrand,
        setThemePreset,
        currentScreen,
        navigate,
        goBack,
        canGoBack,
        selectedCourseId,
        setSelectedCourseId,
        selectedLessonId,
        setSelectedLessonId,
        courses,
        schedule,
        studyMaterials,
        tests,
        attendanceSummary,
        attendanceLogs,
        receipts,
        certificates,
        activityNotifications,
        markLessonComplete,
        submitAssignment,
        hasSubmittedAssignment,
        assignmentSubmissionDate,
        showBrandingModal,
        setShowBrandingModal,
        showDoubtModal,
        setShowDoubtModal,
        activeReceipt,
        setActiveReceipt,
        activeCertificate,
        setActiveCertificate,
        showLiveClassModal,
        setShowLiveClassModal,
        toastMessage,
        showToast,
        darkMode,
        setDarkMode,
        lastTestResult,
        setLastTestResult
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
