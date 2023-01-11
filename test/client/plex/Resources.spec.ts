import { ApiClient } from '@/client/ApiClient'
import * as mockData from '@fixtures/resources.all.200.json'
import { Resources } from '@/client/plex'

jest.mock('@/client/ApiClient', () => ({
    ApiClient: jest.fn().mockImplementation(() => ({
        get: jest.fn().mockResolvedValue({ data: mockData }),
        setAuthorization: jest.fn()
    }))
}))

let apiClient: ApiClient

describe('resources', () => {
    beforeEach(() => {
        apiClient = new ApiClient('https://host', {})
    })

    it('Get all Resources from a user successfully', () => {
        const resources = new Resources(apiClient)

        return resources.all().then(() => {
            expect(resources.apiClient.get).toHaveBeenCalledWith('api/v2/resources')
        })
    })
})
