import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockCurrentLesson } from '@/services/mock/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/Card';
import { QuestionCard } from '@/components/learning/QuestionCard';
import { InteractiveCanvas } from '@/components/learning/InteractiveCanvas';
import { useAuthStore } from '@/stores/authStore';
import {
  ArrowLeft,
  Sparkles,
  ChevronRight,
  Zap,
  HelpCircle,
  CheckCircle2,
  BookOpen,
  Share2,
  Bookmark,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const LessonView: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { addXP, updateMastery } = useAuthStore();

  const lesson = mockCurrentLesson;
  const [interactiveDone, setInteractiveDone] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [saved, setSaved] = useState(false);

  const handleInteractiveComplete = () => {
    setInteractiveDone(true);
  };

  const handleFinishLesson = () => {
    addXP(lesson.xpReward);
    updateMastery('physics', 6);
    navigate(`/student/lesson/${lesson.id}/complete`);
  };

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto animate-in fade-in duration-300">
      {/* 1. TOP NAVIGATION & PROGRESS HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:px-6 rounded-3xl border border-[#E6EAF0] shadow-subtle">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/student/learn/physics')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#667085] hover:text-[#172033] bg-[#F7F9FC] hover:bg-[#EEF2F6] px-3.5 py-2 rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Chapter</span>
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#7C3AED] uppercase tracking-wider">
                Physics • Chapter 2
              </span>
              <span className="text-xs font-bold text-slate-400">•</span>
              <span className="text-xs font-bold text-[#172033]">
                Lesson {lesson.lessonNumber} of {lesson.totalLessons}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-[#172033] leading-tight">
              {lesson.title}
            </h1>
          </div>
        </div>

        {/* Right side stats & action */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="flex items-center gap-2 bg-[#FFFBEB] border border-amber-200 px-3 py-1.5 rounded-full">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-xs font-black text-amber-900">
              +{lesson.xpReward} XP
            </span>
          </div>

          <button
            onClick={() => setSaved(!saved)}
            className={cn(
              'p-2 rounded-full border transition-colors',
              saved
                ? 'bg-amber-100 border-amber-300 text-amber-700'
                : 'bg-[#F7F9FC] border-[#E6EAF0] text-[#667085] hover:text-[#172033]'
            )}
            title="Bookmark lesson"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. SPLIT-SCREEN LEARNING STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ===================================================================== */}
        {/* LEFT COLUMN: Interactive Simulation Canvas + Worked Derivations       */}
        {/* ===================================================================== */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* Interactive Simulation Stage */}
          <InteractiveCanvas subject="physics" topic={lesson.title} />

          {/* Lesson Concept & Explanation Card */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-7 shadow-subtle space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-black uppercase tracking-wider">
                Concept Breakdown
              </span>
              <span className="text-xs font-semibold text-[#667085]">
                {lesson.estimatedMinutes} min read
              </span>
            </div>

            <div className="space-y-4">
              {lesson.contentBlocks.map((block) => (
                <div key={block.id} className="space-y-3">
                  {block.title && (
                    <h3 className="text-base sm:text-lg font-black text-[#172033] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
                      {block.title}
                    </h3>
                  )}

                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {block.content}
                  </p>

                  {/* Worked Example Step Breakdown */}
                  {block.exampleProblem && (
                    <div className="mt-4 p-5 rounded-2xl bg-[#F7F9FC] border border-[#E6EAF0] space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#7C3AED] uppercase tracking-wider">
                          Worked Numerical Example:
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">
                          Step-by-step Analysis
                        </span>
                      </div>

                      <p className="text-sm font-bold text-[#172033]">
                        {block.exampleProblem.question}
                      </p>

                      <div className="space-y-2">
                        {block.exampleProblem.steps.map((step, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-[#E6EAF0] text-xs"
                          >
                            <span className="w-5 h-5 rounded-full bg-[#7C3AED] text-white font-black flex items-center justify-center flex-shrink-0 text-[10px]">
                              {idx + 1}
                            </span>
                            <span className="text-slate-700 font-medium leading-relaxed">
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-black border border-emerald-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Final Answer: {block.exampleProblem.answer}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* RIGHT COLUMN: Formula Vault, Live Check & Instant AI Doubts           */}
        {/* ===================================================================== */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          {/* 1. Formula & Derivation Vault */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#667085]">
              <BookOpen className="w-4 h-4 text-[#7C3AED]" />
              <span>Key Formula & Relationships</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-amber-200 text-center font-mono text-base sm:text-lg font-black text-amber-950 shadow-2xs">
              {lesson.contentBlocks[0]?.formula || 'V = (1 / 4πε₀) · (q / r)'}
            </div>

            <div className="text-xs text-[#667085] space-y-1.5 bg-[#F7F9FC] p-3 rounded-xl">
              <div className="flex justify-between font-semibold">
                <span>V = Electric Potential</span>
                <span className="font-mono text-slate-800">[Volts or J/C]</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>q = Source Charge</span>
                <span className="font-mono text-slate-800">[Coulombs]</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>r = Radial Distance</span>
                <span className="font-mono text-slate-800">[Meters]</span>
              </div>
            </div>
          </div>

          {/* 2. Interactive Understanding Check */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669] text-xs font-black uppercase tracking-wider">
                Quick Check
              </span>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                +15 XP
              </span>
            </div>

            <QuestionCard
              question={lesson.interactiveQuestion}
              questionNumber={1}
              totalQuestions={1}
              onNext={handleInteractiveComplete}
              onAskAi={() => navigate('/student/ai?action=explain')}
            />
          </div>

          {/* 3. Instant AI Tutor Assistance Widget */}
          <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] rounded-3xl border border-[#DDD6FE] p-5 shadow-subtle space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-[#7C3AED] flex items-center justify-center font-black shadow-xs text-lg">
                🤖
              </div>
              <div>
                <h4 className="text-xs font-black text-[#172033] uppercase tracking-wider">
                  Stuck on this concept?
                </h4>
                <p className="text-xs text-[#667085]">
                  Ask your AI Tutor for immediate clarity.
                </p>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <button
                onClick={() =>
                  navigate(
                    `/student/ai?action=explain&prompt=${encodeURIComponent(
                      'Explain why electric potential decreases in the direction of the electric field'
                    )}`
                  )
                }
                className="w-full text-left text-xs font-bold text-[#7C3AED] bg-white hover:bg-slate-50 p-2.5 rounded-xl transition-colors border border-purple-100 flex items-center justify-between"
              >
                <span>"Why does potential drop along field lines?"</span>
                <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
              </button>

              <button
                onClick={() =>
                  navigate(
                    `/student/ai?action=solve&prompt=${encodeURIComponent(
                      'Provide a tricky Class 12 CBSE board exam question on electric potential difference'
                    )}`
                  )
                }
                className="w-full text-left text-xs font-bold text-[#7C3AED] bg-white hover:bg-slate-50 p-2.5 rounded-xl transition-colors border border-purple-100 flex items-center justify-between"
              >
                <span>"Give me a CBSE board numerical on this"</span>
                <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
              </button>
            </div>
          </div>

          {/* 4. Complete Lesson Button */}
          <div className="pt-2">
            <Button
              size="lg"
              variant="primary"
              className="w-full py-4 rounded-2xl bg-[#FFC800] hover:bg-[#E6B400] text-[#172033] font-black shadow-brand border-none text-sm"
              rightIcon={<ChevronRight className="w-4 h-4 stroke-[3]" />}
              onClick={handleFinishLesson}
            >
              COMPLETE LESSON & CLAIM XP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
