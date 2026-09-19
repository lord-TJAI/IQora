import {
  StudentProgression,
  HeatmapDay,
  StreakMilestone,
  SubjectMasteryProgress,
  ActivityLogItem,
  ProgressionAchievement,
  LeaderboardEntry,
} from '@/types/progression';

// Generate 12 weeks of deterministic learning activity heatmap (84 days)
const generate12WeekHeatmap = (): HeatmapDay[] => {
  const heatmap: HeatmapDay[] = [];
  const today = new Date('2026-09-19'); // Reference date

  // 12 weeks = 84 days
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay(); // 0 is Sunday, 1 is Monday...
    const weekIndex = Math.floor((83 - i) / 7);

    // Deterministic pseudo-realistic activity pattern:
    // Recent 12 days have active streak
    const isWithinStreak = i < 12;
    let activityCount = 0;
    let xpEarned = 0;
    let intensity: 0 | 1 | 2 | 3 | 4 = 0;
    const activities: string[] = [];

    if (isWithinStreak) {
      if (i === 0) {
        // Today
        activityCount = 2;
        xpEarned = 35;
        intensity = 2;
        activities.push('Physics Visual Lesson (+25 XP)', 'Concept Check (+10 XP)');
      } else if (i === 1) {
        // Yesterday
        activityCount = 3;
        xpEarned = 50;
        intensity = 3;
        activities.push('Chemistry Practice (+30 XP)', 'Math Graph Simulation (+20 XP)');
      } else if (i % 3 === 0) {
        activityCount = 4;
        xpEarned = 75;
        intensity = 4;
        activities.push('Adaptive Practice (+35 XP)', 'Daily Challenge (+40 XP)');
      } else if (i % 2 === 0) {
        activityCount = 3;
        xpEarned = 45;
        intensity = 2;
        activities.push('Ray Optics Lab (+25 XP)', 'Physics Practice (+20 XP)');
      } else {
        activityCount = 1;
        xpEarned = 25;
        intensity = 1;
        activities.push('Notice Writing Canvas (+25 XP)');
      }
    } else {
      // Historical pattern before current streak
      const hash = (i * 17 + dayOfWeek * 13) % 10;
      if (hash > 7) {
        activityCount = 3;
        xpEarned = 60;
        intensity = 3;
        activities.push('Chapter Quiz (+40 XP)', 'Interactive Lab (+20 XP)');
      } else if (hash > 4) {
        activityCount = 2;
        xpEarned = 35;
        intensity = 2;
        activities.push('Calculus Practice (+35 XP)');
      } else if (hash > 2) {
        activityCount = 1;
        xpEarned = 20;
        intensity = 1;
        activities.push('Reading Comprehension (+20 XP)');
      } else {
        activityCount = 0;
        xpEarned = 0;
        intensity = 0;
      }
    }

    heatmap.push({
      date: dateStr,
      dayOfWeek,
      weekIndex,
      activityCount,
      xpEarned,
      intensity,
      activities,
    });
  }

  return heatmap;
};

const streakMilestones: StreakMilestone[] = [
  { days: 3, label: '3-Day Spark', rewardXp: 30, unlocked: true, unlockedAt: '2026-09-10' },
  { days: 7, label: '7-Day Momentum', rewardXp: 50, unlocked: true, unlockedAt: '2026-09-14' },
  { days: 14, label: '14-Day Consistency', rewardXp: 100, unlocked: false },
  { days: 21, label: '21-Day Habit', rewardXp: 150, unlocked: false },
  { days: 30, label: '30-Day Scholar', rewardXp: 250, unlocked: false },
  { days: 60, label: '60-Day Master', rewardXp: 500, unlocked: false },
  { days: 100, label: '100-Day Legend', rewardXp: 1000, unlocked: false },
];

