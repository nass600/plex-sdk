import { ApiClient } from '@client'
import * as mockAll from '../__fixtures__/all.200.json'
import { Hubs } from '../Hubs'

jest.mock('@client', () => ({
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

        return hubs.search('avengers').then(() => {
            expect(hubs.apiClient.get).toHaveBeenCalledWith('hubs/search?query=avengers')
        })
    })
})
