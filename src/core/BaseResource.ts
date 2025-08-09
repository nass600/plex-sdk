import { PlexServerContext } from '@/types'
import queryString from 'query-string'
import { get } from 'lodash-es'

export abstract class BaseResource {
  constructor(protected ctx: PlexServerContext) {}

  protected async get<T, P = Record<string, unknown>>(
    path: string,
    responsePath: string,
    defaultValue?: T,
    queryParams?: P
  ): Promise<T> {
    const str = queryParams
      ? queryString.stringify(queryParams, {
          arrayFormat: 'comma',
          skipNull: true,
          skipEmptyString: true,
        })
      : ''
    const url = `${this.ctx.baseUrl}${path}${str ? `?${str}` : ''}`
    const res = await fetch(url, {
      headers: this.ctx.headers,
    })

    const contentType = res.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      throw new Error(`Expected JSON but got ${contentType}`)
    }

    const data = (await res.json()) as Record<string, unknown>

    // Extract the nested path from the response using lodash.get
    const result = get(data, responsePath)
    if (result === undefined) {
      // Return the provided default value or undefined
      return defaultValue as T
    }

    return result as T
  }
}