const subjectMasteryData: SubjectMasteryProgress[] = [
  {
    subjectId: 'mathematics',
    name: 'Mathematics',
    color: '#4F7CFF',
    lightColor: '#EFF4FF',
    masteryPercentage: 78,
    monthlyTrend: '+4% this month',
    focusArea: 'Continuity & Differentiability',
    totalChapters: 13,
    completedChapters: 6,
    chapterBreakdown: [
      { id: 'math-ch1', title: 'Relations & Functions', mastery: 88, status: 'mastered' },
      { id: 'math-ch2', title: 'Inverse Trigonometric Functions', mastery: 82, status: 'strong' },
      { id: 'math-ch3', title: 'Matrices', mastery: 80, status: 'strong' },
      { id: 'math-ch4', title: 'Determinants', mastery: 72, status: 'learning' },
      { id: 'math-ch5', title: 'Continuity and Differentiability', mastery: 80, status: 'strong' },
      { id: 'math-ch6', title: 'Application of Derivatives', mastery: 76, status: 'learning' },
      { id: 'math-ch7', title: 'Integrals', mastery: 75, status: 'learning' },
      { id: 'math-ch8', title: 'Applications of Integrals', mastery: 70, status: 'needs_practice' },
      { id: 'math-ch9', title: 'Differential Equations', mastery: 73, status: 'learning' },
      { id: 'math-ch10', title: 'Vector Algebra', mastery: 84, status: 'mastered' },
      { id: 'math-ch11', title: 'Three Dimensional Geometry', mastery: 76, status: 'learning' },
      { id: 'math-ch12', title: 'Linear Programming', mastery: 88, status: 'mastered' },
      { id: 'math-ch13', title: 'Probability', mastery: 74, status: 'learning' },
    ],
  },
  {
    subjectId: 'physics',
    name: 'Physics',
    color: '#7C4DFF',
    lightColor: '#F5F0FF',
    masteryPercentage: 72,
    monthlyTrend: '+6% this month',
    focusArea: 'Electrostatic Potential & Capacitance',
    totalChapters: 14,
    completedChapters: 5,
    chapterBreakdown: [
      { id: 'phys-ch1', title: 'Electric Charges & Fields', mastery: 85, status: 'mastered' },
      { id: 'phys-ch2', title: 'Electrostatic Potential & Capacitance', mastery: 80, status: 'strong' },
      { id: 'phys-ch3', title: 'Current Electricity', mastery: 76, status: 'learning' },
      { id: 'phys-ch4', title: 'Moving Charges & Magnetism', mastery: 70, status: 'needs_practice' },
      { id: 'phys-ch5', title: 'Magnetism and Matter', mastery: 66, status: 'needs_practice' },
      { id: 'phys-ch6', title: 'Electromagnetic Induction', mastery: 75, status: 'learning' },
      { id: 'phys-ch7', title: 'Alternating Current', mastery: 73, status: 'learning' },
      { id: 'phys-ch8', title: 'Electromagnetic Waves', mastery: 80, status: 'strong' },
      { id: 'phys-ch9', title: 'Ray Optics & Optical Instruments', mastery: 70, status: 'learning' },
      { id: 'phys-ch10', title: 'Wave Optics', mastery: 66, status: 'needs_practice' },
      { id: 'phys-ch11', title: 'Dual Nature of Radiation & Matter', mastery: 74, status: 'learning' },
      { id: 'phys-ch12', title: 'Atoms', mastery: 78, status: 'strong' },
      { id: 'phys-ch13', title: 'Nuclei', mastery: 74, status: 'learning' },
      { id: 'phys-ch14', title: 'Semiconductor Electronics', mastery: 72, status: 'learning' },
    ],
  },
  {
    subjectId: 'chemistry',
    name: 'Chemistry',
    color: '#20C997',
    lightColor: '#E8F9F4',
    masteryPercentage: 64,
    monthlyTrend: '+5% this month',
    focusArea: 'Electrochemistry & Galvanic Cells',
    totalChapters: 10,
    completedChapters: 3,
    chapterBreakdown: [
      { id: 'chem-ch1', title: 'Solutions', mastery: 72, status: 'learning' },
      { id: 'chem-ch2', title: 'Electrochemistry', mastery: 66, status: 'learning' },
      { id: 'chem-ch3', title: 'Chemical Kinetics', mastery: 65, status: 'learning' },
      { id: 'chem-ch4', title: 'd- and f-Block Elements', mastery: 64, status: 'learning' },
      { id: 'chem-ch5', title: 'Coordination Compounds', mastery: 62, status: 'needs_practice' },
      { id: 'chem-ch6', title: 'Haloalkanes and Haloarenes', mastery: 65, status: 'learning' },
      { id: 'chem-ch7', title: 'Alcohols, Phenols and Ethers', mastery: 63, status: 'learning' },
      { id: 'chem-ch8', title: 'Aldehydes, Ketones & Carboxylic Acids', mastery: 60, status: 'needs_practice' },
      { id: 'chem-ch9', title: 'Amines', mastery: 62, status: 'learning' },
      { id: 'chem-ch10', title: 'Biomolecules', mastery: 66, status: 'learning' },
    ],
  },
  {
    subjectId: 'english',
    name: 'English Core',
    color: '#FF8A3D',
    lightColor: '#FFF3EB',
    masteryPercentage: 81,
    monthlyTrend: '+2% this month',
    focusArea: 'Flamingo Literature & Notice Writing',
    totalChapters: 7,
    completedChapters: 5,
    chapterBreakdown: [
      { id: 'eng-ch1', title: 'Unseen Comprehension & Inference', mastery: 90, status: 'mastered' },
      { id: 'eng-ch2', title: 'Case-based Factual Passages', mastery: 84, status: 'strong' },
      { id: 'eng-ch3', title: 'Short Writing: Notice & Invitations', mastery: 86, status: 'mastered' },
      { id: 'eng-ch4', title: 'Long Writing: Letters & Articles', mastery: 82, status: 'strong' },
      { id: 'eng-ch5', title: 'Flamingo (Prose)', mastery: 82, status: 'strong' },
      { id: 'eng-ch6', title: 'Flamingo (Poetry)', mastery: 78, status: 'strong' },
      { id: 'eng-ch7', title: 'Vistas (Supplementary Reader)', mastery: 76, status: 'learning' },
    ],
  },
];

