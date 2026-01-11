import { Observable, from, of } from 'rxjs';
import { mergeMap, map, retry, catchError, shareReplay, delay } from 'rxjs/operators';

import type {
  GitHubApiRepo,
  NpmDownloads,
  BundlephobiaResponse,
  GitHubCommitActivity,
  FetchedRepoData,
  Downloads,
  GitHubCommit,
} from './types';

import { MAX_CONCURRENT_REQUESTS, REQUEST_DELAY_MS } from './constants';
import {
  getCachedCommits,
  setCachedCommits,
  getCurrentYear,
  getYearFromDate,
  type CachedCommit,
} from './cache';

const repoCache = new Map<string, Observable<FetchedRepoData | null>>();
const activityCache = new Map<string, Observable<GitHubCommitActivity[]>>();
const contributorCache = new Map<string, Observable<number>>();

let rateLimitRemaining = 5000;

export function getRateLimitRemaining(): number {
  return rateLimitRemaining;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getAuthHeaders(): Record<string, string> {
  const token = process.env.CLI_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'fetch-metrics',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

function parseResponse<T>(r: Response): Observable<T | null> {
  if (!r.ok) return of(null);
  const json$ = from(r.json() as Promise<T>);
  return json$;
}

function fetchJson$<T>(url: string, headers?: Record<string, string>): Observable<T | null> {
  const request$ = from(fetch(url, { headers })).pipe(
    mergeMap((r) => parseResponse<T>(r)),
    retry(2),
    catchError(() => of(null)),
  );
  return request$;
}

function mapRepoData(data: GitHubApiRepo | null): FetchedRepoData | null {
  if (!data) return null;
  const result: FetchedRepoData = {
    stars: data.stargazers_count,
    forks: data.forks_count,
    openIssues: data.open_issues_count,
  };
  return result;
}

export function fetchGitHubRepo$(repoPath: string): Observable<FetchedRepoData | null> {
  const cached = repoCache.get(repoPath);
  if (cached) return cached;

  const url = `https://api.github.com/repos/${repoPath}`;
  const req$ = fetchJson$<GitHubApiRepo>(url, getAuthHeaders()).pipe(
    map(mapRepoData),
    shareReplay(1),
  );

  repoCache.set(repoPath, req$);
  return req$;
}

function getWeekStart(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return Math.floor(d.getTime() / 1000);
}

function buildWeekActivity(week: number, total: number): GitHubCommitActivity {
  return { week, total, days: [0, 0, 0, 0, 0, 0, 0] };
}

function groupCommitsByWeek(commits: GitHubCommit[]): GitHubCommitActivity[] {
  const weekMap = new Map<number, number>();

  commits.forEach((c) => {
    const date = new Date(c.commit.author.date);
    const weekStart = getWeekStart(date);
    const current = weekMap.get(weekStart) || 0;
    weekMap.set(weekStart, current + 1);
  });

  const weeks = Array.from(weekMap.keys()).sort((a, b) => a - b);
  const result = weeks.map((week) => {
    const total = weekMap.get(week) || 0;
    return buildWeekActivity(week, total);
  });
  return result;
}

function getJan1OfYear(year: number): string {
  return `${year}-01-01T00:00:00Z`;
}

async function fetchCommitsSince(repoPath: string, since: string): Promise<GitHubCommit[]> {
  const allCommits: GitHubCommit[] = [];
  const maxPages = 20;
  const headers = getAuthHeaders();

  for (let page = 1; page <= maxPages; page++) {
    if (page > 1) await sleep(REQUEST_DELAY_MS);
    const url = `https://api.github.com/repos/${repoPath}/commits?per_page=100&page=${page}&since=${since}`;
    const response = await fetch(url, { headers });
    if (!response.ok) break;
    const commits = await response.json() as GitHubCommit[];
    if (commits.length === 0) break;
    allCommits.push(...commits);
  }
  return allCommits;
}

function groupByYear(commits: GitHubCommit[]): Map<number, CachedCommit[]> {
  return commits.reduce((acc, c) => {
    const year = getYearFromDate(c.commit.author.date);
    const cached: CachedCommit = { sha: c.sha, date: c.commit.author.date };
    const list = acc.get(year) || [];
    acc.set(year, [...list, cached]);
    return acc;
  }, new Map<number, CachedCommit[]>());
}

function cachedToGitHub(cached: CachedCommit[]): GitHubCommit[] {
  return cached.map((c) => {
    const commit = { author: { date: c.date } };
    return { sha: c.sha, commit };
  });
}

function cacheCurrentYearCommits(repoPath: string, byYear: Map<number, CachedCommit[]>): void {
  const currentYear = getCurrentYear();
  const currentYearCommits = byYear.get(currentYear);
  if (currentYearCommits) {
    setCachedCommits(repoPath, String(currentYear), currentYearCommits);
  }
}

function sliceUntilEmpty(yearData: CachedCommit[][]): CachedCommit[][] {
  const firstEmpty = yearData.findIndex((commits) => commits.length === 0);
  if (firstEmpty === -1) return yearData;
  return yearData.slice(0, firstEmpty);
}

function loadCachedPastYears(repoPath: string): GitHubCommit[] {
  const currentYear = getCurrentYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 1 - i);
  const yearData = years.map((year) => getCachedCommits(repoPath, String(year)));
  const validYears = sliceUntilEmpty(yearData);
  return validYears.flatMap(cachedToGitHub);
}

async function fetchAllCommitPages(repoPath: string): Promise<GitHubCommit[]> {
  const since = getJan1OfYear(getCurrentYear());
  const freshCommits = await fetchCommitsSince(repoPath, since);

  cacheCurrentYearCommits(repoPath, groupByYear(freshCommits));

  const pastCommits = loadCachedPastYears(repoPath);
  return [...freshCommits, ...pastCommits];
}

function createCommitActivityStream(repoPath: string): Observable<GitHubCommitActivity[]> {
  const commits$ = from(fetchAllCommitPages(repoPath));
  const grouped$ = commits$.pipe(map(groupCommitsByWeek));
  const withFallback$ = grouped$.pipe(catchError(() => of([])));
  const cached$ = withFallback$.pipe(shareReplay(1));
  return cached$;
}

export function fetchCommitActivity$(repoPath: string): Observable<GitHubCommitActivity[]> {
  const cached = activityCache.get(repoPath);
  if (cached) return cached;

  const stream$ = createCommitActivityStream(repoPath);
  activityCache.set(repoPath, stream$);
  return stream$;
}

function parseContributorCount(linkHeader: string | null): number {
  if (!linkHeader) return 1;
  const lastMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
  if (!lastMatch) return 1;
  return parseInt(lastMatch[1], 10);
}

export function fetchContributorCount$(repoPath: string): Observable<number> {
  const cached = contributorCache.get(repoPath);
  if (cached) return cached;

  const url = `https://api.github.com/repos/${repoPath}/contributors?per_page=1`;
  const req$ = from(fetch(url, { headers: getAuthHeaders() })).pipe(
    map((response) => parseContributorCount(response.headers.get('Link'))),
    retry(2),
    catchError(() => of(0)),
    shareReplay(1),
  );

  contributorCache.set(repoPath, req$);
  return req$;
}

function extractDownloads(d: NpmDownloads | null): number {
  if (!d) return 0;
  return d.downloads;
}

function buildDownloads(monthly: number, yearly: number): Downloads {
  const downloads: Downloads = { monthly, yearly, allTime: yearly };
  return downloads;
}

export function fetchNpmDownloads$(pkg: string): Observable<Downloads> {
  const monthlyUrl = `https://api.npmjs.org/downloads/point/last-month/${pkg}`;
  const yearlyUrl = `https://api.npmjs.org/downloads/point/last-year/${pkg}`;

  const monthly$ = fetchJson$<NpmDownloads>(monthlyUrl).pipe(map(extractDownloads));
  const yearly$ = fetchJson$<NpmDownloads>(yearlyUrl).pipe(map(extractDownloads));

  const combined$ = monthly$.pipe(
    mergeMap((monthly) => yearly$.pipe(map((yearly) => buildDownloads(monthly, yearly)))),
  );
  return combined$;
}

function extractGzip(data: BundlephobiaResponse | null): number {
  if (!data) return 0;
  return data.gzip;
}

export function fetchBundleSize$(pkg: string): Observable<number> {
  const url = `https://bundlephobia.com/api/size?package=${encodeURIComponent(pkg)}`;
  const size$ = fetchJson$<BundlephobiaResponse>(url).pipe(
    delay(500),
    map(extractGzip),
  );
  return size$;
}

export function fetchAllRepos$<T>(
  items: string[],
  fetcher: (item: string) => Observable<T>,
): Observable<T[]> {
  if (items.length === 0) return of([]);

  const results: T[] = Array.from({ length: items.length });
  const stream$ = from(items).pipe(
    mergeMap((item, index) => fetcher(item).pipe(
      map((result) => ({ result, index })),
    ), MAX_CONCURRENT_REQUESTS),
    map(({ result, index }) => {
      results[index] = result;
      return results;
    }),
  );
  return stream$;
}

export function clearCaches(): void {
  repoCache.clear();
  activityCache.clear();
  contributorCache.clear();
}
