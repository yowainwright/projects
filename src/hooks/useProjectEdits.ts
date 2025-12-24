import { useCallback, useMemo } from 'react';
import { useLiveQuery } from '@tanstack/react-db';
import { editsCollection, type ProjectEdit } from '@/lib/edits-collection';
import { trackEvent } from '@/lib/analytics';
import type { Project } from '@/data/projects-generated';

type ProjectEdits = Record<string, Partial<Project>>;

export function useProjectEdits() {
  const { data: editsList } = useLiveQuery((q) =>
    q.from({ edits: editsCollection })
  );

  const edits = useMemo(() => {
    const result: ProjectEdits = {};
    for (const edit of editsList ?? []) {
      result[edit.id] = edit.changes;
    }
    return result;
  }, [editsList]);

  const hasUnsavedChanges = (editsList?.length ?? 0) > 0;

  const updateField = useCallback(
    (projectId: string, field: keyof Project, value: string | string[]) => {
      const existing = editsList?.find((e) => e.id === projectId);
      const existingChanges = existing?.changes ?? {};
      const updatedChanges = { ...existingChanges, [field]: value };

      const editData: ProjectEdit = {
        id: projectId,
        changes: updatedChanges,
        updatedAt: Date.now(),
      };

      const isNewEdit = !existing;
      if (isNewEdit) {
        trackEvent('project_edit_started', { projectId, field });
        editsCollection.insert(editData);
      } else {
        editsCollection.update(projectId, (draft) => {
          draft.changes = updatedChanges;
          draft.updatedAt = Date.now();
        });
      }
    },
    [editsList]
  );

  const getEditedValue = useCallback(
    <K extends keyof Project>(projectId: string, field: K, original: Project[K]): Project[K] => {
      const projectEdits = edits[projectId];
      const editedValue = projectEdits?.[field] as Project[K] | undefined;
      return editedValue ?? original;
    },
    [edits]
  );

  const discardEdits = useCallback(
    (projectId?: string) => {
      const shouldDiscardSingle = typeof projectId === 'string';

      if (shouldDiscardSingle) {
        trackEvent('edits_discarded', { projectId, scope: 'single' });
        editsCollection.delete(projectId);
      } else {
        const allEdits = editsCollection.toArray;
        trackEvent('edits_discarded', {
          scope: 'all',
          projectCount: allEdits.length,
        });
        for (const edit of allEdits) {
          editsCollection.delete(edit.id);
        }
      }
    },
    []
  );

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
