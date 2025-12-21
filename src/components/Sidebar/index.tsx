import { useMemo, useState, type ChangeEvent } from 'react';
import { projects, categories } from '@/data/projects';
import { Card } from '@/components/Sidebar/Card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
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
    <aside className="lg:sticky lg:top-4 lg:self-start text-foreground">
      <div className="border border-foreground rounded-[2rem] p-6">
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
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search projects..."
        value={search}
        onChange={handleSearch}
        className="pl-9 border-foreground"
      />
    </div>
  )
}

export function Tags ({ clearFilters, tags, toggleTag }: TagsProps) {
  const hasSelectedTags = tags.length > 0;
  if (!hasSelectedTags) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag) => (
        <Badge
        key={tag}
        variant="default"
        className="cursor-pointer"
        onClick={() => toggleTag(tag)}
        >
        {tag}
        <X className="w-3 h-3 ml-1" />
        </Badge>
      ))}
      <Button
        onClick={clearFilters}
        className="text-sm text-muted-foreground hover:text-foreground hover:underline"
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
    <p className="text-sm text-muted-foreground mb-6">
      {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
    </p>
  )
}

export const FilteredBadges = ({ search, selectedTags, toggleTag, allTags }: FilteredBadgesProps) => {
  const hasFilters = search || selectedTags.length > 0;
  if (!hasFilters) return null;
  return (
    <div className="mt-8 pt-6 border-t border-foreground">
      <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
        Filter by tag
      </h3>
      <div className="flex flex-wrap gap-2">
        {allTags.slice(0, 12).map((tag) => (
          <Badge
              key={tag}
              variant="outline"
              className={cn(
              'cursor-pointer border-foreground',
              selectedTags.includes(tag) && 'bg-primary text-primary-foreground'
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
      <nav className="space-y-8">
        <p className="text-base text-muted-foreground">No projects match your filters.</p>
      </nav>
    )
  }
  return (
    <nav className="space-y-8">
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
  return (
    <div>
      <h2 className="text-base font-black uppercase tracking-wider text-foreground mb-4">
        {label}
      </h2>
      <div className="space-y-2">
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
