/**
 * Accessibility (a11y) Utilities
 * 
 * Focus management and keyboard navigation utilities for the medical diagnostic kiosk.
 * Ensures keyboard users can navigate efficiently and focus is properly trapped in modals.
 * 
 * Reference: WCAG 2.1 Focus Management (Level AA)
 * https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Focusable selector - all elements that can receive focus
 */
const FOCUSABLE_SELECTOR = `
  a[href],
  button:not([disabled]),
  input:not([disabled]),
  textarea:not([disabled]),
  select:not([disabled]),
  [tabindex]:not([tabindex="-1"]),
  details,
  summary
`.trim();

/**
 * Get all focusable elements within a container
 * 
 * @param container - DOM element or document
 * @returns Array of focusable elements
 */
export function getFocusableElements(
  container: HTMLElement | Document = document
): HTMLElement[] {
  if (container instanceof Document) {
    return Array.from(document.querySelectorAll(FOCUSABLE_SELECTOR));
  }
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)) as HTMLElement[];
}

/**
 * Get first focusable element within a container
 * 
 * @param container - DOM element to search
 * @returns First focusable element or null
 */
export function getFirstFocusable(container: HTMLElement): HTMLElement | null {
  const focusables = getFocusableElements(container);
  return focusables.length > 0 ? focusables[0] : null;
}

/**
 * Get last focusable element within a container
 * 
 * @param container - DOM element to search
 * @returns Last focusable element or null
 */
export function getLastFocusable(container: HTMLElement): HTMLElement | null {
  const focusables = getFocusableElements(container);
  return focusables.length > 0 ? focusables[focusables.length - 1] : null;
}

/**
 * Focus trap - prevents focus from leaving a modal/dialog
 * 
 * Handles Tab and Shift+Tab to keep focus within the container.
 * When Tab is pressed on the last element, focus wraps to first.
 * When Shift+Tab is pressed on the first element, focus wraps to last.
 * 
 * @param event - KeyboardEvent from the container
 * @param container - DOM element containing focusable elements
 */
export function handleFocusTrap(
  event: KeyboardEvent,
  container: HTMLElement
): void {
  if (event.key !== 'Tab') return;

  const focusables = getFocusableElements(container);
  if (focusables.length === 0) return;

  const activeElement = document.activeElement as HTMLElement;
  const firstFocusable = focusables[0];
  const lastFocusable = focusables[focusables.length - 1];

  // Shift+Tab on first element -> focus last
  if (event.shiftKey && activeElement === firstFocusable) {
    event.preventDefault();
    lastFocusable.focus();
  }
  // Tab on last element -> focus first
  else if (!event.shiftKey && activeElement === lastFocusable) {
    event.preventDefault();
    firstFocusable.focus();
  }
}

/**
 * useKioskFocus Hook
 * 
 * Custom hook for managing focus and keyboard navigation on kiosk.
 * Handles:
 * - Automatic focus to first interactive element on page load
 * - Escape key to exit modals/focus traps
 * - Focus management for lazy-loaded content
 * - Keyboard navigation patterns
 * 
 * @param options - Configuration options
 * @returns Object with focus management methods
 * 
 * @example
 * const { focusFirstElement, trapFocus, releaseFocus } = useKioskFocus();
 * 
 * useEffect(() => {
 *   focusFirstElement();
 * }, [focusFirstElement]);
 */
export function useKioskFocus(options?: {
  autoFocus?: boolean;
  trapSelector?: string;
  onEscapeKey?: () => void;
}) {
  const containerRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isTrapActiveRef = useRef(false);

  /**
   * Focus the first interactive element in the container
   */
  const focusFirstElement = useCallback(() => {
    const first = containerRef.current
      ? getFirstFocusable(containerRef.current)
      : getFirstFocusable(document.body);

    if (first) {
      first.focus();
    }
  }, []);

  /**
   * Focus a specific element
   */
  const focusElement = useCallback((element: HTMLElement | null) => {
    if (element) {
      element.focus();
    }
  }, []);

  /**
   * Save current focus and return a function to restore it
   */
  const saveFocus = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    return () => {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, []);

  /**
   * Activate focus trap on container
   */
  const trapFocus = useCallback((container?: HTMLElement) => {
    const target = container || containerRef.current;
    if (!target) return;

    isTrapActiveRef.current = true;
    saveFocus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && options?.onEscapeKey) {
        event.preventDefault();
        options.onEscapeKey();
        return;
      }

      handleFocusTrap(event, target);
    };

    target.addEventListener('keydown', handleKeyDown);

    // Focus first element in trap
    const first = getFirstFocusable(target);
    if (first) {
      first.focus();
    }

    return () => {
      target.removeEventListener('keydown', handleKeyDown);
      isTrapActiveRef.current = false;
    };
  }, [saveFocus, options]);

  /**
   * Release focus trap and restore previous focus
   */
  const releaseFocus = useCallback(() => {
    isTrapActiveRef.current = false;
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, []);

  /**
   * Announce message to screen readers
   */
  const announce = useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-9999px';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement (typically 1 second for screen readers)
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  /**
   * Set container ref for focus management
   */
  const setContainer = useCallback((ref: HTMLElement | null) => {
    containerRef.current = ref;
  }, []);

  // Auto-focus on mount if enabled
  useEffect(() => {
    if (options?.autoFocus) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        focusFirstElement();
      });
    }
  }, [options?.autoFocus, focusFirstElement]);

  return {
    containerRef,
    focusFirstElement,
    focusElement,
    saveFocus,
    trapFocus,
    releaseFocus,
    announce,
    setContainer,
    isTrapActive: isTrapActiveRef.current,
  };
}

