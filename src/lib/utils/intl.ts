/**
 * Internationalization formatting utilities
 * Provides locale-aware formatting for currency, dates, and numbers
 */

type Locale = 'en' | 'bg';

/**
 * Format currency amount in BGN
 * @param amount - Amount to format
 * @param locale - User locale
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number | string, locale: Locale = 'bg'): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  return new Intl.NumberFormat(locale === 'bg' ? 'bg-BG' : 'en-US', {
    style: 'currency',
    currency: 'BGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numAmount);
}

/**
 * Format date in locale-aware format
 * @param date - Date to format
 * @param locale - User locale
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  locale: Locale = 'bg',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale === 'bg' ? 'bg-BG' : 'en-US', options).format(dateObj);
}

/**
 * Format date with time
 * @param date - Date to format
 * @param locale - User locale
 * @returns Formatted date and time string
 */
export function formatDateTime(date: Date | string, locale: Locale = 'bg'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale === 'bg' ? 'bg-BG' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(dateObj);
}

/**
 * Format date in short format (e.g., 12/31/2024)
 * @param date - Date to format
 * @param locale - User locale
 * @returns Formatted short date string
 */
export function formatDateShort(date: Date | string, locale: Locale = 'bg'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale === 'bg' ? 'bg-BG' : 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateObj);
}

/**
 * Format time only
 * @param date - Date to format
 * @param locale - User locale
 * @returns Formatted time string
 */
export function formatTime(date: Date | string, locale: Locale = 'bg'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale === 'bg' ? 'bg-BG' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(dateObj);
}

/**
 * Format number with locale-aware thousands separator
 * @param value - Number to format
 * @param locale - User locale
 * @returns Formatted number string
 */
export function formatNumber(value: number, locale: Locale = 'bg'): string {
  return new Intl.NumberFormat(locale === 'bg' ? 'bg-BG' : 'en-US').format(value);
}

/**
 * Format relative time (e.g., "2 hours ago")
 * @param date - Date to format
 * @param locale - User locale
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date | string, locale: Locale = 'bg'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale === 'bg' ? 'bg-BG' : 'en-US', {
    numeric: 'auto',
  });

  // Seconds
  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  }

  // Minutes
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, 'minute');
  }

  // Hours
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return rtf.format(-diffInHours, 'hour');
  }

  // Days
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return rtf.format(-diffInDays, 'day');
  }

  // Months
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return rtf.format(-diffInMonths, 'month');
  }

  // Years
  const diffInYears = Math.floor(diffInMonths / 12);
  return rtf.format(-diffInYears, 'year');
}
