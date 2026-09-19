import { StudentQuery } from '@/types/query';

// In-memory store initialized with deterministic mock queries
let queriesStore: StudentQuery[] = [
  {
    id: 'query-1',
    studentId: 'student-1',
    studentName: 'Arjun Sharma',
    className: 'Class 12-A',
    subjectId: 'physics',
    subjectName: 'Physics',
    chapterId: 'phys-ch2',
    chapterTitle: 'Electrostatic Potential and Capacitance',
    conceptId: 'phys-c-potential-dipole',
    conceptName: 'Equipotential Surfaces & Potential Gradient',
    contextSource: 'lesson',
    message:
      "I understand electric potential conceptually, but I don't understand why the work done in moving a test charge over an equipotential surface is always exactly zero, even if the distance traveled is large.",
    createdAt: 'Today, 11:30 AM',
    status: 'answered',
    teacherReply: {
      teacherName: 'Mr. Rohan Mehta',
      replyText:
        'Remember the fundamental definition: W = q · ΔV. By definition, every point on an equipotential surface has the exact same potential V_A = V_B. Therefore, the potential difference ΔV is zero regardless of path length or distance. Also note that the electric field is strictly perpendicular to the surface, so E · dl = 0!',
      repliedAt: 'Today, 12:15 PM',
    },
  },
  {
    id: 'query-2',
    studentId: 'student-1',
    studentName: 'Arjun Sharma',
    className: 'Class 12-A',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    chapterId: 'math-ch7',
    chapterTitle: 'Integrals',
    conceptId: 'math-c-riemann-sum',
    conceptName: 'Integration by Parts with Inverse Trig',
    contextSource: 'practice',
    message:
      'In evaluating ∫ x · tan⁻¹(x) dx, should I always follow the ILATE rule strictly, or is there a case where integrating tan⁻¹(x) directly is easier?',
    createdAt: 'Today, 2:45 PM',
    status: 'sent',
  },
  {
    id: 'query-3',
    studentId: 'student-2',
    studentName: 'Priya Nair',
    className: 'Class 12-A',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    chapterId: 'chem-ch2',
    chapterTitle: 'Electrochemistry',
    conceptId: 'chem-c-nernst-galvanic',
    conceptName: 'Nernst Equation Concentration Ratio',
    contextSource: 'assignment',
    message:
      'For the Daniell cell Nernst equation, why is the solid copper electrode concentration omitted from the reaction quotient Q?',
    createdAt: 'Yesterday, 4:20 PM',
    status: 'sent',
  },
];

export const getStudentQueries = (studentId: string): StudentQuery[] => {
  return queriesStore.filter((q) => q.studentId === studentId);
};

export const getTeacherQueries = (): StudentQuery[] => {
  return [...queriesStore];
};

export const submitStudentQuery = (
  newQueryData: Omit<StudentQuery, 'id' | 'createdAt' | 'status'>
): StudentQuery => {
  const newQuery: StudentQuery = {
    ...newQueryData,
    id: `query-${Date.now()}`,
    createdAt: 'Just now',
    status: 'sent',
  };
  queriesStore = [newQuery, ...queriesStore];
  return newQuery;
};

export const replyToQuery = (
  queryId: string,
  replyText: string,
  teacherName = 'Mr. Rohan Mehta'
): StudentQuery | undefined => {
  const target = queriesStore.find((q) => q.id === queryId);
  if (target) {
    target.status = 'answered';
    target.teacherReply = {
      teacherName,
      replyText,
      repliedAt: 'Just now',
    };
    return target;
  }
  return undefined;
};

export const markQuerySeen = (queryId: string): void => {
  const target = queriesStore.find((q) => q.id === queryId);
  if (target && target.status === 'sent') {
    target.status = 'seen';
  }
};
