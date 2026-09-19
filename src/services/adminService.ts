import { Student, Teacher, Subject } from '@/types/domain';
import { mockSubjects } from './mock/mockData';
import { demoTeachersList, demoStudentsList, DEMO_INSTITUTION } from '@/demo/demoData';
import { demoClasses } from '@/demo/demoClasses';
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
        totalStudents: DEMO_INSTITUTION.totalStudents, // 160
        totalTeachers: DEMO_INSTITUTION.totalTeachers, // 12
        totalClasses: DEMO_INSTITUTION.totalClasses, // 8
        activeSubjects: 4,
        overallAttendance: DEMO_INSTITUTION.averageAttendance, // 93%
        avgAcademicPerformance: DEMO_INSTITUTION.averageMastery, // 74%
        activeTasks: 18,
        completedTests: 42,
        classesData: [
          { name: 'Class 12-A', students: 40, avgMastery: 74, attendance: 94 },
          { name: 'Class 12-B', students: 38, avgMastery: 71, attendance: 92 },
          { name: 'Class 12-C', students: 42, avgMastery: 76, attendance: 95 },
          { name: 'Class 11-A', students: 40, avgMastery: 69, attendance: 91 },
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
      return [...demoStudentsList];
    }
    return apiClient<Student[]>('/admin/students');
  },

  async getTeachers(): Promise<Teacher[]> {
    if (USE_MOCKS) {
      await delay(200);
      return [...demoTeachersList];
    }
    return apiClient<Teacher[]>('/admin/teachers');
  },

  async getClasses(): Promise<any[]> {
    if (USE_MOCKS) {
      await delay(200);
      return [...demoClasses];
    }
    return apiClient<any[]>('/admin/classes');
  },
        { id: '12-B', name: 'Class 12-B', stream: 'Science', studentsCount: 39, classTeacher: 'Mr. Amit Verma', room: 'Room 302' },
        { id: '12-C', name: 'Class 12-C', stream: 'Commerce', studentsCount: 44, classTeacher: 'Mrs. Dsouza', room: 'Room 304' },
      ];
    }
    return apiClient<any[]>('/admin/classes');
  },

  async getSubjects(): Promise<Subject[]> {
    if (USE_MOCKS) {
      await delay(200);
      return [...mockSubjects];
    }
    return apiClient<Subject[]>('/admin/subjects');
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
