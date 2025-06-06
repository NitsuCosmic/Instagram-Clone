import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

/**
 * Formats a date string to Instagram-style time format (e.g., "5m", "2h", "3d")
 * @param dateString - ISO date string (e.g., "2025-05-31T03:05:14Z")
 * @returns Formatted time string (e.g., "5m", "2h", "3d", "2w", "1mo", "1y")
 */
export const formatInstagramDate = (dateString: string): string => {
  const now = dayjs();
  const postDate = dayjs(dateString);
  
  const diffInMinutes = now.diff(postDate, 'minute');
  const diffInHours = now.diff(postDate, 'hour');
  const diffInDays = now.diff(postDate, 'day');
  const diffInWeeks = now.diff(postDate, 'week');
  const diffInMonths = now.diff(postDate, 'month');
  const diffInYears = now.diff(postDate, 'year');

  if (diffInMinutes < 1) return 'now';
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  if (diffInHours < 24) return `${diffInHours}h`;
  if (diffInDays < 7) return `${diffInDays}d`;
  if (diffInWeeks < 4) return `${diffInWeeks}w`;
  if (diffInMonths < 12) return `${diffInMonths}mo`;
  return `${diffInYears}y`;
};

/**
 * Alternative version that returns a more detailed format for older posts
 * @param dateString - ISO date string
 * @returns Formatted time string or actual date for very old posts
 */
export const formatInstagramDateDetailed = (dateString: string): string => {
  const now = dayjs();
  const postDate = dayjs(dateString);
  const diffInDays = now.diff(postDate, 'day');
  
  // For posts older than 1 year, show actual date
  if (diffInDays > 365) {
    return postDate.format('MMM D, YYYY');
  }
  
  return formatInstagramDate(dateString);
};

/**
 * Get full date for tooltips or detailed views
 * @param dateString - ISO date string
 * @returns Formatted full date (e.g., "May 31, 2025 at 3:05 AM")
 */
export const getFullDate = (dateString: string): string => {
  return dayjs(dateString).format('MMMM D, YYYY [at] h:mm A');
};

/**
 * Check if a date is today
 * @param dateString - ISO date string
 * @returns boolean
 */
export const isToday = (dateString: string): boolean => {
  return dayjs(dateString).isSame(dayjs(), 'day');
};

/**
 * Check if a date is this week
 * @param dateString - ISO date string
 * @returns boolean
 */
export const isThisWeek = (dateString: string): boolean => {
  return dayjs(dateString).isSame(dayjs(), 'week');
};