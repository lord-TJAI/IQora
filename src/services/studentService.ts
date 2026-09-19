import {
  Student,
  Subject,
  Chapter,
  Lesson,
  LessonNode,
  NextBestAction,
  Task,
  Test,
  TestAttempt,
  Achievement,
  NotificationItem,
  Question,
} from '@/types/domain';
import {
  mockCurrentUser,
  mockSubjects,
  mockChapters,
  mockPhysicsJourneyNodes,
  mockCurrentLesson,
  mockNextBestAction,
  mockTasks,
  mockTests,
  mockAchievements,
  mockNotifications,
} from './mock/mockData';
import { apiClient } from './api/client';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false';

// Simple delay helper for realistic UI loading states
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export const studentService = {
  async getProfile(): Promise<Student> {
    if (USE_MOCKS) {
      await delay(200);
      return { ...mockCurrentUser };
    }
    return apiClient<Student>('/student/profile');
  },

  async getSubjects(): Promise<Subject[]> {
    if (USE_MOCKS) {
      await delay(200);
      return [...mockSubjects];
    }
    return apiClient<Subject[]>('/student/subjects');
  },

  async getSubjectJourney(subjectId: string): Promise<{ subject: Subject; nodes: LessonNode[] }> {
    if (USE_MOCKS) {
      await delay(250);
      const subject = mockSubjects.find((s) => s.id === subjectId) || mockSubjects[1];
      return {
        subject,
        nodes: [...mockPhysicsJourneyNodes],
      };
    }
    return apiClient<{ subject: Subject; nodes: LessonNode[] }>(`/student/subjects/${subjectId}/journey`);
  },

  async getChapterDetails(chapterId: string): Promise<Chapter> {
    if (USE_MOCKS) {
      await delay(200);
      return mockChapters[chapterId] || mockChapters['phys-ch2'];
    }
    return apiClient<Chapter>(`/student/chapters/${chapterId}`);
  },

  async getLesson(lessonId: string): Promise<Lesson> {
    if (USE_MOCKS) {
      await delay(300);
      return { ...mockCurrentLesson, id: lessonId };
    }
    return apiClient<Lesson>(`/student/lessons/${lessonId}`);
  },

  async completeLesson(lessonId: string): Promise<{ xpEarned: number; masteryChange: number; nextAction: NextBestAction }> {
    if (USE_MOCKS) {
      await delay(400);
      return {
        xpEarned: 30,
        masteryChange: 6,
        nextAction: mockNextBestAction,
      };
    }
    return apiClient(`/student/lessons/${lessonId}/complete`, { method: 'POST' });
  },

  async getNextBestAction(): Promise<NextBestAction> {
    if (USE_MOCKS) {
      await delay(200);
      return { ...mockNextBestAction };
    }
    return apiClient<NextBestAction>('/student/next-best-action');
  },

  async getTasks(): Promise<Task[]> {
    if (USE_MOCKS) {
      await delay(250);
      return [...mockTasks];
    }
    return apiClient<Task[]>('/student/tasks');
  },

  async getTask(taskId: string): Promise<Task | undefined> {
    if (USE_MOCKS) {
      await delay(200);
      return mockTasks.find((t) => t.id === taskId);
    }
    return apiClient<Task>(`/student/tasks/${taskId}`);
  },

  async getTest(testId: string): Promise<Test | undefined> {
    if (USE_MOCKS) {
      await delay(300);
      const test = mockTests.find((t) => t.id === testId) || mockTests[0];
      // Generate sample questions for active test
      const questions: Question[] = [
        mockCurrentLesson.interactiveQuestion,
        {
          id: 'q-test-2',
          subjectId: 'physics',
          topicId: 'phys-ch2',
          conceptId: 'c-field',
          conceptName: 'Electric Field & Gauss Law',
          type: 'mcq',
          prompt: 'A charge Q is enclosed by a Gaussian spherical surface of radius R. If the radius is doubled, the outward electric flux will:',
          options: ['Be doubled', 'Be halved', 'Remain unchanged', 'Become four times'],
          correctAnswer: 'Remain unchanged',
          explanation: 'By Gauss Law, total electric flux depends only on total enclosed charge (Φ = Q_enclosed / ε₀), independent of the radius or shape of the Gaussian surface.',
          hints: ['Recall Gauss Law Φ = Q_enclosed / ε₀'],
          xpReward: 20,
          masteryGain: 5,
          difficulty: 'easy',
        },
        {
          id: 'q-test-3',
          subjectId: 'physics',
          topicId: 'phys-ch2',
          conceptId: 'c-capacitance',
          conceptName: 'Capacitance & Dielectrics',
          type: 'mcq',
          prompt: 'A dielectric slab of dielectric constant K is introduced between the plates of an isolated charged parallel plate capacitor. What happens to the energy stored?',
          options: [
            'Increases by factor K',
            'Decreases by factor 1/K',
            'Remains constant',
            'Becomes zero',
          ],
          correctAnswer: 'Decreases by factor 1/K',
          explanation: 'For an isolated capacitor, charge Q is constant. Energy U = Q² / (2C). Since C increases by K, energy U becomes U/K.',
          hints: ['Charge Q is conserved because battery is disconnected.'],
          xpReward: 30,
          masteryGain: 7,
          difficulty: 'medium',
        },
      ];
      return { ...test, questions };
    }
    return apiClient<Test>(`/student/tests/${testId}`);
  },

  async submitTest(testId: string, answers: Record<string, string>): Promise<TestAttempt> {
    if (USE_MOCKS) {
      await delay(500);
      return {
        id: `attempt-${Date.now()}`,
        testId,
        testTitle: 'Class 12 Physics Term Assessment — Electrostatics & Gauss Law',
        studentId: mockCurrentUser.id,
        studentName: mockCurrentUser.name,
        score: 42,
        maxMarks: 50,
        percentage: 84,
        xpEarned: 150,
        submittedAt: new Date().toISOString(),
        strongConcepts: [
          { name: 'Electric Charge & Quantization', change: 4 },
          { name: 'Electric Field & Gauss Law', change: 8 },
        ],
        needsPracticeConcepts: [
          { name: 'Electric Potential & Gradient', change: 3, conceptId: 'c-potential' },
          { name: 'Capacitance & Dielectrics', change: -1, conceptId: 'c-capacitance' },
        ],
        recommendedNextAction: {
          title: 'Review Capacitance with Dielectrics',
          conceptId: 'c-capacitance',
          subjectId: 'physics',
        },
      };
    }
    return apiClient<TestAttempt>(`/student/tests/${testId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  },

  async getAchievements(): Promise<Achievement[]> {
    if (USE_MOCKS) {
      await delay(150);
      return [...mockAchievements];
    }
    return apiClient<Achievement[]>('/student/achievements');
  },

  async getNotifications(): Promise<NotificationItem[]> {
    if (USE_MOCKS) {
      await delay(150);
      return [...mockNotifications];
    }
    return apiClient<NotificationItem[]>('/student/notifications');
  },
};
