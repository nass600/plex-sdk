import { ApiClient } from '@client'
import { HubsMediaContainer } from '@types'

export interface AllHubsResponse {
    MediaContainer: HubsMediaContainer;
}

export interface HubSearchResponse {
    MediaContainer: HubsMediaContainer;
}

export class Hubs {
    apiClient: ApiClient

    public constructor (client: ApiClient) {
        this.apiClient = client
    }

    all (): Promise<AllHubsResponse> {
        return this.apiClient.get('hubs')
    }

    search (query: string): Promise<HubSearchResponse> {
        return this.apiClient.get(`hubs/search?query=${query}`)
    }
}
