import { describe, it, expect, beforeEach } from 'vitest'
import { Library, SearchType } from '@/index'
import { PlexServerContext } from '@/types'

describe('Library', () => {
  let library: Library
  let mockContext: PlexServerContext

  beforeEach(() => {
    mockContext = {
      baseUrl: 'http://localhost:32400',
      headers: {
        'X-Plex-Token': 'test-token',
        Accept: 'application/json',
      },
    }
    library = new Library(mockContext)
  })

  describe('constructor', () => {
    it('should create a library instance', () => {
      expect(library).toBeInstanceOf(Library)
    })
  })

  describe('all', () => {
    it('should get all libraries', async () => {
      const result = await library.all()

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
      expect(result[0]).toHaveProperty('title')
      expect(result[0]).toHaveProperty('type')
      expect(result[0]).toHaveProperty('key')
    })

    it('should return libraries with correct structure', async () => {
      const result = await library.all()

      const lib = result[0]
      expect(lib).toHaveProperty('title')
      expect(lib).toHaveProperty('type')
      expect(lib).toHaveProperty('key')
      expect(lib).toHaveProperty('agent')
    })
  })

  describe('allItems', () => {
    it('should get all items from a library', async () => {
      const result = await library.allItems(1)

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
      expect(result[0]).toHaveProperty('title')
      expect(result[0]).toHaveProperty('type')
      expect(result[0]).toHaveProperty('ratingKey')
    })

    it('should get items with parameters', async () => {
      const result = await library.allItems(1, {
        sort: 'title:asc',
        unwatched: 1,
      })

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
    })
  })

  describe('search', () => {
    it('should search with valid query', async () => {
      const result = await library.search({
        query: 'test movie',
        searchTypes: [SearchType.MOVIES],
      })

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
    })

    it('should search with multiple search types', async () => {
      const result = await library.search({
        query: 'test',
        searchTypes: [SearchType.MOVIES, SearchType.TV],
      })

      expect(Array.isArray(result)).toBe(true)
    })

    it('should throw error for empty query', async () => {
      await expect(
        library.search({
          query: '',
          searchTypes: [SearchType.MOVIES],
        })
      ).rejects.toThrow('Query parameter is mandatory and must be a non-empty string')
    })

    it('should throw error for whitespace-only query', async () => {
      await expect(
        library.search({
          query: '   ',
          searchTypes: [SearchType.MOVIES],
        })
      ).rejects.toThrow('Query parameter is mandatory and must be a non-empty string')
    })

    it('should throw error for non-string query', async () => {
      await expect(
        library.search({
          query: null as unknown as string,
          searchTypes: [SearchType.MOVIES],
        })
      ).rejects.toThrow('Query parameter is mandatory and must be a non-empty string')
    })
  })
})
