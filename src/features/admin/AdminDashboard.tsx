import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  School,
  CalendarCheck,
  Award,
  ArrowRight,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
          Apex Academy Administration
        </h1>
        <p className="text-xs sm:text-sm font-medium text-[#667085] mt-1">
          Academic Year 2026–2027 • Institutional Overview
        </p>
      </div>

      {/* Core Counts Grid (Students, Faculty, Classes) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => navigate('/admin/students')}
          className="bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle hover:border-[#D0D5DD] transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">
              Enrolled Students
            </span>
            <GraduationCap className="w-5 h-5 text-[#4F7CFF]" />
          </div>
          <span className="text-3xl font-black text-[#172033] block">
            480
          </span>
          <span className="text-xs text-[#4F7CFF] font-semibold">
            Manage Student Roster →
          </span>
        </div>

        <div
          onClick={() => navigate('/admin/teachers')}
          className="bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle hover:border-[#D0D5DD] transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">
              Faculty Members
            </span>
            <Users className="w-5 h-5 text-[#7C4DFF]" />
          </div>
          <span className="text-3xl font-black text-[#172033] block">
            32
          </span>
          <span className="text-xs text-[#7C4DFF] font-semibold">
            Manage Faculty →
          </span>
        </div>

        <div
          onClick={() => navigate('/admin/classes')}
          className="bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle hover:border-[#D0D5DD] transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">
              Active Sections
            </span>
            <School className="w-5 h-5 text-[#20C997]" />
          </div>
          <span className="text-3xl font-black text-[#172033] block">
            12
          </span>
          <span className="text-xs text-[#20C997] font-semibold">
            View Class Sections →
          </span>
        </div>
      </div>

      {/* Institutional Attendance & Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">
              Institutional Attendance
            </span>
            <CalendarCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <span className="text-3xl font-black text-emerald-600 block">
            93.8%
          </span>
          <span className="text-xs text-slate-500 font-medium">
            ↑ 1.2% attendance rate this academic term
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">
              Average Academic Mastery
            </span>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-3xl font-black text-[#172033] block">
            76.2%
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Across Mathematics, Physics, Chemistry, and English Core
          </span>
        </div>
      </div>

      {/* Single Action Area */}
      <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-7 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-black text-[#172033]">
            Academic Year Term 1 Audit & Reports
          </h3>
          <p className="text-xs text-[#667085] mt-0.5">
            Download institutional performance summaries, class mastery breakdowns, and attendance registers.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/reports')}
          className="px-6 py-2.5 rounded-full bg-[#172033] hover:bg-slate-800 text-white font-black text-xs sm:text-sm whitespace-nowrap shadow-xs transition-all self-start sm:self-center"
        >
          View Reports →
        </button>
      </div>
    </div>
  );
};
