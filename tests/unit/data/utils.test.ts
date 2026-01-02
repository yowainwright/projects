import { describe, test, expect } from 'bun:test';
import { getGitHubRepos, getTotalStars, getPrimaryGitHubUrl } from '@/data/utils';
import type { Project } from '@/data/projects';

const baseProject: Project = {
  id: 'test',
  title: 'Test Project',
  tagline: 'A test project',
  description: 'Description',
  category: 'personal',
  tags: ['test'],
};

describe('data/utils', () => {
  describe('getGitHubRepos', () => {
    test('returns empty array when no github', () => {
      expect(getGitHubRepos(baseProject)).toEqual([]);
    });

    test('wraps string github url in array', () => {
      const project = { ...baseProject, github: 'https://github.com/user/repo', stars: 100 };
      expect(getGitHubRepos(project)).toEqual([
        { url: 'https://github.com/user/repo', stars: 100 },
      ]);
    });

    test('returns array of repos as-is', () => {
      const repos = [
        { url: 'https://github.com/user/repo1', stars: 50 },
        { url: 'https://github.com/user/repo2', stars: 25 },
      ];
      const project = { ...baseProject, github: repos };
      expect(getGitHubRepos(project)).toEqual(repos);
    });
  });

  describe('getTotalStars', () => {
    test('returns 0 for project with no github', () => {
      expect(getTotalStars(baseProject)).toBe(0);
    });

    test('returns stars from string github', () => {
      const project = { ...baseProject, github: 'https://github.com/user/repo', stars: 42 };
      expect(getTotalStars(project)).toBe(42);
    });

    test('sums stars from multiple repos', () => {
      const project = {
        ...baseProject,
        github: [
          { url: 'https://github.com/user/repo1', stars: 100 },
          { url: 'https://github.com/user/repo2', stars: 50 },
          { url: 'https://github.com/user/repo3' },
        ],
      };
      expect(getTotalStars(project)).toBe(150);
    });
  });

  describe('getPrimaryGitHubUrl', () => {
    test('returns undefined for project with no github', () => {
      expect(getPrimaryGitHubUrl(baseProject)).toBeUndefined();
    });

    test('returns string github url', () => {
      const project = { ...baseProject, github: 'https://github.com/user/repo' };
      expect(getPrimaryGitHubUrl(project)).toBe('https://github.com/user/repo');
    });

    test('returns first repo url from array', () => {
      const project = {
        ...baseProject,
        github: [
          { url: 'https://github.com/user/primary' },
          { url: 'https://github.com/user/secondary' },
        ],
      };
      expect(getPrimaryGitHubUrl(project)).toBe('https://github.com/user/primary');
    });
  });
});
