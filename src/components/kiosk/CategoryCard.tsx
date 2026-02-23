'use client';

import React from 'react';
import type { CheckupCategory } from '@/constants/checkupData';

interface CategoryCardProps {
  category: CheckupCategory;
  onClick: () => void;
  isSelected?: boolean;
  icon?: React.ReactNode;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onClick,
  isSelected = false,
  icon,
}) => {
  const isFeatured = category.id === 'full-body';

  return (
    <button
      onClick={onClick}
      className={`
        w-full rounded-3xl transition-all duration-300 flex flex-col justify-between items-center text-center
        p-10 active:scale-95 overflow-hidden
        ${
          isFeatured
            ? 'bg-slate-900 text-white hover:bg-slate-800'
            : isSelected
              ? 'bg-blue-50'
              : 'bg-white'
        }
      `}
      style={{ 
        fontFamily: 'Montserrat, sans-serif', 
        borderColor: isFeatured ? '#059669' : '#1E3A8A',
        borderStyle: 'solid',
        borderWidth: isFeatured ? '0px' : '3px',
        borderRadius: '24px',
        minHeight: '420px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Left Border Accent for Featured */}
      {isFeatured && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '8px',
            backgroundColor: '#3CCB7F',
            borderRadius: '24px 0 0 24px',
          }}
        />
      )}

      {/* Recommended Badge */}
      {isFeatured && (
        <div 
          className="mb-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
          style={{ backgroundColor: '#3CCB7F' }}
        >
          Recommended
        </div>
      )}

      {/* Icon */}
      <div className="mb-4">
        <span 
          className="material-symbols-outlined"
          style={{ 
            color: isFeatured ? '#3CCB7F' : '#1E3A8A', 
            fontWeight: 300,
            fontSize: '64px'
          }}
        >
          {icon || category.icon}
        </span>
      </div>

      {/* Title */}
      <h3 
        className="font-bold mb-4"
        style={{ 
          color: isFeatured ? 'white' : '#111827', 
          fontFamily: 'Playfair Display, serif',
          fontSize: '28px'
        }}
      >
        {category.title}
      </h3>

      {/* Description */}
      <div 
        className={`space-y-2 mb-6 w-full max-w-xs mx-auto text-left flex-1 ${isFeatured ? 'text-slate-200' : 'text-slate-600'}`} 
        style={{ fontSize: '14px', fontFamily: 'Montserrat, sans-serif' }}
      >
        {category.description.split(', ').map((point, idx) => (
          <p key={idx} className="flex items-start gap-2">
            <span 
              className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
              style={{ backgroundColor: isFeatured ? '#3CCB7F' : '#1E3A8A' }}
            ></span>
            <span>{point.trim()}</span>
          </p>
        ))}
      </div>

      {/* Select Button */}
      <button
        onClick={onClick}
        className={`
          w-full py-4 px-6 rounded-xl font-bold uppercase tracking-widest transition-all
          ${
            isFeatured
              ? 'text-white shadow-lg hover:shadow-xl hover:brightness-105'
              : 'text-white border-0 hover:shadow-md'
          }
        `}
        style={{ 
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '15px',
          fontWeight: 700,
          backgroundColor: isFeatured ? '#3CCB7F' : '#1E3A8A',
          color: 'white',
          cursor: 'pointer',
          boxShadow: isFeatured ? '0 4px 12px rgba(60, 203, 127, 0.3)' : '0 2px 8px rgba(30, 58, 138, 0.2)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = isFeatured 
            ? '0 6px 16px rgba(60, 203, 127, 0.4)' 
            : '0 4px 12px rgba(30, 58, 138, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = isFeatured 
            ? '0 4px 12px rgba(60, 203, 127, 0.3)' 
            : '0 2px 8px rgba(30, 58, 138, 0.2)';
        }}
      >
        {isFeatured ? 'START ASSESSMENT' : `SELECT`}
      </button>
    </button>
  );
};

export default CategoryCard;
