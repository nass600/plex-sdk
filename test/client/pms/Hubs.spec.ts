import { ApiClient } from '@/client/ApiClient'
import * as mockAll from '@fixtures/hubs.all.200.json'
import { Hubs } from '@/client/pms'

jest.mock('@/client/ApiClient', () => ({
    ApiClient: jest.fn().mockImplementation(() => ({
        get: jest.fn().mockResolvedValue({ data: mockAll }),
        setAuthorization: jest.fn()
    }))
}))

let apiClient: ApiClient

describe('hubs', () => {
    beforeEach(() => {
        apiClient = new ApiClient('https://host', {})
    })

    it('Get all hubs successfully', () => {
        const hubs = new Hubs(apiClient)

        return hubs.all().then(() => {
            expect(hubs.apiClient.get).toHaveBeenCalledWith('hubs')
        })
    })

    it('Search items successfully', () => {
        const hubs = new Hubs(apiClient)

        return hubs.search({ query: 'avengers' }).then(() => {
            expect(hubs.apiClient.get).toHaveBeenCalledWith('hubs/search?query=avengers')
        })
    })

    it('Search items successfully with optional params', () => {
        const hubs = new Hubs(apiClient)

        return hubs.search({ query: 'avengers', limit: 2, includeGuids: 1 }).then(() => {
            expect(hubs.apiClient.get).toHaveBeenCalledWith('hubs/search?query=avengers&limit=2&includeGuids=1')
        })
    })
})
