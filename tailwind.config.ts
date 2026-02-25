import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS Configuration
 * 
 * Medical Diagnostic Kiosk - Optimized for 1080p Landscape Displays
 * 
 * ===== RESPONSIVE BREAKPOINTS STRATEGY =====
 * 
 * The kiosk design is optimized for FIXED LANDSCAPE 1080p displays (1920x1080).
 * Responsive breakpoints are used minimally and only for ultra-wide displays.
 * 
 * Breakpoint Strategy:
 * 
 * 1. BASE / DEFAULT (Mobile sizes, NOT used)
 *    - Tailwind default: 0px to 640px (sm)
 *    - Why NOT used: Kiosk is fixed landscape, never portrait
 *    - Example: grid-cols-1 (never applies to kiosk)
 * 
 * 2. STANDARD LANDSCAPE 1080p (Default breakpoint)
 *    - 1920x1080 landscape (standard kiosk resolution)
 *    - This is our PRIMARY TARGET
 *    - Use base classes without breakpoint prefix
 *    - Example: grid-cols-3 (main checkups grid)
 *    - Example: lg:grid-cols-3 at 1024px base classes
 * 
 * 3. ULTRA-WIDE / 4K Displays (lg breakpoint, 1024px+)
 *    - 3840x2160+ (4K kiosks or larger installations)
 *    - Use 'lg:' prefix for upscaled layouts
 *    - Example: lg:grid-cols-4 (more columns on ultra-wide)
 *    - Tailwind lg breakpoint: 1024px+
 * 
 * ===== AVAILABLE TAILWIND BREAKPOINTS =====
 * 
 * sm:  640px   (NOT used - no mobile support)
 * md:  768px   (NOT used - no tablet portrait)
 * lg:  1024px  (USED - ultra-wide displays, 4K upscale)
 * xl:  1280px  (NOT used - beyond ultra-wide scope)
 * 2xl: 1536px  (NOT used - beyond ultra-wide scope)
 * 
 * ===== USAGE EXAMPLES IN COMPONENTS =====
 * 
 * Checkups Dashboard Grid:
 *   <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
 *   - Base: 3 columns (1920px - standard 1080p)
 *   - lg: 4 columns (1024px+ - ultra-wide / 4K)
 * 
 * Patient Profile Cards:
 *   <div className="grid grid-cols-4 gap-4">
 *   - No responsive breakpoint needed (standard kiosk)
 * 
 * Sidebar + Content Layout:
 *   <div className="flex flex-col lg:flex-row">
 *   - Responsive fallback for non-standard displays
 * 
 * ===== BEST PRACTICES =====
 * 
 * ✅ DO:
 *    - Use base classes as primary (1920x1080)
 *    - Use lg: prefix for ultra-wide upscaling only
 *    - Keep layouts consistent across breakpoints
 *    - Test on both 1080p and 4K displays
 * 
 * ❌ DON'T:
 *    - Use sm:, md:, xl: prefixes (no mobile/tablet support)
 *    - Create separate mobile layouts
 *    - Use responsive patterns for content restructuring
 *    - Optimize for portrait orientation
 */

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /**
       * CUSTOM BREAKPOINTS (if needed in future)
       * 
       * Uncomment to add custom kiosk-specific breakpoints:
       * 
       * screens: {
       *   // Standard 1080p landscape (base, no prefix needed)
       *   'kiosk-1080': '1920px',
       *   
       *   // 4K ultra-wide (use this instead of lg if needed)
       *   'kiosk-4k': '3840px',
       * }
       * 
       * Then use: kiosk-4k:grid-cols-4
       */
      
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'bg-light': 'var(--bg-light)',
        'border-custom': 'var(--border)',
        'text-main': 'var(--text-main)',
        'text-muted': 'var(--text-muted)',
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '12px',
        md: '8px',
        sm: '4px',
        full: '9999px',
      },
      backgroundColor: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        light: 'var(--bg-light)',
      },
      textColor: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        main: 'var(--text-main)',
        muted: 'var(--text-muted)',
      },
      borderColor: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        light: 'var(--border)',
      },
      boxShadow: {
        medical: '0 2px 8px rgba(58, 90, 140, 0.08)',
        'medical-lg': '0 4px 16px rgba(58, 90, 140, 0.12)',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
};
export default config;








