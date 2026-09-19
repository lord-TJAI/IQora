import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { Mail, Lock, Sparkles, User, GraduationCap, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { addToast } = useUIStore();

  const [email, setEmail] = useState('arjun.patel@iqora.edu');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      login('student');
      addToast('Welcome back to IQora, Arjun!', 'success');
      navigate('/student/home');
    }, 400);
  };

  const handleQuickLogin = (role: 'student' | 'teacher' | 'admin') => {
    login(role);
    if (role === 'teacher') {
      addToast('Welcome, Ms. Sharma (Teacher Portal)', 'success');
      navigate('/teacher/dashboard');
    } else if (role === 'admin') {
      addToast('Welcome, Dr. Raman (Admin Console)', 'success');
      navigate('/admin/dashboard');
    } else {
      addToast('Welcome back to IQora, Arjun!', 'success');
      navigate('/student/home');
    }
  };

  return (
    <Card className="p-6 sm:p-8 bg-white border border-brand-border shadow-elevated">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold text-brand-text-primary text-center">
          Sign In to Your Account
        </h2>

        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="student@iqora.edu"
          required
          leftIcon={<Mail className="w-4 h-4" />}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          leftIcon={<Lock className="w-4 h-4" />}
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-brand-text-secondary">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded text-brand-primary focus:ring-brand-primary"
            />
            <span>Remember me</span>
          </label>
          <a href="#forgot" className="font-semibold text-brand-ai hover:underline">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2 shadow-brand"
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </form>

      {/* Quick persona demo buttons */}
      <div className="mt-6 pt-6 border-t border-brand-border text-center">
        <span className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider block mb-3">
          Quick Demo Accounts
        </span>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickLogin('student')}
            className="flex flex-col items-center p-2.5 rounded-xl border border-yellow-300 bg-yellow-50 hover:bg-yellow-100 transition-colors text-xs font-bold text-yellow-900"
          >
            <User className="w-4 h-4 text-yellow-600 mb-1" />
            <span>Arjun</span>
            <span className="text-[10px] text-yellow-700 font-normal">Student</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('teacher')}
            className="flex flex-col items-center p-2.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 transition-colors text-xs font-bold text-purple-900"
          >
            <GraduationCap className="w-4 h-4 text-brand-ai mb-1" />
            <span>Ms. Sharma</span>
            <span className="text-[10px] text-purple-700 font-normal">Teacher</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('admin')}
            className="flex flex-col items-center p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-xs font-bold text-slate-800"
          >
            <ShieldCheck className="w-4 h-4 text-slate-700 mb-1" />
            <span>Dr. Raman</span>
            <span className="text-[10px] text-slate-600 font-normal">Admin</span>
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-brand-text-secondary">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-brand-text-primary hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </Card>
  );
};
