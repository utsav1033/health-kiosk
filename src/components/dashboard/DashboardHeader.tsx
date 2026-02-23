'use client';

import React from 'react';
import { PatientInfo } from './types';

interface DashboardHeaderProps {
  patient: PatientInfo;
  sessionStatus?: 'active' | 'completed';
  elapsedTime?: string;
  parametersCollected?: number;
  parametersTotal?: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  patient,
  sessionStatus,
  elapsedTime,
  parametersCollected,
  parametersTotal,
}) => {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
      {/* Title Section */}
      <div className="flex-1">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 tracking-tight">
          Health Assessment
        </h2>
        <p className="text-slate-600 text-sm md:text-base">
          Real-time health metrics and clinical analysis for {patient.name}
        </p>
      </div>

      {/* Patient Info & Status */}
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        {/* Patient Identity */}
        <div className="border-r border-slate-200 pr-6">
          <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-1">
            Patient
          </p>
          <p className="text-lg font-bold text-slate-900">
            {patient.name}
          </p>
          <p className="text-sm text-slate-500 font-medium">
            ID: {patient.id}
          </p>
          {patient.age && (
            <p className="text-sm text-slate-500">
              {patient.age} years old
            </p>
          )}
        </div>

        {/* Session Info */}
        {sessionStatus && (
          <div className="flex flex-col gap-3">
            <div
              className="px-4 py-2 rounded-lg flex items-center gap-2"
              style={{
                backgroundColor: sessionStatus === 'active' ? '#F0FDF4' : '#F1F5F9',
                borderLeft: `3px solid ${sessionStatus === 'active' ? '#16A34A' : '#3A5A8C'}`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: sessionStatus === 'active' ? '#16A34A' : '#64748B',
                }}
              />
              <span className="text-xs font-bold uppercase">
                {sessionStatus === 'active' ? 'Session Active' : 'Completed'}
              </span>
            </div>

            {elapsedTime && (
              <div className="text-xs text-slate-600">
                <span className="font-semibold">Elapsed:</span> {elapsedTime}
              </div>
            )}

            {parametersCollected !== undefined && parametersTotal !== undefined && (
              <div className="text-xs text-slate-600">
                <span className="font-semibold">Progress:</span> {parametersCollected} / {parametersTotal} params
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
