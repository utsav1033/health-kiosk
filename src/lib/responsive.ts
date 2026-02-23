/**
 * Responsive Utilities for Kiosk Display
 * 
 * Scaling functions optimized for 1080p landscape touchscreen displays (1920x1080).
 * These utilities ensure consistent sizing across the medical diagnostic kiosk.
 * 
 * Design Principles:
 * - Base multiplier: 1.2x for font sizes (ensures readability from distance)
 * - Padding multiplier: 1.1x (maintains proportional spacing)
 * - Spacing multiplier: 1.1x (touch-friendly sizes, min 44x44px)
 * - All values scaled for optimal viewing on 1080p landscape displays
 */

/**
 * Kiosk Display Configuration
 * Standard dimensions for medical diagnostic kiosk displays
 */
export const KIOSK_CONFIG = {
  // Display resolution (landscape orientation)
  displayWidth: 1920,
  displayHeight: 1080,
  aspectRatio: 16 / 9,

  // Viewing distance (typical medical environment)
  viewingDistanceMeters: 0.6,

  // Font size multiplier for 1080p kiosk (1.2x scale)
  fontSizeMultiplier: 1.2,

  // Padding multiplier for touch-friendly spacing
  paddingMultiplier: 1.1,

  // Spacing multiplier for touch targets
  spacingMultiplier: 1.1,

  // Minimum touch target size (WCAG AA standard)
  minTouchTarget: 44,
} as const;

/**
 * Get scaled font size for kiosk display
 * 
 * Scales font sizes by 1.2x multiplier for optimal readability
 * from typical viewing distance on 1080p landscape displays.
 * 
 * @param baseSize - Base font size in pixels (e.g., 16, 18, 24)
 * @returns Scaled font size in pixels
 * 
 * @example
 * // Standard text
 * const bodyFontSize = getKioskFontSize(16);  // Returns 19.2
 * 
 * // Heading text
 * const headingSize = getKioskFontSize(32);   // Returns 38.4
 * 
 * // Usage in styled component:
 * const fontSize = `${getKioskFontSize(16)}px`;
 */
export function getKioskFontSize(baseSize: number): number {
  return Math.round(baseSize * KIOSK_CONFIG.fontSizeMultiplier * 10) / 10;
}

/**
 * Get scaled padding for kiosk display
 * 
 * Scales padding by 1.1x multiplier to maintain proportional spacing
 * while keeping layout compact. Results in spacious, readable layouts.
 * 
 * @param baseSize - Base padding value in pixels (e.g., 8, 16, 24)
 * @returns Scaled padding value in pixels
 * 
 * @example
 * // Small padding
 * const smallPadding = getKioskPadding(8);    // Returns 8.8
 * 
 * // Standard padding
 * const standardPadding = getKioskPadding(16); // Returns 17.6
 * 
 * // Large padding
 * const largePadding = getKioskPadding(32);   // Returns 35.2
 * 
 * // Usage in styled component:
 * const padding = `${getKioskPadding(16)}px`;
 */
export function getKioskPadding(baseSize: number): number {
  return Math.round(baseSize * KIOSK_CONFIG.paddingMultiplier * 10) / 10;
}

/**
 * Get scaled spacing for kiosk display
 * 
 * Scales spacing values by 1.1x multiplier to create touch-friendly
 * gaps and margins. Ensures minimum touch target of 44px is maintained.
 * 
 * @param baseSize - Base spacing value in pixels (e.g., 4, 8, 16, 24)
 * @returns Scaled spacing value in pixels (minimum 44px for touch targets)
 * 
 * @example
 * // Extra small spacing
 * const xs = getKioskSpacing(4);   // Returns 4.4
 * 
 * // Small spacing
 * const sm = getKioskSpacing(8);   // Returns 8.8
 * 
 * // Standard spacing
 * const md = getKioskSpacing(16);  // Returns 17.6
 * 
 * // Large spacing
 * const lg = getKioskSpacing(32);  // Returns 35.2
 * 
 * // Usage in styled component:
 * const gap = `${getKioskSpacing(16)}px`;
 */
export function getKioskSpacing(baseSize: number): number {
  return Math.round(baseSize * KIOSK_CONFIG.spacingMultiplier * 10) / 10;
}

/**
 * Get minimum touch target size
 * 
 * Returns the recommended minimum size for interactive elements
 * based on WCAG AA accessibility guidelines. Ensures buttons,
 * links, and other touch targets are easily tappable.
 * 
 * @returns Minimum touch target size in pixels (44px)
 * 
 * @example
 * // Button styling
 * const buttonSize = getMinTouchTarget();  // Returns 44
 * 
 * // Usage in styled component:
 * <button style={{ minHeight: `${getMinTouchTarget()}px` }} />
 */
