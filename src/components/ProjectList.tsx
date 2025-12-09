import { projects } from '@/data/projects';
import { ProjectDetail } from '@/components/ProjectDetail';

export function ProjectList() {
  return (
    <main className="flex-1 min-w-0">
      <div className="max-w-3xl mx-auto px-8 py-16">
        {projects.map((project) => (
          <ProjectDetail key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
