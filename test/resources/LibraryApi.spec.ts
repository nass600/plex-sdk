import { describe, it, expect, beforeEach } from 'vitest'
import { LibraryApi, SearchType } from '@/index'
import { PlexServerContext } from '@/types'
import { server } from '../setup'
import { http, HttpResponse } from 'msw'

describe('Library', () => {
  let library: LibraryApi
  let mockContext: PlexServerContext

  beforeEach(() => {
    mockContext = {
      baseUrl: 'http://localhost:32400',
      headers: {
        'X-Plex-Token': 'test-token',
        Accept: 'application/json',
      },
    }
    library = new LibraryApi(mockContext)
  })

  describe('constructor', () => {
    it('should create a library instance', () => {
      expect(library).toBeInstanceOf(LibraryApi)
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

    it('should return empty array when no libraries are found', async () => {
      // Override the default handler for this test
      server.use(
        http.get('*/library/sections', () => {
          return HttpResponse.json({
            MediaContainer: {
              size: 0,
              allowSync: true,
              identifier: 'com.plexapp.plugins.library',
              librarySectionID: 2,
              librarySectionTitle: 'Movies',
              librarySectionUUID: '2f007be0-4b60-4676-8c46-4b754ae90122',
              mediaTagPrefix: '/system/bundle/media/flags/',
              mediaTagVersion: 1579823211,
            },
          })
        })
      )

      const result = await library.all()

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(0)
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

    it('should return empty array when no items are found', async () => {
      const result = await library.allItems(999)

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(0)
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

    it('should return empty array when no search results found', async () => {
      const result = await library.search({
        query: 'nonexistent movie that will never exist',
        searchTypes: [SearchType.MOVIES],
      })

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(0)
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
