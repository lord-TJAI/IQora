export interface SubjectMasteryDetail {
  subjectId: string;
  name: string;
  percentage: number;
  currentChapter: string;
  strongChapters: string[];
  weakChapters: string[];
}

export const demoStudentMastery: Record<string, SubjectMasteryDetail> = {
  mathematics: {
    subjectId: 'mathematics',
    name: 'Mathematics',
    percentage: 78,
    currentChapter: 'Applications of Derivatives',
    strongChapters: ['Matrices', 'Determinants', 'Continuity and Differentiability'],
    weakChapters: ['Applications of Derivatives', 'Differential Equations'],
  },
  physics: {
    subjectId: 'physics',
    name: 'Physics',
    percentage: 72,
    currentChapter: 'Electrostatic Potential and Capacitance',
    strongChapters: ['Electric Charges and Fields', 'Ray Optics and Optical Instruments'],
    weakChapters: ['Electrostatic Potential and Capacitance', 'Electromagnetic Induction'],
  },
  chemistry: {
    subjectId: 'chemistry',
    name: 'Chemistry',
    percentage: 64,
    currentChapter: 'Chemical Kinetics',
    strongChapters: ['Solutions', 'Coordination Compounds'],
    weakChapters: ['Chemical Kinetics', 'Electrochemistry'],
  },
  english: {
    subjectId: 'english',
    name: 'English',
    percentage: 81,
    currentChapter: 'Advanced Writing Skills',
    strongChapters: ['Reading Comprehension', 'Flamingo Literature'],
    weakChapters: ['Article Writing', 'Report Writing'],
  },
};
