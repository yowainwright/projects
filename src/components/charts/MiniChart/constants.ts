export const CHART_WIDTH = 100;
export const CHART_HEIGHT = 24;
export const CONTAINER_HEIGHT = 48;

export const COLORS = {
  chart: '#6b7280',
  muted: '#9ca3af',
  gradientStart: 0.3,
  gradientEnd: 0,
} as const;

const FIGURE_MARGIN = 'my-0! ml-0! mr-3!';
const FIGURE_LAYOUT = 'inline-block! align-bottom!';
const FIGURE_SIZE = 'w-[100px]! h-[48px]!';

export const STYLES = {
  figure: `${FIGURE_MARGIN} ${FIGURE_LAYOUT} ${FIGURE_SIZE} cursor-pointer!`,
  header: 'flex! justify-between! items-baseline! mb-0.5!',
  label: 'text-[8px]! text-[#9ca3af]!',
  value: 'text-xs! font-medium! tabular-nums!',
  dateRange: 'text-[7px]! text-[#9ca3af]! block! mb-1!',
  chart: 'w-[100px]! h-[24px]!',
} as const;
