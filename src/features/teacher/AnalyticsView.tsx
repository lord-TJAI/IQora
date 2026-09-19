import React from 'react';
import { PerformanceChart } from '@/components/teacher/PerformanceChart';
import { Card } from '@/components/ui/Card';

export const AnalyticsView: React.FC = () => {
  const masteryData = [
    { name: 'Electrostatics', value: 82 },
    { name: 'Current Elec.', value: 68 },
    { name: 'Magnetism', value: 54 },
    { name: 'Modern Phys.', value: 86 },
    { name: 'Optics', value: 71 },
  ];

  const attendanceTrendData = [
    { name: 'Mon', value: 92 },
    { name: 'Tue', value: 95 },
    { name: 'Wed', value: 91 },
    { name: 'Thu', value: 96 },
    { name: 'Fri', value: 94 },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
          Class 12 Academic Analytics
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Detailed performance metrics, attendance trends, and syllabus mastery tracking
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart
          title="Physics Chapter-Wise Class Mastery"
          data={masteryData}
        />
        <PerformanceChart
          type="line"
          title="Weekly Attendance Trend (Class 12-A)"
          data={attendanceTrendData}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 border border-brand-border text-center">
          <span className="text-xs font-bold text-brand-text-secondary block">
            Avg Test Score
          </span>
          <span className="text-3xl font-black text-brand-text-primary mt-1 block">
            78.4%
          </span>
          <span className="text-xs font-bold text-emerald-600 mt-1 block">
            ↑ 3.2% vs last term
          </span>
        </Card>

        <Card className="p-5 border border-brand-border text-center">
          <span className="text-xs font-bold text-brand-text-secondary block">
            Homework Submission Rate
          </span>
          <span className="text-3xl font-black text-brand-text-primary mt-1 block">
            91%
          </span>
          <span className="text-xs font-bold text-emerald-600 mt-1 block">
            38 of 42 on time
          </span>
        </Card>

        <Card className="p-5 border border-brand-border text-center">
          <span className="text-xs font-bold text-brand-text-secondary block">
            Remediation Resolution
          </span>
          <span className="text-3xl font-black text-brand-text-primary mt-1 block">
            85%
          </span>
          <span className="text-xs font-bold text-purple-600 mt-1 block">
            12 of 14 students improved
          </span>
        </Card>
      </div>
    </div>
  );
};
