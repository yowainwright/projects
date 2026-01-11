'use client';

import { useProjectMetrics } from '@/hooks/useProjectMetrics';
import { MetricsSection } from './MetricsSection';

interface MetricsSectionLoaderProps {
  projectId: string;
}

export function MetricsSectionLoader({ projectId }: MetricsSectionLoaderProps) {
  const { metrics, loading } = useProjectMetrics(projectId);

  if (loading) {
    return <MetricsSkeleton />;
  }

  return <MetricsSection projectId={projectId} metrics={metrics ?? undefined} />;
}

function MetricsSkeleton() {
  return (
    <div className="flex items-start gap-6 animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-4 w-24 bg-muted rounded" />
        <div className="h-4 w-28 bg-muted rounded" />
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="h-4 w-32 bg-muted rounded" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="h-4 w-16 bg-muted rounded" />
        <div className="h-4 w-18 bg-muted rounded" />
      </div>
      <div className="w-[72px] h-[72px] bg-muted rounded" />
    </div>
  );
}
