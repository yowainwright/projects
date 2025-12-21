import { projects } from '@/data/projects';

export interface SidebarProps {
  activeId: string | null;
  onProjectClick: (id: string) => void;
}

export interface CategorySectionProps {
  label: string;
  projects: typeof projects;
  activeId: string | null;
  onProjectClick: (id: string) => void;
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export type TagsProps = {
    tags: string[];
    clearFilters: any;
    toggleTag: any;
}