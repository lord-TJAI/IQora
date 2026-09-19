import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { teacherService, TeacherDashboardStats } from '@/services/teacherService';
import { StatCard, Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ConceptGapCard } from '@/components/teacher/ConceptGapCard';
import { InterventionCard } from '@/components/teacher/InterventionCard';
import { PerformanceChart } from '@/components/teacher/PerformanceChart';
import { Users, CalendarCheck, Award, FileText, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { teacherData } = useAuthStore();
  const [data, setData] = useState<TeacherDashboardStats | null>(null);

  useEffect(() => {
    teacherService.getDashboardData('12-A').then(setData);
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
            Good morning, {teacherData?.title || 'Ms. Sharma'}
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Class 12-A Command Center • 42 Students Enrolled
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigate('/teacher/assignments/new')}
          >
            + Create Assignment
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/teacher/tests/new')}
          >
            + Create Test
          </Button>
        </div>
      </div>

      {/* Top 4 Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Students"
          value={data.totalStudents}
          subvalue="Class 12-A"
          icon={<Users className="w-5 h-5 text-brand-ai" />}
        />
        <StatCard
          label="Attendance Today"
          value={`${data.attendanceToday}%`}
          trend={{ value: '↑ 2% vs last week', isPositive: true }}
          icon={<CalendarCheck className="w-5 h-5 text-emerald-500" />}
        />
        <StatCard
          label="Class Average"
          value={`${data.classAverage}%`}
          trend={{ value: '↑ 4% this month', isPositive: true }}
          icon={<Award className="w-5 h-5 text-amber-500" />}
        />
        <StatCard
          label="Active Tasks"
          value={data.activeTasksCount}
          subvalue="8 pending review"
          icon={<FileText className="w-5 h-5 text-blue-500" />}
        />
      </div>

      {/* Dominant AI Insight Card (Section 39) */}
      {data.urgentIntervention && (
        <InterventionCard
          intervention={data.urgentIntervention}
          onApprove={(id) => {
            teacherService.updateInterventionStatus(id, 'approved');
            navigate('/teacher/interventions');
          }}
          onAssign={(id) => {
            teacherService.updateInterventionStatus(id, 'assigned');
            navigate('/teacher/interventions');
          }}
        />
      )}

      {/* Today's Work & Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-brand-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-brand-text-primary">
              Today's Academic Tasks & Submissions
            </h3>
            <Button
              size="sm"
              variant="ghost"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => navigate('/teacher/submissions')}
            >
              Review All
            </Button>
          </div>

          <div className="space-y-3">
            {data.todaysTasks.map((task, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-ai block">
                    {task.subject}
                  </span>
                  <h4 className="text-sm font-bold text-brand-text-primary">
                    {task.title}
                  </h4>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-black text-brand-text-primary block">
                    {task.submitted} / {task.total}
                  </span>
                  <span className="text-[10px] text-brand-text-secondary font-semibold">
                    Submitted
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Subject Mastery Overview Chart */}
        <PerformanceChart
          title="Class 12-A Subject Mastery"
          data={data.subjectMasteries.map((s) => ({ name: s.name, value: s.percentage }))}
        />
      </div>

      {/* Concept Gaps Section (Section 39 & 53) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-brand-text-primary">
              Identified Concept Gaps in Class 12-A
            </h3>
            <p className="text-xs text-brand-text-secondary">
              Areas where students need teacher or AI intervention
            </p>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigate('/teacher/interventions')}
          >
            All Interventions
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.conceptGaps.map((gap, i) => (
            <ConceptGapCard
              key={i}
              concept={gap.concept}
              mastery={gap.mastery}
              affectedCount={gap.affectedCount}
              trend={gap.trend}
              onReviewIntervention={() => navigate('/teacher/interventions')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
