'use client';

import React from 'react';
import { THEME_COLORS } from '@/constants/theme';

interface BadgeProps {
  /**
   * Badge label text
   */
  label: string;

  /**
   * Badge variant/status type
   * @default 'neutral'
   */
  variant?: 'success' | 'warning' | 'neutral';

  /**
   * Optional icon name (emoji or Unicode character)
   */
  icon?: string;

  /**
   * Badge size
   * @default 'md'
   */
  size?: 'sm' | 'md';

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Badge Component
 *
 * A status indicator component for the medical diagnostic kiosk.
 * Displays status information with color-coded variants for visual clarity.
 *
 * Variants:
 * - success: Green background for successful/completed states
 * - warning: Orange/amber background for pending/caution states
 * - neutral: Gray background for default/neutral states
 *
 * Sizes:
 * - sm: Compact badge (padding-y 2px, text-xs)
 * - md: Standard badge (padding-y 4px, text-sm)
 */
export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  icon,
  size = 'md',
  className = '',
}) => {
  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  // Variant styles with medical color scheme
  const variantStyles = {
    success: {
      backgroundColor: THEME_COLORS.successGreen,
      color: '#FFFFFF',
      borderColor: THEME_COLORS.successGreen,
    },
    warning: {
      backgroundColor: THEME_COLORS.warning,
      color: '#FFFFFF',
      borderColor: THEME_COLORS.warning,
    },
    neutral: {
      backgroundColor: THEME_COLORS.bgLight,
      color: THEME_COLORS.textMuted,
      borderColor: THEME_COLORS.borderLight,
    },
  };

  const styles = variantStyles[variant];

  return (
    <span
      className={`
        inline-flex items-center justify-center gap-1.5
        rounded-full font-medium
        border border-solid
        transition-colors duration-200
        ${sizeStyles[size]}
        ${className}
      `}
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        borderColor: styles.borderColor,
      }}
      role="status"
      aria-label={`${variant} status: ${label}`}
    >
      {icon && (
        <span
          className="flex items-center justify-center"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span>{label}</span>
    </span>
  );
};

export default Badge;




