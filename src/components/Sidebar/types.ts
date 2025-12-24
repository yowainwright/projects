import type { ChangeEvent } from 'react';
import type { Project } from '@/data/projects-generated';

export interface SidebarProps {
  activeId: string | null;
  onProjectClick: (id: string) => void;
  search: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  allTags: string[];
  filteredProjects: Project[];
  projectsByCategory: CategoryWithProjects[];
}

export interface CategorySectionProps {
  label: string;
  projects: Project[];
  activeId: string | null;
  onProjectClick: (id: string) => void;
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export interface TagsProps {
  tags: string[];
  clearFilters: () => void;
  toggleTag: (tag: string) => void;
}

export interface SearchInputProps {
  search: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface FilteredTagTextProps {
  search: string;
  selectedTags: string[];
  filteredProjects: Project[];
}

export interface FilteredBadgesProps {
  search: string;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  allTags: string[];
}

export interface CategoryWithProjects {
  id: string;
  label: string;
  projects: Project[];
}

export interface BadgeNavProps {
  projectsByCategory: CategoryWithProjects[];
  activeId: string | null;
  onProjectClick: (id: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
}
