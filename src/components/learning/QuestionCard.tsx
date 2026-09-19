import React, { useState } from 'react';
import { Question } from '@/types/domain';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, HelpCircle, Sparkles, Lightbulb, Bot, RotateCcw, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import confetti from 'canvas-confetti';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onNext: (isCorrect: boolean) => void;
  onAskAi?: (question: Question) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onNext,
  onAskAi,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleCheck = () => {
    if (!selectedOption) return;
    const correct = selectedOption === String(question.correctAnswer);
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const handleTryAgain = () => {
    setIsAnswered(false);
    setSelectedOption(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Progress & Header */}
      <div className="flex items-center justify-between text-xs font-bold text-brand-text-secondary">
        <span>
          Question <span className="text-brand-text-primary">{questionNumber}</span> of {totalQuestions}
        </span>
        <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
          +{question.xpReward} XP
        </span>
      </div>

      <Card className="p-5 sm:p-7">
        {/* Concept Chip */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-brand-text-secondary mb-4">
          <HelpCircle className="w-3.5 h-3.5 text-brand-ai" />
          <span>{question.conceptName}</span>
        </div>

        {/* Prompt */}
        <h3 className="text-base sm:text-lg font-bold text-brand-text-primary leading-relaxed">
          {question.prompt}
        </h3>

        {/* Options */}
        <div className="mt-6 space-y-3">
          {question.options?.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isAnswerOptionCorrect = option === String(question.correctAnswer);

            let optionStyle = 'bg-white border-brand-border hover:border-slate-400 text-brand-text-primary';

            if (isAnswered) {
              if (isAnswerOptionCorrect) {
                optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
              } else if (isSelected && !isCorrect) {
                optionStyle = 'bg-amber-50 border-amber-400 text-amber-900';
              } else {
                optionStyle = 'opacity-50 border-brand-border bg-slate-50';
              }
            } else if (isSelected) {
              optionStyle = 'bg-brand-primary-light border-brand-primary text-brand-text-primary font-bold shadow-xs';
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => setSelectedOption(option)}
                className={cn(
                  'w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between text-sm sm:text-base font-medium',
                  optionStyle
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>
                {isAnswered && isAnswerOptionCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Hint Display */}
        {showHint && question.hints && question.hints.length > 0 && (
          <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Hint:</span>
            </div>
            {question.hints.map((hint, i) => (
              <p key={i} className="pl-5 leading-relaxed">{hint}</p>
            ))}
          </div>
        )}

        {/* Feedback Area */}
        {isAnswered && (
          <div
            className={cn(
              'mt-6 p-4 rounded-2xl border transition-all animate-in fade-in',
              isCorrect ? 'bg-emerald-50/80 border-emerald-300' : 'bg-amber-50/80 border-amber-300'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="font-extrabold text-emerald-900 text-base">Correct!</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      +{question.xpReward} XP
                    </span>
                    <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                      Mastery +{question.masteryGain}%
                    </span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-5 h-5 text-amber-600" />
                    <span className="font-extrabold text-amber-900 text-base">Not quite.</span>
                  </>
                )}
              </div>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {question.explanation}
            </p>

            {/* In correct feedback buttons */}
            {!isCorrect && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<Lightbulb className="w-3.5 h-3.5 text-amber-600" />}
                  onClick={() => setShowHint(true)}
                >
                  Show Hint
                </Button>
                {onAskAi && (
                  <Button
                    size="sm"
                    variant="ai"
                    leftIcon={<Bot className="w-3.5 h-3.5" />}
                    onClick={() => onAskAi(question)}
                  >
                    Ask AI
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="secondary"
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                  onClick={handleTryAgain}
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-brand-border/60">
          {!isAnswered ? (
            <Button
              onClick={handleCheck}
              disabled={!selectedOption}
              variant="primary"
              size="lg"
              className="w-full"
            >
              CHECK
            </Button>
          ) : (
            <Button
              onClick={() => onNext(isCorrect)}
              variant="primary"
              size="lg"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              NEXT
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
