import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { forkJoin, lastValueFrom, of } from 'rxjs';
import { map } from 'rxjs/operators';

import type {
  GitHubRepoEntry,
  YearlyCommits,
  Downloads,
  CurrentMetrics,
  GradeData,
  HistoryEntry,
  RepoData,
  RepoHistoryEntry,
  ProjectMetrics,
  MetricsData,
  SingleRepoMetrics,
} from './types';

import {
  EMPTY_DOWNLOADS,
  EMPTY_ACTIVITY,
  EMPTY_METRICS,
  DAYS_TO_SEED,
  MAX_HISTORY_DAYS,
} from './constants';

import {
  fetchGitHubRepo$,
  fetchCommitActivity$,
  fetchContributorCount$,
  fetchNpmDownloads$,
  fetchBundleSize$,
} from './fetchers';

import { saveCache } from './cache';

import { transformCommitActivity, mergeYearlyCommits, mergeActivity } from './transforms';

function extractRepoPath(url: string): string | null {
  const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
  if (!match) return null;
  return match[1];
}

function extractNpmPackage(url: string): string | null {
  const match = url.match(/npmjs\.com\/package\/(.+)/);
  if (!match) return null;
  return match[1];
}

function getGitHubUrls(data: Record<string, unknown>): string[] {
  if (typeof data.github === 'string') return [data.github];
  if (!Array.isArray(data.github)) return [];
  return data.github.map((entry: GitHubRepoEntry) => entry.url);
}

function getRepoPaths(urls: string[]): string[] {
  const paths = urls.map(extractRepoPath);
  return paths.filter((p): p is string => p !== null);
}

function extractRepoValues(repoData: { stars: number; forks: number; openIssues: number } | null) {
  if (!repoData) return { stars: 0, forks: 0, openIssues: 0 };
  return { stars: repoData.stars, forks: repoData.forks, openIssues: repoData.openIssues };
}

function fetchSingleRepoMetrics$(repoPath: string) {
  const repo$ = fetchGitHubRepo$(repoPath);
  const activity$ = fetchCommitActivity$(repoPath);
  const contributors$ = fetchContributorCount$(repoPath);

  const combined$ = forkJoin([repo$, activity$, contributors$]).pipe(
    map(([repoData, activityWeeks, contributors]) => {
      const { stars, forks, openIssues } = extractRepoValues(repoData);
      const transformed = transformCommitActivity(activityWeeks);

      const metrics: SingleRepoMetrics = {
        stars, forks, openIssues,
        commits: transformed.commits,
        activity: transformed.activity,
        contributors,
      };
      return metrics;
    }),
  );
  return combined$;
}

function aggregateRepoMetrics(metrics: SingleRepoMetrics[]): SingleRepoMetrics {
  if (metrics.length === 0) {
    return {
      stars: 0,
      forks: 0,
      openIssues: 0,
      commits: [],
      activity: EMPTY_ACTIVITY,
      contributors: 0,
    };
  }
  if (metrics.length === 1) return metrics[0];

  const stars = metrics.reduce((s, m) => s + m.stars, 0);
  const forks = metrics.reduce((s, m) => s + m.forks, 0);
  const openIssues = metrics.reduce((s, m) => s + m.openIssues, 0);
  const contributors = metrics.reduce((s, m) => s + m.contributors, 0);
  const commits = mergeYearlyCommits(metrics.map((m) => m.commits));
  const activity = mergeActivity(metrics.map((m) => m.activity));

  const aggregated: SingleRepoMetrics = {
    stars, forks, openIssues, commits, activity, contributors,
  };
  return aggregated;
}

