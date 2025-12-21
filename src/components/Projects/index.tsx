import { projects } from '@/data/projects';
import { Detail } from '@/components/Projects/Detail';

export function ProjectList() {
  return (
    <main className="flex-1 min-w-0">
      <div className="max-w-3xl py-8">
        {projects.map((project) => (
          <Detail key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
