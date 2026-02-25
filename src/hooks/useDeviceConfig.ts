/**
 * Device Configuration Hook
 * 
 * React hook for easily managing device test configuration in components
 */

'use client';

import { useState, useCallback } from 'react';
import {
  getDeviceConfig,
  getDeviceConfigBatch,
  validateDeviceBatch,
  formatDeviceConfig,
  isDeviceConfigReady,
  isDeviceConfigError,
  type DeviceTestConfig,
  type DeviceConfigError,
} from '@/lib/deviceConfig';

interface UseDeviceConfigResult {
  // State
  config: DeviceTestConfig | DeviceConfigError | null;
  batchConfigs: (DeviceTestConfig | DeviceConfigError)[] | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadConfig: (testId: number) => void;
  loadBatchConfig: (testIds: number[]) => void;
  validateBatch: (testIds: number[]) => ReturnType<typeof validateDeviceBatch>;
  clearConfig: () => void;

  // Helpers
  isReady: boolean;
  statusMessage: string;
}

/**
 * Hook for managing device configuration
 * 
 * @example
 * const { config, loadConfig, isReady } = useDeviceConfig();
 * 
 * useEffect(() => {
 *   loadConfig(1); // Load ECG config
 * }, []);
 * 
 * if (isReady) {
 *   console.log('Ready to start test:', config?.testName);
 * }
 */
export function useDeviceConfig(): UseDeviceConfigResult {
  const [config, setConfig] = useState<DeviceTestConfig | DeviceConfigError | null>(null);
  const [batchConfigs, setBatchConfigs] = useState<(DeviceTestConfig | DeviceConfigError)[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadConfig = useCallback((testId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = getDeviceConfig(testId);
      setConfig(result);

      if (!result.isReady) {
        setError((result as DeviceConfigError).statusMessage);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadBatchConfig = useCallback((testIds: number[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const results = getDeviceConfigBatch(testIds);
      setBatchConfigs(results);

      const failedCount = results.filter((c) => !c.isReady).length;
      if (failedCount > 0) {
        setError(`${failedCount} test(s) failed validation`);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const validateBatch = useCallback((testIds: number[]) => {
    return validateDeviceBatch(testIds);
  }, []);

  const clearConfig = useCallback(() => {
    setConfig(null);
    setBatchConfigs(null);
    setError(null);
  }, []);

  const isReady = config !== null && isDeviceConfigReady(config);
  const statusMessage =
    config?.statusMessage || 'No configuration loaded';

  return {
    config,
    batchConfigs,
    isLoading,
    error,
    loadConfig,
    loadBatchConfig,
    validateBatch,
    clearConfig,
    isReady,
    statusMessage,
  };
}

export default useDeviceConfig;
