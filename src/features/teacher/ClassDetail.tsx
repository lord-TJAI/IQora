import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs } from '@/components/ui/Drawer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/Card';
import { mockClass12AStudents, mockSubjects } from '@/services/mock/mockData';
import { ArrowLeft, Users, CalendarCheck, FileText, Sparkles, BookOpen } from 'lucide-react';

export const ClassDetail: React.FC = () => {
  const { classId = '12-A' } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      <button
        onClick={() => navigate('/teacher/classes')}
        className="inline-flex items-center gap-2 text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Classes</span>
      </button>

      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-brand-border shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-brand-ai bg-purple-100 px-3 py-0.5 rounded-full">
            Active Section
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary mt-1">
            Class {classId} — Senior Secondary
          </h1>
          <p className="text-xs sm:text-sm text-brand-text-secondary mt-1">
            Class Teacher: Ms. Ananya Sharma • 42 Enrolled Students
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/teacher/attendance')}
          >
            Mark Attendance
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigate('/teacher/assignments/new')}
          >
            New Assignment
          </Button>
        </div>
      </div>

      {/* Navigation Tabs (Section 41) */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'students', label: 'Students Roster', count: 42 },
          { id: 'tasks', label: 'Class Tasks', count: 4 },
          { id: 'insights', label: 'Learning Gaps' },
        ]}
      />

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-brand-text-primary">
            Subject Progress in Class {classId}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockSubjects.map((sub) => (
              <Card key={sub.id} className="p-5 border border-brand-border space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-brand-text-primary">{sub.name}</h4>
                  <span className="text-sm font-extrabold text-brand-text-primary">
                    {sub.overallMastery}% Mastery
                  </span>
                </div>
                <ProgressBar
                  value={sub.overallMastery}
                  max={100}
                  color={sub.id === 'physics' ? 'bg-purple-600' : 'bg-blue-600'}
                  height="sm"
                />
                <p className="text-xs text-brand-text-secondary">
                  {sub.completedLessons} of {sub.totalLessons} lessons completed on average
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'students' && (
        <div className="space-y-3">
          {mockClass12AStudents.map((st) => (
            <Card
              key={st.id}
              variant="interactive"
              onClick={() => navigate(`/teacher/students/${st.id}`)}
              className="p-4 flex items-center justify-between border border-brand-border"
            >
              <div className="flex items-center gap-3">
                <img
                  src={st.avatarUrl}
                  alt={st.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-brand-text-primary">{st.name}</h4>
                  <span className="text-xs text-brand-text-secondary">
                    Roll: {st.rollNumber} • Mastery: {st.overallMastery}%
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                {st.statusBadge}
              </span>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="text-center py-6">
          <p className="text-xs text-brand-text-secondary">
            Viewing all tasks assigned to Class {classId}.
          </p>
          <Button
            size="sm"
            variant="secondary"
            className="mt-3"
            onClick={() => navigate('/teacher/assignments')}
          >
            Manage Class Assignments
          </Button>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-3">
          <Card className="p-5 border-l-4 border-l-amber-500 bg-amber-50/20">
            <h4 className="text-sm font-bold text-brand-text-primary">
              Electric Potential & Potential Gradient (17 students struggling)
            </h4>
            <p className="text-xs text-brand-text-secondary mt-1">
              Class average on this concept dropped below 55%. An 8-minute remediation intervention is prepared.
            </p>
            <Button
              size="sm"
              variant="ai"
              className="mt-3"
              onClick={() => navigate('/teacher/interventions')}
            >
              Review Intervention
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};
