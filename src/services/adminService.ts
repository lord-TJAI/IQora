import { Student, Teacher } from '@/types/domain';
import { mockClass12AStudents, mockTeacherUser, mockSubjects } from './mock/mockData';
import { apiClient } from './api/client';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false';
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export interface AdminDashboardData {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  activeSubjects: number;
  overallAttendance: number;
  avgAcademicPerformance: number;
  activeTasks: number;
  completedTests: number;
  classesData: { name: string; students: number; avgMastery: number; attendance: number }[];
  subjectPerformance: { subject: string; score: number; color: string }[];
}

export const adminService = {
  async getDashboard(): Promise<AdminDashboardData> {
    if (USE_MOCKS) {
      await delay(250);
      return {
        totalStudents: 342,
        totalTeachers: 28,
        totalClasses: 8,
        activeSubjects: 4,
        overallAttendance: 93,
        avgAcademicPerformance: 76,
        activeTasks: 24,
        completedTests: 68,
        classesData: [
          { name: 'Class 12-A (Sci)', students: 42, avgMastery: 78, attendance: 94 },
          { name: 'Class 12-B (Sci)', students: 39, avgMastery: 74, attendance: 92 },
          { name: 'Class 12-C (Com)', students: 44, avgMastery: 76, attendance: 95 },
          { name: 'Class 12-D (Hum)', students: 38, avgMastery: 81, attendance: 91 },
        ],
        subjectPerformance: [
          { subject: 'Mathematics', score: 78, color: '#4F7CFF' },
          { subject: 'Physics', score: 72, color: '#7C4DFF' },
          { subject: 'Chemistry', score: 64, color: '#20C997' },
          { subject: 'English', score: 81, color: '#FF8A3D' },
        ],
      };
    }
    return apiClient<AdminDashboardData>('/admin/dashboard');
  },

  async getStudents(): Promise<Student[]> {
    if (USE_MOCKS) {
      await delay(200);
      return [...mockClass12AStudents];
    }
    return apiClient<Student[]>('/admin/students');
  },

  async getTeachers(): Promise<Teacher[]> {
    if (USE_MOCKS) {
      await delay(200);
      return [
        mockTeacherUser,
        {
          id: 'teacher-2',
          name: 'Dr. Rajesh Kapoor',
          title: 'Dr. Kapoor',
          email: 'rajesh.kapoor@iqora.edu',
          role: 'teacher',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          subjects: ['chemistry'],
          classIds: ['12-A', '12-C'],
          totalStudents: 86,
        },
        {
          id: 'teacher-3',
          name: 'Mr. Amit Verma',
          title: 'Mr. Verma',
          email: 'amit.verma@iqora.edu',
          role: 'teacher',
          avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          subjects: ['mathematics'],
          classIds: ['12-A', '12-B'],
          totalStudents: 81,
        },
      ];
    }
    return apiClient<Teacher[]>('/admin/teachers');
  },

  async getClasses() {
    if (USE_MOCKS) {
      await delay(200);
      return [
        { id: '12-A', name: 'Class 12-A', stream: 'Science', studentsCount: 42, classTeacher: 'Ms. Ananya Sharma', room: 'Room 301' },
        { id: '12-B', name: 'Class 12-B', stream: 'Science', studentsCount: 39, classTeacher: 'Mr. Amit Verma', room: 'Room 302' },
        { id: '12-C', name: 'Class 12-C', stream: 'Commerce', studentsCount: 44, classTeacher: 'Mrs. Dsouza', room: 'Room 304' },
      ];
    }
    return apiClient('/admin/classes');
  },

  async getSubjects() {
    if (USE_MOCKS) {
      await delay(200);
      return [...mockSubjects];
    }
    return apiClient('/admin/subjects');
  },

  async getAcademicYear() {
    if (USE_MOCKS) {
      await delay(150);
      return {
        year: '2026-2027',
        term: 'Term 1 (Mid-Term)',
        startDate: '2026-04-01',
        endDate: '2027-03-31',
        totalWorkingDays: 210,
        completedDays: 104,
      };
    }
    return apiClient('/admin/academic-year');
  },
};
