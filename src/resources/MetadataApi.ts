import { BaseResource } from '@/core/BaseResource'
import { Metadata } from '@/types'

export class MetadataApi extends BaseResource {
  async one(id: string): Promise<Metadata | undefined> {
    return this.get<Metadata | undefined>(
      `/library/metadata/${id}`,
      'MediaContainer.Metadata[0]',
      undefined
    )
  }

  async children(id: string): Promise<Metadata[] | undefined> {
    return this.get<Metadata[] | undefined>(
      `/library/metadata/${id}/children`,
      'MediaContainer.Metadata',
      []
    )
  }

  async leaves(id: string): Promise<Metadata[] | undefined> {
    return this.get<Metadata[] | undefined>(
      `/library/metadata/${id}/allLeaves`,
      'MediaContainer.Metadata',
      []
    )
  }
}
