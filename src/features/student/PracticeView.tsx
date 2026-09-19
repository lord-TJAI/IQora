import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard } from '@/components/learning/QuestionCard';
import { Question } from '@/types/domain';
import { mockCurrentLesson } from '@/services/mock/mockData';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PracticeView: React.FC = () => {
  const navigate = useNavigate();
  const { addXP, updateMastery } = useAuthStore();

  const questions: Question[] = [
    mockCurrentLesson.interactiveQuestion,
    {
      id: 'q-prac-2',
      subjectId: 'physics',
      topicId: 'phys-ch2',
      conceptId: 'c-potential',
      conceptName: 'Equipotential Surfaces',
      type: 'mcq',
      prompt: 'Work done in moving a test charge q over an equipotential surface between two points separated by distance d is:',
      options: ['Zero', 'q × E × d', 'q / (4πε₀d)', 'Infinite'],
      correctAnswer: 'Zero',
      explanation: 'Since the potential is identical everywhere on an equipotential surface (V_A = V_B), the potential difference ΔV = 0. Therefore, work W = qΔV = 0.',
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
      prompt: 'If the electric potential in a region is given by V = 6x - 8xy² - 8y + 6yz, what is the electric force experienced by a +2 C charge placed at origin (0,0,0)?',
      options: ['20 N', '10 N', '-20 N', '0 N'],
      correctAnswer: '20 N',
      explanation: 'Ex = -∂V/∂x = -(6 - 8y²) = -6 N/C at (0,0). Ey = -∂V/∂y = -(-16xy - 8 + 6z) = 8 N/C at (0,0). Ez = -∂V/∂z = -(6y) = 0. Net field E = √(6² + 8²) = 10 N/C. Force F = qE = 2 × 10 = 20 N.',
      hints: ['Find partial derivatives of V with respect to x, y, and z.'],
      xpReward: 35,
      masteryGain: 8,
      difficulty: 'hard',
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

  const handleAskAi = () => {
    navigate('/student/ai/chat');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/student/home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Practice</span>
        </button>

        <span className="text-xs font-bold text-brand-ai uppercase tracking-wider bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
          Adaptive Practice Mode
        </span>
      </div>

      {!isCompleted ? (
        <QuestionCard
          key={questions[currentIndex].id}
          question={questions[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          onNext={handleNextQuestion}
          onAskAi={handleAskAi}
        />
      ) : (
        /* Practice Finished Summary */
        <div className="text-center p-8 bg-white rounded-3xl border border-brand-border shadow-subtle space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-brand-text-primary">
            Practice Session Complete!
          </h2>
          <p className="text-sm text-brand-text-secondary max-w-sm mx-auto">
            You scored {sessionScore} of {questions.length} correct. Your mastery in{' '}
            <strong className="text-brand-text-primary">Electric Potential</strong> has increased!
          </p>

          <div className="flex items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/student/mastery')}
            >
              View Updated Mastery
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
