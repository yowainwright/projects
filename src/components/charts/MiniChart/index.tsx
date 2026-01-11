'use client';

import { useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import type { HistoryEntry, YearlyCommits, Downloads } from '@/data/projects-generated';
import { CHART_HEIGHT, COLORS, STYLES } from './constants';
import type { MiniChartProps, MetricDataKey } from './types';

function sumCommits(commits: YearlyCommits[] | undefined): number {
  if (!commits) return 0;
  return commits.reduce((sum, c) => sum + c.count, 0);
}

function getDownloads(downloads: Downloads | undefined): number {
  if (!downloads) return 0;
  return downloads.monthly;
}

function extractValue(entry: HistoryEntry, dataKey: MetricDataKey): number {
  switch (dataKey) {
    case 'stars':
      return entry.stars ?? 0;
    case 'forks':
      return entry.forks ?? 0;
    case 'downloads':
      return getDownloads(entry.downloads);
    case 'commits':
      return sumCommits(entry.commits);
    default:
      return 0;
  }
}

function buildChartData(history: HistoryEntry[], dataKey: MetricDataKey) {
  return history.map((entry) => ({ value: extractValue(entry, dataKey) }));
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = String(date.getFullYear()).slice(2);
  return `${month} '${year}`;
}

export function MiniChart({ history, dataKey, label, value, color = COLORS.chart, height: _height = CHART_HEIGHT, onClick }: MiniChartProps) {
  const chartData = useMemo(() => buildChartData(history, dataKey), [history, dataKey]);

  if (history.length === 0) return null;

  const startDate = formatDate(history[0].date);
  const endDate = formatDate(history[history.length - 1].date);
  const formattedValue = value.toLocaleString();
  const dateRange = `${startDate} - ${endDate}`;

  return (
    <figure className={STYLES.figure} onClick={onClick}>
      <div className={STYLES.header}>
        <span className={STYLES.label}>{label}</span>
        <span className={STYLES.value}>{formattedValue}</span>
      </div>
      <span className={STYLES.dateRange}>{dateRange}</span>
      <div className={STYLES.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={COLORS.gradientStart} />
                <stop offset="100%" stopColor={color} stopOpacity={COLORS.gradientEnd} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={1.5}
              fill={`url(#gradient-${dataKey})`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}
