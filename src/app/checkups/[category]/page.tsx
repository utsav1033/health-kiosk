'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ROUTES, navigateToPage } from '@/lib/navigation';
import { KioskLayout, DeviceCard } from '@/components/kiosk';
import { getCategoryById } from '@/constants/checkupData';

export default function DeviceSelectionPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.category as string;
  
  const category = getCategoryById(categoryId);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  if (!category) {
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
              Category Not Found
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

  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
  };

  const handleContinue = () => {
    if (selectedDeviceId) {
      router.push(`/checkups/${categoryId}/${selectedDeviceId}/start`);
    }
  };

  const handleBack = () => {
    router.back();
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
          <header className="mb-8 flex-shrink-0">
            <h1 
              className="font-bold mb-2" 
              style={{ fontFamily: 'Playfair Display, serif', color: '#111827', fontSize: '56px' }}
            >
              Select Device
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px' }}>
              {category.title} - Choose a device to begin
            </p>
          </header>

          {/* Device Grid Section with light background */}
          <div 
            className="p-6 md:p-8 rounded-lg md:rounded-xl mb-8 flex-1 flex-shrink-0"
            style={{ backgroundColor: '#F0F9FF', border: '1px solid #E0F2FE' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {category.devices.map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  onClick={() => handleDeviceSelect(device.id)}
                  isSelected={selectedDeviceId === device.id}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-auto flex-shrink-0">
            <button
              onClick={handleBack}
              className="flex-1 py-5 px-6 rounded-2xl font-bold uppercase tracking-widest transition-all active:scale-95"
              style={{ 
                backgroundColor: '#FFFFFF',
                color: '#6B7280',
                border: '1px solid #9CA3AF',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '16px',
                fontWeight: 700
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!selectedDeviceId}
              className="flex-1 py-5 px-6 rounded-2xl font-bold uppercase tracking-widest transition-all active:scale-95"
              style={{ 
                backgroundColor: selectedDeviceId ? '#1E3A8A' : '#D1D5DB',
                color: selectedDeviceId ? 'white' : '#6B7280',
                border: selectedDeviceId ? '1px solid #1E3A8A' : '1px solid #9CA3AF',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '16px',
                fontWeight: 700,
                cursor: selectedDeviceId ? 'pointer' : 'not-allowed'
              }}
              onMouseEnter={(e) => {
                if (selectedDeviceId) {
                  e.currentTarget.style.opacity = '0.9';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedDeviceId) {
                  e.currentTarget.style.opacity = '1';
                }
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </KioskLayout>
  );
}
