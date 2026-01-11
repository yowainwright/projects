'use client';

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { HistoryEntry } from '@/data/projects-generated';
import { COLORS, STYLES } from './constants';

interface CommitsDetailProps {
  history: HistoryEntry[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} '${String(date.getFullYear()).slice(2)}`;
}

function sumCommits(commits: { year: number; count: number }[] | undefined): number {
  if (!commits) return 0;
  return commits.reduce((sum, c) => sum + c.count, 0);
}

export function CommitsDetail({ history }: CommitsDetailProps) {
  const data = history.map((entry) => ({
    date: formatDate(entry.date),
    commits: sumCommits(entry.commits),
  }));

  const lastEntry = data[data.length - 1];
  const totalCommits = lastEntry ? lastEntry.commits : 0;

  return (
    <div>
      <div className="mb-4!">
        <div className="text-sm! text-muted-foreground!">Total Commits</div>
        <div className="text-2xl! font-bold! tabular-nums!">{totalCommits.toLocaleString()}</div>
      </div>
      <div className={STYLES.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} width={50} />
            <Tooltip />
            <Area type="monotone" dataKey="commits" stroke={COLORS.chart} fill={COLORS.chart} fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