const achievementsCatalog: ProgressionAchievement[] = [
  {
    id: 'ach-1',
    title: 'First Mastery',
    description: 'Achieve 85%+ mastery in your first CBSE chapter.',
    icon: 'Crown',
    unlocked: true,
    unlockedAt: '2026-09-08',
    progress: 100,
    progressLabel: '100%',
    category: 'mastery',
    xpBonus: 100,
  },
  {
    id: 'ach-2',
    title: '7 Day Streak',
    description: 'Complete meaningful learning sessions 7 days in a row.',
    icon: 'Flame',
    unlocked: true,
    unlockedAt: '2026-09-14',
    progress: 100,
    progressLabel: '12 / 7 days',
    category: 'consistency',
    xpBonus: 100,
  },
  {
    id: 'ach-3',
    title: 'Physics Explorer',
    description: 'Complete 5 interactive physics virtual lab experiments.',
    icon: 'Atom',
    unlocked: true,
    unlockedAt: '2026-09-17',
    progress: 100,
    progressLabel: '5 / 5 labs',
    category: 'subject',
    xpBonus: 150,
  },
  {
    id: 'ach-4',
    title: '100 Questions',
    description: 'Answer 100 practice questions correctly across subjects.',
    icon: 'Target',
    unlocked: false,
    progress: 73,
    progressLabel: '73 / 100 questions',
    category: 'practice',
    xpBonus: 200,
  },
  {
    id: 'ach-5',
    title: 'Calculus Specialist',
    description: 'Master differentiation and integration applications.',
    icon: 'Calculator',
    unlocked: false,
    progress: 60,
    progressLabel: '3 / 5 chapters',
    category: 'subject',
    xpBonus: 250,
  },
  {
    id: 'ach-6',
    title: '30 Day Scholar',
    description: 'Maintain a learning streak for 30 consecutive days.',
    icon: 'Award',
    unlocked: false,
    progress: 40,
    progressLabel: '12 / 30 days',
    category: 'consistency',
    xpBonus: 500,
  },
];

