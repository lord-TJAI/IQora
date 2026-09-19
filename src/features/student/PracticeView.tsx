import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard } from '@/components/learning/QuestionCard';
import { Question, SubjectId as DomainSubjectId } from '@/types/domain';
import { SubjectId, PracticeQuestion } from '@/types/curriculum';
import { getAllSubjects, getSubjectCurriculum, getTopicPractice } from '@/data/curriculum';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Clock,
  Zap,
  Target,
  AlertCircle,
  Calculator,
  Atom,
  FlaskConical,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/utils/cn';

type PracticeStep = 'select_subject' | 'select_topic' | 'select_mode' | 'active_session';

export const PracticeView: React.FC = () => {
  const navigate = useNavigate();
  const { addXP, updateMastery } = useAuthStore();

  const [step, setStep] = useState<PracticeStep>('select_subject');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<{ id: string; name: string; mastery: number } | null>(null);
  const [selectedMode, setSelectedMode] = useState<'quick' | 'adaptive' | 'weak_area' | 'exam'>('adaptive');

  const subjects = getAllSubjects();

  const getSubjectIcon = (id: string) => {
    switch (id) {
      case 'mathematics':
        return Calculator;
      case 'physics':
        return Atom;
      case 'chemistry':
        return FlaskConical;
      case 'english':
        return BookOpen;
      default:
        return BookOpen;
    }
  };

  // Practice Modes
  const modes = [
    {
      id: 'quick',
      title: 'Quick Practice',
      desc: '3 focused questions to warm up',
      icon: Zap,
      color: 'text-blue-500',
    },
    {
      id: 'adaptive',
      title: 'Adaptive Workout',
      desc: 'Smart difficulty that adjusts to your mistakes',
      icon: Sparkles,
      color: 'text-purple-500',
    },
    {
      id: 'weak_area',
      title: 'Weak Area Repair',
      desc: 'Target concepts with lowest confidence scores',
      icon: AlertCircle,
      color: 'text-amber-500',
    },
    {
      id: 'exam',
      title: 'CBSE Exam Mode',
      desc: 'Timed board-style questions without hints',
      icon: Clock,
      color: 'text-rose-500',
    },
  ];

  // Active Session Questions
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const startSession = () => {
    if (!selectedSubject) return;
    const rawQuestions = getTopicPractice(selectedSubject, selectedTopic?.id);

    // Convert PracticeQuestion to domain Question
    const domainQuestions: Question[] = rawQuestions.map((q, idx) => ({
      ...q,
      subjectId: selectedSubject as DomainSubjectId,
      topicId: selectedTopic?.id || 'general',
      xpReward: 25,
      masteryGain: 5,
    }));

    setSessionQuestions(domainQuestions);
    setCurrentIndex(0);
    setSessionScore(0);
    setIsCompleted(false);
    setStep('active_session');
  };

  const handleNextQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      setSessionScore((s) => s + 1);
      addXP(sessionQuestions[currentIndex].xpReward);
      if (selectedSubject) {
        updateMastery(selectedSubject, sessionQuestions[currentIndex].masteryGain);
      }
    }

    if (currentIndex + 1 < sessionQuestions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 70, spread: 60 });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header / Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            if (step === 'active_session') setStep('select_mode');
            else if (step === 'select_mode') setStep('select_topic');
            else if (step === 'select_topic') setStep('select_subject');
            else navigate('/student/home');
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#667085] hover:text-[#172033]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>
            {step === 'select_subject' && 'Back to Home'}
            {step === 'select_topic' && 'Back to Subjects'}
            {step === 'select_mode' && 'Back to Chapters'}
            {step === 'active_session' && 'Exit Practice'}
          </span>
        </button>

        <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">
          CBSE Practice Engine
        </span>
      </div>

      {/* =================================================================== */}
      {/* STEP 1: CHOOSE SUBJECT                                              */}
      {/* =================================================================== */}
      {step === 'select_subject' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
              Adaptive Practice
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
              Select a subject to practice real CBSE Class XII questions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjects.map((subj) => {
              const Icon = getSubjectIcon(subj.id);
              return (
                <div
                  key={subj.id}
                  onClick={() => {
                    setSelectedSubject(subj.id);
                    setStep('select_topic');
                  }}
                  className="bg-white rounded-3xl border border-[#E6EAF0] p-6 hover:border-[#D0D5DD] hover:shadow-subtle transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform p-2.5"
                      style={{ backgroundColor: subj.color }}
                    >
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                        {subj.name}
                      </h3>
                      <span className="text-xs text-[#667085]">
                        {subj.overallMastery}% mastery • {subj.units.length} Units
                      </span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#667085] group-hover:translate-x-1 transition-transform" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* STEP 2: CHOOSE TOPIC / CHAPTER                                      */}
      {/* =================================================================== */}
      {step === 'select_topic' && selectedSubject && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight capitalize">
              {selectedSubject} Topics
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
              Select a chapter or unit to practice.
            </p>
          </div>

          <div className="space-y-3">
            {getSubjectCurriculum(selectedSubject).units.flatMap((unit) =>
              unit.chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  onClick={() => {
                    setSelectedTopic({
                      id: chapter.id,
                      name: chapter.title,
                      mastery: chapter.masteryPercentage,
                    });
                    setStep('select_mode');
                  }}
                  className="bg-white rounded-2xl border border-[#E6EAF0] p-4 sm:p-5 hover:border-[#CBD5E1] hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider block">
                      Unit {unit.unitNumber}: {unit.title}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                      {chapter.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-[#172033]">
                      {chapter.masteryPercentage}%
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#667085] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* STEP 3: CHOOSE MODE                                                 */}
      {/* =================================================================== */}
      {step === 'select_mode' && selectedTopic && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
              Select Practice Mode
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
              Practicing: <strong className="text-[#172033]">{selectedTopic.name}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isSelected = selectedMode === mode.id;

              return (
                <div
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id as any)}
                  className={cn(
                    'bg-white rounded-3xl border p-5 sm:p-6 transition-all cursor-pointer flex flex-col justify-between gap-4',
                    isSelected
                      ? 'border-[#FFC800] ring-2 ring-[#FFC800]/20 shadow-xs'
                      : 'border-[#E6EAF0] hover:border-[#D0D5DD]'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className={cn('p-3 rounded-2xl bg-slate-50', mode.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {isSelected && (
                      <span className="text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-black text-[#172033]">
                      {mode.title}
                    </h3>
                    <p className="text-xs text-[#667085] mt-1">{mode.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            onClick={startSession}
            className="w-full py-4 rounded-2xl bg-[#FFC800] hover:bg-[#E6B400] text-[#172033] font-black text-sm shadow-brand"
          >
            START PRACTICE SESSION
          </Button>
        </div>
      )}

      {/* =================================================================== */}
      {/* STEP 4: ACTIVE PRACTICE SESSION                                     */}
      {/* =================================================================== */}
      {step === 'active_session' && sessionQuestions.length > 0 && (
        <div className="space-y-6">
          {!isCompleted ? (
            <div className="space-y-4">
              <QuestionCard
                question={sessionQuestions[currentIndex]}
                questionNumber={currentIndex + 1}
                totalQuestions={sessionQuestions.length}
                onNext={handleNextQuestion}
                onAskAi={() => navigate('/student/ai?action=explain')}
              />
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#E6EAF0] p-8 text-center space-y-6 shadow-subtle animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-[#172033]">
                  Practice Complete!
                </h2>
                <p className="text-sm font-medium text-[#667085] mt-1">
                  You answered {sessionScore} of {sessionQuestions.length} questions correctly.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-2xl font-black text-amber-900 block">
                    +{sessionScore * 25}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-amber-700">
                    XP Earned
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                  <span className="text-2xl font-black text-purple-900 block">
                    +{sessionScore * 5}%
                  </span>
                  <span className="text-[10px] font-bold uppercase text-purple-700">
                    Mastery Gain
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-4 max-w-sm mx-auto">
                <Button
                  variant="outline"
                  onClick={() => setStep('select_subject')}
                  className="flex-1 rounded-xl"
                >
                  New Topic
                </Button>
                <Button
                  onClick={() => startSession()}
                  className="flex-1 rounded-xl bg-[#172033] text-white hover:bg-slate-800"
                >
                  Practice Again
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
