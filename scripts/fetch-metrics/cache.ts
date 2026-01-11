import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const CACHE_DIR = join(import.meta.dirname, '../../.cache/commits');
const CACHE_FILE = join(CACHE_DIR, 'commits.json');
const METRICS_FILE = join(import.meta.dirname, '../../src/data/project-metrics.json');

interface YearlyCommitCache {
  [repoPath: string]: {
    [year: string]: CachedCommit[];
  };
}

interface MonthlyCommit {
  month: string;
  commits: number;
}

interface RepoActivity {
  months: MonthlyCommit[];
}

interface RepoData {
  repoPath: string;
  current: { activity: RepoActivity };
}

interface ProjectMetrics {
  repos?: RepoData[];
}

interface MetricsFile {
  projects: { [id: string]: ProjectMetrics };
}

export interface CachedCommit {
  sha: string;
  date: string;
}

let cache: YearlyCommitCache | null = null;

function ensureCacheDir(): void {
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function generateCommitsForMonth(month: string, count: number): CachedCommit[] {
  const [year, mon] = month.split('-').map(Number);
  const daysInMonth = new Date(year, mon, 0).getDate();

  return Array.from({ length: count }, (_, i) => {
    const day = Math.min((i % daysInMonth) + 1, daysInMonth);
    const date = `${year}-${String(mon).padStart(2, '0')}-${String(day).padStart(2, '0')}T12:00:00Z`;
    return { sha: `seed-${month}-${i}`, date };
  });
}

function getRepoMonths(repo: RepoData): MonthlyCommit[] | undefined {
  const activity = repo.current?.activity;
  if (!activity) return undefined;
  return activity.months;
}

function addRepoMonthsToCache(repo: RepoData, seeded: YearlyCommitCache): void {
  const months = getRepoMonths(repo);
  if (!months) return;

  seeded[repo.repoPath] = {};

  months.forEach((m) => {
    const year = m.month.split('-')[0];
    const commits = generateCommitsForMonth(m.month, m.commits);
    const existing = seeded[repo.repoPath][year] || [];
    seeded[repo.repoPath][year] = [...existing, ...commits];
  });
}

function seedFromProjects(data: MetricsFile): YearlyCommitCache {
  const seeded: YearlyCommitCache = {};

  Object.values(data.projects).forEach((project) => {
    if (!project.repos) return;
    project.repos.forEach((repo) => addRepoMonthsToCache(repo, seeded));
  });

  return seeded;
}

function seedFromExistingMetrics(): YearlyCommitCache {
  if (!existsSync(METRICS_FILE)) return {};

  const content = readFileSync(METRICS_FILE, 'utf-8');
  const data = JSON.parse(content) as MetricsFile;
  const seeded = seedFromProjects(data);

  console.log(`Seeded cache from existing metrics (${Object.keys(seeded).length} repos)`);
  return seeded;
}

function loadCache(): YearlyCommitCache {
  if (cache) return cache;

  if (existsSync(CACHE_FILE)) {
    const content = readFileSync(CACHE_FILE, 'utf-8');
    cache = JSON.parse(content);
    return cache!;
  }

  cache = seedFromExistingMetrics();
  return cache;
}

export function getCachedYears(repoPath: string): string[] {
  const data = loadCache();
  const repoCache = data[repoPath];
  if (!repoCache) return [];
  return Object.keys(repoCache);
}

export function getCachedCommits(repoPath: string, year: string): CachedCommit[] {
  const data = loadCache();
  const repoCache = data[repoPath];
  if (!repoCache) return [];
  return repoCache[year] ?? [];
}

export function setCachedCommits(repoPath: string, year: string, commits: CachedCommit[]): void {
  const data = loadCache();
  if (!data[repoPath]) {
    data[repoPath] = {};
  }
  data[repoPath][year] = commits;
}

export function saveCache(): void {
  if (!cache) return;
  ensureCacheDir();
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function getYearFromDate(dateStr: string): number {
  return new Date(dateStr).getFullYear();
}
