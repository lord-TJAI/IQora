import {
  Student,
  Teacher,
  Admin,
  Subject,
  Task,
  Test,
  Submission,
  AttendanceRecord,
  AIIntervention,
  Achievement,
  NotificationItem,
} from '@/types/domain';

// ==========================================
// 1. INSTITUTION METADATA
// ==========================================
export const DEMO_INSTITUTION = {
  name: 'Nova International School',
  academicYear: '2026–27',
  board: 'CBSE',
  class: '12',
  primaryClassId: '12-A',
  totalStudents: 160,
  totalTeachers: 12,
  totalClasses: 8,
  averageAttendance: 93,
  averageMastery: 74,
};

// ==========================================
// 2. PRIMARY DEMO USERS
// ==========================================
export const demoStudent: Student = {
  id: 'student-1',
  name: 'Arjun Sharma',
  email: 'student@iqora.demo',
  role: 'student',
  classId: '12-A',
  className: 'Class 12-A (Science)',
  rollNumber: '12A-18',
  streakDays: 12,
  xp: 1425,
  level: 8,
  levelTitle: 'Problem Solver',
  overallMastery: 74, // (78 + 72 + 64 + 81) / 4 = 73.75 -> 74
  attendancePercentage: 96,
  subjectMastery: {
    mathematics: 78,
    physics: 72,
    chemistry: 64,
    english: 81,
  },
};

export const demoTeacher: Teacher = {
  id: 'teacher-1',
  name: 'Mr. Rohan Mehta',
  title: 'Mr. Mehta',
  email: 'teacher@iqora.demo',
  role: 'teacher',
  subjects: ['physics'],
  classIds: ['12-A', '12-B'],
  totalStudents: 80,
};

export const demoTeachersList: Teacher[] = [
  demoTeacher,
  {
    id: 'teacher-2',
    name: 'Ms. Ananya Sharma',
    title: 'Ms. Sharma',
    email: 'ananya.sharma@iqora.demo',
    role: 'teacher',
    subjects: ['mathematics'],
    classIds: ['12-A', '12-C'],
    totalStudents: 78,
  },
  {
    id: 'teacher-3',
    name: 'Dr. Neha Iyer',
    title: 'Dr. Iyer',
    email: 'neha.iyer@iqora.demo',
    role: 'teacher',
    subjects: ['chemistry'],
    classIds: ['12-A', '12-B'],
    totalStudents: 80,
  },
  {
    id: 'teacher-4',
    name: 'Ms. Kavita Rao',
    title: 'Ms. Rao',
    email: 'kavita.rao@iqora.demo',
    role: 'teacher',
    subjects: ['english'],
    classIds: ['12-A', '12-B', '12-C'],
    totalStudents: 118,
  },
];

export const demoAdmin: Admin = {
  id: 'admin-1',
  name: 'Dr. Aditi Kapoor',
  email: 'admin@iqora.demo',
  role: 'admin',
  institutionName: 'Nova International School',
  permissions: ['all'],
};

// ==========================================
// 3. 40 DEMO STUDENTS IN CLASS 12-A
// ==========================================
interface StudentSeed {
  name: string;
  math: number;
  phys: number;
  chem: number;
  eng: number;
  att: number;
  xp: number;
}

