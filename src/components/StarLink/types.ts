import type { Project } from '@/data/projects';

export interface StarLinkProps {
  project: Project;
  id: string;
  className?: string;
  iconClassName?: string;
}
