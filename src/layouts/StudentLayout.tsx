import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Target, Bot, User, Bell } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { StreakBadge, XPBadge, LevelBadge } from '@/components/learning/StreakBadge';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { cn } from '@/utils/cn';

export const StudentLayout: React.FC = () => {
  const navigate = useNavigate();
  const { studentData, switchRole } = useAuthStore();

  const navItems = [
    { to: '/student/home', label: 'Home', icon: Home },
    { to: '/student/learn', label: 'Learn', icon: BookOpen },
    { to: '/student/practice', label: 'Practice', icon: Target },
    { to: '/student/ai', label: 'AI', icon: Bot, isAi: true },
    { to: '/student/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text-primary pb-20 md:pb-6">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-brand-border px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Brand Logo & Tagline */}
          <div
            onClick={() => navigate('/student/home')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center font-black text-brand-text-primary shadow-xs">
              IQ
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-brand-text-primary">
                IQora
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] font-semibold text-brand-text-secondary">
                Learn. Play. Master.
              </span>
            </div>
          </div>

          {/* Gamification Stats Row */}
          <div className="flex items-center gap-2 sm:gap-3">
            {studentData && (
              <>
                <StreakBadge days={studentData.streakDays} size="sm" />
                <XPBadge xp={studentData.xp} size="sm" />
                <div className="hidden sm:block">
                  <LevelBadge level={studentData.level} title={studentData.levelTitle} />
                </div>
              </>
            )}

            {/* Notification Bell */}
            <button
              onClick={() => navigate('/student/notifications')}
              className="p-2 rounded-xl text-brand-text-secondary hover:text-brand-text-primary hover:bg-slate-100 relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-error rounded-full" />
            </button>

            {/* Persona Switcher for Quick Review */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => switchRole('student')}
                className="px-2.5 py-1 rounded-lg bg-white text-brand-text-primary shadow-xs font-bold"
              >
                Student
              </button>
              <button
                onClick={() => {
                  switchRole('teacher');
                  navigate('/teacher/dashboard');
                }}
                className="px-2.5 py-1 rounded-lg text-slate-600 hover:text-brand-text-primary"
              >
                Teacher
              </button>
              <button
                onClick={() => {
                  switchRole('admin');
                  navigate('/admin/dashboard');
                }}
                className="px-2.5 py-1 rounded-lg text-slate-600 hover:text-brand-text-primary"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation (Section 14 & 76) */}
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-brand-border md:hidden shadow-float">
        <div className="flex items-center justify-around py-2 px-2 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all select-none',
                    isActive
                      ? item.isAi
                        ? 'text-brand-ai font-bold scale-105'
                        : 'text-brand-text-primary font-bold scale-105'
                      : 'text-brand-text-secondary hover:text-brand-text-primary'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={cn(
                        'p-1 rounded-lg transition-colors',
                        isActive && (item.isAi ? 'bg-purple-100' : 'bg-brand-primary/20')
                      )}
                    >
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] mt-0.5 tracking-tight font-semibold">
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
};
