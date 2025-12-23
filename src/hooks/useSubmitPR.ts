import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { createProjectEditPR } from '@/lib/github';
import type { Project } from '@/data/projects';

interface UseSubmitPRReturn {
  submitPR: (projectId: string, changes: Partial<Project>) => Promise<string | null>;
  isSubmitting: boolean;
  error: string | null;
  prUrl: string | null;
}

export function useSubmitPR(): UseSubmitPRReturn {
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prUrl, setPrUrl] = useState<string | null>(null);

  const submitPR = useCallback(
    async (projectId: string, changes: Partial<Project>): Promise<string | null> => {
      if (!token) {
        setError('Not authenticated');
        return null;
      }

      setIsSubmitting(true);
      setError(null);
      setPrUrl(null);

      try {
        const url = await createProjectEditPR({
          token,
          projectId,
          changes,
        });
        setPrUrl(url);
        return url;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create PR';
        setError(message);
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    [token]
  );

  return {
    submitPR,
    isSubmitting,
    error,
    prUrl,
  };
}
