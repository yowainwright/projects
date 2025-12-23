import { Star } from 'lucide-react';
import { getGitHubRepos, getTotalStars } from '@/data/utils';
import type { StarLinkProps } from './types';

const CONTRIBUTOR_LABEL = 'core contributor';

function extractOrgName(url: string): string {
  const match = url.match(/github\.com\/([^/]+)/);
  return match ? match[1] : '';
}

interface ContributorBadgeProps {
  id: string;
  className?: string;
}

function ContributorBadge({ id, className }: ContributorBadgeProps) {
  return (
    <span id={id} className={className}>
      {CONTRIBUTOR_LABEL}
    </span>
  );
}

interface StarCountProps {
  stars: number;
  url: string;
  id: string;
  className?: string;
  iconClassName?: string;
}

function StarCount({ stars, url, id, className, iconClassName }: StarCountProps) {
  return (
    <a
      id={id}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => e.stopPropagation()}
    >
      {stars.toLocaleString()}
      <Star className={iconClassName} />
    </a>
  );
}

export function StarLink({ project, id, className, iconClassName }: StarLinkProps) {
  const repos = getGitHubRepos(project);
  const hasRepos = repos.length > 0;
  if (!hasRepos) return null;

  const isContribution = project.category === 'oss-contribution';
  const isJspm = project.id === 'jspm';

  if (isContribution) {
    const totalStars = getTotalStars(project);
    const primaryUrl = repos[0]?.url;
    const hasStars = totalStars > 0;
    const shouldShowStars = hasStars && !isJspm;

    return (
      <div className="flex items-center gap-3">
        <ContributorBadge id={`${id}-contributor`} className={className} />
        {shouldShowStars && (
          <StarCount
            stars={totalStars}
            url={primaryUrl}
            id={`${id}-stars`}
            className={className}
            iconClassName={iconClassName}
          />
        )}
      </div>
    );
  }

  const hasFork = repos.length > 1;

  if (hasFork) {
    return (
      <div className="flex items-center gap-3">
        {repos.map((repo, index) => {
          const repoStars = repo.stars ?? 0;
          const hasStars = repoStars > 0;
          if (!hasStars) return null;

          const orgName = extractOrgName(repo.url);

          return (
            <a
              key={repo.url}
              id={`${id}-${index}`}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
              onClick={(e) => e.stopPropagation()}
            >
              {orgName}: {repoStars.toLocaleString()}
              <Star className={iconClassName} />
            </a>
          );
        })}
      </div>
    );
  }

  const primaryRepo = repos[0];
  const primaryStars = primaryRepo.stars ?? 0;
  const hasStars = primaryStars > 0;
  if (!hasStars) return null;

  return (
    <StarCount
      stars={primaryStars}
      url={primaryRepo.url}
      id={id}
      className={className}
      iconClassName={iconClassName}
    />
  );
}
