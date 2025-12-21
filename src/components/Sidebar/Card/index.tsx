import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { CardProps } from './types';
import { CARD_STYLES } from './constants';

export function Card({ project, isActive, onClick, selectedTags, onTagClick }: CardProps) {
  return (
    <button onClick={onClick} className="w-full text-left">
      <div
        className={cn(
          CARD_STYLES.base,
          CARD_STYLES.inactive,
          isActive && CARD_STYLES.active
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
