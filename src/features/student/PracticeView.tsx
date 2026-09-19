import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard } from '@/components/learning/QuestionCard';
import { Question, SubjectId } from '@/types/domain';
import { mockCurrentLesson } from '@/services/mock/mockData';
import { cbse2026Curriculum } from '@/services/mock/curriculumData';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Clock,
  BookOpen,
  FileText,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/utils/cn';

export const PracticeView: React.FC = () => {
  const navigate = useNavigate();
  const { addXP, updateMastery } = useAuthStore();
  const [practiceMode, setPracticeMode] = useState<'adaptive' | 'exam_mode'>('adaptive');
  const [examSubject, setExamSubject] = useState<SubjectId>('physics');
  const [examTimerMinutes, setExamTimerMinutes] = useState<number>(25);
  const [formulaDrawerOpen, setFormulaDrawerOpen] = useState<boolean>(false);

  const questions: Question[] = [
    mockCurrentLesson.interactiveQuestion,
    {
      id: 'q-prac-2',
      subjectId: 'physics',
      topicId: 'phys-ch2',
      conceptId: 'c-potential',
      conceptName: 'Equipotential Surfaces',
      type: 'mcq',
      prompt:
        'Work done in moving a test charge q over an equipotential surface between two points separated by distance d is:',
      options: ['Zero', 'q × E × d', 'q / (4πε₀d)', 'Infinite'],
      correctAnswer: 'Zero',
      explanation:
        'Since the potential is identical everywhere on an equipotential surface (V_A = V_B), the potential difference ΔV = 0. Therefore, work W = qΔV = 0.',
      hints: ['Definition: An equipotential surface has equal potential at every point.'],
      xpReward: 20,
      masteryGain: 5,
      difficulty: 'easy',
    },
    {
      id: 'q-prac-3',
      subjectId: 'physics',
      topicId: 'phys-ch2',
      conceptId: 'c-potential',
      conceptName: 'Potential Gradient',
      type: 'mcq',
      prompt:
        'If the electric potential in a region is given by V = 6x - 8xy² - 8y + 6yz, what is the electric force experienced by a +2 C charge placed at origin (0,0,0)?',
      options: ['20 N', '10 N', '-20 N', '0 N'],
      correctAnswer: '20 N',
      explanation:
        'Ex = -∂V/∂x = -(6 - 8y²) = -6 N/C at (0,0). Ey = -∂V/∂y = -(-16xy - 8 + 6z) = 8 N/C at (0,0). Ez = -∂V/∂z = -(6y) = 0. Net field E = √(6² + 8²) = 10 N/C. Force F = qE = 2 × 10 = 20 N.',
      hints: ['Find partial derivatives of V with respect to x, y, and z.'],
      xpReward: 35,
      masteryGain: 8,
      difficulty: 'hard',
    },
    {
      id: 'q-prac-4',
      subjectId: 'physics',
      topicId: 'phys-ch2',
      conceptId: 'c-potential',
      conceptName: 'Assertion-Reason: Electrostatics',
      type: 'mcq',
      prompt:
        'Assertion (A): Electric field is always perpendicular to equipotential surfaces.\nReason (R): Work done by electric field in moving charge along equipotential surface is zero.',
      options: [
        'Both (A) and (R) are true and (R) is the correct explanation of (A)',
        'Both (A) and (R) are true but (R) is NOT the correct explanation of (A)',
        '(A) is true but (R) is false',
        '(A) is false but (R) is true',
      ],
      correctAnswer: 'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      explanation:
        'Since dW = F · dr = q(E · dr) = q E dr cos θ = 0, and neither E nor dr is zero, cos θ must be 0, meaning θ = 90°. Hence E is always perpendicular to the surface.',
      hints: ['Consider the dot product between force vector and displacement vector.'],
      xpReward: 30,
      masteryGain: 7,
      difficulty: 'medium',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNextQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      setSessionScore((s) => s + 1);
      addXP(questions[currentIndex].xpReward);
      updateMastery('physics', questions[currentIndex].masteryGain);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 70, spread: 60 });
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300">
      {/* 1. Top Navigation & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/student/home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#667085] hover:text-[#172033]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Practice</span>
        </button>

        <div className="flex items-center bg-white p-1 rounded-2xl border border-[#E6EAF0] shadow-2xs self-start sm:self-auto">
          <button
            onClick={() => setPracticeMode('adaptive')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5',
              practiceMode === 'adaptive'
                ? 'bg-[#172033] text-white shadow-xs'
                : 'text-[#667085] hover:text-[#172033]'
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Adaptive Workout</span>
          </button>

          <button
            onClick={() => setPracticeMode('exam_mode')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5',
              practiceMode === 'exam_mode'
                ? 'bg-[#172033] text-white shadow-xs'
                : 'text-[#667085] hover:text-[#172033]'
            )}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>CBSE Board Exam Mode</span>
          </button>
        </div>
      </div>

      {/* 2. Board Exam Mode Header Banner (When Active) */}
      {practiceMode === 'exam_mode' && (
        <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-brand flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                Exam Mode
              </span>
              <span className="text-xs text-slate-400">Class XII Official Pattern</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black mt-1">
              Timed Board-Style Practice
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Includes MCQs, Assertion-Reason, and numerical reasoning questions
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFormulaDrawerOpen(!formulaDrawerOpen)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-sky-400 border border-slate-700 transition-colors"
            >
              Formula Sheet
            </button>

            <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 font-mono text-sm font-bold text-amber-400">
              <Clock className="w-4 h-4" />
              <span>{examTimerMinutes}:00</span>
            </div>
          </div>
        </div>
      )}

      {/* Formula Sheet Popover / Drawer */}
      {formulaDrawerOpen && (
        <div className="p-4 rounded-2xl bg-white border border-[#E6EAF0] shadow-elevated space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-black uppercase text-[#7C4DFF]">
              Electrostatics Formula Quick Reference
            </span>
            <button
              onClick={() => setFormulaDrawerOpen(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-700">
            <div className="p-2 bg-slate-50 rounded-lg">F = (1/4πε₀) · (q₁q₂ / r²)</div>
            <div className="p-2 bg-slate-50 rounded-lg">E = -dV/dr</div>
            <div className="p-2 bg-slate-50 rounded-lg">V = (1/4πε₀) · (q / r)</div>
            <div className="p-2 bg-slate-50 rounded-lg">W = q(V_final − V_initial)</div>
          </div>
        </div>
      )}

      {/* 3. Question Card or Summary */}
      {!isCompleted ? (
        <QuestionCard
          key={questions[currentIndex].id}
          question={questions[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          onNext={handleNextQuestion}
          onAskAi={() => navigate('/student/ai?action=explain')}
        />
      ) : (
        /* Practice Finished Summary */
        <div className="text-center p-8 bg-white rounded-3xl border border-[#E6EAF0] shadow-subtle space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[#172033]">
            Practice Session Complete!
          </h2>
          <p className="text-sm text-[#667085] max-w-sm mx-auto">
            You scored {sessionScore} of {questions.length} correct. Your mastery in{' '}
            <strong className="text-[#172033]">Electric Potential & Gradient</strong> has increased!
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              className="bg-[#172033] text-white hover:bg-slate-800"
              onClick={() => navigate('/student/learn')}
            >
              Back to Curriculum
            </Button>
            <Button
              variant="secondary"
              size="md"
              leftIcon={<RotateCcw className="w-4 h-4" />}
              onClick={() => {
                setCurrentIndex(0);
                setSessionScore(0);
                setIsCompleted(false);
              }}
            >
              Practice Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
