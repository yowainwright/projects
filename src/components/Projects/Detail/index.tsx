import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarLink } from '@/components/StarLink';
import { EditableContent } from '@/components/EditableContent';
import { Comments } from '@/components/Comments';
import { MDXContent } from '@/components/MDXContent';
import { useAuth } from '@/hooks/useAuth';
import { useInView } from '@/hooks/useInView';
import { Github, ExternalLink, Plus, X } from 'lucide-react';
import { getGitHubRepos } from '@/data/utils';
import { DETAIL_STYLES, ANIMATION_CLASSES } from './constants';
import type {
  ProjectDetailProps,
  HeaderProps,
  HighlightsProps,
  TagsProps,
  LinksProps,
} from '../types';

export function Detail({ project, selectedTags, onTagClick, onTitleClick, onFieldChange, getEditedValue }: ProjectDetailProps) {
  const { ref, hasEntered } = useInView<HTMLElement>({ threshold: 0.05 });

  const description = getEditedValue
    ? getEditedValue(project.id, 'description', project.description)
    : project.description;

  const content = getEditedValue
    ? getEditedValue(project.id, 'content', project.content ?? '')
    : (project.content ?? '');

  const handleDescriptionChange = (value: string) => {
    if (onFieldChange) {
      onFieldChange(project.id, 'description', value);
    }
  };

  const handleContentChange = (value: string) => {
    if (onFieldChange) {
      onFieldChange(project.id, 'content', value);
    }
  };

  const hasContent = content.trim().length > 0;
  const animationClass = hasEntered ? ANIMATION_CLASSES.visible : ANIMATION_CLASSES.hidden;

  return (
    <section ref={ref} id={project.id} className={`${DETAIL_STYLES.section} ${animationClass}`}>
      <div id={`${project.id}-content`} className={DETAIL_STYLES.content}>
        <Header project={project} onTitleClick={onTitleClick} onFieldChange={onFieldChange} getEditedValue={getEditedValue} />
        <Links project={project} />
        <EditableContent
          value={description}
          onChange={handleDescriptionChange}
          as="p"
          className={DETAIL_STYLES.description}
          placeholder="Add a description..."
        />
        {(project.highlights && project.highlights.length > 0) && (
          <Highlights
            projectId={project.id}
            highlights={getEditedValue ? getEditedValue(project.id, 'highlights', project.highlights) : project.highlights}
            onFieldChange={onFieldChange}
          />
        )}
        <ContentSection
          content={content}
          hasContent={hasContent}
          onChange={handleContentChange}
        />
        <Tags projectId={project.id} tags={project.tags} selectedTags={selectedTags} onTagClick={onTagClick} />
        <Comments projectId={project.id} />
      </div>
    </section>
  );
}

export function Header({ project, onTitleClick, onFieldChange, getEditedValue }: HeaderProps) {
  const tagline = getEditedValue
    ? getEditedValue(project.id, 'tagline', project.tagline)
    : project.tagline;

  const handleTaglineChange = (value: string) => {
    if (onFieldChange) {
      onFieldChange(project.id, 'tagline', value);
    }
  };

  return (
    <header id={`${project.id}-header`} className={DETAIL_STYLES.header.wrapper}>
      <div id={`${project.id}-header-title-row`} className={DETAIL_STYLES.header.titleRow}>
        <h2
          id={`${project.id}-title`}
          className={`${DETAIL_STYLES.header.title} cursor-pointer`}
          onClick={() => onTitleClick(project.id)}
        >
          {project.title}
        </h2>
        <StarLink
          id={`${project.id}-stars`}
          project={project}
          className={DETAIL_STYLES.header.stars}
          iconClassName={DETAIL_STYLES.header.starsIcon}
        />
      </div>
      <EditableContent
        value={tagline}
        onChange={handleTaglineChange}
        as="p"
        className={DETAIL_STYLES.header.tagline}
        placeholder="Add a tagline..."
      />
    </header>
  );
}

interface ContentSectionProps {
  content: string;
  hasContent: boolean;
  onChange: (value: string) => void;
}

function ContentSection({ content, hasContent, onChange }: ContentSectionProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <EditableContent
        value={content}
        onChange={onChange}
        as="div"
        className="mt-4 prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap"
        placeholder="Add additional content (supports markdown)..."
      />
    );
  }

  if (!hasContent) {
    return null;
  }

  return <MDXContent content={content} className="mt-4" />;
}

