const TAG_BADGE_LAYOUT = 'cursor-pointer bg-transparent border-transparent px-1! py-0.5!';
const TAG_BADGE_STYLE = 'text-sm font-bold text-foreground';
const TAG_BADGE_HOVER = 'hover:bg-foreground/10';

const LINK_BADGE_LAYOUT = 'cursor-pointer bg-transparent border-transparent px-1! py-0.5!';
const LINK_BADGE_STYLE = 'text-sm font-bold text-[var(--color-link-visited)]';
const LINK_BADGE_HOVER = 'hover:underline hover:bg-transparent!';

export const DETAIL_STYLES = {
  section: 'py-8 border-t-4 lg:border-t-2 border-foreground lg:mr-12',
  content: '',
  description: 'text-lg leading-loose pb-2',
  header: {
    wrapper: '',
    titleRow: 'flex items-center gap-3',
    title: 'text-3xl! lg:text-5xl! font-black! text-[var(--color-link-nav)]',
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
    badge: `${TAG_BADGE_LAYOUT} ${TAG_BADGE_STYLE} ${TAG_BADGE_HOVER}`,
    badgeActive: 'bg-foreground/10 hover:bg-foreground/20',
  },
  links: {
    wrapper: 'flex flex-wrap gap-2',
    badge: `${LINK_BADGE_LAYOUT} ${LINK_BADGE_STYLE} ${LINK_BADGE_HOVER}`,
    icon: 'size-5',
  },
} as const;

export const ANIMATION_CLASSES = {
  hidden: 'opacity-0 translate-y-8',
  visible: 'animate-in fade-in slide-in-from-bottom-4 duration-500',
} as const;
