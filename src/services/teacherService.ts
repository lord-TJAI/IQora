import {
  Teacher,
  Student,
  Task,
  Test,
  Submission,
  AttendanceRecord,
  AIIntervention,
  StudyMaterial,
} from '@/types/domain';
import {
  mockTeacherUser,
  mockClass12AStudents,
  mockTasks,
  mockTests,
  mockSubmissions,
  mockInterventions,
  mockStudyMaterials,
} from './mock/mockData';
import { apiClient } from './api/client';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false';
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export interface TeacherDashboardStats {
  totalStudents: number;
  attendanceToday: number;
  classAverage: number;
  activeTasksCount: number;
  subjectMasteries: { name: string; percentage: number; color: string }[];
  conceptGaps: { concept: string; mastery: number; affectedCount: number; trend: 'down' | 'up' }[];
  todaysTasks: { title: string; submitted: number; total: number; subject: string }[];
  urgentIntervention?: AIIntervention;
}

export const teacherService = {
  async getProfile(): Promise<Teacher> {
    if (USE_MOCKS) {
      await delay(200);
      return { ...mockTeacherUser };
    }
    return apiClient<Teacher>('/teacher/profile');
  },

  async getDashboardData(classId = '12-A'): Promise<TeacherDashboardStats> {
    if (USE_MOCKS) {
      await delay(250);
      return {
        totalStudents: 42,
        attendanceToday: 94,
        classAverage: 78,
        activeTasksCount: 8,
        subjectMasteries: [
          { name: 'Mathematics', percentage: 78, color: '#4F7CFF' },
          { name: 'Physics', percentage: 72, color: '#7C4DFF' },
          { name: 'Chemistry', percentage: 64, color: '#20C997' },
          { name: 'English Core', percentage: 81, color: '#FF8A3D' },
        ],
        conceptGaps: [
          { concept: 'Integration by Parts', mastery: 51, affectedCount: 12, trend: 'down' },
          { concept: 'Electrochemistry (Nernst)', mastery: 58, affectedCount: 14, trend: 'down' },
          { concept: 'Electric Potential & Gradient', mastery: 63, affectedCount: 17, trend: 'down' },
        ],
        todaysTasks: [
          { title: 'Physics Electrostatics Assignment 03', submitted: 31, total: 42, subject: 'Physics' },
          { title: 'Chemistry Electrochemistry Homework', submitted: 38, total: 42, subject: 'Chemistry' },
          { title: 'Mathematics Definite Integrals Test', submitted: 42, total: 42, subject: 'Mathematics' },
        ],
        urgentIntervention: mockInterventions[0],
      };
    }
    return apiClient<TeacherDashboardStats>('/teacher/dashboard', { params: { classId } });
  },

  async getStudents(classId = '12-A'): Promise<Student[]> {
    if (USE_MOCKS) {
      await delay(200);
      return [...mockClass12AStudents];
    }
    return apiClient<Student[]>('/teacher/students', { params: { classId } });
  },

  async getStudent(studentId: string): Promise<Student | undefined> {
    if (USE_MOCKS) {
      await delay(200);
      return mockClass12AStudents.find((s) => s.id === studentId) || mockClass12AStudents[0];
    }
    return apiClient<Student>(`/teacher/students/${studentId}`);
  },

  async getAssignments(): Promise<Task[]> {
    if (USE_MOCKS) {
      await delay(200);
      return mockTasks.filter((t) => t.type === 'assignment');
    }
    return apiClient<Task[]>('/teacher/assignments');
  },

  async createAssignment(assignment: Partial<Task>): Promise<Task> {
    if (USE_MOCKS) {
      await delay(400);
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: assignment.title || 'New Assignment',
        subjectId: assignment.subjectId || 'physics',
        subjectName: assignment.subjectName || 'Physics',
        teacherId: mockTeacherUser.id,
        teacherName: mockTeacherUser.title,
        type: 'assignment',
        classId: assignment.classId || '12-A',
        assignedDate: new Date().toISOString().split('T')[0],
        dueDate: assignment.dueDate || '2026-09-25',
        maxMarks: assignment.maxMarks || 20,
        status: 'not_started',
        progressPercentage: 0,
        description: assignment.description || '',
        instructions: assignment.instructions || '',
      };
      mockTasks.unshift(newTask);
      return newTask;
    }
    return apiClient<Task>('/teacher/assignments', {
      method: 'POST',
      body: JSON.stringify(assignment),
    });
  },

  async getHomework(): Promise<Task[]> {
    if (USE_MOCKS) {
      await delay(200);
      return mockTasks.filter((t) => t.type === 'homework');
    }
    return apiClient<Task[]>('/teacher/homework');
  },

  async getTests(): Promise<Test[]> {
    if (USE_MOCKS) {
      await delay(200);
      return [...mockTests];
    }
    return apiClient<Test[]>('/teacher/tests');
  },

  async createTest(testData: Partial<Test>): Promise<Test> {
    if (USE_MOCKS) {
      await delay(400);
      const newTest: Test = {
        id: `test-${Date.now()}`,
        title: testData.title || 'New Test',
        subjectId: testData.subjectId || 'physics',
        subjectName: testData.subjectName || 'Physics',
        chapterId: testData.chapterId || 'phys-ch2',
        chapterTitle: testData.chapterTitle || 'Electrostatics',
        durationMinutes: testData.durationMinutes || 30,
        totalQuestions: testData.totalQuestions || 15,
        maxMarks: testData.maxMarks || 30,
        topics: testData.topics || ['Electrostatics'],
        rules: ['Strict timed test', 'No calculator permitted'],
        status: 'active',
        averageScore: 0,
        participantsCount: 0,
      };
      mockTests.unshift(newTest);
      return newTest;
    }
    return apiClient<Test>('/teacher/tests', {
      method: 'POST',
      body: JSON.stringify(testData),
    });
  },

  async getAttendance(classId = '12-A', date: string): Promise<AttendanceRecord[]> {
    if (USE_MOCKS) {
      await delay(200);
      return mockClass12AStudents.map((s, idx) => ({
        id: `att-${s.id}-${date}`,
        studentId: s.id,
        studentName: s.name,
        rollNumber: s.rollNumber,
        classId,
        date,
        status: idx === 2 ? 'late' : idx === 4 ? 'absent' : 'present',
      }));
    }
    return apiClient<AttendanceRecord[]>('/teacher/attendance', { params: { classId, date } });
  },

  async saveAttendance(records: AttendanceRecord[]): Promise<{ success: boolean; count: number }> {
    if (USE_MOCKS) {
      await delay(350);
      return { success: true, count: records.length };
    }
    return apiClient('/teacher/attendance', {
      method: 'POST',
      body: JSON.stringify({ records }),
    });
  },

  async getSubmissions(taskId?: string): Promise<Submission[]> {
    if (USE_MOCKS) {
      await delay(250);
      if (taskId) {
        return mockSubmissions.filter((s) => s.taskId === taskId);
      }
      return [...mockSubmissions];
    }
    return apiClient<Submission[]>('/teacher/submissions', { params: { taskId } });
  },

  async getSubmission(submissionId: string): Promise<Submission | undefined> {
    if (USE_MOCKS) {
      await delay(200);
      return mockSubmissions.find((s) => s.id === submissionId) || mockSubmissions[0];
    }
    return apiClient<Submission>(`/teacher/submissions/${submissionId}`);
  },

  async evaluateSubmission(
    submissionId: string,
    score: number,
    feedback: string
  ): Promise<Submission> {
    if (USE_MOCKS) {
      await delay(300);
      const sub = mockSubmissions.find((s) => s.id === submissionId) || mockSubmissions[0];
      sub.status = 'evaluated';
      sub.score = score;
      sub.teacherFeedback = feedback;
      return { ...sub };
    }
    return apiClient<Submission>(`/teacher/submissions/${submissionId}/evaluate`, {
      method: 'POST',
      body: JSON.stringify({ score, feedback }),
    });
  },

  async getInterventions(): Promise<AIIntervention[]> {
    if (USE_MOCKS) {
      await delay(200);
      return [...mockInterventions];
    }
    return apiClient<AIIntervention[]>('/teacher/interventions');
  },

  async updateInterventionStatus(
    id: string,
    status: AIIntervention['status']
  ): Promise<AIIntervention> {
    if (USE_MOCKS) {
      await delay(250);
      const item = mockInterventions.find((i) => i.id === id);
      if (item) item.status = status;
      return item || mockInterventions[0];
    }
    return apiClient<AIIntervention>(`/teacher/interventions/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  async getMaterials(): Promise<StudyMaterial[]> {
    if (USE_MOCKS) {
      await delay(200);
      return [...mockStudyMaterials];
    }
    return apiClient<StudyMaterial[]>('/teacher/materials');
  },
};
