import { PlexConnection, PlexResource, PlexServerContext } from '../types'
import { HubsApi } from '@/resources/HubsApi'
import { LibraryApi } from '@/resources/LibraryApi'
import { MetadataApi } from '@/resources/MetadataApi'

export class PlexServer {
  private ctx: PlexServerContext
  readonly hubs: HubsApi
  readonly library: LibraryApi
  readonly metadata: MetadataApi

  constructor(
    private resource: PlexResource,
    connectionsFilter?: Partial<PlexConnection>
  ) {
    if (resource.connections.length === 0) throw new Error('No connections found')

    let connection: PlexConnection | undefined = resource.connections[0]

    if (connectionsFilter) {
      connection = resource.connections.find((c: PlexConnection) =>
        Object.keys(connectionsFilter).every(
          key => c[key as keyof PlexConnection] === connectionsFilter[key as keyof PlexConnection]
        )
      )
    }
    if (!connection) throw new Error('No connections match the provided filter')

    if (!connection.uri) throw new Error('No valid connection URI found')

    this.ctx = {
      baseUrl: connection.uri,
      headers: {
        ...(resource.accessToken && { 'X-Plex-Token': resource.accessToken }),
        Accept: 'application/json',
      },
    }

    this.hubs = new HubsApi(this.ctx)
    this.library = new LibraryApi(this.ctx)
    this.metadata = new MetadataApi(this.ctx)
  }

  get name() {
    return this.resource.name
  }
}
