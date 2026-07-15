import { useState, useEffect } from 'react';
import { getStarCount } from '@/lib/stars';

interface UseStarsResult {
  stars: number | null;
  loading: boolean;
  fromCache: boolean;
}

export function useStars(githubUrl: string | undefined, fallback: number = 0): UseStarsResult {
  const [stars, setStars] = useState<number | null>(fallback || null);
  const [loading, setLoading] = useState(!!githubUrl);
  const [fromCache, setFromCache] = useState(false);

  useEffect(() => {
    const starsUrl = githubUrl;
    if (!starsUrl) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchStars(url: string) {
      const result = await getStarCount(url);

      if (cancelled) return;

      if (result) {
        setStars(result.stars);
        setFromCache(result.fromCache);
      }
      setLoading(false);
    }

    fetchStars(starsUrl);

    return () => {
      cancelled = true;
    };
  }, [githubUrl]);

  return { stars, loading, fromCache };
}
