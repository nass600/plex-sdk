import { ApiClient } from '@client'
import * as mockAllSections from '../__fixtures__/allSections.200.json'
import { Library } from '../Library'

jest.mock('@client', () => ({
    ApiClient: jest.fn().mockImplementation(() => ({
        get: jest.fn().mockResolvedValue({ data: mockAllSections }),
        setAuthorization: jest.fn()
    }))
}))

let apiClient: ApiClient

describe('library', () => {
    beforeEach(() => {
        apiClient = new ApiClient('https://host', {})
    })

    it('Get all sections of a library successfully', () => {
        const library = new Library(apiClient)

        return library.allSections().then(() => {
            expect(library.apiClient.get).toHaveBeenCalledWith('library/sections')
        })
    })

    it('Get all items of a section successfully', () => {
        apiClient.setAuthorization('fakeToken')
        const library = new Library(apiClient)

        return library.allSectionItems(1).then(() => {
            expect(library.apiClient.get).toHaveBeenCalledWith('library/sections/1/all')
        })
    })

    it('Get an item successfully', () => {
        const library = new Library(apiClient)

        return library.getMetadata('2024').then(() => {
            expect(library.apiClient.get).toHaveBeenCalledWith('library/metadata/2024')
        })
    })

    it('Get several items successfully', () => {
        const library = new Library(apiClient)

        return library.getMetadata(['2024', '63152']).then(() => {
            expect(library.apiClient.get).toHaveBeenCalledWith('library/metadata/2024,63152')
        })
    })
})
