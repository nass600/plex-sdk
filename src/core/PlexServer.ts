import { PlexConnection, PlexConnectionFilter, PlexResource, PlexServerContext } from '../types'
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
    connectionsFilter?: PlexConnectionFilter
  ) {
    if (resource.connections.length === 0) throw new Error('No connections found')

    let connection: PlexConnection | undefined = resource.connections[0]

    if (connectionsFilter) {
      connection = this.filterConnection(resource.connections, connectionsFilter)
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

  /**
   * Filters connections based on the provided filter criteria
   * Supports both exact matching and regex pattern matching
   */
  private filterConnection(
    connections: PlexConnection[],
    filter: PlexConnectionFilter
  ): PlexConnection | undefined {
    return connections.find((connection: PlexConnection) =>
      Object.keys(filter).every(key => {
        const connectionValue = connection[key as keyof PlexConnection]
        const filterValue = filter[key as keyof PlexConnectionFilter]

        // Check if filter value is a RegExp
        if (filterValue instanceof RegExp) {
          return filterValue.test(String(connectionValue))
        }

        // Exact match for non-RegExp values
        return connectionValue === filterValue
      })
    )
  }
}
