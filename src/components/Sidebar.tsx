import { useMemo, useState } from 'react';
import { projects, categories } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

interface SidebarProps {
  activeId: string | null;
  onProjectClick: (id: string) => void;
}

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
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(searchLower) ||
        p.tagline.toLowerCase().includes(searchLower) ||
        p.tags.some((t) => t.toLowerCase().includes(searchLower));

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

  const hasFilters = search || selectedTags.length > 0;

  return (
    <aside className="lg:sticky lg:top-4 lg:self-start">
      <div className="border border-border rounded-2xl p-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-transparent"
          />
        </div>

        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="default"
                className="cursor-pointer text-xs"
                onClick={() => toggleTag(tag)}
              >
                {tag}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
            <button
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </button>
          </div>
        )}

        {hasFilters && (
          <p className="text-xs text-muted-foreground mb-4">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
          </p>
        )}

        <nav className="space-y-6">
          {projectsByCategory.length > 0 ? (
            projectsByCategory.map((category) => (
              <CategorySection
                key={category.id}
                label={category.label}
                projects={category.projects}
                activeId={activeId}
                onProjectClick={onProjectClick}
                selectedTags={selectedTags}
                onTagClick={toggleTag}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No projects match your filters.</p>
          )}
        </nav>

        {!hasFilters && (
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Filter by tag
            </h3>
            <div className="flex flex-wrap gap-1">
              {allTags.slice(0, 12).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={cn(
                    'cursor-pointer text-xs',
                    selectedTags.includes(tag) && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

interface CategorySectionProps {
  label: string;
  projects: typeof projects;
  activeId: string | null;
  onProjectClick: (id: string) => void;
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

function CategorySection({
  label,
  projects,
  activeId,
  onProjectClick,
  selectedTags,
  onTagClick,
}: CategorySectionProps) {
  return (
    <div>
      <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
        {label}
      </h2>
      <div className="space-y-2">
        {projects.map((project) => (
          <ProjectCard
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
  );
}
