import type { HistoryEntry, Activity, GradeData } from '@/data/projects-generated';

export type ChartType = 'stars' | 'downloads' | 'commits' | 'activity' | 'grade';

export interface ChartDetailDialogProps {
  open: boolean;
  onClose: () => void;
  type: ChartType | null;
  history: HistoryEntry[];
  activity: Activity;
  grade: GradeData;
}

export interface DetailViewProps {
  history: HistoryEntry[];
  activity: Activity;
  grade: GradeData;
}
