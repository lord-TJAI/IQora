import React, { useState } from 'react';
import { LeaderboardEntry } from '@/types/progression';
import { Trophy, TrendingUp, TrendingDown, Minus, Sparkles, Users } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/utils/cn';

interface LeaderboardProps {
  userRank: number;
  userWeeklyXp: number;
  podium: LeaderboardEntry[];
  nearbyRanks: LeaderboardEntry[];
  encouragingMessage: string;
  className?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  userRank,
  userWeeklyXp,
  podium,
  nearbyRanks,
  encouragingMessage,
  className,
}) => {
  const [period, setPeriod] = useState<'week' | 'month' | 'overall'>('week');
  const [scope, setScope] = useState<'class' | 'grade' | 'subject'>('class');

  return (
    <div className={cn('bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-6', className)}>
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#667085] block">
            Class 12-A Progression
          </span>
          <h3 className="text-base sm:text-lg font-black text-[#172033]">
            Peer Leaderboard
          </h3>
        </div>

        {/* Minimal Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-1 rounded-xl border border-slate-200 text-xs font-bold text-[#667085]">
          {(['week', 'month', 'overall'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'px-3 py-1 rounded-lg capitalize transition-all',
                period === p
                  ? 'bg-white text-[#172033] shadow-xs font-black'
                  : 'hover:text-[#172033]'
              )}
            >
              {p === 'week' ? 'This Week' : p === 'month' ? 'This Month' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Compact Podium */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 items-end pt-2 pb-1">
        {/* 2nd Place */}
        {podium[1] && (
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-3 text-center flex flex-col items-center justify-between h-36">
            <div className="relative">
              <Avatar
                seed={podium[1].name}
                name={podium[1].name}
                role="student"
                size={40}
                className="border-2 border-slate-300"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-200 text-[#172033] font-black text-[10px] flex items-center justify-center border border-white">
                2
              </span>
            </div>
            <div className="w-full">
              <span className="font-bold text-xs text-[#172033] truncate block">
                {podium[1].name.split(' ')[0]}
              </span>
              <span className="text-[11px] font-black text-amber-700 block">
                {podium[1].xp} XP
              </span>
            </div>
            <div className="w-full h-8 bg-slate-100 rounded-xl flex items-center justify-center text-[10px] font-black text-[#667085]">
              🥈 2nd
            </div>
          </div>
        )}

        {/* 1st Place (Taller) */}
        {podium[0] && (
          <div className="bg-[#FFC800]/10 rounded-2xl border border-[#FFC800]/60 p-3 text-center flex flex-col items-center justify-between h-42 shadow-xs">
            <div className="relative">
              <Avatar
                seed={podium[0].name}
                name={podium[0].name}
                role="student"
                size={48}
                className="border-2 border-[#FFC800]"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#FFC800] text-[#172033] font-black text-[10px] flex items-center justify-center border border-white shadow-xs">
                1
              </span>
            </div>
            <div className="w-full">
              <span className="font-black text-xs sm:text-sm text-[#172033] truncate block">
                {podium[0].name.split(' ')[0]}
              </span>
              <span className="text-xs font-black text-amber-800 block">
                {podium[0].xp} XP
              </span>
            </div>
            <div className="w-full h-12 bg-[#FFC800] rounded-xl flex items-center justify-center text-xs font-black text-[#172033] shadow-xs">
              👑 1st
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {podium[2] && (
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-3 text-center flex flex-col items-center justify-between h-32">
            <div className="relative">
              <Avatar
                seed={podium[2].name}
                name={podium[2].name}
                role="student"
                size={36}
                className="border-2 border-amber-600/30"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-black text-[10px] flex items-center justify-center border border-white">
                3
              </span>
            </div>
            <div className="w-full">
              <span className="font-bold text-xs text-[#172033] truncate block">
                {podium[2].name.split(' ')[0]}
              </span>
              <span className="text-[11px] font-black text-amber-700 block">
                {podium[2].xp} XP
              </span>
            </div>
            <div className="w-full h-6 bg-amber-100/60 rounded-xl flex items-center justify-center text-[10px] font-black text-amber-900">
              🥉 3rd
            </div>
          </div>
        )}
      </div>

      {/* Encouraging Context Note */}
      <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-xs text-blue-950 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#4F7CFF] flex-shrink-0" />
        <span>{encouragingMessage}</span>
      </div>

      {/* Nearby Ranks List */}
      <div className="space-y-1.5 pt-2">
        <span className="text-[11px] font-black uppercase tracking-wider text-[#667085] px-2 block">
          Your Ranking Zone
        </span>

        {nearbyRanks.map((entry) => {
          const isUser = entry.isCurrentUser;

          return (
            <div
              key={entry.rank}
              className={cn(
                'flex items-center justify-between p-3 rounded-2xl text-xs transition-all',
                isUser
                  ? 'bg-[#FFC800]/20 border-2 border-[#FFC800] font-bold shadow-xs'
                  : 'bg-white border border-slate-100 hover:bg-slate-50'
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={cn(
                    'w-6 text-center font-black',
                    isUser ? 'text-[#172033]' : 'text-[#667085]'
                  )}
                >
                  #{entry.rank}
                </span>

                <Avatar
                  seed={entry.name}
                  name={entry.name}
                  role="student"
                  size={28}
                />

                <span className={cn('truncate', isUser ? 'text-[#172033] font-black' : 'text-[#475569]')}>
                  {entry.name} {isUser && '(You)'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-[#172033]">
                  {entry.xp} XP
                </span>

                <div className="w-8 flex justify-end">
                  {entry.change > 0 ? (
                    <span className="flex items-center text-emerald-600 font-bold text-[11px]">
                      <TrendingUp className="w-3 h-3 mr-0.5" />
                      +{entry.change}
                    </span>
                  ) : entry.change < 0 ? (
                    <span className="flex items-center text-rose-500 font-bold text-[11px]">
                      <TrendingDown className="w-3 h-3 mr-0.5" />
                      {entry.change}
                    </span>
                  ) : (
                    <Minus className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
