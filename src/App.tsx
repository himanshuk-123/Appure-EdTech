import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopHeader } from './components/layout/TopHeader';
import { BottomNavBar } from './components/layout/BottomNavBar';
import { Toast } from './components/layout/Toast';

// Screens
import { HomeScreen } from './components/screens/HomeScreen';
import { CoursesScreen } from './components/screens/CoursesScreen';
import { CourseDetailScreen } from './components/screens/CourseDetailScreen';
import { LessonViewScreen } from './components/screens/LessonViewScreen';
import { AssignmentScreen } from './components/screens/AssignmentScreen';
import { StudyMaterialsScreen } from './components/screens/StudyMaterialsScreen';
import { ScheduleScreen } from './components/screens/ScheduleScreen';
import { AttendanceScreen } from './components/screens/AttendanceScreen';
import { TestsScreen } from './components/screens/TestsScreen';
import { TestTakingScreen } from './components/screens/TestTakingScreen';
import { TestResultScreen } from './components/screens/TestResultScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { StudentIdScreen } from './components/screens/StudentIdScreen';
import { FeeStatusScreen } from './components/screens/FeeStatusScreen';
import { CertificatesScreen } from './components/screens/CertificatesScreen';

// Modals
import { BrandingCustomizerModal } from './components/modals/BrandingCustomizerModal';
import { DoubtModal } from './components/modals/DoubtModal';
import { ReceiptModal } from './components/modals/ReceiptModal';
import { CertificateModal } from './components/modals/CertificateModal';
import { LiveClassModal } from './components/modals/LiveClassModal';

const AppContent: React.FC = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <>
            <TopHeader />
            <HomeScreen />
          </>
        );
      case 'courses':
        return <CoursesScreen />;
      case 'course-detail':
        return <CourseDetailScreen />;
      case 'lesson-view':
        return <LessonViewScreen />;
      case 'assignment-view':
        return <AssignmentScreen />;
      case 'study-materials':
        return <StudyMaterialsScreen />;
      case 'schedule':
        return <ScheduleScreen />;
      case 'attendance':
        return <AttendanceScreen />;
      case 'tests':
        return <TestsScreen />;
      case 'test-taking':
        return <TestTakingScreen />;
      case 'test-result':
        return <TestResultScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'student-id':
        return <StudentIdScreen />;
      case 'fee-status':
        return <FeeStatusScreen />;
      case 'certificates':
        return <CertificatesScreen />;
      default:
        return (
          <>
            <TopHeader />
            <HomeScreen />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-slate-100 transition-colors selection:bg-blue-500 selection:text-white font-sans antialiased">
      {/* Active Screen */}
      <div className="min-h-screen">
        {renderScreen()}
      </div>

      {/* Global Floating Toast */}
      <Toast />

      {/* Fixed Bottom Navigation */}
      <BottomNavBar />

      {/* Modals & Dialogs */}
      <BrandingCustomizerModal />
      <DoubtModal />
      <ReceiptModal />
      <CertificateModal />
      <LiveClassModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
