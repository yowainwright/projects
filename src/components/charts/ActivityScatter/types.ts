import type { Activity } from '@/data/projects-generated';

export interface ActivityScatterProps {
  activity: Activity;
  height?: number;
  showTotal?: boolean;
  onClick?: () => void;
}

export interface DataPoint {
  x: number;
  y: number;
  z: number;
  label: string;
}

export interface ScatterData {
  points: DataPoint[];
  startLabel: string;
  endLabel: string;
}
