import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTasks } from '@/services/mock/mockData';
import { Task, TaskStatus } from '@/types/domain';
import {
  Calendar,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Send,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const WorkView: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'completed'>('today');
  const [activeTaskModal, setActiveTaskModal] = useState<Task | null>(null);
  const [submissionText, setSubmissionText] = useState<string>('');
  const [submittedTasks, setSubmittedTasks] = useState<Record<string, boolean>>({});

  const filteredTasks = mockTasks.filter((task) => {
    if (activeTab === 'today') {
      return task.dueDate === '2026-09-19' || task.status === 'in_progress';
    } else if (activeTab === 'upcoming') {
      return task.status !== 'submitted' && task.status !== 'evaluated' && task.dueDate !== '2026-09-19';
    } else if (activeTab === 'completed') {
      return task.status === 'evaluated' || task.status === 'submitted' || submittedTasks[task.id];
    }
    return true;
  });

  const getSubjectColor = (subjectId: string) => {
    switch (subjectId) {
      case 'mathematics': return '#4F7CFF';
      case 'physics': return '#7C4DFF';
      case 'chemistry': return '#20C997';
      case 'english': return '#FF8A3D';
      default: return '#172033';
    }
  };

  const handleSubmit = (taskId: string) => {
    setSubmittedTasks((prev) => ({ ...prev, [taskId]: true }));
    setActiveTaskModal(null);
    setSubmissionText('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
          Work
        </h1>
        <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
          Your academic inbox for assignments, homework, and tests.
        </p>
      </div>

      {/* 3 Simple Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'today', label: 'Today', count: 1 },
          { id: 'upcoming', label: 'Upcoming', count: 2 },
          { id: 'completed', label: 'Completed', count: 2 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-black transition-all flex items-center gap-2',
              activeTab === tab.id
                ? 'bg-[#172033] text-white shadow-xs'
                : 'text-[#667085] hover:text-[#172033] hover:bg-slate-100'
            )}
          >
            <span>{tab.label}</span>
            <span
              className={cn(
                'px-1.5 py-0.2 rounded-full text-[10px]',
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#E6EAF0] shadow-subtle space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-bold text-[#172033]">You're all caught up!</h3>
            <p className="text-xs text-[#667085]">No tasks in this category.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isSubmitted = submittedTasks[task.id] || task.status === 'submitted';
            const color = getSubjectColor(task.subjectId);

            return (
              <div
                key={task.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 hover:border-[#D0D5DD] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <span
                    className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black uppercase tracking-wider text-[#667085]">
                        {task.subjectName}
                      </span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs font-semibold text-[#667085]">
                        Due: {task.dueDate}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-[#172033] mt-0.5">
                      {task.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span className="text-xs font-bold text-[#667085]">
                    {task.maxMarks} Marks
                  </span>

                  <button
                    onClick={() => setActiveTaskModal(task)}
                    className={cn(
                      'px-5 py-2 rounded-full text-xs font-black transition-all flex items-center gap-1.5 shadow-xs',
                      isSubmitted
                        ? 'bg-slate-100 text-slate-500 cursor-default'
                        : 'bg-[#FFC800] hover:bg-[#E6B400] text-[#172033]'
                    )}
                  >
                    <span>{isSubmitted ? 'Submitted' : 'Start & Submit'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Task Submission Modal */}
      {activeTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-elevated border border-[#E6EAF0]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-black uppercase text-[#7C4DFF]">
                  {activeTaskModal.subjectName}
                </span>
                <h3 className="text-lg font-black text-[#172033] mt-1">
                  {activeTaskModal.title}
                </h3>
                <span className="text-xs text-[#667085]">
                  Due: {activeTaskModal.dueDate} • {activeTaskModal.maxMarks} Marks
                </span>
              </div>
              <button
                onClick={() => setActiveTaskModal(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7F9FC] text-xs text-slate-700 leading-relaxed">
              <strong>Instructions: </strong>
              {activeTaskModal.instructions}
            </div>

            <textarea
              rows={5}
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              placeholder="Type your response or worked solution here..."
              className="w-full text-xs sm:text-sm font-mono p-4 rounded-2xl border border-[#E6EAF0] focus:outline-none focus:border-[#FFC800] focus:ring-2 focus:ring-[#FFC800]/20"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => navigate('/student/lesson/phys-ch2-l3')}
                className="text-xs font-bold text-[#4F7CFF] hover:underline"
              >
                Learn Concept First
              </button>

              <button
                onClick={() => handleSubmit(activeTaskModal.id)}
                disabled={!submissionText.trim()}
                className="px-6 py-2.5 rounded-full text-xs font-black bg-[#172033] hover:bg-slate-800 text-white disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 shadow-xs transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Work</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
