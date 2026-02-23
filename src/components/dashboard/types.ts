'use client';

import type { HealthStatus } from '@/types';
import type { HealthMetric, HealthCategory } from '@/constants/healthCategories';

/**
 * Dashboard Component Types
 * Type definitions for health metrics and dashboard data structures
 */

export interface PatientInfo {
  name: string;
  id: string;
  age: number;
  gender?: string;
  bloodGroup?: string;
}

export interface DashboardData {
  patient: PatientInfo;
  vitals: HealthCategory;
  cardiac: HealthCategory;
  bodyComposition: HealthCategory;
  metabolicRisk: HealthCategory;
  diagnostics: HealthCategory;
  overallScore?: number;
  sessionStatus?: 'active' | 'completed';
  elapsedTime?: string;
}

export interface SectionCardProps {
  title: string;
  icon: string;
  metrics: HealthMetric[];
  status: HealthStatus;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'compact' | 'featured';
}

export interface MetricTileProps {
  label: string;
  value: string | number;
  unit: string;
  status: HealthStatus;
  referenceRange?: string;
}

export interface HealthScoreProps {
  score: number;
  label?: string;
}
