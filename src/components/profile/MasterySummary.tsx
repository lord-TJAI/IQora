import React, { useState } from 'react';
import { SubjectMasteryProgress } from '@/types/progression';
import { Award, ChevronRight, TrendingUp, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface MasterySummaryProps {
  overallMastery: number;
  subjects: SubjectMasteryProgress[];
  className?: string;
}

export const MasterySummary: React.FC<MasterySummaryProps> = ({
  overallMastery,
  subjects,
  className,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectMasteryProgress | null>(null);

  return (
    <div className={cn('bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-6', className)}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#667085] block">
            Academic Understanding
          </span>
          <h3 className="text-base sm:text-lg font-black text-[#172033]">
            Syllabus Mastery
          </h3>
        </div>

        <div className="text-right">
          <span className="text-xl font-black text-emerald-700 block">
            {overallMastery}%
          </span>
          <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
            Overall
          </span>
        </div>
      </div>

      {/* 4 Compact Subject Rows */}
      <div className="space-y-3.5">
        {subjects.map((subj) => (
          <div
            key={subj.subjectId}
            onClick={() => setSelectedSubject(subj)}
            className="p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-[#FAFBFD] transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: subj.color }}
                />
                <h4 className="font-bold text-[#172033] group-hover:text-[#4F7CFF] transition-colors">
                  {subj.name}
                </h4>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  {subj.monthlyTrend}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-black text-[#172033]">
                  {subj.masteryPercentage}%
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#667085] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Horizontal Mastery Bar */}
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${subj.masteryPercentage}%`,
                  backgroundColor: subj.color,
                }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-[#667085] pt-0.5">
              <span>Focus: <strong className="text-[#172033]">{subj.focusArea}</strong></span>
              <span>{subj.completedChapters}/{subj.totalChapters} Ch.</span>
            </div>
          </div>
        ))}
      </div>

      {/* Subject Detail Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 max-w-lg w-full shadow-elevated space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: selectedSubject.color }}
                />
                <div>
                  <h3 className="text-lg font-black text-[#172033]">
                    {selectedSubject.name} Mastery Details
                  </h3>
                  <span className="text-xs text-[#667085]">
                    {selectedSubject.masteryPercentage}% Syllabus Mastered • {selectedSubject.monthlyTrend}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedSubject(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-[#667085]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chapter Breakdown List */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {selectedSubject.chapterBreakdown.map((ch) => (
                <div
                  key={ch.id}
                  className="p-3 rounded-xl border border-slate-200 bg-[#FAFBFD] flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-[#172033] block">{ch.title}</span>
                    <span
                      className={cn(
                        'text-[10px] font-black uppercase tracking-wider',
                        ch.status === 'mastered'
                          ? 'text-emerald-600'
                          : ch.status === 'strong'
                          ? 'text-blue-600'
                          : ch.status === 'needs_practice'
                          ? 'text-rose-600'
                          : 'text-amber-600'
                      )}
                    >
                      {ch.status.replace('_', ' ')}
                    </span>
                  </div>

                  <span className="font-mono font-black text-[#172033]">
                    {ch.mastery}%
                  </span>
                </div>
              ))}
            </div>

            {/* Recommendation Callout */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block">Recommended Revision:</strong>
                Target chapters marked "needs practice" to boost your overall {selectedSubject.name} score toward 85%+.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
