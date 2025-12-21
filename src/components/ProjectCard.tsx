import { cn } from '@/lib/utils';
import type { Project } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onClick: () => void;
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export function ProjectCard({ project, isActive, onClick, selectedTags, onTagClick }: ProjectCardProps) {
  return (
    <button onClick={onClick} className="w-full text-left">
      <div
        className={cn(
          'p-4 rounded-lg cursor-pointer transition-all duration-200 border',
          'border-border hover:border-foreground hover:border-2',
          isActive && 'border-foreground border-2'
        )}
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-medium text-base leading-tight">{project.title}</h3>
          {project.stars && (
            <span className="text-sm text-muted-foreground flex items-center gap-1 shrink-0">
              <Star className="w-3 h-3" />
              {project.stars}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {project.tagline}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'secondary'}
              className={cn(
                'cursor-pointer',
                'hover:bg-primary hover:text-primary-foreground'
              )}
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(tag);
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </button>
  );
}
