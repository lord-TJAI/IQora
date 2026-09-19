import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTasks } from '@/services/mock/mockData';
import { Table, Column } from '@/components/ui/Table';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Task } from '@/types/domain';
import { Plus, BookOpenCheck, Calendar } from 'lucide-react';

export const HomeworkList: React.FC = () => {
  const navigate = useNavigate();
  const homework = mockTasks.filter((t) => t.type === 'homework');

  const columns: Column<Task>[] = [
    {
      key: 'title',
      header: 'Homework Title',
      render: (task) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <BookOpenCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-brand-text-primary block">{task.title}</span>
            <span className="text-xs text-brand-text-secondary">{task.subjectName} • Class {task.classId}</span>
          </div>
        </div>
      ),
    },
    { key: 'dueDate', header: 'Due Date' },
    {
      key: 'completion',
      header: 'Submitted',
      render: () => <span className="font-bold text-brand-text-primary">38 / 42 (90%)</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: () => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
          Active
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
            Class Homework
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Track daily practice exercises and NCERT homework submissions
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate('/teacher/assignments/new')}
        >
          Assign Daily Homework
        </Button>
      </div>

      <Table
        columns={columns}
        data={homework}
        keyExtractor={(t) => t.id}
        onRowClick={() => navigate('/teacher/submissions')}
        renderMobileCard={(task) => (
          <Card className="p-4 border border-brand-border space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase">{task.subjectName}</span>
            <h4 className="text-sm font-bold text-brand-text-primary">{task.title}</h4>
            <div className="flex items-center justify-between text-xs text-brand-text-secondary pt-2 border-t border-slate-100">
              <span>Due: {task.dueDate}</span>
              <span className="font-bold text-emerald-600">38/42 Submitted</span>
            </div>
          </Card>
        )}
      />
    </div>
  );
};
