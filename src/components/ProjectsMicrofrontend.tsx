import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const ProjectContent = lazy(() =>
  import('./ProjectContent').then((m) => ({ default: m.ProjectContent }))
);

export function ProjectsMicrofrontend() {
  return (
    <Suspense
      fallback={
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <Loader2 style={{ width: '2rem', height: '2rem', animation: 'spin 1s linear infinite' }} />
        </div>
      }
    >
      <ProjectContent />
    </Suspense>
  );
}
