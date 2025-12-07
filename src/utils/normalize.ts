import normalizeText from 'normalize-text'

/**
 * Normalizes a query string by:
 * - Removing triple dots (...)
 * - Removing colons (:)
 * - Removing any kind of parentheses (round, square, curly, angle)
 * - Applying normalize-text library
 * - Trimming whitespace
 *
 * @param query - The input query string to normalize
 * @returns The normalized query string
 */
export function normalizeQuery(query: string): string {
  return normalizeText(
    query
      .replace(/\.\.\./g, '') // Remove triple dots
      .replace(/:/g, '') // Remove colons
      .replace(/[()[\]{}<>]/g, '') // Remove all types of parentheses
      .trim()
  )
}
