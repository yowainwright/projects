'use client';

import { useMemo } from 'react';
import type { Activity, MonthlyCommits } from '@/data/projects-generated';

interface ActivityHeatmapProps {
  activity: Activity;
}

const CELL_SIZE = 10;
const CELL_GAP = 2;
const MONTHS_TO_SHOW = 12;
const CELL_STYLE = { width: CELL_SIZE, height: CELL_SIZE };
const BASE_CLASS = 'rounded-sm';

function getIntensity(commits: number, max: number): string {
  if (commits === 0) return 'bg-muted';
  const r = commits / max;
  if (r < 0.25) return 'bg-gray-300 dark:bg-gray-600';
  if (r < 0.5) return 'bg-gray-400 dark:bg-gray-500';
  if (r < 0.75) return 'bg-gray-500 dark:bg-gray-400';
  return 'bg-gray-600 dark:bg-gray-300';
}

function parseMonth(monthStr: string): { year: number; month: number; name: string } {
  const [yearStr, monthStr2] = monthStr.split('-');
  const year = parseInt(yearStr, 10);
  const monthIndex = parseInt(monthStr2, 10) - 1;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const name = months[monthIndex];
  return { year, month: monthIndex, name };
}

interface CellData {
  k: string;
  c: string;
  t: string;
}

function buildCellData(m: MonthlyCommits, max: number): CellData {
  const parsed = parseMonth(m.month);
  const className = `${BASE_CLASS} ${getIntensity(m.commits, max)}`;
  const title = `${parsed.name} ${parsed.year}: ${m.commits} commits`;
  return { k: m.month, c: className, t: title };
}

function buildData(activity: Activity): CellData[] {
  const months = activity.months;
  if (months.length === 0) return [];

  const recentMonths = months.slice(-MONTHS_TO_SHOW);
  const commits = recentMonths.map((m) => m.commits);
  const max = Math.max(...commits, 1);

  return recentMonths.map((m) => buildCellData(m, max));
}

function Blob({ c, t }: { c: string; t: string }) {
  return <div className={c} style={CELL_STYLE} title={t} />;
}

export function ActivityHeatmap({ activity }: ActivityHeatmapProps) {
  const data = useMemo(() => buildData(activity), [activity]);

  if (data.length === 0) return null;

  const monthCount = data.length;
  const gridWidth = monthCount * (CELL_SIZE + CELL_GAP);
  const gridStyle = { width: gridWidth, height: CELL_SIZE };
  const blobs = data.map((d) => <Blob key={d.k} c={d.c} t={d.t} />);

  return (
    <figure className="flex gap-0.5">
      <figcaption className="sr-only">Monthly commit activity</figcaption>
      <div style={gridStyle} className="flex gap-0.5">{blobs}</div>
    </figure>
  );
}
