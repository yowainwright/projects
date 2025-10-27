import { useQuery } from '@tanstack/react-query';

interface NpmPackage {
  downloads: number;
  version: string;
  description: string;
  homepage?: string;
}

export function useNpmPackage(packageName: string) {
  return useQuery({
    queryKey: ['npm', packageName],
    queryFn: async (): Promise<NpmPackage> => {
      const [registryResponse, downloadsResponse] = await Promise.all([
        fetch(`https://registry.npmjs.org/${packageName}`),
        fetch(`https://api.npmjs.org/downloads/point/last-week/${packageName}`),
      ]);

      if (!registryResponse.ok || !downloadsResponse.ok) {
        throw new Error('Failed to fetch npm package');
      }

      const registry = await registryResponse.json();
      const downloads = await downloadsResponse.json();

      return {
        downloads: downloads.downloads || 0,
        version: registry['dist-tags']?.latest || '',
        description: registry.description || '',
        homepage: registry.homepage,
      };
    },
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(packageName),
  });
}
