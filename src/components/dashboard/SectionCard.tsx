'use client';

import React from 'react';
import { SectionCardProps, HealthStatus } from './types';
import MetricTile from './MetricTile';

const STATUS_STYLES: Record<HealthStatus, { border: string; headerBg: string }> = {
  normal: {
    border: '#16A34A',
    headerBg: '#F0FDF4',
  },
  warning: {
    border: '#F59E0B',
    headerBg: '#FFFBEB',
  },
  critical: {
    border: '#DC2626',
    headerBg: '#FEF2F2',
  },
};

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  metrics,
  status = 'normal',
  description,
  actionLabel,
  onAction,
  variant = 'default',
}) => {
  const styles = STATUS_STYLES[status];
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  return (
    <div
      className={`
        rounded-xl overflow-hidden transition-all
        ${isFeatured ? 'bg-slate-900 text-white border-2 border-slate-700' : 'bg-white border border-slate-200'}
        ${!isFeatured ? 'hover:shadow-lg' : 'shadow-xl'}
      `}
      style={!isFeatured ? { borderLeftColor: styles.border, borderLeftWidth: '4px' } : {}}
    >
      {/* Header */}
      <div
        className={`
          px-6 py-4 flex items-center justify-between
          ${isFeatured ? 'bg-slate-800 border-b border-slate-700' : ''}
        `}
        style={!isFeatured && !isCompact ? { backgroundColor: styles.headerBg } : {}}
      >
        <div className="flex items-center gap-3">
          <span className={`text-2xl ${isFeatured ? '' : ''}`}>{icon}</span>
          <div>
            <h3 className={`font-bold tracking-wide ${isFeatured ? 'text-lg text-white' : 'text-base text-slate-900'}`}>
              {title}
            </h3>
            {description && (
              <p className={`text-xs ${isFeatured ? 'text-slate-300' : 'text-slate-500'}`}>
                {description}
              </p>
            )}
          </div>
        </div>
        {/* Status indicator */}
        {!isFeatured && (
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: styles.border }}
            aria-label={`Health status: ${status}`}
          />
        )}
      </div>

      {/* Metrics Grid */}
      <div className={`px-6 ${isFeatured ? 'py-6' : isCompact ? 'py-3' : 'py-4'}`}>
        {metrics.length > 0 ? (
          <div
            className={`grid gap-3 ${
              isCompact || isFeatured
                ? 'grid-cols-2'
                : metrics.length <= 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : metrics.length === 3
                    ? 'grid-cols-3'
                    : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {metrics.map((metric, idx) => (
              <MetricTile
                key={`${metric.label}-${idx}`}
                label={metric.label}
                value={metric.value}
                unit={metric.unit}
                status={metric.status}
                referenceRange={metric.referenceRange}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className={`text-sm ${isFeatured ? 'text-slate-400' : 'text-slate-500'}`}>
              No metrics available
            </p>
          </div>
        )}
      </div>

      {/* Action Button */}
      {(actionLabel || onAction) && (
        <div className={`px-6 ${isFeatured ? 'pb-6' : 'pb-4'}`}>
          <button
            onClick={onAction}
            className={`
              w-full py-3 px-4 rounded-lg font-bold text-sm
              transition-all uppercase tracking-wide
              ${isFeatured
                ? 'bg-white text-slate-900 hover:bg-slate-100'
                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'}
            `}
          >
            {actionLabel || 'View Details'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionCard;
