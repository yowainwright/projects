'use client';

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { HistoryEntry } from '@/data/projects-generated';
import { COLORS, STYLES } from './constants';

interface DownloadsDetailProps {
  history: HistoryEntry[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} '${String(date.getFullYear()).slice(2)}`;
}

function getMonthlyDownloads(entry: HistoryEntry): number {
  if (!entry.downloads) return 0;
  return entry.downloads.monthly;
}

export function DownloadsDetail({ history }: DownloadsDetailProps) {
  const data = history.map((entry) => ({
    date: formatDate(entry.date),
    downloads: getMonthlyDownloads(entry),
  }));

  const lastEntry = data[data.length - 1];
  const firstEntry = data[0];
  const currentDownloads = lastEntry ? lastEntry.downloads : 0;
  const startDownloads = firstEntry ? firstEntry.downloads : 0;
  const growth = currentDownloads - startDownloads;

  return (
    <div>
      <div className="mb-4! flex! gap-6!">
        <div>
          <div className="text-sm! text-muted-foreground!">Monthly</div>
          <div className="text-2xl! font-bold! tabular-nums!">{currentDownloads.toLocaleString()}</div>
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
            <YAxis tick={{ fontSize: 10 }} width={60} />
            <Tooltip />
            <Area type="monotone" dataKey="downloads" stroke={COLORS.chart} fill={COLORS.chart} fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
