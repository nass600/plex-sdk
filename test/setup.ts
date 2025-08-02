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

  http.get('*/library/sections/:id/all', () => {
    return HttpResponse.json(loadMock('library.allItems.200.json'))
  }),

  http.get('*/library/metadata/:id', () => {
    return HttpResponse.json(loadMock('metadata.one.200.json'))
  }),

  http.get('*/library/search', () => {
    return HttpResponse.json(loadMock('library.search.200.json'))
  })
)

// Start server before all tests
beforeAll(() => server.listen())

// Reset handlers after each test
afterEach(() => server.resetHandlers())

// Close server after all tests
afterAll(() => server.close())
