import { createCollection, localStorageCollectionOptions } from '@tanstack/react-db';
import type { Project } from '@/data/projects-generated';

export interface ProjectEdit {
  id: string;
  changes: Partial<Project>;
  updatedAt: number;
}

export const editsCollection = createCollection(
  localStorageCollectionOptions({
    id: 'project-edits',
    storageKey: 'jeffry-in-project-edits',
    getKey: (item: ProjectEdit) => item.id,
  })
);
