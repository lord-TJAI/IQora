import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { School, Users, CalendarCheck, Award, ChevronRight } from 'lucide-react';

export const ClassesList: React.FC = () => {
  const navigate = useNavigate();

  const classes = [
    {
      id: '12-A',
      name: 'Class 12-A',
      stream: 'Science (Physics, Chem, Math, Bio)',
      students: 42,
      attendance: 94,
      avgScore: 78,
      pendingTasks: 3,
    },
    {
      id: '12-B',
      name: 'Class 12-B',
      stream: 'Science (Physics, Chem, Computer Science)',
      students: 39,
      attendance: 92,
      avgScore: 75,
      pendingTasks: 2,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
          Assigned Classes
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Select a class section to view detailed rosters, attendance, and subject mastery
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {classes.map((cls) => (
          <Card
            key={cls.id}
            variant="interactive"
            onClick={() => navigate(`/teacher/classes/${cls.id}`)}
            className="p-6 border border-brand-border space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-brand-ai flex items-center justify-center">
                  <School className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-text-primary">{cls.name}</h3>
                  <span className="text-xs text-brand-text-secondary">{cls.stream}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-brand-text-secondary" />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-brand-border text-center">
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-[11px] font-bold text-brand-text-secondary block">Students</span>
                <span className="text-base font-black text-brand-text-primary mt-0.5 block">{cls.students}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-[11px] font-bold text-brand-text-secondary block">Attendance</span>
                <span className="text-base font-black text-emerald-600 mt-0.5 block">{cls.attendance}%</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-[11px] font-bold text-brand-text-secondary block">Average</span>
                <span className="text-base font-black text-brand-primary mt-0.5 block">{cls.avgScore}%</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-semibold text-brand-text-secondary">
              <span>{cls.pendingTasks} tasks awaiting evaluation</span>
              <Button size="sm" variant="secondary">
                Open Command View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
