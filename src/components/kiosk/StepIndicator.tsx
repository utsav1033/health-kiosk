'use client';

import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepLabels = [],
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <React.Fragment key={index}>
            {/* Step Circle */}
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                transition-all duration-300
                ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-lg scale-110'
                    : isActive
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-200 text-slate-600'
                }
              `}
            >
              {isActive && !isCurrent ? '✓' : stepNumber}
            </div>

            {/* Step Label */}
            {stepLabels[index] && (
              <div className="text-center mr-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                  Step {stepNumber}
                </p>
                <p className={`text-sm font-semibold ${isCurrent ? 'text-blue-600' : 'text-slate-700'}`}>
                  {stepLabels[index]}
                </p>
              </div>
            )}

            {/* Connector Line */}
            {index < totalSteps - 1 && (
              <div
                className={`
                  h-1 flex-1 max-w-32 rounded-full transition-all duration-300
                  ${isActive ? 'bg-green-500' : 'bg-slate-200'}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
