import type { Project } from '@/data/projects-generated';

export interface StarLinkProps {
  project: Project;
  id: string;
  className?: string;
  iconClassName?: string;
}
