/**
 * Mock Data Constants
 * 
 * Development mock data for the medical diagnostic kiosk.
 * Used throughout the application for UI development and testing.
 * 
 * These constants match the TypeScript interfaces defined in @/types
 * and can be easily swapped for real API data.
 */

import { IPatient, IVital, IReport, ICheckup, IVitals } from '@/types';

// ===== MOCK PATIENT DATA =====

/**
 * Sample patient data for development
 * Matches IPatient interface
 * 
 * Used in:
 * - Profile page
 * - Checkups dashboard
 * - Patient info sections
 */
export const MOCK_PATIENT: IPatient = {
  id: 'P-2024-0847',
  name: 'Aravind Krishna',
  age: 34,
  bloodGroup: 'O+',
  height: '5\'10" (178 cm)',
  weight: '75 kg',
  avatar: '👨‍⚕️',
  gender: 'M',
  emergencyContact: '+91 98765 43210',
  medicalHistory: [
    'Hypertension (controlled)',
    'Type 2 Diabetes (controlled)',
  ],
  allergies: ['Penicillin', 'Shellfish'],
  updatedAt: new Date('2026-02-18'),
};

// ===== MOCK VITAL SIGNS DATA =====

/**
 * Sample vital sign readings for development
 * Matches IVital interface
 * 
 * Used in:
 * - Vitals Card
 * - Dashboard displays
 * - Report summaries
 */
export const MOCK_VITALS: IVital[] = [
  {
    label: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    status: 'normal',
    referenceRange: '90-120 / 60-80',
    timestamp: new Date('2026-02-20T10:30:00'),
  },
  {
    label: 'Oxygen Saturation',
    value: 98,
    unit: '%',
    status: 'normal',
    referenceRange: '95-100',
    timestamp: new Date('2026-02-20T10:30:00'),
  },
  {
    label: 'Temperature',
    value: 37.0,
    unit: '°C',
    status: 'normal',
    referenceRange: '36.5-37.5',
    timestamp: new Date('2026-02-20T10:30:00'),
  },
  {
    label: 'Heart Rate',
    value: 72,
    unit: 'bpm',
    status: 'normal',
    referenceRange: '60-100',
    timestamp: new Date('2026-02-20T10:30:00'),
  },
  {
    label: 'Respiratory Rate',
    value: 16,
    unit: 'breaths/min',
    status: 'normal',
    referenceRange: '12-20',
    timestamp: new Date('2026-02-20T10:30:00'),
  },
];

/**
 * Complete vital signs set for development
 * Matches IVitals interface
 * 
 * Used in:
 * - Comprehensive health assessments
 * - Session summaries
 */
export const MOCK_VITALS_COMPLETE: IVitals = {
  bloodPressure: { systolic: 120, diastolic: 80 },
  spo2: 98,
  temperature: 37.0,
  heartRate: 72,
  respiratoryRate: 16,
  timestamp: new Date('2026-02-20T10:30:00'),
  overallStatus: 'normal',
};

// ===== MOCK REPORTS DATA =====

/**
 * Sample clinical reports for development
 * Matches IReport interface
 * 
 * Used in:
 * - Profile page - Clinical Reports History
 * - Report cards display
 * - Report filtering examples
 */
