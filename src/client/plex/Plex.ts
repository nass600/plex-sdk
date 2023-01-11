import { Resources } from '@/client/plex/Resources'
import { Users } from '@/client/plex/Users'
import { ApiClient, Headers } from '@/client/ApiClient'
import { PLEX_BASE_URL } from '@/types'

export interface PlexOptions {
    clientIdentifier?: string;
    device?: string;
    product?: string;
    version?: string;
}

export class Plex {
    private apiClient: ApiClient
    private options: PlexOptions
    private baseUrl = PLEX_BASE_URL
    private token?: string
    public users: Users
    public resources: Resources

    public constructor (options: PlexOptions = {}) {
        this.options = options
        this.apiClient = new ApiClient(this.baseUrl, this.options as Headers)
        this.users = new Users(this.apiClient)
        this.resources = new Resources(this.apiClient)
    }

    public getAuthorization (): string | void {
        return this.token
    }

    public setAuthorization (token: string): void {
        this.token = token
        this.apiClient.setAuthorization(token)
    }
}
