import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * Navigation Routes
 * 
 * Central repository for all application routes.
 * Used throughout the application for navigation consistency.
 */
export const ROUTES = {
  /**
   * Home / Welcome page
   * Landing page for the medical diagnostic kiosk
   */
  HOME: '/',

  /**
   * Checkups / Dashboard page
   * Main diagnostic dashboard with vitals, scans, metabolic data
   */
  CHECKUPS: '/checkups',

  /**
   * Patient Profile page
   * Patient information, clinical reports history, demographics
   */
  PROFILE: '/profile',

  /**
   * Government Schemes page
   * Central, state, and district level health schemes
   */
  SCHEMES: '/schemes',

  /**
   * Chatbot page
   * AI-powered health information assistant
   */
  CHATBOT: '/chatbot',
} as const;

/**
 * Type for route keys
 */
export type RouteKey = keyof typeof ROUTES;

/**
 * Type for route values
 */
export type RoutePath = typeof ROUTES[RouteKey];

/**
 * Navigate to a specific page
 * 
 * Handles Next.js router navigation with proper TypeScript typing.
 * Used in button onClick handlers and navigation events.
 * 
 * @param router - Next.js App Router instance
 * @param path - Route path to navigate to (use ROUTES constants)
 * @returns Promise that resolves when navigation is complete
 * 
 * @example
 * // In a button onClick handler:
 * const handleNavigate = () => {
 *   navigateToPage(router, ROUTES.PROFILE);
 * };
 * 
 * // Or with route constant:
 * <Button onClick={() => navigateToPage(router, ROUTES.CHECKUPS)}>
 *   Go to Checkups
 * </Button>
 */
export async function navigateToPage(
  router: AppRouterInstance,
  path: RoutePath
): Promise<void> {
  try {
    await router.push(path);
    console.log(`Navigated to: ${path}`);
  } catch (error) {
    console.error(`Navigation failed to ${path}:`, error);
    throw error;
  }
}

/**
 * Get route by key
 * 
 * Utility function to get a route path by its key.
 * Useful for dynamic route selection.
 * 
 * @param key - Route key from ROUTES object
 * @returns Route path string
 * 
 * @example
 * const path = getRoute('PROFILE'); // Returns '/profile'
 */
export function getRoute(key: RouteKey): RoutePath {
  return ROUTES[key];
}

/**
 * Check if current path is active
 * 
 * Utility function to determine if a given path matches the current pathname.
 * Useful for highlighting active navigation items.
 * 
 * @param currentPath - Current pathname from usePathname()
 * @param targetPath - Target path to check against
 * @returns Boolean indicating if paths match
 * 
 * @example
 * const pathname = usePathname();
 * const isProfileActive = isActivePath(pathname, ROUTES.PROFILE); // true if on /profile
 */
export function isActivePath(currentPath: string, targetPath: RoutePath): boolean {
  return currentPath === targetPath;
}

/**
 * Check if path starts with route
 * 
 * Utility function to check if current path starts with a target path.
 * Useful for matching nested routes or sections.
 * 
 * @param currentPath - Current pathname from usePathname()
 * @param targetPath - Target path to check against
 * @returns Boolean indicating if current path starts with target
 * 
 * @example
 * const pathname = usePathname();
 * const isInCheckups = isPathInRoute(pathname, ROUTES.CHECKUPS); // true if on /checkups or /checkups/...
 */
export function isPathInRoute(currentPath: string, targetPath: RoutePath): boolean {
  return currentPath.startsWith(targetPath);
}




