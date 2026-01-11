export interface GitHubRepoEntry {
  url: string;
  stars?: number;
}

export interface GitHubApiRepo {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

export interface GitHubCommitActivity {
  total: number;
  week: number;
  days: number[];
}

export interface NpmDownloads {
  downloads: number;
}

export interface BundlephobiaResponse {
  size: number;
  gzip: number;
}

export interface YearlyCommits {
  year: number;
  count: number;
}

export interface MonthlyCommits {
  month: string;
  commits: number;
}

export interface Downloads {
  monthly: number;
  yearly: number;
  allTime: number;
}

export interface Activity {
  total: number;
  years: YearlyCommits[];
  months: MonthlyCommits[];
}

export interface CurrentMetrics {
  stars: number;
  forks: number;
  commits: YearlyCommits[];
  downloads: Downloads;
  activity: Activity;
  openIssues: number;
  contributors: number;
  bundleSize: number;
}

export interface GradeData {
  score: number;
  stars: number;
  monthlyDownloads: number;
  monthlyActivity: number;
  commits: number;
}

export interface HistoryEntry {
  date: string;
  stars: number;
  forks: number;
  downloads: Downloads;
  commits: YearlyCommits[];
}

export interface RepoHistoryEntry {
  date: string;
  stars: number;
  forks: number;
  commits: YearlyCommits[];
}

export interface RepoCurrentMetrics {
  stars: number;
  forks: number;
  commits: YearlyCommits[];
  activity: Activity;
}

export interface RepoData {
  repoPath: string;
  current: RepoCurrentMetrics;
  history: RepoHistoryEntry[];
}

export interface ProjectMetrics {
  id: string;
  github?: string;
  npm?: string;
  current: CurrentMetrics;
  history: HistoryEntry[];
  repos: RepoData[];
  grade: GradeData;
}

export interface MetricsData {
  lastUpdated: string;
  projects: Record<string, ProjectMetrics>;
}

export interface CommitActivityResult {
  commits: YearlyCommits[];
  activity: Activity;
}

export interface ContributorStats {
  commitsTotal: number;
  contributors: number;
}

export interface SingleRepoMetrics {
  stars: number;
  forks: number;
  openIssues: number;
  commits: YearlyCommits[];
  activity: Activity;
  contributors: number;
}

export interface FetchedRepoData {
  stars: number;
  forks: number;
  openIssues: number;
}

export interface GitHubCommit {
  commit: {
    author: {
      date: string;
    };
  };
}
