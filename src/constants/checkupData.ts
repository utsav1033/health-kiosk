/**
 * Checkup Categories & Devices Mock Data
 * 
 * Defines all checkup categories and available devices for the kiosk flow
 */

export interface Device {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'available' | 'unavailable' | 'maintenance';
  estimatedTime: number; // in minutes
}

export interface CheckupCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: {
    bg: string;
    border: string;
    text: string;
  };
  devices: Device[];
  parameterCount: number;
}

export const CHECKUP_CATEGORIES: CheckupCategory[] = [
  {
    id: 'full-body',
    title: 'Full Body Checkup',
    icon: '🏥',
    description: 'Comprehensive assessment of 60+ vital parameters',
    color: {
      bg: '#F0F7FF',
      border: '#0284C7',
      text: '#0C4A6E',
    },
    devices: [
      {
        id: 'vitals-monitor-1',
        name: 'Vitals Monitor Station',
        description: 'Blood pressure, heart rate, temperature, SpO2',
        icon: '💓',
        status: 'available',
        estimatedTime: 5,
      },
      {
        id: 'ecg-device',
        name: 'ECG Machine',
        description: 'Electrocardiogram & cardiac analysis',
        icon: '📊',
        status: 'available',
        estimatedTime: 5,
      },
      {
        id: 'body-scanner',
        name: 'Body Composition Analyzer',
        description: 'Height, weight, BMI, body fat percentage',
        icon: '⚖️',
        status: 'available',
        estimatedTime: 3,
      },
      {
        id: 'lab-tests',
        name: 'Lab Analysis',
        description: 'Blood glucose, cholesterol, metabolic panel',
        icon: '🧪',
        status: 'available',
        estimatedTime: 10,
      },
    ],
    parameterCount: 62,
  },
  {
    id: 'vitals',
    title: 'Vitals',
    icon: '💓',
    description: 'Blood pressure, heart rate, temperature, oxygen level',
    color: {
      bg: '#F0FDF4',
      border: '#16A34A',
      text: '#15803D',
    },
    devices: [
      {
        id: 'bp-monitor',
        name: 'Blood Pressure Monitor',
        description: 'Automated BP measurement',
        icon: '📈',
        status: 'available',
        estimatedTime: 2,
      },
      {
        id: 'pulse-ox',
        name: 'Pulse Oximeter',
        description: 'Heart rate and oxygen saturation',
        icon: '📡',
        status: 'available',
        estimatedTime: 2,
      },
      {
        id: 'thermometer',
        name: 'Digital Thermometer',
        description: 'Body temperature measurement',
        icon: '🌡️',
        status: 'available',
        estimatedTime: 1,
      },
    ],
    parameterCount: 5,
  },
  {
    id: 'cardiac',
    title: 'Cardiac Health',
    icon: '🫀',
    description: 'ECG, heart rate variability, cardiac stress markers',
    color: {
      bg: '#FCE7F3',
      border: '#EC4899',
      text: '#BE185D',
    },
    devices: [
      {
        id: 'ecg-full',
        name: '12-Lead ECG',
        description: 'Complete electrocardiogram analysis',
        icon: '📊',
        status: 'available',
        estimatedTime: 5,
      },
      {
        id: 'hrv-monitor',
        name: 'HRV Analyzer',
        description: 'Heart rate variability measurement',
        icon: '💗',
        status: 'available',
        estimatedTime: 3,
      },
    ],
    parameterCount: 12,
  },
  {
    id: 'metabolic',
    title: 'Metabolic Health',
    icon: '🧬',
    description: 'Blood glucose, cholesterol, metabolic panel',
    color: {
      bg: '#FEF3C7',
      border: '#F59E0B',
      text: '#92400E',
    },
    devices: [
      {
        id: 'glucose-meter',
        name: 'Blood Glucose Meter',
        description: 'Fasting and postprandial glucose',
        icon: '🩸',
        status: 'available',
        estimatedTime: 3,
      },
      {
        id: 'lipid-panel',
        name: 'Lipid Analyzer',
        description: 'Cholesterol and triglycerides analysis',
        icon: '🧪',
        status: 'available',
        estimatedTime: 5,
      },
    ],
    parameterCount: 8,
  },
  {
    id: 'diagnostics',
    title: 'Diagnostics & Preventive Screening',
    icon: '🔬',
    description: 'Vision, hearing, skin assessment, preventive scans',
    color: {
      bg: '#F3E8FF',
      border: '#A855F7',
      text: '#6B21A8',
    },
    devices: [
      {
        id: 'vision-screener',
        name: 'Vision Screener',
        description: 'Visual acuity and eye health assessment',
        icon: '👁️',
        status: 'available',
        estimatedTime: 3,
      },
      {
        id: 'audiometer',
        name: 'Audiometer',
        description: 'Hearing test and audio assessment',
        icon: '🎧',
        status: 'available',
        estimatedTime: 5,
      },
      {
        id: 'dermascope',
        name: 'Dermascope',
        description: 'Skin and mole analysis',
        icon: '🔍',
        status: 'available',
        estimatedTime: 4,
      },
    ],
    parameterCount: 15,
  },
];

