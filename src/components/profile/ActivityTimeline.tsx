import React from 'react';
import { ActivityLogItem } from '@/types/progression';
import { CheckCircle2, Clock, Zap } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ActivityTimelineProps {
  recentActivity: ActivityLogItem[];
  className?: string;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  recentActivity,
  className,
}) => {
  // Group activities by dateGroup
  const groups: Record<string, ActivityLogItem[]> = {};
  recentActivity.forEach((item) => {
    if (!groups[item.dateGroup]) {
      groups[item.dateGroup] = [];
    }
    groups[item.dateGroup].push(item);
  });

  return (
    <div className={cn('bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-6', className)}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#667085] block">
            Learning Evidence
          </span>
          <h3 className="text-base sm:text-lg font-black text-[#172033]">
            Recent Learning Activity
          </h3>
        </div>

        <span className="text-xs font-bold text-[#667085]">
          Verified Academic Actions
        </span>
      </div>

      <div className="space-y-5">
        {Object.entries(groups).map(([groupTitle, items]) => (
          <div key={groupTitle} className="space-y-2.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#667085] block">
              {groupTitle}
            </span>

            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-[#FAFBFD] hover:bg-white hover:border-slate-300 transition-all flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>

                    <div>
                      <h4 className="font-bold text-[#172033] line-clamp-1">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-[#667085] mt-0.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: item.subjectColor }}
                        />
                        <span>{item.subjectName}</span>
                        <span>•</span>
                        <span>{item.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60 flex-shrink-0">
                    <Zap className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>+{item.xpEarned} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
