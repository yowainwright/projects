'use client';

import { useMemo } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';
import { GitCommitHorizontal } from 'lucide-react';
import type { LineChartProps, Series } from './types';
import { CHART_COLORS, CHART_STYLES } from './constants';
import type { LabelPosition } from 'recharts/types/component/Label';

const formatChartData = (data: Series[]) => {
  const allPrimaryKeys = [...new Set(data.flatMap((s) => s.data.map((d) => d.primary)))].sort();
  return allPrimaryKeys.map((primary) => {
    const dataPoint: Record<string, string | number | undefined> = { primary };
    data.forEach((s) => {
      const match = s.data.find((d) => d.primary === primary);
      dataPoint[s.label] = match?.secondary;
    });
    return dataPoint;
  });
};

interface LegendPayloadEntry {
  color?: string;
  value?: string;
}

const LegendContent = ({ payload }: { payload?: readonly LegendPayloadEntry[] }) => (
  <ul className="flex gap-4 justify-center">
    {payload?.map((entry, index) => (
      <li
        key={`item-${index}`}
        className="flex items-center gap-1 text-xs"
        style={{ listStyleType: 'none' }}
      >
        <GitCommitHorizontal size={12} style={{ color: entry.color }} />
        {entry.value}
      </li>
    ))}
  </ul>
);

export function LineChart({
  data,
  primaryLabel = '',
  secondaryLabel = '',
  height = '400px',
  yDomain,
}: LineChartProps) {
  const colors = Object.values(CHART_COLORS.light);
  const series = useMemo(() => data.map((s) => s.label), [data]);
  const formattedData = useMemo(() => formatChartData(data), [data]);

  return (
    <div style={{ ...CHART_STYLES.container, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={formattedData} margin={CHART_STYLES.margin}>
          <CartesianGrid strokeDasharray={CHART_STYLES.grid.strokeDasharray} />
          <XAxis dataKey="primary" fontSize={CHART_STYLES.axis.fontSize}>
            {primaryLabel && (
              <Label
                value={primaryLabel}
                offset={CHART_STYLES.axis.label.x.offset}
                position={CHART_STYLES.axis.label.x.position}
                fontSize={CHART_STYLES.axis.label.fontSize}
              />
            )}
          </XAxis>
          <YAxis fontSize={CHART_STYLES.axis.fontSize} domain={yDomain}>
            {secondaryLabel && (
              <Label
                value={secondaryLabel}
                angle={CHART_STYLES.axis.label.y.angle}
                position={CHART_STYLES.axis.label.y.position}
                fontSize={CHART_STYLES.axis.label.fontSize}
              />
            )}
          </YAxis>
          <Tooltip
            contentStyle={CHART_STYLES.tooltip.content}
            itemStyle={CHART_STYLES.tooltip.item}
            labelStyle={CHART_STYLES.tooltip.label}
          />
          <Legend verticalAlign={CHART_STYLES.legend.verticalAlign} content={LegendContent} />
          {series.map((seriesLabel, index) => (
            <Line
              key={seriesLabel}
              type={CHART_STYLES.line.type}
              dataKey={seriesLabel}
              stroke={colors[index % colors.length]}
              strokeWidth={CHART_STYLES.line.strokeWidth}
              dot={{ r: CHART_STYLES.line.dotRadius }}
              label={{
                position: CHART_STYLES.line.label.position as LabelPosition,
                fontSize: CHART_STYLES.line.label.fontSize,
              }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
