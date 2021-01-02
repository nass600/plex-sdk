import { ApiClient } from '..'
import { Users } from './users'
import { Resources } from './resources'

export class TV {
    public users: Users
    public resources: Resources

    constructor (public apiClient: ApiClient) {
        this.users = new Users(apiClient)
        this.resources = new Resources(apiClient)
    }
}
