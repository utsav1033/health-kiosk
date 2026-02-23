'use client';

import React from 'react';

interface DashboardFooterProps {
  systemStatus?: 'operational' | 'maintenance' | 'offline';
  parametersCollected?: number;
  parametersTotal?: number;
  elapsedTime?: string;
  onPause?: () => void;
  onComplete?: () => void;
}

export const DashboardFooter: React.FC<DashboardFooterProps> = ({
  systemStatus = 'operational',
  parametersCollected,
  parametersTotal,
  elapsedTime,
  onPause,
  onComplete,
}) => {
  const statusColor = {
    operational: '#16A34A',
    maintenance: '#F59E0B',
    offline: '#DC2626',
  };

  const statusLabel = {
    operational: 'Operational',
    maintenance: 'Maintenance Mode',
    offline: 'Offline',
  };

  return (
    <footer className="mt-auto pt-8 border-t border-slate-200 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-6">
      {/* System Info */}
      <div className="flex items-center gap-8">
        {/* System Status */}
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">
            System Status
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: statusColor[systemStatus] }}
            />
            <span className="text-sm font-bold text-slate-700">
              {statusLabel[systemStatus]}
            </span>
          </div>
        </div>

        {/* Session Timer */}
        {elapsedTime && (
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">
              Session Time
            </p>
            <p className="text-sm font-bold text-slate-700">{elapsedTime}</p>
          </div>
        )}

        {/* Parameters Progress */}
        {parametersCollected !== undefined && parametersTotal !== undefined && (
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">
              Parameters Collected
            </p>
            <p className="text-sm font-bold text-slate-700">
              {parametersCollected} / {parametersTotal}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {onPause && (
          <button
            onClick={onPause}
            className="px-6 py-2.5 rounded-lg border border-slate-300 text-sm font-bold uppercase tracking-wide text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Pause
          </button>
        )}
        {onComplete && (
          <button
            onClick={onComplete}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold uppercase tracking-wide hover:bg-blue-700 transition-colors"
            style={{ backgroundColor: '#3A5A8C' }}
          >
            Complete Session
          </button>
        )}
      </div>
    </footer>
  );
};

export default DashboardFooter;
