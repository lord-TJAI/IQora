import React, { useState, useEffect } from 'react';
import { adminService, AdminDashboardData } from '@/services/adminService';
import { StatCard, Card } from '@/components/ui/Card';
import { PerformanceChart } from '@/components/teacher/PerformanceChart';
import { GraduationCap, Users, School, BookOpen, CalendarCheck, Award, FileText } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<AdminDashboardData | null>(null);

  useEffect(() => {
    adminService.getDashboard().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="py-12 text-center">
        <div className="w-8 h-8 rounded-full border-4 border-brand-primary border-t-transparent animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
          Institution Overview & Operations
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Apex Senior Secondary Academy • Academic Year 2026-2027
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Students"
          value={data.totalStudents}
          subvalue="8 active sections"
          icon={<GraduationCap className="w-5 h-5 text-brand-ai" />}
        />
        <StatCard
          label="Faculty Members"
          value={data.totalTeachers}
          subvalue="4 departments"
          icon={<Users className="w-5 h-5 text-blue-500" />}
        />
        <StatCard
          label="Institutional Attendance"
          value={`${data.overallAttendance}%`}
          trend={{ value: '↑ 1.2% this term', isPositive: true }}
          icon={<CalendarCheck className="w-5 h-5 text-emerald-500" />}
        />
        <StatCard
          label="Academic Performance"
          value={`${data.avgAcademicPerformance}%`}
          trend={{ value: '↑ 3.5% across subjects', isPositive: true }}
          icon={<Award className="w-5 h-5 text-amber-500" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart
          title="Subject Academic Performance (% Average)"
          data={data.subjectPerformance.map((s) => ({ name: s.subject, value: s.score }))}
        />

        <Card className="p-6 border border-brand-border space-y-4">
          <h4 className="text-base font-bold text-brand-text-primary">
            Class Sections & Roster Capacity
          </h4>
          <div className="space-y-3">
            {data.classesData.map((cls, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-brand-text-primary block text-sm">
                    {cls.name}
                  </span>
                  <span className="text-brand-text-secondary">
                    {cls.students} Enrolled Students
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-black text-brand-primary block text-sm">
                    {cls.avgMastery}% Mastery
                  </span>
                  <span className="text-emerald-600 font-semibold">
                    {cls.attendance}% Attendance
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
