import React from 'react';
import { Subject } from '@/types/domain';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calculator, Zap, FlaskConical, BookOpen, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SubjectCardProps {
  subject: Subject;
  onContinue: (subjectId: string) => void;
  className?: string;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  onContinue,
  className,
}) => {
  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-6 h-6 text-blue-600" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-purple-600" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6 text-emerald-600" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-orange-600" />;
      default:
        return <BookOpen className="w-6 h-6 text-slate-600" />;
    }
  };

  const getProgressColor = (id: string) => {
    switch (id) {
      case 'mathematics':
        return 'bg-blue-600';
      case 'physics':
        return 'bg-purple-600';
      case 'chemistry':
        return 'bg-emerald-500';
      case 'english':
        return 'bg-orange-500';
      default:
        return 'bg-brand-primary';
    }
  };

  return (
    <Card
      variant="interactive"
      onClick={() => onContinue(subject.id)}
      className={cn('flex flex-col justify-between p-5 border-l-4 group', className)}
      style={{ borderLeftColor: subject.color }}
    >
      <div>
        <div className="flex items-center justify-between">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-105"
            style={{ backgroundColor: subject.lightColor }}
          >
            {getSubjectIcon(subject.iconName)}
          </div>
          <div className="text-right">
            <span className="text-xl font-extrabold text-brand-text-primary tracking-tight">
              {subject.overallMastery}%
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary">
              Mastery
            </span>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold text-brand-text-primary group-hover:text-blue-900 transition-colors">
            {subject.name}
          </h3>
          <p className="text-xs text-brand-text-secondary line-clamp-2 mt-1 leading-relaxed">
            {subject.description}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-brand-border/60">
        <div className="flex items-center justify-between text-xs font-semibold text-brand-text-secondary mb-1.5">
          <span>{subject.completedLessons} of {subject.totalLessons} lessons</span>
          <span>{Math.round((subject.completedLessons / subject.totalLessons) * 100)}%</span>
        </div>
        <ProgressBar
          value={subject.completedLessons}
          max={subject.totalLessons}
          color={getProgressColor(subject.id)}
          height="sm"
        />

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-brand-text-secondary">
            {subject.totalChapters} Chapters
          </span>
          <Button
            size="sm"
            variant="secondary"
            rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
            onClick={(e) => {
              e.stopPropagation();
              onContinue(subject.id);
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </Card>
  );
};
