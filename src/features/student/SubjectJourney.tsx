import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockSubjects, mockPhysicsJourneyNodes } from '@/services/mock/mockData';
import { LearningPath } from '@/components/learning/LearningPath';
import { LessonNode } from '@/types/domain';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Layers, Sparkles, BookOpen } from 'lucide-react';

export const SubjectJourney: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();

  const currentSubject =
    mockSubjects.find((s) => s.id === subjectId) || mockSubjects[1]; // default to physics

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
    <div className="space-y-6 animate-in fade-in duration-200 max-w-2xl mx-auto">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/student/learn')}
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Subjects</span>
        </button>

        <Button
          size="sm"
          variant="secondary"
          leftIcon={<Layers className="w-3.5 h-3.5 text-brand-ai" />}
          onClick={() => navigate(`/student/learn/${currentSubject.id}/phys-ch2`)}
        >
          Chapter Concepts
        </Button>
      </div>

      {/* Subject Header Banner */}
      <div
        className="p-6 rounded-3xl border-2 shadow-subtle flex items-center justify-between"
        style={{
          backgroundColor: currentSubject.lightColor,
          borderColor: currentSubject.color + '40',
        }}
      >
        <div>
          <span
            className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white"
            style={{ backgroundColor: currentSubject.color }}
          >
            Class 12 {currentSubject.name}
          </span>
          <h1 className="text-2xl font-black text-brand-text-primary mt-2">
            Chapter 1: Electrostatics
          </h1>
          <p className="text-xs font-semibold text-brand-text-secondary mt-1">
            Follow the path to master each concept step-by-step
          </p>
        </div>

        <div className="text-right">
          <span className="text-3xl font-black text-brand-text-primary">
            {currentSubject.overallMastery}%
          </span>
          <span className="block text-[11px] font-extrabold uppercase text-brand-text-secondary tracking-wider">
            Overall Mastery
          </span>
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-white rounded-3xl border border-brand-border shadow-subtle p-4 sm:p-6">
        <div className="text-center pb-2 border-b border-brand-border">
          <span className="text-xs font-bold text-brand-text-secondary uppercase tracking-wider">
            Curved Learning Journey
          </span>
        </div>
        <LearningPath
          nodes={mockPhysicsJourneyNodes}
          onSelectNode={handleSelectNode}
        />
      </div>
    </div>
  );
};
