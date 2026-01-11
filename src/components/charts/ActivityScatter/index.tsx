'use client';

import { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, ResponsiveContainer } from 'recharts';
import type { Activity } from '@/data/projects-generated';
import { CHART_HEIGHT, MONTHS_TO_SHOW, MIN_DOT_SIZE, MAX_DOT_SIZE, COLORS, STYLES } from './constants';
import type { ActivityScatterProps, ScatterData } from './types';

function parseMonthLabel(monthStr: string): string {
  const [yearStr, monthStr2] = monthStr.split('-');
  const monthIndex = parseInt(monthStr2, 10) - 1;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const shortYear = yearStr.slice(2);
  return `${months[monthIndex]} '${shortYear}`;
}

function buildScatterData(activity: Activity): ScatterData {
  const months = activity.months;
  if (months.length === 0) return { points: [], startLabel: '', endLabel: '' };

  const recentMonths = months.slice(-MONTHS_TO_SHOW);
  const points = recentMonths.map((m, i) => ({
    x: i,
    y: m.commits,
    z: m.commits,
    label: parseMonthLabel(m.month),
  }));

  const startLabel = parseMonthLabel(recentMonths[0].month);
  const endLabel = parseMonthLabel(recentMonths[recentMonths.length - 1].month);

  return { points, startLabel, endLabel };
}

export function ActivityScatter({ activity, height: _height = CHART_HEIGHT, showTotal = true, onClick }: ActivityScatterProps) {
  const { points, startLabel, endLabel } = useMemo(() => buildScatterData(activity), [activity]);

  if (points.length === 0) return null;

  const total = activity.total;
  const formattedTotal = total.toLocaleString();
  const totalElement = showTotal ? <span className={STYLES.value}>{formattedTotal}</span> : null;
  const dateRange = `${startLabel} - ${endLabel}`;

  return (
    <figure className={STYLES.figure} onClick={onClick}>
      <div className={STYLES.header}>
        <span className={STYLES.label}>Activity</span>
        {totalElement}
      </div>
      <span className={STYLES.dateRange}>{dateRange}</span>
      <div className={STYLES.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
            <XAxis dataKey="x" hide />
            <YAxis dataKey="y" hide />
            <ZAxis dataKey="z" range={[MIN_DOT_SIZE, MAX_DOT_SIZE]} />
            <Scatter data={points} fill={COLORS.dot} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}
