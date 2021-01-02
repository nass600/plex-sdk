import { PMS, TV, ApiClient, PlexHeaders } from './client'

export interface PlexOptions {
    clientIdentifier?: string;
    device?: string;
    product?: string;
    version?: string;
}

export class Plex {
    private apiClient: ApiClient
    private options: PlexOptions
    public tv: TV
    public pms: PMS
    private baseUrl = 'https://plex.tv'

    public constructor (options: PlexOptions = {}) {
        this.options = options
        this.apiClient = new ApiClient(this.baseUrl, this.options as PlexHeaders)
        this.pms = new PMS(this.apiClient)
        this.tv = new TV(this.apiClient)
    }

    public setAuthorization (token: string): void {
        this.apiClient.setAuthorization(token)
    }

    public setBaseUrl (url: string): void {
        this.baseUrl = url
        this.apiClient = new ApiClient(this.baseUrl, this.options as PlexHeaders)
        this.pms = new PMS(this.apiClient)
        this.tv = new TV(this.apiClient)
    }
}
