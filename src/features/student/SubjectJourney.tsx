import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cbse2026Curriculum } from '@/services/mock/curriculumData';
import { SubjectId } from '@/types/domain';
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
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const SubjectJourney: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();

  const validSubjectId: SubjectId =
    subjectId === 'mathematics' || subjectId === 'physics' || subjectId === 'chemistry' || subjectId === 'english'
      ? subjectId
      : 'physics';

  const subjectData = cbse2026Curriculum.subjects[validSubjectId];
  const { info, units } = subjectData;

  const handleOpenLesson = (chapterId: string, conceptId?: string) => {
    navigate('/student/lesson/phys-ch2-l3');
  };

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
          CBSE Class 12 • Code {validSubjectId === 'mathematics' ? '041' : validSubjectId === 'physics' ? '042' : validSubjectId === 'chemistry' ? '043' : '301'}
        </span>
      </div>

      {/* Subject Header Banner */}
      <div
        className="p-6 sm:p-7 rounded-3xl border shadow-subtle flex items-center justify-between"
        style={{ backgroundColor: info.lightColor, borderColor: info.color + '30' }}
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
            {info.name}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
            Follow the path to master each concept step-by-step
          </p>
        </div>

        <div className="text-right">
          <span className="text-3xl font-black text-[#172033] block">
            {info.overallMastery}%
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">
            Mastery
          </span>
        </div>
      </div>

      {/* 2-Column Desktop Layout: Visual Path on Left (~65%), Compact Context on Right (~35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Visual Learning Path (The Path IS the Index!) */}
        <div className="lg:col-span-8 space-y-6">
          {units.map((unit) => (
            <div
              key={unit.id}
              className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-7 shadow-subtle space-y-6"
            >
              {/* Unit Title Header */}
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#667085]">
                    Unit {unit.unitNumber}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[#172033]">
                    {unit.title}
                  </h3>
                </div>
                <span className="text-xs font-black text-[#172033]">
                  {unit.masteryPercentage}%
                </span>
              </div>

              {/* Sequential Path of Chapters and Concepts */}
              <div className="space-y-4">
                {unit.chapters.map((chapter, chIdx) => {
                  const isCurrentChapter = chapter.id === info.currentChapterId;
                  const isCompleted = chapter.masteryPercentage >= 80;

                  return (
                    <div key={chapter.id} className="space-y-3">
                      {/* Chapter Node */}
                      <div
                        onClick={() => handleOpenLesson(chapter.id)}
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
                          <ChevronRight className="w-4 h-4 text-[#667085] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

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
              Your Progress
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold text-[#172033]">
                <span>Syllabus Lessons</span>
                <span>{info.completedLessons} / {info.totalLessons}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(info.completedLessons / info.totalLessons) * 100}%`,
                    backgroundColor: info.color,
                  }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[#667085]">Completed Chapters: <strong>4</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFC800]" />
                <span className="text-[#667085]">In Progress: <strong>Electrostatics</strong></span>
              </div>
            </div>
          </div>

          {/* Direct CTA */}
          <button
            onClick={() => navigate('/student/lesson/phys-ch2-l3')}
            className="w-full py-3.5 px-5 rounded-2xl bg-[#172033] hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <span>CONTINUE CURRENT LESSON</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
