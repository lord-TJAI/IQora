export interface DemoLeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
}

export const demoLeaderboard: DemoLeaderboardEntry[] = [
  { rank: 1, id: 'student-2', name: 'Aarav Mehta', xp: 1840, streak: 15 },
  { rank: 2, id: 'student-3', name: 'Priya Nair', xp: 1720, streak: 14 },
  { rank: 3, id: 'student-4', name: 'Meera Shah', xp: 1690, streak: 14 },
  { rank: 4, id: 'student-1', name: 'Arjun Sharma', xp: 1425, streak: 12, isCurrentUser: true },
  { rank: 5, id: 'student-5', name: 'Kabir Malhotra', xp: 1380, streak: 11 },
  { rank: 6, id: 'student-6', name: 'Ananya Iyer', xp: 1320, streak: 10 },
  { rank: 7, id: 'student-7', name: 'Vihaan Rao', xp: 1260, streak: 9 },
  { rank: 8, id: 'student-8', name: 'Aditya Verma', xp: 1190, streak: 8 },
  { rank: 9, id: 'student-9', name: 'Ishita Menon', xp: 1150, streak: 9 },
  { rank: 10, id: 'student-10', name: 'Rahul Khanna', xp: 1080, streak: 7 },
];
