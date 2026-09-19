import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select, Textarea } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { teacherService } from '@/services/teacherService';
import { useUIStore } from '@/stores/uiStore';
import { ArrowLeft, Sparkles, UploadCloud, Save, Send } from 'lucide-react';

export const CreateAssignment: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useUIStore();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('physics');
  const [chapter, setChapter] = useState('Electrostatics');
  const [classId, setClassId] = useState('12-A');
  const [dueDate, setDueDate] = useState('2026-09-25');
  const [maxMarks, setMaxMarks] = useState(25);
  const [instructions, setInstructions] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerateAiInstructions = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setIsGeneratingAi(false);
      setInstructions(
        '1. Answer all questions clearly with neat circuit/field diagrams.\n2. Show complete mathematical derivations for potential on axial line.\n3. Verify units in all final values.'
      );
      addToast('AI generated structured assignment guidelines!', 'info');
    }, 700);
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      addToast('Please provide an assignment title', 'warning');
      return;
    }
    setIsSubmitting(true);
    await teacherService.createAssignment({
      title,
      subjectId: subject as any,
      classId,
      dueDate,
      maxMarks,
      instructions,
    });
    setIsSubmitting(false);
    addToast('Assignment published to Class 12-A!', 'success');
    navigate('/teacher/assignments');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
      <button
        onClick={() => navigate('/teacher/assignments')}
        className="inline-flex items-center gap-2 text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Assignments</span>
      </button>

      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
          Create New Assignment
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Assign problem sets, derivations, and questions to your students
        </p>
      </div>

      <Card className="p-6 sm:p-8 border border-brand-border space-y-5 bg-white shadow-subtle">
        <Input
          label="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Electrostatics & Potential Gradient Problem Set"
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
          <Select
            label="Class Section"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            options={[
              { value: '12-A', label: 'Class 12-A (42 students)' },
              { value: '12-B', label: 'Class 12-B (39 students)' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Input
            label="Maximum Marks"
            type="number"
            value={maxMarks}
            onChange={(e) => setMaxMarks(Number(e.target.value))}
          />
        </div>

        {/* Instructions with AI Assistant button (Section 45) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-brand-text-primary">
              Instructions & Problem Prompts
            </label>
            <Button
              type="button"
              size="sm"
              variant="ai"
              isLoading={isGeneratingAi}
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              onClick={handleGenerateAiInstructions}
            >
              Generate with AI
            </Button>
          </div>
          <Textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Write assignment questions or click 'Generate with AI' to draft automatically..."
            className="min-h-[140px]"
          />
        </div>

        {/* File Attachments */}
        <div>
          <label className="block text-sm font-semibold text-brand-text-primary mb-1.5">
            Attach Reference Materials (Optional)
          </label>
          <div className="border-2 border-dashed border-brand-border rounded-2xl p-6 text-center hover:border-brand-primary cursor-pointer bg-slate-50/50">
            <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <span className="text-xs font-bold text-brand-text-primary block">
              Click to upload PDF, questions sheet, or diagrams
            </span>
            <span className="text-[11px] text-brand-text-secondary">Up to 25 MB</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-brand-border flex items-center justify-end gap-3">
          <Button
            variant="outline"
            size="md"
            leftIcon={<Save className="w-4 h-4" />}
            onClick={() => {
              addToast('Draft saved locally.', 'info');
              navigate('/teacher/assignments');
            }}
          >
            Save Draft
          </Button>
          <Button
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            leftIcon={<Send className="w-4 h-4" />}
            onClick={handlePublish}
          >
            Publish Assignment
          </Button>
        </div>
      </Card>
    </div>
  );
};
