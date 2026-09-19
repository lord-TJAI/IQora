import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { TeacherQueryInbox } from '@/components/query/TeacherQueryInbox';
import {
  Users,
  CalendarCheck,
  AlertCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { teacherData } = useAuthStore();
  const [selectedClass, setSelectedClass] = useState<string>('12-A');

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. Header: Greeting & Class Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
            Good morning, {teacherData?.title || 'Ms. Sharma'}
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            What needs your attention today?
          </p>
        </div>

        {/* Class Selector Dropdown */}
        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-[#E6EAF0] shadow-xs self-start sm:self-auto">
          <span className="text-xs font-bold text-[#667085]">Class:</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="text-xs font-black text-[#172033] bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="12-A">Class 12-A (Physics • 42 students)</option>
            <option value="12-B">Class 12-B (Physics • 39 students)</option>
          </select>
        </div>
      </div>

      {/* 2. Today's Work & Attention (Clean & Uncluttered) */}
      <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-7 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#667085]">
            Today's Work • Section {selectedClass}
          </span>
          <button
            onClick={() => navigate('/teacher/work')}
            className="text-xs font-bold text-[#4F7CFF] hover:underline flex items-center gap-1"
          >
            <span>Open Work Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Item 1: Pending Assignment */}
          <div
            onClick={() => navigate('/teacher/work')}
            className="p-4 rounded-2xl border border-slate-200 bg-[#FAFBFD] hover:border-amber-400 transition-all cursor-pointer space-y-1 group"
          >
            <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block">
              11 Pending Review
            </span>
            <h4 className="font-bold text-sm text-[#172033] group-hover:text-amber-800 transition-colors">
              Electrostatics Project Assignment
            </h4>
            <p className="text-[11px] text-[#667085]">Due today • 31 submitted</p>
          </div>

          {/* Item 2: Completed Test */}
          <div
            onClick={() => navigate('/teacher/work')}
            className="p-4 rounded-2xl border border-slate-200 bg-[#FAFBFD] hover:border-emerald-400 transition-all cursor-pointer space-y-1 group"
          >
            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
              Test Completed
            </span>
            <h4 className="font-bold text-sm text-[#172033] group-hover:text-emerald-800 transition-colors">
              Coulomb's Law Quiz
            </h4>
            <p className="text-[11px] text-[#667085]">42 of 42 attempted • 78% average</p>
          </div>

          {/* Item 3: Attendance */}
          <div
            onClick={() => navigate('/teacher/attendance')}
            className="p-4 rounded-2xl border border-slate-200 bg-[#FAFBFD] hover:border-blue-400 transition-all cursor-pointer space-y-1 group"
          >
            <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full inline-block">
              94% Attendance Today
            </span>
            <h4 className="font-bold text-sm text-[#172033] group-hover:text-blue-800 transition-colors">
              Daily Attendance Marked
            </h4>
            <p className="text-[11px] text-[#667085]">38 Present • 4 Absent</p>
          </div>
        </div>
      </div>

      {/* 3. One Important Class Concept Insight */}
      <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-7 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-[#667085]">
              Class Insight: Action Required
            </span>
          </div>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
            17 students affected
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-[#172033]">
              Electric Potential & Potential Gradient (53% Accuracy)
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed max-w-xl">
              17 students confused why work done on equipotential surfaces is zero. Recommended action: 10-minute visual recap + assign 3 targeted practice questions.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => navigate('/teacher/insights')}
              className="px-5 py-2.5 rounded-xl bg-[#172033] hover:bg-slate-800 text-white font-black text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span>REVIEW & ASSIGN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Student Doubt & Query Inbox */}
      <TeacherQueryInbox />
    </div>
  );
};
