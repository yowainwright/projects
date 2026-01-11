'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { Activity } from '@/data/projects-generated';
import { COLORS, STYLES } from './constants';

interface ActivityDetailProps {
  activity: Activity;
}

function formatMonth(monthStr: string): string {
  const [yearStr, monthNum] = monthStr.split('-');
  const monthIndex = parseInt(monthNum, 10) - 1;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[monthIndex]} '${yearStr.slice(2)}`;
}

export function ActivityDetail({ activity }: ActivityDetailProps) {
  const data = activity.months.map((m) => ({
    month: formatMonth(m.month),
    commits: m.commits,
  }));

  const total = activity.total;
  const monthCount = activity.months.length;
  const avgPerMonth = monthCount > 0 ? Math.round(total / monthCount) : 0;

  return (
    <div>
      <div className="mb-4! flex! gap-6!">
        <div>
          <div className="text-sm! text-muted-foreground!">Total</div>
          <div className="text-2xl! font-bold! tabular-nums!">{total.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-sm! text-muted-foreground!">Avg/Month</div>
          <div className="text-2xl! font-bold! tabular-nums!">{avgPerMonth.toLocaleString()}</div>
        </div>
      </div>
      <div className={STYLES.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} width={40} />
            <Tooltip />
            <Bar dataKey="commits" fill={COLORS.chart} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
