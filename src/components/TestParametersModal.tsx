/**
 * Test Parameter Details Panel Component
 * 
 * Displays educational information about test parameters including:
 * - What each parameter measures
 * - Normal ranges
 * - What abnormal results might indicate
 * - Clinical significance
 */

'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown, Info, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { ParameterInfo, getTestParameters } from '@/lib/testParameters';

interface TestParametersModalProps {
  testName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TestParametersModal: React.FC<TestParametersModalProps> = ({
  testName,
  isOpen,
  onClose,
}) => {
  const [expandedParams, setExpandedParams] = useState<Set<string>>(new Set());
  const parameters = useMemo(() => getTestParameters(testName), [testName]);

  const toggleParameter = (paramName: string) => {
    setExpandedParams((prev) => {
      const next = new Set(prev);
      if (next.has(paramName)) {
        next.delete(paramName);
      } else {
        next.add(paramName);
      }
      return next;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{testName}</h2>
            <p className="text-sm text-gray-600 mt-1">
              Understanding the parameters this test measures
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {parameters.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-gray-500">
              <Info className="w-5 h-5 mr-2" />
              <p>Parameter information coming soon for this test</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                📚 This test measures {parameters.length} parameter{parameters.length !== 1 ? 's' : ''}.
                Click on each parameter below to learn what it measures and what the results mean.
              </p>

              {parameters.map((param, index) => (
                <ParameterCard
                  key={index}
                  parameter={param}
                  isExpanded={expandedParams.has(param.name)}
                  onToggle={() => toggleParameter(param.name)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex justify-end bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface ParameterCardProps {
  parameter: ParameterInfo;
  isExpanded: boolean;
  onToggle: () => void;
}

const ParameterCard: React.FC<ParameterCardProps> = ({ parameter, isExpanded, onToggle }) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
      {/* Header - Always visible */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
      >
        <div className="flex items-center gap-4 text-left">
          <div>
            <div className="font-semibold text-gray-900">{parameter.name}</div>
            {parameter.abbreviation && (
              <div className="text-sm text-gray-600">{parameter.abbreviation}</div>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white rounded text-sm text-gray-700 border">
            {parameter.unit}
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="px-6 py-4 space-y-4 bg-gray-50 border-t">
          {/* Description */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-2">Quick Description</p>
            <p className="text-sm text-gray-700">{parameter.description}</p>
          </div>

          {/* What it measures */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              What This Measures
            </h4>
            <p className="text-sm text-gray-700">{parameter.whatItMeasures}</p>
          </div>

          {/* Normal Range */}
          <div className="bg-white p-4 rounded-lg border border-green-200 bg-green-50">
            <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
              ✓ Normal Range
            </h4>
            <p className="text-sm font-mono text-green-900 mb-1">{parameter.normalRange}</p>
            <p className="text-xs text-green-800">Unit: {parameter.unit}</p>
          </div>

          {/* Abnormal Indicators */}
          <div className="bg-white p-4 rounded-lg border border-orange-200 bg-orange-50">
            <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              What Abnormal Results Might Indicate
            </h4>
            <ul className="space-y-2">
              {parameter.abnormalIndicates.map((indicator, idx) => {
                const isHigh = indicator.includes('High') || indicator.includes('Elevated');
                const isLow = indicator.includes('Low') || indicator.includes('low');

                return (
                  <li key={idx} className="flex gap-3 items-start text-sm">
                    {isHigh ? (
                      <TrendingUp className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    ) : isLow ? (
                      <TrendingDown className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-gray-700">{indicator}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Clinical Significance */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Why This Matters</h4>
            <p className="text-sm text-blue-800">{parameter.clinicalSignificance}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestParametersModal;
