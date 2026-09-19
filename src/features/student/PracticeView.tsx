import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubjectId, PracticeQuestion } from '@/types/curriculum';
import { getAllSubjects, getSubjectCurriculum, getTopicPractice } from '@/data/curriculum';
import { useAuthStore } from '@/stores/authStore';
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
  HelpCircle,
  MessageSquare,
  Award,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/utils/cn';

type PracticeStep = 'select_subject' | 'select_topic' | 'select_mode' | 'active_session';
type PracticeMode = 'quick' | 'adaptive' | 'weak_area' | 'exam';

export const PracticeView: React.FC = () => {
  const navigate = useNavigate();
  const { addXP, updateMastery } = useAuthStore();

  const [step, setStep] = useState<PracticeStep>('select_subject');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<{ id: string; name: string; mastery: number } | null>(null);
  const [selectedMode, setSelectedMode] = useState<PracticeMode>('quick');

  // Active Session State
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // User Answer Inputs
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [numericalInput, setNumericalInput] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Adaptive Mode Specific State
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [adaptiveHistory, setAdaptiveHistory] = useState<boolean[]>([]);

  // Exam Mode Specific State
  const [examTimeRemaining, setExamTimeRemaining] = useState<number>(600); // 10 minutes in seconds

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

  // Exam Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'active_session' && selectedMode === 'exam' && !isCompleted) {
      timer = setInterval(() => {
        setExamTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, selectedMode, isCompleted]);

  // Mode Definitions with distinct pedagogical descriptions
  const modes = [
    {
      id: 'quick',
      title: 'Quick Practice',
      desc: '3–5 focused questions with mixed calculations, prediction, and conceptual checks.',
      icon: Zap,
      color: 'text-blue-500',
      badge: 'Speed & Retention',
    },
    {
      id: 'adaptive',
      title: 'Adaptive Workout',
      desc: 'Dynamic difficulty that starts at your current mastery level and scales up or down based on your answers.',
      icon: Sparkles,
      color: 'text-purple-500',
      badge: 'Personalized AI',
    },
    {
      id: 'weak_area',
      title: 'Weak Area Repair',
      desc: 'Targeted practice addressing your lowest confidence concepts with diagnostic feedback.',
      icon: AlertCircle,
      color: 'text-amber-500',
      badge: 'Concept Recovery',
    },
    {
      id: 'exam',
      title: 'CBSE Exam Mode',
      desc: 'Strict board examination environment: timed countdown, marks rubric, zero gamification.',
      icon: Clock,
      color: 'text-rose-500',
      badge: 'Board Simulation',
    },
  ];

  // Weak area concepts for student
  const weakAreaConcepts: Record<SubjectId, { id: string; name: string; mastery: number; chapterTitle: string }[]> = {
    physics: [
      { id: 'phys-c-potential-dipole', name: 'Electric Potential & Dipole Gradient', mastery: 43, chapterTitle: 'Electrostatic Potential' },
      { id: 'phys-c-lorentz-force', name: 'Lorentz Force & Cyclotron Motion', mastery: 54, chapterTitle: 'Moving Charges & Magnetism' },
      { id: 'phys-c-ydse-fringes', name: 'Young Double Slit Interference', mastery: 52, chapterTitle: 'Wave Optics' },
    ],
    mathematics: [
      { id: 'math-c-riemann-sum', name: 'Definite Integrals & Riemann Sums', mastery: 48, chapterTitle: 'Integrals' },
      { id: 'math-c-area-curves', name: 'Area Bounded by Conics', mastery: 52, chapterTitle: 'Applications of Integrals' },
      { id: 'math-c-shortest-dist', name: 'Skew Lines Shortest Distance', mastery: 56, chapterTitle: 'Three Dimensional Geometry' },
    ],
    chemistry: [
      { id: 'chem-c-nernst-galvanic', name: 'Nernst Equation Cell Potential', mastery: 51, chapterTitle: 'Electrochemistry' },
      { id: 'chem-c-cft-vbt', name: 'Crystal Field Theory & Splitting', mastery: 49, chapterTitle: 'Coordination Compounds' },
      { id: 'chem-c-aldol-cannizzaro', name: 'Cannizzaro Disproportionation', mastery: 54, chapterTitle: 'Aldehydes & Ketones' },
    ],
    english: [
      { id: 'eng-c-inference-tone', name: 'Unseen Rhetorical Tone Inference', mastery: 62, chapterTitle: 'Reading Skills' },
      { id: 'eng-c-aunt-jennifer', name: 'Aunt Jennifer Tigers Poetic Devices', mastery: 68, chapterTitle: 'Flamingo Poetry' },
      { id: 'eng-c-the-enemy', name: 'The Enemy Ethical Dilemmas', mastery: 65, chapterTitle: 'Vistas Reader' },
    ],
  };

  const startSession = () => {
    if (!selectedSubject) return;
    const rawQuestions = getTopicPractice(selectedSubject, selectedTopic?.id);

    setQuestions(rawQuestions);
    setCurrentIndex(0);
    setSessionScore(0);
    setIsCompleted(false);
    setIsAnswered(false);
    setSelectedOption(null);
    setNumericalInput('');
    setShowHint(false);
    setAdaptiveDifficulty('easy');
    setAdaptiveHistory([]);
    setExamTimeRemaining(600);
    setStep('active_session');
  };

  const currentQuestion = questions[currentIndex] || questions[0];

  const handleCheckAnswer = () => {
    if (!currentQuestion) return;

    let correct = false;
    if (currentQuestion.type === 'calculation') {
      const parsedUser = parseFloat(numericalInput.trim());
      const parsedCorrect = parseFloat(String(currentQuestion.correctAnswer));
      correct = !isNaN(parsedUser) && Math.abs(parsedUser - parsedCorrect) < 0.1;
    } else {
      correct = selectedOption === String(currentQuestion.correctAnswer);
    }

    setIsCurrentCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setSessionScore((s) => s + 1);
      if (selectedMode !== 'exam') {
        addXP(25);
        if (selectedSubject) updateMastery(selectedSubject, 5);
        confetti({ particleCount: 35, spread: 50 });
      }
    }

    // Adaptive difficulty adjustment
    if (selectedMode === 'adaptive') {
      const nextHistory = [...adaptiveHistory, correct];
      setAdaptiveHistory(nextHistory);
      if (correct) {
        if (adaptiveDifficulty === 'easy') setAdaptiveDifficulty('medium');
        else if (adaptiveDifficulty === 'medium') setAdaptiveDifficulty('hard');
      } else {
        if (adaptiveDifficulty === 'hard') setAdaptiveDifficulty('medium');
        else if (adaptiveDifficulty === 'medium') setAdaptiveDifficulty('easy');
      }
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setIsAnswered(false);
      setSelectedOption(null);
      setNumericalInput('');
      setShowHint(false);
    } else {
      setIsCompleted(true);
      if (selectedMode !== 'exam') {
        confetti({ particleCount: 70, spread: 60 });
      }
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Breadcrumb Header */}
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
            {step === 'active_session' && 'Exit Practice Session'}
          </span>
        </button>

        <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">
          CBSE Practice Workspace
        </span>
      </div>

      {/* =================================================================== */}
      {/* STEP 1: CHOOSE SUBJECT                                              */}
      {/* =================================================================== */}
      {step === 'select_subject' && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#4F7CFF] bg-[#EFF4FF] px-2.5 py-0.5 rounded-full">
                Step 1 of 3
              </span>
              <span className="text-xs font-bold text-[#667085]">Subject Selection</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight mt-1">
              What do you want to practice?
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
              Select a subject to open its syllabus chapters and distinct practice modes.
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
                  className="bg-white rounded-3xl border border-[#E6EAF0] p-6 hover:border-[#CBD5E1] hover:shadow-subtle transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-13 h-13 rounded-2xl flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform p-3"
                      style={{ backgroundColor: subj.color }}
                    >
                      <Icon className="w-7 h-7 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                        {subj.name}
                      </h3>
                      <span className="text-xs text-[#667085]">
                        {subj.overallMastery}% Mastery • {subj.units.length} Units
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
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#4F7CFF] bg-[#EFF4FF] px-2.5 py-0.5 rounded-full">
                Step 2 of 3
              </span>
              <span className="text-xs font-bold text-[#667085] capitalize">{selectedSubject} Syllabus</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight mt-1">
              Choose Chapter / Concept
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
              All questions are strictly aligned to the official 2026–27 CBSE curriculum.
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
      {/* STEP 3: CHOOSE PRACTICE MODE (4 TRULY DISTINCT MODES)               */}
      {/* =================================================================== */}
      {step === 'select_mode' && selectedTopic && selectedSubject && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#4F7CFF] bg-[#EFF4FF] px-2.5 py-0.5 rounded-full">
                Step 3 of 3
              </span>
              <span className="text-xs font-bold text-[#667085]">Select Mode</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight mt-1">
              How do you want to practice?
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
                  onClick={() => setSelectedMode(mode.id as PracticeMode)}
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
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#667085] bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {mode.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-[#172033]">
                      {mode.title}
                    </h3>
                    <p className="text-xs text-[#667085] mt-1 leading-relaxed">
                      {mode.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Weak Area Guidance if Weak Area selected */}
          {selectedMode === 'weak_area' && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Identified Concept Gaps in {selectedSubject}:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {weakAreaConcepts[selectedSubject]?.map((gap) => (
                  <div key={gap.id} className="p-2.5 rounded-xl bg-white border border-amber-200">
                    <span className="font-bold text-[#172033] block truncate">{gap.name}</span>
                    <span className="text-rose-600 font-bold text-[11px]">{gap.mastery}% Mastery</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exam Mode Guidance if Exam Mode selected */}
          {selectedMode === 'exam' && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-1">
              <span className="font-bold block">CBSE Board Exam Rules Active:</span>
              <p className="text-[#667085]">
                10-Minute Timed Session • No XP or rewards displayed during test • No hints or AI explanations • Marks rubric shown after final submission.
              </p>
            </div>
          )}

          <button
            onClick={startSession}
            className="w-full py-4 rounded-2xl bg-[#FFC800] hover:bg-[#E6B400] text-[#172033] font-black text-sm shadow-brand transition-all"
          >
            START {selectedMode.toUpperCase().replace('_', ' ')} SESSION
          </button>
        </div>
      )}

      {/* =================================================================== */}
      {/* STEP 4: ACTIVE SESSION (GENUINELY DIFFERENT BY MODE)               */}
      {/* =================================================================== */}
      {step === 'active_session' && currentQuestion && (
        <div className="space-y-6">
          {!isCompleted ? (
            <div className="space-y-6">
              {/* Mode-Specific Status Banner */}
              <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-[#E6EAF0] shadow-xs text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-[#172033]">
                    {selectedMode.replace('_', ' ')} Mode
                  </span>
                  <span className="text-[#667085]">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                </div>

                {/* Mode-Specific Indicators */}
                {selectedMode === 'exam' ? (
                  <div className="flex items-center gap-1.5 font-mono font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Time Remaining: {formatTimer(examTimeRemaining)}</span>
                  </div>
                ) : selectedMode === 'adaptive' ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[#667085]">Dynamic Difficulty:</span>
                    <span
                      className={cn(
                        'px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px]',
                        adaptiveDifficulty === 'hard'
                          ? 'bg-rose-100 text-rose-700'
                          : adaptiveDifficulty === 'medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      )}
                    >
                      {adaptiveDifficulty}
                    </span>
                  </div>
                ) : (
                  <div className="text-amber-800 font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
                    +25 XP per correct answer
                  </div>
                )}
              </div>

              {/* Main Question Card Container */}
              <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-8 shadow-subtle space-y-6">
                {/* Concept Tag */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-[#667085]">
                    <HelpCircle className="w-3.5 h-3.5 text-[#7C4DFF]" />
                    <span>{currentQuestion.conceptName}</span>
                  </div>
                </div>

                {/* Prompt */}
                <h3 className="text-base sm:text-lg font-black text-[#172033] leading-relaxed">
                  {currentQuestion.prompt}
                </h3>

                {/* Question Input Types (NOT just MCQ!) */}
                {currentQuestion.type === 'calculation' ? (
                  /* Numerical Input Box */
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-[#667085] block">
                      Enter your calculated numerical value:
                    </label>
                    <div className="flex gap-3 max-w-sm">
                      <input
                        type="number"
                        step="any"
                        disabled={isAnswered}
                        value={numericalInput}
                        onChange={(e) => setNumericalInput(e.target.value)}
                        placeholder="e.g. 20"
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-base font-mono font-bold text-[#172033] focus:outline-none focus:border-[#4F7CFF]"
                      />
                      {!isAnswered && (
                        <button
                          onClick={handleCheckAnswer}
                          disabled={!numericalInput.trim()}
                          className="px-5 py-3 bg-[#172033] text-white rounded-xl text-xs font-bold disabled:opacity-50"
                        >
                          Check
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Standard / Evidence MCQ Options */
                  <div className="space-y-3">
                    {currentQuestion.options?.map((opt, idx) => {
                      const isSelected = selectedOption === opt;
                      const isOptionCorrect = opt === String(currentQuestion.correctAnswer);

                      let style = 'bg-white border-[#E6EAF0] hover:border-slate-400 text-[#172033]';
                      if (isAnswered) {
                        if (isOptionCorrect) {
                          style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                        } else if (isSelected && !isCurrentCorrect) {
                          style = 'bg-amber-50 border-amber-400 text-amber-950';
                        } else {
                          style = 'opacity-40 border-slate-200 bg-slate-50';
                        }
                      } else if (isSelected) {
                        style = 'bg-blue-50 border-[#4F7CFF] text-[#172033] font-bold shadow-xs';
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => setSelectedOption(opt)}
                          className={cn(
                            'w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-xs sm:text-sm font-medium',
                            style
                          )}
                        >
                          <span>{opt}</span>
                          {isAnswered && isOptionCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}

                    {!isAnswered && (
                      <div className="pt-2">
                        <button
                          onClick={handleCheckAnswer}
                          disabled={!selectedOption}
                          className="w-full py-3.5 bg-[#172033] hover:bg-slate-800 disabled:opacity-50 text-white rounded-2xl text-xs font-black transition-all"
                        >
                          SUBMIT ANSWER
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Explanation & Feedback (Hidden in Exam Mode until finish) */}
                {isAnswered && selectedMode !== 'exam' && (
                  <div className="p-4 rounded-2xl bg-[#FAFBFD] border border-slate-200 space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className={cn('text-xs font-black uppercase', isCurrentCorrect ? 'text-emerald-700' : 'text-amber-700')}>
                        {isCurrentCorrect ? '✓ Correct Solution' : 'Diagnostic Feedback'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#172033] leading-relaxed">
                      {currentQuestion.explanation}
                    </p>

                    <button
                      onClick={handleNext}
                      className="w-full py-3 bg-[#FFC800] hover:bg-[#E6B400] text-[#172033] font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>CONTINUE TO NEXT QUESTION</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* In Exam Mode, just show next button without revealing answers */}
                {isAnswered && selectedMode === 'exam' && (
                  <div className="pt-2">
                    <button
                      onClick={handleNext}
                      className="w-full py-3.5 bg-[#172033] text-white rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>NEXT EXAM QUESTION</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Practice Session Complete Screen */
            <div className="bg-white rounded-3xl border border-[#E6EAF0] p-8 text-center space-y-6 shadow-subtle animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-[#172033]">
                  {selectedMode === 'exam' ? 'Board Exam Practice Complete' : 'Practice Complete!'}
                </h2>
                <p className="text-sm font-medium text-[#667085] mt-1">
                  You answered {sessionScore} of {questions.length} questions correctly in {selectedTopic?.name}.
                </p>
              </div>

              {selectedMode !== 'exam' ? (
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
              ) : (
                /* Exam Marks Rubric */
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-xs space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>Board Scaled Score:</span>
                    <span className="font-mono text-base font-black text-[#172033]">
                      {Math.round((sessionScore / questions.length) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-[#667085]">
                    <span>Questions Attempted:</span>
                    <span>{questions.length} / {questions.length}</span>
                  </div>
                  <div className="flex justify-between text-[#667085]">
                    <span>Time Taken:</span>
                    <span>{formatTimer(600 - examTimeRemaining)}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 max-w-sm mx-auto">
                <button
                  onClick={() => setStep('select_subject')}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-bold text-[#667085] hover:bg-slate-50"
                >
                  New Topic
                </button>
                <button
                  onClick={startSession}
                  className="flex-1 py-3 rounded-xl bg-[#172033] text-white hover:bg-slate-800 text-xs font-black"
                >
                  Practice Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
