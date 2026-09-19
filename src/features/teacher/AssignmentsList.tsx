import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTasks } from '@/services/mock/mockData';
import { Table, Column } from '@/components/ui/Table';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Task } from '@/types/domain';
import { Plus, FileText, Calendar, Users, ChevronRight } from 'lucide-react';

export const AssignmentsList: React.FC = () => {
  const navigate = useNavigate();

  const assignments = mockTasks.filter((t) => t.type === 'assignment');

  const columns: Column<Task>[] = [
    {
      key: 'title',
      header: 'Assignment Title',
      render: (task) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-brand-ai flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-brand-text-primary block">{task.title}</span>
            <span className="text-xs text-brand-text-secondary">{task.subjectName} • Class {task.classId}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'assignedDate',
      header: 'Assigned',
    },
    {
      key: 'dueDate',
      header: 'Due Date',
    },
    {
      key: 'submissions',
      header: 'Submissions',
      render: () => <span className="font-bold text-brand-text-primary">31 / 42</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: () => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
          Published
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
            Class Assignments
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Create, track, and evaluate Class 12 subjective and problem-solving assignments
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate('/teacher/assignments/new')}
        >
          Create New Assignment
        </Button>
      </div>

      <Table
        columns={columns}
        data={assignments}
        keyExtractor={(t) => t.id}
        onRowClick={() => navigate('/teacher/submissions')}
        renderMobileCard={(task) => (
          <Card className="p-4 border border-brand-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-ai uppercase">{task.subjectName}</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                Published
              </span>
            </div>
            <h4 className="text-sm font-bold text-brand-text-primary">{task.title}</h4>
            <div className="flex items-center justify-between text-xs text-brand-text-secondary pt-2 border-t border-slate-100">
              <span>Due: {task.dueDate}</span>
              <span className="font-bold text-brand-text-primary">31/42 Submitted</span>
            </div>
          </Card>
        )}
      />
    </div>
  );
};
