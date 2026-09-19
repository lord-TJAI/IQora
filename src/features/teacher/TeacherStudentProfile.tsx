import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockClass12AStudents, mockSubjects } from '@/services/mock/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MasteryBar } from '@/components/learning/MasteryBar';
import { Avatar } from '@/components/ui/Avatar';
import { ArrowLeft, User, CalendarCheck, Award, AlertTriangle, MessageSquare } from 'lucide-react';

export const TeacherStudentProfile: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

  const student =
    mockClass12AStudents.find((s) => s.id === studentId) || mockClass12AStudents[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      <button
        onClick={() => navigate('/teacher/students')}
        className="inline-flex items-center gap-2 text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Student Roster</span>
      </button>

      {/* Student Overview Header */}
      <Card className="p-6 sm:p-8 border border-brand-border bg-white flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-subtle">
        <Avatar
          seed={student.name}
          name={student.name}
          role="student"
          size={80}
          className="ring-4 ring-slate-100 shadow-xs"
        />

        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-black text-brand-text-primary">
                {student.name}
              </h1>
              <p className="text-xs font-semibold text-brand-text-secondary">
                Roll No: {student.rollNumber} • {student.className}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-brand-ai self-center sm:self-auto">
              Status: {student.statusBadge}
            </span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-brand-text-secondary">
            <span>Attendance: <strong className="text-brand-text-primary">{student.attendancePercentage}%</strong></span>
            <span>•</span>
            <span>Overall Mastery: <strong className="text-brand-text-primary">{student.overallMastery}%</strong></span>
            <span>•</span>
            <span>Streak: <strong className="text-amber-600">🔥 {student.streakDays} days</strong></span>
          </div>
        </div>
      </Card>

      {/* Subject Mastery Grid */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-brand-text-primary">
          Subject-Level Mastery Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mockSubjects.map((sub) => {
            const score = student.subjectMastery[sub.id] || 70;
            return (
              <Card key={sub.id} className="p-4 border border-brand-border space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-brand-text-primary">{sub.name}</h4>
                  <span className="text-xs font-black">{score}%</span>
                </div>
                <MasteryBar percentage={score} />
              </Card>
            );
          })}
        </div>
      </div>

      {/* Identified Concept Gaps for this Student */}
      <Card className="p-5 border-l-4 border-l-amber-500 bg-amber-50/20 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
          <AlertTriangle className="w-4 h-4" />
          <span>Priority Intervention Area</span>
        </div>
        <h4 className="text-base font-bold text-brand-text-primary">
          Electric Potential & Potential Gradient (51% Mastery)
        </h4>
        <p className="text-xs text-slate-700 leading-relaxed">
          {student.name} missed 2 questions on potential gradient signs in the latest homework. Recommended for the automated 8-minute remediation quest.
        </p>
        <div className="pt-2">
          <Button
            size="sm"
            variant="ai"
            onClick={() => navigate('/teacher/interventions')}
          >
            Assign Targeted Remediation Quest
          </Button>
        </div>
      </Card>
    </div>
  );
};