const rawStudentSeeds: StudentSeed[] = [
  { name: 'Arjun Sharma', math: 78, phys: 72, chem: 64, eng: 81, att: 96, xp: 1425 },
  { name: 'Aarav Mehta', math: 94, phys: 91, chem: 88, eng: 85, att: 99, xp: 1840 },
  { name: 'Priya Nair', math: 89, phys: 84, chem: 91, eng: 87, att: 98, xp: 1720 },
  { name: 'Meera Shah', math: 85, phys: 82, chem: 80, eng: 90, att: 97, xp: 1690 },
  { name: 'Kabir Malhotra', math: 76, phys: 79, chem: 74, eng: 78, att: 95, xp: 1580 },
  { name: 'Ananya Iyer', math: 82, phys: 80, chem: 85, eng: 88, att: 93, xp: 1520 },
  { name: 'Vihaan Rao', math: 70, phys: 74, chem: 69, eng: 75, att: 91, xp: 1460 },
  { name: 'Aditya Verma', math: 68, phys: 65, chem: 72, eng: 79, att: 94, xp: 1390 },
  { name: 'Ishita Menon', math: 91, phys: 88, chem: 86, eng: 92, att: 96, xp: 1350 },
  { name: 'Rahul Khanna', math: 61, phys: 58, chem: 67, eng: 73, att: 89, xp: 1280 },
  { name: 'Saanvi Patel', math: 74, phys: 71, chem: 77, eng: 80, att: 92, xp: 1240 },
  { name: 'Dev Arora', math: 65, phys: 63, chem: 60, eng: 71, att: 88, xp: 1180 },
  { name: 'Kavya Nair', math: 84, phys: 81, chem: 83, eng: 86, att: 95, xp: 1150 },
  { name: 'Yash Malhotra', math: 59, phys: 56, chem: 62, eng: 68, att: 86, xp: 1090 },
  { name: 'Riya Kapoor', math: 77, phys: 75, chem: 73, eng: 82, att: 93, xp: 1050 },
  { name: 'Rohan Deshmukh', math: 80, phys: 78, chem: 75, eng: 83, att: 94, xp: 1020 },
  { name: 'Tanvi Joshi', math: 86, phys: 83, chem: 87, eng: 89, att: 97, xp: 990 },
  { name: 'Aryan Gupta', math: 64, phys: 60, chem: 66, eng: 72, att: 90, xp: 960 },
  { name: 'Sneha Kulkarni', math: 73, phys: 70, chem: 76, eng: 84, att: 92, xp: 930 },
  { name: 'Varun Singhania', math: 69, phys: 66, chem: 71, eng: 77, att: 91, xp: 900 },
  { name: 'Diya Sen', math: 88, phys: 85, chem: 82, eng: 91, att: 96, xp: 880 },
  { name: 'Kunal Roy', math: 62, phys: 59, chem: 65, eng: 70, att: 87, xp: 850 },
  { name: 'Tara Chawla', math: 79, phys: 77, chem: 78, eng: 85, att: 93, xp: 820 },
  { name: 'Samarth Jain', math: 71, phys: 68, chem: 70, eng: 76, att: 92, xp: 800 },
  { name: 'Avani Reddy', math: 92, phys: 89, chem: 90, eng: 93, att: 98, xp: 780 },
  { name: 'Nikhil Bose', math: 66, phys: 62, chem: 68, eng: 74, att: 89, xp: 760 },
  { name: 'Pooja Hegde', math: 75, phys: 73, chem: 74, eng: 81, att: 94, xp: 740 },
  { name: 'Karthik Pillai', math: 83, phys: 80, chem: 81, eng: 84, att: 95, xp: 720 },
  { name: 'Anika Saxena', math: 87, phys: 84, chem: 85, eng: 90, att: 96, xp: 700 },
  { name: 'Harsh Vardhan', math: 60, phys: 57, chem: 63, eng: 69, att: 88, xp: 680 },
  { name: 'Shreya Nambiar', math: 78, phys: 76, chem: 79, eng: 83, att: 93, xp: 660 },
  { name: 'Manish Tiwari', math: 67, phys: 64, chem: 69, eng: 75, att: 91, xp: 640 },
  { name: 'Ritu Bhattacharya', math: 81, phys: 79, chem: 82, eng: 87, att: 95, xp: 620 },
  { name: 'Chirag Sethi', math: 63, phys: 61, chem: 64, eng: 71, att: 89, xp: 600 },
  { name: 'Zoya Khan', math: 85, phys: 82, chem: 84, eng: 89, att: 96, xp: 580 },
  { name: 'Gaurav Mishra', math: 72, phys: 69, chem: 73, eng: 78, att: 92, xp: 560 },
  { name: 'Nisha Agarwal', math: 90, phys: 87, chem: 89, eng: 92, att: 97, xp: 540 },
  { name: 'Alok Trivedi', math: 58, phys: 55, chem: 61, eng: 67, att: 85, xp: 520 },
  { name: 'Megha Kaushik', math: 76, phys: 74, chem: 77, eng: 82, att: 94, xp: 500 },
  { name: 'Dhruv Sandhu', math: 84, phys: 81, chem: 83, eng: 86, att: 95, xp: 480 },
];

