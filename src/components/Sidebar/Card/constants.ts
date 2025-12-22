export const CARD_STYLES = {
  button: 'w-full text-left p-0 m-0',
  content: {
    base: 'cursor-pointer transition-all duration-200 p-4 border-8 border-transparent!',
    inactive: 'border-border',
    active: 'border-foreground! sidebar-card-active',
  },
  header: 'flex items-start justify-between gap-2 mb-3',
  title: 'font-black text-base',
  stars: 'font-black flex items-center gap-1 shrink-0',
  starsIcon: 'w-3 h-3',
  tagline: 'text-md font-extrabold line-clamp-1 mb-4',
  tags: {
    wrapper: 'flex flex-wrap gap-2',
    badge: 'dark:text-background! cursor-pointer hover:bg-link/75 text-[10px] font-bold text-primary-foreground rounded-md bg-link px-1 py-0.5',
  },
} as const;
