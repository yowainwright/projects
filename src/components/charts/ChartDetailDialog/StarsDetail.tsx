'use client';

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { HistoryEntry } from '@/data/projects-generated';
import { CHART_HEIGHT, COLORS, STYLES } from './constants';

interface StarsDetailProps {
  history: HistoryEntry[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} '${String(date.getFullYear()).slice(2)}`;
}

export function StarsDetail({ history }: StarsDetailProps) {
  const data = history.map((entry) => ({
    date: formatDate(entry.date),
    stars: entry.stars ?? 0,
  }));

  const lastEntry = data[data.length - 1];
  const firstEntry = data[0];
  const currentStars = lastEntry ? lastEntry.stars : 0;
  const startStars = firstEntry ? firstEntry.stars : 0;
  const growth = currentStars - startStars;

  return (
    <div>
      <div className="mb-4! flex! gap-6!">
        <div>
          <div className="text-sm! text-muted-foreground!">Current</div>
          <div className="text-2xl! font-bold! tabular-nums!">{currentStars.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-sm! text-muted-foreground!">Growth</div>
          <div className="text-2xl! font-bold! tabular-nums!">+{growth.toLocaleString()}</div>
        </div>
      </div>
      <div className={STYLES.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} width={50} />
            <Tooltip />
            <Area type="monotone" dataKey="stars" stroke={COLORS.chart} fill={COLORS.chart} fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
