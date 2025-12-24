import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import type { Project, GitHubRepo } from '@/data/projects-generated';

const contentDirectory = join(process.cwd(), 'content');

export interface ProjectFrontmatter {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'personal' | 'oss-contribution' | 'work';
  tags: string[];
  github?: string | GitHubRepo[];
  npm?: string;
  website?: string;
  stars?: number;
  highlights?: string[];
}

export interface ProjectContent {
  frontmatter: ProjectFrontmatter;
  content: string;
}

export function getProjectSlugs(): string[] {
  const files = readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getProjectBySlug(slug: string): ProjectContent {
  const fullPath = join(contentDirectory, `${slug}.mdx`);
  const fileContents = readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

export function getAllProjects(): ProjectContent[] {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => getProjectBySlug(slug));
}

export function projectContentToProject(projectContent: ProjectContent): Project {
  const { frontmatter } = projectContent;

  const normalizeGitHub = (github: string | GitHubRepo[] | undefined): string | GitHubRepo[] | undefined => {
    if (!github) return undefined;
    if (typeof github === 'string') return github;
    return github;
  };

  return {
    id: frontmatter.id,
    title: frontmatter.title,
    tagline: frontmatter.tagline,
    description: frontmatter.description,
    category: frontmatter.category,
    tags: frontmatter.tags,
    github: normalizeGitHub(frontmatter.github),
    npm: frontmatter.npm,
    website: frontmatter.website,
    stars: frontmatter.stars,
    highlights: frontmatter.highlights,
  };
}

export function getAllProjectsAsProjects(): Project[] {
  return getAllProjects().map(projectContentToProject);
}
