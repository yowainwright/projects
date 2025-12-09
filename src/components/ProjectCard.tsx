import { cn } from '@/lib/utils';
import type { Project } from '@/data/projects';
import { Card } from '@/components/ui/card';
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
      <Card
        className={cn(
          'p-4 py-4 gap-2 cursor-pointer transition-all duration-200 bg-transparent border-transparent shadow-none',
          'hover:border-border',
          isActive && 'border-primary'
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm">{project.title}</h3>
          {project.stars && (
            <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
              <Star className="w-3 h-3" />
              {project.stars}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {project.tagline}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'secondary'}
              className={cn(
                'text-[10px] px-1.5 py-0 cursor-pointer',
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
      </Card>
    </button>
  );
}
