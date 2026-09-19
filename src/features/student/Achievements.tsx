import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockAchievements } from '@/services/mock/mockData';
import { AchievementCard } from '@/components/learning/AchievementCard';
import { ArrowLeft, Award, Sparkles } from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const navigate = useNavigate();

  const unlockedCount = mockAchievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      <button
        onClick={() => navigate('/student/profile')}
        className="inline-flex items-center gap-2 text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Profile</span>
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text-primary tracking-tight">
            Learning Achievements
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Collectible milestones earned through consistent practice and concept mastery
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300 self-start sm:self-auto">
          <Award className="w-4 h-4 text-amber-600" />
          <span>{unlockedCount} of {mockAchievements.length} Unlocked</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {mockAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};
