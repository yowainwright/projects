import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

interface GitHubApiRepo {
  stargazers_count: number;
}

interface GitHubRepoEntry {
  url: string;
  stars?: number;
}

function extractRepoPath(githubUrl: string): string | null {
  const match = githubUrl.match(/github\.com\/([^/]+\/[^/]+)/);
  return match ? match[1] : null;
}

async function fetchStars(repoPath: string): Promise<number | null> {
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
  return data.stargazers_count;
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
          const stars = await fetchStars(repoPath);
          if (stars !== null && stars !== data.stars) {
            console.log(`${file}: stars ${data.stars ?? 'none'} → ${stars}`);
            data.stars = stars;
            updated = true;
          }
        }
      } else if (Array.isArray(data.github)) {
        for (const repo of data.github as GitHubRepoEntry[]) {
          const repoPath = extractRepoPath(repo.url);
          if (repoPath) {
            const stars = await fetchStars(repoPath);
            if (stars !== null && stars !== repo.stars) {
              console.log(`${file} (${repoPath}): stars ${repo.stars ?? 'none'} → ${stars}`);
              repo.stars = stars;
              updated = true;
            }
          }
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
