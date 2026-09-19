import React, { useState, useEffect } from 'react';
import { adminService } from '@/services/adminService';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/Card';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';

export const AdminAcademicYear: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    adminService.getAcademicYear().then(setData);
  }, []);

  if (!data) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
          Academic Year & Term Calendar
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Manage term duration, working days, and institutional schedules
        </p>
      </div>

      <Card className="p-6 sm:p-8 border border-brand-border space-y-6 bg-white shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
          <div>
            <span className="text-xs font-bold text-brand-ai bg-purple-100 px-3 py-0.5 rounded-full uppercase tracking-wider">
              Current Session
            </span>
            <h2 className="text-2xl font-black text-brand-text-primary mt-1">
              Academic Year {data.year}
            </h2>
            <p className="text-xs text-brand-text-secondary">
              Active Term: {data.term} ({data.startDate} to {data.endDate})
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Session in Progress
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-brand-text-secondary">
            <span>Term Progress</span>
            <span>{data.completedDays} of {data.totalWorkingDays} Working Days Completed</span>
          </div>
          <ProgressBar
            value={data.completedDays}
            max={data.totalWorkingDays}
            color="bg-brand-primary"
            height="md"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-brand-text-secondary block">Start Date</span>
            <span className="text-base font-bold text-brand-text-primary mt-1 block">
              April 1, 2026
            </span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-brand-text-secondary block">Mid-Term Exams</span>
            <span className="text-base font-bold text-brand-text-primary mt-1 block">
              October 10, 2026
            </span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-brand-text-secondary block">End Date</span>
            <span className="text-base font-bold text-brand-text-primary mt-1 block">
              March 31, 2027
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
