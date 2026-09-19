import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Badge';
import { StreakBadge, XPBadge, LevelBadge } from '@/components/learning/StreakBadge';
import { mockAchievements } from '@/services/mock/mockData';
import { AchievementCard } from '@/components/learning/AchievementCard';
import { useNavigate } from 'react-router-dom';
import { Settings, Award, Bell, Shield, LogOut, ArrowRight } from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const navigate = useNavigate();
  const { studentData, logout } = useAuthStore();

  if (!studentData) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Profile Header Card */}
      <Card className="p-6 sm:p-8 border border-brand-border bg-white flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-subtle text-center sm:text-left">
        <Avatar
          src={studentData.avatarUrl}
          name={studentData.name}
          size="xl"
          className="ring-4 ring-brand-primary/30"
        />

        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-black text-brand-text-primary">
                {studentData.name}
              </h1>
              <p className="text-xs font-semibold text-brand-text-secondary">
                Roll No: {studentData.rollNumber} • {studentData.className}
              </p>
            </div>
            <LevelBadge level={studentData.level} title={studentData.levelTitle} />
          </div>

          {/* Badges row */}
          <div className="flex items-center justify-center sm:justify-start gap-2 pt-2 flex-wrap">
            <StreakBadge days={studentData.streakDays} size="sm" />
            <XPBadge xp={studentData.xp} size="sm" />
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {studentData.overallMastery}% Mastery
            </span>
          </div>
        </div>
      </Card>

      {/* Academic Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-brand-border text-center">
          <span className="text-xs font-bold text-brand-text-secondary block">Attendance</span>
          <span className="text-xl font-black text-brand-text-primary mt-1 block">
            {studentData.attendancePercentage}%
          </span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-brand-border text-center">
          <span className="text-xs font-bold text-brand-text-secondary block">Completed Lessons</span>
          <span className="text-xl font-black text-brand-text-primary mt-1 block">31</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-brand-border text-center">
          <span className="text-xs font-bold text-brand-text-secondary block">Questions Solved</span>
          <span className="text-xl font-black text-brand-text-primary mt-1 block">142</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-brand-border text-center">
          <span className="text-xs font-bold text-brand-text-secondary block">Achievements</span>
          <span className="text-xl font-black text-brand-text-primary mt-1 block">4 / 6</span>
        </div>
      </div>

      {/* Achievements Showcase Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-brand-text-primary">
              Recent Badges & Achievements
            </h3>
          </div>
          <Button
            size="sm"
            variant="ghost"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={() => navigate('/student/achievements')}
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {mockAchievements.slice(0, 3).map((ach) => (
            <AchievementCard key={ach.id} achievement={ach} />
          ))}
        </div>
      </div>

      {/* Settings & Preferences */}
      <Card className="p-5 border border-brand-border space-y-2">
        <h3 className="text-sm font-bold text-brand-text-primary mb-2">
          Account & App Settings
        </h3>

        <div className="divide-y divide-brand-border text-xs">
          <button
            onClick={() => navigate('/student/notifications')}
            className="w-full py-3 flex items-center justify-between text-left hover:bg-slate-50 px-2 rounded-xl transition-colors"
          >
            <span className="flex items-center gap-2 font-medium text-brand-text-primary">
              <Bell className="w-4 h-4 text-slate-500" /> Notification Preferences
            </span>
            <span className="text-brand-text-secondary">Push, Email enabled</span>
          </button>

          <div className="w-full py-3 flex items-center justify-between px-2">
            <span className="flex items-center gap-2 font-medium text-brand-text-primary">
              <Shield className="w-4 h-4 text-slate-500" /> Academic Privacy & Data
            </span>
            <span className="text-brand-text-secondary">Class 12-A Visible</span>
          </div>
        </div>

        <div className="pt-3 border-t border-brand-border">
          <Button
            variant="danger"
            size="sm"
            leftIcon={<LogOut className="w-3.5 h-3.5" />}
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
};
