import { ApiClient, MetadataMediaContainer, SectionsMediaContainer } from '../../..'

export interface AllSectionsResponse {
    MediaContainer: SectionsMediaContainer;
}

export interface AllSectionItemsResponse {
    MediaContainer: MetadataMediaContainer;
}

export class Sections {
    private apiClient: ApiClient

    public constructor (client: ApiClient) {
        this.apiClient = client
    }

    all (): Promise<AllSectionsResponse> {
        return this.apiClient.get('library/sections')
    }

    allSectionItems (sectionId: number): Promise<AllSectionItemsResponse> {
        return this.apiClient.get(`library/sections/${sectionId}/all`)
    }
}