export const demoStudentsList: Student[] = rawStudentSeeds.map((seed, idx) => {
  const roll = `12A-${(idx + 1).toString().padStart(2, '0')}`;
  const overall = Math.round((seed.math + seed.phys + seed.chem + seed.eng) / 4);
  const lvl = Math.max(1, Math.floor(seed.xp / 180));

  return {
    id: idx === 0 ? 'student-1' : `student-${idx + 1}`,
    name: seed.name,
    email: `${seed.name.toLowerCase().replace(/\s+/g, '.')}@iqora.demo`,
    role: 'student',
    classId: '12-A',
    className: 'Class 12-A (Science)',
    rollNumber: roll,
    streakDays: Math.max(2, Math.floor(seed.xp / 120)),
    xp: seed.xp,
    level: lvl,
    levelTitle: lvl > 7 ? 'Problem Solver' : lvl > 4 ? 'Scholar' : 'Explorer',
    overallMastery: overall,
    attendancePercentage: seed.att,
    subjectMastery: {
      mathematics: seed.math,
      physics: seed.phys,
      chemistry: seed.chem,
      english: seed.eng,
    },
  };
});

// ==========================================
// 4. DEMO SUBJECTS
// ==========================================
export const demoSubjects: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Calculus, Vectors, Probability & 3D Geometry for Class 12',
    color: '#4F7CFF',
    lightColor: '#EEF3FF',
    iconName: 'Calculator',
    overallMastery: 78,
    totalChapters: 13,
    completedLessons: 28,
    totalLessons: 42,
    currentChapterId: 'math-ch6', // Applications of Derivatives
    currentLessonId: 'math-ch6-l2',
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Electrostatics, Current, Magnetism & Modern Physics',
    color: '#7C4DFF',
    lightColor: '#F3EEFF',
    iconName: 'Atom',
    overallMastery: 72,
    totalChapters: 14,
    completedLessons: 31,
    totalLessons: 45,
    currentChapterId: 'phys-ch2', // Electrostatic Potential
    currentLessonId: 'phys-ch2-l3',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Solutions, Electrochemistry, Kinetics & Coordination Compounds',
    color: '#20C997',
    lightColor: '#E8F9F4',
    iconName: 'FlaskConical',
    overallMastery: 64,
    totalChapters: 10,
    completedLessons: 22,
    totalLessons: 38,
    currentChapterId: 'chem-ch4', // Chemical Kinetics
    currentLessonId: 'chem-ch4-l1',
  },
  {
    id: 'english',
    name: 'English',
    description: 'Reading, Advanced Writing Skills & Prescribed CBSE Literature',
    color: '#FF8A3D',
    lightColor: '#FFF3EB',
    iconName: 'BookMarked',
    overallMastery: 81,
    totalChapters: 12,
    completedLessons: 24,
    totalLessons: 30,
    currentChapterId: 'eng-lit-1',
    currentLessonId: 'eng-lit-1-l1',
  },
];

