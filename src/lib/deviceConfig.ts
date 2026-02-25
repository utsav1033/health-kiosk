/**
 * YoloHealth Device Configuration & Integration
 * 
 * This module manages device-ready test configuration.
 * Currently returns formatted configuration strings.
 * Future: Will interface with actual hardware drivers.
 */

import { YOLO_HEALTH_TESTS, type YoloHealthTest } from './yoloHealthTests';

/**
 * Device Test Configuration
 * Represents a test ready to run on the YoloHealth device
 */
export interface DeviceTestConfig {
  // Test identification
  testId: number;
  testName: string;
  
  // Device specifications
  category: string;
  parameters: string[];
  timeToResults: string;
  
  // Device instructions
  deviceInstructions: string;
  
  // Configuration status
  isReady: boolean;
  statusMessage: string;
  
  // Future hardware integration fields
  devicePort?: string;           // Serial/USB port for device
  firmwareVersion?: string;      // Device firmware compatibility
  calibrationStatus?: string;    // Calibration requirement
  sampleType?: string;          // Type of sample needed (blood, etc.)
}

/**
 * Device error/invalid configuration
 */
export interface DeviceConfigError {
  testId?: number;
  isReady: false;
  statusMessage: string;
  errorCode: string;
}

/**
 * Get device-ready configuration for a test
 * 
 * @param testId - The ID of the test to configure
 * @returns Device configuration or error
 * 
 * @example
 * const config = getDeviceConfig(1); // ECG
 * // Returns: {
 * //   testId: 1,
 * //   testName: "12-Lead ECG",
 * //   isReady: true,
 * //   statusMessage: "Ready to start 12-Lead ECG on YoloHealth device"
 * // }
 */
export function getDeviceConfig(
  testId: number
): DeviceTestConfig | DeviceConfigError {
  try {
    // Validate input
    if (!testId || typeof testId !== 'number' || testId < 1) {
      return {
        isReady: false,
        statusMessage: 'Invalid test ID provided',
        errorCode: 'INVALID_TEST_ID',
      };
    }

    // Find test in database
    const test = YOLO_HEALTH_TESTS.find((t) => t.id === testId);

    if (!test) {
      return {
        testId,
        isReady: false,
        statusMessage: `Test with ID ${testId} not found in YoloHealth database`,
        errorCode: 'TEST_NOT_FOUND',
      };
    }

    // Validate device capability
    if (!test.deviceCapability) {
      return {
        testId,
        isReady: false,
        statusMessage: `Test "${test.name}" is not available on YoloHealth device`,
        errorCode: 'NO_DEVICE_CAPABILITY',
      };
    }

    // Build device instructions based on test category
    const deviceInstructions = buildDeviceInstructions(test);

    // Return device-ready configuration
    const config: DeviceTestConfig = {
      testId: test.id,
      testName: test.name,
      category: test.category,
      parameters: test.parameters,
      timeToResults: test.timeToResults,
      deviceInstructions,
      isReady: true,
      statusMessage: `Ready to start ${test.name} on YoloHealth device`,
    };

    return config;
  } catch (error) {
    return {
      isReady: false,
      statusMessage: `Error retrieving device configuration: ${error instanceof Error ? error.message : 'Unknown error'}`,
      errorCode: 'CONFIG_ERROR',
    };
  }
}

/**
 * Get device configuration for multiple tests
 * 
 * @param testIds - Array of test IDs to configure
 * @returns Array of configurations (successful and failed)
 * 
 * @example
 * const configs = getDeviceConfigBatch([1, 2, 3]);
 * // Returns configurations for all tests in batch
 */
export function getDeviceConfigBatch(
  testIds: number[]
): (DeviceTestConfig | DeviceConfigError)[] {
  return testIds.map((testId) => getDeviceConfig(testId));
}

/**
 * Validate all tests in a batch can run on device
 * 
 * @param testIds - Array of test IDs to validate
 * @returns Object with validation results
 * 
 * @example
 * const validation = validateDeviceBatch([1, 2, 3]);
 * // Returns: { isValid: true, readyCount: 3, failedCount: 0, failures: [] }
 */
export function validateDeviceBatch(testIds: number[]): {
  isValid: boolean;
  readyCount: number;
  failedCount: number;
  failures: Array<{ testId: number; reason: string }>;
} {
  const configs = getDeviceConfigBatch(testIds);

  const readyConfigs = configs.filter((c) => c.isReady);
  const failedConfigs = configs.filter((c) => !c.isReady);

  return {
    isValid: failedConfigs.length === 0,
    readyCount: readyConfigs.length,
    failedCount: failedConfigs.length,
    failures: failedConfigs.map((config) => ({
      testId: (config as DeviceConfigError).testId || -1,
      reason: config.statusMessage,
    })),
  };
}

/**
 * Build device-specific instructions based on test category
 * 
 * @param test - The test object
 * @returns Instructions for device operator
 */
