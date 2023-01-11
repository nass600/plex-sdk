import { Plex } from '@/client/plex'

const fakeToken = 'fakeToken'

describe('Plex', () => {
    it('Create client', () => {
        const plex = new Plex({
            clientIdentifier: 'ad86asgd786as7d67astd7as',
            device: 'Chrome',
            product: 'Extension',
            version: '1.0.0'
        })

        expect(plex.getAuthorization()).toEqual(undefined)
    })

    it('Set authorization', () => {
        const plex = new Plex()
        plex.setAuthorization(fakeToken)

        expect(plex.getAuthorization()).toEqual(fakeToken)
    })
})
