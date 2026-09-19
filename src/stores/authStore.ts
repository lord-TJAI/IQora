import { create } from 'zustand';
import { User, Student, Teacher, Admin, UserRole } from '@/types/domain';
import { mockCurrentUser, mockTeacherUser, mockAdminUser } from '@/services/mock/mockData';

interface AuthState {
  user: User | null;
  studentData: Student | null;
  teacherData: Teacher | null;
  adminData: Admin | null;
  isAuthenticated: boolean;
  activeRole: UserRole;
  login: (role?: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  addXP: (amount: number) => void;
  updateMastery: (subjectId: string, gain: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: mockCurrentUser,
  studentData: mockCurrentUser,
  teacherData: mockTeacherUser,
  adminData: mockAdminUser,
  isAuthenticated: true,
  activeRole: 'student',

  login: (role = 'student') => {
    if (role === 'teacher') {
      set({ user: mockTeacherUser, activeRole: 'teacher', isAuthenticated: true });
    } else if (role === 'admin') {
      set({ user: mockAdminUser, activeRole: 'admin', isAuthenticated: true });
    } else {
      set({ user: mockCurrentUser, activeRole: 'student', isAuthenticated: true });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  switchRole: (role: UserRole) => {
    if (role === 'teacher') {
      set({ user: mockTeacherUser, activeRole: 'teacher' });
    } else if (role === 'admin') {
      set({ user: mockAdminUser, activeRole: 'admin' });
    } else {
      set({ user: mockCurrentUser, activeRole: 'student' });
    }
  },

  addXP: (amount: number) => {
    set((state) => {
      if (!state.studentData) return state;
      const newXp = state.studentData.xp + amount;
      const newLevel = Math.floor(newXp / 200) + 1;
      const updated: Student = {
        ...state.studentData,
        xp: newXp,
        level: newLevel,
      };
      return {
        studentData: updated,
        user: state.activeRole === 'student' ? updated : state.user,
      };
    });
  },

  updateMastery: (subjectId: string, gain: number) => {
    set((state) => {
      if (!state.studentData) return state;
      const current = state.studentData.subjectMastery[subjectId] || 70;
      const newScore = Math.min(100, current + gain);
      const updatedStudent: Student = {
        ...state.studentData,
        subjectMastery: {
          ...state.studentData.subjectMastery,
          [subjectId]: newScore,
        },
      };
      return {
        studentData: updatedStudent,
        user: state.activeRole === 'student' ? updatedStudent : state.user,
      };
    });
  },
}));
