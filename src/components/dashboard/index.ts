export { MetricTile } from './MetricTile';
export { SectionCard } from './SectionCard';
export { HealthScoreCard } from './HealthScoreCard';
export { DashboardHeader } from './DashboardHeader';
export { DashboardFooter } from './DashboardFooter';

export type {
  PatientInfo,
  DashboardData,
  SectionCardProps,
  MetricTileProps,
  HealthScoreProps,
} from './types';

// Re-export from healthCategories for convenience
export type { HealthMetric, HealthCategory } from '@/constants/healthCategories';
export type { HealthStatus } from '@/types';
