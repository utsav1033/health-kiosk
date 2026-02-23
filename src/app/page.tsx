'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES, navigateToPage } from '@/lib/navigation';

export default function Home() {
  const router = useRouter();

  const handleStartCheckup = async () => {
    await navigateToPage(router, ROUTES.CHECKUPS);
  };

  const handleBarcodeLogin = async () => {
    await navigateToPage(router, ROUTES.CHECKUPS);
  };

  const handleProfileReports = async () => {
    await navigateToPage(router, ROUTES.PROFILE);
  };

  const handleHelp = () => {
    console.log('Help clicked');
  };

  const handlePrivacy = () => {
    console.log('Privacy clicked');
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --medical-blue-dark: #1E3A8A;
          --medical-blue-light: #F0F7FF;
          --healthcare-green: #3CCB7F;
          --clinical-gray: #F8FAFC;
          --border-color: #E2E8F0;
          --text-main: #0F172A;
          --text-muted: #64748B;
        }

        @keyframes sway {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(20px) translateX(10px);
          }
        }

        body {
          font-family: 'Montserrat', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: white;
          color: var(--text-main);
        }

        h1, h2, .playfair {
          font-family: 'Playfair Display', serif;
        }

        .btn-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 30pt;
          line-height: 1.1;
        }

        .btn-text-secondary {
          font-family: 'Montserrat', sans-serif;
          font-size: 26pt;
          line-height: 1.1;
        }

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          display: inline-block;
          line-height: 1;
          text-transform: none;
          letter-spacing: normal;
          word-wrap: normal;
          white-space: nowrap;
          direction: ltr;
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
          -webkit-font-smoothing: antialiased;
        }

        button {
          border: none;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .bg-sway {
          animation: sway 8s ease-in-out infinite;
        }
      `}</style>

      <div className="bg-white text-[var(--text-main)] min-h-screen relative flex flex-col overflow-hidden w-full">
        {/* Background subtle grey with animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gray-100/40 rounded-full blur-3xl opacity-60 bg-sway"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gray-200/30 rounded-full blur-3xl opacity-40 bg-sway" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Header */}
        <header className="relative z-20 flex items-center justify-between px-16 py-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: '#1E3A8A' }}>
              <span className="material-symbols-outlined text-2xl">health_metrics</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800" style={{ fontFamily: 'Playfair Display, serif' }}>YoloHealth</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-5 py-2 bg-white rounded-full border border-[var(--border-color)] font-medium text-slate-600 shadow-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <span className="material-symbols-outlined text-xl" style={{ color: '#3CCB7F' }}>language</span>
              <span className="text-sm">English</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2 rounded-full border font-semibold shadow-sm" style={{ backgroundColor: '#F0FDF4', borderColor: '#3CCB7F', color: '#059669', fontFamily: 'Montserrat, sans-serif' }}>
              <div className="h-2 w-2 rounded-full bg-[var(--healthcare-green)] animate-pulse"></div>
              <span className="text-sm">Kiosk #402 Ready</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-16 relative z-10 w-full">
          {/* Title Section */}
          <div className="text-center mb-16">
            <h2 className="text-7xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif', color: '#111827' }}>Welcome to YoloHealth</h2>
            <p className="text-2xl italic" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-muted)' }}>Your Health, Our Priority</p>
          </div>

          {/* Button Grid */}
          <div className="w-full max-w-6xl grid grid-cols-12 gap-8 items-center">
            {/* Login Button */}
            <div className="col-span-3">
              <button
                onClick={handleBarcodeLogin}
                className="flex flex-col items-center justify-center gap-4 w-full h-40 px-6 rounded-2xl border-2 shadow-md hover:brightness-105 transition-all group active:scale-95"
                style={{ 
                  backgroundColor: '#F0FDF4', 
                  borderColor: '#3CCB7F',
                  color: '#059669'
                }}
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">barcode_scanner</span>
                </div>
                <span style={{ fontSize: '20pt', fontFamily: 'Montserrat, sans-serif' }} className="font-bold tracking-tight">Login</span>
              </button>
            </div>

            {/* Start Checkup Button - Center */}
            <div className="col-span-6">
              <button
                onClick={handleStartCheckup}
                className="flex flex-col items-center justify-center w-full h-48 px-10 bg-[var(--healthcare-green)] text-white rounded-3xl shadow-xl shadow-green-300/40 hover:brightness-110 transition-all group active:scale-95"
              >
                <span className="material-symbols-outlined text-5xl mb-3 opacity-95 group-hover:scale-110 transition-transform">play_circle</span>
                <div className="text-center">
                  <span style={{ fontSize: '24pt' }} className="block font-bold tracking-tight">Start Checkup</span>
                  <span className="text-sm mt-1 opacity-90 font-medium tracking-wide uppercase">60+ Health Parameters</span>
                </div>
              </button>
            </div>

            {/* Reports Button */}
            <div className="col-span-3">
              <button
                onClick={handleProfileReports}
                className="flex flex-col items-center justify-center gap-4 w-full h-40 px-6 rounded-2xl border-2 shadow-md hover:brightness-105 transition-all group active:scale-95"
                style={{ 
                  backgroundColor: '#F0FDF4', 
                  borderColor: '#3CCB7F',
                  color: '#059669'
                }}
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">account_circle</span>
                </div>
                <span style={{ fontSize: '20pt', fontFamily: 'Montserrat, sans-serif' }} className="font-bold tracking-tight">Reports</span>
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-20 flex items-center gap-8 px-10 py-4 bg-[var(--clinical-gray)] border border-[var(--border-color)] rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl text-[var(--medical-blue-dark)]">timer</span>
              <span className="text-sm font-semibold text-slate-700">Estimated duration: 10-15 mins</span>
            </div>
            <div className="w-px h-5 bg-slate-200"></div>
            <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] font-medium">
              <span className="material-symbols-outlined text-lg">accessibility_new</span>
              <p>Ensure you are standing comfortably within the designated floor area.</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-20 px-16 py-10 flex justify-between items-end">
          <div className="flex items-center gap-8">
            <button
              onClick={handleHelp}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold transition-colors"
            >
              <span className="material-symbols-outlined text-lg">help</span>
              <span className="uppercase text-[11px] tracking-widest">Help</span>
            </button>
            <button
              onClick={handlePrivacy}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold transition-colors"
            >
              <span className="material-symbols-outlined text-lg">security</span>
              <span className="uppercase text-[11px] tracking-widest">Privacy</span>
            </button>
          </div>
          <div className="flex items-center gap-10">
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Support Assistance</div>
              <div className="text-xl font-bold text-slate-700">1800-YOLO-HLTH</div>
            </div>
            <div className="h-12 w-px bg-slate-200"></div>
            <div className="text-slate-300 font-medium">
              <span className="text-[10px] uppercase tracking-[0.2em]">Ver 4.2.0</span>
        </div>
        </div>
        </footer>
    </div>
    </>
  );
}
