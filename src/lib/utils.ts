// Utility functions
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US');
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US');
}

export function isEmpty(value: unknown): boolean {
  return value === null || value === undefined || value === '';
}








