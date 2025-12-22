export const DETAIL_STYLES = {
  section: 'pb-16 border-t border-foreground first:border-t-0',
  content: 'space-y-8',
  description: 'text-lg leading-loose pb-4',
  header: {
    wrapper: '',
    titleRow: 'flex items-center gap-3',
    title: 'text-3xl! font-black!',
    stars: 'text-sm font-black! flex items-center gap-1',
    starsIcon: 'w-3.5 h-3.5',
    tagline: 'text-lg font-light',
  },
  highlights: {
    wrapper: '',
    title: 'uppercase',
    list: 'grid grid-cols-1 sm:grid-cols-2',
    item: 'flex items-start gap-2',
    checkIcon: 'w-4 h-4 mt-0.5 shrink-0',
  },
  tags: {
    wrapper: 'flex flex-wrap gap-2',
  },
  links: {
    wrapper: 'flex flex-wrap gap-4 pt-2',
    button: 'px-0 text-base',
    icon: 'w-4 h-4',
  },
} as const;
