import { ApiClient, MetadataMediaContainer } from '../../..'

export interface GetMetadataResponse {
    MediaContainer: MetadataMediaContainer;
}

export class Metadata {
    private apiClient: ApiClient

    public constructor (client: ApiClient) {
        this.apiClient = client
    }

    get (ids: string | string[]): Promise<GetMetadataResponse> {
        if (!Array.isArray(ids)) {
            ids = [ids]
        }

        return this.apiClient.get(`library/metadata/${ids.join(',')}`)
    }
}
