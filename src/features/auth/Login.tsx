import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { ArrowRight, Loader2, GraduationCap, School, ShieldCheck } from 'lucide-react';
import { cn } from '@/utils/cn';
import { UserRole } from '@/types/domain';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { addToast } = useUIStore();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('arjun.patel@iqora.edu');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle role selection and prefill corresponding demo credentials
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage('');
    if (role === 'student') {
      setEmail('arjun.patel@iqora.edu');
      setPassword('password123');
    } else if (role === 'teacher') {
      setEmail('teacher@iqora.edu');
      setPassword('password123');
    } else if (role === 'admin') {
      setEmail('admin@iqora.edu');
      setPassword('password123');
    }
  };

  const handleLogin = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'teacher') {
        login('teacher');
        addToast('Welcome to IQora Teacher Portal', 'success');
        navigate('/teacher/dashboard');
      } else if (role === 'admin') {
        login('admin');
        addToast('Welcome to IQora Admin Console', 'success');
        navigate('/admin/dashboard');
      } else {
        login('student');
        addToast('Welcome back to IQora, Arjun!', 'success');
        navigate('/student/home');
      }
    }, 350);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    if (normalizedEmail.includes('teacher')) {
      handleLogin('teacher');
    } else if (normalizedEmail.includes('admin')) {
      handleLogin('admin');
    } else {
      handleLogin(selectedRole);
    }
  };

  return (
    <div className="max-w-5xl w-full bg-white rounded-3xl border border-[#E6EAF0] shadow-subtle overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px] animate-in fade-in duration-300">
      {/* LEFT COLUMN: Premium Academic Illustration Area (Desktop) */}
      <div className="lg:col-span-6 bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF3CC] p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#F0E6CC] relative overflow-hidden">
        {/* Top Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFC800] flex items-center justify-center font-black text-lg text-[#172033] shadow-xs">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="12" r="4.5" stroke="#172033" strokeWidth="2.5" />
              <circle cx="16" cy="12" r="4.5" stroke="#172033" strokeWidth="2.5" />
              <path d="M12.5 12C12.5 12 14 9.5 16 9.5C18 9.5 19.5 10.6 19.5 12C19.5 13.4 18 14.5 16 14.5C14 14.5 12.5 12 12.5 12ZM12.5 12C12.5 12 11 9.5 9 9.5C7 9.5 5.5 10.6 5.5 12C5.5 13.4 7 14.5 9 14.5C11 14.5 12.5 12 12.5 12Z" fill="#172033" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-[#172033] leading-none block">
              IQora
            </span>
            <span className="text-[10px] font-bold text-[#667085] tracking-wide mt-0.5 block">
              Learn. Play. Master.
            </span>
          </div>
        </div>

        {/* Center Illustration */}
        <div className="my-8 flex flex-col items-center justify-center relative">
          <div className="w-full max-w-sm">
            <svg viewBox="0 0 380 260" className="w-full h-auto select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Soft background aura */}
              <circle cx="190" cy="130" r="100" fill="#FFE885" fillOpacity="0.45" />
              <circle cx="140" cy="80" r="40" fill="#FFD43B" fillOpacity="0.3" />

              {/* Desk */}
              <rect x="40" y="210" width="300" height="12" rx="6" fill="#172033" />
              <line x1="70" y1="222" x2="70" y2="255" stroke="#172033" strokeWidth="6" strokeLinecap="round" />
              <line x1="310" y1="222" x2="310" y2="255" stroke="#172033" strokeWidth="6" strokeLinecap="round" />

              {/* Stack of colorful textbooks with subject labels */}
              <g transform="translate(60, 140)">
                {/* Book 1 - Math */}
                <rect x="0" y="50" width="75" height="18" rx="4" fill="#4F7CFF" />
                <text x="37" y="63" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.5">MATH</text>

                {/* Book 2 - Physics */}
                <rect x="5" y="32" width="70" height="18" rx="4" fill="#7C4DFF" />
                <text x="40" y="45" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.5">PHYSICS</text>

                {/* Book 3 - Chemistry */}
                <rect x="2" y="14" width="72" height="18" rx="4" fill="#20C997" />
                <text x="38" y="27" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.5">CHEM</text>

                {/* Book 4 - English */}
                <rect x="8" y="-4" width="65" height="18" rx="4" fill="#FF8A3D" />
                <text x="40" y="9" fill="#FFFFFF" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="0.5">ENGLISH</text>
              </g>

              {/* Student Character */}
              <g transform="translate(145, 75)">
                {/* Body / Hoodie */}
                <path d="M45 75 C25 75 15 105 15 135 L75 135 C75 105 65 75 45 75 Z" fill="#FFC800" />
                <path d="M45 75 L38 135" stroke="#E6B400" strokeWidth="2" strokeLinecap="round" />
                <path d="M45 75 L52 135" stroke="#E6B400" strokeWidth="2" strokeLinecap="round" />

                {/* Head / Face */}
                <circle cx="45" cy="50" r="24" fill="#FFDFC4" />

                {/* Hair */}
                <path d="M22 45 C20 30 30 18 45 18 C60 18 70 30 68 45 C62 38 52 35 45 35 C38 35 28 38 22 45 Z" fill="#172033" />
                <path d="M25 40 Q30 25 45 28 Q60 25 65 40" stroke="#172033" strokeWidth="3" strokeLinecap="round" />

                {/* Eyes & Smile */}
                <circle cx="38" cy="50" r="2.5" fill="#172033" />
                <circle cx="52" cy="50" r="2.5" fill="#172033" />
                <path d="M41 58 Q45 62 49 58" stroke="#172033" strokeWidth="2" strokeLinecap="round" fill="none" />
              </g>

              {/* Laptop on desk */}
              <g transform="translate(205, 155)">
                {/* Screen */}
                <rect x="10" y="0" width="70" height="48" rx="4" fill="#172033" />
                <rect x="14" y="4" width="62" height="40" rx="2" fill="#24304A" />
                {/* IQora logo on screen */}
                <circle cx="41" cy="24" r="5" stroke="#FFC800" strokeWidth="2" />
                <circle cx="49" cy="24" r="5" stroke="#FFC800" strokeWidth="2" />
                {/* Keyboard base */}
                <polygon points="0,55 90,55 80,48 10,48" fill="#98A2B3" />
              </g>

              {/* Floating Academic Shapes */}
              <ellipse cx="70" cy="50" rx="24" ry="10" transform="rotate(-25 70 50)" stroke="#7C4DFF" strokeWidth="2" strokeDasharray="3 3" fill="none" />
              <circle cx="85" cy="43" r="3" fill="#7C4DFF" />
              <path d="M290 55 Q305 35 320 55 T350 55" stroke="#4F7CFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <polygon points="310,120 322,113 334,120 334,134 322,141 310,134" stroke="#20C997" strokeWidth="2" fill="none" />
              <circle cx="322" cy="127" r="4.5" stroke="#20C997" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          <div className="text-center mt-4 space-y-1">
            <h2 className="text-lg sm:text-xl font-black text-[#172033] tracking-tight">
              Small Steps. Big Mastery.
            </h2>
            <p className="text-xs font-semibold text-[#667085]">
              Learn today. A better you tomorrow.
            </p>
          </div>
        </div>

        {/* Bottom Tag */}
        <div className="flex items-center justify-between text-xs font-bold text-[#667085] pt-4 border-t border-[#F0E6CC]/80">
          <span>CBSE Class 12 Syllabus</span>
          <span>Math • Physics • Chem • English</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Crisp, Focused Login Form */}
      <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm font-medium text-[#667085]">
              Choose a demo role to enter the platform.
            </p>
          </div>

          {/* Role Quick Selector (Student / Teacher / Admin) */}
          <div className="space-y-2">
            <label className="text-xs font-black text-[#172033] uppercase tracking-wider block">
              Select Demo Role
            </label>
            <div className="grid grid-cols-3 gap-2 bg-[#F7F9FC] p-1.5 rounded-2xl border border-[#E6EAF0]">
              <button
                type="button"
                onClick={() => handleRoleSelect('student')}
                className={cn(
                  'flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer select-none',
                  selectedRole === 'student'
                    ? 'bg-white text-[#172033] shadow-xs border border-[#E6EAF0]'
                    : 'text-[#667085] hover:text-[#172033] hover:bg-white/50'
                )}
              >
                <GraduationCap className={cn('w-4 h-4', selectedRole === 'student' ? 'text-[#FFC800]' : 'text-[#667085]')} />
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('teacher')}
                className={cn(
                  'flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer select-none',
                  selectedRole === 'teacher'
                    ? 'bg-white text-[#172033] shadow-xs border border-[#E6EAF0]'
                    : 'text-[#667085] hover:text-[#172033] hover:bg-white/50'
                )}
              >
                <School className={cn('w-4 h-4', selectedRole === 'teacher' ? 'text-[#7C4DFF]' : 'text-[#667085]')} />
                <span>Teacher</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={cn(
                  'flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer select-none',
                  selectedRole === 'admin'
                    ? 'bg-white text-[#172033] shadow-xs border border-[#E6EAF0]'
                    : 'text-[#667085] hover:text-[#172033] hover:bg-white/50'
                )}
              >
                <ShieldCheck className={cn('w-4 h-4', selectedRole === 'admin' ? 'text-[#20C997]' : 'text-[#667085]')} />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#172033] block">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@iqora.edu"
                className="w-full h-12 px-4 rounded-xl border border-[#E6EAF0] bg-white text-sm sm:text-base text-[#172033] placeholder:text-[#98A2B3] focus:outline-none focus:border-[#FFC800] focus:ring-2 focus:ring-[#FFC800]/25 transition-all shadow-2xs"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-[#172033] block">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast('Demo account password is prefilled (password123)', 'info');
                  }}
                  className="text-xs font-bold text-[#4F7CFF] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 px-4 rounded-xl border border-[#E6EAF0] bg-white text-sm sm:text-base text-[#172033] placeholder:text-[#98A2B3] focus:outline-none focus:border-[#FFC800] focus:ring-2 focus:ring-[#FFC800]/25 transition-all shadow-2xs"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#172033] focus:ring-[#FFC800] border-slate-300 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-xs font-semibold text-[#667085] cursor-pointer select-none">
                Remember me on this device
              </label>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-xl animate-in fade-in">
                {errorMessage}
              </p>
            )}

            {/* Primary Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-[#FFC800] hover:bg-[#F2BD00] active:scale-[0.99] disabled:opacity-60 text-[#172033] font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#172033]" />
                  <span>Entering portal...</span>
                </>
              ) : (
                <>
                  <span>
                    Sign in as {selectedRole === 'student' ? 'Student' : selectedRole === 'teacher' ? 'Teacher' : 'Admin'}
                  </span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Launch Buttons */}
          <div className="pt-2 border-t border-[#E6EAF0] space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#667085] block text-center">
              Instant Demo Access
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleLogin('student')}
                className="py-2 px-2.5 rounded-xl bg-[#F7F9FC] hover:bg-white hover:border-[#FFC800] border border-[#E6EAF0] text-xs font-bold text-[#172033] transition-all text-center shadow-2xs cursor-pointer"
              >
                Launch Student
              </button>
              <button
                type="button"
                onClick={() => handleLogin('teacher')}
                className="py-2 px-2.5 rounded-xl bg-[#F7F9FC] hover:bg-white hover:border-[#7C4DFF] border border-[#E6EAF0] text-xs font-bold text-[#172033] transition-all text-center shadow-2xs cursor-pointer"
              >
                Launch Teacher
              </button>
              <button
                type="button"
                onClick={() => handleLogin('admin')}
                className="py-2 px-2.5 rounded-xl bg-[#F7F9FC] hover:bg-white hover:border-[#20C997] border border-[#E6EAF0] text-xs font-bold text-[#172033] transition-all text-center shadow-2xs cursor-pointer"
              >
                Launch Admin
              </button>
            </div>
          </div>

          {/* Registration Footnote */}
          <div className="text-center pt-2">
            <p className="text-xs text-[#667085] font-medium">
              Need assistance?{' '}
              <Link to="/register" className="font-bold text-[#172033] hover:underline">
                View platform guide
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
