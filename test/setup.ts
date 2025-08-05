import { beforeAll, afterEach, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import fs from 'fs'
import path from 'path'

// Load mock data
const loadMock = (filename: string): Record<string, unknown> => {
  const mockPath = path.join(__dirname, 'mocks', filename)
  return JSON.parse(fs.readFileSync(mockPath, 'utf-8')) as Record<string, unknown>
}

// Create MSW server
export const server = setupServer(
  // Plex.tv API endpoints
  http.get('https://plex.tv/api/v2/resources', () => {
    return HttpResponse.json(loadMock('resources.all.200.json'))
  }),

  // Plex Media Server endpoints
  http.get('*/hubs', () => {
    return HttpResponse.json(loadMock('hubs.all.200.json'))
  }),

  http.get('*/library/sections', () => {
    return HttpResponse.json(loadMock('library.all.200.json'))
  }),

  http.get('*/library/sections/:id/all', ({ params }) => {
    // Return empty items for non-existent library (ID 999)
    if (params.id === '999') {
      return HttpResponse.json({
        MediaContainer: {
          size: 0,
          allowSync: true,
          identifier: 'com.plexapp.plugins.library',
          librarySectionID: 999,
          librarySectionTitle: 'Non-existent Library',
          librarySectionUUID: '2f007be0-4b60-4676-8c46-4b754ae90122',
          mediaTagPrefix: '/system/bundle/media/flags/',
          mediaTagVersion: 1579823211,
        },
      })
    }
    return HttpResponse.json(loadMock('library.allItems.200.json'))
  }),

  http.get('*/library/metadata/:id', ({ params }) => {
    // Return empty response for non-existent metadata (ID 999999)
    if (params.id === '999999') {
      return HttpResponse.json({
        MediaContainer: {
          size: 0,
          allowSync: true,
          identifier: 'com.plexapp.plugins.library',
          librarySectionID: 2,
          librarySectionTitle: 'Movies',
          librarySectionUUID: '2f007be0-4b60-4676-8c46-4b754ae90122',
          mediaTagPrefix: '/system/bundle/media/flags/',
          mediaTagVersion: 1579823211,
        },
      })
    }
    return HttpResponse.json(loadMock('metadata.one.200.json'))
  }),

  http.get('*/library/search', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('query')

    // Return empty results for specific test queries
    if (query === 'nonexistent movie that will never exist') {
      return HttpResponse.json(loadMock('library.search.empty.200.json'))
    }

    return HttpResponse.json(loadMock('library.search.200.json'))
  })
)

// Start server before all tests
beforeAll(() => server.listen())

// Reset handlers after each test
afterEach(() => server.resetHandlers())

// Close server after all tests
afterAll(() => server.close())
