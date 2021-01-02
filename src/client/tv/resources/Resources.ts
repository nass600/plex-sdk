import { ApiClient } from '../..'

export interface Connection {
    protocol: string;
    address: string;
    port: number;
    uri: string;
    local: boolean;
    relay: boolean;
    IPv6: boolean;
}

export interface Resource {
    name: string;
    clientIdentifier: string;
    accessToken: string | null;
    connections: Connection[];
}

export type ResourcesApiRespone = Resource[]

export class Resources {
    private apiClient: ApiClient

    public constructor (client: ApiClient) {
        this.apiClient = client
    }

    all = (): Promise<ResourcesApiRespone> => {
        return this.apiClient.get('api/v2/resources')
    }
}
