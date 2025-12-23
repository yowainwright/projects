export interface DataPoint {
  primary: string | number;
  secondary: number;
}

export interface Series {
  label: string;
  data: DataPoint[];
}

export interface BarChartProps {
  data: Series[];
  primaryLabel?: string;
  secondaryLabel?: string;
  height?: string;
}

export interface LineChartProps {
  data: Series[];
  primaryLabel?: string;
  secondaryLabel?: string;
  height?: string;
  yDomain?: [number, number];
}
