import { BrandConfig, Course, ScheduleItem, TestItem, StudyMaterial, AttendanceRecord, CourseAttendanceSummary, Receipt, CertificateItem, ActivityNotification, QuizQuestion } from '../types';

export const DEFAULT_BRAND_CONFIG: BrandConfig = {
  academyName: 'Learnova Academy',
  academyTagline: 'Excellence in Digital Learning & Tech Careers',
  academyLogoText: 'LEARNOVA',
  academyLogoUrl: '/logo.jpg',
  studentName: 'Himanshu Kasoudhan',
  studentEmail: 'himanshu.k@example.com',
  studentId: 'LNA-2026-0142',
  studentAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjx-3noZA0j8uLncNN42Q_kDxflHe-zxA0qJ9RQEXCrgUZf0vNtqdvs5-Sj_784yzN6TLPNjfCENTth3VummtCodG568nEzOJHoCjQR3nGbTXsArpakVvlBW4M8yqOMiAVA0TKIFCGvFwMvCgloDADrMm1U8vEJeMm6kD_W6LcH0A5EosPFp70ScT54k8TiD_L2cmAUx3oOgZHv77HAukcn8VG3H0MnyZ8jqmCw-Wo-A3vVZ8KUD8MNQ',
  courseEnrolled: 'Full Stack Development',
  batchName: 'Morning Batch · 2026',
  validUntil: 'March 31, 2027',
  primaryColor: '#2563eb',
  accentColor: '#712ae2',
  currencySymbol: '₹',
  supportEmail: 'support@learnova.academy',
  supportPhone: '+91 98765 43210',
  certVerificationCode: 'LNA-CERT-2026-0142',
  themePreset: 'trust-blue',
  enableLiveClassBanner: true,
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'full-stack-dev',
    title: 'Full Stack Development',
    instructor: 'Alex Mercer',
    academy: 'Learnova Academy',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcDE9_0Stga4TU5140QZp6_j0jD5q1G7m8Bir4BpEhxKUUBcYDjQHYxgDQcKyQ603mqAnYNFCLgQPwKDp-BiIirzfcl9BCq1zRTslefSDcjm4gSjlKJpSMJxerEnZc4FDAvn8BSipo7GDVgSG0kDtQDAaML7whEP44RHDgqNCxN2-Sx3JcCVvtNnu-yCjOb8LWVGzJi315F-Xt52fO2KFP_Ac81vG4VNEFcU1jHHj2pEkNNtqmYxXMqg',
    totalLessons: 24,
    completedLessons: 12,
    modulesCount: 8,
    totalHours: '12h 40m',
    progressPercent: 50,
    status: 'in-progress',
    description: 'Master the complete web development stack. This comprehensive course covers responsive frontend design with HTML/CSS/React, robust backend API creation with Node.js, and modern deployment strategies. Perfect for aspiring developers looking to build full-scale web applications.',
    studyMaterialsCount: 12,
    assignmentsCount: 3,
    modules: [
      {
        id: 'mod-1',
        title: 'Web Development Fundamentals',
        lessonCount: 3,
        completedLessons: 3,
        status: 'completed',
        lessons: [
          { id: 'les-1', title: 'Internet & Web Architecture', duration: '15 min', status: 'completed' },
          { id: 'les-2', title: 'Client-Server Communication & HTTP', duration: '20 min', status: 'completed' },
          { id: 'les-3', title: 'Developer Tools & Setup', duration: '18 min', status: 'completed' }
        ]
      },
      {
        id: 'mod-2',
        title: 'HTML & CSS',
        lessonCount: 4,
        completedLessons: 4,
        status: 'completed',
        lessons: [
          { id: 'les-4', title: 'Semantic HTML5 Elements', duration: '16 min', status: 'completed' },
          { id: 'les-5', title: 'CSS Box Model & Typography', duration: '22 min', status: 'completed' },
          { id: 'les-6', title: 'Flexbox & CSS Grid Masterclass', duration: '30 min', status: 'completed' },
          { id: 'les-7', title: 'Modern Responsive Layouts', duration: '25 min', status: 'completed' }
        ]
      },
      {
        id: 'mod-3',
        title: 'JavaScript Essentials',
        lessonCount: 5,
        completedLessons: 3,
        status: 'active',
        lessons: [
          { id: 'les-8', title: 'Variables & Data Types', duration: '14 min', status: 'completed' },
          { id: 'les-9', title: 'Functions & Scope', duration: '20 min', status: 'completed' },
          { 
            id: 'les-10', 
            title: 'DOM Manipulation', 
            duration: '18 min', 
            status: 'playing',
            description: "Learn how to interact with the Document Object Model (DOM) using JavaScript. We'll cover selecting elements, modifying their content and attributes, and creating new elements dynamically to build interactive web experiences."
          },
          { id: 'les-11', title: 'Events & Event Listeners', duration: '24 min', status: 'upcoming' },
          { id: 'les-12', title: 'Async JS & Fetch API', duration: '26 min', status: 'upcoming' }
        ]
      },
      {
        id: 'mod-4',
        title: 'React Development',
        lessonCount: 5,
        completedLessons: 0,
        status: 'locked',
        lessons: [
          { id: 'les-13', title: 'React Components & JSX', duration: '22 min', status: 'locked' },
          { id: 'les-14', title: 'Props, State & Hooks', duration: '28 min', status: 'locked' },
          { id: 'les-15', title: 'useEffect & Side Effects', duration: '25 min', status: 'locked' },
          { id: 'les-16', title: 'Building Reusable UI Components', duration: '30 min', status: 'locked' },
          { id: 'les-17', title: 'State Management with Context', duration: '32 min', status: 'locked' }
        ]
      },
      {
        id: 'mod-5',
        title: 'Backend & APIs',
        lessonCount: 7,
        completedLessons: 0,
        status: 'locked',
        lessons: [
          { id: 'les-18', title: 'Node.js Runtime & NPM', duration: '20 min', status: 'locked' },
          { id: 'les-19', title: 'Express.js Server Architecture', duration: '35 min', status: 'locked' },
          { id: 'les-20', title: 'RESTful API Design Principles', duration: '28 min', status: 'locked' },
          { id: 'les-21', title: 'Database Connectivity & Queries', duration: '40 min', status: 'locked' },
          { id: 'les-22', title: 'Authentication & JWT Tokens', duration: '36 min', status: 'locked' },
          { id: 'les-23', title: 'Middleware & Error Handling', duration: '25 min', status: 'locked' },
          { id: 'les-24', title: 'Full Stack Integration Project', duration: '50 min', status: 'locked' }
        ]
      }
    ]
  },
  {
    id: 'python-programming',
    title: 'Python Programming',
    instructor: 'Dr. Priya Sharma',
    academy: 'Learnova Academy',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNHKKzuOCnYXX76WezxPzyb--f_r-n33p8nJZkrqdFA5kJjsBaTQlzr9snmJNszXDKS2Ndzpa1WqX1yp9YsV5voMiAaTmlbGCW2IsEjpgoODiSXsgB7p3LR7IE0x2LG7VQRekMKxysav5a36Q99teaCR38zkWQZVbpqW0Mq8aQ0uA3TkFNHjeVWPRX2hqZCsTHtbjsE2vQpromPAT8_QARuIMNBAz0OP7HGreJv6QJowrVQUsbdnEbwQ',
    totalLessons: 30,
    completedLessons: 18,
    modulesCount: 6,
    totalHours: '16h 20m',
    progressPercent: 60,
    status: 'in-progress',
    description: 'A deep dive into Python programming from foundational syntax to object-oriented programming, data processing libraries, and algorithmic challenges.',
    studyMaterialsCount: 8,
    assignmentsCount: 4,
    modules: []
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    instructor: 'Prof. Ramesh Gupta',
    academy: 'Learnova Academy',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ_yFCw8X0BGUCm9hRWD_UndlwuhK7KfNWMSTaZdx05yJ9Cz8bEtweueSN5EplwUSu4-TJefApMM2AaSYVpFVVGzn_oBOscepIUP3on6if6ZoNPRT5pErgxU_Yh5QtmpeB3gYL6y54IT9-EpbGXPUCBoJuO-9mS0CXfXE9JRAlc7wvIMqNin8VljrdUoiuubc1EeyXlwNW4zm1K-uKNne3Gep9tRI1UC5mG4WhySSMxoYnYbyajleQkg',
    totalLessons: 20,
    completedLessons: 10,
    modulesCount: 5,
    totalHours: '10h 15m',
    progressPercent: 50,
    status: 'in-progress',
    description: 'Master core computer science data structures: Arrays, Linked Lists, Stacks, Queues, Binary Search Trees, Graphs, and Hash Maps with hands-on problem solving.',
    studyMaterialsCount: 6,
    assignmentsCount: 2,
    modules: []
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    instructor: 'Elena Rostova',
    academy: 'Learnova Academy',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD89b9LnBg5x2PMaj0wCN41GsY9JlI-eUSgamQFCxADFlz6d94NRrbcAYHMuFLbL7EZhCc1fc2P_apfFGY4g5NRcShntZM36JQg-L1MriNo98QUGwobU6LTQAVcEDXip2b_a7_WU5xJvUolt19e2MlA0Tfuq25QRJ2lGrdjuxcKyW11YrMZu4A5UAC46CkT3fCsSOyPUcyRryeW2aks7YTbHKfmE72Aqtd59e3DBeAqaEU8x-Vc4saG5A',
    totalLessons: 24,
    completedLessons: 24,
    modulesCount: 6,
    totalHours: '14h 00m',
    progressPercent: 100,
    status: 'completed',
    description: 'Comprehensive UI/UX design workflow covering user research, information architecture, wireframing, high-fidelity Figma prototyping, and design systems.',
    studyMaterialsCount: 15,
    assignmentsCount: 5,
    modules: []
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sch-1',
    day: 'Wed',
    dateNumber: 19,
    timeRange: '10:00 AM - 11:30 AM',
    startTime: '10:00 AM',
    title: 'Python Programming',
    roomOrPlatform: 'Room 204',
    status: 'completed',
    duration: '1h 30m',
    courseId: 'python-programming'
  },
  {
    id: 'sch-2',
    day: 'Wed',
    dateNumber: 19,
    timeRange: '2:00 PM - 3:30 PM',
    startTime: '2:00 PM',
    title: 'Data Structures',
    roomOrPlatform: 'Room 102',
    status: 'upcoming',
    duration: '2h 00m',
    courseId: 'data-structures'
  },
  {
    id: 'sch-3',
    day: 'Wed',
    dateNumber: 19,
    timeRange: '6:00 PM - 7:30 PM',
    startTime: '6:00 PM',
    title: 'Full Stack Development',
    roomOrPlatform: 'Online Session (Interactive Live Stream)',
    status: 'live',
    duration: '1h 30m',
    courseId: 'full-stack-dev'
  },
  {
    id: 'sch-4',
    day: 'Mon',
    dateNumber: 17,
    timeRange: '10:00 AM - 11:30 AM',
    startTime: '10:00 AM',
    title: 'Python Programming',
    roomOrPlatform: 'Room 204',
    status: 'completed',
    duration: '1h 30m',
    courseId: 'python-programming'
  },
  {
    id: 'sch-5',
    day: 'Tue',
    dateNumber: 18,
    timeRange: '11:30 AM - 1:00 PM',
    startTime: '11:30 AM',
    title: 'UI/UX Design',
    roomOrPlatform: 'Lab 3',
    status: 'completed',
    duration: '1h 30m',
    courseId: 'ui-ux-design'
  },
  {
    id: 'sch-6',
    day: 'Thu',
    dateNumber: 20,
    timeRange: '6:00 PM - 7:30 PM',
    startTime: '6:00 PM',
    title: 'Full Stack Development',
    roomOrPlatform: 'Online Session',
    status: 'upcoming',
    duration: '1h 30m',
    courseId: 'full-stack-dev'
  },
  {
    id: 'sch-7',
    day: 'Fri',
    dateNumber: 21,
    timeRange: '4:00 PM - 5:30 PM',
    startTime: '4:00 PM',
    title: 'Digital Marketing & SEO Workshop',
    roomOrPlatform: 'Auditorium A',
    status: 'upcoming',
    duration: '1h 30m',
    courseId: 'full-stack-dev'
  }
];

