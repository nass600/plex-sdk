import { describe, it, expect, beforeEach } from 'vitest'
import { HubsApi } from '@/index'
import { PlexServerContext } from '@/types'
import { server } from '../setup'
import { http, HttpResponse } from 'msw'

describe('Hubs', () => {
  let hubs: HubsApi
  let mockContext: PlexServerContext

  beforeEach(() => {
    mockContext = {
      baseUrl: 'http://localhost:32400',
      headers: {
        'X-Plex-Token': 'test-token',
        Accept: 'application/json',
      },
    }
    hubs = new HubsApi(mockContext)
  })

  describe('constructor', () => {
    it('should create a hubs instance', () => {
      expect(hubs).toBeInstanceOf(HubsApi)
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

    it('should return empty array when no hubs are found', async () => {
      // Override the default handler for this test
      server.use(
        http.get('*/hubs', () => {
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

      const result = await hubs.all()

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(0)
    })
  })
})
