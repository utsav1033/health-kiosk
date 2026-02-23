'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES, navigateToPage } from '@/lib/navigation';
import { KioskLayout } from '@/components/kiosk';

interface Scheme {
  id: number;
  name: string;
  provider: string;
  type: 'Family' | 'Female' | 'Kids' | 'Senior' | 'General';
  enrollmentDate: string;
  popularity: number;
  portalUrl: string;
}

export default function SchemesPage() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState('Prayagraj');
  const [sortBy, setSortBy] = useState<'date' | 'popularity' | 'type'>('date');

  const locations = ['Prayagraj', 'Lucknow', 'Kanpur', 'Agra', 'Varanasi'];

  const schemes: Scheme[] = [
    {
      id: 1,
      name: 'Ayushman Bharat (AB-PMJAY)',
      provider: 'Ministry of Labour & Employment',
      type: 'Family',
      enrollmentDate: '2024-02-15',
      popularity: 95,
      portalUrl: 'https://pmjay.gov.in',
    },
    {
      id: 2,
      name: 'National Health Mission',
      provider: 'Ministry of Health',
      type: 'General',
      enrollmentDate: '2024-01-10',
      popularity: 88,
      portalUrl: 'https://nhm.gov.in',
    },
    {
      id: 3,
      name: 'Women Health Initiative',
      provider: 'State Health Department',
      type: 'Female',
      enrollmentDate: '2024-03-20',
      popularity: 78,
      portalUrl: 'https://womenshealth.up.gov.in',
    },
    {
      id: 4,
      name: 'Child Health Scheme',
      provider: 'Ministry of Maternal & Child Health',
      type: 'Kids',
      enrollmentDate: '2024-02-01',
      popularity: 85,
      portalUrl: 'https://childhealth.gov.in',
    },
    {
      id: 5,
      name: 'Senior Citizen Health Program',
      provider: 'State Welfare Department',
      type: 'Senior',
      enrollmentDate: '2023-12-05',
      popularity: 72,
      portalUrl: 'https://seniorcitizen.up.gov.in',
    },
    {
      id: 6,
      name: 'Mukhyamantri Health Insurance Scheme',
      provider: 'UP State Government',
      type: 'Family',
      enrollmentDate: '2024-01-25',
      popularity: 90,
      portalUrl: 'https://mhis.up.gov.in',
    },
    {
      id: 7,
      name: 'Maternal Health Support',
      provider: 'Ministry of Health',
      type: 'Female',
      enrollmentDate: '2024-03-10',
      popularity: 82,
      portalUrl: 'https://maternalhealth.gov.in',
    },
    {
      id: 8,
      name: 'Immunization Plus Program',
      provider: 'State Health Department',
      type: 'Kids',
      enrollmentDate: '2024-02-28',
      popularity: 80,
      portalUrl: 'https://immunization.up.gov.in',
    },
  ];

  const sortedSchemes = useMemo(() => {
    let sorted = [...schemes];
    
    if (sortBy === 'date') {
      sorted.sort((a, b) => new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime());
    } else if (sortBy === 'popularity') {
      sorted.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'type') {
      sorted.sort((a, b) => a.type.localeCompare(b.type));
    }
    
    return sorted;
  }, [sortBy]);

  const handleHomeClick = async () => {
    await navigateToPage(router, ROUTES.HOME);
  };

  const handleProfileClick = async () => {
    await navigateToPage(router, ROUTES.PROFILE);
  };

  const handleSchemesClick = () => {
    // Already on schemes
  };

  const handleChatbotClick = async () => {
    await navigateToPage(router, ROUTES.CHATBOT);
  };

  const handleCheckupsClick = async () => {
    await navigateToPage(router, ROUTES.CHECKUPS);
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Family': '#1E3A8A',
      'Female': '#DC2626',
      'Kids': '#059669',
      'Senior': '#F59E0B',
      'General': '#6B7280',
    };
    return colors[type] || '#6B7280';
  };

  const getTypeBgColor = (type: string) => {
    const colors: Record<string, string> = {
      'Family': '#EFF6FF',
      'Female': '#FEF2F2',
      'Kids': '#F0FDF4',
      'Senior': '#FFFBEB',
      'General': '#F3F4F6',
    };
    return colors[type] || '#F3F4F6';
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
              Government Health Schemes
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px' }}>
              Browse and enroll in available health schemes for your family
            </p>
          </header>

          {/* Location Selector */}
          <div className="mb-6 flex-shrink-0 bg-white rounded-lg md:rounded-xl p-4 md:p-6" style={{ border: '2px solid #D1D5DB' }}>
            <label className="block text-sm font-bold mb-3" style={{ color: '#6B7280', fontFamily: 'Montserrat, sans-serif' }}>
              Select Your Location
            </label>
            <div className="flex gap-2 flex-wrap">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => setSelectedLocation(location)}
                  className="px-4 py-2 rounded-lg font-bold transition-all"
                  style={{
                    backgroundColor: selectedLocation === location ? '#1E3A8A' : '#F3F4F6',
                    color: selectedLocation === location ? '#FFFFFF' : '#374151',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '14px',
                    border: selectedLocation === location ? '2px solid #1E3A8A' : '1px solid #D1D5DB',
                  }}
                >
                  {location}
                </button>
              ))}
            </div>
            <p className="text-sm mt-3" style={{ color: '#6B7280', fontFamily: 'Montserrat, sans-serif' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', verticalAlign: 'middle', marginRight: '8px' }}>location_on</span>
              Showing schemes available in: <span className="font-bold">{selectedLocation}, Uttar Pradesh</span>
            </p>
          </div>

          {/* Sorting Options */}
          <div className="mb-6 flex-shrink-0 bg-white rounded-lg md:rounded-xl p-4 md:p-6" style={{ border: '2px solid #D1D5DB' }}>
            <label className="block text-sm font-bold mb-3" style={{ color: '#6B7280', fontFamily: 'Montserrat, sans-serif' }}>
              Sort By
            </label>
            <div className="flex gap-2 flex-wrap">
              {['date', 'popularity', 'type'].map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option as 'date' | 'popularity' | 'type')}
                  className="px-4 py-2 rounded-lg font-bold transition-all capitalize"
                  style={{
                    backgroundColor: sortBy === option ? '#1E3A8A' : '#F3F4F6',
                    color: sortBy === option ? '#FFFFFF' : '#374151',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '14px',
                    border: sortBy === option ? '2px solid #1E3A8A' : '1px solid #D1D5DB',
                  }}
                >
                  {option === 'date' ? 'Latest' : option === 'popularity' ? 'Popular' : 'By Type'}
                </button>
              ))}
            </div>
          </div>

          {/* Schemes Table */}
          <div className="mb-6 flex-1 overflow-x-auto bg-white rounded-lg md:rounded-xl border-2" style={{ borderColor: '#D1D5DB' }}>
            <table className="w-full" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <thead>
                <tr style={{ backgroundColor: '#F3F4F6', borderBottom: '2px solid #D1D5DB' }}>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-bold uppercase tracking-widest" style={{ color: '#6B7280' }}>Scheme Name</th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-bold uppercase tracking-widest" style={{ color: '#6B7280' }}>Provider</th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-bold uppercase tracking-widest" style={{ color: '#6B7280' }}>Type</th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-bold uppercase tracking-widest" style={{ color: '#6B7280' }}>Added</th>
                  <th className="px-4 md:px-6 py-4 text-center text-xs font-bold uppercase tracking-widest" style={{ color: '#6B7280' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedSchemes.map((scheme, idx) => (
                  <tr 
                    key={scheme.id}
                    style={{ 
                      backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                      borderBottom: '1px solid #E5E7EB'
                    }}
                  >
                    <td className="px-4 md:px-6 py-4 text-sm font-bold" style={{ color: '#111827' }}>
                      {scheme.name}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm" style={{ color: '#374151' }}>
                      {scheme.provider}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm">
                      <span
                        className="px-3 py-1 rounded-lg font-bold text-xs uppercase tracking-widest"
                        style={{
                          backgroundColor: getTypeBgColor(scheme.type),
                          color: getTypeColor(scheme.type),
                        }}
                      >
                        {scheme.type}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm" style={{ color: '#6B7280' }}>
                      {new Date(scheme.enrollmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center">
                      <a
                        href={scheme.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 rounded-lg font-bold text-white text-xs uppercase tracking-widest transition-all"
                        style={{
                          backgroundColor: '#1E3A8A',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', verticalAlign: 'middle', marginRight: '4px' }}>open_in_new</span>
                        Enroll
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-auto flex-shrink-0">
            <button
              onClick={handleHomeClick}
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
              Home
            </button>
            <button
              onClick={handleCheckupsClick}
              className="flex-1 py-5 px-6 rounded-2xl font-bold text-white uppercase tracking-widest transition-all active:scale-95"
              style={{ 
                backgroundColor: '#1E3A8A',
                border: '1px solid #1E3A8A',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '16px',
                fontWeight: 700
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Start Checkup
            </button>
          </div>
        </div>
      </div>
    </KioskLayout>
  );
}
