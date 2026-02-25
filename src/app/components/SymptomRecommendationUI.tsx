/**
 * Example Component: SymptomRecommendationUI
 * 
 * This is a complete, ready-to-use React component that demonstrates
 * how to integrate the YoloHealth recommendation system into your UI.
 * 
 * Usage:
 * 1. Place this file in: src/app/components/SymptomRecommendationUI.tsx
 * 2. Import in your page: import { SymptomRecommendationUI } from '@/app/components/SymptomRecommendationUI'
 * 3. Add to your JSX: <SymptomRecommendationUI />
 */

'use client';

import { useState } from 'react';
import { useYoloHealthRecommendations, MatchedTest, RecommendationResponse } from '@/lib/hooks/useYoloHealthRecommendations';

export function SymptomRecommendationUI() {
  const [symptoms, setSymptoms] = useState('');
  const { loading, error, data, getRecommendations, reset } = useYoloHealthRecommendations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await getRecommendations(symptoms);
  };

  const handleReset = () => {
    setSymptoms('');
    reset();
  };

  const commonSymptoms = [
    'chest pain, shortness of breath',
    'fatigue, weakness',
    'excessive thirst, frequent urination',
    'headache, dizziness',
    'fever, chills',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Health Assessment
          </h1>
          <p className="text-lg text-slate-600">
            Describe your symptoms and get personalized health test recommendations
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="symptoms" className="block text-sm font-semibold text-slate-700 mb-3">
                Describe Your Symptoms
              </label>
              <textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., chest pain, shortness of breath, dizziness..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                disabled={loading}
              />
              <p className="mt-2 text-xs text-slate-500">
                Be as specific as possible. Include multiple symptoms if applicable.
              </p>
            </div>

            {/* Quick Suggestions */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-700 mb-3">Quick Examples:</p>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setSymptoms(suggestion)}
                    disabled={loading}
                    className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 disabled:opacity-50 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || !symptoms.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⊙</span>
                    Analyzing...
                  </span>
                ) : (
                  'Get Recommendations'
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="px-6 bg-slate-200 hover:bg-slate-300 disabled:opacity-50 text-slate-700 font-semibold py-3 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Error Section */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Error</h3>
            <p className="text-red-700">{error}</p>
            <p className="text-sm text-red-600 mt-2">
              Please check your input and try again. If the problem persists, contact support.
            </p>
          </div>
        )}

        {/* Results Section */}
        {data && (
          <div className="space-y-6">
            {/* Matched Tests */}
            <ResultSection
              title={`Matched Tests (${data.matchedTests.length})`}
              icon="🔬"
              bgColor="bg-blue-50"
              borderColor="border-blue-200"
            >
              {data.matchedTests.length === 0 ? (
                <p className="text-slate-600">No matching tests found. Try different symptom descriptions.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.matchedTests.map((test: MatchedTest) => (
                    <TestCard key={test.name} test={test} />
                  ))}
                </div>
              )}
            </ResultSection>

            {/* Recommendations */}
            <ResultSection
              title="AI Recommendations"
              icon="💡"
              bgColor="bg-green-50"
              borderColor="border-green-200"
            >
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                  {data.recommendations}
                </p>
              </div>
            </ResultSection>

            {/* Next Steps */}
            <ResultSection
              title="Next Steps"
              icon="→"
              bgColor="bg-purple-50"
              borderColor="border-purple-200"
            >
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                  {data.nextSteps}
                </p>
              </div>
            </ResultSection>

            {/* Footer Info */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center text-sm text-slate-600">
              <p>
                💬 <strong>Note:</strong> These recommendations are for informational purposes only.
                Always consult with a healthcare professional for medical advice.
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!data && !loading && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏥</div>
            <p className="text-lg text-slate-600">
              Enter your symptoms above to get personalized health test recommendations
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Reusable Result Section Component
 */
interface ResultSectionProps {
  title: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  children: React.ReactNode;
}

function ResultSection({
  title,
  icon,
  bgColor,
  borderColor,
  children,
}: ResultSectionProps) {
  return (
    <div className={`${bgColor} border-2 ${borderColor} rounded-lg p-8`}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

/**
 * Test Card Component
 */
interface TestCardProps {
  test: MatchedTest;
}

function TestCard({ test }: TestCardProps) {
  const [expanded, setExpanded] = useState(false);

  const categoryIcons: { [key: string]: string } = {
    cardiovascular: '❤️',
    metabolic: '⚗️',
    blood: '🩸',
    'vital signs': '📊',
    endocrine: '⚡',
    renal: '🫘',
    hepatic: '🧬',
    immune: '🛡️',
  };

  const icon = categoryIcons[test.category] || '🔬';

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left font-semibold text-slate-900 hover:text-blue-600 transition-colors flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          {test.name}
        </div>
        <span className="text-slate-400">{expanded ? '−' : '+'}</span>
      </button>

      <div className="mt-2 flex items-center gap-4 text-sm">
        <span className="inline-block bg-slate-100 px-2 py-1 rounded text-slate-700 capitalize">
          {test.category}
        </span>
        <span className="text-slate-600">⏱️ {test.timeToResults}</span>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-sm font-semibold text-slate-700 mb-2">Parameters Measured:</p>
          <ul className="text-sm text-slate-600 space-y-1">
            {test.parameters.map((param) => (
              <li key={param} className="flex items-center gap-2">
                <span className="text-blue-500">•</span>
                {param}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
