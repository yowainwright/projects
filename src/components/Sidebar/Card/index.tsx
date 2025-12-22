import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { CardProps } from './types';
import { CARD_STYLES } from './constants';

export function Card({ project, isActive, onClick, selectedTags, onTagClick }: CardProps) {
  return (
    <button id={`sidebar-card-${project.id}`} onClick={onClick} className={CARD_STYLES.button}>
      <div
        id={`sidebar-card-${project.id}-content`}
        className={cn(
          CARD_STYLES.content.base,
          CARD_STYLES.content.inactive,
          isActive && CARD_STYLES.content.active
        )}
      >
        <div id={`sidebar-card-${project.id}-header`} className={CARD_STYLES.header}>
          <h3 id={`sidebar-card-${project.id}-title`} className={CARD_STYLES.title}>{project.title}</h3>
          {project.stars && (
            <span id={`sidebar-card-${project.id}-stars`} className={CARD_STYLES.stars}>
              <Star className={CARD_STYLES.starsIcon} />
              {project.stars}
            </span>
          )}
        </div>
        <p id={`sidebar-card-${project.id}-tagline`} className={CARD_STYLES.tagline}>
          {project.tagline}
        </p>
        <div id={`sidebar-card-${project.id}-tags`} className={CARD_STYLES.tags.wrapper}>
          {project.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'secondary'}
              className={CARD_STYLES.tags.badge}
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
