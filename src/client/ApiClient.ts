import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ParamsSerializerOptions } from 'axios'
import { PlexHeader } from '@/types'

export interface Headers {
    [key: string]: string;
}

export enum RequestMethod {
    DELETE = 'DELETE',
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
}

export class ApiClient {
    client: AxiosInstance
    token?: string

    constructor (baseUrl: string, headers?: Headers) {
        this.client = this.createClient(
            baseUrl,
            headers
        )
    }

    get<T> (
        endpoint: string,
        params?: Record<string, unknown>,
        headers?: Headers,
        paramsSerializer?: ParamsSerializerOptions
    ): Promise<T> {
        return this.request<T>(
            RequestMethod.GET,
            endpoint,
            params,
            undefined,
            headers,
            paramsSerializer
        )
    }

    delete<T> (
        endpoint: string,
        body?: Record<string, unknown>,
        params?: Record<string, unknown>,
        headers?: Headers
    ): Promise<T> {
        return this.request<T>(
            RequestMethod.DELETE,
            endpoint,
            params,
            body,
            headers
        )
    }

    post<T> (
        endpoint: string,
        body?: Record<string, unknown>,
        params?: Record<string, unknown>,
        headers?: Headers
    ): Promise<T> {
        return this.request<T>(
            RequestMethod.POST,
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
        headers?: Headers
    ): Promise<T> {
        return this.request<T>(
            RequestMethod.PUT,
            endpoint,
            params,
            body,
            headers
        )
    }

    getAuthorization (): string | undefined {
        return this.token
    }

    setAuthorization (token?: string): void {
        this.token = token

        if (this.token) {
            this.client.defaults.headers.common[PlexHeader.TOKEN] = this.token
        } else {
            delete this.client.defaults.headers.common[PlexHeader.TOKEN]
        }
    }

    private request<T> (
        method: RequestMethod,
        url: string,
        params?: Record<string, unknown>,
        data?: Record<string, unknown>,
        headers: Headers = {},
        paramsSerializer?: ParamsSerializerOptions
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

    private createClient (apiUrl: string, headers?: Headers): AxiosInstance {
        const baseURL = apiUrl.charAt(apiUrl.length - 1) === '/' ? apiUrl : `${apiUrl}/`
        const client = axios.create({ baseURL })

        client.defaults.headers.common = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }

        if (headers?.clientIdentifier) {
            client.defaults.headers.common[PlexHeader.CLIENT_IDENTIFIER] = headers.clientIdentifier
        }

        if (headers?.device) {
            client.defaults.headers.common[PlexHeader.DEVICE] = headers.device
        }

        if (headers?.product) {
            client.defaults.headers.common[PlexHeader.PRODUCT] = headers.product
        }

        if (headers?.version) {
            client.defaults.headers.common[PlexHeader.VERSION] = headers.version
        }

        client.interceptors.response.use(
            (response: AxiosResponse) => response.data
        )

        return client
    }
}
