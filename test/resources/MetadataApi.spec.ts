import { describe, it, expect, beforeEach } from 'vitest'
import { MetadataApi, PlexApiError } from '@/index'
import { PlexServerContext } from '@/types'
import { server } from '../setup'
import { http, HttpResponse } from 'msw'

describe('Metadata', () => {
  let metadata: MetadataApi
  let mockContext: PlexServerContext

  beforeEach(() => {
    mockContext = {
      baseUrl: 'http://localhost:32400',
      headers: {
        'X-Plex-Token': 'test-token',
        Accept: 'application/json',
      },
    }
    metadata = new MetadataApi(mockContext)
  })

  describe('constructor', () => {
    it('should create a metadata instance', () => {
      expect(metadata).toBeInstanceOf(MetadataApi)
    })
  })

  describe('one', () => {
    it('should get metadata for a specific item', async () => {
      const result = await metadata.one('123')

      expect(result).toBeDefined()
      expect(result).toHaveProperty('title')
      expect(result).toHaveProperty('type')
      expect(result).toHaveProperty('ratingKey')
      expect(result).toHaveProperty('guid')
    })

    it('should return metadata with correct structure', async () => {
      const result = await metadata.one('123')

      expect(result).toHaveProperty('title')
      expect(result).toHaveProperty('type')
      expect(result).toHaveProperty('ratingKey')
      expect(result).toHaveProperty('guid')
      expect(result).toHaveProperty('summary')
      expect(result).toHaveProperty('year')
    })

    it('should handle different item types', async () => {
      const result = await metadata.one('456')

      expect(result).toBeDefined()
      expect(result).toHaveProperty('title')
      expect(result).toHaveProperty('type')
    })

    it('should return undefined when Plex returns 200 with empty MediaContainer', async () => {
      const result = await metadata.one('999999')

      expect(result).toBeUndefined()
    })

    it('should throw PlexApiError with status 404 on Not Found (HTML response body)', async () => {
      server.use(
        http.get('*/library/metadata/:id', () => {
          return new HttpResponse(
            '<html><head><title>Not Found</title></head><body><h1>404 Not Found</h1></body></html>',
            { status: 404, statusText: 'Not Found', headers: { 'Content-Type': 'text/html' } }
          )
        })
      )

      await expect(metadata.one('123')).rejects.toSatisfy(
        e => e instanceof PlexApiError && e.status === 404
      )
    })

    it('should throw PlexApiError with status 429 on Too Many Requests', async () => {
      server.use(
        http.get('*/library/metadata/:id', () => {
          return new HttpResponse(null, { status: 429, statusText: 'Too Many Requests' })
        })
      )

      await expect(metadata.one('123')).rejects.toSatisfy(
        e => e instanceof PlexApiError && e.status === 429
      )
    })

    it('should throw PlexApiError with status 500 on Internal Server Error', async () => {
      server.use(
        http.get('*/library/metadata/:id', () => {
          return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' })
        })
      )

      await expect(metadata.one('123')).rejects.toSatisfy(
        e => e instanceof PlexApiError && e.status === 500
      )
    })

    it('should throw PlexApiError with status 503 on Service Unavailable', async () => {
      server.use(
        http.get('*/library/metadata/:id', () => {
          return new HttpResponse(null, { status: 503, statusText: 'Service Unavailable' })
        })
      )

      await expect(metadata.one('123')).rejects.toSatisfy(
        e => e instanceof PlexApiError && e.status === 503
      )
    })
  })

  describe('children', () => {
    it('should get children metadata for a specific item', async () => {
      const result = await metadata.children('123')

      expect(Array.isArray(result)).toBe(true)
      expect(result?.length).toBeGreaterThan(0)
      expect(result?.[0]).toHaveProperty('title')
      expect(result?.[0]).toHaveProperty('type')
      expect(result?.[0]).toHaveProperty('ratingKey')
      expect(result?.[0]).toHaveProperty('guid')
    })

    it('should return children with correct structure', async () => {
      const result = await metadata.children('123')

      const first = result?.[0]
      expect(first).toHaveProperty('title')
      expect(first).toHaveProperty('type')
      expect(first).toHaveProperty('ratingKey')
      expect(first).toHaveProperty('key')
    })

    it('should return empty array when no children are found', async () => {
      const result = await metadata.children('999')

      expect(Array.isArray(result)).toBe(true)
      expect(result).toHaveLength(0)
    })

    it('should throw PlexApiError with status 404 on Not Found', async () => {
      server.use(
        http.get('*/library/metadata/:id/children', () => {
          return new HttpResponse(null, { status: 404, statusText: 'Not Found' })
        })
      )

      await expect(metadata.children('123')).rejects.toSatisfy(
        e => e instanceof PlexApiError && e.status === 404
      )
    })
  })

  describe('leaves', () => {
    it('should get leaves (allLeaves) for a specific item', async () => {
      const result = await metadata.leaves('123')

      expect(Array.isArray(result)).toBe(true)
      expect(result?.length).toBeGreaterThan(0)
      expect(result?.[0]).toHaveProperty('title')
      expect(result?.[0]).toHaveProperty('type')
      expect(result?.[0]).toHaveProperty('ratingKey')
    })

    it('should return leaves with correct structure', async () => {
      const result = await metadata.leaves('123')

      const first = result?.[0]
      expect(first).toHaveProperty('title')
      expect(first).toHaveProperty('type')
      expect(first).toHaveProperty('ratingKey')
      expect(first).toHaveProperty('key')
    })

    it('should return empty array when no leaves are found', async () => {
      const result = await metadata.leaves('999')

      expect(Array.isArray(result)).toBe(true)
      expect(result).toHaveLength(0)
    })

    it('should throw PlexApiError with status 404 on Not Found', async () => {
      server.use(
        http.get('*/library/metadata/:id/allLeaves', () => {
          return new HttpResponse(null, { status: 404, statusText: 'Not Found' })
        })
      )

      await expect(metadata.leaves('123')).rejects.toSatisfy(
        e => e instanceof PlexApiError && e.status === 404
      )
    })
  })
})
