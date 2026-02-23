'use client';

import React from 'react';
import { HealthScoreProps } from './types';

export const HealthScoreCard: React.FC<HealthScoreProps> = ({
  score,
  label = 'Overall Health Score',
}) => {
  const getScoreColor = (value: number) => {
    if (value >= 80) return { color: '#16A34A', bg: '#F0FDF4', label: 'Excellent' };
    if (value >= 60) return { color: '#F59E0B', bg: '#FFFBEB', label: 'Good' };
    return { color: '#DC2626', bg: '#FEF2F2', label: 'Needs Attention' };
  };

  const scoreInfo = getScoreColor(score);

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      style={{ backgroundColor: scoreInfo.bg }}
    >
      <div className="px-8 py-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className="text-5xl font-bold"
              style={{ color: scoreInfo.color }}
            >
              {score}
            </span>
            <span className="text-lg text-slate-600 font-semibold">
              /100
            </span>
          </div>
          <p
            className="text-sm font-bold mt-2"
            style={{ color: scoreInfo.color }}
          >
            {scoreInfo.label}
          </p>
        </div>

        {/* Circular Progress */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={scoreInfo.color}
              strokeWidth="8"
              strokeDasharray={`${(score / 100) * 314} 314`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.5s ease-in-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-2xl font-bold"
              style={{ color: scoreInfo.color }}
            >
              {Math.round((score / 100) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthScoreCard;
