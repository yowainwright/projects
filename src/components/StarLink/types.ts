import type { Project } from '@/data/projects-generated';

export interface StarLinkProps {
  project: Project;
  id: string;
  className?: string;
  iconClassName?: string;
}

export interface StarCountProps {
  stars: number;
  url: string;
  id: string;
  className?: string;
  iconClassName?: string;
  loading?: boolean;
}

export interface ForkStarCountProps {
  stars: number;
  url: string;
  orgName: string;
  id: string;
  className?: string;
  iconClassName?: string;
  loading?: boolean;
}

export interface ContributorBadgeProps {
  id: string;
  className?: string;
}
