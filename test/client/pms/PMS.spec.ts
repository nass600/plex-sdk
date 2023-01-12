import { PMS } from '@/client/pms/PMS'

const fakeServer = 'https://fake-server.com:32400'
const fakeToken = 'fakeToken'

describe('PMS', () => {
    it('Create client', () => {
        const pms = new PMS(fakeServer, fakeToken)

        expect(pms.getAuthorization()).toEqual(fakeToken)
    })

    it('Set authorization', () => {
        const pms = new PMS(fakeServer)
        pms.setAuthorization(fakeToken)

        expect(pms.getAuthorization()).toEqual(fakeToken)
    })
})
