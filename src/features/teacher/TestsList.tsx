import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTests } from '@/services/mock/mockData';
import { Table, Column } from '@/components/ui/Table';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Test } from '@/types/domain';
import { Plus, CheckSquare, Clock, Users, Award } from 'lucide-react';

export const TestsList: React.FC = () => {
  const navigate = useNavigate();

  const columns: Column<Test>[] = [
    {
      key: 'title',
      header: 'Assessment Title',
      render: (test) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-brand-text-primary block">{test.title}</span>
            <span className="text-xs text-brand-text-secondary">{test.subjectName} • {test.chapterTitle}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'duration',
      header: 'Duration',
      render: (t) => <span>{t.durationMinutes} mins</span>,
    },
    {
      key: 'totalQuestions',
      header: 'Questions',
      render: (t) => <span>{t.totalQuestions} Qs</span>,
    },
    {
      key: 'averageScore',
      header: 'Class Avg',
      render: (t) => <span className="font-extrabold text-brand-text-primary">{t.averageScore}%</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (t) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase">
          {t.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
            Class Assessments & Tests
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Conduct timed unit tests and analyze class-wide concept mastery changes
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate('/teacher/tests/new')}
        >
          Create New Test
        </Button>
      </div>

      <Table
        columns={columns}
        data={mockTests}
        keyExtractor={(t) => t.id}
        renderMobileCard={(test) => (
          <Card className="p-4 border border-brand-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-ai uppercase">{test.subjectName}</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                {test.status}
              </span>
            </div>
            <h4 className="text-sm font-bold text-brand-text-primary">{test.title}</h4>
            <div className="flex items-center justify-between text-xs text-brand-text-secondary pt-2 border-t border-slate-100">
              <span>{test.durationMinutes} mins • {test.totalQuestions} Qs</span>
              <span className="font-bold text-brand-text-primary">Avg: {test.averageScore}%</span>
            </div>
          </Card>
        )}
      />
    </div>
  );
};