export const MOCK_REPORTS: IReport[] = [
  {
    id: 'RPT-2024-001',
    title: 'Comprehensive Health Assessment',
    date: new Date('2026-02-18'),
    paramCount: 62,
    verified: true,
    icon: '📋',
    type: 'comprehensive',
    status: 'completed',
    verifiedBy: 'Dr. Sharma, MD',
    verifiedAt: new Date('2026-02-18T14:30:00'),
    patientId: 'P-2024-0847',
    fileUrl: '/reports/RPT-2024-001.pdf',
    summary:
      'Comprehensive health assessment showing normal vital signs and metabolic markers. Patient is in good overall health with well-controlled comorbidities.',
    findings: [
      'Blood pressure within normal range',
      'All metabolic markers normal',
      'No cardiac abnormalities detected',
      'Respiratory function normal',
    ],
    recommendations: [
      'Continue current medication regimen',
      'Maintain regular exercise routine',
      'Follow-up assessment in 6 months',
      'Annual screening recommended',
    ],
  },
  {
    id: 'RPT-2024-002',
    title: 'Metabolic Panel Review',
    date: new Date('2026-02-10'),
    paramCount: 45,
    verified: true,
    icon: '🧪',
    type: 'metabolic',
    status: 'completed',
    verifiedBy: 'Dr. Patel, MD',
    verifiedAt: new Date('2026-02-10T11:15:00'),
    patientId: 'P-2024-0847',
    fileUrl: '/reports/RPT-2024-002.pdf',
    summary:
      'Metabolic panel analysis showing good glucose control and lipid profile. Liver and kidney function tests are normal.',
    findings: [
      'Fasting glucose: 125 mg/dL (slightly elevated)',
      'HbA1c: 6.8% (well-controlled diabetes)',
      'Total cholesterol: 188 mg/dL (normal)',
      'HDL: 45 mg/dL, LDL: 110 mg/dL (acceptable)',
    ],
    recommendations: [
      'Continue diabetes management',
      'Dietary modifications to reduce glucose intake',
      'Next lab work in 3 months',
    ],
  },
  {
    id: 'RPT-2024-003',
    title: 'Cardiovascular Assessment',
    date: new Date('2026-02-03'),
    paramCount: 38,
    verified: true,
    icon: '💓',
    type: 'cardiac',
    status: 'completed',
    verifiedBy: 'Dr. Gupta, MD, FACC',
    verifiedAt: new Date('2026-02-03T16:45:00'),
    patientId: 'P-2024-0847',
    fileUrl: '/reports/RPT-2024-003.pdf',
    summary:
      'Cardiovascular assessment including ECG and echocardiogram. Results show normal cardiac function with no abnormalities detected.',
    findings: [
      'ECG: Normal sinus rhythm',
      'Heart rate: 72 bpm (normal)',
      'Blood pressure: 120/80 mmHg (normal)',
      'Echocardiogram: Normal cardiac structure and function',
      'No valve abnormalities',
    ],
    recommendations: [
      'Continue regular aerobic exercise',
      'Maintain healthy diet low in sodium',
      'Repeat echocardiogram in 2 years',
      'Follow-up with cardiologist annually',
    ],
  },
];

// ===== MOCK CHECKUP MODULES DATA =====

/**
 * Sample checkup modules for development
 * Matches ICheckup interface
 * 
 * Used in:
 * - Checkups dashboard grid
 * - Module selection
 * - Diagnostic flow
 */
export const MOCK_CHECKUP_MODULES: ICheckup[] = [
  {
    id: 'checkup-full-body',
    title: 'Full Body Checkup',
    category: 'vital',
    icon: '🏥',
    description: 'Comprehensive assessment of all vital parameters',
    available: true,
    estimatedTime: 15,
    status: 'pending',
    variant: 'featured',
    parameters: [
      'Blood Pressure',
      'Heart Rate',
      'Temperature',
      'Oxygen Saturation',
    ],
  },
  {
    id: 'checkup-vitals',
    title: 'Vitals',
    category: 'vital',
    icon: '💓',
    description: 'Measure blood pressure, oxygen, temperature, heart rate',
    available: true,
    estimatedTime: 5,
    status: 'completed',
    variant: 'default',
    parameters: [
      'Blood Pressure',
      'SpO2',
      'Temperature',
      'Heart Rate',
    ],
    results: [
      {
        label: 'Blood Pressure',
        value: '120/80',
        unit: 'mmHg',
        status: 'normal',
      },
      {
        label: 'Oxygen Saturation',
        value: 98,
        unit: '%',
        status: 'normal',
      },
      {
        label: 'Temperature',
        value: 37.0,
        unit: '°C',
        status: 'normal',
      },
      {
        label: 'Heart Rate',
        value: 72,
        unit: 'bpm',
        status: 'normal',
      },
    ],
  },
  {
    id: 'checkup-cardiac',
    title: 'Cardiac',
    category: 'cardiac',
    icon: '💓',
    description: 'Cardiovascular health assessment with ECG analysis',
    available: true,
    estimatedTime: 10,
    status: 'completed',
    variant: 'default',
    parameters: [
      'ECG',
      'Heart Rate Variability',
      'Blood Pressure',
      'Cardiac Markers',
    ],
    results: [
      {
        label: 'Heart Rate',
        value: 72,
        unit: 'bpm',
        status: 'normal',
      },
    ],
  },
  {
    id: 'checkup-metabolic',
    title: 'Metabolic',
    category: 'metabolic',
    icon: '🧪',
    description: 'Blood glucose, cholesterol, and metabolic panel analysis',
    available: true,
    estimatedTime: 8,
    status: 'pending',
    variant: 'default',
    parameters: [
      'Blood Glucose',
      'Total Cholesterol',
      'HDL / LDL',
      'Triglycerides',
    ],
  },
  {
    id: 'checkup-scans',
    title: 'Diagnostic Scans',
    category: 'scan',
    icon: '📸',
    description: 'Dermascope and otoscope imaging with AI analysis',
    available: true,
    estimatedTime: 10,
    status: 'pending',
    variant: 'default',
    parameters: [
      'Dermascope Image',
      'Otoscope Image',
    ],
  },
  {
    id: 'checkup-expand',
    title: 'Expand Diagnostics',
    category: 'other',
    icon: '➕',
    description: 'Add more diagnostic modules',
    available: true,
    estimatedTime: 0,
    status: 'pending',
    variant: 'empty',
    parameters: [],
  },
];

