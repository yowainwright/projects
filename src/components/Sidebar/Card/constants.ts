export const CARD_STYLES = {
  button: 'w-full text-left p-0 m-0',
  content: {
    base: 'cursor-pointer transition-all duration-200 mb-4 pr-4 border-r-4 border-transparent!',
    inactive: 'border-border',
    active: 'border-foreground border-primary!',
  },
  header: 'flex items-start justify-between gap-2 mb-3',
  title: 'font-black text-base',
  stars: 'font-black flex items-center gap-1 shrink-0',
  starsIcon: 'w-3 h-3',
  tagline: 'text-md font-extrabold line-clamp-2 mb-4',
  tags: {
    wrapper: 'flex flex-wrap gap-1.5',
    badge: 'cursor-pointer hover:bg-primary hover:text-primary-foreground text-[10px] font-bold text-primary border-primary rounded-md bg-transparent px-1 py-0.5',
  },
} as const;
