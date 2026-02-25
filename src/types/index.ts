/**
 * Type Definitions
 * 
 * Central repository for all TypeScript interfaces and types used throughout
 * the medical diagnostic kiosk application.
 * 
 * Usage:
 * import { IPatient, IVital, IReport, ICheckup } from '@/types';
 */

// ===== API RESPONSE TYPES =====

/**
 * Generic API response wrapper
 * Used for all API calls to kiosk backend
 * 
 * @example
 * const response: ApiResponse<IPatient> = await fetchPatient(id);
 * if (response.success) {
 *   console.log(response.data); // IPatient
 * }
 */
export interface ApiResponse<T = unknown> {
  /** Whether the API call succeeded */
  success: boolean;
  /** Response data (type-safe with generic T) */
  data?: T;
  /** Error message if failed */
  error?: string;
  /** Additional message from server */
  message?: string;
  /** HTTP status code */
  statusCode?: number;
  /** Request ID for tracking */
  requestId?: string;
}

// ===== PATIENT TYPES =====

/**
 * Patient Information
 * 
 * Core patient data used throughout the kiosk
 * Includes demographics, biometrics, and identification
 * 
 * @example
 * const patient: IPatient = {
 *   id: 'P-2024-0847',
 *   name: 'John Doe',
 *   age: 34,
 *   bloodGroup: 'O+',
 *   height: '5\'10" (178 cm)',
 *   weight: '75 kg',
 *   avatar: '👨‍⚕️',
 * };
 */
export interface IPatient {
  /** Unique patient identifier */
  id: string;
  /** Patient full name */
  name: string;
  /** Patient age in years */
  age: number;
  /** Blood group (e.g., 'O+', 'AB-') */
  bloodGroup: string;
  /** Patient height (with format, e.g., '5\'10" (178 cm)') */
  height: string;
  /** Patient weight (with unit, e.g., '75 kg') */
  weight: string;
  /** Avatar emoji or image URL */
  avatar: string;
  /** Optional: Gender */
  gender?: 'M' | 'F' | 'Other';
  /** Optional: Emergency contact */
  emergencyContact?: string;
  /** Optional: Medical history */
  medicalHistory?: string[];
  /** Optional: Allergies */
  allergies?: string[];
  /** Timestamp of last update */
  updatedAt?: Date;
}

/**
 * Patient session information
 * Tracks current session state and timing
 */
export interface IPatientSession {
  /** Session ID */
  id: string;
  /** Associated patient ID */
  patientId: string;
  /** Session start time */
  startTime: Date;
  /** Session end time (if completed) */
  endTime?: Date;
  /** Session status */
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  /** Number of parameters collected */
  parametersCollected: number;
  /** Total parameters to collect */
  parametersTotal: number;
  /** Session notes */
  notes?: string;
}

// ===== VITAL SIGNS TYPES =====

/**
 * Single Vital Sign Reading
 * 
 * Represents one vital measurement
 * 
 * @example
 * const bloodPressure: IVital = {
 *   label: 'Blood Pressure',
 *   value: '120/80',
 *   unit: 'mmHg',
 *   status: 'normal',
 * };
 */
export interface IVital {
  /** Display label for the vital */
  label: string;
  /** Measured value */
  value: string | number;
  /** Unit of measurement */
  unit: string;
  /** Health status indicator */
  status?: 'normal' | 'warning' | 'critical';
  /** Timestamp of measurement */
  timestamp?: Date;
  /** Reference/normal range */
  referenceRange?: string;
  /** Notes about the reading */
  notes?: string;
}

/**
 * Complete Vital Signs Set
 * All vital signs for a patient at a point in time
 */
export interface IVitals {
  /** Blood pressure (systolic/diastolic) */
  bloodPressure: { systolic: number; diastolic: number };
  /** Oxygen saturation percentage */
  spo2: number;
  /** Body temperature in Celsius */
  temperature: number;
  /** Heart rate in beats per minute */
  heartRate: number;
  /** Respiratory rate */
  respiratoryRate?: number;
  /** Measurement timestamp */
  timestamp: Date;
  /** Overall status */
  overallStatus?: 'normal' | 'warning' | 'critical';
}

// ===== REPORT TYPES =====

/**
 * Clinical Report
 * 
 * Represents a generated clinical report
 * 
 * @example
 * const report: IReport = {
 *   id: 'RPT-001',
 *   title: 'Comprehensive Health Assessment',
 *   date: new Date('2026-02-18'),
 *   paramCount: 62,
 *   verified: true,
 *   icon: '📋',
 * };
 */
export interface IReport {
  /** Unique report identifier */
  id: string;
  /** Report title */
  title: string;
  /** Report generation date */
  date: Date;
  /** Number of parameters analyzed */
  paramCount: number;
  /** Whether report is verified by clinician */
  verified: boolean;
  /** Report type icon (emoji) */
  icon: string;
  /** Report type/category */
  type?: 'comprehensive' | 'metabolic' | 'cardiac' | 'routine';
  /** Report status */
  status?: 'draft' | 'pending' | 'completed' | 'archived';
  /** Clinician who verified it */
  verifiedBy?: string;
  /** Verification timestamp */
  verifiedAt?: Date;
  /** Associated patient ID */
  patientId?: string;
  /** Report file URL (PDF) */
  fileUrl?: string;
  /** Report content/summary */
  summary?: string;
  /** Report findings */
  findings?: string[];
  /** Recommendations */
  recommendations?: string[];
}

/**
 * Report List Response
 * Used for paginated report lists
 */
