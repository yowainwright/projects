import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { projects } from '../src/data/projects-generated';
import type { GitHubRepo, Project, ProjectMetrics, RepoData } from '../src/data/types';
import { StaticApp, type StaticProjectRecord } from '../src/static/StaticApp';

const PROJECT_ROOT = join(import.meta.dirname, '..');
const DIST_DIRECTORY = join(PROJECT_ROOT, 'dist');
const INDEX_PATH = join(DIST_DIRECTORY, 'index.html');
const METRICS_DIRECTORY = join(DIST_DIRECTORY, 'metrics');
const SITE_URL = process.env.SITE_URL || 'https://yowainwright.github.io/projects/';
const OPEN_ANGLE = String.fromCharCode(60);
const CLOSE_ANGLE = String.fromCharCode(62);
const ROOT_OPEN = OPEN_ANGLE + 'div id="root"' + CLOSE_ANGLE;
const ROOT_CLOSE = OPEN_ANGLE + '/div' + CLOSE_ANGLE;
const ROOT_MARKER = ROOT_OPEN + ROOT_CLOSE;

function buildRecords(): StaticProjectRecord[] {
  return projects.map((project) => ({ project }));
}

function getPrimaryUrl(project: Project): string {
  if (project.website) return project.website;
  if (typeof project.github === 'string') return project.github;
  if (!project.github) return `${SITE_URL}#${project.id}`;
  const primaryRepo = project.github[0];
  if (!primaryRepo) return `${SITE_URL}#${project.id}`;
  return primaryRepo.url;
}

function buildStructuredProject(project: Project, position: number) {
  const projectUrl = `${SITE_URL}#${project.id}`;
  const item = {
    '@type': 'SoftwareSourceCode',
    '@id': projectUrl,
    name: project.title,
    description: project.description,
    url: getPrimaryUrl(project),
    keywords: project.tags.join(', '),
  };
  return { '@type': 'ListItem', position, url: projectUrl, item };
}

