'use client';

import React from 'react';
import type { Device } from '@/constants/checkupData';

interface DeviceCardProps {
  device: Device;
  onClick: () => void;
  isSelected?: boolean;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
  onClick,
  isSelected = false,
}) => {
  const isDisabled = device.status !== 'available';

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        w-full p-8 rounded-3xl text-left transition-all duration-300
        flex flex-col justify-between items-center text-center min-h-[280px]
        ${
          isDisabled
            ? 'opacity-50 cursor-not-allowed bg-slate-50'
            : isSelected
              ? 'bg-blue-50 active:scale-95' 
              : 'bg-white active:scale-95'
        }
      `}
      style={{ 
        borderColor: '#1E3A8A',
        borderWidth: '3px',
        borderStyle: 'solid',
        backgroundColor: isSelected ? '#F0F9FF' : undefined
      }}
    >
      {/* Icon */}
      <div className="mb-6">
        <span 
          className="material-symbols-outlined text-7xl" 
          style={{ 
            color: isDisabled ? '#9CA3AF' : '#1E3A8A',
            fontWeight: 300
          }}
        >
          devices_other
        </span>
      </div>

      {/* Name */}
      <h4 
        className="font-bold mb-3 text-slate-900"
        style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }}
      >
        {device.name}
      </h4>

      {/* Description */}
      <p 
        className="leading-relaxed mb-4 text-slate-600"
        style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px' }}
      >
        {device.description}
      </p>

      {/* Status and Time */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 w-full mt-auto">
        <div className="flex items-center gap-2">
          {device.status === 'available' && (
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#1E3A8A' }}></div>
          )}
          {device.status === 'maintenance' && (
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          )}
          {device.status === 'unavailable' && (
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
          )}
          <span 
            className="font-bold text-slate-700 capitalize"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px' }}
          >
            {device.status === 'available' ? 'Ready' : device.status}
          </span>
        </div>
        <span 
          className="font-bold px-3 py-1 rounded"
          style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', backgroundColor: '#EFF6FF', color: '#1E3A8A' }}
        >
          {device.estimatedTime}m
        </span>
      </div>

      {/* Disabled Message */}
      {isDisabled && (
        <p 
          className="font-semibold mt-3"
          style={{ color: '#D97706', fontFamily: 'Montserrat, sans-serif', fontSize: '14px' }}
        >
          Unavailable
        </p>
      )}
    </button>
  );
};

export default DeviceCard;
