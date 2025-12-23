export const DETAIL_STYLES = {
  section: 'py-8 border-t-10 border-foreground lg:mr-8',
  content: 'space-y-8',
  description: 'text-lg leading-loose pb-2',
  header: {
    wrapper: '',
    titleRow: 'flex items-center gap-3',
    title: 'text-2xl! lg:text-5xl! font-black!',
    stars: 'text-xs font-black! flex items-center gap-1',
    starsIcon: 'w-3.5 h-3.5',
    tagline: 'lg:text-lg',
  },
  highlights: {
    wrapper: '',
    title: 'text-xs uppercase font-black! mb-8',
    list: 'list-disc',
    item: '',
  },
  tags: {
    wrapper: 'flex flex-wrap gap-2',
    badge: 'cursor-pointer hover:bg-foreground/10 text-sm font-bold text-foreground bg-transparent border-transparent px-1 py-0.5',
    badgeActive: 'bg-foreground text-background hover:bg-foreground/75',
  },
  links: {
    wrapper: 'flex flex-wrap gap-2',
    badge: 'cursor-pointer hover:bg-link/75 text-sm font-bold text-background rounded-md bg-link px-2 py-1 dark:text-[#040b21]!',
    icon: 'size-5',
  },
} as const;
