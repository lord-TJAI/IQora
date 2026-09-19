import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  GraduationCap,
  Users,
  School,
  BookOpen,
  Calendar,
  FileBarChart,
  Settings,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { cn } from '@/utils/cn';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminData, switchRole, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/students', label: 'Students', icon: GraduationCap },
    { to: '/admin/teachers', label: 'Teachers', icon: Users },
    { to: '/admin/classes', label: 'Classes', icon: School },
    { to: '/admin/subjects', label: 'Curriculum & Subjects', icon: BookOpen },
    { to: '/admin/academic-year', label: 'Academic Year', icon: Calendar },
    { to: '/admin/reports', label: 'Institutional Reports', icon: FileBarChart },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-brand-bg text-brand-text-primary">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed md:sticky top-0 h-screen z-50 bg-slate-900 text-white w-64 flex flex-col justify-between transition-all duration-200',
          mobileMenuOpen ? 'left-0' : '-left-64 md:left-0'
        )}
      >
        <div>
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800">
            <div
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-primary text-brand-text-primary flex items-center justify-center font-extrabold text-sm">
                IQ
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block">
                  IQora
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-yellow-400 block -mt-1">
                  Admin Console
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.to ||
                (item.to !== '/admin/dashboard' && location.pathname.startsWith(item.to));

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all select-none',
                    isActive
                      ? 'bg-slate-800 text-brand-primary font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin info & persona switch */}
        <div className="p-4 border-t border-slate-800">
          {adminData && (
            <div className="mb-3">
              <p className="text-xs font-bold text-white truncate">{adminData.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{adminData.institutionName}</p>
            </div>
          )}

          {/* Sign out */}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-brand-border h-16 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-brand-text-secondary hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-bold text-brand-text-primary">
                Institutional Administration
              </span>
            </div>
          </div>

          <div className="text-xs font-semibold text-brand-text-secondary">
            Academic Year: <span className="font-bold text-brand-text-primary">2026-2027</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};
