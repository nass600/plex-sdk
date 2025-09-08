# plex-sdk

[![npm](https://img.shields.io/npm/v/plex-sdk?color=red&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/plex-sdk)
[![npm](https://img.shields.io/npm/dm/plex-sdk?color=blue&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/plex-sdk)
[![npm](https://img.shields.io/bundlephobia/min/plex-sdk?label=min%20size&logo=npm&style=for-the-badge)](<(https://www.npmjs.com/package/plex-sdk)>)
[![Vitest](https://img.shields.io/github/actions/workflow/status/nass600/plex-sdk/test.yml?label=tests&logo=vitest&style=for-the-badge)](https://github.com/nass600/plex-sdk/actions/workflows/test.yml)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=for-the-badge)](https://github.com/semantic-release/semantic-relesase)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=for-the-badge&logo=github)](http://commitizen.github.io/cz-cli/)

> TypeScript SDK for `Plex` and `Plex Media Server` APIs with full type safety, payload response simplification and comprehensive coverage

## Features

- 🔐 **Secure Authentication**: Full support for Plex.tv authentication
- 🎯 **Type Safety**: Complete TypeScript definitions for all API responses
- 🚀 **Modern ESM**: Built as a modern ES module with tree-shaking support
- 📦 **Lightweight**: Minified bundle with zero runtime dependencies
- 🧪 **Well Tested**: Comprehensive test suite with 97%+ coverage
- 🎬 **Media Server Integration**: Direct access to your Plex Media Server
- 🔍 **Search Capabilities**: Powerful search across movies, TV shows, and more

## Installation

### Using npm

```bash
npm install plex-sdk
```

### Using yarn

```bash
yarn add plex-sdk
```

### Using pnpm

```bash
pnpm add plex-sdk
```

### From source

```bash
git clone git@github.com:nass600/plex-sdk.git
cd plex-sdk
npm install
npm run build
```

## API Response Simplification

This SDK simplifies Plex API responses by automatically extracting the relevant data from the nested `MediaContainer` structure. Instead of dealing with complex nested objects, you get clean, direct access to the data you need.

**Before (Raw Plex API):**

```json
{
  "MediaContainer": {
    "size": 1,
    "Directory": [
      {
        "title": "Movies",
        "type": "movie",
        "key": "/library/sections/1"
      }
    ]
  }
}
```

**After (Simplified SDK Response):**

```typescript
;[
  {
    title: 'Movies',
    type: 'movie',
    key: '/library/sections/1',
  },
]
```

The SDK handles the `MediaContainer` extraction automatically, so you can focus on working with your data directly.

## Quick Start

### 1. Get Your Plex Token

First, you need to get your Plex token. You can find it by:

1. **Open your Plex web app** in your browser
2. **Open Developer Tools** (F12 or right-click → Inspect)
3. **Go to the Network tab**
4. **Refresh the page** or navigate to any section
5. **Look for requests to plex.tv** - the token will be in the request headers as `X-Plex-Token`
6. **Copy the token value** (it's a long string of letters and numbers)

Alternatively, you can find it in your Plex app settings or by examining the network requests in any Plex client.

### 2. Initialize the Plex Client

```typescript
import { PlexClient } from 'plex-sdk'

const client = new PlexClient('your-plex-token-here', {
  device: 'My App',
  product: 'My Plex App',
  version: '1.0.0',
})
```

### 3. Server Selection

The SDK provides two ways to connect to your Plex Media Server:

#### A. List All Resources and select a server

First, you can explore all available resources to see what's available:

```typescript
const resources = await client.getResources()

// Display all resources with their types
resources.forEach(resource => {
  console.log(`${resource.name}: ${resource.provides?.join(', ')}`)
})

// Filter to find only servers
const servers = resources.filter(resource => resource.provides?.includes('server'))

// Query any resource
const hubs = servers[0].hubs.all()
```

#### B. Direct Server Connection

Once you know your server name, you can connect directly:

```typescript
// Connect by server name using the first connection available
const server = await client.getServer('My Plex Server')

// Or filtering by connection preferences
const server = await client.getServer('My Plex Server', {
  local: true, // Prefer local connections
  secure: true, // Prefer secure connections
  relay: false, // Avoid relay connections
})

// Query any resource
const hubs = server.hubs.all()
```

### 4. Advanced Connection Filtering

The SDK supports advanced connection filtering with both exact matching and regex patterns:

```typescript
// Exact matching (existing behavior)
const server = await client.getServer('My Plex Server', {
  address: '192.168.1.100',
  protocol: 'https',
  local: true,
})

// Regex pattern matching (new feature)
const server = await client.getServer('My Plex Server', {
  address: /192\.168\.1\.\d+/, // Match any IP in 192.168.1.x range
  protocol: /^https?$/, // Match http or https
  port: /^324\d+$/, // Match ports starting with 324
})

// Mixed exact and regex matching
const server = await client.getServer('My Plex Server', {
  local: true, // Exact boolean match
  address: /192\.168\.\d+\.\d+/, // Regex for local network IPs
  protocol: 'https', // Exact protocol match
})

// Partial string matching with regex
const server = await client.getServer('My Plex Server', {
  address: /example\.com/, // Match any address containing 'example.com'
  uri: /https:\/\/.*\.local/, // Match HTTPS URIs ending with '.local'
})
```

**Available filter properties:**

- `address` - Server address (supports regex patterns)
- `protocol` - Connection protocol (http/https)
- `port` - Port number
- `uri` - Full connection URI
- `local` - Whether connection is local
- `relay` - Whether connection uses relay
- `IPv6` - Whether connection uses IPv6

## Usage Examples

### Search for a specific movie

Here's a comprehensive example showing how to search for a specific movie:

```typescript
import { PlexClient, SearchType } from 'plex-sdk'

async function searchForMovie(movieTitle: string) {
  // 1. Initialize the Plex client with your token
  const client = new PlexClient('your-plex-token-here', {
    device: 'Movie Search App',
    product: 'Plex Movie Finder',
    version: '1.0.0',
  })

  try {
    // 2. Connect directly to your server by name
    const server = await client.getServer('My Plex Server')
    console.log(`✅ Connected to server: ${server.name}`)

    // 5. Search for the movie
    const searchResults = await server.library.search({
      query: movieTitle, // The query text will be normalized internally
      searchTypes: [SearchType.MOVIES],
    })

    if (searchResults.length === 0) {
      console.log(`❌ No movies found for "${movieTitle}"`)
      return null
    }

    // 6. Display results
    console.log(`🎬 Found ${searchResults.length} movie(s) for "${movieTitle}":`)

    searchResults.forEach((movie, index) => {
      console.log(`\n${index + 1}. ${movie.title} (${movie.year})`)
      console.log(`   Rating: ${movie.rating}/5`)
      console.log(`   Duration: ${Math.round(movie.duration / 60000)} minutes`)
      console.log(`   Summary: ${movie.summary?.substring(0, 100)}...`)

      if (movie.Role && movie.Role.length > 0) {
        console.log(
          `   Cast: ${movie.Role.slice(0, 3)
            .map(role => role.tag)
            .join(', ')}`
        )
      }
    })

    return searchResults[0] // Return the first result
  } catch (error) {
    console.error('❌ Error searching for movie:', error)
    throw error
  }
}

// Usage
searchForMovie('The Dark Knight')
  .then(movie => {
    if (movie) {
      console.log(`\n🎉 Successfully found: ${movie.title}`)
    }
  })
  .catch(error => {
    console.error('Failed to search for movie:', error)
  })
```

### Browse Your Media Library

```typescript
async function browseLibrary() {
  const client = new PlexClient('your-plex-token-here', {
    device: 'Library Browser',
    product: 'Plex Library Explorer',
    version: '1.0.0',
  })

  const server = await client.getServer('My Plex Server')

  // Get all libraries
  const libraries = await server.library.all()
  console.log('📚 Available libraries:')
  libraries.forEach(lib => {
    console.log(`  - ${lib.title} (${lib.type})`)
  })

  // Get all movies from the first library
  if (libraries.length > 0) {
    const movies = await server.library.allItems(libraries[0].key)
    console.log(`\n🎬 Movies in ${libraries[0].title}:`)
    movies.slice(0, 5).forEach(movie => {
      console.log(`  - ${movie.title} (${movie.year})`)
    })
  }
}
```

### Get Movie Metadata

```typescript
async function getMovieDetails(movieId: string) {
  const client = new PlexClient('your-plex-token-here', {
    device: 'Movie Details App',
    product: 'Plex Movie Info',
    version: '1.0.0',
  })

  const server = await client.getServer('My Plex Server')

  // Get detailed metadata for a specific movie
  const movie = await server.metadata.one(movieId)

  console.log(`🎬 ${movie.title} (${movie.year})`)
  console.log(`📝 ${movie.summary}`)
  console.log(`⭐ Rating: ${movie.rating}/5`)
  console.log(`⏱️  Duration: ${Math.round(movie.duration / 60000)} minutes`)

  if (movie.Director) {
    console.log(`🎭 Director: ${movie.Director.map(d => d.tag).join(', ')}`)
  }

  if (movie.Role) {
    console.log(
      `👥 Cast: ${movie.Role.slice(0, 5)
        .map(role => role.tag)
        .join(', ')}`
    )
  }

  if (movie.Genre) {
    console.log(`🎭 Genres: ${movie.Genre.map(g => g.tag).join(', ')}`)
  }
}
```

### Browse Hubs

```typescript
async function browseHubs() {
  const client = new PlexClient('your-plex-token-here', {
    device: 'Hub Browser',
    product: 'Plex Hub Explorer',
    version: '1.0.0',
  })

  const server = await client.getServer('My Plex Server')

  // Get all hubs
  const hubs = await server.hubs.all()
  console.log('🏠 Available hubs:')
  hubs.forEach(hub => {
    console.log(`  - ${hub.title} (${hub.type})`)
  })
}
```

## API Reference

### PlexClient

The main client for interacting with Plex.tv services.

```typescript
const client = new PlexClient(token: string, {
  device?: string,      // Device name (default: 'Node.js')
  product?: string,     // Product name (default: 'Plex SDK')
  version?: string,     // Version string (default: '1.0')
  platform?: string,    // Platform name (default: 'Node.js')
  clientIdentifier?: string // Client identifier (default: 'plex-sdk')
})
```

#### Methods

- `getResources(): Promise<PlexResource[]>` - Get available Plex servers
- `getServer(resourceName: string, connectionsFilter?: PlexConnectionFilter): Promise<PlexServer>` - Create a server instance with advanced filtering

### PlexServer

Represents a connection to a Plex Media Server.

#### Properties

- `name: string` - Server name
- `hubs: Hubs` - Access to server hubs
- `library: Library` - Access to media library
- `metadata: Metadata` - Access to metadata

#### Methods

- `search(query: string): Promise<SearchResult[]>` - Search across all media

### Library

Provides access to the media library.

#### Methods

- `all(): Promise<Directory[]>` - Get all libraries
- `allItems(sectionId: string, params?: QueryParams): Promise<Metadata[]>` - Get all items from a library
- `search(params: SearchParams): Promise<SearchResult[]>` - Search within libraries

### Search Parameters

```typescript
interface SearchParams {
  query: string // Search query (required)
  searchTypes: SearchType[] // Types to search (MOVIES, TV, etc.)
}
```

### Connection Filtering

```typescript
type PlexConnectionFilter = Partial<{
  [K in keyof PlexConnection]: PlexConnection[K] | RegExp
}>

// Example usage:
const filter: PlexConnectionFilter = {
  address: /192\.168\.1\.\d+/, // Regex pattern
  protocol: 'https', // Exact match
  local: true, // Boolean match
  port: /^324\d+$/, // Regex pattern
}
```

## Error Handling

The SDK provides comprehensive error handling:

```typescript
try {
  const server = await client.getServer('My Plex Server')
} catch (error) {
  if (error.message.includes('Server not found')) {
    console.error('❌ Plex server not found - check your server name')
  } else if (error.message.includes('Network error')) {
    console.error('❌ Network connection failed - check your internet connection')
  } else if (error.message.includes('Unauthorized')) {
    console.error('❌ Invalid token - check your Plex token')
  } else {
    console.error('❌ Unexpected error:', error.message)
  }
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/nass600/plex-sdk/tags).

## Changelog

See [CHANGELOG](CHANGELOG.md) file for more details.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE.md) file for details

## Authors

- [Ignacio Velazquez](https://ignaciovelazquez.es)
