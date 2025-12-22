export const CARD_STYLES = {
  button: 'w-full text-left p-0 m-0',
  content: {
    base: 'cursor-pointer p-4 border-8 border-transparent! sidebar-card',
    inactive: 'border-border',
    active: 'border-foreground! sidebar-card-active',
  },
  header: 'flex items-start justify-between gap-2 mb-3',
  title: 'font-black text-base lg:text-2xl',
  stars: 'font-black flex items-center gap-1 shrink-0',
  starsIcon: 'w-3 h-3',
  tagline: 'text-md font-extrabold line-clamp-2 mb-4',
  tags: {
    wrapper: 'flex flex-wrap gap-2',
    badge: 'cursor-pointer hover:bg-foreground/10 text-[10px] font-bold text-foreground rounded-md bg-transparent border border-foreground px-1 py-0.5',
    badgeActive: 'bg-foreground text-background hover:bg-foreground/75',
  },
} as const;
