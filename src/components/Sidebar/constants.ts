export const SIDEBAR_STYLES = {
  aside: 'lg:sticky lg:top-4 lg:self-start text-foreground',
  container: '',
  search: {
    wrapper: 'relative mb-6 border-1! lg:border-8! rounded-md border-foreground! md:mr-4',
    icon: 'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4',
    input: 'pl-9 border-0!',
  },
  tags: {
    wrapper: 'flex flex-wrap gap-2 mb-6',
    badge: 'cursor-pointer text-xs font-bold bg-foreground text-background hover:bg-foreground/75 rounded-md px-2 py-1',
    closeIcon: 'w-3 h-3 ml-1',
    clearButton: 'text-xs font-bold bg-foreground text-background hover:bg-foreground/75 rounded-md px-2 py-1',
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
    wrapper: 'hidden md:block space-y-8 max-h-[70vh] overflow-y-auto scroll-smooth pr-4 scrollbar-hide',
    empty: 'text-base',
  },
  category: {
    wrapper: '',
    title: 'text-xs! font-semibold uppercase mb-8!',
    list: '',
  },
} as const;
