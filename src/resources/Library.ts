import { BaseResource } from '@/core/BaseResource'
import normalizeText from 'normalize-text'
import { Directory, Metadata, SearchResult } from '@/types'

export enum SearchType {
  'MOVIES' = 'movies',
  'TV' = 'tv',
  'PEOPLE' = 'people',
}

export interface LibrarySearchRequestParams {
  query: string
  limit?: number
  searchTypes?: SearchType[]
  includeCollections?: boolean
  includeExternalMedia?: boolean
}

export enum SortDirection {
  'ASC' = 'asc',
  'DESC' = 'desc',
}

export enum SortType {
  'TITLE' = 'title',
  'YEAR' = 'year',
  'RELEASE_DATE' = 'originallyAvailableAt',
  'CRITIC_RATING' = 'rating',
  'AUDIENCE_RATING' = 'audienceRating',
  'USER_RATING' = 'userRating',
  'CONTENT_RATING' = 'contentRating',
  'DURATION' = 'duration',
  'PROGRESS' = 'viewOffset',
  'PLAYS' = 'viewCount',
  'DATE_ADDED' = 'addedAt',
  'DATE_VIEWED' = 'lastViewedAt',
  'RESOLUTION' = 'mediaHeight',
  'BITRATE' = 'mediaBitrate',
  'RANDOM' = 'random',
}

export type Sort = `${SortType}:${SortDirection}`

export interface LibraryAllItemsRequestParams {
  sort?: Sort
  unwatched?: number
  viewOffset?: number
  includeExternalMedia?: number
  includeMeta?: number
  includeGuids?: number
  type?: number
  includeCollections?: number
  includeAdvanced?: number
}

export class Library extends BaseResource {
  async all(): Promise<Directory[]> {
    return this.get<Directory[]>('/library/sections', 'MediaContainer.Directory')
  }

  async search(params: LibrarySearchRequestParams): Promise<SearchResult[]> {
    // Enforce mandatory query parameter
    if (!params.query || typeof params.query !== 'string' || params.query.trim() === '') {
      throw new Error('Query parameter is mandatory and must be a non-empty string')
    }

    // Normalize the query text
    const normalizedParams = {
      ...params,
      query: normalizeText(params.query.trim()),
    }

    return this.get<SearchResult[], LibrarySearchRequestParams>(
      '/library/search',
      'MediaContainer.SearchResult',
      normalizedParams
    )
  }

  async allItems(id: number, params?: LibraryAllItemsRequestParams): Promise<Metadata[]> {
    return this.get<Metadata[], LibraryAllItemsRequestParams>(
      `/library/sections/${id}/all`,
      'MediaContainer.Metadata',
      params
    )
  }
}
