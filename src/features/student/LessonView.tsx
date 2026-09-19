import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockCurrentLesson } from '@/services/mock/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/Card';
import { QuestionCard } from '@/components/learning/QuestionCard';
import { useAuthStore } from '@/stores/authStore';
import { ArrowLeft, BookOpen, Sparkles, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export const LessonView: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { addXP, updateMastery } = useAuthStore();

  const lesson = mockCurrentLesson;
  const [interactiveDone, setInteractiveDone] = useState(false);

  const handleInteractiveComplete = () => {
    setInteractiveDone(true);
  };

  const handleFinishLesson = () => {
    addXP(lesson.xpReward);
    updateMastery('physics', 6);
    navigate(`/student/lesson/${lesson.id}/complete`);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
      {/* Top Header & Progress */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/student/learn/physics')}
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Lesson</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-brand-text-secondary">
            Lesson {lesson.lessonNumber} of {lesson.totalLessons}
          </span>
          <div className="w-24">
            <ProgressBar
              value={lesson.lessonNumber}
              max={lesson.totalLessons}
              height="sm"
              color="bg-brand-primary"
            />
          </div>
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-brand-border shadow-subtle">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-brand-ai text-xs font-bold">
            Physics • Class 12
          </span>
          <span className="text-xs font-bold text-yellow-900 bg-yellow-100 px-2 py-0.5 rounded-full">
            +{lesson.xpReward} XP
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary">
          {lesson.title}
        </h1>
        <p className="text-xs sm:text-sm text-brand-text-secondary mt-2 leading-relaxed">
          <strong className="text-brand-text-primary">Objective: </strong>
          {lesson.objective}
        </p>
      </div>

      {/* Lesson Content Blocks */}
      <div className="space-y-5">
        {lesson.contentBlocks.map((block) => (
          <Card key={block.id} className="p-6 border border-brand-border space-y-3">
            {block.title && (
              <h3 className="text-base sm:text-lg font-bold text-brand-text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                {block.title}
              </h3>
            )}

            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {block.content}
            </p>

            {/* Formula Block */}
            {block.formula && (
              <div className="my-3 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-center font-mono text-base font-bold text-amber-950">
                {block.formula}
              </div>
            )}

            {/* Step-by-Step Example */}
            {block.exampleProblem && (
              <div className="mt-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <span className="text-xs font-bold text-brand-ai uppercase tracking-wider block">
                  Worked Example Problem:
                </span>
                <p className="text-sm font-semibold text-brand-text-primary">
                  {block.exampleProblem.question}
                </p>

                <div className="space-y-1.5 pl-2 border-l-2 border-purple-300">
                  {block.exampleProblem.steps.map((step, idx) => (
                    <div key={idx} className="text-xs text-slate-600 flex gap-2">
                      <span className="font-bold text-brand-ai">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  Answer: {block.exampleProblem.answer}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Interactive Check Section */}
      <div className="pt-4">
        <div className="text-center mb-4">
          <span className="px-3 py-1 rounded-full bg-purple-100 text-brand-ai text-xs font-extrabold uppercase tracking-wider">
            Quick Understanding Check
          </span>
          <h3 className="text-lg font-bold text-brand-text-primary mt-1">
            Test what you just learned
          </h3>
        </div>

        <QuestionCard
          question={lesson.interactiveQuestion}
          questionNumber={1}
          totalQuestions={1}
          onNext={handleInteractiveComplete}
          onAskAi={() => navigate('/student/ai/chat')}
        />
      </div>

      {/* Bottom Completion Action */}
      <div className="pt-4 flex justify-end">
        <Button
          size="lg"
          variant="primary"
          className="w-full sm:w-auto shadow-brand"
          rightIcon={<ChevronRight className="w-4 h-4" />}
          onClick={handleFinishLesson}
        >
          COMPLETE LESSON & EARN XP
        </Button>
      </div>
    </div>
  );
};
