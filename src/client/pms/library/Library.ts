import { ApiClient } from '@client'
import { MetadataMediaContainer, SectionsMediaContainer } from '@types'

export interface AllSectionsResponse {
    MediaContainer: SectionsMediaContainer;
}

export interface AllSectionItemsResponse {
    MediaContainer: MetadataMediaContainer;
}

export interface GetMetadataResponse {
    MediaContainer: MetadataMediaContainer;
}

export class Library {
    apiClient: ApiClient

    public constructor (client: ApiClient) {
        this.apiClient = client
    }

    allSections (): Promise<AllSectionsResponse> {
        return this.apiClient.get('library/sections')
    }

    allSectionItems (sectionId: number): Promise<AllSectionItemsResponse> {
        return this.apiClient.get(`library/sections/${sectionId}/all`)
    }

    getMetadata (ids: string | string[]): Promise<GetMetadataResponse> {
        if (!Array.isArray(ids)) {
            ids = [ids]
        }

        return this.apiClient.get(`library/metadata/${ids.join(',')}`)
    }
}
