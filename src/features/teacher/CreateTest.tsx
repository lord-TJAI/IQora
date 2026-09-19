import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { teacherService } from '@/services/teacherService';
import { aiService } from '@/services/aiService';
import { useUIStore } from '@/stores/uiStore';
import { ArrowLeft, Sparkles, Send, CheckCircle2, Trash2 } from 'lucide-react';

export const CreateTest: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useUIStore();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('physics');
  const [chapter, setChapter] = useState('Electrostatics');
  const [duration, setDuration] = useState(45);
  const [totalQuestions, setTotalQuestions] = useState(15);
  const [maxMarks, setMaxMarks] = useState(40);
  const [difficulty, setDifficulty] = useState('medium');

  const [aiQuestions, setAiQuestions] = useState<any[]>([]);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleGenerateWithAi = async () => {
    setIsGeneratingAi(true);
    try {
      const generated = await aiService.generateTestQuestions(chapter, 3);
      setAiQuestions(generated);
      addToast('AI generated questions ready for your review and edits!', 'info');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleRemoveQuestion = (idx: number) => {
    setAiQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      addToast('Please enter an assessment title', 'warning');
      return;
    }
    setIsPublishing(true);
    await teacherService.createTest({
      title,
      subjectId: subject as any,
      subjectName: subject.charAt(0).toUpperCase() + subject.slice(1),
      chapterTitle: chapter,
      durationMinutes: duration,
      totalQuestions,
      maxMarks,
    });
    setIsPublishing(false);
    addToast('Assessment published to Class 12-A!', 'success');
    navigate('/teacher/tests');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
      <button
        onClick={() => navigate('/teacher/tests')}
        className="inline-flex items-center gap-2 text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Tests</span>
      </button>

      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
          Create Timed Assessment
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Set up unit tests, configure duration, and optionally use AI question generation
        </p>
      </div>

      <Card className="p-6 sm:p-8 border border-brand-border space-y-5 bg-white shadow-subtle">
        <Input
          label="Test Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Unit Test 2: Electrostatics & Potential Difference"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: 'physics', label: 'Physics' },
              { value: 'mathematics', label: 'Mathematics' },
              { value: 'chemistry', label: 'Chemistry' },
              { value: 'english', label: 'English Core' },
            ]}
          />
          <Input
            label="Chapter / Topics"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Duration (mins)"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
          <Input
            label="Total Questions"
            type="number"
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(Number(e.target.value))}
          />
          <Input
            label="Total Marks"
            type="number"
            value={maxMarks}
            onChange={(e) => setMaxMarks(Number(e.target.value))}
          />
        </div>

        {/* AI Question Generation Section (Section 48) */}
        <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-brand-ai uppercase tracking-wider block">
                AI Assessment Generator
              </span>
              <p className="text-xs text-brand-text-secondary">
                Generate high-yield Class 12 questions aligned with NCERT standards.
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              variant="ai"
              isLoading={isGeneratingAi}
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              onClick={handleGenerateWithAi}
            >
              Generate with AI
            </Button>
          </div>

          {/* Review generated questions */}
          {aiQuestions.length > 0 && (
            <div className="mt-3 space-y-3 pt-3 border-t border-purple-200">
              <span className="text-xs font-bold text-purple-900 block">
                Review & Edit Generated Questions ({aiQuestions.length}):
              </span>
              {aiQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-white rounded-xl border border-purple-100 space-y-2 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-brand-text-primary">
                      {idx + 1}. {q.prompt}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(idx)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                      title="Remove question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 pl-3">
                    {q.options?.map((opt: string, oi: number) => (
                      <span
                        key={oi}
                        className={`p-1.5 rounded-lg border text-[11px] ${
                          opt === q.correctAnswer
                            ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-800'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-brand-border flex items-center justify-end gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/teacher/tests')}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            isLoading={isPublishing}
            leftIcon={<Send className="w-4 h-4" />}
            onClick={handlePublish}
          >
            Publish Assessment
          </Button>
        </div>
      </Card>
    </div>
  );
};
