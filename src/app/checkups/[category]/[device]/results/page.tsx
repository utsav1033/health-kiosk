'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ROUTES, navigateToPage } from '@/lib/navigation';
import { KioskLayout, StepIndicator, ResultsDisplay } from '@/components/kiosk';
import {
  getCategoryById,
  getDeviceById,
  generateMockCheckupResult,
} from '@/constants/checkupData';

export default function ResultsPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.category as string;
  const deviceId = params.device as string;

  const category = getCategoryById(categoryId);
  const device = category ? getDeviceById(categoryId, deviceId) : null;

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
              Results Not Found
            </h1>
            <button
              onClick={() => router.push('/checkups')}
              className="mt-8 px-8 py-5 rounded-2xl font-bold uppercase tracking-widest transition-all"
              style={{ backgroundColor: '#1E3A8A', color: 'white', fontSize: '16px', fontFamily: 'Montserrat, sans-serif' }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </KioskLayout>
    );
  }

  const result = generateMockCheckupResult(categoryId, deviceId);

  const handleContinue = () => {
    router.push('/checkups');
  };

  const handleNewCheckup = () => {
    router.push('/checkups');
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
      <StepIndicator
        currentStep={4}
        totalSteps={4}
        stepLabels={['Select Test', 'Choose Device', 'Measurement', 'Results']}
      />
      <ResultsDisplay
        result={result}
        deviceName={device.name}
        categoryTitle={category.title}
        categoryIcon={category.icon}
        onContinue={handleContinue}
        onNewCheckup={handleNewCheckup}
      />
    </KioskLayout>
  );
}