// ==========================================
// 5. DEMO TASKS & ASSIGNMENTS
// ==========================================
export const demoTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Physics Electrostatics Assignment',
    subjectId: 'physics',
    subjectName: 'Physics',
    chapterId: 'phys-ch2',
    chapterName: 'Electrostatic Potential & Capacitance',
    conceptId: 'concept-equipotential',
    conceptName: 'Equipotential Surfaces & Potential Difference',
    learningObjective: 'Master work done calculation and field line orthogonality on equipotential geometries.',
    teacherId: 'teacher-1',
    teacherName: 'Mr. Rohan Mehta',
    type: 'assignment',
    classId: '12-A',
    assignedDate: '2026-09-15',
    dueDate: '2026-09-19',
    maxMarks: 25,
    status: 'in_progress',
    progressPercentage: 60,
    description: 'Solve the five analytical problems on electric potential due to point charges and concentric shells.',
    instructions: 'Include step-by-step mathematical reasoning. Highlight where work done is zero.',
    attachments: [
      { name: 'Electrostatics_Assignment_Sheet.pdf', url: '#', size: '1.2 MB' },
    ],
  },
  {
    id: 'task-2',
    title: 'Chemistry Electrochemistry Homework',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    chapterId: 'chem-ch3',
    chapterName: 'Electrochemistry',
    conceptId: 'concept-nernst',
    conceptName: 'Nernst Equation & Cell Potential',
    learningObjective: 'Apply Nernst equation to compute electromotive force at non-standard conditions.',
    teacherId: 'teacher-3',
    teacherName: 'Dr. Neha Iyer',
    type: 'homework',
    classId: '12-A',
    assignedDate: '2026-09-17',
    dueDate: '2026-09-20',
    maxMarks: 20,
    status: 'not_started',
    progressPercentage: 0,
    description: 'Calculate EMF for galvanic cells and verify reaction spontaneity from Gibbs free energy.',
    instructions: 'Show all units clearly. State standard reduction potentials used.',
  },
  {
    id: 'task-3',
    title: 'Mathematics Calculus Practice Test',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    chapterId: 'math-ch6',
    chapterName: 'Applications of Derivatives',
    conceptId: 'concept-maxima',
    conceptName: 'Maxima and Minima Optimization',
    learningObjective: 'Formulate second-derivative tests for geometric optimization problems.',
    teacherId: 'teacher-2',
    teacherName: 'Ms. Ananya Sharma',
    type: 'test',
    classId: '12-A',
    assignedDate: '2026-09-10',
    dueDate: '2026-09-14',
    maxMarks: 30,
    score: 27,
    status: 'completed',
    progressPercentage: 100,
    description: 'Comprehensive problem set on rate of change and critical point optimization.',
    instructions: 'All problems evaluated with teacher feedback.',
    feedback: 'Excellent rigor in the box optimization proof. Watch signs in derivative factorization.',
    submittedDate: '2026-09-13',
  },
  {
    id: 'task-4',
    title: 'English Article Writing Practice',
    subjectId: 'english',
    subjectName: 'English',
    chapterId: 'eng-write-2',
    chapterName: 'Advanced Writing Skills',
    conceptId: 'concept-article-format',
    conceptName: 'Article Structure & Rhetorical Tone',
    learningObjective: 'Structure a compelling 150-200 word analytical article with title and byline.',
    teacherId: 'teacher-4',
    teacherName: 'Ms. Kavita Rao',
    type: 'assignment',
    classId: '12-A',
    assignedDate: '2026-09-16',
    dueDate: '2026-09-21',
    maxMarks: 20,
    status: 'submitted',
    progressPercentage: 100,
    description: 'Write an article on "The Role of Clean Energy in Sustainable Urban Transition".',
    instructions: 'Adhere to CBSE format: Heading, byline, 3-4 structured paragraphs with concluding recommendation.',
    submittedDate: '2026-09-18',
    submissionText: 'The transition towards decarbonized urban landscapes represents one of the defining imperatives of our generation...',
  },
];

