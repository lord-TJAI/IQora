import React, { useState } from 'react';
import { submitStudentQuery } from '@/services/query/queryService';
import { StudentQuery } from '@/types/query';
import { MessageSquare, Paperclip, Send, X, CheckCircle2, User, BookOpen } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface QueryModalContext {
  subjectId?: 'mathematics' | 'physics' | 'chemistry' | 'english';
  subjectName?: string;
  chapterId?: string;
  chapterTitle?: string;
  conceptId?: string;
  conceptName?: string;
  contextSource?: 'lesson' | 'practice' | 'assignment' | 'ai' | 'general';
}

interface AskTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: QueryModalContext;
  onSubmitted?: (query: StudentQuery) => void;
}

const teachersBySubject: Record<'mathematics' | 'physics' | 'chemistry' | 'english', { name: string; title: string }> = {
  physics: { name: 'Ms. Sharma', title: 'Physics Teacher' },
  mathematics: { name: 'Mr. Verma', title: 'Mathematics Teacher' },
  chemistry: { name: 'Dr. Kapoor', title: 'Chemistry Teacher' },
  english: { name: 'Mrs. Iyer', title: 'English Teacher' },
};

export const AskTeacherModal: React.FC<AskTeacherModalProps> = ({
  isOpen,
  onClose,
  context,
  onSubmitted,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<'mathematics' | 'physics' | 'chemistry' | 'english'>(
    context?.subjectId || 'physics'
  );
  const [questionText, setQuestionText] = useState('');
  const [hasAttachment, setHasAttachment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const activeTeacher = teachersBySubject[selectedSubject];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setIsSubmitting(true);
    const subjectName =
      context?.subjectName ||
      selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1);

    const newQuery = submitStudentQuery({
      studentId: 'student-1',
      studentName: 'Arjun Sharma',
      className: 'Class 12-A',
      subjectId: selectedSubject,
      subjectName,
      chapterId: context?.chapterId || 'general',
      chapterTitle: context?.chapterTitle || 'General Curriculum Doubt',
      conceptId: context?.conceptId,
      conceptName: context?.conceptName,
      contextSource: context?.contextSource || 'general',
      message: questionText.trim(),
      attachments: hasAttachment
        ? [
            {
              id: 'att-1',
              name: 'handwritten_working.jpg',
              type: 'image',
              url: '#',
              sizeBytes: 1024 * 450,
            },
          ]
        : undefined,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSubmitted) onSubmitted(newQuery);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 max-w-lg w-full shadow-elevated space-y-5 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#172033]">
                Ask Your Teacher
              </h3>
              <p className="text-xs text-[#667085]">
                Direct academic doubt for {activeTeacher.name} ({activeTeacher.title}, Class 12-A)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-[#667085]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Context Banner or Subject Selector */}
            {context?.subjectName ? (
              <div className="p-3 bg-[#FAFBFD] rounded-2xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between text-[#667085]">
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    Context Attached
                  </span>
                  <span className="capitalize font-bold text-[#172033]">
                    Source: {context.contextSource || 'general'}
                  </span>
                </div>
                <p className="font-bold text-[#172033]">
                  {context.subjectName} • {context.chapterTitle}
                </p>
                {context.conceptName && (
                  <p className="text-[11px] text-[#667085]">
                    Focus: {context.conceptName}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#667085] block">
                  Select Subject & Teacher:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['physics', 'chemistry', 'mathematics', 'english'] as const).map((s) => {
                    const t = teachersBySubject[s];
                    const isSelected = selectedSubject === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSubject(s)}
                        className={cn(
                          'p-2.5 rounded-xl border text-left transition-all',
                          isSelected
                            ? 'bg-purple-50 border-purple-300 text-purple-900 shadow-xs ring-1 ring-purple-300'
                            : 'bg-white border-slate-200 text-[#667085] hover:bg-slate-50'
                        )}
                      >
                        <span className="text-xs font-black block capitalize text-[#172033]">
                          {s}
                        </span>
                        <span className="text-[10px] text-[#667085] block truncate">
                          {t.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question Text Area */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#172033] block">
                What are you struggling with?
              </label>
              <textarea
                rows={4}
                required
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Explain what part is confusing, e.g. 'I understand the formula, but I do not see why potential difference is zero on equipotential surfaces...'"
                className="w-full p-3.5 rounded-2xl border border-[#E6EAF0] text-xs sm:text-sm text-[#172033] focus:outline-none focus:border-[#7C4DFF] focus:ring-2 focus:ring-[#7C4DFF]/10 resize-none"
              />
            </div>

            {/* Attachment Toggle */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setHasAttachment(!hasAttachment)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors',
                  hasAttachment
                    ? 'bg-purple-50 border-purple-300 text-purple-800'
                    : 'bg-white border-slate-200 text-[#667085] hover:text-[#172033]'
                )}
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>
                  {hasAttachment
                    ? '1 Attachment Added (handwritten_working.jpg)'
                    : 'Attach photo of working'}
                </span>
              </button>

              <span className="text-[11px] text-[#667085]">
                Teacher typically replies within school hours
              </span>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#667085] hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !questionText.trim()}
                className="px-5 py-2.5 rounded-xl bg-[#172033] hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-black flex items-center gap-2 shadow-xs transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Sending...' : 'SEND TO TEACHER'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="py-6 text-center space-y-3 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-[#172033]">
              Question Sent to Teacher!
            </h4>
            <p className="text-xs text-[#667085] max-w-sm mx-auto">
              Ms. Sharma will review your question with your current lesson context. You will receive a notification when she replies.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2 bg-[#172033] text-white rounded-xl text-xs font-black"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
