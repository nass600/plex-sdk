import { MetadataType } from './metadata'

export interface Hub {
  hubKey: string
  key: string
  title: string
  type: MetadataType
  hubIdentifier: string
  context: string
  size: number
  more: boolean
  style: string
  promoted: boolean
}
