import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTasks } from '@/services/mock/mockData';
import { Task, TaskType, TaskStatus, SubjectId } from '@/types/domain';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  BookOpen,
  ArrowRight,
  Send,
  Zap,
  Filter,
  Layers,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const WorkView: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'submitted' | 'needs_review' | 'completed'>('today');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [activeTaskModal, setActiveTaskModal] = useState<Task | null>(null);
  const [submissionText, setSubmissionText] = useState<string>('');
  const [submittedTasks, setSubmittedTasks] = useState<Record<string, boolean>>({});

  // Filter tasks
  const filteredTasks = mockTasks.filter((task) => {
    // Tab filter
    if (activeTab === 'today') {
      if (task.dueDate !== '2026-09-19' && task.status !== 'in_progress') return false;
    } else if (activeTab === 'upcoming') {
      if (task.status === 'submitted' || task.status === 'evaluated' || task.dueDate === '2026-09-19') return false;
    } else if (activeTab === 'submitted') {
      if (task.status !== 'submitted') return false;
    } else if (activeTab === 'needs_review') {
      if (task.status !== 'overdue' && task.progressPercentage < 50) return false;
    } else if (activeTab === 'completed') {
      if (task.status !== 'evaluated' && task.status !== 'submitted') return false;
    }

    // Type filter
    if (selectedType !== 'all' && task.type !== selectedType) return false;

    // Subject filter
    if (selectedSubject !== 'all' && task.subjectId !== selectedSubject) return false;

    return true;
  });

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'not_started':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">Not Started</span>;
      case 'in_progress':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">In Progress</span>;
      case 'submitted':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">Submitted</span>;
      case 'evaluated':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Graded</span>;
      case 'overdue':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">Overdue</span>;
      default:
        return null;
    }
  };

  const handleSubmitTask = (taskId: string) => {
    setSubmittedTasks((prev) => ({ ...prev, [taskId]: true }));
    setActiveTaskModal(null);
    setSubmissionText('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#172033] text-white text-xs font-black uppercase tracking-wider">
              Academic Workspace
            </span>
            <span className="text-xs font-bold text-[#667085]">
              CBSE Class 12 Tasks
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight mt-1.5">
            Your Work & Assignments
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            Teacher assignments, homework, and tests connected directly to your learning loop
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#E6EAF0] shadow-2xs self-start sm:self-auto">
          <div className="text-center px-3 border-r border-slate-100">
            <span className="text-xs font-bold text-[#667085] block">Due Today</span>
            <span className="text-lg font-black text-[#172033]">1</span>
          </div>
          <div className="text-center px-3 border-r border-slate-100">
            <span className="text-xs font-bold text-[#667085] block">Pending</span>
            <span className="text-lg font-black text-amber-600">2</span>
          </div>
          <div className="text-center px-3">
            <span className="text-xs font-bold text-[#667085] block">Completed</span>
            <span className="text-lg font-black text-emerald-600">2</span>
          </div>
        </div>
      </div>

      {/* 2. Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'today', label: 'Today', count: 1 },
          { id: 'upcoming', label: 'Upcoming', count: 2 },
          { id: 'submitted', label: 'Submitted', count: 1 },
          { id: 'needs_review', label: 'Needs Review', count: 1 },
          { id: 'completed', label: 'Completed', count: 1 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              'px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap',
              activeTab === tab.id
                ? 'bg-[#172033] text-white shadow-xs'
                : 'bg-white border border-[#E6EAF0] text-[#667085] hover:text-[#172033]'
            )}
          >
            <span>{tab.label}</span>
            <span
              className={cn(
                'px-1.5 py-0.5 rounded-full text-[10px]',
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 3. Filter Bar (Type & Subject) */}
      <div className="bg-white p-4 rounded-2xl border border-[#E6EAF0] shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-[#667085] flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Type:
          </span>
          {['all', 'assignment', 'homework', 'test', 'practice'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={cn(
                'px-3 py-1 rounded-xl text-xs font-bold transition-all capitalize',
                selectedType === type
                  ? 'bg-[#FFC800] text-[#172033]'
                  : 'bg-[#F7F9FC] text-[#667085] hover:text-[#172033]'
              )}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#667085]">Subject:</span>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="text-xs font-bold bg-[#F7F9FC] border border-[#E6EAF0] rounded-xl px-3 py-1.5 text-[#172033] focus:outline-none"
          >
            <option value="all">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="english">English</option>
          </select>
        </div>
      </div>

      {/* 4. Task Cards List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#E6EAF0] shadow-subtle space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-base font-black text-[#172033]">You're all caught up!</h3>
            <p className="text-xs text-[#667085]">No tasks currently in this category.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isSubmitted = submittedTasks[task.id] || task.status === 'submitted';

            return (
              <div
                key={task.id}
                className="bg-white rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 shadow-subtle hover:border-[#D0D5DD] transition-all space-y-4"
              >
                {/* Top Row: Subject & Due Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#F5F0FF] text-[#7C4DFF] uppercase tracking-wider">
                      {task.subjectName}
                    </span>
                    <span className="text-xs font-bold text-[#667085]">
                      • Assigned by {task.teacherName}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      • {task.type.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#667085] font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Due: {task.dueDate}</span>
                    </div>
                    {getStatusBadge(isSubmitted ? 'submitted' : task.status)}
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#172033]">
                    {task.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#667085] mt-1 leading-relaxed">
                    {task.description}
                  </p>
                </div>

                {/* Connected Learning Loop & Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#F0F2F5]">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Deep Learning Connection 1: Learn Concept */}
                    <button
                      onClick={() => navigate('/student/lesson/phys-ch2-l3')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7F9FC] hover:bg-[#EEF2F6] text-xs font-bold text-[#172033] border border-[#E6EAF0] transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#7C4DFF]" />
                      <span>Learn Concept</span>
                    </button>

                    {/* Deep Learning Connection 2: Practice */}
                    <button
                      onClick={() => navigate('/student/practice')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7F9FC] hover:bg-[#EEF2F6] text-xs font-bold text-[#172033] border border-[#E6EAF0] transition-colors"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Targeted Practice</span>
                    </button>
                  </div>

                  {/* Submission Action */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#667085]">
                      Max Marks: {task.maxMarks}
                    </span>

                    <button
                      onClick={() => setActiveTaskModal(task)}
                      className={cn(
                        'px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-xs',
                        isSubmitted
                          ? 'bg-slate-100 text-slate-500 cursor-default'
                          : 'bg-[#FFC800] hover:bg-[#E6B400] text-[#172033]'
                      )}
                    >
                      <span>{isSubmitted ? 'View Submission' : 'Start & Submit'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 5. In-Place Task Submission Modal */}
      {activeTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 space-y-5 shadow-elevated border border-[#E6EAF0]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-black uppercase text-[#7C4DFF]">
                  {activeTaskModal.subjectName} • {activeTaskModal.type}
                </span>
                <h3 className="text-xl font-black text-[#172033] mt-1">
                  {activeTaskModal.title}
                </h3>
                <p className="text-xs text-[#667085] mt-0.5">
                  Assigned by {activeTaskModal.teacherName} • Max Marks: {activeTaskModal.maxMarks}
                </p>
              </div>
              <button
                onClick={() => setActiveTaskModal(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#E6EAF0] text-xs text-slate-700 space-y-1.5 leading-relaxed">
              <span className="font-bold text-[#172033] block">Teacher Instructions:</span>
              <p>{activeTaskModal.instructions}</p>
            </div>

            {/* Response Editor */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#172033] block">
                Your Work / Numerical Solution / Response:
              </span>
              <textarea
                rows={6}
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                placeholder="Type your worked steps, formulas used, and final answer..."
                className="w-full text-xs sm:text-sm font-mono p-4 rounded-2xl border border-[#E6EAF0] focus:outline-none focus:border-[#FFC800] focus:ring-2 focus:ring-[#FFC800]/20 leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => navigate('/student/lesson/phys-ch2-l3')}
                className="text-xs font-bold text-[#4F7CFF] hover:underline flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Review Concept in Lesson First</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTaskModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#667085] hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSubmitTask(activeTaskModal.id)}
                  disabled={!submissionText.trim()}
                  className="px-6 py-2.5 rounded-xl text-xs font-black bg-[#172033] hover:bg-slate-800 text-white disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 shadow-xs transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to Teacher</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