export const INITIAL_STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-1',
    title: 'React Components — Study Notes',
    courseName: 'Full Stack Development',
    moduleName: 'React Development',
    type: 'notes',
    fileSizeOrDuration: 'PDF · 2.4 MB',
    isNew: true
  },
  {
    id: 'mat-2',
    title: 'DOM Manipulation — Study Notes',
    courseName: 'Full Stack Development',
    moduleName: 'JavaScript Essentials',
    type: 'pdf',
    fileSizeOrDuration: 'PDF · 2.4 MB'
  },
  {
    id: 'mat-3',
    title: 'HTML & CSS Quick Reference',
    courseName: 'Full Stack Development',
    moduleName: 'HTML & CSS',
    type: 'pdf',
    fileSizeOrDuration: 'PDF · 1.8 MB'
  },
  {
    id: 'mat-4',
    title: 'React Components Guide',
    courseName: 'Full Stack Development',
    moduleName: 'React Development',
    type: 'pdf',
    fileSizeOrDuration: 'PDF · 3.1 MB'
  },
  {
    id: 'mat-5',
    title: 'JavaScript Functions Practice',
    courseName: 'Full Stack Development',
    moduleName: 'JavaScript Essentials',
    type: 'video',
    fileSizeOrDuration: 'Video · 18 min'
  },
  {
    id: 'mat-6',
    title: 'Python Object-Oriented Blueprint',
    courseName: 'Python Programming',
    moduleName: 'OOP Concepts',
    type: 'pdf',
    fileSizeOrDuration: 'PDF · 4.2 MB'
  },
  {
    id: 'mat-7',
    title: 'Data Structures Tree Traversal Cheat Sheet',
    courseName: 'Data Structures',
    moduleName: 'Binary Trees',
    type: 'notes',
    fileSizeOrDuration: 'PDF · 1.5 MB'
  }
];

