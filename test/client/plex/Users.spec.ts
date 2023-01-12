import { ApiClient } from '@/client/ApiClient'
import * as mockData from '@fixtures/users.signin.200.json'
import { Users } from '@/client/plex/Users'

jest.mock('@/client/ApiClient', () => ({
    ApiClient: jest.fn().mockImplementation(() => ({
        post: jest.fn().mockResolvedValue({ data: mockData }),
        delete: jest.fn().mockResolvedValue({ data: null }),
        setAuthorization: jest.fn()
    }))
}))

let apiClient: ApiClient

describe('users', () => {
    beforeEach(() => {
        apiClient = new ApiClient('https://host', {})
    })

    it('Signs in a User successfully', () => {
        const users = new Users(apiClient)
        const payload = { login: 'username', password: 'password' }

        return users.signIn(payload.login, payload.password).then(() => {
            expect(users.apiClient.post).toHaveBeenCalledWith(
                'api/v2/users/signin',
                payload,
                undefined,
                { authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=' }
            )
        })
    })

    it('Signs out a User successfully', () => {
        apiClient.setAuthorization('fakeToken')
        const users = new Users(apiClient)

        return users.signOut().then(() => {
            expect(users.apiClient.delete).toHaveBeenCalledWith('api/v2/users/signout')
        })
    })
})
