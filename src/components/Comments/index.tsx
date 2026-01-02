'use client';

import { useState } from 'react';
import Giscus from '@giscus/react';
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

const CONTAINER_CLASS = 'mt-8 pt-8 border-t border-border';
const TOGGLE_BUTTON_CLASS = 'flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors';
const GISCUS_CONTAINER_CLASS = 'mt-4';
const GISCUS_HIDDEN_CLASS = 'sr-only';

interface CommentsProps {
  projectId: string;
}

interface ToggleButtonProps {
  isOpen: boolean;
  onHover: () => void;
  onClick: () => void;
}

function ToggleButton({ isOpen, onHover, onClick }: ToggleButtonProps) {
  const Icon = isOpen ? ChevronUp : ChevronDown;
  const label = isOpen ? 'Hide discussion' : 'Show discussion';

  return (
    <button onMouseEnter={onHover} onFocus={onHover} onClick={onClick} className={TOGGLE_BUTTON_CLASS}>
      <MessageSquare className="w-4 h-4" />
      <span>{label}</span>
      <Icon className="w-4 h-4" />
    </button>
  );
}

interface GiscusWidgetProps {
  projectId: string;
  hidden?: boolean;
}

function GiscusWidget({ projectId, hidden = false }: GiscusWidgetProps) {
  const env = (import.meta as unknown as { env: Record<string, string> }).env;
  const repoId = env.VITE_GISCUS_REPO_ID || '';
  const categoryId = env.VITE_GISCUS_CATEGORY_ID || '';
  const containerClass = hidden ? GISCUS_HIDDEN_CLASS : GISCUS_CONTAINER_CLASS;

  return (
    <div className={containerClass}>
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
  const [shouldPreload, setShouldPreload] = useState(false);

  const handlePreload = () => {
    if (!shouldPreload) setShouldPreload(true);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const showWidget = isOpen || shouldPreload;

  return (
    <div className={CONTAINER_CLASS}>
      <ToggleButton isOpen={isOpen} onHover={handlePreload} onClick={handleToggle} />
      {showWidget && <GiscusWidget projectId={projectId} hidden={!isOpen} />}
    </div>
  );
}
