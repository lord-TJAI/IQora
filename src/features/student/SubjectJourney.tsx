import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cbse2026Curriculum } from '@/services/mock/curriculumData';
import { mockPhysicsJourneyNodes } from '@/services/mock/mockData';
import { LearningPath } from '@/components/learning/LearningPath';
import { SubjectId, LessonNode } from '@/types/domain';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  Layers,
  Sparkles,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  Lock,
  Play,
  Atom,
  Calculator,
  FlaskConical,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const SubjectJourney: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'syllabus' | 'journey'>('syllabus');

  const validSubjectId: SubjectId =
    subjectId === 'mathematics' || subjectId === 'physics' || subjectId === 'chemistry' || subjectId === 'english'
      ? subjectId
      : 'physics';

  const subjectData = cbse2026Curriculum.subjects[validSubjectId];
  const { info, units } = subjectData;

  const handleSelectNode = (node: LessonNode) => {
    if (node.type === 'ai_practice' || node.type === 'challenge') {
      navigate('/student/practice');
    } else if (node.type === 'mastery_test') {
      navigate('/student/test/test-1');
    } else {
      navigate('/student/lesson/phys-ch2-l3');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/student/learn')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#667085] hover:text-[#172033] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Subjects</span>
        </button>

        {/* View Toggle */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-[#E6EAF0] shadow-2xs">
          <button
            onClick={() => setViewMode('syllabus')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-black transition-all',
              viewMode === 'syllabus' ? 'bg-[#172033] text-white shadow-xs' : 'text-[#667085] hover:text-[#172033]'
            )}
          >
            CBSE Syllabus Units
          </button>
          <button
            onClick={() => setViewMode('journey')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-black transition-all',
              viewMode === 'journey' ? 'bg-[#172033] text-white shadow-xs' : 'text-[#667085] hover:text-[#172033]'
            )}
          >
            Interactive Path
          </button>
        </div>
      </div>

      {/* Subject Header Banner */}
      <div
        className="p-6 sm:p-7 rounded-3xl border-2 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          backgroundColor: info.lightColor,
          borderColor: info.color + '40',
        }}
      >
        <div>
          <span
            className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full text-white shadow-xs"
            style={{ backgroundColor: info.color }}
          >
            CBSE Class XII • {info.name}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] mt-2">
            {info.description}
          </h1>
          <p className="text-xs font-semibold text-[#667085] mt-1">
            {units.length} Official Units • {info.totalChapters} Theory Chapters • {info.completedLessons}/{info.totalLessons} Lessons
          </p>
        </div>

        <div className="text-left sm:text-right bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-white/60 shadow-2xs">
          <span className="text-3xl font-black text-[#172033]">
            {info.overallMastery}%
          </span>
          <span className="block text-[10px] font-black uppercase text-[#667085] tracking-wider">
            Curriculum Mastery
          </span>
        </div>
      </div>

      {/* View Content */}
      {viewMode === 'syllabus' ? (
        <div className="space-y-4">
          {units.map((unit) => (
            <div
              key={unit.id}
              className="bg-white rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 shadow-subtle space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F7F9FC] border border-[#E6EAF0] flex items-center justify-center font-black text-xs text-[#172033]">
                    U{unit.unitNumber}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block">
                      Unit {unit.unitNumber} {unit.marksWeightage ? `• ${unit.marksWeightage} Marks` : ''}
                    </span>
                    <h3 className="text-base font-black text-[#172033]">
                      {unit.title}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-black text-[#172033]">
                  {unit.masteryPercentage}% Mastery
                </span>
              </div>

              {/* Chapters in Unit */}
              <div className="space-y-2.5">
                {unit.chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    onClick={() => navigate(`/student/learn/${validSubjectId}/${chapter.id}`)}
                    className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#E6EAF0] hover:bg-white hover:border-[#D0D5DD] hover:shadow-2xs transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#667085]">
                          Chapter {chapter.order}
                        </span>
                        <span className="text-xs font-bold text-slate-300">•</span>
                        <span className="text-xs font-bold text-[#172033]">
                          {chapter.concepts.length} Concepts
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-[#172033] group-hover:text-[#4F7CFF] transition-colors mt-0.5">
                        {chapter.title}
                      </h4>
                      <p className="text-xs text-[#667085] line-clamp-1 mt-0.5">
                        {chapter.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs font-black text-[#172033]">
                        {chapter.masteryPercentage}%
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#667085] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Curved Learning Path View */
        <div className="bg-white rounded-3xl border border-[#E6EAF0] shadow-subtle p-4 sm:p-6">
          <div className="text-center pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">
              Step-by-Step Concept Mastery Journey
            </span>
          </div>
          <LearningPath
            nodes={mockPhysicsJourneyNodes}
            onSelectNode={handleSelectNode}
          />
        </div>
      )}
    </div>
  );
};
