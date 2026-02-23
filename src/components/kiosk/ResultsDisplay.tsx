'use client';

import React from 'react';
import type { CheckupResult } from '@/constants/checkupData';

interface ResultsDisplayProps {
  result: CheckupResult;
  deviceName: string;
  categoryTitle: string;
  categoryIcon: string;
  onContinue?: () => void;
  onNewCheckup?: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  result,
  deviceName,
  categoryTitle,
  categoryIcon,
  onContinue,
  onNewCheckup,
}) => {
  const statusColors = {
    normal: { bg: '#F0FDF4', border: '#16A34A', text: '#15803D' },
    warning: { bg: '#FFFBEB', border: '#F59E0B', text: '#92400E' },
    critical: { bg: '#FEF2F2', border: '#DC2626', text: '#991B1B' },
  };

  const statusIcons = {
    normal: '✓',
    warning: '⚠',
    critical: '!',
  };

  const colors = statusColors[result.overallStatus];

  return (
    <div className="flex-1 overflow-y-auto px-12 py-8 flex flex-col">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">
          Checkup Complete
        </h2>
        <p className="text-lg text-slate-600">
          {categoryIcon} {categoryTitle} • {deviceName}
        </p>
      </div>

      {/* Overall Status Card */}
      <div
        className="rounded-2xl p-8 mb-8 border-2"
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
        }}
      >
        <div className="flex items-center gap-6">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold"
            style={{ backgroundColor: colors.border, color: 'white' }}
          >
            {statusIcons[result.overallStatus]}
          </div>
          <div>
            <h3
              className="text-2xl font-bold mb-2 capitalize"
              style={{ color: colors.text }}
            >
              {result.overallStatus === 'normal' ? 'Healthy' : result.overallStatus === 'warning' ? 'Monitor' : 'Alert'}
            </h3>
            <p className="text-lg text-slate-700">
              {result.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {result.metrics.map((metric, idx) => {
          const metricColors = statusColors[metric.status];
          return (
            <div
              key={idx}
              className="rounded-xl p-6 border"
              style={{
                backgroundColor: metricColors.bg,
                borderColor: metricColors.border,
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: metricColors.text }}
              >
                {metric.label}
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {metric.value}
                <span className="text-lg text-slate-500 ml-2">{metric.unit}</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-6 mt-auto mb-6">
        <button
          onClick={onNewCheckup}
          className="flex-1 py-4 px-6 rounded-xl bg-white border-2 border-slate-300 text-slate-700 font-bold text-lg hover:bg-slate-50 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined mr-2">add_circle</span>
          New Checkup
        </button>
        <button
          onClick={onContinue}
          className="flex-1 py-4 px-6 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined mr-2">check_circle</span>
          Done
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
