import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockCurrentLesson } from '@/services/mock/mockData';
import { QuestionCard } from '@/components/learning/QuestionCard';
import { InteractiveCanvas } from '@/components/learning/InteractiveCanvas';
import { useAuthStore } from '@/stores/authStore';
import {
  ArrowLeft,
  ChevronRight,
  Zap,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const LessonView: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { addXP, updateMastery } = useAuthStore();

  const lesson = mockCurrentLesson;
  const [interactiveDone, setInteractiveDone] = useState(false);

  const handleFinishLesson = () => {
    addXP(lesson.xpReward);
    updateMastery('physics', 6);
    navigate(`/student/lesson/${lesson.id}/complete`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* 1. Minimal Header */}
      <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-[#E6EAF0] shadow-xs">
        <button
          onClick={() => navigate('/student/learn/physics')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#667085] hover:text-[#172033] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Lesson</span>
        </button>

        <div className="text-center">
          <span className="text-[11px] font-black text-[#7C4DFF] uppercase tracking-wider block">
            Physics • Lesson {lesson.lessonNumber} of {lesson.totalLessons}
          </span>
          <h1 className="text-sm sm:text-base font-black text-[#172033] leading-tight">
            {lesson.title}
          </h1>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full text-xs font-black">
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>+{lesson.xpReward} XP</span>
        </div>
      </div>

      {/* 2. Visual-First Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Visual Stage (65%) */}
        <div className="lg:col-span-8 space-y-4">
          <InteractiveCanvas subject="physics" topic={lesson.title} />

          {/* Quick Reflection / Question */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 shadow-subtle space-y-3">
            <span className="text-xs font-black text-[#7C4DFF] uppercase tracking-wider block">
              Quick Concept Check:
            </span>
            <QuestionCard
              question={lesson.interactiveQuestion}
              questionNumber={1}
              totalQuestions={1}
              onNext={() => setInteractiveDone(true)}
              onAskAi={() => navigate('/student/ai?action=explain')}
            />
          </div>
        </div>

        {/* Concise Side Context (35%) */}
        <div className="lg:col-span-4 space-y-4">
          {/* 2-3 Short Bullet Explanation */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 shadow-subtle space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#667085]">
              Core Concept
            </h3>

            <div className="space-y-2.5 text-xs text-[#172033] leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C4DFF] mt-1.5 flex-shrink-0" />
                <p>
                  <strong>Electric potential (V)</strong> is work done per unit positive charge in bringing a test charge from infinity to that point against electrostatic forces.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C4DFF] mt-1.5 flex-shrink-0" />
                <p>
                  <strong>Potential Gradient:</strong> Electric field relates to potential by <span className="font-mono font-bold text-amber-800">E = −dV/dr</span>.
                </p>
              </div>
            </div>

            {/* Formula Callout */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-center font-mono text-sm font-black text-amber-950">
              V = (1 / 4πε₀) · (q / r)
            </div>
          </div>

          {/* Complete Lesson CTA */}
          <button
            onClick={handleFinishLesson}
            className="w-full py-4 px-6 rounded-2xl bg-[#FFC800] hover:bg-[#E6B400] text-[#172033] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-brand transition-all"
          >
            <span>COMPLETE LESSON</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
