export interface DemoClass {
  id: string;
  name: string;
  stream: string;
  section: string;
  grade: number;
  totalStudents: number;
  classTeacherId: string;
  classTeacherName: string;
  averageAttendance: number;
  averageMastery: number;
}

export const demoClasses: DemoClass[] = [
  {
    id: '12-A',
    name: 'Class 12-A',
    stream: 'PCM + English / CS',
    section: 'A',
    grade: 12,
    totalStudents: 40,
    classTeacherId: 'teacher-1',
    classTeacherName: 'Mr. Rohan Mehta',
    averageAttendance: 94,
    averageMastery: 74,
  },
  {
    id: '12-B',
    name: 'Class 12-B',
    stream: 'PCB + English',
    section: 'B',
    grade: 12,
    totalStudents: 38,
    classTeacherId: 'teacher-3',
    classTeacherName: 'Dr. Neha Iyer',
    averageAttendance: 92,
    averageMastery: 71,
  },
  {
    id: '12-C',
    name: 'Class 12-C',
    stream: 'Commerce + Math',
    section: 'C',
    grade: 12,
    totalStudents: 42,
    classTeacherId: 'teacher-2',
    classTeacherName: 'Ms. Ananya Sharma',
    averageAttendance: 95,
    averageMastery: 76,
  },
  {
    id: '11-A',
    name: 'Class 11-A',
    stream: 'PCM + CS',
    section: 'A',
    grade: 11,
    totalStudents: 40,
    classTeacherId: 'teacher-4',
    classTeacherName: 'Ms. Kavita Rao',
    averageAttendance: 91,
    averageMastery: 69,
  },
];
