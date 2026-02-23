'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES, navigateToPage } from '@/lib/navigation';
import { KioskLayout } from '@/components/kiosk';
import { MOCK_PATIENT_REPORTS } from '@/constants/checkupData';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'checkups' | 'enrolled' | 'eligible' | 'summary'>('checkups');

  const handleHomeClick = async () => {
    await navigateToPage(router, ROUTES.HOME);
  };

  const handleProfileClick = () => {
    // Already on profile
  };

  const handleSchemesClick = async () => {
    await navigateToPage(router, ROUTES.SCHEMES);
  };

  const handleChatbotClick = async () => {
    await navigateToPage(router, ROUTES.CHATBOT);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
      normal: {
        bg: '#EFF6FF',
        border: '#1E3A8A',
        text: '#1E3A8A',
        dot: '#1E3A8A',
      },
      warning: {
        bg: '#FEF3C7',
        border: '#F59E0B',
        text: '#92400E',
        dot: '#F59E0B',
      },
      critical: {
        bg: '#FEF2F2',
        border: '#EF4444',
        text: '#991B1B',
        dot: '#EF4444',
      },
    };
    return colors[status] || colors.normal;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const enrolledSchemes = [
    { id: 1, name: 'Ayushman Bharat (AB-PMJAY)', status: 'Active', enrollmentDate: 'Jan 15, 2024' },
    { id: 2, name: 'National Health Mission (NHM)', status: 'Active', enrollmentDate: 'Mar 20, 2024' },
  ];

  const eligibleSchemes = [
    { id: 1, name: 'Senior Citizen Health Scheme', eligible: 'Not Yet', reason: 'Age requirement: 60+ years' },
    { id: 2, name: 'Women Health Program', eligible: 'Pending', reason: 'Documentation required' },
    { id: 3, name: 'Occupational Health Safety Scheme', eligible: 'Yes', reason: 'Based on employment' },
  ];

  const patientSummary = {
    totalCheckups: 12,
    lastCheckupDate: '2 days ago',
    healthStatus: 'Good',
    averageHeartRate: 72,
    averageBP: '120/80',
    chronicConditions: 'None',
    allergies: 'Penicillin',
    medications: 'Multivitamin daily',
  };

  return (
    <KioskLayout
      onHomeClick={handleHomeClick}
      onProfileClick={handleProfileClick}
      onCheckupsClick={handleProfileClick}
      onSchemesClick={handleSchemesClick}
      onChatbotClick={handleChatbotClick}
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="p-6 md:p-8 lg:p-10">
          {/* Header */}
          <header className="mb-6 flex-shrink-0">
            <h1 
              className="font-bold mb-2" 
              style={{ fontFamily: 'Playfair Display, serif', color: '#111827', fontSize: '56px' }}
            >
              Patient Profile
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px' }}>
              Your medical checkup history and health reports
            </p>
          </header>

          {/* Patient Info Card */}
          <div 
            className="rounded-lg md:rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-8 mb-6 flex-shrink-0"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <div className="flex items-start gap-4 md:gap-6">
              <div 
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl flex items-center justify-center text-2xl md:text-3xl flex-shrink-0 text-white"
                style={{ backgroundColor: '#1E3A8A' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '40px', fontWeight: 300 }}>person</span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 
                  className="text-xl md:text-2xl lg:text-3xl font-bold mb-1" 
                  style={{ fontFamily: 'Playfair Display, serif', color: '#111827' }}
                >
                  Aravind Krishna
                </h2>
                <p className="text-xs md:text-sm lg:text-base mb-2" style={{ color: '#374151', fontFamily: 'Montserrat, sans-serif' }}>
                  ID: P-2024-0847 • Age: 34 years • Male
                </p>
                <p className="text-xs md:text-sm mb-2" style={{ color: '#374151', fontFamily: 'Montserrat, sans-serif' }}>
                  Blood Group: O+ • Last Checkup: 2 days ago
                </p>
                <p className="text-xs md:text-sm font-semibold" style={{ color: '#1E3A8A', fontFamily: 'Montserrat, sans-serif' }}>
                  ABHA: 87-8674-1234-5678
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 flex-shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('checkups')}
              className="px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeTab === 'checkups' ? '#1E3A8A' : '#F3F4F6',
                color: activeTab === 'checkups' ? '#FFFFFF' : '#374151',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              Recent Checkups
            </button>
            <button
              onClick={() => setActiveTab('enrolled')}
              className="px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeTab === 'enrolled' ? '#1E3A8A' : '#F3F4F6',
                color: activeTab === 'enrolled' ? '#FFFFFF' : '#374151',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              Schemes Enrolled
            </button>
            <button
              onClick={() => setActiveTab('eligible')}
              className="px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeTab === 'eligible' ? '#1E3A8A' : '#F3F4F6',
                color: activeTab === 'eligible' ? '#FFFFFF' : '#374151',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              Schemes Eligible
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className="px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeTab === 'summary' ? '#1E3A8A' : '#F3F4F6',
                color: activeTab === 'summary' ? '#FFFFFF' : '#374151',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              Summary
            </button>
          </div>

          {/* Tab Content */}
          <div className="mb-6 flex-1">
            {/* Recent Checkups Tab */}
            {activeTab === 'checkups' && (
              <div>
                <h3 
                  className="font-bold mb-4 flex-shrink-0" 
                  style={{ fontFamily: 'Playfair Display, serif', color: '#111827', fontSize: '32px' }}
                >
                  Recent Checkups
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                  {MOCK_PATIENT_REPORTS.map((report) => {
                    const colors = getStatusColor(report.overallStatus);
                    return (
                      <div
                        key={report.id}
                        className="rounded-lg md:rounded-xl lg:rounded-2xl border-2 p-4 md:p-5 lg:p-6 transition-all cursor-pointer"
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderColor: '#374151',
                        }}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2 md:gap-3 mb-3">
                          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                            <div 
                              className="w-8 h-8 md:w-9 md:h-9 rounded flex items-center justify-center text-lg md:text-xl flex-shrink-0 text-white"
                              style={{ backgroundColor: '#1E3A8A' }}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 300 }}>
                                {report.categoryIcon === '❤️' ? 'favorite' : 'health_metrics'}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <h4 
                                className="font-bold text-sm md:text-base"
                                style={{ fontFamily: 'Montserrat, sans-serif', color: '#111827' }}
                              >
                                {report.categoryTitle}
                              </h4>
                              <p className="text-xs text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                {report.deviceName}
                              </p>
                            </div>
                          </div>
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                            style={{ backgroundColor: colors.dot }}
                          />
                        </div>

                        {/* Date */}
                        <p 
                          className="text-xs font-semibold mb-3 uppercase tracking-widest"
                          style={{ color: '#6B7280', fontFamily: 'Montserrat, sans-serif' }}
                        >
                          {formatDate(report.date)}
                        </p>

                        {/* Key Metrics */}
                        <div className="bg-gray-50 rounded-lg p-2.5 md:p-3 mb-3">
                          <p 
                            className="text-xs font-bold uppercase tracking-widest mb-2"
                            style={{ color: '#6B7280', fontFamily: 'Montserrat, sans-serif' }}
                          >
                            Metrics
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {report.keyMetrics.map((metric, idx) => (
                              <span
                                key={idx}
                                className="text-xs font-semibold px-2 py-1 bg-white rounded"
                                style={{ color: '#374151', fontFamily: 'Montserrat, sans-serif', border: '1px solid #D1D5DB' }}
                              >
                                {metric}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Summary */}
                        <p
                          className="text-xs md:text-sm font-semibold mb-3"
                          style={{ color: '#374151', fontFamily: 'Montserrat, sans-serif' }}
                        >
                          {report.summary}
                        </p>

                        {/* Status Badge */}
                        <div className="pt-3 border-t border-gray-200">
                          <span
                            className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded inline-flex items-center gap-1"
                            style={{
                              backgroundColor: colors.dot,
                              color: 'white',
                              fontFamily: 'Montserrat, sans-serif',
                            }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '14px', fontWeight: 300 }}>
                              {report.overallStatus === 'normal' ? 'check_circle' : 'warning'}
                            </span>
                            {report.overallStatus === 'normal'
                              ? 'Healthy'
                              : report.overallStatus === 'warning'
                                ? 'Monitor'
                                : 'Alert'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Schemes Enrolled Tab */}
            {activeTab === 'enrolled' && (
              <div>
                <h3 
                  className="font-bold mb-4 flex-shrink-0" 
                  style={{ fontFamily: 'Playfair Display, serif', color: '#111827', fontSize: '32px' }}
                >
                  Schemes Enrolled
                </h3>
                <div className="space-y-3">
                  {enrolledSchemes.map((scheme) => (
                    <div
                      key={scheme.id}
                      className="rounded-lg md:rounded-xl border-2 p-4 md:p-5 lg:p-6"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#374151',
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 
                            className="font-bold text-base md:text-lg mb-1"
                            style={{ fontFamily: 'Montserrat, sans-serif', color: '#111827' }}
                          >
                            {scheme.name}
                          </h4>
                          <p className="text-xs md:text-sm" style={{ color: '#6B7280', fontFamily: 'Montserrat, sans-serif' }}>
                            Enrolled since: {scheme.enrollmentDate}
                          </p>
                        </div>
                        <span
                          className="text-xs font-bold px-3 py-1 rounded"
                          style={{
                            backgroundColor: '#DCF5E3',
                            color: '#16A34A',
                            fontFamily: 'Montserrat, sans-serif',
                          }}
                        >
                          {scheme.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Schemes Eligible Tab */}
            {activeTab === 'eligible' && (
              <div>
                <h3 
                  className="font-bold mb-4 flex-shrink-0" 
                  style={{ fontFamily: 'Playfair Display, serif', color: '#111827', fontSize: '32px' }}
                >
                  Schemes Eligible
                </h3>
                <div className="space-y-3">
                  {eligibleSchemes.map((scheme) => (
                    <div
                      key={scheme.id}
                      className="rounded-lg md:rounded-xl border-2 p-4 md:p-5 lg:p-6"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#374151',
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 
                            className="font-bold text-base md:text-lg mb-1"
                            style={{ fontFamily: 'Montserrat, sans-serif', color: '#111827' }}
                          >
                            {scheme.name}
                          </h4>
                          <p className="text-xs md:text-sm" style={{ color: '#6B7280', fontFamily: 'Montserrat, sans-serif' }}>
                            {scheme.reason}
                          </p>
                        </div>
                        <span
                          className="text-xs font-bold px-3 py-1 rounded whitespace-nowrap"
                          style={{
                            backgroundColor: scheme.eligible === 'Yes' ? '#DCF5E3' : scheme.eligible === 'Pending' ? '#FEF3C7' : '#F3E8E8',
                            color: scheme.eligible === 'Yes' ? '#16A34A' : scheme.eligible === 'Pending' ? '#92400E' : '#7F1D1D',
                            fontFamily: 'Montserrat, sans-serif',
                          }}
                        >
                          {scheme.eligible}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Patient Summary Tab */}
            {activeTab === 'summary' && (
              <div>
                <h3 
                  className="font-bold mb-4 flex-shrink-0" 
                  style={{ fontFamily: 'Playfair Display, serif', color: '#111827', fontSize: '32px' }}
                >
                  Patient Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="rounded-lg border-2 p-4 md:p-5" style={{ backgroundColor: '#FFFFFF', borderColor: '#374151' }}>
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#6B7280', fontFamily: 'Montserrat, sans-serif' }}>Total Checkups</p>
                    <p className="text-2xl md:text-3xl font-bold" style={{ color: '#1E3A8A', fontFamily: 'Montserrat, sans-serif' }}>{patientSummary.totalCheckups}</p>
                  </div>
                  <div className="rounded-lg border-2 p-4 md:p-5" style={{ backgroundColor: '#FFFFFF', borderColor: '#374151' }}>
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#6B7280', fontFamily: 'Montserrat, sans-serif' }}>Health Status</p>
                    <p className="text-2xl md:text-3xl font-bold" style={{ color: '#16A34A', fontFamily: 'Montserrat, sans-serif' }}>{patientSummary.healthStatus}</p>
                  </div>
                  <div className="rounded-lg border-2 p-4 md:p-5" style={{ backgroundColor: '#FFFFFF', borderColor: '#374151' }}>
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#6B7280', fontFamily: 'Montserrat, sans-serif' }}>Avg Heart Rate</p>
                    <p className="text-2xl md:text-3xl font-bold" style={{ color: '#111827', fontFamily: 'Montserrat, sans-serif' }}>{patientSummary.averageHeartRate} bpm</p>
                  </div>
                  <div className="rounded-lg border-2 p-4 md:p-5" style={{ backgroundColor: '#FFFFFF', borderColor: '#374151' }}>
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#6B7280', fontFamily: 'Montserrat, sans-serif' }}>Average BP</p>
                    <p className="text-2xl md:text-3xl font-bold" style={{ color: '#111827', fontFamily: 'Montserrat, sans-serif' }}>{patientSummary.averageBP}</p>
                  </div>
                  <div className="rounded-lg border-2 p-4 md:p-5" style={{ backgroundColor: '#FFFFFF', borderColor: '#374151' }}>
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#6B7280', fontFamily: 'Montserrat, sans-serif' }}>Chronic Conditions</p>
                    <p className="text-base font-bold" style={{ color: '#16A34A', fontFamily: 'Montserrat, sans-serif' }}>{patientSummary.chronicConditions}</p>
                  </div>
                  <div className="rounded-lg border-2 p-4 md:p-5" style={{ backgroundColor: '#FFFFFF', borderColor: '#374151' }}>
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#6B7280', fontFamily: 'Montserrat, sans-serif' }}>Allergies</p>
                    <p className="text-base font-bold" style={{ color: '#DC2626', fontFamily: 'Montserrat, sans-serif' }}>{patientSummary.allergies}</p>
                  </div>
                </div>
                <div className="rounded-lg border-2 p-4 md:p-5 mt-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#374151' }}>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#6B7280', fontFamily: 'Montserrat, sans-serif' }}>Current Medications</p>
                  <p className="text-base" style={{ color: '#111827', fontFamily: 'Montserrat, sans-serif' }}>{patientSummary.medications}</p>
                </div>
              </div>
            )}
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
              onClick={() => router.push('/checkups')}
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
              New Checkup
            </button>
          </div>
        </div>
      </div>
    </KioskLayout>
  );
}
