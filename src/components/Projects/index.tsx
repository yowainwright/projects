import { Detail } from '@/components/Projects/Detail';
import { PROJECT_LIST_STYLES } from './constants';
import type { ProjectListProps } from './types';

export function ProjectList({ projects, selectedTags, onTagClick, onTitleClick }: ProjectListProps) {
  return (
    <main id="project-list" className={PROJECT_LIST_STYLES.main}>
      <div id="project-list-container" className={PROJECT_LIST_STYLES.container}>
        {projects.map((project) => (
          <Detail
            key={project.id}
            project={project}
            selectedTags={selectedTags}
            onTagClick={onTagClick}
            onTitleClick={onTitleClick}
          />
        ))}
      </div>
    </main>
  );
}
