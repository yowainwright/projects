'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import type { GradeData } from '@/data/projects-generated';
import { COLORS, STYLES } from './constants';

interface GradeDetailProps {
  grade: GradeData;
}

interface MetricRow {
  label: string;
  value: number;
  normalized: number;
}

export function GradeDetail({ grade }: GradeDetailProps) {
  const metrics: MetricRow[] = [
    { label: 'Stars', value: grade.stars, normalized: grade.stars },
    { label: 'Monthly Downloads', value: grade.monthlyDownloads, normalized: grade.monthlyDownloads },
    { label: 'Monthly Activity', value: grade.monthlyActivity, normalized: grade.monthlyActivity },
    { label: 'Commits', value: grade.commits, normalized: grade.commits },
  ];

  const radarData = metrics.map((m) => ({
    metric: m.label,
    value: m.normalized,
  }));

  return (
    <div>
      <div className="mb-4!">
        <div className="text-sm! text-muted-foreground!">Overall Score</div>
        <div className="text-4xl! font-bold! tabular-nums!">{grade.score}</div>
      </div>
      <div className="flex! gap-8!">
        <div className="w-[200px]! h-[200px]!">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke={COLORS.grid} />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} />
              <Radar dataKey="value" stroke={COLORS.chart} fill={COLORS.chart} fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <table className={STYLES.table}>
          <thead>
            <tr>
              <th className={STYLES.tableHeader}>Metric</th>
              <th className={STYLES.tableHeader}>Score</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((m) => (
              <tr key={m.label} className={STYLES.tableRow}>
                <td className={STYLES.tableCell}>{m.label}</td>
                <td className={STYLES.tableCellNum}>{m.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
