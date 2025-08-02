import { PlexServerContext } from '@/types'
import queryString from 'query-string'

export abstract class BaseResource {
  constructor(protected ctx: PlexServerContext) {}

  protected async get<T, P = Record<string, unknown>>(
    path: string,
    responsePath: string,
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

    // Extract the nested path from the response
    const pathParts = responsePath.split('.')
    let result: unknown = data

    for (const part of pathParts) {
      if (result && typeof result === 'object' && part in result) {
        result = (result as Record<string, unknown>)[part]
      } else {
        throw new Error(`Path "${responsePath}" not found in response`)
      }
    }

    return result as T
  }
}
