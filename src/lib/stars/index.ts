import { db, ref, get, set } from '@/lib/firebase';

const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour
const GITHUB_API_BASE = 'https://api.github.com/repos';

interface StarCache {
  stars: number;
  updatedAt: number;
}

interface StarData {
  stars: number;
  fromCache: boolean;
}

function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  const [, owner, repo] = match;
  return { owner, repo: repo.replace(/\.git$/, '') };
}

async function fetchFromGitHub(owner: string, repo: string): Promise<number | null> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/${owner}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.stargazers_count ?? null;
  } catch {
    return null;
  }
}

async function getFromCache(owner: string, repo: string): Promise<StarCache | null> {
  try {
    const cacheRef = ref(db, `stars/${owner}/${repo}`);
    const snapshot = await get(cacheRef);
    if (!snapshot.exists()) return null;
    return snapshot.val() as StarCache;
  } catch {
    return null;
  }
}

async function saveToCache(owner: string, repo: string, stars: number): Promise<void> {
  try {
    const cacheRef = ref(db, `stars/${owner}/${repo}`);
    await set(cacheRef, {
      stars,
      updatedAt: Date.now(),
    });
  } catch {
    // Silent fail - caching is best effort
  }
}

export async function getStarCount(githubUrl: string): Promise<StarData | null> {
  const parsed = parseGitHubUrl(githubUrl);
  if (!parsed) return null;

  const { owner, repo } = parsed;

  // Check cache first
  const cached = await getFromCache(owner, repo);
  const isFresh = cached && Date.now() - cached.updatedAt < CACHE_TTL_MS;

  if (isFresh) {
    return { stars: cached.stars, fromCache: true };
  }

  // Fetch fresh data
  const freshStars = await fetchFromGitHub(owner, repo);

  if (freshStars !== null) {
    await saveToCache(owner, repo, freshStars);
    return { stars: freshStars, fromCache: false };
  }

  // Fall back to stale cache if fetch failed
  if (cached) {
    return { stars: cached.stars, fromCache: true };
  }

  return null;
}

export async function getMultipleStarCounts(
  githubUrls: string[]
): Promise<Map<string, number>> {
  const results = new Map<string, number>();

  const promises = githubUrls.map(async (url) => {
    const data = await getStarCount(url);
    if (data) {
      results.set(url, data.stars);
    }
  });

  await Promise.all(promises);
  return results;
}