export const INITIAL_TESTS: TestItem[] = [
  {
    id: 'test-1',
    title: 'Python Programming Quiz',
    courseName: 'Python Programming',
    type: 'quiz',
    questionCount: 15,
    durationMinutes: 15,
    status: 'available'
  },
  {
    id: 'test-2',
    title: 'JavaScript Fundamentals Quiz',
    courseName: 'Full Stack Development',
    type: 'quiz',
    questionCount: 20,
    durationMinutes: 20,
    scheduledTime: 'Today · 7:00 PM',
    status: 'upcoming'
  },
  {
    id: 'test-3',
    title: 'Data Structures Mock Test',
    courseName: 'Data Structures',
    type: 'mock-exam',
    questionCount: 50,
    durationMinutes: 60,
    scheduledTime: 'Aug 22 · 10:00 AM',
    status: 'upcoming'
  },
  {
    id: 'test-4',
    title: 'HTML & CSS Quiz',
    courseName: 'Full Stack Development',
    type: 'quiz',
    questionCount: 20,
    durationMinutes: 20,
    status: 'completed',
    score: 18,
    maxScore: 20,
    scorePercentage: 90,
    completedDate: 'Oct 24, 2023'
  },
  {
    id: 'test-5',
    title: 'Python Basics Test',
    courseName: 'Python Programming',
    type: 'quiz',
    questionCount: 50,
    durationMinutes: 45,
    status: 'completed',
    score: 42,
    maxScore: 50,
    scorePercentage: 84,
    completedDate: 'Aug 15'
  },
  {
    id: 'test-6',
    title: 'JavaScript Quiz',
    courseName: 'Full Stack Development',
    type: 'quiz',
    questionCount: 100,
    durationMinutes: 90,
    status: 'completed',
    score: 76,
    maxScore: 100,
    scorePercentage: 76,
    completedDate: 'Aug 12'
  }
];

