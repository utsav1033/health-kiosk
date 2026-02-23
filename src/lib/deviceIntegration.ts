/**
 * Device Integration Guide
 * 
 * This file demonstrates how to integrate real health device data
 * with the refactored dashboard.
 * 
 * Currently using mock data. Swap these functions with real device APIs.
 */

import { HealthMetric, HealthCategory } from '@/constants/healthCategories';
import type { HealthStatus } from '@/types';

// ===== DEVICE DATA TYPES =====

export interface RawDeviceData {
  vitals: {
    bloodPressureSystolic: number;
    bloodPressureDiastolic: number;
    heartRate: number;
    spo2: number;
    temperature: number;
    respiratoryRate: number;
  };
  cardiac: {
    ecgStatus: string;
    qtInterval: [number, number];
    cardiacRiskScore: number;
  };
  bodyMetrics: {
    height: number;
    weight: number;
    bodyFatPercent: number;
    muscleMass: number;
  };
  metabolic: {
    glucose: number;
    totalCholesterol: number;
    hdl: number;
    ldl: number;
    triglycerides: number;
  };
  diagnostics: {
    vision: string;
    hearing: string;
    skinAssessment: string;
    neurological: string;
  };
}

// ===== STATUS DETERMINATION HELPERS =====

/**
 * Determine health status based on value and reference range
 */
const getStatusFromRange = (
  value: number,
  minNormal: number,
  maxNormal: number,
  minWarning?: number,
  maxWarning?: number,
): HealthStatus => {
  const hasWarningRange = minWarning !== undefined && maxWarning !== undefined;

  if (value < minNormal || value > maxNormal) {
    if (!hasWarningRange) {
      return 'warning';
    }
    if (value >= minWarning && value <= maxWarning) {
      return 'warning';
    }
    return 'critical';
  }

  return 'normal';
};

// ===== DEVICE DATA TRANSFORMERS =====

/**
 * Transform raw device vitals to dashboard metrics
 * 
 * Example device API call:
 * const vitals = await device.getVitals();
 */
export const transformDeviceVitals = (deviceData: RawDeviceData['vitals']): HealthMetric[] => [
  {
    label: 'Blood Pressure',
    value: `${deviceData.bloodPressureSystolic}/${deviceData.bloodPressureDiastolic}`,
    unit: 'mmHg',
    status: getStatusFromRange(
      deviceData.bloodPressureSystolic,
      90,
      120,
      120,
      140,
    ),
    referenceRange: '90-120 / 60-80',
  },
  {
    label: 'Heart Rate',
    value: deviceData.heartRate,
    unit: 'bpm',
    status: getStatusFromRange(deviceData.heartRate, 60, 100),
    referenceRange: '60-100',
  },
  {
    label: 'Oxygen Saturation',
    value: deviceData.spo2,
    unit: '%',
    status: getStatusFromRange(deviceData.spo2, 95, 100),
    referenceRange: '95-100',
  },
  {
    label: 'Temperature',
    value: deviceData.temperature,
    unit: '°C',
    status: getStatusFromRange(deviceData.temperature, 36.5, 37.5),
    referenceRange: '36.5-37.5',
  },
  {
    label: 'Respiratory Rate',
    value: deviceData.respiratoryRate,
    unit: 'breaths/min',
    status: getStatusFromRange(deviceData.respiratoryRate, 12, 20),
    referenceRange: '12-20',
  },
];

/**
 * Transform raw device cardiac data to dashboard metrics
 */
export const transformDeviceCardiac = (deviceData: RawDeviceData['cardiac']): HealthMetric[] => [
  {
    label: 'ECG Status',
    value: deviceData.ecgStatus,
    unit: 'Rhythm',
    status: deviceData.ecgStatus === 'Normal Sinus Rhythm' ? 'normal' : 'warning',
    referenceRange: 'NSR (Normal Sinus Rhythm)',
  },
  {
    label: 'QT Interval',
    value: `${deviceData.qtInterval[0]}-${deviceData.qtInterval[1]}`,
    unit: 'ms',
    status: getStatusFromRange(
      (deviceData.qtInterval[0] + deviceData.qtInterval[1]) / 2,
      350,
      450,
    ),
    referenceRange: '350-450',
  },
  {
    label: 'Cardiac Risk Score',
    value: deviceData.cardiacRiskScore,
    unit: deviceData.cardiacRiskScore <= 20 ? 'Low' : 'Moderate',
    status: deviceData.cardiacRiskScore <= 20 ? 'normal' : 'warning',
    referenceRange: '0-20 (Low), 21-40 (Moderate)',
  },
];

/**
 * Transform raw device body metrics to dashboard metrics
 */
export const transformDeviceBodyComposition = (deviceData: RawDeviceData['bodyMetrics']): HealthMetric[] => {
  const bmi = deviceData.weight / ((deviceData.height / 100) ** 2);

  return [
    {
      label: 'Height',
      value: deviceData.height,
      unit: 'cm',
      status: 'normal',
    },
    {
      label: 'Weight',
      value: deviceData.weight,
      unit: 'kg',
      status: 'normal',
    },
    {
      label: 'BMI',
      value: parseFloat(bmi.toFixed(1)),
      unit: 'kg/m²',
      status: getStatusFromRange(bmi, 18.5, 24.9, 25, 29.9),
      referenceRange: '18.5-24.9 (Normal)',
    },
    {
      label: 'Body Fat %',
      value: deviceData.bodyFatPercent,
      unit: '%',
      status: getStatusFromRange(deviceData.bodyFatPercent, 15, 20),
      referenceRange: '15-20% (Male Adult)',
    },
    {
      label: 'Muscle Mass',
      value: parseFloat(deviceData.muscleMass.toFixed(1)),
      unit: 'kg',
      status: getStatusFromRange(deviceData.muscleMass, 25, 35),
      referenceRange: '25-35 kg (Male)',
    },
  ];
};

