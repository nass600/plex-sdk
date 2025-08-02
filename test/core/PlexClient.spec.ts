import { describe, it, expect } from 'vitest'
import { PlexClient } from '@/index'

describe('PlexClient', () => {
  const token = 'test-token'

  describe('constructor', () => {
    it('should create a client with default options', () => {
      const client = new PlexClient(token)

      expect(client).toBeInstanceOf(PlexClient)
    })

    it('should create a client with custom options', () => {
      const customOptions = {
        clientIdentifier: 'custom-client',
        product: 'Custom Product',
        version: '2.0',
        device: 'Custom Device',
        platform: 'Custom Platform',
      }

      const client = new PlexClient(token, customOptions)

      expect(client).toBeInstanceOf(PlexClient)
    })
  })

  describe('getResources', () => {
    it('should get resources successfully', async () => {
      const client = new PlexClient(token)
      const resources = await client.getResources()

      expect(Array.isArray(resources)).toBe(true)
      expect(resources.length).toBeGreaterThan(0)
      expect(resources[0]).toHaveProperty('name')
      expect(resources[0]).toHaveProperty('product')
      expect(resources[0]).toHaveProperty('connections')
    })
  })

  describe('getServer', () => {
    it('should get server by name successfully', async () => {
      const client = new PlexClient(token)
      const server = await client.getServer('SUPERSERVER')

      expect(server).toBeDefined()
      expect(server.name).toBe('SUPERSERVER')
      expect(server.hubs).toBeDefined()
      expect(server.library).toBeDefined()
      expect(server.metadata).toBeDefined()
    })

    it('should get server with connection filter', async () => {
      const client = new PlexClient(token)
      const server = await client.getServer('SUPERSERVER', {
        protocol: 'https',
        local: false,
      })

      expect(server).toBeDefined()
      expect(server.name).toBe('SUPERSERVER')
    })

    it('should throw error for non-existent server', async () => {
      const client = new PlexClient(token)

      await expect(client.getServer('NON_EXISTENT')).rejects.toThrow(
        'Server NON_EXISTENT not found'
      )
    })
  })
})
