'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { STYLES } from './constants';
import { StarsDetail } from './StarsDetail';
import { DownloadsDetail } from './DownloadsDetail';
import { CommitsDetail } from './CommitsDetail';
import { ActivityDetail } from './ActivityDetail';
import { GradeDetail } from './GradeDetail';
import type { ChartDetailDialogProps, ChartType } from './types';

const TITLES: Record<ChartType, string> = {
  stars: 'Stars History',
  downloads: 'Downloads History',
  commits: 'Commits History',
  activity: 'Activity Breakdown',
  grade: 'Grade Breakdown',
};

export function ChartDetailDialog({ open, onClose, type, history, activity, grade }: ChartDetailDialogProps) {
  if (!type) return null;

  const title = TITLES[type];

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className={STYLES.content}>
        <DialogHeader>
          <DialogTitle className={STYLES.title}>{title}</DialogTitle>
        </DialogHeader>
        <DetailContent type={type} history={history} activity={activity} grade={grade} />
      </DialogContent>
    </Dialog>
  );
}

interface DetailContentProps {
  type: ChartType;
  history: ChartDetailDialogProps['history'];
  activity: ChartDetailDialogProps['activity'];
  grade: ChartDetailDialogProps['grade'];
}

function DetailContent({ type, history, activity, grade }: DetailContentProps) {
  switch (type) {
    case 'stars':
      return <StarsDetail history={history} />;
    case 'downloads':
      return <DownloadsDetail history={history} />;
    case 'commits':
      return <CommitsDetail history={history} />;
    case 'activity':
      return <ActivityDetail activity={activity} />;
    case 'grade':
      return <GradeDetail grade={grade} />;
    default:
      return null;
  }
}
