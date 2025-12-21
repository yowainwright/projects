import type { Project } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Check, Github, ExternalLink } from 'lucide-react';
import { ProjectDetailProps } from '../types';

export function Detail({ project }: ProjectDetailProps) {
  return (
    <section id={project.id} className="py-16 border-t border-foreground first:border-t-0">
      <div className="space-y-8">
        <Header project={project} />
        <p className="text-lg font-light leading-loose">{project.description}</p>
        {project.highlights && project.highlights.length > 0 && (
          <Highlights highlights={project.highlights} />
        )}
        <Tags tags={project.tags} />
        <Links project={project} />
      </div>
    </section>
  );
}

export function Header({ project }: { project: Project }) {
  return (
    <header>
      <div className="flex items-center gap-3 mb-1">
        <h2 className="text-2xl font-black leading-tight">{project.title}</h2>
        {project.stars && (
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Star className="w-3.5 h-3.5" />
            {project.stars.toLocaleString()}
          </span>
        )}
      </div>
      <p className="text-lg text-muted-foreground font-light">{project.tagline}</p>
    </header>
  );
}

function Highlights({ highlights }: { highlights: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
        Highlights
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-2 text-base font-light text-muted-foreground">
            <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}

export export function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

export function Links({ project }: { project: Project }) {
  const hasLinks = project.github || project.npm || project.website;
  if (!hasLinks) return null;

  return (
    <div className="flex flex-wrap gap-4 pt-2">
      {project.github && (
        <Button variant="link" asChild className="px-0 text-base">
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </Button>
      )}
      {project.npm && (
        <Button variant="link" asChild className="px-0 text-base">
          <a href={project.npm} target="_blank" rel="noopener noreferrer">
            <NpmIcon />
            npm
          </a>
        </Button>
      )}
      {project.website && (
        <Button variant="link" asChild className="px-0 text-base">
          <a href={project.website} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
            Website
          </a>
        </Button>
      )}
    </div>
  );
}

export function NpmIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
    </svg>
  );
}
