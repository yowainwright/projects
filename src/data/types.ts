export interface GitHubRepo {
  url: string;
  stars?: number;
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
  current: CurrentMetrics;
  history: HistoryEntry[];
  repos?: RepoData[];
  grade: GradeData;
}

export interface Project {
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
  content?: string;
}
