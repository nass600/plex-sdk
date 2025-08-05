import { BaseResource } from '@/core/BaseResource'
import { Metadata } from '@/types'

export class MetadataApi extends BaseResource {
  /**
   * Get metadata for a specific item.
   * Uses lodash.get which can handle both array (MediaContainer.Metadata[0])
   * and object (MediaContainer.Metadata.0) access patterns automatically.
   * Returns undefined if no metadata is found.
   */
  async one(id: string): Promise<Metadata | undefined> {
    return this.get<Metadata | undefined>(
      `/library/metadata/${id}`,
      'MediaContainer.Metadata[0]',
      undefined
    )
  }
}