export const QUIZ_QUESTIONS_SAMPLE: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which method in JavaScript is used to select an element by its ID attribute?',
    options: [
      'document.querySelectorID()',
      'document.getElementById()',
      'document.findId()',
      'document.getElementByTagName()'
    ],
    correctIndex: 1,
    explanation: '`document.getElementById()` returns an Element object representing the element whose id property matches the specified string.'
  },
  {
    id: 'q2',
    question: 'What is the correct way to attach a click event listener to a button element?',
    options: [
      'button.attach("click", handleClick)',
      'button.on("click", handleClick)',
      'button.addEventListener("click", handleClick)',
      'button.listenClick(handleClick)'
    ],
    correctIndex: 2,
    explanation: '`addEventListener("click", callback)` is the standard W3C method to register event listeners on DOM elements.'
  },
  {
    id: 'q3',
    question: 'Which property is used to change the text content inside an HTML element in JavaScript?',
    options: [
      'element.innerText / element.textContent',
      'element.changeText()',
      'element.textValue',
      'element.setValue()'
    ],
    correctIndex: 0,
    explanation: '`textContent` gets or sets the text content of the node and its descendants without parsing HTML.'
  },
  {
    id: 'q4',
    question: 'How do you create a new <div> element dynamically using JavaScript?',
    options: [
      'document.newElement("div")',
      'document.createElement("div")',
      'document.build("div")',
      'window.createNode("div")'
    ],
    correctIndex: 1,
    explanation: '`document.createElement("tagName")` creates the HTML element specified by tagName.'
  },
  {
    id: 'q5',
    question: 'Which method adds a child element to the end of a parent element in the DOM tree?',
    options: [
      'parent.appendElement(child)',
      'parent.push(child)',
      'parent.appendChild(child)',
      'parent.insertEnd(child)'
    ],
    correctIndex: 2,
    explanation: '`parent.appendChild(child)` appends a node as the last child of a parent node.'
  }
];

