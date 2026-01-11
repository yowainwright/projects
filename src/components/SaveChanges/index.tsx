'use client';

import { useAuth } from '@/hooks/useAuth';
import { useSubmitPR } from '@/hooks/useSubmitPR';
import { Button } from '@/components/ui/button';
import { Save, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/analytics';
import type { Project } from '@/data/projects-generated';

interface SaveChangesProps {
  hasChanges: boolean;
  edits: Record<string, Partial<Project>>;
  onDiscard: () => void;
}

export function SaveChanges({ hasChanges, edits, onDiscard }: SaveChangesProps) {
  const { isAuthenticated } = useAuth();
  const { submitPR, isSubmitting, error: _error } = useSubmitPR();

  const shouldHide = !isAuthenticated || !hasChanges;
  if (shouldHide) {
    return null;
  }

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const projectIds = Object.keys(edits);

    for (const projectId of projectIds) {
      const changes = edits[projectId];
      const hasProjectChanges = Object.keys(changes).length > 0;

      if (hasProjectChanges) {
        const changedFields = Object.keys(changes);
        try {
          const url = await submitPR(projectId, changes);
          trackEvent('pr_submitted', {
            projectId,
            changedFields,
            fieldCount: changedFields.length,
          });
          toast.success('PR created successfully!', {
            description: `Changes for ${projectId} submitted.`,
            action: (
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white font-bold border-0"
                onClick={() => window.open(url!, '_blank')}
              >
                View PR
              </Button>
            ),
          });
          onDiscard();
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          trackEvent('pr_submission_failed', {
            projectId,
            changedFields,
            error: message,
          });
          toast.error('Failed to create PR', {
            description: message,
          });
        }
      }
    }
  };

  const submitIcon = isSubmitting
    ? <Loader2 className="size-5 animate-spin" />
    : <Save className="size-5" />;

  const submitLabel = isSubmitting ? 'Creating PR...' : 'Submit PR';

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 animate-in fade-in zoom-in-50 duration-300">
      <Button
        variant="outline"
        onClick={() => onDiscard()}
        disabled={isSubmitting}
        className="font-bold border-2 border-foreground"
      >
        <X className="size-5" />
        Discard
      </Button>
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="font-bold bg-link hover:bg-link/75 text-background dark:text-[#040b21]"
      >
        {submitIcon}
        {submitLabel}
      </Button>
    </div>
  );
}
