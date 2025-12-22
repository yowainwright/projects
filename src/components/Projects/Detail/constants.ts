export const DETAIL_STYLES = {
  section: 'py-8 border-t border-foreground first:border-t-0 first-of-type:pt-0!',
  content: 'space-y-8',
  description: 'text-lg leading-loose pb-2',
  header: {
    wrapper: '',
    titleRow: 'flex items-center gap-3',
    title: 'text-3xl! font-black!',
    stars: 'text-sm font-black! flex items-center gap-1',
    starsIcon: 'w-3.5 h-3.5',
    tagline: 'text-lg font-semibold!',
  },
  highlights: {
    wrapper: '',
    title: 'text-lg font-black!',
    list: 'list-disc',
    item: '',
  },
  tags: {
    wrapper: 'flex flex-wrap gap-2',
    badge: 'dark:text-background! cursor-pointer hover:bg-link/75 text-[10px] font-bold text-primary-foreground rounded-md bg-link px-1 py-0.5',
  },
  links: {
    wrapper: 'flex flex-wrap gap-4 pt-2',
    button: 'px-0 text-base',
    icon: 'w-4 h-4',
  },
} as const;
