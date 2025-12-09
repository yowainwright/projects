import { useState, useEffect, useCallback, useRef } from 'react';

export function useScrollspy(ids: string[], offset: number = 100) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPosition = window.scrollY + offset;

      for (let i = ids.length - 1; i >= 0; i--) {
        const element = document.getElementById(ids[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(ids[i]);
          return;
        }
      }

      if (ids.length > 0) {
        setActiveId(ids[0]);
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
  }, [ids, offset]);

  const scrollTo = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        setScrolling(true);
        setActiveId(id);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [setScrolling]
  );

  return { activeId, scrollTo };
}