export const INITIAL_ATTENDANCE_SUMMARY: CourseAttendanceSummary[] = [
  { courseName: 'Python Programming', attended: 9, total: 10, percentage: 90 },
  { courseName: 'Data Structures', attended: 7, total: 8, percentage: 88 },
  { courseName: 'Full Stack Development', attended: 5, total: 6, percentage: 83 }
];

export const INITIAL_ATTENDANCE_LOGS: AttendanceRecord[] = [
  { id: 'att-1', courseName: 'Data Structures', dateTime: 'Wed, Aug 19 | 2:00 PM', status: 'present' },
  { id: 'att-2', courseName: 'Python Programming', dateTime: 'Tue, Aug 18 | 10:00 AM', status: 'present' },
  { id: 'att-3', courseName: 'Full Stack Dev', dateTime: 'Mon, Aug 17 | 6:00 PM', status: 'absent' },
  { id: 'att-4', courseName: 'Data Structures', dateTime: 'Fri, Aug 14 | 2:00 PM', status: 'present' },
  { id: 'att-5', courseName: 'Python Programming', dateTime: 'Wed, Aug 12 | 10:00 AM', status: 'present' }
];

export const INITIAL_RECEIPTS: Receipt[] = [
  { id: 'rec-1', receiptNumber: '#LN-2401', date: 'Aug 05, 2026', amount: 15000, status: 'Success', paymentMethod: 'UPI / NetBanking' },
  { id: 'rec-2', receiptNumber: '#LN-2387', date: 'Jul 05, 2026', amount: 15000, status: 'Success', paymentMethod: 'Credit Card' }
];

export const INITIAL_CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-1',
    courseName: 'Full Stack Development',
    studentName: 'Himanshu Kasoudhan',
    academyName: 'Learnova Academy',
    issueDate: 'August 15, 2026',
    verificationId: 'LNA-CERT-2026-0142',
    isLatest: true
  },
  {
    id: 'cert-2',
    courseName: 'Python Programming',
    studentName: 'Himanshu Kasoudhan',
    academyName: 'Learnova Academy',
    issueDate: 'July 28, 2026',
    verificationId: 'LNA-CERT-2026-0089',
    isLatest: false
  }
];

export const INITIAL_NOTIFICATIONS: ActivityNotification[] = [
  { id: 'notif-1', title: 'Assignment submitted', time: 'Today, 11:42 AM', type: 'submission' },
  { id: 'notif-2', title: 'Python Quiz completed', time: 'Yesterday, 4:20 PM', type: 'quiz' },
  { id: 'notif-3', title: 'New study material added', time: 'Yesterday, 10:15 AM', type: 'material' },
  { id: 'notif-4', title: 'Live Class reminder: Full Stack Dev at 6:00 PM', time: '2 hours ago', type: 'class' }
];

export const PRESET_THEMES = [
  { id: 'trust-blue', name: 'Trust Blue (Default)', primary: '#2563eb', accent: '#712ae2', bg: '#f8f9ff', darkBg: '#0b1c30' },
  { id: 'purple-royale', name: 'Purple Royale (Elite)', primary: '#7c3aed', accent: '#2563eb', bg: '#faf5ff', darkBg: '#1e1035' },
  { id: 'emerald-tech', name: 'Emerald Tech (Growth)', primary: '#059669', accent: '#0284c7', bg: '#f0fdf4', darkBg: '#062d1f' },
  { id: 'crimson-amber', name: 'Crimson Amber (Prestige)', primary: '#e11d48', accent: '#d97706', bg: '#fff1f2', darkBg: '#2a0a14' },
  { id: 'slate-dark', name: 'Slate Modern (Corporate)', primary: '#0284c7', accent: '#6366f1', bg: '#f8fafc', darkBg: '#0f172a' }
];
