import { ApiClient } from '@/client/ApiClient'
import { HubsMediaContainer } from '@/types'

export interface AllHubsResponse {
    MediaContainer: HubsMediaContainer;
}

export interface HubSearchResponse {
    MediaContainer: HubsMediaContainer;
}

export interface HubSearchParams {
    [key: string]: string | number | undefined;
    query: string;
    limit?: number;
    includeCollections?: number;
    includeExternalMedia?: number;
    includeGuids?: number;
}

export class Hubs {
    apiClient: ApiClient

    public constructor (client: ApiClient) {
        this.apiClient = client
    }

    all (): Promise<AllHubsResponse> {
        return this.apiClient.get('hubs')
    }

    search (params: HubSearchParams): Promise<HubSearchResponse> {
        let url = 'hubs/search'
        if (params) {
            url = `${url}?${new URLSearchParams(params as Record<string, string>).toString()}`
        }

        return this.apiClient.get(url)
    }
}
