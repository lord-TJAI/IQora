import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  School,
  Users,
  FileText,
  BookOpenCheck,
  CheckSquare,
  CalendarCheck,
  Inbox,
  BarChart3,
  Sparkles,
  FolderArchive,
  Settings,
  Menu,
  X,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { ClassSelector } from '@/components/teacher/ClassSelector';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { cn } from '@/utils/cn';

export const TeacherLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { teacherData, switchRole, logout } = useAuthStore();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeClass, setActiveClass] = useState('12-A');

  const navItems = [
    { to: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/teacher/classes', label: 'Classes', icon: School },
    { to: '/teacher/students', label: 'Students', icon: Users },
    { to: '/teacher/assignments', label: 'Assignments', icon: FileText },
    { to: '/teacher/homework', label: 'Homework', icon: BookOpenCheck },
    { to: '/teacher/tests', label: 'Tests', icon: CheckSquare },
    { to: '/teacher/attendance', label: 'Attendance', icon: CalendarCheck },
    { to: '/teacher/submissions', label: 'Submissions', icon: Inbox },
    { to: '/teacher/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/teacher/interventions', label: 'AI Interventions', icon: Sparkles, isAi: true },
    { to: '/teacher/materials', label: 'Study Materials', icon: FolderArchive },
    { to: '/teacher/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-brand-bg text-brand-text-primary">
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <aside
        className={cn(
          'fixed md:sticky top-0 h-screen z-50 bg-white border-r border-brand-border flex flex-col justify-between transition-all duration-200',
          sidebarCollapsed ? 'w-20' : 'w-64',
          mobileMenuOpen ? 'left-0' : '-left-64 md:left-0'
        )}
      >
        <div>
          {/* Header / Brand */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-brand-border">
            <div
              onClick={() => navigate('/teacher/dashboard')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-text-primary text-white flex items-center justify-center font-extrabold text-sm">
                IQ
              </div>
              {!sidebarCollapsed && (
                <div className="min-w-0">
                  <span className="font-extrabold text-base tracking-tight text-brand-text-primary block">
                    IQora
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-ai block -mt-1">
                    Teacher Portal
                  </span>
                </div>
              )}
            </div>

            {/* Mobile close or desktop collapse */}
            <div className="flex items-center">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden p-1.5 rounded-lg text-brand-text-secondary hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden md:flex p-1.5 rounded-lg text-brand-text-secondary hover:bg-slate-100"
                title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.to ||
                (item.to !== '/teacher/dashboard' && location.pathname.startsWith(item.to));

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all select-none',
                    isActive
                      ? item.isAi
                        ? 'bg-purple-100 text-brand-ai font-bold shadow-xs'
                        : 'bg-brand-primary/20 text-brand-text-primary font-bold'
                      : 'text-brand-text-secondary hover:text-brand-text-primary hover:bg-slate-50'
                  )}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5 flex-shrink-0',
                      isActive && (item.isAi ? 'text-brand-ai' : 'text-brand-text-primary')
                    )}
                  />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Teacher Profile & Role Switcher */}
        <div className="p-3 border-t border-brand-border">
          {!sidebarCollapsed && teacherData && (
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 mb-2">
              <img
                src={teacherData.avatarUrl}
                alt={teacherData.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-brand-text-primary truncate">
                  {teacherData.title}
                </p>
                <p className="text-[10px] text-brand-text-secondary truncate">
                  Physics Dept • Class 12
                </p>
              </div>
            </div>
          )}

          {/* Persona quick switch */}
          {!sidebarCollapsed && (
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-semibold mb-2">
              <button
                onClick={() => {
                  switchRole('student');
                  navigate('/student/home');
                }}
                className="flex-1 py-1 rounded-lg text-slate-600 hover:text-brand-text-primary text-center"
              >
                Student
              </button>
              <button
                onClick={() => switchRole('teacher')}
                className="flex-1 py-1 rounded-lg bg-white text-brand-text-primary shadow-xs font-bold text-center"
              >
                Teacher
              </button>
              <button
                onClick={() => {
                  switchRole('admin');
                  navigate('/admin/dashboard');
                }}
                className="flex-1 py-1 rounded-lg text-slate-600 hover:text-brand-text-primary text-center"
              >
                Admin
              </button>
            </div>
          )}

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!sidebarCollapsed && <span>Log out</span>}
          </button>
        </div>
      </aside>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-brand-border h-16 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-brand-text-secondary hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <ClassSelector selectedClass={activeClass} onSelectClass={setActiveClass} />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/teacher/interventions')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-brand-ai border border-purple-200 text-xs font-bold hover:bg-purple-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1 Intervention Pending</span>
            </button>

            <button
              onClick={() => navigate('/teacher/dashboard')}
              className="p-2 rounded-xl text-brand-text-secondary hover:text-brand-text-primary hover:bg-slate-100 relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-primary rounded-full" />
            </button>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};
