'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSubmitPR } from '@/hooks/useSubmitPR';
import { Save, ExternalLink, X, Loader2 } from 'lucide-react';
import type { Project } from '@/data/projects';

interface SaveChangesProps {
  hasChanges: boolean;
  edits: Record<string, Partial<Project>>;
  onDiscard: () => void;
}

const CONTAINER_CLASS = 'fixed bottom-4 right-4 z-50 flex items-center gap-2';
const SUCCESS_CONTAINER_CLASS = 'fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 bg-green-500 text-white rounded-lg shadow-lg';
const DISCARD_BUTTON_CLASS = 'flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors';
const SUBMIT_BUTTON_CLASS = 'flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50';
const ERROR_CLASS = 'text-sm text-red-500 bg-red-50 px-3 py-2 rounded';

interface SuccessBannerProps {
  prUrl: string;
  onDismiss: () => void;
}

function SuccessBanner({ prUrl, onDismiss }: SuccessBannerProps) {
  return (
    <div className={SUCCESS_CONTAINER_CLASS}>
      <span>PR created!</span>
      <a
        href={prUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 underline"
      >
        View PR <ExternalLink className="w-4 h-4" />
      </a>
      <button onClick={onDismiss} className="p-1 hover:bg-green-600 rounded">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

interface SubmitButtonProps {
  isSubmitting: boolean;
  onClick: () => void;
}

function SubmitButton({ isSubmitting, onClick }: SubmitButtonProps) {
  const icon = isSubmitting
    ? <Loader2 className="w-4 h-4 animate-spin" />
    : <Save className="w-4 h-4" />;

  const label = isSubmitting ? 'Creating PR...' : 'Submit PR';

  return (
    <button onClick={onClick} disabled={isSubmitting} className={SUBMIT_BUTTON_CLASS}>
      {icon}
      {label}
    </button>
  );
}

interface DiscardButtonProps {
  isDisabled: boolean;
  onClick: () => void;
}

function DiscardButton({ isDisabled, onClick }: DiscardButtonProps) {
  return (
    <button onClick={onClick} className={DISCARD_BUTTON_CLASS} disabled={isDisabled}>
      <X className="w-4 h-4" />
      Discard
    </button>
  );
}

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return <span className={ERROR_CLASS}>{message}</span>;
}

export function SaveChanges({ hasChanges, edits, onDiscard }: SaveChangesProps) {
  const { isAuthenticated } = useAuth();
  const { submitPR, isSubmitting, error, prUrl } = useSubmitPR();
  const [showSuccess, setShowSuccess] = useState(false);

  const shouldHide = !isAuthenticated || !hasChanges;
  if (shouldHide) {
    return null;
  }

  const handleSubmit = async () => {
    const projectIds = Object.keys(edits);

    for (const projectId of projectIds) {
      const changes = edits[projectId];
      const hasProjectChanges = Object.keys(changes).length > 0;

      if (hasProjectChanges) {
        const url = await submitPR(projectId, changes);
        const wasSuccessful = Boolean(url);

        if (wasSuccessful) {
          setShowSuccess(true);
        }
      }
    }
  };

  const handleDismissSuccess = () => {
    setShowSuccess(false);
    onDiscard();
  };

  const shouldShowSuccess = showSuccess && prUrl;
  if (shouldShowSuccess) {
    return <SuccessBanner prUrl={prUrl} onDismiss={handleDismissSuccess} />;
  }

  return (
    <div className={CONTAINER_CLASS}>
      {error && <ErrorMessage message={error} />}
      <DiscardButton isDisabled={isSubmitting} onClick={onDiscard} />
      <SubmitButton isSubmitting={isSubmitting} onClick={handleSubmit} />
    </div>
  );
}
