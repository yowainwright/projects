import { useState, useEffect, useCallback, useRef } from 'react';

export function useScrollspy(ids: string[], offset: number = 100) {
  const [activeId, setActiveId] = useState<string | null>(null);
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

  const scrollToId = useCallback(
    (id: string, updateHash: boolean = true) => {
      const element = document.getElementById(id);
      if (element) {
        setScrolling(true);
        setActiveId(id);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (updateHash) {
          window.history.replaceState(null, '', `#${id}`);
        }
      }
    },
    [setScrolling]
  );

  useEffect(() => {
    if (initialHashHandled.current) return;
    initialHashHandled.current = true;

    const hash = window.location.hash.slice(1);
    if (hash && ids.includes(hash)) {
      requestAnimationFrame(() => {
        scrollToId(hash, false);
      });
    }
  }, [ids, scrollToId]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && ids.includes(hash)) {
        scrollToId(hash, false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [ids, scrollToId]);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPosition = window.scrollY + offset;

      for (let i = ids.length - 1; i >= 0; i--) {
        const element = document.getElementById(ids[i]);
        if (element && element.offsetTop <= scrollPosition) {
          if (activeId !== ids[i]) {
            setActiveId(ids[i]);
            window.history.replaceState(null, '', `#${ids[i]}`);
          }
          return;
        }
      }

      if (ids.length > 0 && activeId !== ids[0]) {
        setActiveId(ids[0]);
        window.history.replaceState(null, '', `#${ids[0]}`);
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
  }, [ids, offset, activeId]);

  return { activeId, scrollTo: scrollToId };
}
