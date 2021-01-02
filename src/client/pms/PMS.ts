import { ApiClient } from '..'
import { Sections } from './sections'
import { Metadata } from './metadata'
import { Hubs } from './hubs'

export class PMS {
    public sections: Sections
    public metadata: Metadata
    public hubs: Hubs

    constructor (public apiClient: ApiClient) {
        this.sections = new Sections(apiClient)
        this.metadata = new Metadata(apiClient)
        this.hubs = new Hubs(apiClient)
    }
}
