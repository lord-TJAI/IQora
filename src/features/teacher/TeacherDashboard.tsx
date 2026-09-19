import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import {
  Users,
  CalendarCheck,
  AlertCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { teacherData } = useAuthStore();
  const [selectedClass, setSelectedClass] = useState<string>('12-A');

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
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
        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-[#E6EAF0] shadow-2xs self-start sm:self-auto">
          <span className="text-xs font-bold text-[#667085]">Class:</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="text-xs font-black text-[#172033] bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="12-A">Class 12-A (Physics)</option>
            <option value="12-B">Class 12-B (Physics)</option>
          </select>
        </div>
      </div>

      {/* 2. Today's Core Attention Numbers (4 Scannable Blocks) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl border border-[#E6EAF0] p-5 shadow-subtle space-y-1">
          <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block">
            Enrolled Students
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#172033] block">
            42
          </span>
          <span className="text-[11px] text-[#667085]">Section {selectedClass}</span>
        </div>

        <div className="bg-white rounded-3xl border border-[#E6EAF0] p-5 shadow-subtle space-y-1">
          <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block">
            Attendance Today
          </span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 block">
            94%
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold">38 Present • 4 Absent</span>
        </div>

        <div
          onClick={() => navigate('/teacher/submissions')}
          className="bg-white rounded-3xl border border-[#E6EAF0] p-5 shadow-subtle space-y-1 hover:border-amber-300 transition-colors cursor-pointer"
        >
          <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block">
            Pending Review
          </span>
          <span className="text-2xl sm:text-3xl font-black text-amber-600 block">
            3
          </span>
          <span className="text-[11px] text-amber-700 font-semibold">Submissions to grade →</span>
        </div>

        <div className="bg-white rounded-3xl border border-[#E6EAF0] p-5 shadow-subtle space-y-1">
          <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block">
            Class Average
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#172033] block">
            76%
          </span>
          <span className="text-[11px] text-[#667085]">Across current chapter</span>
        </div>
      </div>

      {/* 3. Class Concept Gap & Actionable Intervention */}
      <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-7 shadow-subtle space-y-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          <span className="text-xs font-black uppercase tracking-wider text-[#667085]">
            Class Concept Gap Identified
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFBEB] border border-amber-200 p-5 rounded-2xl">
          <div>
            <h3 className="text-base sm:text-lg font-black text-amber-950">
              17 students need support with Electric Potential
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/80 mt-1 leading-relaxed">
              Frequent mistakes detected in sign convention for work done moving charge against electrostatic field.
            </p>
          </div>

          <button
            onClick={() => navigate('/teacher/interventions')}
            className="px-6 py-2.5 rounded-full bg-[#172033] hover:bg-slate-800 text-white font-black text-xs sm:text-sm whitespace-nowrap shadow-xs transition-all self-start sm:self-center"
          >
            Review Intervention →
          </button>
        </div>
      </div>

      {/* 4. Action Area: Pending Submissions to Review */}
      <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-7 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-[#172033] uppercase tracking-wider">
            Assignments Requiring Evaluation
          </h3>
          <button
            onClick={() => navigate('/teacher/submissions')}
            className="text-xs font-bold text-[#4F7CFF] hover:underline"
          >
            View All Submissions →
          </button>
        </div>

        <div className="space-y-3">
          {[
            { id: 'sub-1', title: 'Electrostatics Problem Set 1', student: 'Rohan Sharma', time: '1 hour ago' },
            { id: 'sub-2', title: 'Electric Field Lines Worksheet', student: 'Priya Verma', time: '3 hours ago' },
            { id: 'sub-3', title: 'Coulomb Law Numerical Practice', student: 'Amit Kumar', time: 'Yesterday' },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => navigate('/teacher/submissions')}
              className="p-3.5 rounded-2xl bg-[#F7F9FC] border border-[#E6EAF0] hover:bg-white hover:border-[#D0D5DD] transition-all cursor-pointer flex items-center justify-between gap-3"
            >
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#172033]">
                  {item.title}
                </h4>
                <span className="text-[11px] text-[#667085]">
                  Submitted by {item.student} • {item.time}
                </span>
              </div>

              <span className="text-xs font-black text-[#4F7CFF] hover:underline">
                Grade →
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
