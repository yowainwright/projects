'use client';

import { useState, useEffect } from 'react';
import { projects } from '@/data/projects-generated';
import { getTotalStars } from '@/data/utils';
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

function getStaticStars(projectId: string): number | null {
  const project = projects.find(({ id }) => id === projectId);
  if (!project) return null;
  return getTotalStars(project);
}

function replaceLatestStars(history: ProjectMetrics['history'], stars: number) {
  const latestIndex = history.length - 1;
  return history.map((historyPoint, index) => {
    if (index !== latestIndex) return historyPoint;
    return { ...historyPoint, stars };
  });
}

function applyStaticStars(projectId: string, metrics: ProjectMetrics): ProjectMetrics {
  const stars = getStaticStars(projectId);
  if (stars === null) return metrics;
  const current = { ...metrics.current, stars };
  const history = replaceLatestStars(metrics.history, stars);
  return { ...metrics, current, history };
}

async function fetchMetricsJson(projectId: string, signal: AbortSignal) {
  const url = getMetricsUrl(projectId);
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch metrics: ${response.status}`);
  }
  const metrics = await response.json() as ProjectMetrics;
  return applyStaticStars(projectId, metrics);
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
