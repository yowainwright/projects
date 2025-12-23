import type { Project } from '@/data/projects';

export interface ProjectListProps {
  projects: Project[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
  onTitleClick: (id: string) => void;
  onFieldChange?: (projectId: string, field: keyof Project, value: string) => void;
  getEditedValue?: <K extends keyof Project>(projectId: string, field: K, original: Project[K]) => Project[K];
}

export interface ProjectDetailProps {
  project: Project;
  selectedTags: string[];
  onTagClick: (tag: string) => void;
  onTitleClick: (id: string) => void;
  onFieldChange?: (projectId: string, field: keyof Project, value: string) => void;
  getEditedValue?: <K extends keyof Project>(projectId: string, field: K, original: Project[K]) => Project[K];
}

export interface HeaderProps {
  project: Project;
  onTitleClick: (id: string) => void;
  onFieldChange?: (projectId: string, field: keyof Project, value: string) => void;
  getEditedValue?: <K extends keyof Project>(projectId: string, field: K, original: Project[K]) => Project[K];
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
