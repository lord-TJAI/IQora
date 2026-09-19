import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentProgression } from '@/services/progression/progressionService';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { LevelProgress } from '@/components/profile/LevelProgress';
import { StreakHeatmap } from '@/components/profile/StreakHeatmap';
import { MasterySummary } from '@/components/profile/MasterySummary';
import { PersonalGoals } from '@/components/profile/PersonalGoals';
import { AchievementPreview } from '@/components/profile/AchievementPreview';
import { Leaderboard } from '@/components/profile/Leaderboard';
import { ActivityTimeline } from '@/components/profile/ActivityTimeline';

export const StudentProfile: React.FC = () => {
  const navigate = useNavigate();
  const progression = getStudentProgression();

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. Unified Profile Header */}
      <ProfileHeader
        progression={progression}
        onOpenSettings={() => navigate('/student/notifications')}
        onOpenNotifications={() => navigate('/student/notifications')}
      />

      {/* 2. Responsive 2-Column Desktop Grid / 1-Column Mobile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column (Desktop 60% / 7 cols) */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          {/* Level Progress & XP Milestone */}
          <LevelProgress progression={progression} />

          {/* Streak System & 12-Week Activity Heatmap */}
          <StreakHeatmap
            currentStreak={progression.currentStreak}
            longestStreak={progression.longestStreak}
            thisWeekActiveDays={progression.thisWeekActiveDays}
            nextMilestone={progression.nextStreakMilestone}
            nextMilestoneRewardXp={progression.streakMilestoneRewardXp}
            daysToNextMilestone={progression.daysToNextMilestone}
            milestones={progression.milestones}
            heatmap={progression.heatmap}
          />

          {/* Peer Leaderboard (Educational & Healthy) */}
          <Leaderboard
            userRank={progression.leaderboard.userRank}
            userWeeklyXp={progression.leaderboard.userWeeklyXp}
            podium={progression.leaderboard.podium}
            nearbyRanks={progression.leaderboard.nearbyRanks}
            encouragingMessage={progression.leaderboard.encouragingMessage}
          />

          {/* Recent Verified Academic Activity */}
          <ActivityTimeline recentActivity={progression.recentActivity} />
        </div>

        {/* Right Column (Desktop 40% / 5 cols) */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          {/* Academic Syllabus Mastery Summary */}
          <MasterySummary
            overallMastery={progression.overallMastery}
            subjects={progression.subjects}
          />

          {/* Immediate Personal Goals (Max 3) */}
          <PersonalGoals goals={progression.personalGoals} />

          {/* Collectible Achievements Showcase */}
          <AchievementPreview achievements={progression.achievements} />
        </div>
      </div>
    </div>
  );
};
