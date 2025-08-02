import { describe, it, expect, beforeEach } from 'vitest'
import { Metadata } from '@/index'
import { PlexServerContext } from '@/types'

describe('Metadata', () => {
  let metadata: Metadata
  let mockContext: PlexServerContext

  beforeEach(() => {
    mockContext = {
      baseUrl: 'http://localhost:32400',
      headers: {
        'X-Plex-Token': 'test-token',
        Accept: 'application/json',
      },
    }
    metadata = new Metadata(mockContext)
  })

  describe('constructor', () => {
    it('should create a metadata instance', () => {
      expect(metadata).toBeInstanceOf(Metadata)
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
  })
})
