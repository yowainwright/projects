import type { Project } from '@/data/projects';

export interface CardProps {
  project: Project;
  isActive: boolean;
  onClick: () => void;
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}
