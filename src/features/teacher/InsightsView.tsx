import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, AlertCircle, TrendingUp, CheckCircle2, ArrowRight, BookOpen, Users, BarChart3 } from 'lucide-react';
import { cn } from '@/utils/cn';

export const InsightsView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGap, setSelectedGap] = useState<string>('gap-1');

  const gaps = [
    {
      id: 'gap-1',
      subject: 'Physics',
      concept: 'Electric Potential & Dipole Gradient',
      chapter: 'Electrostatic Potential and Capacitance',
      accuracy: 53,
      studentsAffected: 17,
      totalStudents: 42,
      aiRecommendation:
        '17 students confused potential difference with absolute potential on equipotential surfaces. Recommended: 10-minute visual simulation recap + 3 targeted calculation questions.',
      urgency: 'high',
    },
    {
      id: 'gap-2',
      subject: 'Physics',
      concept: 'Lenz\'s Law Direction Determination',
      chapter: 'Electromagnetic Induction',
      accuracy: 58,
      studentsAffected: 12,
      totalStudents: 42,
      aiRecommendation:
        'Common misconception: forgetting opposing magnetic polarity induced by approaching bar magnets. Recommended: Faraday virtual lab demonstration.',
      urgency: 'medium',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#7C4DFF] bg-[#F5F0FF] px-2.5 py-0.5 rounded-full">
            Class 12-A Intelligence
          </span>
          <span className="text-xs font-bold text-[#667085]">Academic Insights</span>
        </div>
        <h1 className="text-2xl font-black text-[#172033] tracking-tight mt-1">
          What Does My Class Need?
        </h1>
        <p className="text-xs sm:text-sm font-medium text-[#667085] mt-0.5">
          Identified concept gaps, learning patterns, and suggested targeted interventions.
        </p>
      </div>

      {/* Overview Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E6EAF0] shadow-xs space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#667085] block">
            Class 12-A Physics Average
          </span>
          <span className="text-2xl font-black text-[#172033]">72%</span>
          <span className="text-[11px] font-bold text-emerald-600 block">
            ↑ 4% higher than last month
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E6EAF0] shadow-xs space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#667085] block">
            Active Concept Gaps
          </span>
          <span className="text-2xl font-black text-rose-600">2 Concepts</span>
          <span className="text-[11px] font-bold text-[#667085] block">
            Requiring instructional support
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E6EAF0] shadow-xs space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#667085] block">
            Work Submission Rate
          </span>
          <span className="text-2xl font-black text-[#172033]">92%</span>
          <span className="text-[11px] font-bold text-emerald-600 block">
            38 of 42 submitted on time
          </span>
        </div>
      </div>

      {/* Concept Gap Interventions */}
      <div className="space-y-4">
        <h3 className="text-base font-black text-[#172033]">
          Priority Concept Gaps & Recommended Interventions
        </h3>

        <div className="space-y-4">
          {gaps.map((gap) => (
            <div
              key={gap.id}
              className="bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#7C4DFF] bg-[#F5F0FF] px-2.5 py-0.5 rounded-full">
                      {gap.subject}
                    </span>
                    <span className="text-xs text-[#667085]">{gap.chapter}</span>
                  </div>
                  <h4 className="text-base font-black text-[#172033]">
                    {gap.concept}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-lg font-black text-rose-600 block">
                      {gap.accuracy}%
                    </span>
                    <span className="text-[10px] font-bold text-[#667085] uppercase">
                      Accuracy
                    </span>
                  </div>
                  <div className="text-right pl-3 border-l border-slate-200">
                    <span className="text-lg font-black text-[#172033] block">
                      {gap.studentsAffected}/{gap.totalStudents}
                    </span>
                    <span className="text-[10px] font-bold text-[#667085] uppercase">
                      Students
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-purple-900">
                  <Sparkles className="w-4 h-4 text-[#7C4DFF]" />
                  <span>Targeted Intervention Strategy:</span>
                </div>
                <p className="text-[#172033] leading-relaxed">
                  {gap.aiRecommendation}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => navigate('/teacher/students')}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#667085]"
                >
                  View 17 Affected Students
                </button>
                <button
                  onClick={() => navigate('/teacher/assignments/create')}
                  className="px-5 py-2 rounded-xl bg-[#172033] hover:bg-slate-800 text-white text-xs font-black flex items-center gap-1.5 transition-all"
                >
                  <span>ASSIGN REMEDIAL PRACTICE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
