'use client';

import { useState, useEffect } from 'react';
import type { ProjectMetrics } from '@/data/types';

interface UseProjectMetricsResult {
  metrics: ProjectMetrics | null;
  loading: boolean;
  error: Error | null;
}

function getBaseUrl(): string {
  const envBase = import.meta.env.BASE_URL;
  if (envBase) return envBase;
  return '/';
}

function getMetricsUrl(projectId: string): string {
  const base = getBaseUrl();
  return `${base}metrics/${projectId}.json`;
}

async function fetchMetricsJson(projectId: string, signal: AbortSignal): Promise<ProjectMetrics> {
  const url = getMetricsUrl(projectId);
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch metrics: ${response.status}`);
  }
  return response.json();
}

export function useProjectMetrics(projectId: string): UseProjectMetricsResult {
  const [metrics, setMetrics] = useState<ProjectMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchMetricsJson(projectId, controller.signal)
      .then((data) => { setMetrics(data); setError(null); })
      .catch((err) => { if (err.name !== 'AbortError') setError(err); })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [projectId]);

  return { metrics, loading, error };
}
