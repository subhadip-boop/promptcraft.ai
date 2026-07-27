// Utility functions for the application

/**
 * Format date to readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * Get relative time (e.g., "2 days ago")
 */
export function getRelativeTime(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + ' years ago'

  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + ' months ago'

  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + ' days ago'

  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + ' hours ago'

  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + ' minutes ago'

  return 'just now'
}

/**
 * Truncate text to specific length
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy:', error)
    return false
  }
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Check if subscription is active
 */
export function isSubscriptionActive(
  subscription: string,
  expiryDate?: Date
): boolean {
  if (subscription === 'premium' && expiryDate) {
    return expiryDate > new Date()
  }
  return subscription === 'trial' || subscription === 'premium'
}

/**
 * Calculate days remaining in trial
 */
export function getDaysRemaining(expiryDate: Date): number {
  const now = new Date()
  const diff = expiryDate.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/**
 * Format token count for display
 */
export function formatTokenCount(tokens: number): string {
  if (tokens > 1000000) return (tokens / 1000000).toFixed(1) + 'M'
  if (tokens > 1000) return (tokens / 1000).toFixed(1) + 'K'
  return tokens.toString()
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
