'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES, navigateToPage } from '@/lib/navigation';
import { KioskLayout } from '@/components/kiosk';

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
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto w-full" style={{ backgroundColor: '#FAFBFC' }}>
        <div className="p-6 md:p-8 lg:p-10">
          {/* Header */}
          <header className="mb-8 flex-shrink-0">
            <h1 
              className="font-bold mb-2" 
              style={{ fontFamily: 'Playfair Display, serif', color: '#111827', fontSize: '56px' }}
            >
              Health Assistant
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px' }}>
              Chat with our AI health information assistant
            </p>
          </header>

          {/* Content Placeholder */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#F0FDF4' }}
              >
                <span 
                  className="material-symbols-outlined" 
                  style={{ fontSize: '32px', fontWeight: 300, color: '#3CCB7F' }}
                >
                  chat
                </span>
              </div>
              <p 
                className="text-gray-600 text-sm md:text-base"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Chatbot interface coming soon
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 md:gap-4 mt-auto flex-shrink-0">
            <button
              onClick={handleHomeClick}
              className="flex-1 py-3 px-4 rounded-lg font-bold text-xs md:text-sm uppercase tracking-widest transition-all active:scale-95"
              style={{ 
                backgroundColor: '#F3F4F6',
                color: '#374151',
                border: '1px solid #E5E7EB',
                fontFamily: 'Montserrat, sans-serif',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </KioskLayout>
  );
}
