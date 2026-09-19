export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  classId?: string; // e.g. "12-A"
  className?: string;
}

export interface Student extends User {
  role: 'student';
  classId: string;
  className: string;
  rollNumber: string;
  streakDays: number;
  xp: number;
  level: number;
  levelTitle: string;
  overallMastery: number; // 0 - 100
  attendancePercentage: number;
  subjectMastery: Record<string, number>; // subjectId -> percentage
}

export interface Teacher extends User {
  role: 'teacher';
  subjects: string[]; // ['physics', 'chemistry']
  classIds: string[]; // ['12-A', '12-B']
  totalStudents: number;
  title: string; // "Ms. Sharma"
}

export interface Admin extends User {
  role: 'admin';
  institutionName: string;
  permissions: string[];
}

export type SubjectId = 'mathematics' | 'physics' | 'chemistry' | 'english';

export interface Subject {
  id: SubjectId;
  name: string;
  description: string;
  color: string;
  lightColor: string;
  iconName: string;
  overallMastery: number;
  totalChapters: number;
  completedLessons: number;
  totalLessons: number;
  currentChapterId?: string;
  currentLessonId?: string;
}

export type ConceptState = 'mastered' | 'strong' | 'learning' | 'needs_practice' | 'locked';

export interface Concept {
  id: string;
  chapterId: string;
  subjectId: SubjectId;
  name: string;
  description: string;
  masteryPercentage: number;
  state: ConceptState;
  confidence: number; // 0 - 100
  attemptsCount: number;
  recentMistakes: string[];
  trend: 'up' | 'stable' | 'down';
  trendValue: number; // e.g. +6%
  recommendedAction?: string;
}

export interface Chapter {
  id: string;
  subjectId: SubjectId;
  title: string;
  order: number;
  masteryPercentage: number;
  description: string;
  concepts: Concept[];
  lessonsCount: number;
  completedLessonsCount: number;
}

export type LessonNodeType = 'lesson' | 'ai_practice' | 'challenge' | 'review' | 'mastery_test';
export type LessonNodeState = 'completed' | 'current' | 'locked';

export interface LessonNode {
  id: string;
  chapterId: string;
  subjectId: SubjectId;
  title: string;
  type: LessonNodeType;
  state: LessonNodeState;
  order: number;
  xpReward: number;
  estimatedMinutes: number;
}

export interface LessonContentBlock {
  id: string;
  type: 'explanation' | 'diagram' | 'formula' | 'example' | 'step_by_step' | 'interactive_check';
  title?: string;
  content: string;
  formula?: string;
  diagramUrl?: string;
  exampleProblem?: {
    question: string;
    steps: string[];
    answer: string;
  };
}

export interface Lesson {
  id: string;
  chapterId: string;
  subjectId: SubjectId;
  title: string;
  lessonNumber: number;
  totalLessons: number;
  objective: string;
  contentBlocks: LessonContentBlock[];
  interactiveQuestion: Question;
  xpReward: number;
  estimatedMinutes?: number;
  masteryImpact: {
    conceptId: string;
    conceptName: string;
    beforePercentage: number;
    afterPercentage: number;
  };
}

export type QuestionType =
  | 'mcq'
  | 'numerical'
  | 'short_answer'
  | 'true_false'
  | 'fill_blank'
  | 'calculation'
  | 'assertion_reason'
  | 'prediction'
  | 'evidence_selection';

