import { useQuery } from '@tanstack/react-query';

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  description: string;
  homepage: string;
}

export function useGitHubRepo(owner: string, repo: string) {
  return useQuery({
    queryKey: ['github', owner, repo],
    queryFn: async (): Promise<GitHubRepo> => {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub repo');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(owner && repo),
  });
}
