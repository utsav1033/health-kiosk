'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';

interface KioskLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  onProfileClick?: () => void;
  onHomeClick?: () => void;
  onCheckupsClick?: () => void;
  onSchemesClick?: () => void;
  onChatbotClick?: () => void;
  userName?: string;
}

export const KioskLayout: React.FC<KioskLayoutProps> = ({
  children,
  showSidebar = true,
  onProfileClick,
  onHomeClick,
  onCheckupsClick,
  onSchemesClick,
  onChatbotClick,
  userName = 'Patient',
}) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = useMemo(() => [
    { label: 'Home', icon: 'home', path: '/', onClick: onHomeClick },
    { label: 'Checkups', icon: 'local_hospital', path: '/checkups', onClick: onCheckupsClick },
    { label: 'Symptom Checker', icon: 'stethoscope', path: '/chatbot', onClick: onChatbotClick },
    { label: 'Profile', icon: 'person', path: '/profile', onClick: onProfileClick },
    { label: 'Govt Schemes', icon: 'description', path: '/schemes', onClick: onSchemesClick },
  ], [onHomeClick, onProfileClick, onCheckupsClick, onSchemesClick, onChatbotClick]);

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-white" style={{ backgroundColor: '#FAFBFC' }}>
      {/* Left Sidebar */}
      {showSidebar && (
        <aside className="bg-white border-r flex flex-col justify-between overflow-y-auto flex-shrink-0" style={{ width: 'min(280px, 20vw)', borderColor: '#E5E7EB' }}>
          {/* Top Section */}
          <div className="flex flex-col gap-8 p-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0" style={{ backgroundColor: '#1E3A8A' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 300 }}>health_metrics</span>
              </div>
              <div className="min-w-0">
                <h1 className="font-bold leading-none tracking-tight" style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px' }}>YoloHealth</h1>
                <p className="uppercase tracking-widest text-gray-500 mt-1" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 600 }}>Diagnostic</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={item.onClick}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all flex-shrink-0"
                    style={{
                      color: active ? '#1E3A8A' : '#6B7280',
                      backgroundColor: active ? '#EFF6FF' : 'transparent',
                      borderLeft: active ? '3px solid #1E3A8A' : '3px solid transparent',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '14px',
                      fontWeight: active ? 600 : 500,
                    }}
                  >
                    <span className="material-symbols-outlined flex-shrink-0" style={{ fontSize: '20px', fontWeight: 300 }}>
                      {item.icon}
                    </span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Help Button */}
          <button 
            className="text-gray-600 font-medium py-3 px-3 m-6 rounded-lg flex items-center justify-center gap-2 transition-all text-xs tracking-widest uppercase border flex-shrink-0 hover:bg-gray-50"
            style={{ 
              borderColor: '#E5E7EB',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px',
            }}
          >
            <span className="material-symbols-outlined flex-shrink-0" style={{ fontSize: '20px', fontWeight: 300 }}>help</span>
            <span className="hidden sm:inline">Help</span>
          </button>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: '#FAFBFC' }}>
        {children}
      </main>
    </div>
  );
};

export default KioskLayout;
