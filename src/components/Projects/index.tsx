import { projects } from '@/data/projects';
import { Detail } from '@/components/Projects/Detail';
import { PROJECT_LIST_STYLES } from './constants';

export function ProjectList() {
  return (
    <main id="project-list" className={PROJECT_LIST_STYLES.main}>
      <div id="project-list-container" className={PROJECT_LIST_STYLES.container}>
        {projects.map((project) => (
          <Detail key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
