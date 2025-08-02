import { BaseResource } from '@/core/BaseResource'
import { Metadata as MetadataType } from '@/types'

export class Metadata extends BaseResource {
  async one(id: string): Promise<MetadataType> {
    return this.get<MetadataType>(`/library/metadata/${id}`, 'MediaContainer.Metadata')
  }
}
