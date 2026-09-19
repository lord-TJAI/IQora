import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTasks } from '@/services/mock/mockData';
import { Task, TaskStatus } from '@/types/domain';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { Clock, Calendar, CheckCircle2, AlertCircle, ChevronRight, FileText } from 'lucide-react';
import { cn } from '@/utils/cn';

export const TasksList: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('all');

  const getFilteredTasks = () => {
    switch (activeTab) {
      case 'today':
        return mockTasks.filter((t) => t.dueDate === '2026-09-19');
      case 'in_progress':
        return mockTasks.filter((t) => t.status === 'in_progress' || t.status === 'not_started');
      case 'completed':
        return mockTasks.filter((t) => t.status === 'submitted' || t.status === 'evaluated');
      default:
        return mockTasks;
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'not_started':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">Not Started</span>;
      case 'in_progress':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">In Progress</span>;
      case 'submitted':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Submitted</span>;
      case 'evaluated':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Evaluated</span>;
      case 'overdue':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">Overdue</span>;
    }
  };

  const tasks = getFilteredTasks();

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text-primary tracking-tight">
            Academic Tasks & Homework
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Teacher assignments, homework problems, and revision deadlines
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pills"
        tabs={[
          { id: 'all', label: 'All Tasks', count: mockTasks.length },
          { id: 'today', label: 'Due Today', count: 1 },
          { id: 'in_progress', label: 'Pending', count: 2 },
          { id: 'completed', label: 'Submitted / Graded', count: 2 },
        ]}
      />

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <Card
            key={task.id}
            variant="interactive"
            onClick={() => navigate(`/student/tasks/${task.id}`)}
            className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-brand-border"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-ai flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-ai">
                    {task.subjectName}
                  </span>
                  <span className="text-xs text-brand-text-secondary">• {task.teacherName}</span>
                </div>
                <h4 className="text-base font-bold text-brand-text-primary mt-0.5 truncate">
                  {task.title}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-xs text-brand-text-secondary">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Due: {task.dueDate}
                  </span>
                  <span>Max Marks: {task.maxMarks}</span>
                  {task.score !== undefined && (
                    <span className="font-bold text-emerald-600">Score: {task.score}/{task.maxMarks}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              {getStatusBadge(task.status)}
              <ChevronRight className="w-4 h-4 text-brand-text-secondary" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
