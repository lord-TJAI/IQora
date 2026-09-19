export interface HeatmapDay {
  date: string; // YYYY-MM-DD
  dayOfWeek: number; // 0 (Sun) - 6 (Sat)
  weekIndex: number; // 0 - 11
  activityCount: number;
  xpEarned: number;
  intensity: 0 | 1 | 2 | 3 | 4; // 0 = none, 1 = light, 2 = medium, 3 = strong, 4 = max
  activities: string[];
}

export interface StreakMilestone {
  days: number;
  label: string;
  rewardXp: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface SubjectMasteryProgress {
  subjectId: 'mathematics' | 'physics' | 'chemistry' | 'english';
  name: string;
  color: string;
  lightColor: string;
  masteryPercentage: number;
  monthlyTrend: string; // e.g. "+6% this month"
  focusArea: string;
  totalChapters: number;
  completedChapters: number;
  chapterBreakdown: {
    id: string;
    title: string;
    mastery: number;
    status: 'mastered' | 'strong' | 'learning' | 'needs_practice';
  }[];
}

export interface ActivityLogItem {
  id: string;
  dateGroup: 'Today' | 'Yesterday' | 'Earlier this week';
  timestamp: string;
  title: string;
  subjectName: string;
  subjectColor: string;
  xpEarned: number;
  type: 'lesson' | 'simulation' | 'practice' | 'assignment' | 'test' | 'challenge';
}

export interface ProgressionAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0 - 100
  progressLabel?: string; // e.g. "73 / 100 questions"
  category: 'learning' | 'consistency' | 'mastery' | 'practice' | 'subject';
  xpBonus: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatarUrl: string;
  xp: number;
  change: number; // +3, -1, 0
  isCurrentUser?: boolean;
}

export interface StudentProgression {
  // Identity
  studentId: string;
  name: string;
  className: string;
  rollNumber: string;
  avatarUrl: string;

  // Level & XP
  level: number;
  levelTitle: string;
  currentXp: number;
  nextLevelXp: number;
  levelProgressPercentage: number;
  xpNeededForNextLevel: number;
  nextLevelTitle: string;

  // Daily Target
  dailyGoal: {
    todayXp: number;
    targetXp: number;
    remainingXp: number;
    progressPercentage: number;
  };

  // Streak
  currentStreak: number;
  longestStreak: number;
  thisWeekActiveDays: number;
  nextStreakMilestone: number;
  streakMilestoneRewardXp: number;
  daysToNextMilestone: number;
  milestones: StreakMilestone[];

  // Heatmap
  heatmap: HeatmapDay[];

  // Mastery
  overallMastery: number;
  subjects: SubjectMasteryProgress[];

  // Personal Goals (Max 3)
  personalGoals: {
    id: string;
    title: string;
    current: number;
    target: number;
    unit: string;
    reward: string;
  }[];

  // Achievements
  achievements: ProgressionAchievement[];

  // Recent Activity
  recentActivity: ActivityLogItem[];

  // Leaderboard
  leaderboard: {
    period: 'week' | 'month' | 'overall';
    scope: 'class' | 'grade' | 'subject';
    userRank: number;
    userWeeklyXp: number;
    podium: LeaderboardEntry[];
    nearbyRanks: LeaderboardEntry[];
    encouragingMessage: string;
  };
}
