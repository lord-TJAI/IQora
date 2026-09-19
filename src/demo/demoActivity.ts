// 12-week activity history for student heatmap (deterministic)
export interface ActivityDay {
  date: string;
  count: number; // 0 to 5
  level: 0 | 1 | 2 | 3 | 4;
}

export const generateDemoHeatmap = (): ActivityDay[] => {
  const days: ActivityDay[] = [];
  const baseDate = new Date('2026-09-19');

  // Generate 84 days (12 weeks) backwards deterministically
  for (let i = 83; i >= 0; i--) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // Deterministic pattern: Higher activity on weekdays, medium on weekends, active recent 2 weeks
    const dayOfWeek = d.getDay(); // 0 is Sun, 6 is Sat
    let count = 0;
    if (i < 14) {
      // Recent 2 weeks: consistent activity
      count = dayOfWeek === 0 || dayOfWeek === 6 ? 2 : (i % 3 === 0 ? 4 : 3);
    } else {
      // Prior weeks: natural variation
      const pseudoHash = (i * 17 + dayOfWeek * 13) % 10;
      if (pseudoHash > 6) count = 3;
      else if (pseudoHash > 3) count = 2;
      else if (pseudoHash > 1) count = 1;
      else count = 0;
    }

    const level = (count === 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : count === 3 ? 3 : 4) as 0 | 1 | 2 | 3 | 4;
    days.push({ date: dateStr, count, level });
  }

  return days;
};

export const demoActivityDays = generateDemoHeatmap();
