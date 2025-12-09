import type { Project } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Check, Github, ExternalLink } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <section id={project.id} className="py-16 border-b border-border last:border-b-0">
      <div className="space-y-6">
        <ProjectHeader project={project} />
        <p className="text-muted-foreground leading-relaxed">{project.description}</p>
        {project.highlights && project.highlights.length > 0 && (
          <ProjectHighlights highlights={project.highlights} />
        )}
        <ProjectTags tags={project.tags} />
        <ProjectLinks project={project} />
      </div>
    </section>
  );
}

function ProjectHeader({ project }: { project: Project }) {
  return (
    <header>
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-3xl font-bold">{project.title}</h2>
        {project.stars && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Star className="w-3 h-3" />
            {project.stars.toLocaleString()}
          </span>
        )}
      </div>
      <p className="text-lg text-muted-foreground">{project.tagline}</p>
    </header>
  );
}

function ProjectHighlights({ highlights }: { highlights: string[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Highlights
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <Check className="w-3 h-3 text-primary mt-0.5 shrink-0" />
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectTags({ tags }: { tags: string[] }) {
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

function ProjectLinks({ project }: { project: Project }) {
  const hasLinks = project.github || project.npm || project.website;
  if (!hasLinks) return null;

  return (
    <div className="flex flex-wrap gap-3 pt-2">
      {project.github && (
        <Button variant="outline" asChild>
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </Button>
      )}
      {project.npm && (
        <Button variant="outline" asChild>
          <a href={project.npm} target="_blank" rel="noopener noreferrer">
            <NpmIcon />
            npm
          </a>
        </Button>
      )}
      {project.website && (
        <Button variant="outline" asChild>
          <a href={project.website} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
            Website
          </a>
        </Button>
      )}
    </div>
  );
}

function NpmIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
    </svg>
  );
}
