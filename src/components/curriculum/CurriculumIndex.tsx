import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cbse2026Curriculum } from '@/services/mock/curriculumData';
import { SubjectId, Chapter, Concept } from '@/types/domain';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  Lock,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Play,
  Calculator,
  Atom,
  FlaskConical,
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface CurriculumIndexProps {
  initialSubjectId?: SubjectId;
  onSelectConcept?: (concept: Concept) => void;
}

export const CurriculumIndex: React.FC<CurriculumIndexProps> = ({
  initialSubjectId = 'physics',
  onSelectConcept,
}) => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>(initialSubjectId);
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>('phys-u1');
  const [filterState, setFilterState] = useState<'all' | 'in_progress' | 'completed' | 'needs_practice'>('all');

  const subjectData = cbse2026Curriculum.subjects[selectedSubject];
  const { info, units } = subjectData;

  const handleToggleUnit = (unitId: string) => {
    setExpandedUnitId(expandedUnitId === unitId ? null : unitId);
  };

  const getConceptStatusIcon = (state: string) => {
    switch (state) {
      case 'mastered':
        return <CheckCircle2 className="w-4 h-4 text-[#10B981] stroke-[2.5]" />;
      case 'strong':
        return <CheckCircle2 className="w-4 h-4 text-[#3B82F6] stroke-[2.5]" />;
      case 'learning':
        return <span className="w-3.5 h-3.5 rounded-full bg-[#FFC800] ring-4 ring-amber-100 block" />;
      case 'needs_practice':
        return <AlertCircle className="w-4 h-4 text-[#F59E0B]" />;
      case 'locked':
      default:
        return <Lock className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getConceptStatusLabel = (state: string) => {
    switch (state) {
      case 'mastered':
        return <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Mastered</span>;
      case 'strong':
        return <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">Strong</span>;
      case 'learning':
        return <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">In Progress</span>;
      case 'needs_practice':
        return <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">Needs Practice</span>;
      case 'locked':
      default:
        return <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Upcoming</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Subject Selector & Overall Progress Bar */}
      <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#172033] text-white text-[10px] font-black tracking-wider uppercase">
                CBSE Class XII • 2026–27
              </span>
              <span className="text-xs font-bold text-[#667085]">
                Official Curriculum Index
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#172033] mt-1.5">
              Syllabus Roadmap & Mastery Architecture
            </h2>
          </div>

          {/* Subject Switcher */}
          <div className="flex items-center gap-2 bg-[#F7F9FC] p-1.5 rounded-2xl border border-[#E6EAF0] overflow-x-auto">
            {(['mathematics', 'physics', 'chemistry', 'english'] as SubjectId[]).map((sId) => {
              const sInfo = cbse2026Curriculum.subjects[sId].info;
              const isSelected = selectedSubject === sId;
              return (
                <button
                  key={sId}
                  onClick={() => {
                    setSelectedSubject(sId);
                    setExpandedUnitId(cbse2026Curriculum.subjects[sId].units[0]?.id || null);
                  }}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap',
                    isSelected
                      ? 'bg-white text-[#172033] shadow-xs'
                      : 'text-[#667085] hover:text-[#172033]'
                  )}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: sInfo.color }}
                  />
                  <span>{sInfo.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Subject Overview Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#F0F2F5]">
          <div className="p-3.5 rounded-2xl bg-[#F7F9FC] border border-[#E6EAF0]">
            <span className="text-[11px] font-bold text-[#667085] uppercase block">
              Syllabus Mastery
            </span>
            <span className="text-xl font-black text-[#172033] mt-0.5 block">
              {info.overallMastery}%
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F9FC] border border-[#E6EAF0]">
            <span className="text-[11px] font-bold text-[#667085] uppercase block">
              Lessons Completed
            </span>
            <span className="text-xl font-black text-[#172033] mt-0.5 block">
              {info.completedLessons} / {info.totalLessons}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F9FC] border border-[#E6EAF0]">
            <span className="text-[11px] font-bold text-[#667085] uppercase block">
              Units & Chapters
            </span>
            <span className="text-xl font-black text-[#172033] mt-0.5 block">
              {units.length} Units • {info.totalChapters} Ch.
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F9FC] border border-[#E6EAF0]">
            <span className="text-[11px] font-bold text-[#667085] uppercase block">
              Current Target
            </span>
            <span className="text-xs font-bold text-[#7C4DFF] mt-1.5 block truncate">
              {units[0]?.chapters[1]?.title || 'Electrostatic Potential'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Unit & Chapter Hierarchy */}
      <div className="space-y-4">
        {units.map((unit) => {
          const isExpanded = expandedUnitId === unit.id;
          return (
            <div
              key={unit.id}
              className="bg-white rounded-3xl border border-[#E6EAF0] shadow-subtle overflow-hidden transition-all"
            >
              {/* Unit Header Bar */}
              <div
                onClick={() => handleToggleUnit(unit.id)}
                className="p-5 sm:px-6 cursor-pointer flex items-center justify-between gap-4 hover:bg-[#F7F9FC]/80 transition-colors select-none"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#F7F9FC] border border-[#E6EAF0] flex items-center justify-center font-black text-sm text-[#172033]">
                    U{unit.unitNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-[#667085]">
                        Unit {unit.unitNumber} • {unit.marksWeightage ? `${unit.marksWeightage} Marks` : 'CBSE Unit'}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-[#172033]">
                      {unit.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-xs font-black text-[#172033]">
                      {unit.masteryPercentage}% Mastery
                    </span>
                    <span className="text-[11px] text-[#667085]">
                      {unit.completedLessonsCount} / {unit.totalLessonsCount} Lessons
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-[#F7F9FC] flex items-center justify-center text-[#667085]">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Unit Chapters & Concepts (Expanded) */}
              {isExpanded && (
                <div className="p-5 sm:p-6 border-t border-[#E6EAF0] bg-[#FAFBFC] space-y-6">
                  {unit.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="bg-white rounded-2xl border border-[#E6EAF0] p-4 sm:p-5 space-y-4 shadow-2xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[11px] font-black text-[#667085] uppercase tracking-wider">
                            Chapter {chapter.order}
                          </span>
                          <h4 className="text-sm sm:text-base font-black text-[#172033]">
                            {chapter.title}
                          </h4>
                          <p className="text-xs text-[#667085] mt-0.5">
                            {chapter.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-[#172033]">
                            {chapter.masteryPercentage}% Chapter Mastery
                          </span>
                          <button
                            onClick={() => navigate(`/student/learn/${selectedSubject}/${chapter.id}`)}
                            className="text-xs font-black text-[#4F7CFF] hover:text-blue-700 flex items-center gap-1"
                          >
                            <span>Open Chapter</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Concepts List */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block">
                          Core Concepts in this Chapter:
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {chapter.concepts.map((concept) => (
                            <div
                              key={concept.id}
                              className="p-3.5 rounded-xl border border-[#E6EAF0] bg-[#F7F9FC] hover:bg-white hover:border-[#D0D5DD] transition-all flex flex-col justify-between gap-2.5 group"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-start gap-2.5">
                                  <div className="mt-0.5">{getConceptStatusIcon(concept.state)}</div>
                                  <div>
                                    <h5 className="text-xs font-bold text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                                      {concept.name}
                                    </h5>
                                    <p className="text-[11px] text-[#667085] mt-0.5 leading-relaxed">
                                      {concept.description}
                                    </p>
                                  </div>
                                </div>
                                {getConceptStatusLabel(concept.state)}
                              </div>

                              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px]">
                                <div className="flex items-center gap-2 text-[#667085]">
                                  <span>Mastery: {concept.masteryPercentage}%</span>
                                  <span>•</span>
                                  <span>{concept.attemptsCount} attempts</span>
                                </div>

                                <button
                                  onClick={() => navigate(`/student/lesson/phys-ch2-l3`)}
                                  className="font-bold text-[#4F7CFF] hover:underline flex items-center gap-1"
                                >
                                  <span>Learn</span>
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
