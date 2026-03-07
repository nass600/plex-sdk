export class PlexApiError extends Error {
  constructor(
    public readonly status: number,
    statusText: string
  ) {
    super(`Plex API error: ${status} ${statusText}`)
    this.name = 'PlexApiError'
  }
}
