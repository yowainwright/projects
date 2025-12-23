import { useState, useCallback } from 'react';
import type { Project } from '@/data/projects';

type ProjectEdits = Record<string, Partial<Project>>;

export function useProjectEdits() {
  const [edits, setEdits] = useState<ProjectEdits>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateField = useCallback(
    (projectId: string, field: keyof Project, value: string | string[]) => {
      setEdits((prev) => {
        const existingEdits = prev[projectId] ?? {};
        const updatedProjectEdits = { ...existingEdits, [field]: value };
        return { ...prev, [projectId]: updatedProjectEdits };
      });
      setHasUnsavedChanges(true);
    },
    []
  );

  const getEditedValue = useCallback(
    <K extends keyof Project>(projectId: string, field: K, original: Project[K]): Project[K] => {
      const projectEdits = edits[projectId];
      const editedValue = projectEdits?.[field] as Project[K] | undefined;
      return editedValue ?? original;
    },
    [edits]
  );

  const discardEdits = useCallback((projectId?: string) => {
    const shouldDiscardSingle = Boolean(projectId);

    if (shouldDiscardSingle) {
      setEdits((prev) => {
        const { [projectId!]: _, ...remaining } = prev;
        return remaining;
      });
    } else {
      setEdits({});
    }

    setHasUnsavedChanges(false);
  }, []);

  const getAllEdits = useCallback(() => edits, [edits]);

  return {
    edits,
    hasUnsavedChanges,
    updateField,
    getEditedValue,
    discardEdits,
    getAllEdits,
  };
}
