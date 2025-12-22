export const DETAIL_STYLES = {
  section: 'py-8 border-t border-foreground first:border-t-0 first-of-type:pt-0! lg:mr-8',
  content: 'space-y-8',
  description: 'text-lg leading-loose pb-2',
  header: {
    wrapper: '',
    titleRow: 'flex items-center gap-3',
    title: 'text-2xl! lg:text-5xl! font-black!',
    stars: 'text-sm font-black! flex items-center gap-1',
    starsIcon: 'w-3.5 h-3.5',
    tagline: 'lg:text-lg font-semibold!',
  },
  highlights: {
    wrapper: '',
    title: 'text-lg font-black!',
    list: 'list-disc',
    item: '',
  },
  tags: {
    wrapper: 'flex flex-wrap gap-2',
    badge: 'cursor-pointer hover:bg-foreground/10 text-[10px] font-bold text-foreground rounded-md bg-transparent border border-foreground px-1 py-0.5',
    badgeActive: 'bg-foreground text-background hover:bg-foreground/75',
  },
  links: {
    wrapper: 'flex flex-wrap gap-2',
    badge: 'cursor-pointer hover:bg-link/75 text-sm font-bold text-background rounded-md bg-link px-2 py-1 dark:text-[#040b21]!',
    icon: 'size-5',
  },
} as const;
