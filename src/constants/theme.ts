/**
 * Theme Configuration
 * 
 * Medical diagnostic kiosk color palette and design tokens
 * All colors are optimized for clinical environments with accessibility in mind
 */

export const THEME_COLORS = {
  // Primary Colors
  primaryBlue: '#3A5A8C',
  medicalBlueDark: '#2C5282',

  // Secondary Colors
  secondaryGreen: '#5A8C74',
  healthcareGreen: '#3CCB7F',
  successGreen: '#2d6a4f',

  // Background Colors
  bgLight: '#F8F9FA',
  bgWhite: '#FFFFFF',

  // Border Colors
  borderLight: '#E2E8F0',

  // Text Colors
  textMain: '#1E293B',
  textMuted: '#64748B',

  // Semantic Colors
  error: '#DC2626',
  warning: '#F59E0B',
  info: '#0284C7',
  success: '#16A34A',

  // Additional Medical-specific Colors
  cardBg: '#FFFFFF',
  dividerColor: '#E2E8F0',
  hoverBg: '#F1F5F9',
} as const;

/**
 * Kiosk Display Configuration
 * Optimized for landscape 1080p touchscreen displays (1920x1080)
 */
export const KIOSK_BREAKPOINT = {
  // Standard 1080p landscape dimensions
  width: 1920,
  height: 1080,
  aspectRatio: 16 / 9,

  // Safe area padding for edge devices
  safePaddingTop: 24,
  safePaddingBottom: 24,
  safePaddingLeft: 32,
  safePaddingRight: 32,

  // Touch-optimized minimum touch target size (44x44px)
  minTouchTarget: 44,

  // Font sizes optimized for viewing distance
  fontSizeTitle: 48,
  fontSizeHeading: 36,
  fontSizeSubheading: 24,
  fontSizeBody: 16,
  fontSizeSmall: 14,
} as const;

/**
 * Color palette grouped by usage
 */
export const PALETTE = {
  // Primary action colors
  primary: {
    light: '#5472A3',
    main: THEME_COLORS.primaryBlue,
    dark: THEME_COLORS.medicalBlueDark,
  },

  // Secondary action colors
  secondary: {
    light: '#7CA88A',
    main: THEME_COLORS.secondaryGreen,
    dark: THEME_COLORS.successGreen,
  },

  // Accent colors for healthcare
  accent: {
    healthGreen: THEME_COLORS.healthcareGreen,
    success: THEME_COLORS.successGreen,
  },

  // Neutral colors
  neutral: {
    white: THEME_COLORS.bgWhite,
    light: THEME_COLORS.bgLight,
    border: THEME_COLORS.borderLight,
    textPrimary: THEME_COLORS.textMain,
    textSecondary: THEME_COLORS.textMuted,
  },

  // Semantic colors
  semantic: {
    error: THEME_COLORS.error,
    warning: THEME_COLORS.warning,
    info: THEME_COLORS.info,
    success: THEME_COLORS.success,
  },
} as const;

/**
 * Type-safe color utility function
 */
export function getThemeColor(colorName: keyof typeof THEME_COLORS): string {
  return THEME_COLORS[colorName];
}

export type ThemeColorKey = keyof typeof THEME_COLORS;
export type KioskBreakpointKey = keyof typeof KIOSK_BREAKPOINT;