export interface Question {
  id: string;
  subjectId: SubjectId;
  topicId: string;
  conceptId: string;
  conceptName: string;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hints: string[];
  xpReward: number;
  masteryGain: number; // e.g. 6%
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface PracticeSession {
  id: string;
  subjectId: SubjectId;
  topic: string;
  conceptName: string;
  questions: Question[];
  totalQuestions: number;
  currentQuestionIndex: number;
  score: number;
  xpEarned: number;
}

export interface NextBestAction {
  id: string;
  subjectId: SubjectId;
  subjectName: string;
  conceptId: string;
  conceptName: string;
  currentMastery: number;
  targetMastery: number;
  reason: string;
  estimatedMinutes: number;
  xpReward: number;
  steps: {
    order: number;
    title: string;
    duration: string;
    type: 'recap' | 'example' | 'practice';
  }[];
}

export type TaskType =
  | 'lesson'
  | 'homework'
  | 'assignment'
  | 'test'
  | 'revision'
  | 'teacher_task'
  | 'practice'
  | 'project';

export type TaskStatus =
  | 'not_started'
  | 'in_progress'
  | 'submitted'
  | 'evaluated'
  | 'completed'
  | 'overdue'
  | 'needs_review';

export interface Task {
  id: string;
  title: string;
  subjectId: SubjectId;
  subjectName: string;
  chapterId?: string;
  chapterName?: string;
  conceptId?: string;
  conceptName?: string;
  learningObjective?: string;
  teacherId: string;
  teacherName: string;
  type: TaskType;
  classId: string;
  assignedDate: string;
  dueDate: string;
  maxMarks: number;
  status: TaskStatus;
  progressPercentage: number;
  description: string;
  instructions: string;
  attachments?: { name: string; url: string; size: string }[];
  score?: number;
  feedback?: string;
  submittedDate?: string;
  submissionText?: string;
  isOverdue?: boolean;
}

export type ActivityType =
  | 'simulation'
  | 'graph'
  | 'drag_drop'
  | 'timeline'
  | 'molecule'
  | 'circuit'
  | 'diagram'
  | 'sorting'
  | 'annotation'
  | 'writing'
  | 'reading'
  | 'calculation'
  | 'coordination_builder'
  | 'reaction_builder';

export interface InteractiveActivity {
  id: string;
  type: ActivityType;
  subject: SubjectId;
  conceptId: string;
  conceptName: string;
  learningObjective: string;
  instructions: string;
  parameters?: Record<string, any>;
  successCondition?: string;
}

export interface LearningEvidence {
  id: string;
  studentId: string;
  subjectId: SubjectId;
  chapterId: string;
  conceptId: string;
  eventType:
    | 'activity_started'
    | 'activity_completed'
    | 'prediction_correct'
    | 'prediction_wrong'
    | 'question_correct'
    | 'question_wrong'
    | 'hint_used'
    | 'concept_explored'
    | 'lesson_completed'
    | 'assignment_submitted'
    | 'test_completed'
    | 'teacher_feedback_received';
  timestamp: string;
  details?: Record<string, any>;
}

export interface CurriculumUnit {
  id: string;
  unitNumber: number;
  title: string;
  subjectId: SubjectId;
  marksWeightage?: number;
  chapters: Chapter[];
  masteryPercentage: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
}


export interface Test {
  id: string;
  title: string;
  subjectId: SubjectId;
  subjectName: string;
  chapterId: string;
  chapterTitle: string;
  durationMinutes: number;
  totalQuestions: number;
  maxMarks: number;
  topics: string[];
  rules: string[];
  status: 'upcoming' | 'active' | 'completed' | 'draft';
  scheduledStart?: string;
  scheduledEnd?: string;
  averageScore?: number;
  participantsCount?: number;
  questions?: Question[];
}

export interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  studentId: string;
  studentName: string;
  score: number;
  maxMarks: number;
  percentage: number;
  xpEarned: number;
  submittedAt: string;
  strongConcepts: { name: string; change: number }[];
  needsPracticeConcepts: { name: string; change: number; conceptId: string }[];
  recommendedNextAction: {
    title: string;
    conceptId: string;
    subjectId: SubjectId;
  };
}

export interface Submission {
  id: string;
  taskId: string;
  taskTitle: string;
  taskType: TaskType;
  subjectId: SubjectId;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  submittedAt: string;
  status: 'pending' | 'evaluated' | 'late' | 'missing';
  maxMarks: number;
  score?: number;
  answers: {
    questionId: string;
    questionPrompt: string;
    studentAnswer: string;
    correctAnswer?: string;
    maxScore: number;
    scoreAwarded?: number;
    aiSuggestedScore?: number;
    aiAnalysis?: string;
    feedback?: string;
  }[];
  overallAiSummary?: string;
  teacherFeedback?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  classId: string;
  date: string;
  subjectId?: SubjectId;
  status: 'present' | 'absent' | 'late';
}

export interface AIIntervention {
  id: string;
  title: string;
  targetConceptId: string;
  targetConceptName: string;
  subjectId: SubjectId;
  classId: string;
  affectedStudentsCount: number;
  affectedStudentNames: string[];
  reason: string;
  status: 'pending_review' | 'approved' | 'assigned' | 'completed';
  suggestedActivity: string;
  estimatedMinutes: number;
  generatedContent: {
    recapNotes: string;
    practiceQuestionsCount: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0 - 100
  category: 'streak' | 'mastery' | 'practice' | 'special';
  xpBonus: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'academic' | 'tasks' | 'feedback' | 'ai' | 'achievements';
  createdAt: string;
  read: boolean;
  actionUrl?: string;
}

export interface StudyMaterial {
  id: string;
  name: string;
  subjectId: SubjectId;
  chapterTitle: string;
  topicTitle: string;
  fileType: 'pdf' | 'notes' | 'document' | 'image';
  fileSize: string;
  uploadedAt: string;
  visibility: 'public' | 'class_only';
  downloadUrl: string;
}
