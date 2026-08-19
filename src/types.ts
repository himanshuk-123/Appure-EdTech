export type ScreenId = 
  | 'home'
  | 'courses'
  | 'course-detail'
  | 'lesson-view'
  | 'assignment-view'
  | 'study-materials'
  | 'schedule'
  | 'attendance'
  | 'tests'
  | 'test-taking'
  | 'test-result'
  | 'profile'
  | 'student-id'
  | 'fee-status'
  | 'certificates'
  | 'live-class';

export interface BrandConfig {
  academyName: string;
  academyTagline: string;
  academyLogoText: string;
  studentName: string;
  studentEmail: string;
  studentId: string;
  studentAvatar: string;
  courseEnrolled: string;
  batchName: string;
  validUntil: string;
  primaryColor: string; // e.g., '#2563eb'
  accentColor: string; // e.g., '#712ae2'
  currencySymbol: string; // '₹', '$', '€', '£'
  supportEmail: string;
  supportPhone: string;
  certVerificationCode: string;
  themePreset: 'trust-blue' | 'purple-royale' | 'emerald-tech' | 'crimson-amber' | 'slate-dark';
  enableLiveClassBanner: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: 'completed' | 'playing' | 'upcoming' | 'locked';
  videoUrl?: string;
  description?: string;
  resourcesCount?: number;
}

export interface Module {
  id: string;
  title: string;
  lessonCount: number;
  completedLessons: number;
  status: 'completed' | 'active' | 'locked';
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  academy: string;
  heroImage: string;
  totalLessons: number;
  completedLessons: number;
  modulesCount: number;
  totalHours: string;
  progressPercent: number;
  status: 'in-progress' | 'completed' | 'upcoming';
  description: string;
  modules: Module[];
  studyMaterialsCount: number;
  assignmentsCount: number;
}

export interface ScheduleItem {
  id: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  dateNumber: number;
  timeRange: string;
  startTime: string;
  title: string;
  roomOrPlatform: string;
  status: 'completed' | 'upcoming' | 'live';
  duration: string;
  courseId: string;
}

export interface TestItem {
  id: string;
  title: string;
  courseName: string;
  type: 'quiz' | 'mock-exam';
  questionCount: number;
  durationMinutes: number;
  scheduledTime?: string;
  status: 'available' | 'upcoming' | 'completed';
  score?: number;
  maxScore?: number;
  scorePercentage?: number;
  completedDate?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  courseName: string;
  moduleName: string;
  type: 'pdf' | 'notes' | 'video';
  fileSizeOrDuration: string;
  isNew?: boolean;
  downloadUrl?: string;
}

export interface AttendanceRecord {
  id: string;
  courseName: string;
  dateTime: string;
  status: 'present' | 'absent';
}

export interface CourseAttendanceSummary {
  courseName: string;
  attended: number;
  total: number;
  percentage: number;
}

export interface Receipt {
  id: string;
  receiptNumber: string;
  date: string;
  amount: number;
  status: 'Success' | 'Pending';
  paymentMethod: string;
}

export interface CertificateItem {
  id: string;
  courseName: string;
  studentName: string;
  academyName: string;
  issueDate: string;
  verificationId: string;
  isLatest?: boolean;
}

export interface ActivityNotification {
  id: string;
  title: string;
  time: string;
  type: 'submission' | 'quiz' | 'material' | 'class';
}
