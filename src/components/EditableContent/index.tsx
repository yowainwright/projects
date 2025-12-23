'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface EditableContentProps {
  value: string;
  onChange: (value: string) => void;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div';
  className?: string;
  placeholder?: string;
}

export function EditableContent({
  value,
  onChange,
  as: Tag = 'div',
  className = '',
  placeholder = 'Click to edit...',
}: EditableContentProps) {
  const { isAuthenticated } = useAuth();
  const ref = useRef<HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const shouldSyncContent = Boolean(ref.current) && !isEditing;

  useEffect(() => {
    if (shouldSyncContent) {
      ref.current!.textContent = value;
    }
  }, [value, shouldSyncContent]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);

    const element = ref.current;
    if (!element) return;

    const newValue = element.textContent ?? '';
    const hasChanged = newValue !== value;

    if (hasChanged) {
      onChange(newValue);
    }
  }, [onChange, value]);

  const handleFocus = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const isEscapeKey = e.key === 'Escape';
      const isEnterWithoutShift = e.key === 'Enter' && !e.shiftKey;

      if (isEscapeKey) {
        ref.current?.blur();
        if (ref.current) {
          ref.current.textContent = value;
        }
        return;
      }

      if (isEnterWithoutShift) {
        e.preventDefault();
        ref.current?.blur();
      }
    },
    [value]
  );

  if (!isAuthenticated) {
    const displayValue = value || placeholder;
    return <Tag className={className}>{displayValue}</Tag>;
  }

  const editableClassName = `${className} outline-none ring-2 ring-transparent focus:ring-blue-500/50 rounded cursor-text`;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      className={editableClassName}
      data-placeholder={placeholder}
    >
      {value}
    </Tag>
  );
}