function buildDeviceInstructions(test: YoloHealthTest): string {
  const baseInstruction = `Initiate ${test.name} test on YoloHealth device`;

  const categoryInstructions: Record<string, string> = {
    cardiovascular:
      'Ensure patient is seated comfortably. Apply ECG leads to chest. Patient should remain still during measurement.',
    'vital signs':
      'Place cuff on upper arm at heart level. Keep patient relaxed for 5 minutes before measurement.',
    metabolic:
      'Ensure patient has fasted appropriately. Prepare fingerstick for blood sample collection.',
    'blood work':
      'Prepare venipuncture setup. Follow standard blood draw protocol. Label sample with patient ID.',
    endocrine:
      'Collect blood sample. Follow chain of custody procedures. Ensure proper sample handling.',
    immune:
      'Collect appropriate sample type. Maintain sterile technique throughout collection.',
    default: 'Follow standard collection protocol for this test type.',
  };

  const instruction =
    categoryInstructions[test.category] || categoryInstructions.default;

  return `${baseInstruction}. ${instruction}`;
}

/**
 * Get test name from test ID
 * Useful for quick lookups
 * 
 * @param testId - The ID of the test
 * @returns Test name or undefined if not found
 */
export function getTestNameById(testId: number): string | undefined {
  const test = YOLO_HEALTH_TESTS.find((t) => t.id === testId);
  return test?.name;
}

/**
 * Check if test is available on device
 * 
 * @param testId - The ID of the test
 * @returns True if test has device capability
 */
export function isTestDeviceCapable(testId: number): boolean {
  const test = YOLO_HEALTH_TESTS.find((t) => t.id === testId);
  return test?.deviceCapability ?? false;
}

/**
 * Get all device-capable tests
 * 
 * @returns Array of tests that can run on YoloHealth device
 */
export function getDeviceCapableTests(): YoloHealthTest[] {
  return YOLO_HEALTH_TESTS.filter((test) => test.deviceCapability);
}

/**
 * Format device configuration for display/logging
 * 
 * @param config - Device configuration object
 * @returns Formatted string for console/logging
 */
export function formatDeviceConfig(config: DeviceTestConfig | DeviceConfigError): string {
  if (!config.isReady) {
    return `[DEVICE CONFIG ERROR] ${config.statusMessage}`;
  }

  const readyConfig = config as DeviceTestConfig;
  return `[DEVICE READY] ${readyConfig.statusMessage} | Parameters: ${readyConfig.parameters.length} | Time: ${readyConfig.timeToResults}`;
}

/**
 * Type guard to check if config is successful
 */
export function isDeviceConfigReady(
  config: DeviceTestConfig | DeviceConfigError
): config is DeviceTestConfig {
  return config.isReady === true;
}

/**
 * Type guard to check if config is error
 */
export function isDeviceConfigError(
  config: DeviceTestConfig | DeviceConfigError
): config is DeviceConfigError {
  return config.isReady === false;
}

/**
 * Future: Device Hardware Integration Point
 * 
 * This function will be implemented to interface with actual hardware
 * For now, it's a placeholder for future integration
 */
export function sendConfigToDevice(
  config: DeviceTestConfig
): Promise<{ success: boolean; message: string }> {
  // TODO: Implement actual device communication
  // - Connect to device via serial/USB port
  // - Send test configuration
  // - Wait for device acknowledgment
  // - Handle device errors
  
  return Promise.resolve({
    success: true,
    message: `[SIMULATED] Configuration sent to device: ${config.testName}`,
  });
}

/**
 * Future: Stream test results from device
 */
export async function* streamDeviceResults(
  config: DeviceTestConfig
): AsyncGenerator<{ progress: number; data?: unknown; complete: boolean }> {
  // TODO: Implement actual device result streaming
  // - Open device connection
  // - Listen for result data
  // - Yield progress updates
  // - Close connection when complete
  
  yield { progress: 0, complete: false };
  yield { progress: 50, complete: false };
  yield { progress: 100, data: {}, complete: true };
}

/**
 * Device Configuration Examples for Documentation
 */
export const DEVICE_CONFIG_EXAMPLES = {
  ecgConfig: {
    testId: 1,
    testName: '12-Lead ECG',
    category: 'cardiovascular',
    parameters: [
      'Heart Rate',
      'Rhythm',
      'QT Interval',
      'ST Segment',
      'PR Interval',
      'QRS Duration',
      'Heart Rate Variability',
      'Atrial Fibrillation Detection',
    ],
    timeToResults: 'Immediate',
    deviceInstructions:
      'Initiate 12-Lead ECG test on YoloHealth device. Ensure patient is seated comfortably. Apply ECG leads to chest. Patient should remain still during measurement.',
    isReady: true,
    statusMessage: 'Ready to start 12-Lead ECG on YoloHealth device',
  },

  bpConfig: {
    testId: 2,
    testName: 'Blood Pressure Monitoring',
    category: 'vital signs',
    parameters: [
      'Systolic Pressure',
      'Diastolic Pressure',
      'Mean Arterial Pressure',
      'Pulse Pressure',
    ],
    timeToResults: 'Immediate',
    deviceInstructions:
      'Initiate Blood Pressure Monitoring test on YoloHealth device. Place cuff on upper arm at heart level. Keep patient relaxed for 5 minutes before measurement.',
    isReady: true,
    statusMessage:
      'Ready to start Blood Pressure Monitoring on YoloHealth device',
  },

  invalidConfig: {
    isReady: false,
    statusMessage: 'Test with ID 999 not found in YoloHealth database',
    errorCode: 'TEST_NOT_FOUND',
  },
};