export function getCategoryById(id: string): CheckupCategory | undefined {
  return CHECKUP_CATEGORIES.find((cat) => cat.id === id);
}

export function getDeviceById(categoryId: string, deviceId: string): Device | undefined {
  const category = getCategoryById(categoryId);
  return category?.devices.find((dev) => dev.id === deviceId);
}

/**
 * Mock checkup result for demonstration
 */
export interface CheckupResult {
  id: string;
  categoryId: string;
  deviceId: string;
  timestamp: Date;
  metrics: Array<{
    label: string;
    value: string | number;
    unit: string;
    status: 'normal' | 'warning' | 'critical';
  }>;
  overallStatus: 'normal' | 'warning' | 'critical';
  summary: string;
}

export function generateMockCheckupResult(
  categoryId: string,
  deviceId: string,
): CheckupResult {
  const category = getCategoryById(categoryId);
  const device = category?.devices.find((d) => d.id === deviceId);

  const results: Record<string, CheckupResult> = {
    'vitals-bp': {
      id: 'result-001',
      categoryId: 'vitals',
      deviceId: 'bp-monitor',
      timestamp: new Date(),
      metrics: [
        {
          label: 'Systolic Pressure',
          value: 120,
          unit: 'mmHg',
          status: 'normal',
        },
        {
          label: 'Diastolic Pressure',
          value: 80,
          unit: 'mmHg',
          status: 'normal',
        },
      ],
      overallStatus: 'normal',
      summary: 'Blood pressure is within normal range.',
    },
    'vitals-pulse': {
      id: 'result-002',
      categoryId: 'vitals',
      deviceId: 'pulse-ox',
      timestamp: new Date(),
      metrics: [
        { label: 'Heart Rate', value: 72, unit: 'bpm', status: 'normal' },
        { label: 'SpO2', value: 98, unit: '%', status: 'normal' },
      ],
      overallStatus: 'normal',
      summary: 'Oxygen saturation and heart rate are healthy.',
    },
    'cardiac-ecg': {
      id: 'result-003',
      categoryId: 'cardiac',
      deviceId: 'ecg-full',
      timestamp: new Date(),
      metrics: [
        {
          label: 'ECG Status',
          value: 'Normal Sinus Rhythm',
          unit: 'NSR',
          status: 'normal',
        },
        { label: 'Heart Rate', value: 68, unit: 'bpm', status: 'normal' },
        { label: 'QT Interval', value: 420, unit: 'ms', status: 'normal' },
      ],
      overallStatus: 'normal',
      summary: 'ECG shows normal cardiac rhythm and function.',
    },
  };

  const key = `${categoryId}-${deviceId.split('-')[0]}`;
  return (
    results[key] || {
      id: 'result-default',
      categoryId,
      deviceId,
      timestamp: new Date(),
      metrics: [
        {
          label: 'Status',
          value: 'Measurement Complete',
          unit: '',
          status: 'normal',
        },
      ],
      overallStatus: 'normal',
      summary: 'Checkup completed successfully.',
    }
  );
}

/**
 * Mock patient report for profile page
 */
export interface PatientReport {
  id: string;
  date: Date;
  categoryTitle: string;
  categoryIcon: string;
  deviceName: string;
  overallStatus: 'normal' | 'warning' | 'critical';
  keyMetrics: string[];
  summary: string;
}

export const MOCK_PATIENT_REPORTS: PatientReport[] = [
  {
    id: 'report-001',
    date: new Date('2026-02-20'),
    categoryTitle: 'Full Body Checkup',
    categoryIcon: '🏥',
    deviceName: 'Vitals Monitor Station',
    overallStatus: 'normal',
    keyMetrics: ['BP: 120/80', 'HR: 72', 'SpO2: 98%', 'Temp: 37.0°C'],
    summary: 'All vitals within normal range. Overall health status: Good.',
  },
  {
    id: 'report-002',
    date: new Date('2026-02-18'),
    categoryTitle: 'Cardiac Health',
    categoryIcon: '🫀',
    deviceName: '12-Lead ECG',
    overallStatus: 'normal',
    keyMetrics: ['ECG: Normal Sinus Rhythm', 'HR: 68', 'QT: 420ms'],
    summary: 'Cardiac function normal. No abnormalities detected.',
  },
  {
    id: 'report-003',
    date: new Date('2026-02-15'),
    categoryTitle: 'Metabolic Health',
    categoryIcon: '🧬',
    deviceName: 'Lipid Analyzer',
    overallStatus: 'warning',
    keyMetrics: ['Glucose: 110', 'Cholesterol: 195', 'HDL: 50'],
    summary: 'Glucose slightly elevated. Recommended: Dietary adjustments.',
  },
  {
    id: 'report-004',
    date: new Date('2026-02-10'),
    categoryTitle: 'Vitals',
    categoryIcon: '💓',
    deviceName: 'Blood Pressure Monitor',
    overallStatus: 'normal',
    keyMetrics: ['BP: 118/78', 'HR: 70'],
    summary: 'Blood pressure optimal. Continue regular monitoring.',
  },
];
