import { useState, useEffect, useCallback, useRef } from 'react';

export function useScrollspy(ids: string[], offset: number = 100) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialHashHandled = useRef(false);

  const setScrolling = useCallback((value: boolean) => {
    isScrollingRef.current = value;
    if (value) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  }, []);

  const updateActiveId = useCallback((id: string | null) => {
    if (activeIdRef.current !== id) {
      activeIdRef.current = id;
      setActiveId(id);
    }
  }, []);

  const scrollToId = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        setScrolling(true);
        updateActiveId(id);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `#${id}`);
      }
    },
    [setScrolling, updateActiveId]
  );

  // Handle initial hash on page load only
  useEffect(() => {
    if (initialHashHandled.current) return;
    initialHashHandled.current = true;

    const hash = window.location.hash.slice(1);
    if (hash && ids.includes(hash)) {
      requestAnimationFrame(() => {
        scrollToId(hash);
      });
    }
  }, [ids, scrollToId]);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPosition = window.scrollY + offset;

      for (let i = ids.length - 1; i >= 0; i--) {
        const element = document.getElementById(ids[i]);
        if (element && element.offsetTop <= scrollPosition) {
          updateActiveId(ids[i]);
          return;
        }
      }

      if (ids.length > 0) {
        updateActiveId(ids[0]);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [ids, offset, updateActiveId]);

  return { activeId, scrollTo: scrollToId };
}
