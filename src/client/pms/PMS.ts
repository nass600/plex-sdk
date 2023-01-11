import { Hubs } from '@/client/pms/Hubs'
import { Library } from '@/client/pms/Library'
import { ApiClient } from '@/client/ApiClient'

export class PMS {
    private apiClient: ApiClient
    private baseUrl: string
    private token?: string
    public library: Library
    public hubs: Hubs

    public constructor (baseUrl: string, token: string | null = null) {
        this.baseUrl = baseUrl
        this.apiClient = new ApiClient(this.baseUrl, {})
        this.library = new Library(this.apiClient)
        this.hubs = new Hubs(this.apiClient)

        if (token) {
            this.token = token
            this.apiClient.setAuthorization(token)
        }
    }

    public getAuthorization (): string | void {
        return this.token
    }

    public setAuthorization (token: string): void {
        this.token = token
        this.apiClient.setAuthorization(token)
    }
}
