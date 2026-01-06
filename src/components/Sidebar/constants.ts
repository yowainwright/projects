export const SIDEBAR_STYLES = {
  aside: 'lg:sticky lg:top-4 lg:self-start text-foreground text-right',
  container: '',
  search: {
    wrapper: 'relative mb-2 lg:mb-6 border-1! rounded-md border-foreground! mr-2',
    icon: 'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4',
    input: 'pl-9 border-0! text-left',
  },
  tags: {
    wrapper: 'flex flex-wrap gap-2 mb-6 justify-end ml-4 pr-4',
    badge: 'cursor-pointer text-xs font-bold bg-foreground/10 text-foreground hover:bg-foreground/20 rounded-md px-1! py-0.5!',
    closeIcon: 'w-3 h-3 ml-1',
    clearButton: 'text-xs font-bold bg-foreground/10 text-foreground hover:bg-foreground/20 rounded-md px-1! py-0.5! h-auto!',
  },
  filterCount: 'text-sm mb-6 text-right ml-4 pr-4',
  filterBadges: {
    wrapper: 'mt-8 pt-6 border-t border-foreground ml-4 pr-4',
    title: 'text-sm font-bold uppercase tracking-wider text-foreground mb-4 text-right',
    list: 'flex flex-wrap gap-2 justify-end',
    badge: 'cursor-pointer border-foreground',
    badgeActive: 'bg-primary text-primary-foreground',
  },
  nav: {
    wrapper: 'hidden md:block space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto overflow-x-visible scroll-smooth ml-4 pr-4 scrollbar-hide',
    empty: 'text-base text-right',
  },
  category: {
    wrapper: '',
    header: 'sticky top-0 bg-background z-10 pb-2 border-b',
    title: 'text-xs! font-semibold uppercase mb-0! text-right mr-5!',
    list: 'mt-0!',
    item: ''
  },
} as const;
