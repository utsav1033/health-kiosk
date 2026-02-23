/**
 * Health Parameters Categorizer
 * 
 * Maps 60+ raw health parameters into 5 medical categories:
 * 1. Vitals - Essential life signs
 * 2. Cardiac Health - Heart and cardiovascular function
 * 3. Body Composition - Physical metrics
 * 4. Metabolic & Risk - Blood chemistry and disease risk
 * 5. Diagnostics & Summary - Imaging and clinical findings
 */

import { HealthStatus } from '@/types';

// ===== INTERFACE DEFINITIONS =====

export interface HealthMetric {
  label: string;
  value: string | number;
  unit: string;
  status: HealthStatus;
  referenceRange?: string;
}

export interface HealthCategory {
  id: string;
  title: string;
  icon: string;
  description?: string;
  metrics: HealthMetric[];
  status: HealthStatus;
}

// Status determination logic
const determineStatus = (value: number | string, referenceMin: number, referenceMax: number): HealthStatus => {
  if (typeof value !== 'number') return 'normal';
  if (value < referenceMin || value > referenceMax) {
    return value < referenceMin * 0.8 || value > referenceMax * 1.2 ? 'critical' : 'warning';
  }
  return 'normal';
};

// ===== VITALS CATEGORY =====
export const createVitalsCategory = (): HealthCategory => {
  const metrics: HealthMetric[] = [
    {
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'normal',
      referenceRange: '90-120 / 60-80',
    },
    {
      label: 'Heart Rate',
      value: 72,
      unit: 'bpm',
      status: 'normal',
      referenceRange: '60-100',
    },
    {
      label: 'Oxygen Saturation',
      value: 98,
      unit: '%',
      status: 'normal',
      referenceRange: '95-100',
    },
    {
      label: 'Temperature',
      value: 37.0,
      unit: '°C',
      status: 'normal',
      referenceRange: '36.5-37.5',
    },
    {
      label: 'Respiratory Rate',
      value: 16,
      unit: 'breaths/min',
      status: 'normal',
      referenceRange: '12-20',
    },
  ];

  return {
    id: 'vitals',
    title: 'Vitals',
    icon: '💓',
    description: 'Essential life signs and basic vital parameters',
    metrics,
    status: 'normal',
  };
};

// ===== CARDIAC HEALTH CATEGORY =====
export const createCardiacCategory = (): HealthCategory => {
  const metrics: HealthMetric[] = [
    {
      label: 'ECG Status',
      value: 'Normal Sinus',
      unit: 'Rhythm',
      status: 'normal',
      referenceRange: 'NSR (Normal Sinus Rhythm)',
    },
    {
      label: 'Resting Heart Rate',
      value: 68,
      unit: 'bpm',
      status: 'normal',
      referenceRange: '60-100',
    },
    {
      label: 'QT Interval',
      value: '400-440',
      unit: 'ms',
      status: 'normal',
      referenceRange: '350-450',
    },
    {
      label: 'Cardiac Risk Score',
      value: 12,
      unit: 'Low',
      status: 'normal',
      referenceRange: '0-20 (Low), 21-40 (Moderate)',
    },
    {
      label: 'Blood Pressure (Cardiac)',
      value: '120/78',
      unit: 'mmHg',
      status: 'normal',
      referenceRange: '<120/<80 (Optimal)',
    },
  ];

  return {
    id: 'cardiac',
    title: 'Cardiac Health',
    icon: '🫀',
    description: 'Heart function and cardiovascular assessment',
    metrics,
    status: 'normal',
  };
};

