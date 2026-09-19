import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Target,
  Briefcase,
  Sparkles,
  User,
  Search,
  Bell,
  LogOut,
  MessageSquare,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { AskTeacherModal } from '@/components/query/AskTeacherModal';
import { cn } from '@/utils/cn';

export const StudentLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { studentData, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isAskTeacherOpen, setIsAskTeacherOpen] = useState(false);

  const navItems = [
    { to: '/student/home', label: 'Home', icon: Home },
    { to: '/student/learn', label: 'Learn', icon: BookOpen },
    { to: '/student/practice', label: 'Practice', icon: Target },
    { to: '/student/work', label: 'Work', icon: Briefcase },
    { to: '/student/ai', label: 'AI', icon: Sparkles },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/student/learn');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#172033] pb-24 md:pb-8">
      {/* Desktop & Tablet Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6EAF0] px-4 sm:px-8 py-3.5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          {/* 1. Brand Logo */}
          <div
            onClick={() => navigate('/student/home')}
            className="flex items-center gap-3 cursor-pointer select-none flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#FFC800] flex items-center justify-center font-black text-lg text-[#172033] shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="12" r="4.5" stroke="#172033" strokeWidth="2.5" />
                <circle cx="16" cy="12" r="4.5" stroke="#172033" strokeWidth="2.5" />
                <path d="M12.5 12C12.5 12 14 9.5 16 9.5C18 9.5 19.5 10.6 19.5 12C19.5 13.4 18 14.5 16 14.5C14 14.5 12.5 12 12.5 12ZM12.5 12C12.5 12 11 9.5 9 9.5C7 9.5 5.5 10.6 5.5 12C5.5 13.4 7 14.5 9 14.5C11 14.5 12.5 12 12.5 12Z" fill="#172033" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-[#172033] leading-none">
                IQora
              </span>
              <span className="text-[10px] font-semibold text-[#667085] tracking-wide mt-0.5">
                Learn. Play. Master.
              </span>
            </div>
          </div>

          {/* 2. Center Pill Navigation (Visible on Tablet & Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#F7F9FC] p-1.5 rounded-full border border-[#E6EAF0]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.to ||
                (item.to !== '/student/home' && location.pathname.startsWith(item.to));

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all select-none',
                    isActive
                      ? 'bg-[#FFC800] text-[#172033] shadow-xs'
                      : 'text-[#667085] hover:text-[#172033] hover:bg-white/60'
                  )}
                >
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* 3. Right Controls: Search, Notifications, Profile Avatar */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="relative hidden lg:block w-64">
              <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subjects, topics..."
                className="w-full pl-9 pr-4 py-2 bg-[#F7F9FC] border border-[#E6EAF0] rounded-full text-xs font-medium text-[#172033] placeholder:text-[#98A2B3] focus:outline-none focus:border-[#FFC800] focus:ring-2 focus:ring-[#FFC800]/20 transition-colors"
              />
            </form>

            {/* Ask Teacher (General Doubt System) */}
            <button
              onClick={() => setIsAskTeacherOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-colors"
              title="Ask your teacher a doubt"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask Teacher</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => navigate('/student/notifications')}
              className="p-2.5 rounded-full bg-[#F7F9FC] text-[#667085] hover:text-[#172033] hover:bg-slate-100 relative transition-colors border border-[#E6EAF0]"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF5C5C] rounded-full ring-2 ring-white" />
            </button>

            {/* User Profile Avatar with dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#FFC800]/40 transition-all focus:outline-none group"
                title="Account & Profile"
              >
                <img
                  src={
                    studentData?.avatarUrl ||
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                  }
                  alt={studentData?.name || 'Arjun'}
                  className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-xs group-hover:scale-105 transition-transform"
                />
              </button>

              {/* Profile Dropdown Menu */}
              {profileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-12 mt-2 w-64 rounded-2xl bg-white border border-[#E6EAF0] shadow-elevated p-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="p-3 bg-[#FAFBFD] rounded-xl border border-slate-100 mb-1">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={
                            studentData?.avatarUrl ||
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                          }
                          alt={studentData?.name || 'Arjun'}
                          className="w-9 h-9 rounded-full object-cover border border-white shadow-xs"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-black text-[#172033] truncate">
                            {studentData?.name || 'Arjun Sharma'}
                          </p>
                          <p className="text-[10px] font-bold text-[#667085] truncate">
                            Class 12-A • PCM + English
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          navigate('/student/profile');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#172033] hover:bg-slate-50 transition-colors text-left"
                      >
                        <User className="w-4 h-4 text-[#667085]" />
                        <span>Profile & Progress</span>
                      </button>

                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          setIsAskTeacherOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-purple-700 hover:bg-purple-50 transition-colors text-left"
                      >
                        <MessageSquare className="w-4 h-4 text-purple-600" />
                        <span>Ask Teacher a Doubt</span>
                      </button>

                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          navigate('/student/notifications');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#172033] hover:bg-slate-50 transition-colors text-left"
                      >
                        <Bell className="w-4 h-4 text-[#667085]" />
                        <span>Notifications</span>
                      </button>
                    </div>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        logout();
                        navigate('/login');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation (Preserves Focus, 5 Items Only) */}
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E6EAF0] md:hidden shadow-float">
        <div className="flex items-center justify-around py-2 px-2 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all select-none',
                    isActive
                      ? 'text-[#172033] font-bold scale-105'
                      : 'text-[#667085] hover:text-[#172033]'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={cn(
                        'p-1.5 rounded-xl transition-colors',
                        isActive ? 'bg-[#FFC800] text-[#172033] shadow-xs' : 'text-[#667085]'
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

      {/* General Ask Teacher Doubt Modal */}
      <AskTeacherModal
        isOpen={isAskTeacherOpen}
        onClose={() => setIsAskTeacherOpen(false)}
      />

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
};