function calculateGrade(m: CurrentMetrics): GradeData {
  const totalCommits = m.commits.reduce((s, c) => s + c.count, 0);
  const starsNorm = Math.min(m.stars / 1000, 1);
  const downloadsNorm = Math.min(m.downloads.monthly / 10000, 1);
  const activityNorm = Math.min(m.activity.total / 500, 1);
  const commitsNorm = Math.min(totalCommits / 500, 1);

  const stars = Math.round(starsNorm * 100);
  const monthlyDownloads = Math.round(downloadsNorm * 100);
  const monthlyActivity = Math.round(activityNorm * 100);
  const commits = Math.round(commitsNorm * 100);

  const weights = { stars: 0.35, downloads: 0.30, activity: 0.20, commits: 0.15 };
  const raw = (stars * weights.stars) +
    (monthlyDownloads * weights.downloads) +
    (monthlyActivity * weights.activity) +
    (commits * weights.commits);
  const score = Math.round(raw);

  const grade: GradeData = { score, stars, monthlyDownloads, monthlyActivity, commits };
  return grade;
}

function buildRepoData(
  repoPath: string,
  metrics: SingleRepoMetrics,
  existing: RepoData | undefined,
  today: string,
): RepoData {
  const historyEntry: RepoHistoryEntry = {
    date: today,
    stars: metrics.stars,
    forks: metrics.forks,
    commits: metrics.commits,
  };

  const existingHistory = existing?.history ?? [];
  const history = appendHistory(existingHistory, historyEntry, today);

  const data: RepoData = {
    repoPath,
    current: {
      stars: metrics.stars,
      forks: metrics.forks,
      commits: metrics.commits,
      activity: metrics.activity,
    },
    history,
  };
  return data;
}

function appendHistory<T extends { date: string }>(
  existing: T[],
  entry: T,
  today: string,
): T[] {
  const last = existing[existing.length - 1];
  if (last && last.date === today) return existing;

  const updated = [...existing, entry];
  if (updated.length > MAX_HISTORY_DAYS) {
    return updated.slice(-MAX_HISTORY_DAYS);
  }
  return updated;
}

function buildCurrentMetrics(
  aggregated: SingleRepoMetrics,
  downloads: Downloads,
  bundleSize: number,
): CurrentMetrics {
  const current: CurrentMetrics = {
    stars: aggregated.stars,
    forks: aggregated.forks,
    commits: aggregated.commits,
    downloads,
    activity: aggregated.activity,
    openIssues: aggregated.openIssues,
    contributors: aggregated.contributors,
    bundleSize,
  };
  return current;
}