// ==========================================
// 6. DEMO SUBMISSIONS
// ==========================================
export const demoSubmissions: Submission[] = [
  {
    id: 'sub-1',
    taskId: 'task-1',
    taskTitle: 'Physics Electrostatics Assignment',
    taskType: 'assignment',
    subjectId: 'physics',
    studentId: 'student-1',
    studentName: 'Arjun Sharma',
    submittedAt: '2026-09-19T10:30:00Z',
    status: 'pending',
    maxMarks: 25,
    answers: [
      {
        questionId: 'q-1',
        questionPrompt: 'Calculate the work done in moving a 2 μC charge along an equipotential surface of 50 V.',
        studentAnswer: 'Since the surface is equipotential, V_A = V_B = 50 V. W = q(V_B - V_A) = 2 μC * 0 = 0 Joules.',
        maxScore: 5,
        aiSuggestedScore: 5,
        aiAnalysis: 'Correctly identifies that equipotential implies zero potential difference and zero work.',
      },
      {
        questionId: 'q-2',
        questionPrompt: 'Explain why electric field lines must be perpendicular to an equipotential surface.',
        studentAnswer: 'If they were not perpendicular, there would be a tangential component of the field which would require work to move a charge, contradicting that the surface is equipotential.',
        maxScore: 5,
        aiSuggestedScore: 5,
        aiAnalysis: 'Flawless proof by contradiction.',
      },
    ],
    overallAiSummary: 'Strong conceptual clarity demonstrated on equipotential surfaces and work calculations.',
    teacherFeedback: 'Your method is correct, but make sure to explain why the potential difference becomes zero on an equipotential surface when writing the board exam derivation.',
  },
  {
    id: 'sub-2',
    taskId: 'task-1',
    taskTitle: 'Physics Electrostatics Assignment',
    taskType: 'assignment',
    subjectId: 'physics',
    studentId: 'student-3',
    studentName: 'Priya Nair',
    submittedAt: '2026-09-18T16:15:00Z',
    status: 'evaluated',
    maxMarks: 25,
    score: 24,
    answers: [
      {
        questionId: 'q-1',
        questionPrompt: 'Calculate the work done in moving a 2 μC charge along an equipotential surface of 50 V.',
        studentAnswer: 'W = q * Delta V. Delta V = 0 along equipotential surface, so W = 0 J.',
        maxScore: 5,
        scoreAwarded: 5,
        feedback: 'Precise and clear.',
      },
    ],
    teacherFeedback: 'Exemplary work. All mathematical steps verified.',
  },
  {
    id: 'sub-3',
    taskId: 'task-1',
    taskTitle: 'Physics Electrostatics Assignment',
    taskType: 'assignment',
    subjectId: 'physics',
    studentId: 'student-10',
    studentName: 'Rahul Khanna',
    submittedAt: '2026-09-19T11:45:00Z',
    status: 'pending',
    maxMarks: 25,
    answers: [
      {
        questionId: 'q-1',
        questionPrompt: 'Calculate the work done in moving a 2 μC charge along an equipotential surface of 50 V.',
        studentAnswer: 'W = q * V = 2 * 10^-6 * 50 = 100 μJ.',
        maxScore: 5,
        aiSuggestedScore: 2,
        aiAnalysis: 'Student confused potential with potential difference. Work requires delta V, not absolute V.',
      },
    ],
    overallAiSummary: 'Student shows a fundamental confusion between electric potential and potential difference.',
  },
];

// ==========================================
// 7. DEMO TEACHER QUERIES (STUDENT -> TEACHER)
// ==========================================
export interface DemoQuery {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  subjectId: string;
  subjectName: string;
  topic: string;
  question: string;
  status: 'answered' | 'seen' | 'sent';
  createdAt: string;
  reply?: string;
  repliedAt?: string;
}

export const demoQueries: DemoQuery[] = [
  {
    id: 'query-1',
    studentId: 'student-1',
    studentName: 'Arjun Sharma',
    teacherId: 'teacher-1',
    teacherName: 'Mr. Rohan Mehta',
    subjectId: 'physics',
    subjectName: 'Physics',
    topic: 'Electrostatic Potential',
    question: "I understand potential, but I'm confused about why the potential difference is zero on an equipotential surface.",
    status: 'answered',
    createdAt: '2026-09-18T14:20:00Z',
    reply: 'Think about moving a unit charge along the surface: work done is W = qΔV = 0 since the electric field is perpendicular to the displacement at every point (cos 90° = 0).',
    repliedAt: '2026-09-18T16:05:00Z',
  },
  {
    id: 'query-2',
    studentId: 'student-3',
    studentName: 'Priya Nair',
    teacherId: 'teacher-2',
    teacherName: 'Ms. Ananya Sharma',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    topic: 'Integration by Parts',
    question: 'How do we choose u and v when integrating x * ln(x)?',
    status: 'answered',
    createdAt: '2026-09-17T11:10:00Z',
    reply: 'Use the ILATE rule! Logarithmic (L) comes before Algebraic (A), so set u = ln(x) and dv = x dx.',
    repliedAt: '2026-09-17T13:30:00Z',
  },
  {
    id: 'query-3',
    studentId: 'student-10',
    studentName: 'Rahul Khanna',
    teacherId: 'teacher-3',
    teacherName: 'Dr. Neha Iyer',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    topic: 'Chemical Kinetics',
    question: 'Why can the order of a reaction be fractional, while molecularity cannot?',
    status: 'answered',
    createdAt: '2026-09-18T09:15:00Z',
    reply: 'Molecularity is the number of colliding species in an elementary reaction (must be an integer 1, 2, 3). Order is purely empirical and derived from rate laws.',
    repliedAt: '2026-09-18T10:45:00Z',
  },
  {
    id: 'query-4',
    studentId: 'student-15',
    studentName: 'Riya Kapoor',
    teacherId: 'teacher-4',
    teacherName: 'Ms. Kavita Rao',
    subjectId: 'english',
    subjectName: 'English',
    topic: 'Article Writing',
    question: 'Should the byline be right below the heading or at the end of the article for CBSE format?',
    status: 'answered',
    createdAt: '2026-09-18T18:00:00Z',
    reply: 'In CBSE Class 12, the byline is written directly beneath the heading on the right or center (e.g. By: Riya Kapoor, XII-A).',
    repliedAt: '2026-09-18T19:10:00Z',
  },
];

