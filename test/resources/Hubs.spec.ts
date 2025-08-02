import { describe, it, expect, beforeEach } from 'vitest'
import { Hubs } from '@/index'
import { PlexServerContext } from '@/types'

describe('Hubs', () => {
  let hubs: Hubs
  let mockContext: PlexServerContext

  beforeEach(() => {
    mockContext = {
      baseUrl: 'http://localhost:32400',
      headers: {
        'X-Plex-Token': 'test-token',
        Accept: 'application/json',
      },
    }
    hubs = new Hubs(mockContext)
  })

  describe('constructor', () => {
    it('should create a hubs instance', () => {
      expect(hubs).toBeInstanceOf(Hubs)
    })
  })

  describe('all', () => {
    it('should get all hubs', async () => {
      const result = await hubs.all()

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
      expect(result[0]).toHaveProperty('title')
      expect(result[0]).toHaveProperty('type')
      expect(result[0]).toHaveProperty('hubIdentifier')
    })

    it('should return hubs with correct structure', async () => {
      const result = await hubs.all()

      const hub = result[0]
      expect(hub).toHaveProperty('title')
      expect(hub).toHaveProperty('type')
      expect(hub).toHaveProperty('hubIdentifier')
      expect(hub).toHaveProperty('size')
    })
  })
})
