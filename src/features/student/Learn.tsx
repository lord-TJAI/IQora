import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockSubjects } from '@/services/mock/mockData';
import { SubjectCard } from '@/components/learning/SubjectCard';

export const Learn: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectSubject = (subjectId: string) => {
    navigate(`/student/learn/${subjectId}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text-primary tracking-tight">
          Learn & Curriculum
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Explore Class 12 syllabus, interactive concept journeys, and adaptive lessons
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {mockSubjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onContinue={handleSelectSubject}
          />
        ))}
      </div>
    </div>
  );
};
