'use client';

import React, { useState } from 'react';
import { TestParametersModal } from './TestParametersModal';

interface TestRecommendation {
  testName: string;
  explanation: string;
  parameters: string[];
  timeToResults: string;
  category: string;
}

interface TestSelectionModalProps {
  tests: TestRecommendation[];
  onBack: () => void;
  onProceed: (selectedTests: TestRecommendation[]) => void;
  urgencyLevel?: 'low' | 'medium' | 'high';
  generalAdvice?: string;
}

interface SelectedTest extends TestRecommendation {
  selectedAt?: Date;
}

const URGENCY_COLORS: Record<string, { bg: string; border: string; badge: string; text: string }> = {
  low: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-700',
    text: 'text-green-700',
  },
  medium: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-700',
    text: 'text-yellow-700',
  },
  high: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
    text: 'text-red-700',
  },
};

const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    cardiovascular: '❤️',
    metabolic: '⚗️',
    blood: '🩸',
    'vital signs': '📊',
    endocrine: '🧬',
    renal: '🫘',
    hepatic: '🧪',
    immune: '🛡️',
    general: '🏥',
  };
  return icons[category] || '🔬';
};

const getUrgencyLabel = (level?: string): string => {
  const labels: Record<string, string> = {
    low: 'Low Priority',
    medium: 'Monitor',
    high: 'Urgent',
  };
  return labels[level || 'low'] || 'Standard';
};

