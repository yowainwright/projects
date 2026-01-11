'use client';

import { useMemo } from 'react';
import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import type { GradeData } from '@/data/projects-generated';
import { CHART_HEIGHT, COLORS, STYLES } from './constants';
import type { RadarChartProps, DataPoint } from './types';

const buildChartData = (grade: GradeData): DataPoint[] => [
  { metric: 'Stars', value: grade.stars },
  { metric: 'DL', value: grade.monthlyDownloads },
  { metric: 'Act', value: grade.monthlyActivity },
  { metric: 'Cmt', value: grade.commits },
];

export function RadarChart({ grade, size: _size = CHART_HEIGHT, onClick }: RadarChartProps) {
  const data = useMemo(() => buildChartData(grade), [grade]);
  const score = grade.score;

  return (
    <figure className={STYLES.figure} onClick={onClick}>
      <div className={STYLES.header}>
        <span className={STYLES.label}>Grade</span>
        <span className={STYLES.value}>{score}</span>
      </div>
      <div className={STYLES.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <PolarGrid stroke={COLORS.grid} />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 8, fill: COLORS.muted }} />
            <Radar dataKey="value" stroke={COLORS.chart} fill={COLORS.chart} fillOpacity={COLORS.fillOpacity} />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}
