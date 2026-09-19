export type SubjectId = 'mathematics' | 'physics' | 'chemistry' | 'english';

export type MathActivityType =
  | 'secantTangent'
  | 'riemannSum'
  | 'optimization'
  | 'vectorCanvas'
  | 'probabilitySimulation';

export type PhysicsActivityType =
  | 'electricFieldSimulation'
  | 'circuitLab'
  | 'lensTracer'
  | 'waveSimulation'
  | 'inductionLab';

export type ChemistryActivityType =
  | 'coordinationBuilder'
  | 'reactionExplorer'
  | 'electrochemicalCell'
  | 'particleCollisionSimulation';

export type EnglishActivityType =
  | 'readingEvidence'
  | 'writingCanvas'
  | 'contextVocabulary'
  | 'comprehensionActivity';

export type ActivityType =
  | MathActivityType
  | PhysicsActivityType
  | ChemistryActivityType
  | EnglishActivityType;

export type QuestionType =
  | 'mcq'
  | 'calculation'
  | 'assertion_reason'
  | 'prediction'
  | 'evidence_selection';

export interface PracticeQuestion {
  id: string;
  conceptId: string;
  conceptName: string;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export type ConceptState = 'mastered' | 'strong' | 'learning' | 'needs_practice' | 'locked';

export interface Concept {
  id: string;
  name: string;
  subjectId: SubjectId;
  chapterId: string;
  activityType: ActivityType;
  learningObjective: string;
  masteryPercentage: number;
  state: ConceptState;
  attemptsCount: number;
  recentMistakes?: string[];
  keyFormula?: string;
  keyPoints?: string[];
  practiceQuestions: PracticeQuestion[];
}

export interface Chapter {
  id: string;
  subjectId: SubjectId;
  unitId: string;
  title: string;
  order: number;
  masteryPercentage: number;
  description: string;
  concepts: Concept[];
}

export interface Unit {
  id: string;
  unitNumber: number;
  title: string;
  subjectId: SubjectId;
  marksWeightage?: number;
  chapters: Chapter[];
  masteryPercentage: number;
}

export interface SubjectCurriculum {
  id: SubjectId;
  name: string;
  code: string;
  tagline: string;
  description: string;
  color: string;
  lightColor: string;
  overallMastery: number;
  totalLessons: number;
  completedLessons: number;
  currentChapterId: string;
  currentConceptId: string;
  units: Unit[];
}
