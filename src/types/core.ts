export interface PlexServerContext {
  baseUrl: string
  headers: Record<string, string>
}

export interface PlexClientOptions {
  clientIdentifier?: string
  product?: string
  version?: string
  device?: string
  platform?: string
}

export interface PlexConnection {
  protocol: string
  address: string
  port: string
  uri: string
  local: boolean
  relay: boolean
  IPv6: boolean
}

export interface PlexResource {
  name: string
  product: string
  productVersion: string
  platform: string
  platformVersion: string
  device: string
  clientIdentifier: string
  createdAt: string
  lastSeenAt: string
  provides: string
  ownerId: string | null
  sourceTitle: string | null
  publicAddress: string
  accessToken: string | null
  owned: boolean
  home: boolean
  synced: boolean
  relay: boolean
  presence: boolean
  httpsRequired: boolean
  publicAddressMatches: boolean
  dnsRebindingProtection: boolean
  natLoopbackSupported: boolean
  connections: PlexConnection[]
}
