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
  SearchInputProps,
  BadgeNavProps,
} from './types';

const SCROLL_OFFSET = 32;
const TITLE_HEIGHT_CACHE = new Map<string, number>();

function useAutoScrollToActive(activeId: string | null, navRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!activeId || !navRef.current) return;

    const activeCard = document.getElementById(`sidebar-card-${activeId}`);
    if (!activeCard) return;

    const nav = navRef.current;
    const navRect = nav.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();

    const cardTop = cardRect.top - navRect.top;
    const cardBottom = cardRect.bottom - navRect.top;
    const isInView = cardTop >= 0 && cardBottom <= navRect.height;
    if (isInView) return;

    const categorySection = activeCard.closest('[id^="sidebar-category-"]') as HTMLElement | null;
    const categoryId = categorySection?.id ?? '';

    let titleHeight = TITLE_HEIGHT_CACHE.get(categoryId);
    if (titleHeight === undefined) {
      const categoryTitle = categorySection?.querySelector('h2');
      titleHeight = categoryTitle?.offsetHeight ?? 0;
      if (categoryId) TITLE_HEIGHT_CACHE.set(categoryId, titleHeight);
    }

    const scrollOffset = cardRect.top - navRect.top + nav.scrollTop - titleHeight - SCROLL_OFFSET;
    nav.scrollTo({ top: Math.max(0, scrollOffset), behavior: 'smooth' });
  }, [activeId, navRef]);
}

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
  useAutoScrollToActive(activeId, navRef);

  return (
    <aside id="sidebar" className={SIDEBAR_STYLES.aside}>
      <div id="sidebar-container" className={SIDEBAR_STYLES.container}>
        <SearchInput search={search} handleSearch={handleSearch} />
        <div id="sidebar-content" className="sidebar-content hidden lg:block">
          <SelectedTags
            tags={selectedTags}
            onTagRemove={toggleTag}
            onClearAll={clearFilters}
          />
          <FilterCount
            search={search}
            selectedTags={selectedTags}
            count={filteredProjects.length}
          />
          <CategoryNav
            ref={navRef}
            categories={projectsByCategory}
            activeId={activeId}
            onProjectClick={onProjectClick}
            selectedTags={selectedTags}
            onTagClick={toggleTag}
          />
        </div>
      </div>
    </aside>
  );
}

export function SearchInput({ search, handleSearch }: SearchInputProps) {
  return (
    <search id="sidebar-search" className={SIDEBAR_STYLES.search.wrapper}>
      <Search className={SIDEBAR_STYLES.search.icon} />
      <Input
        id="sidebar-search-input"
        type="text"
        placeholder="Search projects..."
        value={search}
        onChange={handleSearch}
        className={SIDEBAR_STYLES.search.input}
      />
    </search>
  );
}

interface SelectedTagsProps {
  tags: string[];
  onTagRemove: (tag: string) => void;
  onClearAll: () => void;
}

export function SelectedTags({ tags, onTagRemove, onClearAll }: SelectedTagsProps) {
  if (tags.length === 0) return null;

  return (
    <ul id="sidebar-selected-tags" className={SIDEBAR_STYLES.tags.wrapper} role="list">
      {tags.map((tag) => (
        <li key={tag}>
          <Badge
            variant="default"
            className={SIDEBAR_STYLES.tags.badge}
            onClick={() => onTagRemove(tag)}
          >
            {tag}
            <X className={SIDEBAR_STYLES.tags.closeIcon} />
          </Badge>
        </li>
      ))}
      <li>
        <Button onClick={onClearAll} className={SIDEBAR_STYLES.tags.clearButton}>
          Clear all
        </Button>
      </li>
    </ul>
  );
}

interface FilterCountProps {
  search: string;
  selectedTags: string[];
  count: number;
}

export function FilterCount({ search, selectedTags, count }: FilterCountProps) {
  const hasFilters = search || selectedTags.length > 0;
  if (!hasFilters) return null;

  const label = count === 1 ? 'project' : 'projects';

  return (
    <p id="sidebar-filter-count" className={SIDEBAR_STYLES.filterCount}>
      {count} {label} found
    </p>
  );
}

interface CategoryNavProps extends BadgeNavProps {
  categories: BadgeNavProps['projectsByCategory'];
}

export const CategoryNav = forwardRef<HTMLElement, CategoryNavProps>(
  function CategoryNav({ categories, activeId, onProjectClick, selectedTags, onTagClick }, ref) {
    if (categories.length === 0) {
      return (
        <nav ref={ref} id="sidebar-nav" className={SIDEBAR_STYLES.nav.wrapper} aria-label="Projects">
          <p id="sidebar-nav-empty" className={SIDEBAR_STYLES.nav.empty}>
            No projects match your filters.
          </p>
        </nav>
      );
    }

    return (
      <nav ref={ref} id="sidebar-nav" className={SIDEBAR_STYLES.nav.wrapper} aria-label="Projects">
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            label={category.label}
            projects={category.projects}
            activeId={activeId}
            onProjectClick={onProjectClick}
            selectedTags={selectedTags}
            onTagClick={onTagClick}
          />
        ))}
      </nav>
    );
  }
);

export function CategorySection({
  label,
  projects,
  activeId,
  onProjectClick,
  selectedTags,
  onTagClick,
}: CategorySectionProps) {
  const categoryId = label.toLowerCase().replace(/\s+/g, '-');
  const sectionId = `sidebar-category-${categoryId}`;
  const titleId = `${sectionId}-title`;
  const listId = `${sectionId}-list`;

  return (
    <section id={sectionId} className={SIDEBAR_STYLES.category.wrapper} aria-labelledby={titleId}>
      <header className={SIDEBAR_STYLES.category.header}>
        <h2 id={titleId} className={SIDEBAR_STYLES.category.title}>
          {label}
        </h2>
      </header>
      <ul id={listId} className={SIDEBAR_STYLES.category.list} role="list">
        {projects.map((project) => {
          const isActive = activeId === project.id;
          const handleClick = () => onProjectClick(project.id);

          return (
            <li key={project.id}>
              <Card
                project={project}
                isActive={isActive}
                onClick={handleClick}
                selectedTags={selectedTags}
                onTagClick={onTagClick}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
