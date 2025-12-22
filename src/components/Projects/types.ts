import type { Project } from '@/data/projects';

export interface ProjectListProps {
  projects: Project[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
  onTitleClick: (id: string) => void;
}

export interface ProjectDetailProps {
  project: Project;
  selectedTags: string[];
  onTagClick: (tag: string) => void;
  onTitleClick: (id: string) => void;
}

export interface HeaderProps {
  project: Project;
  onTitleClick: (id: string) => void;
}

export interface HighlightsProps {
  projectId: string;
  highlights: string[];
}

export interface TagsProps {
  projectId: string;
  tags: string[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export interface LinksProps {
  project: Project;
}
