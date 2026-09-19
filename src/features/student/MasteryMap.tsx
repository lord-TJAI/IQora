import React, { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MasteryBar } from '@/components/learning/MasteryBar';
import { mockSubjects, mockChapters } from '@/services/mock/mockData';
import { Sparkles, TrendingUp, ArrowRight, ShieldCheck, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MasteryMap: React.FC = () => {
  const navigate = useNavigate();
  const { studentData } = useAuthStore();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('physics');

  const activeSubject =
    mockSubjects.find((s) => s.id === selectedSubjectId) || mockSubjects[1];

  const physicsChapters = [
    { name: 'Electrostatics', mastery: 82, status: 'Strong', trend: '+4%' },
    { name: 'Current Electricity', mastery: 68, status: 'Learning', trend: '+2%' },
    { name: 'Magnetism & Matter', mastery: 54, status: 'Needs Practice', trend: '-3%' },
    { name: 'Modern Physics', mastery: 86, status: 'Mastered', trend: '+8%' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text-primary tracking-tight">
          My Concept Mastery
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Real-time knowledge map built from your lessons, homework, and assessment evidence.
        </p>
      </div>

      {/* Overall Mastery Card */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-white to-amber-50/40 border-2 border-brand-primary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-subtle">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Overall Class 12 Preparedness
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-brand-text-primary">
            {studentData?.overallMastery || 74}% Comprehensive Mastery
          </h2>
          <p className="text-xs text-brand-text-secondary max-w-md">
            You are on track for high performance! Physics and Mathematics show steady upward momentum this week.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200 self-start sm:self-auto">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>+5.8% improvement this month</span>
        </div>
      </Card>

      {/* Subject Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {mockSubjects.map((sub) => {
          const isSelected = sub.id === selectedSubjectId;
          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-brand-primary bg-white shadow-subtle scale-102'
                  : 'border-brand-border bg-white/70 hover:bg-white hover:border-slate-300'
              }`}
            >
              <span className="text-xs font-bold text-brand-text-secondary block">
                {sub.name}
              </span>
              <span className="text-xl font-black text-brand-text-primary mt-1 block">
                {sub.overallMastery}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Subject Chapter Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-brand-text-primary">
            {activeSubject.name} — Chapter Mastery Breakdown
          </h3>
          <Button
            size="sm"
            variant="secondary"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={() => navigate(`/student/learn/${activeSubject.id}`)}
          >
            Go to Journey
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {physicsChapters.map((ch, idx) => (
            <Card key={idx} className="p-5 border border-brand-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-brand-text-primary">{ch.name}</h4>
                  <span className="text-xs font-bold text-emerald-600">{ch.trend}</span>
                </div>
                <div className="mt-3">
                  <MasteryBar percentage={ch.mastery} />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between">
                <span className="text-xs text-brand-text-secondary font-medium">
                  Status: <strong className="text-brand-text-primary">{ch.status}</strong>
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate('/student/learn/physics/phys-ch2')}
                >
                  View Concepts
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