// ==========================================
// 8. DEMO NOTIFICATIONS
// ==========================================
export const demoNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Teacher Response',
    message: 'Mr. Rohan Mehta replied to your question on Equipotential Surfaces.',
    category: 'academic',
    createdAt: '15 minutes ago',
    read: false,
    actionUrl: '/student/profile',
  },
  {
    id: 'notif-2',
    title: 'Assignment Due Today',
    message: "Physics Assignment 'Electrostatic Potential Problems' is due tonight at 11:59 PM.",
    category: 'tasks',
    createdAt: '2 hours ago',
    read: false,
    actionUrl: '/student/work/task-1',
  },
  {
    id: 'notif-3',
    title: 'XP Milestone',
    message: 'You are 175 XP away from reaching Level 9 (Concept Master).',
    category: 'achievements',
    createdAt: '5 hours ago',
    read: true,
    actionUrl: '/student/profile',
  },
  {
    id: 'notif-4',
    title: 'Intervention Assigned',
    message: 'New Chemistry intervention available: Chemical Kinetics visual reaction simulation.',
    category: 'academic',
    createdAt: '1 day ago',
    read: true,
    actionUrl: '/student/learn/chemistry',
  },
  {
    id: 'notif-5',
    title: 'Streak Maintained',
    message: '🔥 12-day streak achieved! Consistency is compounding your mastery.',
    category: 'achievements',
    createdAt: '1 day ago',
    read: true,
    actionUrl: '/student/profile',
  },
];

// ==========================================
// 9. DEMO AI INTERVENTION (FOR TEACHER)
// ==========================================
export const demoInterventions: AIIntervention[] = [
  {
    id: 'int-1',
    title: 'Electric Potential Concept Gap',
    targetConceptId: 'concept-equipotential',
    targetConceptName: 'Electric Potential & Equipotential Surfaces',
    subjectId: 'physics',
    classId: '12-A',
    affectedStudentsCount: 17,
    affectedStudentNames: [
      'Rahul Khanna',
      'Yash Malhotra',
      'Dev Arora',
      'Aditya Verma',
      'Vihaan Rao',
      'Chirag Sethi',
      'Harsh Vardhan',
      'Alok Trivedi',
      'Manish Tiwari',
    ],
    reason: '17 students consistently confused potential with potential difference in the recent formative check.',
    status: 'pending_review',
    suggestedActivity: 'Visual recap + 3-question targeted equipotential surface prediction.',
    estimatedMinutes: 8,
    generatedContent: {
      recapNotes: 'Equipotential surfaces have uniform V. Moving a charge along them requires 0 work because E is perpendicular to the surface.',
      practiceQuestionsCount: 3,
    },
  },
];

// ==========================================
// 10. DEMO ATTENDANCE FOR CLASS 12-A
// ==========================================
export const demoAttendanceSummary = {
  classId: '12-A',
  totalStudents: 40,
  presentToday: 38,
  absentToday: 2,
  averageAttendancePercentage: 94,
  recentDates: ['2026-09-15', '2026-09-16', '2026-09-17', '2026-09-18', '2026-09-19'],
};
