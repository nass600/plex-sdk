import { PlexConnection, PlexResource, PlexClientOptions } from '../types'
import { PlexServer } from './PlexServer'

export class PlexClient {
  private readonly baseUrl = 'https://plex.tv/api/v2'
  private readonly options: Required<PlexClientOptions>

  constructor(
    private token: string,
    options: PlexClientOptions = {}
  ) {
    this.options = {
      clientIdentifier: options.clientIdentifier ?? 'plex-sdk',
      product: options.product ?? 'Plex SDK',
      version: options.version ?? '1.0',
      device: options.device ?? 'Node.js',
      platform: options.platform ?? 'Node.js',
    }
  }

  private get headers() {
    return {
      'X-Plex-Token': this.token,
      'X-Plex-Client-Identifier': this.options.clientIdentifier,
      'X-Plex-Product': this.options.product,
      'X-Plex-Version': this.options.version,
      'X-Plex-Device': this.options.device,
      'X-Plex-Platform': this.options.platform,
      Accept: 'application/json',
    }
  }

  private async fetchResources(): Promise<PlexResource[]> {
    const res = await fetch(`${this.baseUrl}/resources?includeHttps=1`, { headers: this.headers })
    return (await res.json()) as PlexResource[]
  }

  /**
   * Get all resources from the Plex server
   * @returns PlexResource[]
   */
  async getResources(): Promise<PlexResource[]> {
    return await this.fetchResources()
  }

  /**
   * Get a server by name
   * @param resourceName - The name of the server
   * @param connectionsFilter - Optional filter to match a specific connection
   * @returns PlexServer
   */
  async getServer(
    resourceName: string,
    connectionsFilter?: Partial<PlexConnection>
  ): Promise<PlexServer> {
    const resources = await this.fetchResources()

    const server = resources.find(
      (d: PlexResource) => d.name === resourceName && d.provides?.includes('server')
    )
    if (!server) throw new Error(`Server ${resourceName} not found`)

    return new PlexServer(server, connectionsFilter)
  }
}
