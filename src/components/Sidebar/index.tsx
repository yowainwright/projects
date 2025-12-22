import { useMemo, useState, type ChangeEvent } from 'react';
import { projects, categories } from '@/data/projects';
import { Card } from '@/components/Sidebar/Card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { SIDEBAR_STYLES } from './constants';
import type {
  CategorySectionProps,
  SidebarProps,
  TagsProps,
  SearchInputProps,
  FilteredTagTextProps,
  FilteredBadgesProps,
  BadgeNavProps,
} from './types';

export function Sidebar({ activeId, onProjectClick }: SidebarProps) {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const title = trimWord(p.title, search)
      const tagLine = trimWord(p.tagline, search)
      const matchesSearch =
        !search || title || tagLine ||
        p.tags.some((t) => trimWord(t, search));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => p.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [search, selectedTags]);

  const projectsByCategory = useMemo(() => {
    return categories
      .map((category) => ({
        ...category,
        projects: filteredProjects.filter((p) => p.category === category.id),
      }))
      .filter((category) => category.projects.length > 0);
  }, [filteredProjects]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedTags([]);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  return (
    <aside id="sidebar" className={SIDEBAR_STYLES.aside}>
      <div id="sidebar-container" className={SIDEBAR_STYLES.container}>
        <SearchInput search={search} handleSearch={handleSearch} />
        <Tags
            clearFilters={clearFilters}
            tags={selectedTags}
            toggleTag={toggleTag}
        />
        <FilteredTagText
            search={search}
            selectedTags={selectedTags}
            filteredProjects={filteredProjects}
        />
        <BadgeNav
            projectsByCategory={projectsByCategory}
            activeId={activeId}
            onProjectClick={onProjectClick}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
        />
        <FilteredBadges
            search={search}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
            allTags={allTags}
        />
      </div>
    </aside>
  );
}

export const SearchInput = ({ search, handleSearch }: SearchInputProps) => {
  return (
    <div id="sidebar-search" className={SIDEBAR_STYLES.search.wrapper}>
      <Search className={SIDEBAR_STYLES.search.icon} />
      <Input
        id="sidebar-search-input"
        type="text"
        placeholder="Search projects..."
        value={search}
        onChange={handleSearch}
        className={SIDEBAR_STYLES.search.input}
      />
    </div>
  )
}

export function Tags ({ clearFilters, tags, toggleTag }: TagsProps) {
  const hasSelectedTags = tags.length > 0;
  if (!hasSelectedTags) return null;
  return (
    <div id="sidebar-selected-tags" className={SIDEBAR_STYLES.tags.wrapper}>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="default"
          className={SIDEBAR_STYLES.tags.badge}
          onClick={() => toggleTag(tag)}
        >
          {tag}
          <X className={SIDEBAR_STYLES.tags.closeIcon} />
        </Badge>
      ))}
      <Button
        onClick={clearFilters}
        className={SIDEBAR_STYLES.tags.clearButton}
      >
        Clear all
      </Button>
    </div>
  )
}

export const FilteredTagText = ({ search, selectedTags, filteredProjects }: FilteredTagTextProps) => {
  const hasFilters = search || selectedTags.length > 0;
  if (!hasFilters) return null;
  return (
    <p id="sidebar-filter-count" className={SIDEBAR_STYLES.filterCount}>
      {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
    </p>
  )
}

export const FilteredBadges = ({ search, selectedTags, toggleTag, allTags }: FilteredBadgesProps) => {
  const hasFilters = search || selectedTags.length > 0;
  if (!hasFilters) return null;
  return (
    <div id="sidebar-filter-badges" className={SIDEBAR_STYLES.filterBadges.wrapper}>
      <h3 id="sidebar-filter-badges-title" className={SIDEBAR_STYLES.filterBadges.title}>
        Filter by tag
      </h3>
      <div id="sidebar-filter-badges-list" className={SIDEBAR_STYLES.filterBadges.list}>
        {allTags.slice(0, 12).map((tag) => (
          <Badge
              key={tag}
              variant="outline"
              className={cn(
                SIDEBAR_STYLES.filterBadges.badge,
                selectedTags.includes(tag) && SIDEBAR_STYLES.filterBadges.badgeActive
              )}
              onClick={() => toggleTag(tag)}
          >
              {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export const BadgeNav = ({ projectsByCategory, activeId, onProjectClick, selectedTags, toggleTag }: BadgeNavProps) => {
  const hasProjectsByCategory = projectsByCategory.length > 0;
  if (!hasProjectsByCategory) {
    return (
      <nav id="sidebar-nav" className={SIDEBAR_STYLES.nav.wrapper}>
        <p id="sidebar-nav-empty" className={SIDEBAR_STYLES.nav.empty}>No projects match your filters.</p>
      </nav>
    )
  }
  return (
    <nav id="sidebar-nav" className={SIDEBAR_STYLES.nav.wrapper}>
      {projectsByCategory.map((category) => (
        <CategorySection
          key={category.id}
          label={category.label}
          projects={category.projects}
          activeId={activeId}
          onProjectClick={onProjectClick}
          selectedTags={selectedTags}
          onTagClick={toggleTag}
        />
      ))}
    </nav>
  )
}

export const CategorySection = ({
  label,
  projects,
  activeId,
  onProjectClick,
  selectedTags,
  onTagClick,
}: CategorySectionProps) => {
  const categoryId = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div id={`sidebar-category-${categoryId}`} className={SIDEBAR_STYLES.category.wrapper}>
      <h2 id={`sidebar-category-${categoryId}-title`} className={SIDEBAR_STYLES.category.title}>
        {label}
      </h2>
      <div id={`sidebar-category-${categoryId}-list`} className={SIDEBAR_STYLES.category.list}>
        {projects.map((project) => (
          <Card
            key={project.id}
            project={project}
            isActive={activeId === project.id}
            onClick={() => onProjectClick(project.id)}
            selectedTags={selectedTags}
            onTagClick={onTagClick}
          />
        ))}
      </div>
    </div>
  )
}

export const trimWord = (wrd: String, srchWrd: String) => {
  const lwrSrchWrd = srchWrd.toLowerCase();
  return wrd.toLowerCase().includes(lwrSrchWrd);
}