function Highlights({ projectId, highlights, onFieldChange }: HighlightsProps) {
  const { isAuthenticated } = useAuth();

  const handleHighlightChange = (index: number, value: string) => {
    if (!onFieldChange) return;
    const updated = [...highlights];
    updated[index] = value;
    onFieldChange(projectId, 'highlights', updated);
  };

  const handleAddHighlight = () => {
    if (!onFieldChange) return;
    onFieldChange(projectId, 'highlights', [...highlights, '']);
  };

  const handleRemoveHighlight = (index: number) => {
    if (!onFieldChange) return;
    const updated = highlights.filter((_, i) => i !== index);
    onFieldChange(projectId, 'highlights', updated);
  };

  if (isAuthenticated) {
    return (
      <div id={`${projectId}-highlights`} className={DETAIL_STYLES.highlights.wrapper}>
        <h3 id={`${projectId}-highlights-title`} className={DETAIL_STYLES.highlights.title}>
          Highlights
        </h3>
        <ul id={`${projectId}-highlights-list`} className={DETAIL_STYLES.highlights.list}>
          {highlights.map((highlight, index) => (
            <li key={index} id={`${projectId}-highlight-${index}`} className={`${DETAIL_STYLES.highlights.item} flex items-center gap-2`}>
              <EditableContent
                value={highlight}
                onChange={(value) => handleHighlightChange(index, value)}
                as="span"
                className={`${DETAIL_STYLES.highlights.item} flex-1`}
                placeholder="Add highlight..."
              />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleRemoveHighlight(index)}
                className="text-muted-foreground hover:text-red-500"
                title="Remove highlight"
              >
                <X className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
        <Button
          variant="ghost"
          onClick={handleAddHighlight}
          className="text-muted-foreground hover:text-foreground mt-2"
          title="Add highlight"
        >
          <Plus className="size-4" />
          Add highlight
        </Button>
      </div>
    );
  }

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

export function Tags({ projectId, tags, selectedTags, onTagClick }: TagsProps) {
  return (
    <div id={`${projectId}-tags`} className={DETAIL_STYLES.tags.wrapper}>
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <Badge
            key={tag}
            variant="outline"
            className={`${DETAIL_STYLES.tags.badge} ${isSelected ? DETAIL_STYLES.tags.badgeActive : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onTagClick(tag);
            }}
          >
            {tag}
          </Badge>
        );
      })}
    </div>
  );
}

function extractRepoName(url: string, includeOrg: boolean): string {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  const isNoMatch = !match;
  if (isNoMatch) return 'GitHub';

  const [, org, repo] = match;
  const fullName = `${org}/${repo}`;
  return includeOrg ? fullName : repo;
}

function extractNpmPackageName(url: string, includeOrg: boolean): string {
  const match = url.match(/npmjs\.com\/package\/(.+)/);
  const isNoMatch = !match;
  if (isNoMatch) return 'npm';

  const packageName = match[1];
  const hasScope = packageName.startsWith('@');
  const shouldStripScope = !includeOrg && hasScope;

  if (shouldStripScope) {
    const scopedMatch = packageName.match(/@[^/]+\/(.+)/);
    const strippedName = scopedMatch ? scopedMatch[1] : packageName;
    return strippedName;
  }

  return packageName;
}

export function Links({ project }: LinksProps) {
  const githubRepos = getGitHubRepos(project);
  const hasGithub = githubRepos.length > 0;
  const hasNpm = Boolean(project.npm);
  const hasWebsite = Boolean(project.website);
  const hasLinks = hasGithub || hasNpm || hasWebsite;
  const hasFork = githubRepos.length > 1;

  if (!hasLinks) return null;

  return (
    <div id={`${project.id}-links`} className={DETAIL_STYLES.links.wrapper}>
      {githubRepos.map((repo, index) => {
        const repoName = extractRepoName(repo.url, hasFork);
        return (
          <Badge key={repo.url} asChild className={DETAIL_STYLES.links.badge}>
            <a
              id={`${project.id}-link-github-${index}`}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className={DETAIL_STYLES.links.icon} />
              {repoName}
            </a>
          </Badge>
        );
      })}
      {hasNpm && (
        <Badge asChild className={DETAIL_STYLES.links.badge}>
          <a id={`${project.id}-link-npm`} href={project.npm} target="_blank" rel="noopener noreferrer">
            <NpmIcon />
            {extractNpmPackageName(project.npm!, hasFork)}
          </a>
        </Badge>
      )}
      {hasWebsite && (
        <Badge asChild className={DETAIL_STYLES.links.badge}>
          <a id={`${project.id}-link-website`} href={project.website} target="_blank" rel="noopener noreferrer">
            <ExternalLink className={DETAIL_STYLES.links.icon} />
            Website
          </a>
        </Badge>
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
