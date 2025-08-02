import { BaseResource } from '@/core/BaseResource'
import { Hub } from '@/types'

export class Hubs extends BaseResource {
  async all(): Promise<Hub[]> {
    return this.get<Hub[]>('/hubs', 'MediaContainer.Hub')
  }
}