function buildStructuredData(records: StaticProjectRecord[]) {
  const itemListElement = records.map(({ project }, index) => {
    return buildStructuredProject(project, index + 1);
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Jeff Wainwright open source projects',
    url: SITE_URL,
    itemListElement,
  };
}

function serializeStructuredData(records: StaticProjectRecord[]): string {
  const data = JSON.stringify(buildStructuredData(records));
  return data.replaceAll(OPEN_ANGLE, '\\u003c');
}

function injectStaticContent(template: string, markup: string): string {
  if (!template.includes(ROOT_MARKER)) throw new Error('Static root marker not found');
  const root = ROOT_OPEN + markup + ROOT_CLOSE;
  return template.replace(ROOT_MARKER, root);
}

function injectStructuredData(html: string, records: StaticProjectRecord[]): string {
  const data = serializeStructuredData(records);
  const scriptOpen = OPEN_ANGLE + 'script type="application/ld+json"' + CLOSE_ANGLE;
  const scriptClose = OPEN_ANGLE + '/script' + CLOSE_ANGLE;
  const headClose = OPEN_ANGLE + '/head' + CLOSE_ANGLE;
  const script = scriptOpen + data + scriptClose;
  return html.replace(headClose, '    ' + script + '\n  ' + headClose);
}

function buildCatalogRecord({ project }: StaticProjectRecord) {
  const url = `${SITE_URL}#${project.id}`;
  return { ...project, url };
}

function getGitHubUrls(project: Project): string[] {
  if (!project.github) return [];
  if (typeof project.github === 'string') return [project.github];
  return project.github.map(({ url }) => url);
}

function getGitHubRepos(project: Project): GitHubRepo[] {
  if (!project.github) return [];
  if (typeof project.github === 'string') {
    return [{ url: project.github, stars: project.stars }];
  }
  return project.github;
}

function formatLinks(project: Project): string[] {
  const githubLinks = getGitHubUrls(project).map((url) => `- GitHub: ${url}`);
  const npmLink = project.npm ? [`- npm: ${project.npm}`] : [];
  const websiteLink = project.website ? [`- Website: ${project.website}`] : [];
  return [...githubLinks, ...npmLink, ...websiteLink];
}

function getProjectStars(project: Project): number {
  return getGitHubRepos(project).reduce((total, repo) => total + (repo.stars || 0), 0);
}

function getRepoPath(url: string): string {
  const path = new URL(url).pathname;
  return path.replace(/^\//, '').replace(/\/$/, '');
}

function buildRepoStarIndex(project: Project) {
  const repoStars = getGitHubRepos(project).map((repo) => {
    return [getRepoPath(repo.url), repo.stars || 0] as const;
  });
  return new Map(repoStars);
}

type RepoStarIndex = ReturnType<typeof buildRepoStarIndex>;

function normalizeRepoStars(repo: RepoData, starIndex: RepoStarIndex): RepoData {
  const stars = starIndex.get(repo.repoPath);
  if (stars === undefined) return repo;
  const current = { ...repo.current, stars };
  return { ...repo, current };
}

function normalizeMetricStars(project: Project, metrics: ProjectMetrics): ProjectMetrics {
  const stars = getProjectStars(project);
  const current = { ...metrics.current, stars };
  const starIndex = buildRepoStarIndex(project);
  const repos = metrics.repos?.map((repo) => normalizeRepoStars(repo, starIndex));
  return { ...metrics, current, repos };
}

async function normalizeMetricFile({ project }: StaticProjectRecord) {
  const path = join(METRICS_DIRECTORY, `${project.id}.json`);
  const content = await readFile(path, 'utf8');
  const metrics = JSON.parse(content) as ProjectMetrics;
  const normalized = normalizeMetricStars(project, metrics);
  await writeFile(path, `${JSON.stringify(normalized, null, 2)}\n`);
}

async function normalizeMetricFiles(records: StaticProjectRecord[]) {
  await Promise.all(records.map(normalizeMetricFile));
}

function formatStars(project: Project): string[] {
  const stars = getProjectStars(project);
  if (stars === 0) return [];
  return [`- GitHub stars: ${stars.toLocaleString('en-US')}`];
}

function formatHighlights(highlights: string[] | undefined): string[] {
  if (!highlights) return [];
  return highlights.map((value) => `- Highlight: ${value}`);
}

function formatLlmProject({ project }: StaticProjectRecord): string {
  const title = `## ${project.title}`;
  const projectUrl = `- Page: ${SITE_URL}#${project.id}`;
  const tags = `- Technologies: ${project.tags.join(', ')}`;
  const highlights = formatHighlights(project.highlights);
  const content = [title, '', project.tagline, '', project.description, '', projectUrl, tags];
  const stars = formatStars(project);
  return [...content, ...formatLinks(project), ...stars, ...highlights].join('\n');
}

function buildLlmsText(records: StaticProjectRecord[]): string {
  const heading = '# Jeff Wainwright Projects';
  const summary = '> Open source projects and software engineering work by Jeff Wainwright.';
  const catalog = `Catalog JSON: ${SITE_URL}projects.json`;
  const projectSections = records.map(formatLlmProject).join('\n\n');
  return `${heading}\n\n${summary}\n\n${catalog}\n\n${projectSections}\n`;
}

function validateStaticHtml(html: string, records: StaticProjectRecord[]): void {
  const hasPlaceholderRoot = html.includes(ROOT_MARKER);
  const hasAllProjects = records.every(({ project }) => {
    return html.includes(`data-project-id="${project.id}"`);
  });
  if (hasPlaceholderRoot) throw new Error('Static HTML still contains an empty root');
  if (!hasAllProjects) throw new Error('Static HTML is missing project content');
}

async function prerender() {
  const records = buildRecords();
  const template = await readFile(INDEX_PATH, 'utf8');
  const app = createElement(StaticApp, { records });
  const markup = renderToStaticMarkup(app);
  const staticHtml = injectStaticContent(template, markup);
  const html = injectStructuredData(staticHtml, records);
  const catalog = JSON.stringify(records.map(buildCatalogRecord), null, 2);
  validateStaticHtml(html, records);
  await writeFile(INDEX_PATH, html);
  await writeFile(join(DIST_DIRECTORY, 'projects.json'), `${catalog}\n`);
  await writeFile(join(DIST_DIRECTORY, 'llms.txt'), buildLlmsText(records));
  await normalizeMetricFiles(records);
  console.log(`Prerendered ${records.length} projects into static HTML`);
}

await prerender();
