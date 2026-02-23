'use client';

import React from 'react';
import { MetricTileProps, HealthStatus } from './types';

const STATUS_COLORS: Record<HealthStatus, { bg: string; border: string; text: string; dot: string }> = {
  normal: {
    bg: '#F0FDF4',
    border: '#DCFCE7',
    text: '#15803D',
    dot: '#16A34A',
  },
  warning: {
    bg: '#FFFBEB',
    border: '#FEF3C7',
    text: '#B45309',
    dot: '#F59E0B',
  },
  critical: {
    bg: '#FEF2F2',
    border: '#FECACA',
    text: '#991B1B',
    dot: '#DC2626',
  },
};

export const MetricTile: React.FC<MetricTileProps> = ({
  label,
  value,
  unit,
  status = 'normal',
  referenceRange,
}) => {
  const colors = STATUS_COLORS[status];

  return (
    <div
      className="rounded-lg p-4 flex flex-col gap-2 transition-all hover:shadow-md"
      style={{
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
      }}
    >
      {/* Label with status indicator */}
      <div className="flex items-center justify-between gap-2">
        <span
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: '#64748B' }}
        >
          {label}
        </span>
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: colors.dot }}
          aria-label={`Status: ${status}`}
        />
      </div>

      {/* Value with unit */}
      <div className="flex items-baseline gap-1">
        <span
          className="text-xl font-bold"
          style={{ color: colors.text }}
        >
          {value}
        </span>
        <span className="text-xs font-medium" style={{ color: '#64748B' }}>
          {unit}
        </span>
      </div>

      {/* Reference range (optional) */}
      {referenceRange && (
        <span className="text-[10px] text-slate-400 mt-1">
          Ref: {referenceRange}
        </span>
      )}
    </div>
  );
};

export default MetricTile;
