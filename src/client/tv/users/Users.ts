import { ApiClient } from '../..'

/* eslint-disable camelcase */
export interface User {
    id: number;
    uuid: string;
    email: string;
    joined_at: string;
    username: string;
    title: string;
    thumb: string;
    hasPassword: boolean;
    authToken: string;
    authentication_token: string;
    subscription: {
        active: true;
        status: string;
        plan: string;
        features: string[];
    };
    roles: {
        roles: string[];
    };
    entitlements: string[];
    confirmedAt: string;
    forumId: number;
    rememberMe: boolean;
}
/* eslint-enable camelcase */

export class Users {
    private apiClient: ApiClient

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