export function getMinTouchTarget(): number {
  return KIOSK_CONFIG.minTouchTarget;
}

/**
 * Calculate responsive scale factor
 * 
 * Determines overall scale factor based on viewport dimensions.
 * Useful for adapting to displays that don't match 1080p exactly.
 * 
 * @param currentWidth - Current viewport width in pixels
 * @param currentHeight - Current viewport height in pixels
 * @returns Scale factor (1.0 = standard 1080p)
 * 
 * @example
 * // For 1080p display
 * const scale = getResponsiveScale(1920, 1080);  // Returns ~1.0
 * 
 * // For 4K display (upscaled)
 * const scale = getResponsiveScale(3840, 2160);  // Returns ~2.0
 * 
 * // For 720p display (downscaled)
 * const scale = getResponsiveScale(1280, 720);   // Returns ~0.67
 */
export function getResponsiveScale(
  currentWidth: number,
  currentHeight: number
): number {
  const currentRatio = currentWidth / currentHeight;
  const standardRatio = KIOSK_CONFIG.displayWidth / KIOSK_CONFIG.displayHeight;

  // Use width as primary scaling factor
  const widthScale = currentWidth / KIOSK_CONFIG.displayWidth;

  // Adjust if aspect ratio differs significantly
  if (Math.abs(currentRatio - standardRatio) > 0.1) {
    const heightScale = currentHeight / KIOSK_CONFIG.displayHeight;
    return (widthScale + heightScale) / 2;
  }

  return widthScale;
}

/**
 * Scale all responsive values based on viewport
 * 
 * Applies scale factor to font sizes, padding, and spacing
 * for displays that differ from standard 1080p.
 * 
 * @param baseSize - Base value to scale
 * @param scale - Scale factor from getResponsiveScale()
 * @param type - Type of value: 'font', 'padding', or 'spacing'
 * @returns Scaled value in pixels
 * 
 * @example
 * // For 4K display
 * const scale = getResponsiveScale(3840, 2160);
 * const fontSize = scaleKioskValue(16, scale, 'font');
 * const padding = scaleKioskValue(16, scale, 'padding');
 */
export function scaleKioskValue(
  baseSize: number,
  scale: number,
  type: 'font' | 'padding' | 'spacing'
): number {
  let multiplier = 1;

  switch (type) {
    case 'font':
      multiplier = KIOSK_CONFIG.fontSizeMultiplier;
      break;
    case 'padding':
      multiplier = KIOSK_CONFIG.paddingMultiplier;
      break;
    case 'spacing':
      multiplier = KIOSK_CONFIG.spacingMultiplier;
      break;
  }

  return Math.round(baseSize * multiplier * scale * 10) / 10;
}

/**
 * Get viewport-based padding (CSS safe area consideration)
 * 
 * Returns padding that accounts for safe areas on kiosk displays.
 * Useful for ensuring content doesn't get cut off on edge devices.
 * 
 * @param position - Safe area position: 'top', 'bottom', 'left', 'right'
 * @returns Safe padding in pixels
 * 
 * @example
 * // Top safe area padding
 * const topPadding = getSafePadding('top');    // Returns 24
 * 
 * // Bottom safe area padding
 * const bottomPadding = getSafePadding('bottom'); // Returns 24
 * 
 * // Usage in styled component:
 * <div style={{ paddingTop: `${getSafePadding('top')}px` }} />
 */
export function getSafePadding(
  position: 'top' | 'bottom' | 'left' | 'right'
): number {
  // Standard safe padding for kiosk displays
  const safePadding = 24;

  // Slightly less for left/right to maximize content area
  if (position === 'left' || position === 'right') {
    return Math.round(safePadding * 0.75);
  }

  return safePadding;
}

/**
 * Utility object with all kiosk sizing functions
 * 
 * Provides convenient access to all responsive utilities
 * for use in styled components or calculations.
 * 
 * @example
 * import { kioskSize } from '@/lib/responsive';
 * 
 * const style = {
 *   fontSize: `${kioskSize.fontSize(16)}px`,
 *   padding: `${kioskSize.padding(16)}px`,
 *   gap: `${kioskSize.spacing(8)}px`,
 * };
 */
export const kioskSize = {
  fontSize: getKioskFontSize,
  padding: getKioskPadding,
  spacing: getKioskSpacing,
  minTouch: getMinTouchTarget,
  scale: getResponsiveScale,
  safeArea: getSafePadding,
} as const;




