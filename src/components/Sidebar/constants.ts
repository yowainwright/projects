export const SIDEBAR_STYLES = {
  aside: 'lg:sticky lg:top-4 lg:self-start text-foreground',
  container: '',
  search: {
    wrapper: 'relative mb-6 border-3! rounded-md border-foreground!',
    icon: 'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4',
    input: 'pl-9 border-0',
  },
  tags: {
    wrapper: 'flex flex-wrap gap-2 mb-6',
    badge: 'cursor-pointer',
    closeIcon: 'w-3 h-3 ml-1',
    clearButton: 'text-sm text-muted-foreground hover:text-foreground hover:underline',
  },
  filterCount: 'text-sm mb-6',
  filterBadges: {
    wrapper: 'mt-8 pt-6 border-t border-foreground',
    title: 'text-sm font-bold uppercase tracking-wider text-foreground mb-4',
    list: 'flex flex-wrap gap-2',
    badge: 'cursor-pointer border-foreground',
    badgeActive: 'bg-primary text-primary-foreground',
  },
  nav: {
    wrapper: 'hidden md:block space-y-8',
    empty: 'text-base',
  },
  category: {
    wrapper: '',
    title: 'uppercase mb-4',
    list: '',
  },
} as const;
