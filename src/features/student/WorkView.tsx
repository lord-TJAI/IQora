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

  const filteredTasks = mockTasks.filter((task) => {
    if (activeTab === 'today') {
      return task.dueDate === '2026-09-19' || task.status === 'in_progress';
    } else if (activeTab === 'upcoming') {
      return task.status !== 'submitted' && task.status !== 'evaluated' && task.dueDate !== '2026-09-19';
    } else if (activeTab === 'completed') {
      return task.status === 'evaluated' || task.status === 'submitted';
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

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
          Work & Assignments
        </h1>
        <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
          Your academic workspace for assignments, homework, and lab submissions.
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
            const isSubmitted = task.status === 'submitted' || task.status === 'evaluated';
            const color = getSubjectColor(task.subjectId);

            return (
              <div
                key={task.id}
                onClick={() => navigate(`/student/work/${task.id}`)}
                className="bg-white rounded-2xl sm:rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 hover:border-[#D0D5DD] hover:shadow-subtle cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5">
                  <span
                    className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
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
                      {task.status === 'in_progress' && (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          In Progress
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-black text-[#172033] mt-0.5 group-hover:text-[#4F7CFF] transition-colors">
                      {task.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span className="text-xs font-bold text-[#667085]">
                    {task.maxMarks} Marks
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/student/work/${task.id}`);
                    }}
                    className={cn(
                      'px-5 py-2.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 shadow-xs',
                      isSubmitted
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-[#FFC800] hover:bg-[#E6B400] text-[#172033]'
                    )}
                  >
                    <span>{isSubmitted ? 'View Submission' : 'Submit Work'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
