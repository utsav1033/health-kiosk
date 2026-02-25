'use client';

import React from 'react';
import { THEME_COLORS } from '@/constants/theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: React.ReactNode;

  /**
   * Visual style variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';

  /**
   * Button size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether button should take full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Whether button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * ARIA label for icon-only buttons (accessibility)
   * Required for buttons with only icons or emoji
   */
  ariaLabel?: string;

  /**
   * Whether button contains only an icon (affects sizing and accessibility)
   */
  iconOnly?: boolean;

  /**
   * Loading state - shows spinner and disables button
   * @default false
   */
  loading?: boolean;

  /**
   * Loading spinner element to display
   * Override for custom spinner
   */
  loadingSpinner?: React.ReactNode;
}

/**
 * Button Component
 *
 * A reusable, touch-optimized, accessible button component for the medical diagnostic kiosk.
 * Supports multiple variants and sizes with WCAG AAA accessibility standards.
 *
 * ===== ACCESSIBILITY FEATURES =====
 * 
 * Touch Target Sizes (WCAG AAA):
 * - lg: 60px minimum height (call-to-action buttons) ✅ Exceeds WCAG AAA (48px)
 * - md: 48px minimum height (standard buttons) ✅ WCAG AAA standard
 * - sm: 44px minimum height (secondary actions) ⚠️ WCAG AA standard (use sparingly)
 * 
 * Keyboard Accessibility:
 * - All buttons are keyboard accessible (native <button> element)
 * - Tab order is automatic
 * - Enter and Space keys trigger click events
 * - Focus state clearly visible with blue outline
 * 
 * Visual Indicators:
 * - Focus state: 4px outline ring with primary blue color
 * - Hover state: 90% opacity change for feedback
 * - Active state: 80% opacity change for pressed feedback
 * - Disabled state: 50% opacity with not-allowed cursor
 * 
 * ARIA Support:
 * - Icon-only buttons: Use ariaLabel prop for screen readers
 * - Disabled buttons: Native disabled attribute handled
 * - Button type support: submit, reset, button
 * 
 * Size Specifications (WCAG AAA Touch Targets):
 * - lg: 60px height, 32px horizontal padding, text-lg, rounded-full (call-to-action)
 * - md: 48px height, 24px horizontal padding, text-base, rounded-lg (standard)
 * - sm: 44px height, 16px horizontal padding, text-sm, rounded-lg (secondary actions)
 *
 * Variants:
 * - primary: Main action button with medical blue background
 * - secondary: Secondary action button with healthcare green background
 * - tertiary: Outlined button with primary border
 * - ghost: Text-only button with no background
 * 
 * ===== USAGE EXAMPLES =====
 * 
 * Standard button:
 *   <Button size="md" variant="primary">Click me</Button>
 * 
 * Icon-only button with ARIA label:
 *   <Button size="md" iconOnly ariaLabel="Close dialog">✕</Button>
 * 
 * Large CTA button (60px):
 *   <Button size="lg" variant="secondary">Start Checkup</Button>
 * 
 * Disabled button:
 *   <Button disabled>Save Changes</Button>
 * 
 * Loading state:
 *   <Button loading>Processing...</Button>
 * 
 * Loading with custom spinner:
 *   <Button loading loadingSpinner={<CustomSpinner />}>
 *     Complete Session
 *   </Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled = false,
      onClick,
      className = '',
      ariaLabel,
      iconOnly = false,
      loading = false,
      loadingSpinner,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    // Size styles with WCAG AAA touch targets
    const sizeStyles = {
      // WCAG AA standard (44px minimum) - use for secondary actions
      sm: 'min-h-[44px] px-4 text-sm rounded-lg',
      // WCAG AAA standard (48px minimum) - use for most buttons
      md: 'min-h-[48px] px-6 text-base rounded-lg',
      // Exceeds WCAG AAA (60px) - use for primary CTAs
      lg: 'min-h-[60px] px-8 text-lg rounded-full',
    };

    // Icon-only button adjustments for square touch targets
    const iconOnlyStyles = iconOnly ? {
      sm: 'min-h-[44px] min-w-[44px] p-0',
      md: 'min-h-[48px] min-w-[48px] p-0',
      lg: 'min-h-[60px] min-w-[60px] p-0',
    } : null;

    // Disabled state
    const disabledStyles = disabled || loading
      ? 'opacity-50 cursor-not-allowed'
      : 'cursor-pointer';

    // Full width modifier
    const widthStyles = fullWidth ? 'w-full' : '';

    // Base classes with focus-visible for better keyboard accessibility
    const baseClasses =
      'inline-flex items-center justify-center font-medium select-none no-select transition-all duration-200 ease-in-out focus-visible:outline-4 focus-visible:outline-offset-2';

    // Apply focus outline based on variant
    const focusOutlineClass =
      variant === 'secondary'
        ? 'focus-visible:outline-[#5A8C74]'
        : 'focus-visible:outline-[#3A5A8C]';

    // Default loading spinner
    const defaultSpinner = (
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full animate-spin"
          style={{
            borderTop: `2px solid ${variant === 'primary' || variant === 'secondary' ? 'white' : THEME_COLORS.primaryBlue}`,
            borderRight: `2px solid transparent`,
            borderBottom: `2px solid transparent`,
            borderLeft: `2px solid transparent`,
          }}
        />
        <span>{children}</span>
      </div>
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-busy={loading}
        className={`
          ${baseClasses}
          ${focusOutlineClass}
          ${iconOnlyStyles ? iconOnlyStyles[size] : sizeStyles[size]}
          ${widthStyles}
          ${disabledStyles}
          ${className}
        `}
        style={{
          backgroundColor:
            variant === 'primary'
              ? THEME_COLORS.primaryBlue
              : variant === 'secondary'
                ? THEME_COLORS.secondaryGreen
                : variant === 'tertiary' || variant === 'ghost'
                  ? 'transparent'
                  : undefined,
          color:
            variant === 'primary' || variant === 'secondary'
              ? 'white'
              : variant === 'tertiary' || variant === 'ghost'
                ? THEME_COLORS.primaryBlue
                : undefined,
          borderColor:
            variant === 'tertiary' ? THEME_COLORS.primaryBlue : undefined,
          borderWidth: variant === 'tertiary' ? '2px' : '0px',
          opacity: disabled || loading ? 0.5 : 1,
          cursor: disabled || loading ? 'not-allowed' : 'pointer',
          // Hover and active state feedback
          transition: 'all 200ms ease-in-out',
        }}
        // Hover effect
        onMouseEnter={(e) => {
          if (!disabled && !loading && variant !== 'ghost') {
            (e.target as HTMLButtonElement).style.opacity = '0.9';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !loading && variant !== 'ghost') {
            (e.target as HTMLButtonElement).style.opacity = '1';
          }
        }}
        // Active effect
        onMouseDown={(e) => {
          if (!disabled && !loading && variant !== 'ghost') {
            (e.target as HTMLButtonElement).style.opacity = '0.8';
          }
        }}
        onMouseUp={(e) => {
          if (!disabled && !loading && variant !== 'ghost') {
            (e.target as HTMLButtonElement).style.opacity = '0.9';
          }
        }}
        {...rest}
      >
        {loading ? (loadingSpinner || defaultSpinner) : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;








