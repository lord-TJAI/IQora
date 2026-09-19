import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockSubmissions } from '@/services/mock/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Select';
import { teacherService } from '@/services/teacherService';
import { useUIStore } from '@/stores/uiStore';
import { ArrowLeft, Sparkles, CheckCircle2, Send, Bot } from 'lucide-react';

export const EvaluationView: React.FC = () => {
  const { id = 'sub-1' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useUIStore();

  const submission = mockSubmissions.find((s) => s.id === id) || mockSubmissions[0];

  const [score, setScore] = useState<number>(submission.score || 23);
  const [feedback, setFeedback] = useState<string>(
    submission.teacherFeedback ||
      'Strong conceptual clarity shown in the axial line dipole derivation. Pay close attention to negative signs in potential gradient formulas.'
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAndReturn = async () => {
    setIsSaving(true);
    await teacherService.evaluateSubmission(submission.id, score, feedback);
    setIsSaving(false);
    addToast(`Feedback returned to ${submission.studentName}!`, 'success');
    navigate('/teacher/submissions');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
      <button
        onClick={() => navigate('/teacher/submissions')}
        className="inline-flex items-center gap-2 text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Submissions</span>
      </button>

      {/* Header Info */}
      <Card className="p-6 border border-brand-border bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={submission.studentAvatar}
            alt={submission.studentName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl font-black text-brand-text-primary">
              {submission.studentName}
            </h1>
            <p className="text-xs text-brand-text-secondary">
              {submission.taskTitle} • Max Marks: {submission.maxMarks}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
            {submission.status === 'pending' ? 'Ready for Evaluation' : 'Evaluated'}
          </span>
        </div>
      </Card>

      {/* Questions & Student Answers */}
      <div className="space-y-5">
        {submission.answers.map((ans, idx) => (
          <Card key={ans.questionId} className="p-6 border border-brand-border space-y-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-brand-text-primary">
                Question {idx + 1}: {ans.questionPrompt}
              </h3>
              <span className="text-xs font-bold text-slate-500 flex-shrink-0">
                Max: {ans.maxScore} pts
              </span>
            </div>

            {/* Student's Written Response */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-bold text-brand-text-secondary uppercase tracking-wider block">
                Student's Answer:
              </span>
              <p className="text-sm text-brand-text-primary leading-relaxed font-medium">
                {ans.studentAnswer}
              </p>
            </div>

            {/* AI Suggested Evaluation (Section 51) */}
            {ans.aiAnalysis && (
              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-ai">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Mastery AI Suggested Score: {ans.aiSuggestedScore} / {ans.maxScore}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    AI Assistant
                  </span>
                </div>
                <p className="text-xs text-purple-950 leading-relaxed font-medium">
                  {ans.aiAnalysis}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Teacher Final Evaluation & Feedback Card */}
      <Card className="p-6 border-2 border-brand-primary/60 bg-white space-y-4 shadow-subtle">
        <h3 className="text-base font-bold text-brand-text-primary">
          Teacher Evaluation & Feedback
        </h3>

        <div className="w-48">
          <Input
            label={`Final Total Score (Out of ${submission.maxMarks})`}
            type="number"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
          />
        </div>

        <Textarea
          label="Personalized Feedback for Student"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Add comments on conceptual strengths, areas for improvement, or next steps..."
          className="min-h-[100px]"
        />

        <div className="pt-3 border-t border-brand-border flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/teacher/submissions')}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            isLoading={isSaving}
            leftIcon={<Send className="w-4 h-4" />}
            onClick={handleSaveAndReturn}
          >
            Save & Return Feedback to Student
          </Button>
        </div>
      </Card>
    </div>
  );
};
