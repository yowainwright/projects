import { Star } from 'lucide-react';
import { getGitHubRepos, getTotalStars } from '@/data/utils';
import { useStars } from '@/hooks/useStars';
import { CONTRIBUTOR_LABEL, STARLINK_STYLES } from './constants';
import type {
  StarLinkProps,
  StarCountProps,
  ForkStarCountProps,
  ContributorBadgeProps,
} from './types';

function extractOrgName(url: string): string {
  const match = url.match(/github\.com\/([^/]+)/);
  return match ? match[1] : '';
}

function ContributorBadge({ id, className }: ContributorBadgeProps) {
  return (
    <span id={id} className={className}>
      {CONTRIBUTOR_LABEL}
    </span>
  );
}

function StarCount({ fallbackStars, url, id, className, iconClassName }: StarCountProps) {
  const { stars, loading } = useStars(url, fallbackStars);
  const displayStars = stars ?? fallbackStars;

  if (displayStars === 0) return null;

  const loadingClass = loading ? STARLINK_STYLES.loading : '';

  return (
    <a
      id={id}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} ${loadingClass}`}
      onClick={(e) => e.stopPropagation()}
    >
      {displayStars.toLocaleString()}
      <Star className={iconClassName} />
    </a>
  );
}

function ForkStarCount({ fallbackStars, url, orgName, id, className, iconClassName }: ForkStarCountProps) {
  const { stars, loading } = useStars(url, fallbackStars);
  const displayStars = stars ?? fallbackStars;

  if (displayStars === 0) return null;

  const loadingClass = loading ? STARLINK_STYLES.loading : '';

  return (
    <a
      id={id}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} ${loadingClass}`}
      onClick={(e) => e.stopPropagation()}
    >
      {orgName}: {displayStars.toLocaleString()}
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
    const shouldShowStars = !isJspm;

    return (
      <div className={STARLINK_STYLES.wrapper}>
        <ContributorBadge id={`${id}-contributor`} className={className} />
        {shouldShowStars && (
          <StarCount
            fallbackStars={totalStars}
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
      <div className={STARLINK_STYLES.wrapper}>
        {repos.map((repo, index) => {
          const repoStars = repo.stars ?? 0;
          const orgName = extractOrgName(repo.url);

          return (
            <ForkStarCount
              key={repo.url}
              fallbackStars={repoStars}
              url={repo.url}
              orgName={orgName}
              id={`${id}-${index}`}
              className={className}
              iconClassName={iconClassName}
            />
          );
        })}
      </div>
    );
  }

  const primaryRepo = repos[0];
  const primaryStars = primaryRepo.stars ?? 0;

  return (
    <StarCount
      fallbackStars={primaryStars}
      url={primaryRepo.url}
      id={id}
      className={className}
      iconClassName={iconClassName}
    />
  );
}
