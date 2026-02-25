/**
 * useYoloHealthRecommendations - React Hook for YoloHealth Recommendations
 * 
 * Provides a convenient interface for fetching health test recommendations
 * based on patient symptoms.
 */

'use client';

import { useState, useCallback } from 'react';

export interface MatchedTest {
  name: string;
  parameters: string[];
  timeToResults: string;
  category: string;
}

export interface RecommendationResponse {
  symptoms: string;
  matchedTests: MatchedTest[];
  recommendations: string;
  nextSteps: string;
}

interface UseYoloHealthRecommendationsReturn {
  loading: boolean;
  error: string | null;
  data: RecommendationResponse | null;
  getRecommendations: (symptoms: string) => Promise<void>;
  reset: () => void;
}

export function useYoloHealthRecommendations(): UseYoloHealthRecommendationsReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RecommendationResponse | null>(null);

  const getRecommendations = useCallback(async (symptoms: string) => {
    if (!symptoms || symptoms.trim().length === 0) {
      setError('Please provide at least one symptom');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('/api/yolo-health/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: symptoms.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Request failed with status ${response.status}`
        );
      }

      const result: RecommendationResponse = await response.json();
      setData(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    getRecommendations,
    reset,
  };
}