const recentActivityLog: ActivityLogItem[] = [
  {
    id: 'act-1',
    dateGroup: 'Today',
    timestamp: '2:15 PM',
    title: 'Electric Potential & Dipole Visual Lesson',
    subjectName: 'Physics',
    subjectColor: '#7C4DFF',
    xpEarned: 25,
    type: 'lesson',
  },
  {
    id: 'act-2',
    dateGroup: 'Today',
    timestamp: '1:40 PM',
    title: 'Electrostatic Field Simulation Lab',
    subjectName: 'Physics',
    subjectColor: '#7C4DFF',
    xpEarned: 20,
    type: 'simulation',
  },
  {
    id: 'act-3',
    dateGroup: 'Yesterday',
    timestamp: '5:30 PM',
    title: 'Galvanic Daniell Cell & Nernst Equation Practice',
    subjectName: 'Chemistry',
    subjectColor: '#20C997',
    xpEarned: 30,
    type: 'practice',
  },
  {
    id: 'act-4',
    dateGroup: 'Yesterday',
    timestamp: '4:10 PM',
    title: 'Secant-to-Tangent Calculus Exploration',
    subjectName: 'Mathematics',
    subjectColor: '#4F7CFF',
    xpEarned: 20,
    type: 'simulation',
  },
  {
    id: 'act-5',
    dateGroup: 'Earlier this week',
    timestamp: 'Sep 17, 3:00 PM',
    title: 'CBSE Notice Writing Format Submission',
    subjectName: 'English Core',
    subjectColor: '#FF8A3D',
    xpEarned: 25,
    type: 'assignment',
  },
];

const leaderboardPodium: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Aarav Mehta',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    xp: 1840,
    change: 0,
  },
  {
    rank: 2,
    name: 'Priya Nair',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    xp: 1720,
    change: 1,
  },
  {
    rank: 3,
    name: 'Rohan Verma',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    xp: 1640,
    change: -1,
  },
];

const leaderboardNearby: LeaderboardEntry[] = [
  {
    rank: 21,
    name: 'Ananya Sen',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    xp: 1210,
    change: 1,
  },
  {
    rank: 22,
    name: 'Siddharth Rao',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    xp: 1180,
    change: 0,
  },
  {
    rank: 23,
    name: 'Tanvi Iyer',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    xp: 1150,
    change: -1,
  },
  {
    rank: 24,
    name: 'Arjun Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    xp: 1120,
    change: 3,
    isCurrentUser: true,
  },
  {
    rank: 25,
    name: 'Meera Deshmukh',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    xp: 1090,
    change: -2,
  },
  {
    rank: 26,
    name: 'Kabir Malhotra',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    xp: 1060,
    change: 1,
  },
];

export const getStudentProgression = (): StudentProgression => {
  return {
    studentId: 'student-1',
    name: 'Arjun Sharma',
    className: 'Class 12-A',
    rollNumber: '12A-18',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',

    level: 8,
    levelTitle: 'Problem Solver',
    currentXp: 1240,
    nextLevelXp: 1600,
    levelProgressPercentage: 78,
    xpNeededForNextLevel: 360,
    nextLevelTitle: 'Scholar',

    dailyGoal: {
      todayXp: 35,
      targetXp: 60,
      remainingXp: 25,
      progressPercentage: 58,
    },

    currentStreak: 12,
    longestStreak: 27,
    thisWeekActiveDays: 6,
    nextStreakMilestone: 14,
    streakMilestoneRewardXp: 100,
    daysToNextMilestone: 2,
    milestones: streakMilestones,

    heatmap: generate12WeekHeatmap(),

    overallMastery: 74,
    subjects: subjectMasteryData,

    personalGoals: [
      {
        id: 'goal-1',
        title: 'Level 9 — Scholar',
        current: 1240,
        target: 1600,
        unit: 'XP',
        reward: '+250 Milestone XP',
      },
      {
        id: 'goal-2',
        title: '14-Day Streak Milestone',
        current: 12,
        target: 14,
        unit: 'Days',
        reward: '+100 Streak XP',
      },
      {
        id: 'goal-3',
        title: '100 Practice Questions',
        current: 73,
        target: 100,
        unit: 'Questions',
        reward: '+200 Practice XP',
      },
    ],

    achievements: achievementsCatalog,

    recentActivity: recentActivityLog,

    leaderboard: {
      period: 'week',
      scope: 'class',
      userRank: 24,
      userWeeklyXp: 1120,
      podium: leaderboardPodium,
      nearbyRanks: leaderboardNearby,
      encouragingMessage: "You're #24 this week. 30 XP to reach #23. Keep up the steady momentum!",
    },
  };
};