export const TestSelectionModal: React.FC<TestSelectionModalProps> = ({
  tests,
  onBack,
  onProceed,
  urgencyLevel = 'low',
  generalAdvice,
}) => {
  const [selectedTests, setSelectedTests] = useState<SelectedTest[]>([]);
  const [expandedTest, setExpandedTest] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [parametersModalTest, setParametersModalTest] = useState<string | null>(null);

  const handleSelectTest = (test: TestRecommendation) => {
    setSelectedTests((prev) => {
      const alreadySelected = prev.find((t) => t.testName === test.testName);
      if (alreadySelected) {
        return prev.filter((t) => t.testName !== test.testName);
      }
      return [...prev, { ...test, selectedAt: new Date() }];
    });
  };

  const handleProceed = () => {
    if (selectedTests.length === 0) {
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmProceed = () => {
    onProceed(selectedTests);
  };

  const isTestSelected = (testName: string): boolean => {
    return selectedTests.some((t) => t.testName === testName);
  };

  // Confirmation View
  if (showConfirmation) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-indigo-50 overflow-y-auto">
        {/* Confirmation Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-8 shadow-lg flex-shrink-0">
          <h2 className="text-3xl font-bold">Selection Confirmed ✓</h2>
          <p className="text-blue-100 mt-2">You have selected {selectedTests.length} test(s)</p>
        </div>

        {/* Confirmation Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          {/* Next Steps */}
          <div className="bg-white border border-indigo-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Next Steps
            </h3>
            <ol className="space-y-3 text-indigo-800">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span>Proceed to the test collection area when ready</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span>Follow the kiosk staff instructions for each test</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span>Results will be available within the estimated times shown</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <span>Return to the kiosk to collect your comprehensive health report</span>
              </li>
            </ol>
          </div>

          {/* Selected Tests Summary */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Selected Tests Summary</h3>
            <div className="space-y-3">
              {selectedTests.map((test, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{getCategoryIcon(test.category)}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{test.testName}</p>
                      <p className="text-xs text-gray-600 mt-1">⏱️ {test.timeToResults}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700">
                      Selected
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Precautions/Tips */}
          {generalAdvice && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-2">💡 Important Information</h3>
              <p className="text-blue-800 text-sm leading-relaxed">{generalAdvice}</p>
            </div>
          )}

          {/* Urgency Alert */}
          <div
            className={`p-4 rounded-lg border-l-4 ${
              URGENCY_COLORS[urgencyLevel].bg
            } ${URGENCY_COLORS[urgencyLevel].border} border`}
          >
            <div className={`text-sm font-semibold ${URGENCY_COLORS[urgencyLevel].text}`}>
              Priority Level: {getUrgencyLabel(urgencyLevel)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white border-t border-gray-200 px-6 py-6 flex gap-4 flex-shrink-0">
          <button
            onClick={() => setShowConfirmation(false)}
            className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition-colors"
          >
            ← Back to Selection
          </button>
          <button
            onClick={handleConfirmProceed}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg transition-colors shadow-lg"
          >
            Ready for Tests →
          </button>
        </div>
      </div>
    );
  }

  // Selection View
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-indigo-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-8 shadow-lg flex-shrink-0">
        <h2 className="text-3xl font-bold">Select Your Tests</h2>
        <p className="text-blue-100 mt-2">
          {selectedTests.length} of {tests.length} test(s) selected
        </p>
      </div>

      {/* Progress Bar */}
      {tests.length > 0 && (
        <div className="px-6 py-4 bg-white border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-gray-700">Selection Progress:</span>
            <span className="text-sm text-blue-600 font-bold">
              {selectedTests.length}/{tests.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(selectedTests.length / tests.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Test Cards */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4">
        {tests.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <p className="text-gray-500 text-lg">No tests to display</p>
          </div>
        ) : (
          tests.map((test, index) => {
            const isSelected = isTestSelected(test.testName);
            const isExpanded = expandedTest === test.testName;

            return (
              <div
                key={index}
                className={`border-2 rounded-lg overflow-hidden shadow-md transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                {/* Card Header */}
                <div
                  onClick={() => setExpandedTest(isExpanded ? null : test.testName)}
                  className={`px-6 py-4 cursor-pointer flex items-start justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                      : 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white'
                  }`}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-2xl">{getCategoryIcon(test.category)}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{test.testName}</h3>
                      <p className="text-blue-100 text-sm mt-1 capitalize">{test.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isSelected && (
                      <span className="px-3 py-1 bg-white text-blue-600 rounded-full text-xs font-bold">
                        ✓ Selected
                      </span>
                    )}
                    <span className="text-xl">{isExpanded ? '▼' : '▶'}</span>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className={`px-6 py-6 space-y-4 ${isSelected ? 'bg-blue-50' : 'bg-white'}`}>
                    {/* Explanation */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Why This Test:</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{test.explanation}</p>
                    </div>

                    {/* Parameters */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Parameters Measured:</h4>
                      <div className="flex flex-wrap gap-2">
                        {test.parameters.map((param, paramIdx) => (
                          <span
                            key={paramIdx}
                            className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {param}
                          </span>
                        ))}
                      </div>
                      {test.parameters.length === 0 && (
                        <p className="text-sm text-gray-500 italic">
                          Contact staff for parameter details
                        </p>
                      )}
                    </div>

                    {/* Time to Results */}
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <span className="text-lg">⏱️</span>
                      <div>
                        <span className="font-semibold text-gray-700">Time to Results: </span>
                        <span className="text-gray-600">{test.timeToResults}</span>
                      </div>
                    </div>

                    {/* Learn More & Select Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setParametersModalTest(test.testName)}
                        className="flex-1 py-3 px-4 rounded-lg font-bold transition-all text-center bg-indigo-100 hover:bg-indigo-200 text-indigo-700 border border-indigo-300"
                      >
                        📚 Learn More
                      </button>
                      <button
                        onClick={() => handleSelectTest(test)}
                        className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all text-center ${
                          isSelected
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                        }`}
                      >
                        {isSelected ? '✓ Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Collapsed Summary */}
                {!isExpanded && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Time to Results:</p>
                        <p className="text-sm font-semibold text-gray-700">{test.timeToResults}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTest(test);
                      }}
                      className={`px-4 py-2 rounded-lg font-bold transition-all ${
                        isSelected
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                      }`}
                    >
                      {isSelected ? '✓ Selected' : 'Select'}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Action Buttons */}
      <div className="bg-white border-t border-gray-200 px-6 py-6 flex gap-4 flex-shrink-0">
        <button
          onClick={onBack}
          className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition-colors"
        >
          ← Back to Symptoms
        </button>
        <button
          onClick={handleProceed}
          disabled={selectedTests.length === 0}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-lg transition-colors disabled:cursor-not-allowed shadow-lg"
        >
          Continue ({selectedTests.length} selected) →
        </button>
      </div>

      {/* Parameter Details Modal */}
      <TestParametersModal
        testName={parametersModalTest || ''}
        isOpen={parametersModalTest !== null}
        onClose={() => setParametersModalTest(null)}
      />
    </div>
  );
};

export default TestSelectionModal;
