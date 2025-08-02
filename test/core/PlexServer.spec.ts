import { describe, it, expect } from 'vitest'
import { PlexServer } from '@/index'
import { PlexClient } from '@/index'

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
})
