export const CHART_COLORS = {
  light: {
    primary: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    purple: '#8b5cf6',
    pink: '#ec4899',
  },
  dark: {
    primary: '#60a5fa',
    success: '#34d399',
    warning: '#fbbf24',
    danger: '#f87171',
    purple: '#a78bfa',
    pink: '#f472b6',
  },
};

export const CHART_STYLES = {
  container: {
    width: '100%',
    padding: '20px 0',
  },
  margin: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  grid: {
    strokeDasharray: '3 3',
  },
  line: {
    type: 'monotone' as const,
    strokeWidth: 1,
    dotRadius: 2,
    label: {
      position: 'top' as const,
      fontSize: 12,
    },
  },
  bar: {
    maxBarSize: 100,
  },
  axis: {
    fontSize: 12,
    label: {
      fontSize: 12,
      x: {
        offset: -10,
        position: 'insideBottom' as const,
      },
      y: {
        angle: -90,
        position: 'insideLeft' as const,
      },
    },
  },
  legend: {
    verticalAlign: 'bottom' as const,
    iconSize: 12,
    item: {
      fontSize: 12,
      listStyleType: 'none' as const,
    },
    icon: {
      paddingRight: '2px',
    },
  },
  tooltip: {
    content: {
      backgroundColor: 'var(--background)',
      borderRadius: '5px',
      color: 'var(--foreground)',
      border: '.1rem solid var(--border)',
      padding: '4px 8px',
    },
    item: {
      fontSize: 12,
      lineHeight: 1.8,
      padding: 0,
      margin: 0,
    },
    label: {
      fontSize: 12,
      lineHeight: 1.8,
      margin: 0,
    },
  },
  label: {
    fontSize: 12,
    fontWeight: 500,
  },
};
