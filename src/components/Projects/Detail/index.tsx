import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Check, Github, ExternalLink } from 'lucide-react';
import { DETAIL_STYLES } from './constants';
import type {
  ProjectDetailProps,
  HeaderProps,
  HighlightsProps,
  TagsProps,
  LinksProps,
} from '../types';

export function Detail({ project }: ProjectDetailProps) {
  return (
    <section id={project.id} className={DETAIL_STYLES.section}>
      <div id={`${project.id}-content`} className={DETAIL_STYLES.content}>
        <Header project={project} />
        <p id={`${project.id}-description`} className={DETAIL_STYLES.description}>{project.description}</p>
        {project.highlights && project.highlights.length > 0 && (
          <Highlights projectId={project.id} highlights={project.highlights} />
        )}
        <Tags projectId={project.id} tags={project.tags} />
        <Links project={project} />
      </div>
    </section>
  );
}

export function Header({ project }: HeaderProps) {
  return (
    <header id={`${project.id}-header`} className={DETAIL_STYLES.header.wrapper}>
      <div id={`${project.id}-header-title-row`} className={DETAIL_STYLES.header.titleRow}>
        <h2 id={`${project.id}-title`} className={DETAIL_STYLES.header.title}>{project.title}</h2>
        {project.stars && (
          <span id={`${project.id}-stars`} className={DETAIL_STYLES.header.stars}>
            <Star className={DETAIL_STYLES.header.starsIcon} />
            {project.stars.toLocaleString()}
          </span>
        )}
      </div>
      <p id={`${project.id}-tagline`} className={DETAIL_STYLES.header.tagline}>{project.tagline}</p>
    </header>
  );
}

function Highlights({ projectId, highlights }: HighlightsProps) {
  return (
    <div id={`${projectId}-highlights`} className={DETAIL_STYLES.highlights.wrapper}>
      <h3 id={`${projectId}-highlights-title`} className={DETAIL_STYLES.highlights.title}>
        Highlights
      </h3>
      <ul id={`${projectId}-highlights-list`} className={DETAIL_STYLES.highlights.list}>
        {highlights.map((highlight, index) => (
          <li key={index} id={`${projectId}-highlight-${index}`} className={DETAIL_STYLES.highlights.item}>
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Tags({ projectId, tags }: TagsProps) {
  return (
    <div id={`${projectId}-tags`} className={DETAIL_STYLES.tags.wrapper}>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={'default'}
          className={DETAIL_STYLES.tags.badge}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

export function Links({ project }: LinksProps) {
  const hasLinks = project.github || project.npm || project.website;
  if (!hasLinks) return null;

  return (
    <div id={`${project.id}-links`} className={DETAIL_STYLES.links.wrapper}>
      {project.github && (
        <Button variant="link" asChild className={DETAIL_STYLES.links.button}>
          <a id={`${project.id}-link-github`} href={project.github} target="_blank" rel="noopener noreferrer">
            <Github className={DETAIL_STYLES.links.icon} />
            GitHub
          </a>
        </Button>
      )}
      {project.npm && (
        <Button variant="link" asChild className={DETAIL_STYLES.links.button}>
          <a id={`${project.id}-link-npm`} href={project.npm} target="_blank" rel="noopener noreferrer">
            <NpmIcon />
            npm
          </a>
        </Button>
      )}
      {project.website && (
        <Button variant="link" asChild className={DETAIL_STYLES.links.button}>
          <a id={`${project.id}-link-website`} href={project.website} target="_blank" rel="noopener noreferrer">
            <ExternalLink className={DETAIL_STYLES.links.icon} />
            Website
          </a>
        </Button>
      )}
    </div>
  );
}

export function NpmIcon() {
  return (
    <svg className={DETAIL_STYLES.links.icon} fill="currentColor" viewBox="0 0 24 24">
      <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
    </svg>
  );
}
