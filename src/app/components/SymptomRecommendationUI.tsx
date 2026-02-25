'use client';

import { useState } from 'react';

interface MatchedTest {
  name: string;
  description?: string;
  parameters: string[];
  timeToResults: string;
  category: string;
}

interface RecommendationResponse {
  matchedTests: MatchedTest[];
  recommendations: string;
  nextSteps: string;
}

export function SymptomRecommendationUI() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<RecommendationResponse | null>(null);

  const medicalBlue = '#174EA6';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await fetch('/api/yolo-health/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSymptoms('');
    setData(null);
    setError('');
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
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none"
                style={{ '--medical-blue': medicalBlue } as React.CSSProperties}
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
                className="flex-1 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-slate-300"
                style={{ backgroundColor: medicalBlue }}
                onMouseEnter={(e) => {
                  if (!loading && symptoms.trim()) {
                    e.currentTarget.style.backgroundColor = '#0d47a1';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = medicalBlue;
                }}
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
              icon={<MedicalTestIcon color={medicalBlue} />}
              bgColor="bg-blue-50"
              borderColor="border-blue-200"
            >
              {data.matchedTests.length === 0 ? (
                <p className="text-slate-600">No matching tests found. Try different symptom descriptions.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.matchedTests.map((test: MatchedTest) => (
                    <TestCard key={test.name} test={test} medicalBlue={medicalBlue} />
                  ))}
                </div>
              )}
            </ResultSection>

            {/* Recommendations */}
            <ResultSection
              title="Recommendations"
              icon={<RecommendationIcon color={medicalBlue} />}
              bgColor="bg-blue-50"
              borderColor="border-blue-200"
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
              icon={<NextStepsIcon color={medicalBlue} />}
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
              <p className="flex items-center justify-center gap-2">
                <InfoIcon color={medicalBlue} /> <strong>Note:</strong> These recommendations are for informational purposes only.
                Always consult with a healthcare professional for medical advice.
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!data && !loading && !error && (
          <div className="text-center py-12">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              <MedicalTestIcon color={medicalBlue} />
            </div>
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
  icon: React.ReactNode;
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
  medicalBlue: string;
}

function TestCard({ test, medicalBlue }: TestCardProps) {
  const [expanded, setExpanded] = useState(false);

  const categoryIcons: { [key: string]: React.ReactNode } = {
    cardiovascular: <HeartIcon color={medicalBlue} />,
    metabolic: <LabIcon color={medicalBlue} />,
    blood: <BloodIcon color={medicalBlue} />,
    'vital signs': <VitalsIcon color={medicalBlue} />,
    endocrine: <EndocrineIcon color={medicalBlue} />,
    renal: <RenalIcon color={medicalBlue} />,
    hepatic: <HepaticIcon color={medicalBlue} />,
    immune: <ImmuneIcon color={medicalBlue} />,
  };
  const icon = categoryIcons[test.category] || <MedicalTestIcon color={medicalBlue} />;

  return (
    <div 
      className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
      style={{ borderColor: medicalBlue }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left font-semibold text-slate-900 hover:opacity-70 transition-opacity flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          {test.name}
        </div>
        <span className="text-slate-400">{expanded ? '−' : '+'}</span>
      </button>

      <div className="mt-2 flex items-center gap-4 text-sm">
        <span 
          className="inline-block px-2 py-1 rounded capitalize text-white"
          style={{ backgroundColor: medicalBlue }}
        >
          {test.category}
        </span>
        <span style={{ color: medicalBlue }}>{test.timeToResults}</span>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-sm font-semibold text-slate-700 mb-2">Parameters Measured:</p>
          <ul className="text-sm text-slate-600 space-y-1">
            {test.parameters.map((param) => (
              <li key={param} className="flex items-center gap-2">
                <span style={{ color: medicalBlue }}>•</span>
                {param}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ============ ICON COMPONENTS ============

function MedicalTestIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="16" rx="4" stroke={color} strokeWidth="2" fill="none" />
      <path d="M8 8h8v8H8z" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  );
}

function RecommendationIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
      <path d="M12 7v5l3 3" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function NextStepsIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M13 7l6 5-6 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
      <path d="M12 16v-4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1" fill={color} />
    </svg>
  );
}

// Category Icons
function HeartIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.5 3 12 5 12 5C12 5 12.5 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  );
}

function LabIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="12" height="12" rx="3" stroke={color} strokeWidth="2" fill="none" />
      <path d="M12 6v12" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function BloodIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="12" rx="7" ry="10" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  );
}

function VitalsIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="16" rx="4" stroke={color} strokeWidth="2" fill="none" />
      <path d="M8 12h2l2-4 2 8h2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EndocrineIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" fill="none" />
      <path d="M12 8v8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function RenalIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="8" cy="12" rx="4" ry="8" stroke={color} strokeWidth="2" fill="none" />
      <ellipse cx="16" cy="12" rx="4" ry="8" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  );
}

function HepaticIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="12" height="8" rx="4" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  );
}

function ImmuneIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2v20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  );
}