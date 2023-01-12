import axios, { AxiosStatic } from 'axios'
import { ApiClient } from '@/client/ApiClient'
import { PlexHeader } from '@/types'

jest.mock('axios');
(axios.request as jest.Mock).mockResolvedValue({})

axios.defaults = axios.defaults || {}
axios.defaults.headers = axios.defaults.headers || {}
axios.defaults.headers.common = axios.defaults.headers.common || {}
axios.interceptors = axios.interceptors || {}

axios.create = ({ baseURL }: { baseURL: string }): AxiosStatic => {
    axios.defaults.baseURL = baseURL
    return axios
}

const fakeUrl = 'fakeUrl'
const fakeParams = { key: 'value' }
const fakeData = { anotherKey: 'anotherValue' }
const fakeToken = 'fakeToken'

describe('ApiClient', () => {
    afterEach(() => {
        (axios.request as jest.Mock).mockClear();
        (axios.CancelToken.source as jest.Mock).mockClear()
    })

    describe('default headers', () => {
        it('Sets the authorization token', () => {
            const apiClient = new ApiClient(fakeUrl)
            apiClient.setAuthorization(fakeToken)

            expect(apiClient.client.defaults.headers.common['Content-Type']).toEqual('application/json')
            expect(apiClient.client.defaults.headers.common[PlexHeader.TOKEN]).toEqual(fakeToken)
            expect(apiClient.getAuthorization()).toEqual(fakeToken)
        })

        it('Delete the authorization token', () => {
            const apiClient = new ApiClient(fakeUrl, { [PlexHeader.TOKEN]: fakeToken })
            apiClient.setAuthorization(undefined)

            expect(apiClient.client.defaults.headers.common['Content-Type']).toEqual('application/json')
            expect(apiClient.client.defaults.headers.common[PlexHeader.TOKEN]).toBeUndefined()
            expect(apiClient.getAuthorization()).toBeUndefined()
        })
    })

    describe('delete', () => {
        it('Makes a delete request', () => {
            return new ApiClient(fakeUrl).delete(fakeUrl).then(() =>
                expect(axios.request).toHaveBeenCalledWith(
                    expect.objectContaining({
                        method: 'DELETE',
                        url: fakeUrl
                    })
                )
            )
        })

        it('Makes a delete request with query params', () => {
            return new ApiClient(fakeUrl).delete(fakeUrl, undefined, fakeParams).then(() =>
                expect(axios.request).toHaveBeenCalledWith(
                    expect.objectContaining({
                        method: 'DELETE',
                        params: fakeParams,
                        url: fakeUrl
                    })
                )
            )
        })

        it('Makes a delete request with body', () => {
            return new ApiClient(fakeUrl).delete(fakeUrl, fakeData).then(() =>
                expect(axios.request).toHaveBeenCalledWith(
                    expect.objectContaining({
                        data: fakeData,
                        method: 'DELETE',
                        url: fakeUrl
                    })
                )
            )
        })
    })

    describe('get', () => {
        it('Makes a get request', () => {
            return new ApiClient(fakeUrl).get(fakeUrl).then(() =>
                expect(axios.request).toHaveBeenCalledWith(
                    expect.objectContaining({
                        method: 'GET',
                        url: fakeUrl
                    })
                )
            )
        })

        it('Makes a get request with query params', () => {
            return new ApiClient(fakeUrl).get(fakeUrl, fakeParams).then(() =>
                expect(axios.request).toHaveBeenCalledWith(
                    expect.objectContaining({
                        method: 'GET',
                        params: fakeParams,
                        url: fakeUrl
                    })
                )
            )
        })

        it('Normalizes the url trailing slash', () => {
            return new ApiClient(fakeUrl).get(fakeUrl).then(() =>
                expect(axios.request).toHaveBeenCalledWith(
                    expect.objectContaining({
                        method: 'GET',
                        url: fakeUrl
                    })
                )
            )
        })
    })

    describe('post', () => {
        it('Makes a post request', () => {
            return new ApiClient(fakeUrl).post(fakeUrl).then(() =>
                expect(axios.request).toHaveBeenCalledWith(
                    expect.objectContaining({
                        method: 'POST',
                        url: fakeUrl
                    })
                )
            )
        })

        it('Makes a post request with a request body', () => {
            return new ApiClient(fakeUrl).post(fakeUrl, fakeData).then(() =>
                expect(axios.request).toHaveBeenCalledWith(
                    expect.objectContaining({
                        data: fakeData,
                        method: 'POST',
                        url: fakeUrl
                    })
                )
            )
        })

        it('Makes a post request with query params', () => {
            return new ApiClient(fakeUrl).post(fakeUrl, undefined, fakeParams).then(() =>
                expect(axios.request).toHaveBeenCalledWith(
                    expect.objectContaining({
                        method: 'POST',
                        params: fakeParams,
                        url: fakeUrl
                    })
                )
            )
        })

        it('Makes a post request with a request body and query params', () => {
            return new ApiClient(fakeUrl).post(fakeUrl, fakeData, fakeParams).then(() =>
                expect(axios.request).toHaveBeenCalledWith(
                    expect.objectContaining({
                        data: fakeData,
                        method: 'POST',
                        params: fakeParams,
                        url: fakeUrl
                    })
                )
            )
        })
    })

    describe('put', () => {
        it('Makes a put request', () => {
            return new ApiClient(fakeUrl).put(fakeUrl).then(() =>
                expect(axios.request).toHaveBeenCalledWith(
                    expect.objectContaining({
                        method: 'PUT',
                        url: fakeUrl
                    })
                )
            )
        })

        it('Makes a put request with a request body', () => {
            return new ApiClient(fakeUrl).put(fakeUrl, fakeData).then(() =>
                expect(axios.request).toHaveBeenCalledWith(
                    expect.objectContaining({
                        data: fakeData,
                        method: 'PUT',
                        url: fakeUrl
                    })
                )
            )
        })

        it('Makes a put request with query params', () => {
            return new ApiClient(fakeUrl).put(fakeUrl, undefined, fakeParams).then(() =>
                expect(axios.request).toHaveBeenCalledWith(
                    expect.objectContaining({
                        method: 'PUT',
                        params: fakeParams,
                        url: fakeUrl
                    })
                )
            )
        })

        it('Makes a put request with a request body and query params', () => {
            return new ApiClient(fakeUrl).put(fakeUrl, fakeData, fakeParams).then(() =>
                expect(axios.request).toHaveBeenCalledWith(
                    expect.objectContaining({
                        data: fakeData,
                        method: 'PUT',
                        params: fakeParams,
                        url: fakeUrl
                    })
                )
            )
        })
    })
})
