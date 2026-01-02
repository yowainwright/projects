import type { Project } from '@/data/projects-generated';

export interface StarLinkProps {
  project: Project;
  id: string;
  className?: string;
  iconClassName?: string;
}

export interface StarCountProps {
  fallbackStars: number;
  url: string;
  id: string;
  className?: string;
  iconClassName?: string;
}

export interface ForkStarCountProps {
  fallbackStars: number;
  url: string;
  orgName: string;
  id: string;
  className?: string;
  iconClassName?: string;
}

export interface ContributorBadgeProps {
  id: string;
  className?: string;
}
