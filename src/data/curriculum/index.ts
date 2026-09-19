import { SubjectCurriculum, SubjectId, Chapter, Concept, Unit, PracticeQuestion } from '@/types/curriculum';
import { mathematicsCurriculum } from './mathematics';
import { physicsCurriculum } from './physics';
import { chemistryCurriculum } from './chemistry';
import { englishCurriculum } from './english';

export const curriculumBySubject: Record<SubjectId, SubjectCurriculum> = {
  mathematics: mathematicsCurriculum,
  physics: physicsCurriculum,
  chemistry: chemistryCurriculum,
  english: englishCurriculum,
};

export const getAllSubjects = (): SubjectCurriculum[] => [
  mathematicsCurriculum,
  physicsCurriculum,
  chemistryCurriculum,
  englishCurriculum,
];

export const getSubjectCurriculum = (subjectId: SubjectId): SubjectCurriculum => {
  return curriculumBySubject[subjectId] || physicsCurriculum;
};

export const getChapter = (
  subjectId: SubjectId,
  chapterId: string
): { chapter: Chapter; unit: Unit } | undefined => {
  const subject = getSubjectCurriculum(subjectId);
  for (const unit of subject.units) {
    for (const chapter of unit.chapters) {
      if (chapter.id === chapterId) {
        return { chapter, unit };
      }
    }
  }
  return undefined;
};

export const getConcept = (
  subjectId: SubjectId,
  conceptId: string
): { concept: Concept; chapter: Chapter; unit: Unit } | undefined => {
  const subject = getSubjectCurriculum(subjectId);
  for (const unit of subject.units) {
    for (const chapter of unit.chapters) {
      for (const concept of chapter.concepts) {
        if (concept.id === conceptId) {
          return { concept, chapter, unit };
        }
      }
    }
  }
  return undefined;
};

export const findConceptAcrossSubjects = (
  conceptOrLessonId: string
): { concept: Concept; chapter: Chapter; unit: Unit; subject: SubjectCurriculum } | undefined => {
  for (const subject of getAllSubjects()) {
    for (const unit of subject.units) {
      for (const chapter of unit.chapters) {
        for (const concept of chapter.concepts) {
          if (
            concept.id === conceptOrLessonId ||
            chapter.id === conceptOrLessonId ||
            conceptOrLessonId.includes(concept.id) ||
            concept.id.includes(conceptOrLessonId)
          ) {
            return { concept, chapter, unit, subject };
          }
        }
      }
    }
  }

  // Fallback to current concept of physics
  const defaultSubject = physicsCurriculum;
  const defaultUnit = defaultSubject.units[0];
  const defaultChapter = defaultUnit.chapters[1]; // Electrostatic Potential
  const defaultConcept = defaultChapter.concepts[0];
  return {
    concept: defaultConcept,
    chapter: defaultChapter,
    unit: defaultUnit,
    subject: defaultSubject,
  };
};

export const getTopicPractice = (
  subjectId: SubjectId,
  chapterOrConceptId?: string
): PracticeQuestion[] => {
  const subject = getSubjectCurriculum(subjectId);
  const questions: PracticeQuestion[] = [];

  for (const unit of subject.units) {
    for (const chapter of unit.chapters) {
      if (!chapterOrConceptId || chapter.id === chapterOrConceptId) {
        for (const concept of chapter.concepts) {
          questions.push(...concept.practiceQuestions);
        }
      } else {
        for (const concept of chapter.concepts) {
          if (concept.id === chapterOrConceptId) {
            questions.push(...concept.practiceQuestions);
          }
        }
      }
    }
  }

  // If none matched, return all questions in the subject
  if (questions.length === 0) {
    for (const unit of subject.units) {
      for (const chapter of unit.chapters) {
        for (const concept of chapter.concepts) {
          questions.push(...concept.practiceQuestions);
        }
      }
    }
  }

  return questions;
};

export {
  mathematicsCurriculum,
  physicsCurriculum,
  chemistryCurriculum,
  englishCurriculum,
};
