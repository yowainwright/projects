import type { Project, GitHubRepo } from './projects';

export function getGitHubRepos(project: Project): GitHubRepo[] {
  if (!project.github) return [];
  if (typeof project.github === 'string') {
    return [{ url: project.github, stars: project.stars }];
  }
  return project.github;
}

export function getTotalStars(project: Project): number {
  const repos = getGitHubRepos(project);
  return repos.reduce((sum, repo) => sum + (repo.stars ?? 0), 0);
}

export function getPrimaryGitHubUrl(project: Project): string | undefined {
  const repos = getGitHubRepos(project);
  return repos[0]?.url;
}
