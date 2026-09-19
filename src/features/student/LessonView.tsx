import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findConceptAcrossSubjects } from '@/data/curriculum';
import { ActivityRenderer } from '@/components/learning/registry/ActivityRenderer';
import { QuestionCard } from '@/components/learning/QuestionCard';
import { Question } from '@/types/domain';
import { useAuthStore } from '@/stores/authStore';
import {
  ArrowLeft,
  ChevronRight,
  Zap,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Award,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const LessonView: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { addXP, updateMastery } = useAuthStore();

  // Find concept across official curriculum
  const resolved = findConceptAcrossSubjects(lessonId || 'phys-c-potential-dipole');
  const subject = resolved?.subject;
  const chapter = resolved?.chapter;
  const concept = resolved?.concept;

  const [interactiveDone, setInteractiveDone] = useState(false);

  if (!concept || !chapter || !subject) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm font-bold text-[#667085]">Concept not found in curriculum.</p>
        <button
          onClick={() => navigate('/student/learn')}
          className="px-4 py-2 bg-[#172033] text-white rounded-xl text-xs font-bold"
        >
          Return to Subjects
        </button>
      </div>
    );
  }

  // Convert PracticeQuestion to Question for QuestionCard
  const practiceQ = concept.practiceQuestions[0];
  const questionForCard: Question = practiceQ
    ? {
        ...practiceQ,
        subjectId: subject.id,
        topicId: chapter.id,
        xpReward: 30,
        masteryGain: 6,
      }
    : {
        id: 'q-generic-1',
        subjectId: subject.id,
        topicId: chapter.id,
        conceptId: concept.id,
        conceptName: concept.name,
        type: 'mcq',
        prompt: `Verify your understanding of ${concept.name}:`,
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Review the key takeaways on the right.',
        hints: ['Check the core formula.'],
        xpReward: 20,
        masteryGain: 4,
        difficulty: 'easy',
      };

  const handleFinishLesson = () => {
    addXP(50);
    updateMastery(subject.id, 5);
    navigate(`/student/learn/${subject.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* 1. Minimal Header */}
      <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-[#E6EAF0] shadow-xs">
        <button
          onClick={() => navigate(`/student/learn/${subject.id}`)}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#667085] hover:text-[#172033] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to {subject.name}</span>
        </button>

        <div className="text-center">
          <span
            className="text-[11px] font-black uppercase tracking-wider block"
            style={{ color: subject.color }}
          >
            {subject.name} • {chapter.title}
          </span>
          <h1 className="text-sm sm:text-base font-black text-[#172033] leading-tight">
            {concept.name}
          </h1>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full text-xs font-black">
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>+50 XP</span>
        </div>
      </div>

      {/* 2. Visual-First Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Visual Stage (65%) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Subject-Specific Activity Engine */}
          <ActivityRenderer
            subjectId={subject.id}
            activityType={concept.activityType}
            concept={concept}
            topic={concept.name}
          />

          {/* Quick Reflection / Question */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-black uppercase tracking-wider block"
                style={{ color: subject.color }}
              >
                Concept Mastery Check
              </span>
              <span className="text-[11px] font-bold text-[#667085]">
                1 Question • Adaptive
              </span>
            </div>

            <QuestionCard
              question={questionForCard}
              questionNumber={1}
              totalQuestions={1}
              onNext={() => setInteractiveDone(true)}
              onAskAi={() => navigate('/student/ai?action=explain')}
            />
          </div>
        </div>

        {/* Concise Side Context (35%) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Core Concept Takeaways */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#667085]">
                Core Takeaways
              </h3>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                style={{ backgroundColor: subject.lightColor, color: subject.color }}
              >
                CBSE Class 12
              </span>
            </div>

            {/* Learning Objective */}
            <div className="text-xs font-medium text-[#172033] bg-[#F7F9FC] p-3 rounded-2xl border border-slate-200">
              <strong className="block text-[11px] font-black uppercase text-[#667085] mb-1">
                Objective:
              </strong>
              {concept.learningObjective}
            </div>

            {/* Key Bullet Points */}
            {concept.keyPoints && concept.keyPoints.length > 0 && (
              <div className="space-y-2 text-xs text-[#172033] leading-relaxed">
                {concept.keyPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: subject.color }}
                    />
                    <p>{pt}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Formula Callout */}
            {concept.keyFormula && (
              <div
                className="p-3.5 rounded-2xl text-center font-mono text-xs sm:text-sm font-black border"
                style={{
                  backgroundColor: subject.lightColor,
                  borderColor: subject.color + '40',
                  color: '#172033',
                }}
              >
                {concept.keyFormula}
              </div>
            )}
          </div>

          {/* Complete Lesson CTA */}
          <button
            onClick={handleFinishLesson}
            className="w-full py-4 px-6 rounded-2xl bg-[#FFC800] hover:bg-[#E6B400] text-[#172033] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-brand transition-all"
          >
            <span>COMPLETE CONCEPT & RETURN</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
