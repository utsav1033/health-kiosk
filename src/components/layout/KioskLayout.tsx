'use client';

import React from 'react';

interface KioskLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * KioskLayout Component
 * 
 * A wrapper component optimized for medical diagnostic kiosk displays.
 * Enforces landscape orientation and full-screen viewport constraints
 * suitable for 1080p touchscreen kiosks in clinical environments.
 * 
 * Kiosk Constraints:
 * - Full viewport height with no scrolling
 * - Landscape orientation lock
 * - Touch-optimized spacing and interactions
 * - No overflow scrollbars
 * - Centered content area with consistent padding
 */
export const KioskLayout: React.FC<KioskLayoutProps> = ({
  children,
  className = '',
}) => {
  React.useEffect(() => {
    // Prevent body scrolling in kiosk mode
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Attempt to lock screen orientation to landscape
    if (window.screen.orientation && (window.screen.orientation as any).lock) {
      try {
        (window.screen.orientation as any).lock('landscape').catch(() => {
          console.warn('Screen orientation lock not supported on this device');
        });
      } catch (error) {
        console.warn('Could not lock screen orientation:', error);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className={`
        /* Full viewport dimensions */
        w-screen h-screen min-h-screen
        /* Prevent any scrolling */
        overflow-hidden
        /* Flex layout for content distribution */
        flex flex-col
        /* Medical theme background */
        bg-[var(--bg-light)]
        /* Touch-optimized pointer events */
        touch-none
        /* Disable text selection for kiosk */
        select-none
        /* Ensure hardware acceleration for smooth transitions */
        transform translate-z-0
        ${className}
      `}
      style={{
        /* Ensure no OS scrollbars appear */
        scrollbarWidth: 'none',
      }}
    >
      {/* Hide scrollbar for webkit browsers (Chrome, Safari, Edge) */}
      <style>{`
        ${':root'} {
          scrollbar-width: none;
        }
        ${'::-webkit-scrollbar'} {
          display: none;
        }
      `}</style>

      {/* Content area with safe padding for edge devices */}
      <div
        className="
          flex flex-col flex-1
          w-full h-full
          p-6 md:p-8 lg:p-10
          gap-6
          overflow-hidden
        "
        role="main"
      >
        {children}
      </div>
    </div>
  );
};

export default KioskLayout;




