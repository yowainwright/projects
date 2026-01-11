import type {
  CommitActivityResult,
  ContributorStats,
  CurrentMetrics,
  SingleRepoMetrics,
  Downloads,
  Activity,
} from './types';

export const EMPTY_DOWNLOADS: Downloads = {
  monthly: 0,
  yearly: 0,
  allTime: 0,
};

export const EMPTY_ACTIVITY: Activity = {
  total: 0,
  years: [],
  months: [],
};

export const EMPTY_COMMIT_RESULT: CommitActivityResult = {
  commits: [],
  activity: EMPTY_ACTIVITY,
};

export const EMPTY_CONTRIBUTOR_STATS: ContributorStats = {
  commitsTotal: 0,
  contributors: 0,
};

export const EMPTY_METRICS: CurrentMetrics = {
  stars: 0,
  forks: 0,
  commits: [],
  downloads: EMPTY_DOWNLOADS,
  activity: EMPTY_ACTIVITY,
  openIssues: 0,
  contributors: 0,
  bundleSize: 0,
};

export const EMPTY_REPO_METRICS: SingleRepoMetrics = {
  stars: 0,
  forks: 0,
  openIssues: 0,
  commits: [],
  activity: EMPTY_ACTIVITY,
  contributors: 0,
};

export const DAYS_TO_SEED = 14;
export const MAX_HISTORY_DAYS = 90;
export const MAX_CONCURRENT_REQUESTS = 1;
export const REQUEST_DELAY_MS = 200;
