import { BaseResource } from '@/core/BaseResource'
import { Hub } from '@/types'

export class HubsApi extends BaseResource {
  async all(): Promise<Hub[]> {
    return this.get<Hub[]>('/hubs', 'MediaContainer.Hub', [])
  }
}
