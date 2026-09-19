import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cbse2026Curriculum } from '@/services/mock/curriculumData';
import { CurriculumIndex } from '@/components/curriculum/CurriculumIndex';
import { SubjectCard } from '@/components/learning/SubjectCard';
import { SubjectId } from '@/types/domain';
import {
  BookOpen,
  Atom,
  Calculator,
  FlaskConical,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const Learn: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'roadmap' | 'subjects'>('roadmap');

  const subjects = Object.values(cbse2026Curriculum.subjects).map((s) => s.info);

  const handleSelectSubject = (subjectId: string) => {
    navigate(`/student/learn/${subjectId}`);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FFC800] text-[#172033] text-xs font-black uppercase tracking-wider">
              CBSE Class XII • 2026–27
            </span>
            <span className="text-xs font-bold text-[#667085]">
              Curriculum-Aware Learning Hub
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight mt-2">
            Class 12 Academic Syllabus & Labs
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-1">
            Explore official CBSE units, chapters, visual simulation labs, and concept mastery
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-[#E6EAF0] shadow-2xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2',
              activeTab === 'roadmap'
                ? 'bg-[#172033] text-white shadow-xs'
                : 'text-[#667085] hover:text-[#172033]'
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Syllabus Roadmap</span>
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2',
              activeTab === 'subjects'
                ? 'bg-[#172033] text-white shadow-xs'
                : 'text-[#667085] hover:text-[#172033]'
            )}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Subject Portals</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Content View */}
      {activeTab === 'roadmap' ? (
        <CurriculumIndex initialSubjectId="physics" />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onContinue={handleSelectSubject}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
