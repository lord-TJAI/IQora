import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { studentService } from '@/services/studentService';
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';

export const TestInterface: React.FC = () => {
  const { testId = 'test-1' } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 mins
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  useEffect(() => {
    studentService.getTest(testId).then((res) => {
      if (res?.questions) setQuestions(res.questions);
    });

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [testId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];
  const selectedAnswer = currentQ ? answers[currentQ.id] : undefined;

  const handleSelectOption = (option: string) => {
    if (!currentQ) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: option }));
  };

  const handleFinalSubmit = async () => {
    const attempt = await studentService.submitTest(testId, answers);
    navigate(`/student/result/${attempt.id}`);
  };

  if (!currentQ) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 rounded-full border-4 border-brand-primary border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-brand-text-secondary mt-2">Loading test environment...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-in fade-in duration-200">
      {/* Top Test Header */}
      <div className="bg-white p-4 rounded-2xl border border-brand-border flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-brand-text-secondary">
            Question <span className="text-brand-text-primary font-black">{currentIndex + 1}</span> of {questions.length}
          </span>
        </div>

        {/* Clean, Non-Terrifying Timer (Section 32) */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-mono font-bold text-brand-text-primary">
          <Clock className="w-4 h-4 text-brand-ai" />
          <span>{formatTime(timeLeft)} remaining</span>
        </div>

        <button
          onClick={() => setShowExitConfirm(true)}
          className="text-xs font-bold text-rose-600 hover:underline"
        >
          Exit
        </button>
      </div>

      <ProgressBar
        value={currentIndex + 1}
        max={questions.length}
        height="sm"
        color="bg-brand-primary"
      />

      {/* Main Question Card */}
      <Card className="p-6 sm:p-8 border border-brand-border space-y-6">
        <div>
          <span className="text-xs font-bold text-brand-ai uppercase tracking-wider block mb-2">
            {currentQ.conceptName}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-brand-text-primary leading-relaxed">
            {currentQ.prompt}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options?.map((opt: string, idx: number) => {
            const isSelected = selectedAnswer === opt;
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt)}
                className={cn(
                  'w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 text-sm font-medium',
                  isSelected
                    ? 'border-brand-primary bg-yellow-50/60 font-bold text-brand-text-primary shadow-xs'
                    : 'border-brand-border bg-white hover:border-slate-300 text-brand-text-primary'
                )}
              >
                <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation & Question Palette */}
        <div className="pt-4 border-t border-brand-border flex items-center justify-between">
          <Button
            variant="secondary"
            size="md"
            disabled={currentIndex === 0}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
            onClick={() => setCurrentIndex((i) => i - 1)}
          >
            Previous
          </Button>

          {/* Palette shortcuts */}
          <div className="hidden sm:flex items-center gap-1.5">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  'w-7 h-7 rounded-lg text-xs font-bold transition-all',
                  currentIndex === i
                    ? 'ring-2 ring-brand-text-primary bg-slate-100'
                    : answers[q.id]
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 text-slate-600'
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {currentIndex + 1 < questions.length ? (
            <Button
              variant="primary"
              size="md"
              rightIcon={<ChevronRight className="w-4 h-4" />}
              onClick={() => setCurrentIndex((i) => i + 1)}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="success"
              size="md"
              onClick={() => setShowSubmitConfirm(true)}
            >
              Finish & Submit
            </Button>
          )}
        </div>
      </Card>

      {/* Exit Modal */}
      <Modal
        isOpen={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        title="Leave Assessment?"
      >
        <p className="text-sm text-brand-text-secondary leading-relaxed mb-6">
          Are you sure you want to leave? Your answered questions will be saved, but the timer will continue running.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setShowExitConfirm(false)}>
            Continue Test
          </Button>
          <Button variant="danger" onClick={() => navigate('/student/home')}>
            Exit Test
          </Button>
        </div>
      </Modal>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={showSubmitConfirm}
        onClose={() => setShowSubmitConfirm(false)}
        title="Submit Test For Evaluation?"
      >
        <p className="text-sm text-brand-text-secondary leading-relaxed mb-6">
          You have answered {Object.keys(answers).length} of {questions.length} questions. Once submitted, your answers will be finalized and concept mastery updated.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setShowSubmitConfirm(false)}>
            Review Answers
          </Button>
          <Button variant="primary" onClick={handleFinalSubmit}>
            Yes, Submit Now
          </Button>
        </div>
      </Modal>
    </div>
  );
};
