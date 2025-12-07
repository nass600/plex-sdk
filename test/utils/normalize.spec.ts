import { describe, it, expect } from 'vitest'
import { normalizeQuery } from '@/utils/normalize'

describe('normalizeQuery', () => {
  it('should remove triple dots', () => {
    expect(normalizeQuery('test...query')).toBe('testquery')
    expect(normalizeQuery('...test')).toBe('test')
    expect(normalizeQuery('test...')).toBe('test')
    expect(normalizeQuery('test...query...more')).toBe('testquerymore')
  })

  it('should remove colons', () => {
    expect(normalizeQuery('test:query')).toBe('testquery')
    expect(normalizeQuery(':test')).toBe('test')
    expect(normalizeQuery('test:')).toBe('test')
    expect(normalizeQuery('test:query:more')).toBe('testquerymore')
  })

  it('should remove round parentheses', () => {
    expect(normalizeQuery('test(query)')).toBe('testquery')
    expect(normalizeQuery('(test)query')).toBe('testquery')
    expect(normalizeQuery('test(query)more')).toBe('testquerymore')
  })

  it('should remove square brackets', () => {
    expect(normalizeQuery('test[query]')).toBe('testquery')
    expect(normalizeQuery('[test]query')).toBe('testquery')
    expect(normalizeQuery('test[query]more')).toBe('testquerymore')
  })

  it('should remove curly braces', () => {
    expect(normalizeQuery('test{query}')).toBe('testquery')
    expect(normalizeQuery('{test}query')).toBe('testquery')
    expect(normalizeQuery('test{query}more')).toBe('testquerymore')
  })

  it('should remove angle brackets', () => {
    expect(normalizeQuery('test<query>')).toBe('testquery')
    expect(normalizeQuery('<test>query')).toBe('testquery')
    expect(normalizeQuery('test<query>more')).toBe('testquerymore')
  })

  it('should remove all types of parentheses', () => {
    expect(normalizeQuery('test(query)[more]{items}<tags>')).toBe('testquerymoreitemstags')
  })

  it('should trim whitespace', () => {
    expect(normalizeQuery('  test  ')).toBe('test')
    expect(normalizeQuery('\ttest\n')).toBe('test')
    expect(normalizeQuery('  test query  ')).toBe('test query')
  })

  it('should apply normalize-text normalization', () => {
    // normalize-text handles diacritics, special characters, etc.
    expect(normalizeQuery('Café')).toBe('cafe')
    expect(normalizeQuery('Müller')).toBe('muller')
  })

  it('should handle complex queries with multiple special characters', () => {
    expect(normalizeQuery('Test: Movie (2023)...[Extended]')).toBe('test movie 2023extended')
    expect(normalizeQuery('  Show: Title (Season 1)...  ')).toBe('show title season 1')
    expect(normalizeQuery("Movie: The Title [Director's Cut] (2023)")).toBe(
      "movie the title director's cut 2023"
    )
  })

  it('should handle empty string after normalization', () => {
    expect(normalizeQuery('...')).toBe('')
    expect(normalizeQuery('::')).toBe('')
    expect(normalizeQuery('()[]{}<>')).toBe('')
    expect(normalizeQuery('   ...   ')).toBe('')
  })

  it('should handle queries with only special characters', () => {
    expect(normalizeQuery('...::()[]{}<>')).toBe('')
    expect(normalizeQuery(':()[]')).toBe('')
  })

  it('should preserve normal text', () => {
    expect(normalizeQuery('simple query')).toBe('simple query')
    expect(normalizeQuery('normal text')).toBe('normal text')
  })

  it('should handle mixed case and special characters', () => {
    expect(normalizeQuery('The Matrix: Reloaded (2003)...')).toBe('the matrix reloaded 2003')
    expect(normalizeQuery('Breaking Bad [Season 1]')).toBe('breaking bad season 1')
  })
})
