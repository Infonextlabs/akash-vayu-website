import { useCallback, useEffect, useState } from 'react';

export type SectionRoute =
  | 'home'
  | 'about'
  | 'technology'
  | 'vision'
  | 'projects'
  | 'careers'
  | 'contact'
  | 'get-orbit';

export interface ParsedRoute {
  section: SectionRoute;
  detailType: 'technology' | 'projects' | 'careers' | null;
  detailId: string | null;
}

export function parsePathname(pathname: string): ParsedRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const parts = clean.split('/').filter(Boolean);

  if (parts.length === 0) {
    return { section: 'home', detailType: null, detailId: null };
  }

  const [first, second] = parts;
  if (first === 'technology' && second) {
    return { section: 'technology', detailType: 'technology', detailId: second };
  }
  if (first === 'projects' && second) {
    return { section: 'projects', detailType: 'projects', detailId: second };
  }
  if (first === 'careers' && second) {
    return { section: 'careers', detailType: 'careers', detailId: second };
  }

  const validSections: SectionRoute[] = [
    'about',
    'technology',
    'vision',
    'projects',
    'careers',
    'contact',
    'get-orbit',
  ];

  if (validSections.includes(first as SectionRoute)) {
    return { section: first as SectionRoute, detailType: null, detailId: null };
  }

  return { section: 'home', detailType: null, detailId: null };
}

export function useRouter() {
  const [route, setRoute] = useState<ParsedRoute>(() =>
    typeof window !== 'undefined'
      ? parsePathname(window.location.pathname)
      : { section: 'home', detailType: null, detailId: null },
  );

  const scrollToSection = useCallback((section: SectionRoute) => {
    if (section === 'home' || section === 'get-orbit') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const navigate = useCallback(
    (path: string, options?: { skipScroll?: boolean }) => {
      if (typeof window === 'undefined') return;
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
      const next = parsePathname(path);
      setRoute(next);
      if (!options?.skipScroll && !next.detailId) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => scrollToSection(next.section));
        });
      }
    },
    [scrollToSection],
  );

  useEffect(() => {
    const handlePopState = () => {
      const next = parsePathname(window.location.pathname);
      setRoute(next);
      if (!next.detailId) {
        requestAnimationFrame(() => scrollToSection(next.section));
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [scrollToSection]);

  useEffect(() => {
    // Handle initial deep link scroll if loaded directly on a section path
    if (route.section !== 'home' && !route.detailId) {
      const timer = window.setTimeout(() => scrollToSection(route.section), 80);
      return () => window.clearTimeout(timer);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { route, navigate, scrollToSection };
}