// ===== MOCK METABOLIC DATA =====

/**
 * Sample metabolic readings for development
 * Used in Metabolic Card
 */
export const MOCK_METABOLIC_READINGS = {
  bloodGlucose: 142,
  totalCholesterol: 188,
  hdl: 45,
  ldl: 110,
};

// ===== MOCK DIAGNOSTIC SCAN DATA =====

/**
 * Sample diagnostic scan information
 * Used in Scans Card
 */
export const MOCK_SCANS = {
  dermascope: {
    name: 'Dermascope',
    icon: '🔬',
    imageUrl: '/scans/dermascope-sample.jpg',
    timestamp: new Date('2026-02-20T09:15:00'),
  },
  otoscope: {
    name: 'Otoscope',
    icon: '👂',
    imageUrl: '/scans/otoscope-sample.jpg',
    timestamp: new Date('2026-02-20T09:20:00'),
  },
};

// ===== MOCK SESSION DATA =====

/**
 * Sample patient session for development
 * Used in session tracking and status display
 */
export const MOCK_SESSION = {
  id: 'SESSION-2024-0847-001',
  patientId: 'P-2024-0847',
  startTime: new Date('2026-02-20T09:00:00'),
  status: 'active' as const,
  parametersCollected: 54,
  parametersTotal: 62,
  elapsedSeconds: 762, // 12:42
};

// ===== MOCK DASHBOARD CONFIG =====

/**
 * Complete dashboard configuration for development
 * Used in Checkups page
 */
export const MOCK_DASHBOARD_CONFIG = {
  patient: MOCK_PATIENT,
  session: MOCK_SESSION,
  checkups: MOCK_CHECKUP_MODULES,
  systemStatus: 'operational' as const,
};

// ===== MOCK RESPONSE WRAPPERS =====

/**
 * Sample API response for single patient
 * Used for testing API integration
 */
export const MOCK_PATIENT_RESPONSE = {
  success: true,
  data: MOCK_PATIENT,
  message: 'Patient retrieved successfully',
  statusCode: 200,
};

/**
 * Sample API response for reports list
 * Used for testing paginated API calls
 */
export const MOCK_REPORTS_RESPONSE = {
  success: true,
  data: {
    reports: MOCK_REPORTS,
    total: MOCK_REPORTS.length,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  },
  message: 'Reports retrieved successfully',
  statusCode: 200,
};

/**
 * Sample API response for vitals
 * Used for testing vital signs data
 */
export const MOCK_VITALS_RESPONSE = {
  success: true,
  data: MOCK_VITALS_COMPLETE,
  message: 'Vitals retrieved successfully',
  statusCode: 200,
};

// ===== MOCK DATA REPOSITORY =====

/**
 * Unified mock data repository
 * Makes it easy to access all mock data in one place
 */
export const MOCK_DATA = {
  patient: MOCK_PATIENT,
  vitals: MOCK_VITALS,
  vitalsComplete: MOCK_VITALS_COMPLETE,
  reports: MOCK_REPORTS,
  checkupModules: MOCK_CHECKUP_MODULES,
  metabolic: MOCK_METABOLIC_READINGS,
  scans: MOCK_SCANS,
  session: MOCK_SESSION,
  dashboardConfig: MOCK_DASHBOARD_CONFIG,
  // API Responses
  patientResponse: MOCK_PATIENT_RESPONSE,
  reportsResponse: MOCK_REPORTS_RESPONSE,
  vitalsResponse: MOCK_VITALS_RESPONSE,
} as const;




