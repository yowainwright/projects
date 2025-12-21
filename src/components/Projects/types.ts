import type { Project } from '@/data/projects';

export interface ProjectDetailProps {
  project: Project;
}

export interface HeaderProps {
  project: Project;
}

export interface HighlightsProps {
  highlights: string[];
}

export interface TagsProps {
  tags: string[];
}

export interface LinksProps {
  project: Project;
}
