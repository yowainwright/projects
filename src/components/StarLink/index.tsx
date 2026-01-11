'use client';

import { Star } from 'lucide-react';
import { getGitHubRepos } from '@/data/utils';
import { useProjectMetrics } from '@/hooks/useProjectMetrics';
import { CONTRIBUTOR_LABEL, STARLINK_STYLES } from './constants';
import type {
  StarLinkProps,
  StarCountProps,
  ForkStarCountProps,
  ContributorBadgeProps,
} from './types';

function extractOrgName(url: string): string {
  const match = url.match(/github\.com\/([^/]+)/);
  if (!match) return '';
  return match[1];
}

function getLoadingClass(loading: boolean | undefined): string {
  if (loading) return STARLINK_STYLES.loading;
  return '';
}

function getStarsFromRepo(repo: { stars?: number } | undefined): number {
  if (!repo) return 0;
  if (repo.stars === undefined) return 0;
  return repo.stars;
}

function selectStars(metricsStars: number, fallbackStars: number): number {
  if (metricsStars > 0) return metricsStars;
  return fallbackStars;
}

function getMetricsStars(metrics: { current: { stars: number } } | null): number {
  if (!metrics) return 0;
  return metrics.current.stars;
}

function ContributorBadge({ id, className }: ContributorBadgeProps) {
  return (
    <span id={id} className={className}>
      {CONTRIBUTOR_LABEL}
    </span>
  );
}

function StarCount({ stars, url, id, className, iconClassName, loading }: StarCountProps) {
  if (stars === 0) return null;

  const loadingClass = getLoadingClass(loading);
  const combinedClassName = [className, loadingClass].filter(Boolean).join(' ');
  const formattedStars = stars.toLocaleString();

  return (
    <a
      id={id}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={combinedClassName}
      onClick={(e) => e.stopPropagation()}
    >
      {formattedStars}
      <Star className={iconClassName} />
    </a>
  );
}

function ForkStarCount({ stars, url, orgName, id, className, iconClassName, loading }: ForkStarCountProps) {
  if (stars === 0) return null;

  const loadingClass = getLoadingClass(loading);
  const combinedClassName = [className, loadingClass].filter(Boolean).join(' ');
  const formattedStars = stars.toLocaleString();
  const displayText = `${orgName}: ${formattedStars}`;

  return (
    <a
      id={id}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={combinedClassName}
      onClick={(e) => e.stopPropagation()}
    >
      {displayText}
      <Star className={iconClassName} />
    </a>
  );
}

export function StarLink({ project, id, className, iconClassName }: StarLinkProps) {
  const repos = getGitHubRepos(project);
  const { metrics, loading } = useProjectMetrics(project.id);

  const hasRepos = repos.length > 0;
  if (!hasRepos) return null;

  const metricsStars = getMetricsStars(metrics);
  const isContribution = project.category === 'oss-contribution';
  const isJspm = project.id === 'jspm';

  if (isContribution) {
    const primaryRepo = repos[0];
    const fallbackStars = getStarsFromRepo(primaryRepo);
    const stars = selectStars(metricsStars, fallbackStars);
    const primaryUrl = primaryRepo.url;
    const shouldShowStars = !isJspm;
    const contributorId = `${id}-contributor`;
    const starsId = `${id}-stars`;

    if (!shouldShowStars) {
      return (
        <div className={STARLINK_STYLES.wrapper}>
          <ContributorBadge id={contributorId} className={className} />
        </div>
      );
    }

    return (
      <div className={STARLINK_STYLES.wrapper}>
        <ContributorBadge id={contributorId} className={className} />
        <StarCount
          stars={stars}
          url={primaryUrl}
          id={starsId}
          className={className}
          iconClassName={iconClassName}
          loading={loading}
        />
      </div>
    );
  }

  const hasFork = repos.length > 1;

  if (hasFork) {
    const forkElements = repos.map((repo, index) => {
      const repoStars = getStarsFromRepo(repo);
      const orgName = extractOrgName(repo.url);
      const forkId = `${id}-${index}`;

      return (
        <ForkStarCount
          key={repo.url}
          stars={repoStars}
          url={repo.url}
          orgName={orgName}
          id={forkId}
          className={className}
          iconClassName={iconClassName}
          loading={loading}
        />
      );
    });

    return (
      <div className={STARLINK_STYLES.wrapper}>
        {forkElements}
      </div>
    );
  }

  const primaryRepo = repos[0];
  const fallbackStars = getStarsFromRepo(primaryRepo);
  const stars = selectStars(metricsStars, fallbackStars);

  return (
    <StarCount
      stars={stars}
      url={primaryRepo.url}
      id={id}
      className={className}
      iconClassName={iconClassName}
      loading={loading}
    />
  );
}
