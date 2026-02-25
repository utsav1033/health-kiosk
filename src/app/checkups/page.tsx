'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES, navigateToPage } from '@/lib/navigation';
import { KioskLayout, CategoryCard } from '@/components/kiosk';
import { CHECKUP_CATEGORIES } from '@/constants/checkupData';

const categoryIcons: Record<string, string> = {
  'full-body': 'body_system',
  'vitals': 'vital_signs',
  'cardiac': 'ecg',
  'metabolic': 'science',
  'diagnostics': 'biotech',
};

export default function CheckupsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    await router.push(`/checkups/${categoryId}`);
  };

  const handleHomeClick = async () => {
    await navigateToPage(router, ROUTES.HOME);
  };

  const handleProfileClick = async () => {
    await navigateToPage(router, ROUTES.PROFILE);
  };

  const handleSchemesClick = async () => {
    await navigateToPage(router, ROUTES.SCHEMES);
  };

  const handleChatbotClick = async () => {
    await navigateToPage(router, ROUTES.CHATBOT);
  };

  const handleCheckupsClick = () => {
    // Already on checkups
  };

  return (
    <KioskLayout
      onHomeClick={handleHomeClick}
      onProfileClick={handleProfileClick}
      onCheckupsClick={handleCheckupsClick}
      onSchemesClick={handleSchemesClick}
      onChatbotClick={handleChatbotClick}
      userName="John Doe"
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto w-full" style={{ backgroundColor: '#FAFBFC' }}>
        {/* Content wrapper - NO flex */}
        <div className="p-6 md:p-8 lg:p-10">
          {/* Header with Location */}
          <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8 flex-shrink-0">
            <div className="flex-1 min-w-0">
              <h2 
                className="mb-2"
                style={{ fontFamily: 'Playfair Display, serif', color: '#111827', fontSize: '56px', fontWeight: 700 }}
              >
                Select a Checkup
              </h2>
              <p 
                className="text-gray-600 max-w-xl leading-relaxed"
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px' }}
              >
                Choose a category to start your assessment.
              </p>
            </div>
            
            {/* Location Badge */}
            <div 
              className="flex items-center gap-2 px-6 py-3 rounded-2xl flex-shrink-0"
              style={{ backgroundColor: '#EFF6FF', border: '2px solid #BFDBFE', fontFamily: 'Montserrat, sans-serif' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#1E3A8A', fontWeight: 300 }}>location_on</span>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest" style={{ color: '#1E3A8A', fontWeight: 600, fontSize: '11px' }}>Location</p>
                <p className="font-bold" style={{ color: '#1E3A8A', fontSize: '18px' }}>Prayagraj, UP</p>
              </div>
            </div>
          </header>

          {/* Modern Grid Layout - 2 Columns */}
          <div className="mb-8 flex-shrink-0">
            <div className="grid grid-cols-2 gap-6 max-w-4xl">
              {CHECKUP_CATEGORIES.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => handleCategorySelect(category.id)}
                  isSelected={selectedCategory === category.id}
                  icon={categoryIcons[category.id]}
                />
              ))}
            </div>
          </div>

          {/* Info Table Section */}
          <div className="flex-1">
            <h3 
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ fontFamily: 'Playfair Display, serif', color: '#111827' }}
            >
              Kiosk Information & Support
            </h3>
            
            {/* Info Table */}
            <div className="overflow-x-auto rounded-lg md:rounded-xl border border-gray-200">
              <table className="w-full" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <tbody>
                  <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm font-bold text-gray-700">Kiosk ID</td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-600">YH-KSK-0402</td>
                  </tr>
                  <tr style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm font-bold text-gray-700">Location</td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-600">Prayagraj District Hospital, Uttar Pradesh</td>
                  </tr>
                  <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm font-bold text-gray-700">Status</td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3CCB7F' }}></span>
                        <span style={{ color: '#059669', fontWeight: 600 }}>Operational</span>
                      </div>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm font-bold text-gray-700">Software Version</td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-600">v4.2.0</td>
                  </tr>
                  <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm font-bold text-gray-700">Last Maintenance</td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-600">Feb 20, 2026</td>
                  </tr>
                  <tr style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm font-bold text-gray-700">Support Phone</td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-600">1800-YOLO-HLTH</td>
                  </tr>
                  <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm font-bold text-gray-700">Support Email</td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-600">support@yolohealth.in</td>
                  </tr>
                  <tr style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm font-bold text-gray-700">Operating Hours</td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-600">6:00 AM - 10:00 PM (Daily)</td>
                  </tr>
                  <tr style={{ backgroundColor: '#F9FAFB' }}>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm font-bold text-gray-700">Accessibility</td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-600">Wheelchair Accessible, Audio Guides Available</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <footer className="mt-8 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 flex-shrink-0" style={{ backgroundColor: '#F3F4F6', border: '2px solid #E5E7EB' }}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 flex-1 min-w-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <div className="flex-shrink-0">
                <p className="uppercase font-bold tracking-widest mb-1" style={{ color: '#9CA3AF', fontSize: '11px' }}>Status</p>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#1E3A8A' }}></span>
                  <span className="font-bold text-gray-700" style={{ fontSize: '18px' }}>Operational</span>
                </div>
              </div>
              <div className="hidden md:block w-px h-10 bg-gray-300 flex-shrink-0"></div>
              <div className="flex-shrink-0">
                <p className="uppercase font-bold tracking-widest mb-1" style={{ color: '#9CA3AF', fontSize: '11px' }}>Support</p>
                <p className="font-bold text-gray-700" style={{ fontSize: '18px' }}>1800-YOLO-HLTH</p>
              </div>
            </div>
            <div className="flex gap-6 flex-shrink-0">
              <button 
                className="font-bold uppercase tracking-widest transition-all"
                style={{ 
                  color: '#6B7280', 
                  border: '3px solid #1E3A8A',
                  backgroundColor: '#FFFFFF',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  padding: '12px 32px',
                  borderRadius: '16px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
              >
                Help
              </button>
              <button 
                className="text-white font-bold uppercase tracking-widest transition-all"
                style={{ 
                  backgroundColor: '#1E3A8A',
                  border: '3px solid #1E3A8A',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  padding: '12px 40px',
                  borderRadius: '16px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Logout
              </button>
            </div>
          </footer>
        </div>
      </div>
    </KioskLayout>
  );
}




