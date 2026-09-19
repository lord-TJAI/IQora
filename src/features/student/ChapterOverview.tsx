import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockChapters } from '@/services/mock/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MasteryBar } from '@/components/learning/MasteryBar';
import { ArrowLeft, Play, Sparkles, BookOpen, ChevronRight } from 'lucide-react';

export const ChapterOverview: React.FC = () => {
  const { chapterId = 'phys-ch2' } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();

  const chapter = mockChapters[chapterId] || mockChapters['phys-ch2'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/student/learn/physics')}
        className="inline-flex items-center gap-2 text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Subject Journey</span>
      </button>

      {/* Chapter Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-900 to-indigo-950 text-white shadow-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
            Physics • Class 12 Chapter 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">{chapter.title}</h1>
          <p className="text-xs sm:text-sm text-purple-200/90 max-w-xl mt-2 leading-relaxed">
            {chapter.description}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[140px]">
          <span className="text-3xl font-black text-white">{chapter.masteryPercentage}%</span>
          <span className="block text-[11px] font-bold text-purple-200 uppercase tracking-wider">
            Chapter Mastery
          </span>
        </div>
      </div>

      {/* Concept Breakdown Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-brand-text-primary">
          Core Concepts & Mastery Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapter.concepts.map((concept) => (
            <Card
              key={concept.id}
              className="p-5 border border-brand-border flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h4 className="text-base font-bold text-brand-text-primary">
                    {concept.name}
                  </h4>
                </div>
                <p className="text-xs text-brand-text-secondary mt-1 leading-relaxed">
                  {concept.description}
                </p>

                <div className="mt-4">
                  <MasteryBar
                    percentage={concept.masteryPercentage}
                    trend={concept.trend}
                    trendValue={concept.trendValue}
                  />
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center justify-between">
                <span className="text-xs text-brand-text-secondary font-medium">
                  {concept.attemptsCount} practice attempts
                </span>
                <Button
                  size="sm"
                  variant={concept.state === 'needs_practice' ? 'primary' : 'secondary'}
                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                  onClick={() => {
                    if (concept.id === 'c-potential') {
                      navigate('/student/lesson/phys-ch2-l3');
                    } else {
                      navigate('/student/practice');
                    }
                  }}
                >
                  {concept.state === 'needs_practice' ? 'Strengthen Now' : 'Practice'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
