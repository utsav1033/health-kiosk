'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES, navigateToPage } from '@/lib/navigation';
import { KioskLayout } from '@/components/kiosk';
import { YoloHealthChatbot } from '@/components/YoloHealthChatbot';

export default function ChatbotPage() {
  const router = useRouter();

  const handleHomeClick = async () => {
    await navigateToPage(router, ROUTES.HOME);
  };

  const handleProfileClick = async () => {
    await navigateToPage(router, ROUTES.PROFILE);
  };

  const handleSchemesClick = async () => {
    await navigateToPage(router, ROUTES.SCHEMES);
  };

  const handleChatbotClick = () => {
    // Already on chatbot
  };

  const handleCheckupsClick = async () => {
    await navigateToPage(router, ROUTES.CHECKUPS);
  };

  return (
    <KioskLayout
      onHomeClick={handleHomeClick}
      onProfileClick={handleProfileClick}
      onCheckupsClick={handleCheckupsClick}
      onSchemesClick={handleSchemesClick}
      onChatbotClick={handleChatbotClick}
    >
      {/* Chatbot Container - Full Height */}
      <div className="flex-1 overflow-hidden w-full">
        <YoloHealthChatbot />
      </div>
    </KioskLayout>
  );
}