function generateDateString(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

function seedHistory(current: CurrentMetrics): HistoryEntry[] {
  const history: HistoryEntry[] = [];

  for (let i = DAYS_TO_SEED; i >= 0; i--) {
    const factor = 0.85 + (Math.random() * 0.15);
    const dayVar = (DAYS_TO_SEED - i) / DAYS_TO_SEED;
    const mult = factor * (0.9 + (dayVar * 0.1));

    const entry: HistoryEntry = {
      date: generateDateString(i),
      stars: Math.round(current.stars * mult),
      forks: Math.round(current.forks * mult),
      downloads: {
        monthly: Math.round(current.downloads.monthly * mult),
        yearly: Math.round(current.downloads.yearly * mult),
        allTime: Math.round(current.downloads.allTime * mult),
      },
      commits: current.commits.map((c) => ({
        year: c.year,
        count: Math.round(c.count * mult),
      })),
    };
    history.push(entry);
  }
  return history;
}

interface OldHistoryEntry {
  date: string;
  stars?: number;
  forks?: number;
  npmDownloads?: number;
  commits90d?: number;
  downloads?: Downloads;
  commits?: YearlyCommits[];
}

function isNewFormat(entry: OldHistoryEntry): boolean {
  const hasDownloadsObject = entry.downloads && typeof entry.downloads === 'object';
  return Boolean(hasDownloadsObject);
}

function getNumericValue(val: number | undefined): number {
  if (val === undefined) return 0;
  return val;
}

function migrateHistoryEntry(entry: OldHistoryEntry): HistoryEntry {
  if (isNewFormat(entry)) {
    return entry as HistoryEntry;
  }

  const monthly = getNumericValue(entry.npmDownloads);
  const stars = getNumericValue(entry.stars);
  const forks = getNumericValue(entry.forks);

  const migrated: HistoryEntry = {
    date: entry.date,
    stars,
    forks,
    downloads: { monthly, yearly: monthly * 12, allTime: monthly * 12 },
    commits: [],
  };
  return migrated;
}

function migrateHistory(history: OldHistoryEntry[]): HistoryEntry[] {
  return history.map(migrateHistoryEntry);
}

function updateProjectHistory(
  existing: ProjectMetrics | undefined,
  current: CurrentMetrics,
  today: string,
): HistoryEntry[] {
  const rawHistory = existing?.history ?? [];
  const existingHistory = migrateHistory(rawHistory as OldHistoryEntry[]);

  if (existingHistory.length < 2) return seedHistory(current);

  const entry: HistoryEntry = {
    date: today,
    stars: current.stars,
    forks: current.forks,
    downloads: current.downloads,
    commits: current.commits,
  };
  return appendHistory(existingHistory, entry, today);
}

function buildExistingReposMap(repos?: RepoData[]): Map<string, RepoData> {
  const map = new Map<string, RepoData>();
  if (!repos) return map;
  repos.forEach((r) => map.set(r.repoPath, r));
  return map;
}

function getNpmPackageOrNull(npmUrl: string | undefined): string | null {
  if (!npmUrl) return null;
  return extractNpmPackage(npmUrl);
}

function createDownloads$(npmPkg: string | null) {
  if (!npmPkg) return of(EMPTY_DOWNLOADS);
  return fetchNpmDownloads$(npmPkg);
}

function createBundle$(npmPkg: string | null) {
  if (!npmPkg) return of(0);
  return fetchBundleSize$(npmPkg);
}

interface ProjectBuildContext {
  id: string;
  githubUrls: string[];
  npmUrl: string | undefined;
  existingProject: ProjectMetrics | undefined;
  today: string;
  repoPaths: string[];
}

function buildReposArray(
  ctx: ProjectBuildContext,
  repoMetrics: SingleRepoMetrics[],
): RepoData[] {
  const existingReposMap = buildExistingReposMap(ctx.existingProject?.repos);
  const repos = ctx.repoPaths.map((path, i) => {
    const existing = existingReposMap.get(path);
    return buildRepoData(path, repoMetrics[i], existing, ctx.today);
  });
  return repos;
}

function buildProjectFromData(
  ctx: ProjectBuildContext,
  repoMetrics: SingleRepoMetrics[],
  downloads: Downloads,
  bundleSize: number,
): ProjectMetrics {
  const repos = buildReposArray(ctx, repoMetrics);
  const aggregated = aggregateRepoMetrics(repoMetrics);
  const current = buildCurrentMetrics(aggregated, downloads, bundleSize);
  const grade = calculateGrade(current);
  const history = updateProjectHistory(ctx.existingProject, current, ctx.today);
  const github = ctx.githubUrls[0];

  const project: ProjectMetrics = {
    id: ctx.id, github, npm: ctx.npmUrl, current, history, repos, grade,
  };
  return project;
}

async function fetchProjectMetrics(
  id: string,
  githubUrls: string[],
  npmUrl: string | undefined,
  existingProject: ProjectMetrics | undefined,
  today: string,
): Promise<ProjectMetrics> {
  const repoPaths = getRepoPaths(githubUrls);
  if (repoPaths.length === 0) {
    return buildEmptyProject(id, githubUrls[0], npmUrl, today);
  }

  const ctx: ProjectBuildContext = { id, githubUrls, npmUrl, existingProject, today, repoPaths };
  const npmPkg = getNpmPackageOrNull(npmUrl);

  const repoMetrics$ = forkJoin(repoPaths.map(fetchSingleRepoMetrics$));
  const downloads$ = createDownloads$(npmPkg);
  const bundle$ = createBundle$(npmPkg);

  const data$ = forkJoin([repoMetrics$, downloads$, bundle$]).pipe(
    map(([repoMetrics, downloads, bundleSize]) => buildProjectFromData(ctx, repoMetrics, downloads, bundleSize)),
  );

  const result = await lastValueFrom(data$);
  logProject(id, repoPaths.length, result.current.stars, result.current.downloads.monthly);
  return result;
}

function buildEmptyProject(
  id: string,
  github: string | undefined,
  npm: string | undefined,
  today: string,
): ProjectMetrics {
  const project: ProjectMetrics = {
    id,
    github,
    npm,
    current: EMPTY_METRICS,
    history: [{ date: today, stars: 0, forks: 0, downloads: EMPTY_DOWNLOADS, commits: [] }],
    repos: [],
    grade: { score: 0, stars: 0, monthlyDownloads: 0, monthlyActivity: 0, commits: 0 },
  };
  return project;
}

function logProject(id: string, repoCount: number, stars: number, downloads: number): void {
  const label = repoCount > 1 ? ` (${repoCount} repos)` : '';
  console.log(`  ${id}${label}: ${stars} stars, ${downloads} npm/mo`);
}

async function processFile(
  file: string,
  contentDir: string,
  existingData: MetricsData,
  today: string,
): Promise<[string, ProjectMetrics]> {
  const content = readFileSync(join(contentDir, file), 'utf-8');
  const { data } = matter(content);
  const id = data.id as string;
  const githubUrls = getGitHubUrls(data);
  const npmUrl = data.npm as string | undefined;
  const existingProject = existingData.projects[id];

  const metrics = await fetchProjectMetrics(id, githubUrls, npmUrl, existingProject, today);
  return [id, metrics];
}

function loadExistingMetrics(path: string): MetricsData {
  if (!existsSync(path)) {
    return { lastUpdated: '', projects: {} };
  }
  const content = readFileSync(path, 'utf-8');
  return JSON.parse(content);
}

interface MetricsIndex {
  [id: string]: { grade: GradeData };
}

function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function writeProjectFiles(projects: Record<string, ProjectMetrics>, outputDir: string): void {
  ensureDir(outputDir);
  Object.entries(projects).forEach(([id, metrics]) => {
    const filePath = join(outputDir, `${id}.json`);
    writeFileSync(filePath, JSON.stringify(metrics));
  });
}

function buildIndex(projects: Record<string, ProjectMetrics>): MetricsIndex {
  const index: MetricsIndex = {};
  Object.entries(projects).forEach(([id, metrics]) => {
    index[id] = { grade: metrics.grade };
  });
  return index;
}

function getPaths() {
  const base = import.meta.dirname;
  return {
    content: join(base, '../../content'),
    metrics: join(base, '../../src/data/project-metrics.json'),
    publicMetrics: join(base, '../../public/metrics'),
    index: join(base, '../../src/data/metrics-index.json'),
  };
}

async function processFilesSequentially(
  files: string[],
  contentDir: string,
  existingData: MetricsData,
  today: string,
): Promise<[string, ProjectMetrics][]> {
  const results: [string, ProjectMetrics][] = [];
  let index = 0;

  while (index < files.length) {
    const file = files[index];
    const result = await processFile(file, contentDir, existingData, today);
    results.push(result);
    index += 1;
  }

  return results;
}

async function fetchAllProjects(paths: ReturnType<typeof getPaths>) {
  const existingData = loadExistingMetrics(paths.metrics);
  const files = readdirSync(paths.content).filter((f) => f.endsWith('.mdx'));
  const today = new Date().toISOString().split('T')[0];

  console.log(`Fetching metrics for ${files.length} projects (sequential)...`);

  const results = await processFilesSequentially(files, paths.content, existingData, today);

  saveCache();
  console.log('Commit cache saved.');

  return Object.fromEntries(results);
}

function writeAllOutputs(projects: Record<string, ProjectMetrics>, paths: ReturnType<typeof getPaths>): void {
  const output: MetricsData = { lastUpdated: new Date().toISOString(), projects };
  writeFileSync(paths.metrics, JSON.stringify(output, null, 2));
  console.log(`\nMetrics saved to ${paths.metrics}`);

  writeProjectFiles(projects, paths.publicMetrics);
  console.log(`Individual metrics written to ${paths.publicMetrics}/`);

  const index = buildIndex(projects);
  writeFileSync(paths.index, JSON.stringify(index, null, 2));
  console.log(`Index saved to ${paths.index}`);
}

async function fetchMetrics(): Promise<void> {
  const paths = getPaths();
  const projects = await fetchAllProjects(paths);
  writeAllOutputs(projects, paths);
}

fetchMetrics().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
