import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTasks } from '@/services/mock/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Select';
import { ArrowLeft, Calendar, User, FileText, CheckCircle2, Clock, UploadCloud } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

export const TaskDetail: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { addToast } = useUIStore();

  const task = mockTasks.find((t) => t.id === taskId) || mockTasks[0];

  const [studentNotes, setStudentNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(task.status === 'submitted' || task.status === 'evaluated');

  const handleSubmitWork = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      addToast('Assignment submitted successfully to Ms. Sharma!', 'success');
    }, 600);
  };

  const timelineSteps = [
    { label: 'Assigned', date: task.assignedDate, done: true },
    { label: 'Started', date: 'In progress', done: true },
    { label: 'Submitted', date: submitted ? '2026-09-19' : 'Pending', done: submitted },
    { label: 'Evaluated', date: task.status === 'evaluated' ? 'Graded' : 'Awaiting', done: task.status === 'evaluated' },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
      <button
        onClick={() => navigate('/student/tasks')}
        className="inline-flex items-center gap-2 text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Task Inbox</span>
      </button>

      {/* Task Header Card */}
      <Card className="p-6 border border-brand-border space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-ai bg-purple-100 px-3 py-0.5 rounded-full">
            {task.subjectName}
          </span>
          <span className="text-xs text-brand-text-secondary">Class 12-A</span>
        </div>

        <h1 className="text-2xl font-black text-brand-text-primary">
          {task.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-text-secondary pb-2 border-b border-brand-border">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-slate-500" /> {task.teacherName}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-500" /> Due: {task.dueDate}
          </span>
          <span className="font-bold text-brand-text-primary">
            Max Marks: {task.maxMarks}
          </span>
        </div>

        {/* Timeline (Section 30) */}
        <div className="py-2">
          <span className="text-xs font-bold text-brand-text-secondary uppercase tracking-wider block mb-3">
            Status Timeline
          </span>
          <div className="grid grid-cols-4 gap-2 text-center">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.done
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className="text-xs font-bold text-brand-text-primary mt-1.5">
                  {step.label}
                </span>
                <span className="text-[10px] text-brand-text-secondary">{step.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-2 pt-2">
          <h4 className="text-sm font-bold text-brand-text-primary">Instructions:</h4>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {task.instructions}
          </p>
        </div>

        {/* Attachments */}
        {task.attachments && task.attachments.length > 0 && (
          <div className="space-y-2 pt-1">
            <h4 className="text-sm font-bold text-brand-text-primary">Attached Files:</h4>
            {task.attachments.map((att, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-purple-50/60 border border-purple-200 text-xs"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-ai" />
                  <span className="font-bold text-brand-text-primary">{att.name}</span>
                  <span className="text-slate-500">({att.size})</span>
                </div>
                <span className="font-bold text-brand-ai hover:underline cursor-pointer">
                  Download
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Submission Area */}
        {!submitted ? (
          <div className="pt-4 border-t border-brand-border space-y-3">
            <h4 className="text-sm font-bold text-brand-text-primary">Your Work & Notes:</h4>
            <Textarea
              value={studentNotes}
              onChange={(e) => setStudentNotes(e.target.value)}
              placeholder="Paste answers, derivation steps, or write comments for the teacher..."
            />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button className="text-xs font-bold text-slate-600 flex items-center gap-1.5 p-2 rounded-xl border border-slate-200 hover:bg-slate-50 w-full sm:w-auto justify-center">
                <UploadCloud className="w-4 h-4 text-slate-500" />
                <span>Upload PDF / Images of Solution</span>
              </button>
              <Button
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                onClick={handleSubmitWork}
                className="w-full sm:w-auto"
              >
                Submit Assignment
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Submitted on Sep 19, 2026
            </span>
            <p>Your work has been received and queued for Ms. Sharma's evaluation.</p>
            {task.feedback && (
              <div className="mt-3 p-3 bg-white rounded-xl border border-emerald-300">
                <strong className="block text-emerald-950 font-bold mb-0.5">Teacher Feedback:</strong>
                <p className="text-slate-700">{task.feedback}</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
