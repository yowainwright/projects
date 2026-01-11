import type { HistoryEntry, ProjectMetrics } from '@/data/projects-generated';

export type MetricDataKey = 'stars' | 'forks' | 'downloads' | 'commits';

export interface MetricsSectionProps {
  projectId: string;
  metrics?: ProjectMetrics;
}

export interface MetricChartProps {
  history: HistoryEntry[];
  dataKey: MetricDataKey;
}

export interface MetricItemProps {
  label: string;
  value: number;
  history: HistoryEntry[];
  dataKey: MetricDataKey;
}

export interface SimpleMetricProps {
  label: string;
  value: string;
}