/**
 * Skip Links Utility
 * 
 * Skip links allow keyboard users to bypass repetitive content.
 * For kiosk, this is minimal (no main nav to skip), but included for completeness.
 * 
 * @example
 * // In layout or header component:
 * <SkipLink href="#main-content">Skip to main content</SkipLink>
 */
export function createSkipLinks(targets: Array<{
  label: string;
  href: string;
}>): HTMLElement {
  const container = document.createElement('div');
  container.className = 'skip-links';
  container.setAttribute('role', 'navigation');
  container.setAttribute('aria-label', 'Skip links');

  targets.forEach(({ label, href }) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    link.className = 'skip-link';
    link.style.cssText = `
      position: absolute;
      top: -40px;
      left: 0;
      background: #3A5A8C;
      color: white;
      padding: 8px 16px;
      z-index: 9999;
      text-decoration: none;
      border-radius: 0 0 4px 0;
    `;

    link.addEventListener('focus', () => {
      link.style.top = '0';
    });

    link.addEventListener('blur', () => {
      link.style.top = '-40px';
    });

    container.appendChild(link);
  });

  return container;
}

/**
 * useModalFocus Hook
 * 
 * Specialized hook for managing focus in modal dialogs (like chatbot panel).
 * Automatically:
 * - Traps focus within modal
 * - Saves and restores previous focus
 * - Handles Escape key to close
 * - Announces modal open/close to screen readers
 * 
 * @param isOpen - Whether modal is open
 * @param onClose - Callback when closing
 * @returns Object with modal focus methods
 * 
 * @example
 * const { modalRef, handleOpen, handleClose } = useModalFocus(isOpen, onClose);
 * 
 * <div ref={modalRef}>
 *   {/* Modal content */}
 * </div>
 */
export function useModalFocus(
  isOpen: boolean,
  onClose: () => void
) {
  const modalRef = useRef<HTMLDivElement>(null);
  const {
    saveFocus,
    trapFocus,
    releaseFocus,
    announce,
  } = useKioskFocus({
    onEscapeKey: onClose,
  });

  const handleOpen = useCallback(() => {
    announce('Modal opened');
    if (modalRef.current) {
      const restoreFocus = trapFocus(modalRef.current);
      return restoreFocus;
    }
  }, [trapFocus, announce]);

  const handleClose = useCallback(() => {
    announce('Modal closed');
    releaseFocus();
    onClose();
  }, [releaseFocus, announce, onClose]);

  useEffect(() => {
    if (isOpen) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [isOpen, handleOpen, handleClose]);

  return {
    modalRef,
    handleOpen,
    handleClose,
  };
}

/**
 * Keyboard event helpers
 */
export const KeyboardKeys = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: ' ',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
} as const;

/**
 * Check if keyboard event is for a specific key
 */
export function isKeyboardEvent(
  event: KeyboardEvent,
  key: (typeof KeyboardKeys)[keyof typeof KeyboardKeys]
): boolean {
  return event.key === key;
}

/**
 * Check if keyboard event is Escape key
 */
export function isEscapeKey(event: KeyboardEvent): boolean {
  return isKeyboardEvent(event, KeyboardKeys.ESCAPE);
}

/**
 * Check if keyboard event is Enter key
 */
export function isEnterKey(event: KeyboardEvent): boolean {
  return isKeyboardEvent(event, KeyboardKeys.ENTER);
}

/**
 * Check if keyboard event is Space key
 */
export function isSpaceKey(event: KeyboardEvent): boolean {
  return isKeyboardEvent(event, KeyboardKeys.SPACE);
}

/**
 * Check if keyboard event is Tab key
 */
export function isTabKey(event: KeyboardEvent): boolean {
  return isKeyboardEvent(event, KeyboardKeys.TAB);
}




