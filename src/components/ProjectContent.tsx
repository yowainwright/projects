import { useMemo } from 'react';
import { projects } from '@/data/projects';
import { Sidebar } from '@/components/Sidebar';
import { ProjectList } from '@/components/ProjectList';
import { useScrollspy } from '@/hooks/useScrollspy';
import '@/styles/content.css';

export function ProjectContent() {
  const projectIds = useMemo(() => projects.map((p) => p.id), []);
  const { activeId, scrollTo } = useScrollspy(projectIds, 150);

  return (
    <section className="projects-content grid lg:grid-cols-[calc(35%-2rem)_calc(65%-2rem)] gap-8 lg:gap-16">
      <Sidebar activeId={activeId} onProjectClick={scrollTo} />
      <ProjectList />
    </section>
  );
}
