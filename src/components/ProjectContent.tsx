import { useMemo } from 'react';
import { projects } from '@/data/projects';
import { Sidebar } from '@/components/Sidebar';
import { ProjectList } from '@/components/Projects';
import { useScrollspy } from '@/hooks/useScrollspy';
import { PROJECT_CONTENT_STYLES } from './ProjectContent.constants';
import '@/styles/content.css';

export function ProjectContent() {
  const projectIds = useMemo(() => projects.map((p) => p.id), []);
  const { activeId, scrollTo } = useScrollspy(projectIds, 150);

  return (
    <section id="projects-content" className={PROJECT_CONTENT_STYLES.section}>
      <Sidebar activeId={activeId} onProjectClick={scrollTo} />
      <ProjectList />
    </section>
  );
}
