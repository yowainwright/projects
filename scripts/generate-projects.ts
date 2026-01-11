import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

interface GitHubRepo {
  url: string;
  stars?: number;
}

interface GradeIndex {
  [id: string]: { grade: { score: number } };
}

interface ProjectFrontmatter {
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

interface ProjectOutput extends ProjectFrontmatter {
  content: string;
}

function loadGradeIndex(path: string): GradeIndex {
  if (!existsSync(path)) return {};
  const content = readFileSync(path, 'utf-8');
  return JSON.parse(content);
}

function parseProject(file: string, contentDir: string): ProjectOutput {
  const fileContent = readFileSync(join(contentDir, file), 'utf-8');
  const { data, content } = matter(fileContent);
  const frontmatter = data as ProjectFrontmatter;
  return { ...frontmatter, content: content.trim() };
}

const CONTRIBUTION_ORDER = ['koa', 'postmate', 'lifecycle', 'jspm'];
const DEFAULT_ORDER = 999;

function getContributionOrder(id: string): number {
  const index = CONTRIBUTION_ORDER.indexOf(id);
  if (index === -1) return DEFAULT_ORDER;
  return index;
}

function sortContributions(contributions: ProjectOutput[]): ProjectOutput[] {
  return contributions.sort((a, b) => getContributionOrder(a.id) - getContributionOrder(b.id));
}

function getGradeScore(project: ProjectOutput, index: GradeIndex): number {
  const entry = index[project.id];
  if (!entry) return 0;
  return entry.grade.score;
}

function sortByGrade(projects: ProjectOutput[], index: GradeIndex): ProjectOutput[] {
  return projects.sort((a, b) => getGradeScore(b, index) - getGradeScore(a, index));
}

function loadAndParseProjects(contentDir: string): ProjectOutput[] {
  const allFiles = readdirSync(contentDir);
  const mdxFiles = allFiles.filter((f) => f.endsWith('.mdx'));
  return mdxFiles.map((file) => parseProject(file, contentDir));
}

function sortAllProjects(projects: ProjectOutput[], index: GradeIndex): ProjectOutput[] {
  const contributions = projects.filter((p) => p.category === 'oss-contribution');
  const personal = projects.filter((p) => p.category === 'personal');
  const sortedContributions = sortContributions(contributions);
  const sortedPersonal = sortByGrade(personal, index);
  return [...sortedContributions, ...sortedPersonal];
}

const TYPE_EXPORTS = `import type { Project } from './types';

export type {
  GitHubRepo,
  YearlyCommits,
  MonthlyCommits,
  Downloads,
  Activity,
  GradeData,
  HistoryEntry,
  CurrentMetrics,
  RepoHistoryEntry,
  RepoCurrentMetrics,
  RepoData,
  ProjectMetrics,
  Project,
} from './types';`;

const CATEGORIES_EXPORT = `export const categories = [
  { id: 'oss-contribution', label: 'Contributions' },
  { id: 'personal', label: 'Projects' },
] as const;`;

function buildOutput(sortedProjects: ProjectOutput[]): string {
  const projectsJson = JSON.stringify(sortedProjects, null, 2);
  const projectsExport = `export const projects: Project[] = ${projectsJson};`;
  return [TYPE_EXPORTS, '', projectsExport, '', CATEGORIES_EXPORT, ''].join('\n');
}

interface SearchItem {
  id: string;
  title: string;
  description: string;
  url: string;
}

function buildSearchData(projects: ProjectOutput[]): SearchItem[] {
  return projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.tagline,
    url: `#${p.id}`,
  }));
}

function generateProjects(): void {
  const contentDir = join(import.meta.dirname, '../content');
  const indexPath = join(import.meta.dirname, '../src/data/metrics-index.json');
  const outputPath = join(import.meta.dirname, '../src/data/projects-generated.ts');
  const searchOutputPath = join(import.meta.dirname, '../public/search-data.json');

  const gradeIndex = loadGradeIndex(indexPath);
  const projects = loadAndParseProjects(contentDir);
  const sortedProjects = sortAllProjects(projects, gradeIndex);
  const output = buildOutput(sortedProjects);

  writeFileSync(outputPath, output);
  console.log(`Generated ${sortedProjects.length} projects → ${outputPath}`);

  const searchData = buildSearchData(sortedProjects);
  writeFileSync(searchOutputPath, JSON.stringify(searchData, null, 2));
  console.log(`Generated search data → ${searchOutputPath}`);
}

generateProjects();
