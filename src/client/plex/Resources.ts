import { ApiClient } from '@/client/ApiClient'
import { Resource } from '@/types'

export class Resources {
    apiClient: ApiClient

    public constructor (client: ApiClient) {
        this.apiClient = client
    }

    all = (): Promise<Resource[]> => {
        return this.apiClient.get('api/v2/resources')
    }
}
