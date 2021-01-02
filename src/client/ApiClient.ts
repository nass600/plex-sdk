import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface PlexHeaders {
    [key: string]: string;
}

export enum PlexRequestMethod {
    DELETE = 'DELETE',
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
}

export class ApiClient {
    client: AxiosInstance;
    token: string;

    constructor (baseUrl: string, headers?: PlexHeaders) {
        this.client = this.createClient(
            baseUrl,
            headers
        )
    }

    get<T> (
        endpoint: string,
        params?: Record<string, unknown>,
        headers?: PlexHeaders,
        paramsSerializer?: (params: Record<string, unknown>) => string
    ): Promise<T> {
        return this.request<T>(
            PlexRequestMethod.GET,
            endpoint,
            params,
            undefined,
            headers,
            paramsSerializer
        )
    }

    delete<T> (endpoint: string, params?: Record<string, unknown>, headers?: PlexHeaders): Promise<T> {
        return this.request<T>(
            PlexRequestMethod.DELETE,
            endpoint,
            params,
            undefined,
            headers
        )
    }

    post<T> (
        endpoint: string,
        body?: Record<string, unknown>,
        params?: Record<string, unknown>,
        headers?: PlexHeaders
    ): Promise<T> {
        return this.request<T>(
            PlexRequestMethod.POST,
            endpoint,
            params,
            body,
            headers
        )
    }

    put<T> (
        endpoint: string,
        body?: Record<string, unknown>,
        params?: Record<string, unknown>,
        headers?: PlexHeaders
    ): Promise<T> {
        return this.request<T>(
            PlexRequestMethod.PUT,
            endpoint,
            params,
            body,
            headers
        )
    }

    getAuthorization (): string | undefined {
        return this.token
    }

    setAuthorization (token: string): void {
        this.token = token

        this.client.defaults.headers.common['X-Plex-Token'] = this.token
    }

    private request<T> (
        method: PlexRequestMethod,
        url: string,
        params?: Record<string, unknown>,
        data?: Record<string, unknown>,
        headers: PlexHeaders = {},
        paramsSerializer?: (params: Record<string, unknown>) => string
    ): Promise<T> {
        const requestConfig: AxiosRequestConfig = {
            data,
            headers,
            method,
            params,
            paramsSerializer,
            url
        }

        return this.client.request<T>(requestConfig)
    }

    private createClient (apiUrl: string, headers?: PlexHeaders): AxiosInstance {
        const baseURL = apiUrl.charAt(apiUrl.length - 1) === '/' ? apiUrl : `${apiUrl}/`
        const client = axios.create({ baseURL })

        client.defaults.headers.common = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }

        if (headers?.clientIdentifier) {
            client.defaults.headers.common['X-Plex-Client-Identifier'] = headers.clientIdentifier
        }

        if (headers?.device) {
            client.defaults.headers.common['X-Plex-Device'] = headers.device
        }

        if (headers?.product) {
            client.defaults.headers.common['X-Plex-Product'] = headers.product
        }

        if (headers?.version) {
            client.defaults.headers.common['X-Plex-Version'] = headers.version
        }

        client.interceptors.response.use(
            (response: AxiosResponse) => response.data
        )

        return client
    }
}
