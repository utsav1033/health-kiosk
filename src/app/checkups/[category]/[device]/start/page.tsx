'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ROUTES, navigateToPage } from '@/lib/navigation';
import { KioskLayout } from '@/components/kiosk';
import { getCategoryById, getDeviceById } from '@/constants/checkupData';

export default function CheckupExecutionPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.category as string;
  const deviceId = params.device as string;

  const category = getCategoryById(categoryId);
  const device = category ? getDeviceById(categoryId, deviceId) : null;

  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsRunning(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isRunning]);

  if (!category || !device) {
    return (
      <KioskLayout
        onHomeClick={async () => await navigateToPage(router, ROUTES.HOME)}
        onProfileClick={async () => await navigateToPage(router, ROUTES.PROFILE)}
        onCheckupsClick={async () => await navigateToPage(router, ROUTES.CHECKUPS)}
        onSchemesClick={async () => await navigateToPage(router, ROUTES.SCHEMES)}
        onChatbotClick={async () => await navigateToPage(router, ROUTES.CHATBOT)}
      >
        <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: '#FAFBFC' }}>
          <div className="text-center">
            <h1 className="font-bold text-slate-900 mb-4" style={{ fontFamily: 'Playfair Display, serif', fontSize: '56px' }}>
              Device Not Found
            </h1>
            <button
              onClick={() => router.push('/checkups')}
              className="mt-6 px-8 py-5 rounded-2xl font-bold uppercase tracking-widest transition-all"
              style={{ backgroundColor: '#1E3A8A', color: 'white', fontSize: '16px', fontFamily: 'Montserrat, sans-serif' }}
            >
              Back to Selection
            </button>
          </div>
        </div>
      </KioskLayout>
    );
  }

  const handleComplete = () => {
    router.push(`/checkups/${categoryId}/${deviceId}/results`);
  };

  const handleHomeClick = async () => {
    await navigateToPage(router, ROUTES.HOME);
  };

  const handleProfileClick = async () => {
    await navigateToPage(router, ROUTES.PROFILE);
  };

  const handleCheckupsClick = async () => {
    await navigateToPage(router, ROUTES.CHECKUPS);
  };

  const handleSchemesClick = async () => {
    await navigateToPage(router, ROUTES.SCHEMES);
  };

  const handleChatbotClick = async () => {
    await navigateToPage(router, ROUTES.CHATBOT);
  };

  const instructions: Record<string, string[]> = {
    'bp-monitor': [
      'Sit comfortably with feet flat on the ground',
      'Rest your arm on the armrest at heart level',
      'Stay still and quiet during measurement',
    ],
    'pulse-ox': [
      'Place your finger on the sensor',
      'Keep your finger still',
      'Wait for the measurement to complete',
    ],
    thermometer: [
      'Insert the thermometer under your tongue',
      'Close your mouth',
      'Wait for the beep',
    ],
    'ecg-full': [
      'Remove your shirt',
      'Lie down on the examination table',
      'Stay still while electrodes are attached',
      'Breathe normally during recording',
    ],
    'glucose-meter': [
      'Wash your hands with soap and water',
      'Insert the test strip',
      'Apply a small blood sample',
      'Wait for the result',
    ],
    default: [
      'Follow the on-screen instructions',
      'Stay still during measurement',
      'Do not move or talk',
    ],
  };

  const currentInstructions = instructions[deviceId] || instructions.default;

  return (
    <KioskLayout
      onHomeClick={handleHomeClick}
      onProfileClick={handleProfileClick}
      onCheckupsClick={handleCheckupsClick}
      onSchemesClick={handleSchemesClick}
      onChatbotClick={handleChatbotClick}
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto w-full" style={{ backgroundColor: '#FAFBFC' }}>
        <div className="p-6 md:p-8 lg:p-10">
          {/* Header */}
          <header className="text-center mb-8 flex-shrink-0">
            <h1 
              className="font-bold mb-2"
              style={{ fontFamily: 'Playfair Display, serif', color: '#111827', fontSize: '56px' }}
            >
              {device.name}
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px' }}>
              {category.title} • {device.estimatedTime} min
            </p>
          </header>

          {/* Main Content - Center align */}
          <div className="flex-1 flex flex-col items-center justify-center gap-8 mb-8">
            {/* Status Circle */}
            <div className="relative" style={{ width: 'min(200px, 25vw)', height: 'min(200px, 25vw)' }}>
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#1E3A8A"
                  strokeWidth="8"
                  strokeDasharray={`${(progress / 100) * 314} 314`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.5s ease-in-out' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-bold" style={{ color: '#1E3A8A', fontSize: '36px', fontFamily: 'Montserrat, sans-serif' }}>
                  {Math.round(progress)}%
                </span>
                <span className="text-slate-600 mt-1" style={{ fontSize: '14px', fontFamily: 'Montserrat, sans-serif' }}>
                  {isRunning ? 'Measuring...' : 'Complete'}
                </span>
              </div>
            </div>

            {/* Instructions */}
            <div 
              className="rounded-lg p-6 max-w-2xl w-full"
              style={{ backgroundColor: '#EFF6FF', borderLeft: '4px solid #1E3A8A' }}
            >
              <h3 className="font-bold mb-3" style={{ color: '#1E3A8A', fontSize: '18px', fontFamily: 'Montserrat, sans-serif' }}>Instructions:</h3>
              <ul className="space-y-2">
                {currentInstructions.map((instruction, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="font-bold min-w-5 flex-shrink-0" style={{ color: '#1E3A8A', fontFamily: 'Montserrat, sans-serif' }}>{idx + 1}.</span>
                    <span className="text-sm" style={{ color: '#1E3A8A', fontFamily: 'Montserrat, sans-serif' }}>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Status Message */}
            <div className="text-center">
              <p className="font-semibold" style={{ color: '#374151', fontSize: '18px', fontFamily: 'Montserrat, sans-serif' }}>
                {isRunning ? 'Please wait...' : 'Measurement complete'}
              </p>
              <p className="mt-1 text-gray-500" style={{ fontSize: '14px', fontFamily: 'Montserrat, sans-serif' }}>
                Do not interrupt the measurement
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleComplete}
            disabled={isRunning}
            className="w-full py-5 px-6 rounded-2xl font-bold uppercase tracking-widest transition-all active:scale-95 flex-shrink-0"
            style={{
              backgroundColor: isRunning ? '#D1D5DB' : '#1E3A8A',
              color: isRunning ? '#6B7280' : 'white',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              border: isRunning ? '1px solid #9CA3AF' : '1px solid #1E3A8A'
            }}
            onMouseEnter={(e) => {
              if (!isRunning) {
                e.currentTarget.style.opacity = '0.9';
              }
            }}
            onMouseLeave={(e) => {
              if (!isRunning) {
                e.currentTarget.style.opacity = '1';
              }
            }}
          >
            <span className="material-symbols-outlined inline mr-2" style={{ fontSize: '20px', fontWeight: 300 }}>check_circle</span>
            View Results
          </button>
        </div>
      </div>
    </KioskLayout>
  );
}
