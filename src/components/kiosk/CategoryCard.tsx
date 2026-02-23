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
        p-8 active:scale-95 overflow-hidden
        ${
          isFeatured
            ? 'bg-slate-900 text-white hover:bg-slate-800'
            : isSelected
              ? 'bg-blue-50'
              : 'bg-white'
        }
      `}
      style={{ fontFamily: 'Montserrat, sans-serif', borderColor: '#1E3A8A', borderWidth: '3px', borderStyle: 'solid', height: '450px' }}
    >
      {/* Icon */}
      <div className="mb-6">
        <span 
          className="material-symbols-outlined text-8xl"
          style={{ color: isFeatured ? '#1E3A8A' : '#1E3A8A', fontWeight: 300 }}
        >
          {icon || category.icon}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold mb-4" style={{ color: isFeatured ? 'white' : '#111827', fontFamily: 'Playfair Display, serif', fontSize: '32px' }}>
        {category.title}
      </h3>

      {/* Description */}
      <div className={`space-y-3 mb-6 w-full max-w-xs mx-auto text-left ${isFeatured ? 'text-slate-300' : 'text-slate-600'}`} style={{ fontSize: '18px', fontFamily: 'Montserrat, sans-serif' }}>
        {category.description.split(', ').map((point, idx) => (
          <p key={idx}>
            • {point.trim()}
          </p>
        ))}
      </div>

      {/* Select Button */}
      <button
        onClick={onClick}
        className={`
          w-full py-5 px-8 rounded-2xl font-bold uppercase tracking-widest transition-all
          ${
            isFeatured
              ? 'bg-white text-slate-900 hover:bg-slate-100'
              : 'text-slate-500 hover:bg-slate-50'
          }
        `}
        style={{ 
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '16px',
          fontWeight: 700,
          borderColor: '#1E3A8A',
          borderWidth: '3px'
        }}
      >
        {isFeatured ? 'Start Full Scan' : 'Select'}
      </button>
    </button>
  );
};

export default CategoryCard;