/**
 * Transform raw device metabolic data to dashboard metrics
 */
export const transformDeviceMetabolic = (deviceData: RawDeviceData['metabolic']): HealthMetric[] => [
  {
    label: 'Blood Glucose (Fasting)',
    value: deviceData.glucose,
    unit: 'mg/dL',
    status: getStatusFromRange(deviceData.glucose, 70, 100, 100, 125),
    referenceRange: '70-100 (Fasting)',
  },
  {
    label: 'Total Cholesterol',
    value: deviceData.totalCholesterol,
    unit: 'mg/dL',
    status: getStatusFromRange(deviceData.totalCholesterol, 0, 200, 200, 240),
    referenceRange: '<200 (Desirable)',
  },
  {
    label: 'HDL Cholesterol',
    value: deviceData.hdl,
    unit: 'mg/dL',
    status: deviceData.hdl > 40 ? 'normal' : 'warning',
    referenceRange: '>40 mg/dL (Male)',
  },
  {
    label: 'LDL Cholesterol',
    value: deviceData.ldl,
    unit: 'mg/dL',
    status: getStatusFromRange(deviceData.ldl, 0, 130, 130, 160),
    referenceRange: '<130 (Optimal)',
  },
  {
    label: 'Triglycerides',
    value: deviceData.triglycerides,
    unit: 'mg/dL',
    status: getStatusFromRange(deviceData.triglycerides, 0, 150, 150, 200),
    referenceRange: '<150 (Normal)',
  },
];

/**
 * Transform raw device diagnostics to dashboard metrics
 */
export const transformDeviceDiagnostics = (deviceData: RawDeviceData['diagnostics']): HealthMetric[] => [
  {
    label: 'Vision Screening',
    value: deviceData.vision,
    unit: 'Status',
    status: deviceData.vision === '20/20' ? 'normal' : 'warning',
    referenceRange: '20/20 (Normal)',
  },
  {
    label: 'Hearing Test',
    value: deviceData.hearing,
    unit: 'Status',
    status: deviceData.hearing === 'Normal' ? 'normal' : 'warning',
  },
  {
    label: 'Skin Assessment',
    value: deviceData.skinAssessment,
    unit: 'Status',
    status: deviceData.skinAssessment === 'Clear' ? 'normal' : 'warning',
  },
  {
    label: 'Neurological',
    value: deviceData.neurological,
    unit: 'Status',
    status: deviceData.neurological === 'Alert' ? 'normal' : 'warning',
  },
];

// ===== MOCK DEVICE DATA =====

/**
 * Mock data that simulates device API response
 * Replace with real device.getFullAssessment() call
 */
export const getMockDeviceData = (): RawDeviceData => ({
  vitals: {
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
    heartRate: 72,
    spo2: 98,
    temperature: 37.0,
    respiratoryRate: 16,
  },
  cardiac: {
    ecgStatus: 'Normal Sinus Rhythm',
    qtInterval: [400, 440],
    cardiacRiskScore: 12,
  },
  bodyMetrics: {
    height: 178,
    weight: 75,
    bodyFatPercent: 18.5,
    muscleMass: 32.2,
  },
  metabolic: {
    glucose: 95,
    totalCholesterol: 188,
    hdl: 52,
    ldl: 110,
    triglycerides: 125,
  },
  diagnostics: {
    vision: '20/20',
    hearing: 'Normal',
    skinAssessment: 'Clear',
    neurological: 'Alert',
  },
});

// ===== INTEGRATION HOOK EXAMPLE =====

/**
 * Example React hook for device integration
 * 
 * Usage:
 * const dashboardData = useDashboardData();
 */
export const useDashboardData = () => {
  // For now, return mock data
  const deviceData = getMockDeviceData();

  // When real device is ready, replace above with:
  // const [deviceData, setDeviceData] = useState(null);
  // useEffect(() => {
  //   const device = new HealthDevice();
  //   device.startAssessment();
  //   device.on('complete', (data) => setDeviceData(data));
  // }, []);

  return {
    vitals: {
      id: 'vitals',
      title: 'Vitals',
      icon: '💓',
      description: 'Essential life signs and basic vital parameters',
      metrics: transformDeviceVitals(deviceData.vitals),
      status: 'normal' as const,
    },
    cardiac: {
      id: 'cardiac',
      title: 'Cardiac Health',
      icon: '🫀',
      description: 'Heart function and cardiovascular assessment',
      metrics: transformDeviceCardiac(deviceData.cardiac),
      status: 'normal' as const,
    },
    bodyComposition: {
      id: 'bodyComposition',
      title: 'Body Composition',
      icon: '⚖️',
      description: 'Physical measurements and body structure',
      metrics: transformDeviceBodyComposition(deviceData.bodyMetrics),
      status: 'normal' as const,
    },
    metabolicRisk: {
      id: 'metabolicRisk',
      title: 'Metabolic & Risk',
      icon: '🧬',
      description: 'Blood chemistry, metabolic markers, and disease risk',
      metrics: transformDeviceMetabolic(deviceData.metabolic),
      status: 'normal' as const,
    },
    diagnostics: {
      id: 'diagnostics',
      title: 'Diagnostics & Summary',
      icon: '🔬',
      description: 'Clinical findings and diagnostic imaging',
      metrics: transformDeviceDiagnostics(deviceData.diagnostics),
      status: 'normal' as const,
    },
  };
};
