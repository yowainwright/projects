import type { Project } from '@/data/projects';

export interface ProjectDetailProps {
  project: Project;
}

export interface HeaderProps {
  project: Project;
}

export interface HighlightsProps {
  projectId: string;
  highlights: string[];
}

export interface TagsProps {
  projectId: string;
  tags: string[];
}

export interface LinksProps {
  project: Project;
}
