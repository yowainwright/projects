import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

interface GitHubApiRepo {
  stargazers_count: number;
  homepage: string | null;
}

interface GitHubRepoEntry {
  url: string;
  stars?: number;
}

function extractRepoPath(githubUrl: string): string | null {
  const match = githubUrl.match(/github\.com\/([^/]+\/[^/]+)/);
  return match ? match[1] : null;
}

interface RepoData {
  stars: number;
  homepage: string | null;
}

async function fetchRepoData(repoPath: string): Promise<RepoData | null> {
  const url = `https://api.github.com/repos/${repoPath}`;
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'update-stars-script',
  };

  const token = process.env.CLI_GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    console.error(`Failed to fetch ${repoPath}: ${response.status}`);
    return null;
  }

  const data = await response.json() as GitHubApiRepo;
  return {
    stars: data.stargazers_count,
    homepage: data.homepage,
  };
}

async function updateStars(): Promise<void> {
  const contentDir = join(import.meta.dirname, '../content');
  const files = readdirSync(contentDir).filter((f) => f.endsWith('.mdx'));
  let totalUpdates = 0;

  for (const file of files) {
    const filePath = join(contentDir, file);
    const fileContent = readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    let updated = false;

    if (data.github) {
      if (typeof data.github === 'string') {
        const repoPath = extractRepoPath(data.github);
        if (repoPath) {
          const repoData = await fetchRepoData(repoPath);
          if (repoData !== null) {
            if (repoData.stars !== data.stars) {
              console.log(`${file}: stars ${data.stars ?? 'none'} → ${repoData.stars}`);
              data.stars = repoData.stars;
              updated = true;
            }
            const hasNewWebsite = repoData.homepage && !data.website;
            if (hasNewWebsite) {
              console.log(`${file}: website → ${repoData.homepage}`);
              data.website = repoData.homepage;
              updated = true;
            }
          }
        }
      } else if (Array.isArray(data.github)) {
        let primaryHomepage: string | null = null;
        for (const repo of data.github as GitHubRepoEntry[]) {
          const repoPath = extractRepoPath(repo.url);
          if (repoPath) {
            const repoData = await fetchRepoData(repoPath);
            if (repoData !== null) {
              if (repoData.stars !== repo.stars) {
                console.log(`${file} (${repoPath}): stars ${repo.stars ?? 'none'} → ${repoData.stars}`);
                repo.stars = repoData.stars;
                updated = true;
              }
              if (repoData.homepage && !primaryHomepage) {
                primaryHomepage = repoData.homepage;
              }
            }
          }
        }
        const hasNewWebsite = primaryHomepage && !data.website;
        if (hasNewWebsite) {
          console.log(`${file}: website → ${primaryHomepage}`);
          data.website = primaryHomepage;
          updated = true;
        }
      }
    }

    if (updated) {
      const newContent = matter.stringify(content, data);
      writeFileSync(filePath, newContent);
      totalUpdates++;
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  if (totalUpdates === 0) {
    console.log('No star count changes detected');
    return;
  }

  console.log(`Updated ${totalUpdates} file(s)`);
}

updateStars().catch((error) => {
  console.error('Error updating stars:', error);
  process.exit(1);
});
