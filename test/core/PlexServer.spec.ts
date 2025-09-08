import { describe, it, expect } from 'vitest'
import { PlexServer } from '@/index'
import { PlexClient } from '@/index'
import { PlexResource } from '@/types'

describe('PlexServer', () => {
  let server: PlexServer

  beforeAll(async () => {
    const client = new PlexClient('test-token')
    server = await client.getServer('SUPERSERVER')
  })

  describe('constructor', () => {
    it('should create a server instance with resource data', () => {
      expect(server).toBeDefined()
      expect(server.name).toBe('SUPERSERVER')
      expect(server.hubs).toBeDefined()
      expect(server.library).toBeDefined()
      expect(server.metadata).toBeDefined()
    })
  })

  describe('name getter', () => {
    it('should return the server name', () => {
      expect(server.name).toBe('SUPERSERVER')
    })
  })

  describe('hubs', () => {
    it('should have hubs instance', () => {
      expect(server.hubs).toBeDefined()
      expect(typeof server.hubs.all).toBe('function')
    })

    it('should get all hubs', async () => {
      const hubs = await server.hubs.all()

      expect(Array.isArray(hubs)).toBe(true)
      expect(hubs.length).toBeGreaterThan(0)
      expect(hubs[0]).toHaveProperty('title')
      expect(hubs[0]).toHaveProperty('type')
    })
  })

  describe('library', () => {
    it('should have library instance', () => {
      expect(server.library).toBeDefined()
      expect(typeof server.library.all).toBe('function')
      expect(typeof server.library.allItems).toBe('function')
    })

    it('should get all libraries', async () => {
      const libraries = await server.library.all()

      expect(Array.isArray(libraries)).toBe(true)
      expect(libraries.length).toBeGreaterThan(0)
      expect(libraries[0]).toHaveProperty('title')
      expect(libraries[0]).toHaveProperty('type')
    })

    it('should get all items from a library', async () => {
      const items = await server.library.allItems(1)

      expect(Array.isArray(items)).toBe(true)
      expect(items.length).toBeGreaterThan(0)
      expect(items[0]).toHaveProperty('title')
      expect(items[0]).toHaveProperty('type')
    })
  })

  describe('metadata', () => {
    it('should have metadata instance', () => {
      expect(server.metadata).toBeDefined()
      expect(typeof server.metadata.one).toBe('function')
    })

    it('should get metadata for a specific item', async () => {
      const metadata = await server.metadata.one('123')

      expect(metadata).toBeDefined()
      expect(metadata).toHaveProperty('title')
      expect(metadata).toHaveProperty('type')
    })
  })

  describe('connectionsFilter with regex matching', () => {
    const mockResource: PlexResource = {
      name: 'TestServer',
      product: 'Plex Media Server',
      productVersion: '1.0.0',
      platform: 'Linux',
      platformVersion: '1.0',
      device: 'TestDevice',
      clientIdentifier: 'test-id',
      createdAt: '2023-01-01T00:00:00Z',
      lastSeenAt: '2023-01-01T00:00:00Z',
      provides: 'server',
      ownerId: null,
      sourceTitle: null,
      publicAddress: '192.168.1.100',
      accessToken: 'test-token',
      owned: true,
      home: false,
      synced: false,
      relay: false,
      presence: true,
      httpsRequired: false,
      publicAddressMatches: true,
      dnsRebindingProtection: false,
      natLoopbackSupported: true,
      connections: [
        {
          protocol: 'http',
          address: '192.168.1.100',
          port: '32400',
          uri: 'http://192.168.1.100:32400',
          local: true,
          relay: false,
          IPv6: false,
        },
        {
          protocol: 'https',
          address: 'example.com',
          port: '443',
          uri: 'https://example.com:443',
          local: false,
          relay: false,
          IPv6: false,
        },
        {
          protocol: 'http',
          address: '10.0.0.50',
          port: '8080',
          uri: 'http://10.0.0.50:8080',
          local: true,
          relay: false,
          IPv6: false,
        },
      ],
    }

    describe('exact matching (existing behavior)', () => {
      it('should match exact address', () => {
        const server = new PlexServer(mockResource, { address: '192.168.1.100' })
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })

      it('should match exact protocol', () => {
        const server = new PlexServer(mockResource, { protocol: 'https' })
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })

      it('should match exact port', () => {
        const server = new PlexServer(mockResource, { port: '8080' })
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })

      it('should match exact local property', () => {
        const server = new PlexServer(mockResource, { local: true })
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })
    })

    describe('regex matching (new behavior)', () => {
      it('should match address with regex pattern', () => {
        const server = new PlexServer(mockResource, { address: /192\.168\.1\.\d+/ })
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })

      it('should match address with partial regex', () => {
        const server = new PlexServer(mockResource, { address: /example/ })
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })

      it('should match protocol with regex pattern', () => {
        const server = new PlexServer(mockResource, { protocol: /^https?$/ })
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })

      it('should match port with regex pattern', () => {
        const server = new PlexServer(mockResource, { port: /^324\d+$/ })
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })

      it('should match uri with regex pattern', () => {
        const server = new PlexServer(mockResource, { uri: /https:\/\/example\.com/ })
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })

      it('should match multiple properties with regex', () => {
        const server = new PlexServer(mockResource, {
          address: /192\.168\.1\.\d+/,
          protocol: /^http$/,
        })
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })

      it('should match with case-insensitive regex', () => {
        const server = new PlexServer(mockResource, {
          address: /EXAMPLE/i,
        })
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })

      it('should match with complex regex pattern', () => {
        const server = new PlexServer(mockResource, {
          address: /^(192\.168\.|10\.0\.0\.)\d+$/,
        })
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })
    })

    describe('mixed exact and regex matching', () => {
      it('should match exact and regex properties together', () => {
        const server = new PlexServer(mockResource, {
          local: true,
          address: /192\.168\.1\.\d+/,
        })
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })

      it('should match exact protocol with regex address', () => {
        const server = new PlexServer(mockResource, {
          protocol: 'https',
          address: /example/,
        })
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })
    })

    describe('no match scenarios', () => {
      it('should throw error when no connection matches regex', () => {
        expect(() => {
          new PlexServer(mockResource, { address: /999\.999\.999\.\d+/ })
        }).toThrow('No connections match the provided filter')
      })

      it('should throw error when regex pattern is too restrictive', () => {
        expect(() => {
          new PlexServer(mockResource, {
            address: /192\.168\.1\.\d+/,
            protocol: /^https$/,
          })
        }).toThrow('No connections match the provided filter')
      })

      it('should throw error when no connection matches exact value', () => {
        expect(() => {
          new PlexServer(mockResource, { address: '999.999.999.999' })
        }).toThrow('No connections match the provided filter')
      })
    })

    describe('edge cases', () => {
      it('should handle empty connections array', () => {
        const emptyResource = { ...mockResource, connections: [] }
        expect(() => {
          new PlexServer(emptyResource, { address: /test/ })
        }).toThrow('No connections found')
      })

      it('should handle undefined connectionsFilter', () => {
        const server = new PlexServer(mockResource)
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })

      it('should handle empty connectionsFilter', () => {
        const server = new PlexServer(mockResource, {})
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })

      it('should handle regex with special characters', () => {
        const server = new PlexServer(mockResource, {
          uri: /https:\/\/example\.com:443/,
        })
        expect(server).toBeDefined()
        expect(server.name).toBe('TestServer')
      })
    })
  })
})
