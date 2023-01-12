import { ApiClient } from '@/client/ApiClient'
import { User } from '@/types'

export class Users {
    apiClient: ApiClient

    public constructor (client: ApiClient) {
        this.apiClient = client
    }

    signIn (username: string, password: string): Promise<User> {
        const hash = Buffer.from(`${username}:${password}`).toString('base64')

        return this.apiClient.post(
            'api/v2/users/signin',
            { login: username, password },
            undefined,
            {
                authorization: `Basic ${hash}`
            }
        )
    }

    signOut (): Promise<void> {
        return this.apiClient.delete('api/v2/users/signout')
    }
}
