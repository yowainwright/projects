import type {
  GitHubCommitActivity,
  YearlyCommits,
  MonthlyCommits,
  Activity,
  CommitActivityResult,
} from './types';

import { EMPTY_ACTIVITY } from './constants';

function weekTimestampToYear(weekTimestamp: number): number {
  const date = new Date(weekTimestamp * 1000);
  return date.getFullYear();
}

function weekTimestampToMonth(weekTimestamp: number): string {
  const date = new Date(weekTimestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

function groupByYear(weeks: GitHubCommitActivity[]): YearlyCommits[] {
  const yearMap = new Map<number, number>();

  weeks.forEach((week) => {
    const year = weekTimestampToYear(week.week);
    const current = yearMap.get(year) || 0;
    yearMap.set(year, current + week.total);
  });

  const years = Array.from(yearMap.keys()).sort((a, b) => a - b);
  const result = years.map((year) => {
    const count = yearMap.get(year) || 0;
    return { year, count };
  });
  return result;
}

function groupByMonth(weeks: GitHubCommitActivity[]): MonthlyCommits[] {
  const monthMap = new Map<string, number>();

  weeks.forEach((week) => {
    const month = weekTimestampToMonth(week.week);
    const current = monthMap.get(month) || 0;
    monthMap.set(month, current + week.total);
  });

  const months = Array.from(monthMap.keys()).sort();
  const result = months.map((month) => {
    const commits = monthMap.get(month) || 0;
    return { month, commits };
  });
  return result;
}

function calculateTotal(weeks: GitHubCommitActivity[]): number {
  return weeks.reduce((sum, w) => sum + w.total, 0);
}

export function transformCommitActivity(weeks: GitHubCommitActivity[]): CommitActivityResult {
  if (weeks.length === 0) return { commits: [], activity: EMPTY_ACTIVITY };

  const commits = groupByYear(weeks);
  const total = calculateTotal(weeks);
  const years = commits;
  const months = groupByMonth(weeks);
  const activity: Activity = { total, years, months };

  return { commits, activity };
}

export function mergeYearlyCommits(arrays: YearlyCommits[][]): YearlyCommits[] {
  const yearMap = new Map<number, number>();

  arrays.forEach((arr) => {
    arr.forEach((entry) => {
      const current = yearMap.get(entry.year) || 0;
      yearMap.set(entry.year, current + entry.count);
    });
  });

  const years = Array.from(yearMap.keys()).sort((a, b) => a - b);
  const result = years.map((year) => {
    const count = yearMap.get(year) || 0;
    return { year, count };
  });
  return result;
}

export function mergeActivity(activities: Activity[]): Activity {
  if (activities.length === 0) return EMPTY_ACTIVITY;
  if (activities.length === 1) return activities[0];

  const total = activities.reduce((sum, a) => sum + a.total, 0);
  const yearArrays = activities.map((a) => a.years);
  const years = mergeYearlyCommits(yearArrays);
  const months = mergeMonthlyCommits(activities.map((a) => a.months));

  const merged: Activity = { total, years, months };
  return merged;
}

function mergeMonthlyCommits(arrays: MonthlyCommits[][]): MonthlyCommits[] {
  const monthMap = new Map<string, number>();

  arrays.forEach((arr) => {
    arr.forEach((entry) => {
      const current = monthMap.get(entry.month) || 0;
      monthMap.set(entry.month, current + entry.commits);
    });
  });

  const months = Array.from(monthMap.keys()).sort();
  const result = months.map((month) => {
    const commits = monthMap.get(month) || 0;
    return { month, commits };
  });
  return result;
}
