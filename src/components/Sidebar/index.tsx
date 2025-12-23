import { forwardRef, useEffect, useRef } from 'react';
import { Card } from '@/components/Sidebar/Card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { SIDEBAR_STYLES } from './constants';
import type {
  CategorySectionProps,
  SidebarProps,
  TagsProps,
  SearchInputProps,
  FilteredTagTextProps,
  BadgeNavProps,
} from './types';

export function Sidebar({
  activeId,
  onProjectClick,
  search,
  handleSearch,
  selectedTags,
  toggleTag,
  clearFilters,
  filteredProjects,
  projectsByCategory,
}: SidebarProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!activeId || !navRef.current) return;
    const activeCard = document.getElementById(`sidebar-card-${activeId}`);
    if (!activeCard) return;

    const nav = navRef.current;
    const navRect = nav.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();

    const cardTop = cardRect.top - navRect.top;
    const cardBottom = cardRect.bottom - navRect.top;
    const isAboveView = cardTop < 0;
    const isBelowView = cardBottom > navRect.height;

    if (!isAboveView && !isBelowView) return;

    const categorySection = activeCard.closest('[id^="sidebar-category-"]') as HTMLElement | null;
    const categoryTitle = categorySection?.querySelector('h2');
    const titleHeight = categoryTitle?.offsetHeight || 0;
    const scrollOffset = cardRect.top - navRect.top + nav.scrollTop - titleHeight - 32;
    nav.scrollTo({ top: Math.max(0, scrollOffset), behavior: 'smooth' });
  }, [activeId]);

  return (
    <aside id="sidebar" className={SIDEBAR_STYLES.aside}>
      <div id="sidebar-container" className={SIDEBAR_STYLES.container}>
        <SearchInput search={search} handleSearch={handleSearch} />
        <div id="sidebar-content" className="sidebar-content hidden lg:block">
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
              ref={navRef}
              projectsByCategory={projectsByCategory}
              activeId={activeId}
              onProjectClick={onProjectClick}
              selectedTags={selectedTags}
              toggleTag={toggleTag}
          />
        </div>
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

export const BadgeNav = forwardRef<HTMLElement, BadgeNavProps>(
  ({ projectsByCategory, activeId, onProjectClick, selectedTags, toggleTag }, ref) => {
    const hasProjectsByCategory = projectsByCategory.length > 0;
    if (!hasProjectsByCategory) {
      return (
        <nav ref={ref} id="sidebar-nav" className={SIDEBAR_STYLES.nav.wrapper}>
          <p id="sidebar-nav-empty" className={SIDEBAR_STYLES.nav.empty}>No projects match your filters.</p>
        </nav>
      )
    }
    return (
      <nav ref={ref} id="sidebar-nav" className={SIDEBAR_STYLES.nav.wrapper}>
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
)

export const CategorySection = ({
  label,
  projects,
  activeId,
  onProjectClick,
  selectedTags,
  onTagClick,
}: CategorySectionProps) => {
  const categoryId = label.toLowerCase().replace(/\s+/g, '-');
  const sortedProjects = projects;
  return (
    <div id={`sidebar-category-${categoryId}`} className={SIDEBAR_STYLES.category.wrapper}>
      <h2 id={`sidebar-category-${categoryId}-title`} className={SIDEBAR_STYLES.category.title}>
        {label}
      </h2>
      <div id={`sidebar-category-${categoryId}-list`} className={SIDEBAR_STYLES.category.list}>
        {sortedProjects.map((project) => (
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

