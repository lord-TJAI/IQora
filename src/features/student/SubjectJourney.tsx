import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubjectCurriculum } from '@/data/curriculum';
import { SubjectId } from '@/types/curriculum';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronRight,
  ArrowDown,
  Sparkles,
  Play,
  Layers,
  Award,
  BookOpen,
  Calculator,
  Atom,
  FlaskConical,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const SubjectJourney: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();

  const validSubjectId: SubjectId =
    subjectId === 'mathematics' || subjectId === 'physics' || subjectId === 'chemistry' || subjectId === 'english'
      ? subjectId
      : 'physics';

  const subjectData = getSubjectCurriculum(validSubjectId);
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(subjectData.currentChapterId);

  const handleOpenConcept = (conceptId: string) => {
    navigate(`/student/lesson/${conceptId}`);
  };

  const getSubjectIcon = (id: string) => {
    switch (id) {
      case 'mathematics':
        return Calculator;
      case 'physics':
        return Atom;
      case 'chemistry':
        return FlaskConical;
      case 'english':
        return BookOpen;
      default:
        return BookOpen;
    }
  };

  const Icon = getSubjectIcon(validSubjectId);

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/student/learn')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#667085] hover:text-[#172033] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Subjects</span>
        </button>

        <span className="text-xs font-bold text-[#667085]">
          CBSE Class 12 • Code {subjectData.code}
        </span>
      </div>

      {/* Subject Header Banner */}
      <div
        className="p-6 sm:p-7 rounded-3xl border shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ backgroundColor: subjectData.lightColor, borderColor: subjectData.color + '30' }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xs p-3 flex-shrink-0"
            style={{ backgroundColor: subjectData.color }}
          >
            <Icon className="w-7 h-7 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#667085]">
                Subject Journey
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 text-[#172033]">
                {subjectData.units.length} Units
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
              {subjectData.name}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#667085] mt-0.5">
              {subjectData.tagline}
            </p>
          </div>
        </div>

        <div className="text-right flex sm:flex-col items-center sm:items-end justify-between">
          <span className="text-3xl font-black text-[#172033] block">
            {subjectData.overallMastery}%
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">
            Overall Mastery
          </span>
        </div>
      </div>

      {/* 2-Column Desktop Layout: Visual Path on Left (~65%), Compact Context on Right (~35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Visual Learning Path (The Path IS the Index!) */}
        <div className="lg:col-span-8 space-y-6">
          {subjectData.units.map((unit) => (
            <div
              key={unit.id}
              className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-7 shadow-subtle space-y-6"
            >
              {/* Unit Title Header */}
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#667085]">
                    Unit {unit.unitNumber} {unit.marksWeightage ? `• ${unit.marksWeightage} Marks` : ''}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[#172033]">
                    {unit.title}
                  </h3>
                </div>
                <span className="text-xs font-black text-[#172033]">
                  {unit.masteryPercentage}% Mastery
                </span>
              </div>

              {/* Sequential Path of Chapters and Concepts */}
              <div className="space-y-4">
                {unit.chapters.map((chapter, chIdx) => {
                  const isCurrentChapter = chapter.id === subjectData.currentChapterId;
                  const isExpanded = expandedChapterId === chapter.id;
                  const isCompleted = chapter.masteryPercentage >= 80;

                  return (
                    <div key={chapter.id} className="space-y-3">
                      {/* Chapter Node */}
                      <div
                        onClick={() => setExpandedChapterId(isExpanded ? null : chapter.id)}
                        className={cn(
                          'p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group',
                          isCurrentChapter
                            ? 'bg-[#FFC800]/10 border-[#FFC800] shadow-xs'
                            : isCompleted
                            ? 'bg-[#F7F9FC] border-[#E6EAF0] hover:bg-white'
                            : 'bg-white border-[#E6EAF0] hover:border-[#D0D5DD]'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 stroke-[2.5] flex-shrink-0" />
                          ) : isCurrentChapter ? (
                            <span className="w-4 h-4 rounded-full bg-[#FFC800] ring-4 ring-amber-100 flex-shrink-0" />
                          ) : (
                            <span className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
                          )}

                          <div>
                            <span className="text-[11px] font-bold text-[#667085] block">
                              Chapter {chapter.order}
                            </span>
                            <h4 className="text-sm sm:text-base font-black text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                              {chapter.title}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-[#172033]">
                            {chapter.masteryPercentage}%
                          </span>
                          <ChevronDown
                            className={cn(
                              'w-4 h-4 text-[#667085] transition-transform duration-200',
                              isExpanded && 'rotate-180'
                            )}
                          />
                        </div>
                      </div>

                      {/* Concepts Drawer (Expanded) */}
                      {isExpanded && (
                        <div className="pl-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
                          {chapter.concepts.map((concept) => (
                            <div
                              key={concept.id}
                              onClick={() => handleOpenConcept(concept.id)}
                              className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#4F7CFF] hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 group"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EFF4FF] text-[#4F7CFF]">
                                    {concept.activityType}
                                  </span>
                                  <span
                                    className={cn(
                                      'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase',
                                      concept.state === 'mastered'
                                        ? 'bg-emerald-50 text-emerald-700'
                                        : concept.state === 'strong'
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'bg-amber-50 text-amber-700'
                                    )}
                                  >
                                    {concept.state}
                                  </span>
                                </div>
                                <h5 className="text-xs sm:text-sm font-bold text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                                  {concept.name}
                                </h5>
                                <p className="text-[11px] text-[#667085] line-clamp-1">
                                  {concept.learningObjective}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-xs font-bold text-[#172033]">
                                  {concept.masteryPercentage}%
                                </span>
                                <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#4F7CFF] group-hover:text-white transition-colors">
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Directional Connector Arrow between chapters */}
                      {chIdx < unit.chapters.length - 1 && (
                        <div className="flex justify-center py-0.5">
                          <ArrowDown className="w-3.5 h-3.5 text-slate-300 stroke-[2.5]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Compact Right Context on Desktop (Hidden on Mobile) */}
        <div className="hidden lg:block lg:col-span-4 space-y-5 sticky top-24">
          {/* Progress Card */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-5 shadow-subtle space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#667085]">
              Syllabus Coverage
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold text-[#172033]">
                <span>Completed Lessons</span>
                <span>
                  {subjectData.completedLessons} / {subjectData.totalLessons}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(subjectData.completedLessons / subjectData.totalLessons) * 100}%`,
                    backgroundColor: subjectData.color,
                  }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[#667085]">
                  Active Board Syllabus: <strong>2026–27</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFC800]" />
                <span className="text-[#667085]">
                  Focus Chapter: <strong>{subjectData.currentChapterId}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Direct CTA */}
          <button
            onClick={() => handleOpenConcept(subjectData.currentConceptId)}
            className="w-full py-3.5 px-5 rounded-2xl bg-[#172033] hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <span>CONTINUE CURRENT CONCEPT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
