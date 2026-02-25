/**
 * YoloHealth Recommendation System - Type Definitions
 * 
 * Export all types for use throughout your application
 */

export interface YoloHealthTest {
  id: number;
  name: string;
  symptoms: string[];
  description: string;
  parameters: string[];
  timeToResults: string;
  category: string;
  deviceCapability: boolean;
}

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

export interface RecommendRequest {
  symptoms: string;
}

export interface RecommendError {
  error: string;
}

export type RecommendAPIResponse = RecommendationResponse | RecommendError;

export const testCategories = [
  'cardiovascular',
  'metabolic',
  'blood',
  'vital signs',
  'endocrine',
  'renal',
  'hepatic',
  'immune',
] as const;

export type TestCategory = typeof testCategories[number];
