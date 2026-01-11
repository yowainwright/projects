import type { HistoryEntry } from '@/data/projects-generated';

export type MetricDataKey = 'stars' | 'forks' | 'downloads' | 'commits';

export interface MiniChartProps {
  history: HistoryEntry[];
  dataKey: MetricDataKey;
  label: string;
  value: number;
  color?: string;
  height?: number;
  onClick?: () => void;
}
