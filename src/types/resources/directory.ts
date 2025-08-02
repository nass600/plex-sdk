export enum DirectoryType {
  'MOVIE' = 'movie',
  'SHOW' = 'show',
}

export interface Directory {
  allowSync: boolean
  art: string
  composite: string
  filters: boolean
  refreshing: boolean
  thumb: string
  key: string
  type: DirectoryType
  title: string
  agent: string
  scanner: string
  language: string
  uuid: string
  updatedAt: number
  createdAt: number
  scannedAt: number
  content: boolean
  directory: boolean
  contentChangedAt: number
  hidden: number
  Location: {
    id: number
    path: string
  }[]
}
