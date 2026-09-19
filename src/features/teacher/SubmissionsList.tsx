import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockSubmissions } from '@/services/mock/mockData';
import { Table, Column } from '@/components/ui/Table';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Submission } from '@/types/domain';
import { Inbox, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

export const SubmissionsList: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filtered = mockSubmissions.filter((sub) => {
    if (filter === 'pending') return sub.status === 'pending';
    if (filter === 'evaluated') return sub.status === 'evaluated';
    return true;
  });

  const columns: Column<Submission>[] = [
    {
      key: 'student',
      header: 'Student',
      render: (sub) => (
        <div className="flex items-center gap-3">
          <img
            src={sub.studentAvatar}
            alt={sub.studentName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-bold text-brand-text-primary">{sub.studentName}</span>
        </div>
      ),
    },
    {
      key: 'taskTitle',
      header: 'Task Title',
      render: (sub) => (
        <div>
          <span className="font-bold text-brand-text-primary block">{sub.taskTitle}</span>
          <span className="text-xs text-brand-text-secondary uppercase">{sub.subjectId}</span>
        </div>
      ),
    },
    {
      key: 'submittedAt',
      header: 'Submitted',
      render: () => <span className="text-xs text-brand-text-secondary">Today, 10:15 AM</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (sub) => (
        <span
          className={cn(
            'px-2.5 py-0.5 rounded-full text-xs font-bold',
            sub.status === 'pending'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-emerald-100 text-emerald-800'
          )}
        >
          {sub.status === 'pending' ? 'Needs Grading' : 'Evaluated'}
        </span>
      ),
    },
    {
      key: 'action',
      header: '',
      render: (sub) => (
        <Button
          size="sm"
          variant={sub.status === 'pending' ? 'primary' : 'secondary'}
          onClick={() => navigate(`/teacher/submissions/${sub.id}`)}
        >
          {sub.status === 'pending' ? 'Grade with AI' : 'View Feedback'}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
            Student Submissions
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Review student derivations, check AI assessment suggestions, and return graded feedback
          </p>
        </div>
      </div>

      <Table
        columns={columns}
        data={filtered}
        keyExtractor={(s) => s.id}
        onRowClick={(s) => navigate(`/teacher/submissions/${s.id}`)}
        renderMobileCard={(sub) => (
          <Card className="p-4 border border-brand-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-brand-text-primary">{sub.studentName}</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                {sub.status}
              </span>
            </div>
            <p className="text-xs text-brand-text-secondary">{sub.taskTitle}</p>
            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <Button
                size="sm"
                variant="primary"
                onClick={() => navigate(`/teacher/submissions/${sub.id}`)}
              >
                Grade with AI
              </Button>
            </div>
          </Card>
        )}
      />
    </div>
  );
};
