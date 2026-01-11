export const CHART_WIDTH = 100;
export const CHART_HEIGHT = 40;
export const CONTAINER_HEIGHT = 56;

export const COLORS = {
  chart: '#6b7280',
  muted: '#9ca3af',
  grid: '#e5e7eb',
  fillOpacity: 0.3,
} as const;

const FIGURE_MARGIN = 'my-0! ml-0! mr-3!';
const FIGURE_LAYOUT = 'inline-block! align-bottom!';
const FIGURE_SIZE = 'w-[100px]! h-[56px]!';

export const STYLES = {
  figure: `${FIGURE_MARGIN} ${FIGURE_LAYOUT} ${FIGURE_SIZE} cursor-pointer!`,
  header: 'flex! justify-between! items-baseline! mb-0.5!',
  label: 'text-[8px]! text-[#9ca3af]!',
  value: 'text-xs! font-medium! tabular-nums!',
  chart: 'w-[100px]! h-[40px]!',
} as const;
