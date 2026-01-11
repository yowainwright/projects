import type { GradeData } from '@/data/projects-generated';

export interface RadarChartProps {
  grade: GradeData;
  size?: number;
  onClick?: () => void;
}

export interface DataPoint {
  metric: string;
  value: number;
}
