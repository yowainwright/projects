'use client';

import { useState, useCallback } from 'react';
import { MiniChart } from '@/components/charts/MiniChart';
import { RadarChart } from '@/components/charts/RadarChart';
import { ActivityScatter } from '@/components/charts/ActivityScatter';
import { ChartDetailDialog } from '@/components/charts/ChartDetailDialog';
import type { ChartType } from '@/components/charts/ChartDetailDialog/types';
import type { MetricsSectionProps } from './types';
import type { HistoryEntry } from '@/data/projects-generated';

type MetricDataKey = 'stars' | 'forks' | 'downloads' | 'commits';

interface ChartWithValueProps {
  label: string;
  value: number;
  history: HistoryEntry[];
  dataKey: MetricDataKey;
  onClick: () => void;
}

function ChartWithValue({ label, value, history, dataKey, onClick }: ChartWithValueProps) {
  const hasData = history.length > 1;
  if (!hasData) return null;

  return <MiniChart history={history} dataKey={dataKey} label={label} value={value} onClick={onClick} />;
}

function sumCommits(commits: { year: number; count: number }[]): number {
  return commits.reduce((sum, c) => sum + c.count, 0);
}

export function MetricsSection({ projectId, metrics }: MetricsSectionProps) {
  const [openChart, setOpenChart] = useState<ChartType | null>(null);

  const openDialog = useCallback((type: ChartType) => setOpenChart(type), []);
  const closeDialog = useCallback(() => setOpenChart(null), []);

  if (!metrics) return null;

  const { current, history, grade } = metrics;
  const stars = current.stars;
  const downloads = current.downloads.monthly;
  const commits = sumCommits(current.commits);
  const activity = current.activity;
  const sectionId = `${projectId}-metrics`;

  return (
    <>
      <div id={sectionId} className="my-2! pb-4!">
        <ChartWithValue label="Stars" value={stars} history={history} dataKey="stars" onClick={() => openDialog('stars')} />
        <ChartWithValue label="Downloads" value={downloads} history={history} dataKey="downloads" onClick={() => openDialog('downloads')} />
        <ChartWithValue label="Commits" value={commits} history={history} dataKey="commits" onClick={() => openDialog('commits')} />
        <ActivityScatter activity={activity} onClick={() => openDialog('activity')} />
        <RadarChart grade={grade} onClick={() => openDialog('grade')} />
      </div>
      <ChartDetailDialog
        open={openChart !== null}
        onClose={closeDialog}
        type={openChart}
        history={history}
        activity={activity}
        grade={grade}
      />
    </>
  );
}
