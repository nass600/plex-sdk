import { Media } from './media'

export enum MetadataType {
  'MOVIE' = 'movie',
  'SHOW' = 'show',
  'SEASON' = 'season',
  'EPISODE' = 'episode',
  'ALBUM' = 'album',
  'PHOTO' = 'photo',
  'CLIP' = 'clip',
  'PLAYLIST' = 'playlist',
}

export enum ImageType {
  'COVER_POSTER' = 'coverPoster',
  'BACKGROUND' = 'background',
  'CLEAR_LOGO' = 'clearLogo',
}

export interface Image {
  alt: string
  type: ImageType
  url: string
}

export interface Guid {
  id: string
}

export interface Genre {
  id?: number
  filter?: string
  tag: string
}

export type Country = Genre

export interface Collection extends Genre {
  guid?: string
}

export interface Director {
  id?: number
  filter?: string
  tag: string
  tagKey?: string
  thumb?: string
}

export type Writer = Director

export interface Role extends Director {
  role?: string
}

export type Producer = Director

export interface Rating {
  image: string
  value: number
  type: string
}

export type Label = Genre

export interface Field {
  locked: boolean
  name: string
}

export interface Metadata {
  librarySectionTitle: string
  ratingKey: string
  key: string
  guid: string
  studio: string
  type: string
  title: string
  originalTitle: string
  contentRating: string
  summary: string
  rating: number
  audienceRating: number
  year: number
  tagline: string
  thumb: string
  art: string
  duration: number
  originallyAvailableAt: string
  addedAt: number
  updatedAt: number
  audienceRatingImage: string
  primaryExtraKey: string
  ratingImage: string
  Image: Image[]
  UltraBlurColors: {
    topLeft: string
    topRight: string
    bottomRight: string
    bottomLeft: string
  }
  Guid?: Guid[]
  Genre: Genre[]
  Country: Country[]
  Collection: Collection[]
  Director: Director[]
  Writer: Writer[]
  Role: Role[]
  Producer?: Producer[]
  Rating?: Rating[]
  Label?: Label[]
  Field?: Field[]
  Media: Media[]
  Location?: {
    path: string
  }[]
}

export interface SearchResult {
  score: number
  Metadata: Metadata
}