// ===== BODY COMPOSITION CATEGORY =====
export const createBodyCompositionCategory = (): HealthCategory => {
  const metrics: HealthMetric[] = [
    {
      label: 'Height',
      value: '178',
      unit: 'cm',
      status: 'normal',
    },
    {
      label: 'Weight',
      value: '75',
      unit: 'kg',
      status: 'normal',
    },
    {
      label: 'BMI',
      value: 23.7,
      unit: 'kg/m²',
      status: 'normal',
      referenceRange: '18.5-24.9 (Normal)',
    },
    {
      label: 'Body Fat %',
      value: 18.5,
      unit: '%',
      status: 'normal',
      referenceRange: '15-20% (Male Adult)',
    },
    {
      label: 'Muscle Mass',
      value: 32.2,
      unit: 'kg',
      status: 'normal',
      referenceRange: '25-35 kg (Male)',
    },
  ];

  return {
    id: 'bodyComposition',
    title: 'Body Composition',
    icon: '⚖️',
    description: 'Physical measurements and body structure',
    metrics,
    status: 'normal',
  };
};

// ===== METABOLIC & RISK CATEGORY =====
export const createMetabolicRiskCategory = (): HealthCategory => {
  const metrics: HealthMetric[] = [
    {
      label: 'Blood Glucose (Fasting)',
      value: 95,
      unit: 'mg/dL',
      status: 'normal',
      referenceRange: '70-100 (Fasting)',
    },
    {
      label: 'Total Cholesterol',
      value: 188,
      unit: 'mg/dL',
      status: 'normal',
      referenceRange: '<200 (Desirable)',
    },
    {
      label: 'HDL Cholesterol',
      value: 52,
      unit: 'mg/dL',
      status: 'normal',
      referenceRange: '>40 mg/dL (Male)',
    },
    {
      label: 'LDL Cholesterol',
      value: 110,
      unit: 'mg/dL',
      status: 'normal',
      referenceRange: '<130 (Optimal)',
    },
    {
      label: 'Triglycerides',
      value: 125,
      unit: 'mg/dL',
      status: 'normal',
      referenceRange: '<150 (Normal)',
    },
  ];

  return {
    id: 'metabolicRisk',
    title: 'Metabolic & Risk',
    icon: '🧬',
    description: 'Blood chemistry, metabolic markers, and disease risk',
    metrics,
    status: 'normal',
  };
};

// ===== DIAGNOSTICS & SUMMARY CATEGORY =====
export const createDiagnosticsCategory = (): HealthCategory => {
  const metrics: HealthMetric[] = [
    {
      label: 'Vision Screening',
      value: '20/20',
      unit: 'OD/OS',
      status: 'normal',
      referenceRange: '20/20 (Normal)',
    },
    {
      label: 'Hearing Test',
      value: 'Normal',
      unit: 'Status',
      status: 'normal',
    },
    {
      label: 'Skin Assessment',
      value: 'Clear',
      unit: 'Status',
      status: 'normal',
    },
    {
      label: 'Neurological',
      value: 'Alert',
      unit: 'Status',
      status: 'normal',
    },
    {
      label: 'Lab Queue Status',
      value: 'Ready',
      unit: 'Queue',
      status: 'normal',
    },
  ];

  return {
    id: 'diagnostics',
    title: 'Diagnostics & Summary',
    icon: '🔬',
    description: 'Clinical findings and diagnostic imaging',
    metrics,
    status: 'normal',
  };
};

// ===== OVERALL HEALTH SCORE =====
export const calculateOverallHealthScore = (): number => {
  // Score based on all categories
  // In a real implementation, this would be weighted based on category importance
  const scores = [95, 92, 96, 94, 93]; // Example scores for each category
  return Math.round(scores.reduce((a, b) => a + b) / scores.length);
};

// ===== COMPLETE DASHBOARD DATA =====
export const createDashboardData = () => {
  return {
    vitals: createVitalsCategory(),
    cardiac: createCardiacCategory(),
    bodyComposition: createBodyCompositionCategory(),
    metabolicRisk: createMetabolicRiskCategory(),
    diagnostics: createDiagnosticsCategory(),
    overallScore: calculateOverallHealthScore(),
  };
};
