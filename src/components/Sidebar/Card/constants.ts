const CARD_TAG_LAYOUT = 'cursor-pointer rounded-md bg-transparent border-transparent px-1! py-0.5!';
const CARD_TAG_STYLE = 'text-xs font-bold text-foreground';
const CARD_TAG_HOVER = 'hover:bg-foreground/10';

export const CARD_STYLES = {
  button: 'w-full text-right p-0 m-0',
  content: {
    base: 'cursor-pointer mb-6 p-4 border-r-3 border-transparent! sidebar-card',
    inactive: '',
    active: 'border-foreground! sidebar-card-active',
  },
  header: 'flex items-start justify-end gap-2 mb-1',
  title: 'font-black text-base text-[var(--color-link-nav)]',
  tagline: 'text-sm! line-clamp-2 mb-3 text-right',
  tags: {
    wrapper: 'flex flex-wrap gap-2 justify-end',
    badge: `${CARD_TAG_LAYOUT} ${CARD_TAG_STYLE} ${CARD_TAG_HOVER}`,
    badgeActive: 'bg-foreground/10 hover:bg-foreground/20',
  },
} as const;