export interface IReportList {
  /** Array of reports */
  reports: IReport[];
  /** Total number of reports */
  total: number;
  /** Current page */
  page: number;
  /** Items per page */
  pageSize: number;
  /** Total pages */
  totalPages: number;
}

// ===== CHECKUP TYPES =====

/**
 * Checkup Module/Card
 * 
 * Represents a diagnostic module in the checkups dashboard
 * 
 * @example
 * const vitalsCheckup: ICheckup = {
 *   id: 'checkup-vitals',
 *   title: 'VITALS',
 *   category: 'vital',
 *   icon: '💓',
 *   description: 'Measure blood pressure, oxygen, temperature, heart rate',
 * };
 */
export interface ICheckup {
  /** Unique checkup ID */
  id: string;
  /** Checkup title */
  title: string;
  /** Checkup category */
  category: 'vital' | 'scan' | 'metabolic' | 'cardiac' | 'other';
  /** Display icon (emoji) */
  icon: string;
  /** Description of what this checkup measures */
  description: string;
  /** Whether this checkup is active/available */
  available?: boolean;
  /** Time estimate in minutes */
  estimatedTime?: number;
  /** Parameters measured in this checkup */
  parameters?: string[];
  /** Status: not started, in progress, completed */
  status?: 'pending' | 'in-progress' | 'completed';
  /** Checkup results (if completed) */
  results?: IVital[];
  /** Recommended variant for UI */
  variant?: 'default' | 'featured' | 'empty';
  /** Click handler */
  onStart?: () => void;
}

/**
 * Dashboard Configuration
 * Full configuration for checkups dashboard
 */
export interface IDashboardConfig {
  /** Array of checkup modules */
  checkups: ICheckup[];
  /** Patient information */
  patient?: IPatient;
  /** Session information */
  session?: IPatientSession;
  /** System status */
  systemStatus?: 'operational' | 'warning' | 'error';
}

// ===== DIAGNOSTIC RESULT TYPES =====

/**
 * Diagnostic Result
 * Result from diagnostic analysis
 * 
 * @deprecated Use IReport instead for new code
 */
export interface DiagnosticResult {
  /** Result ID */
  id: string;
  /** Patient ID */
  patientId: string;
  /** Diagnosis description */
  diagnosis: string;
  /** Confidence level (0-1) */
  confidence: number;
  /** Result timestamp */
  timestamp: Date;
  /** Additional result data */
  data?: unknown;
}

/**
 * Diagnostic Analysis
 * Advanced diagnostic analysis result
 */
export interface IDiagnosticAnalysis {
  /** Analysis ID */
  id: string;
  /** Patient ID */
  patientId: string;
  /** Analysis type */
  type: 'ml-model' | 'rule-based' | 'manual';
  /** Primary diagnosis */
  diagnosis: string;
  /** Confidence score (0-100) */
  confidence: number;
  /** Differential diagnoses */
  differentials?: string[];
  /** Severity level */
  severity?: 'low' | 'medium' | 'high' | 'critical';
  /** Recommendations */
  recommendations?: string[];
  /** Analysis timestamp */
  timestamp: Date;
  /** Analyzed by */
  analyzedBy?: string;
}

// ===== LEGACY TYPES (kept for compatibility) =====

/**
 * @deprecated Use IPatient instead
 */
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
}

// ===== TYPE UNIONS =====

/**
 * Checkup category union
 */
export type CheckupCategory = 'vital' | 'scan' | 'metabolic' | 'cardiac' | 'other';

/**
 * Report type union
 */
export type ReportType = 'comprehensive' | 'metabolic' | 'cardiac' | 'routine';

/**
 * Status union (common statuses)
 */
export type Status = 'pending' | 'in-progress' | 'completed' | 'failed' | 'archived';

/**
 * Health status union
 */
export type HealthStatus = 'normal' | 'warning' | 'critical';

// ===== UTILITY TYPES =====

/**
 * Partial response where some fields are optional
 */
export type PartialPatient = Partial<IPatient>;

/**
 * Readonly patient (immutable)
 */
export type ReadonlyPatient = Readonly<IPatient>;

/**
 * Patient with required fields
 */
export type RequiredPatient = Required<IPatient>;

/**
 * Keyed patient by ID
 */
export type PatientMap = Record<string, IPatient>;

/**
 * Report with guaranteed data
 */
export type FilledReport = Required<IReport>;

// ===== FORM TYPES =====

/**
 * Form validation state
 */
export interface IFormError {
  /** Field name that has error */
  field: string;
  /** Error message */
  message: string;
  /** Error type */
  type?: 'required' | 'invalid' | 'mismatch' | 'custom';
}

/**
 * Form state for patient data
 */
export interface IPatientFormData {
  /** Patient name */
  name: string;
  /** Patient age */
  age: number;
  /** Blood group */
  bloodGroup: string;
  /** Height */
  height: string;
  /** Weight */
  weight: string;
  /** Gender */
  gender?: 'M' | 'F' | 'Other';
}

// ===== API REQUEST TYPES =====

/**
 * Paginated request parameters
 */
export interface IPaginationParams {
  /** Page number (1-indexed) */
  page: number;
  /** Items per page */
  pageSize: number;
  /** Sort field */
  sortBy?: string;
  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
  /** Search query */
  search?: string;
}

/**
 * Filter parameters for reports
 */
export interface IReportFilterParams extends IPaginationParams {
  /** Filter by report type */
  type?: ReportType;
  /** Filter by status */
  status?: Status;
  /** Date range start */
  dateFrom?: Date;
  /** Date range end */
  dateTo?: Date;
  /** Filter by verified status */
  verified?: boolean;
}








