export const DETAIL_STYLES = {
  section: 'py-8 border-t-4 lg:border-t-2 border-foreground lg:mr-12',
  content: 'space-y-8',
  description: 'text-lg leading-loose pb-2',
  header: {
    wrapper: '',
    titleRow: 'flex items-center gap-3',
    title: 'text-3xl! lg:text-5xl! font-black!',
    stars: 'text-xs font-black! flex items-center gap-1',
    starsIcon: 'w-3.5 h-3.5',
    tagline: 'lg:text-lg font-bold!',
  },
  highlights: {
    wrapper: '',
    title: 'text-xs uppercase font-black! mb-8',
    list: 'list-disc!',
    item: '',
  },
  tags: {
    wrapper: 'flex flex-wrap gap-2',
    badge: 'cursor-pointer hover:bg-foreground/10 text-sm font-bold text-foreground bg-transparent border-transparent px-1 py-0.5',
    badgeActive: 'bg-foreground text-background hover:bg-foreground/75',
  },
  links: {
    wrapper: 'flex flex-wrap gap-2 mt-4!',
    badge: 'cursor-pointer hover:bg-link/75 text-sm font-bold text-background! rounded-md bg-link px-2 py-1 dark:text-[#040b21]!',
    icon: 'size-5',
  },
} as const;

export const ANIMATION_CLASSES = {
  hidden: 'opacity-0 translate-y-8',
  visible: 'animate-in fade-in slide-in-from-bottom-4 duration-500',
} as const;
