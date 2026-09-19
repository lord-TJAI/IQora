import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard } from '@/components/learning/QuestionCard';
import { Question, SubjectId } from '@/types/domain';
import { mockCurrentLesson } from '@/services/mock/mockData';
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

  // Subjects
  const subjects = [
    { id: 'mathematics', name: 'Mathematics', icon: Calculator, color: '#4F7CFF', mastery: 78 },
    { id: 'physics', name: 'Physics', icon: Atom, color: '#7C4DFF', mastery: 72 },
    { id: 'chemistry', name: 'Chemistry', icon: FlaskConical, color: '#20C997', mastery: 64 },
    { id: 'english', name: 'English Core', icon: BookOpen, color: '#FF8A3D', mastery: 81 },
  ];

  // Topics per Subject
  const topicsMap: Record<SubjectId, { id: string; name: string; mastery: number }[]> = {
    mathematics: [
      { id: 'math-top-1', name: 'Calculus: Continuity & Derivatives', mastery: 70 },
      { id: 'math-top-2', name: 'Integrals & Definite Area', mastery: 50 },
      { id: 'math-top-3', name: 'Matrices & Linear Systems', mastery: 75 },
      { id: 'math-top-4', name: 'Vectors & 3D Geometry', mastery: 60 },
    ],
    physics: [
      { id: 'phys-top-1', name: 'Electrostatics & Potential', mastery: 82 },
      { id: 'phys-top-2', name: 'Current Electricity & Circuits', mastery: 68 },
      { id: 'phys-top-3', name: 'Magnetism & Moving Charges', mastery: 54 },
      { id: 'phys-top-4', name: 'Ray & Wave Optics', mastery: 52 },
    ],
    chemistry: [
      { id: 'chem-top-1', name: 'Electrochemistry & Cells', mastery: 72 },
      { id: 'chem-top-2', name: 'Chemical Kinetics & Rate Laws', mastery: 65 },
      { id: 'chem-top-3', name: 'Coordination Compounds', mastery: 60 },
      { id: 'chem-top-4', name: 'Organic Reaction Mechanisms', mastery: 58 },
    ],
    english: [
      { id: 'eng-top-1', name: 'Reading Comprehension & Tone', mastery: 88 },
      { id: 'eng-top-2', name: 'Creative Writing Formats (Notice/Article)', mastery: 82 },
      { id: 'eng-top-3', name: 'Flamingo Literature Analysis', mastery: 85 },
      { id: 'eng-top-4', name: 'Vistas Prose Comprehension', mastery: 76 },
    ],
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

  // Questions for active session
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
            {step === 'select_mode' && 'Back to Topics'}
            {step === 'active_session' && 'Exit Practice'}
          </span>
        </button>

        <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">
          Practice Engine
        </span>
      </div>

      {/* =================================================================== */}
      {/* STEP 1: CHOOSE SUBJECT                                              */}
      {/* =================================================================== */}
      {step === 'select_subject' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
              Practice
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
              Choose what you want to practice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjects.map((subj) => {
              const Icon = subj.icon;
              return (
                <div
                  key={subj.id}
                  onClick={() => {
                    setSelectedSubject(subj.id as SubjectId);
                    setStep('select_topic');
                  }}
                  className="bg-white rounded-3xl border border-[#E6EAF0] p-6 hover:border-[#D0D5DD] hover:shadow-subtle transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: subj.color }}
                    >
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                        {subj.name}
                      </h3>
                      <span className="text-xs text-[#667085]">
                        {subj.mastery}% mastery
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
      {/* STEP 2: CHOOSE TOPIC                                                */}
      {/* =================================================================== */}
      {step === 'select_topic' && selectedSubject && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight capitalize">
              {selectedSubject} Practice
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
              Select a chapter or topic to practice.
            </p>
          </div>

          <div className="space-y-3">
            {topicsMap[selectedSubject].map((topic) => (
              <div
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic);
                  setStep('select_mode');
                }}
                className="bg-white rounded-2xl sm:rounded-3xl border border-[#E6EAF0] p-5 hover:border-[#D0D5DD] hover:shadow-subtle transition-all cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-black text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                    {topic.name}
                  </h3>
                  <span className="text-xs text-[#667085]">
                    {topic.mastery}% mastered
                  </span>
                </div>

                <button className="px-4 py-2 rounded-xl text-xs font-black bg-[#F7F9FC] group-hover:bg-[#FFC800] group-hover:text-[#172033] text-[#667085] transition-colors">
                  PRACTICE
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* STEP 3: CHOOSE PRACTICE MODE                                        */}
      {/* =================================================================== */}
      {step === 'select_mode' && selectedTopic && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
              {selectedTopic.name}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
              Choose your practice workout mode.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modes.map((mode) => {
              const Icon = mode.icon;
              return (
                <div
                  key={mode.id}
                  onClick={() => {
                    setSelectedMode(mode.id as any);
                    setStep('active_session');
                  }}
                  className="bg-white rounded-3xl border border-[#E6EAF0] p-6 hover:border-[#D0D5DD] hover:shadow-subtle transition-all cursor-pointer flex flex-col justify-between gap-4 group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center">
                    <Icon className={cn('w-5 h-5', mode.color)} />
                  </div>

                  <div>
                    <h3 className="text-base font-black text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                      {mode.title}
                    </h3>
                    <p className="text-xs text-[#667085] mt-1 leading-relaxed">
                      {mode.desc}
                    </p>
                  </div>

                  <span className="text-xs font-black text-[#172033] group-hover:text-[#4F7CFF] flex items-center gap-1">
                    <span>START</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* STEP 4: ACTIVE PRACTICE SESSION                                     */}
      {/* =================================================================== */}
      {step === 'active_session' && (
        <div className="space-y-6">
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
            <div className="text-center p-8 sm:p-10 bg-white rounded-3xl border border-[#E6EAF0] shadow-subtle space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-[#172033]">
                Practice Complete!
              </h2>
              <p className="text-xs sm:text-sm text-[#667085] max-w-sm mx-auto">
                You scored {sessionScore} of {questions.length} correct in{' '}
                <strong className="text-[#172033]">{selectedTopic?.name}</strong>.
              </p>

              <div className="flex items-center justify-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  className="bg-[#172033] text-white hover:bg-slate-800"
                  onClick={() => setStep('select_topic')}
                >
                  Choose Another Topic
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
      )}
    </div>
  );
};
