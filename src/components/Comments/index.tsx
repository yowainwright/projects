'use client';

import { useState } from 'react';
import Giscus from '@giscus/react';
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

const CONTAINER_CLASS = 'mt-8 pt-8 border-t border-border';
const TOGGLE_BUTTON_CLASS = 'flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors';
const GISCUS_CONTAINER_CLASS = 'mt-4';

interface CommentsProps {
  projectId: string;
}

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

function ToggleButton({ isOpen, onClick }: ToggleButtonProps) {
  const Icon = isOpen ? ChevronUp : ChevronDown;
  const label = isOpen ? 'Hide discussion' : 'Show discussion';

  return (
    <button onClick={onClick} className={TOGGLE_BUTTON_CLASS}>
      <MessageSquare className="w-4 h-4" />
      <span>{label}</span>
      <Icon className="w-4 h-4" />
    </button>
  );
}

interface GiscusWidgetProps {
  projectId: string;
}

function GiscusWidget({ projectId }: GiscusWidgetProps) {
  const env = (import.meta as unknown as { env: Record<string, string> }).env;
  const repoId = env.VITE_GISCUS_REPO_ID || '';
  const categoryId = env.VITE_GISCUS_CATEGORY_ID || '';

  return (
    <div className={GISCUS_CONTAINER_CLASS}>
      <Giscus
        id={`comments-${projectId}`}
        repo="yowainwright/projects"
        repoId={repoId}
        category="General"
        categoryId={categoryId}
        mapping="specific"
        term={projectId}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}

export function Comments({ projectId }: CommentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={CONTAINER_CLASS}>
      <ToggleButton isOpen={isOpen} onClick={handleToggle} />
      {isOpen && <GiscusWidget projectId={projectId} />}
    </div>
  );
}
