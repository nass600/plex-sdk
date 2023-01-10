# plex-sdk

[![npm](https://img.shields.io/npm/v/plex-sdk?color=red&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/plex-sdk)
[![npm](https://img.shields.io/npm/dm/plex-sdk?color=blue&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/plex-sdk)
[![npm](https://img.shields.io/bundlephobia/min/plex-sdk?logo=npm&style=for-the-badge)]((https://www.npmjs.com/package/plex-sdk))
[![Jest](https://img.shields.io/github/actions/workflow/status/nass600/plex-sdk/test.yml?label=tests&logo=jest&style=for-the-badge)](https://github.com/nass600/plex-sdk/actions/workflows/test.yml)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=for-the-badge)](https://github.com/semantic-release/semantic-relesase)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=for-the-badge\&logo=github)](http://commitizen.github.io/cz-cli/)

> Typescript SDK for `Plex` and `Plex Media Server` APIs

## Installation

Add the library to your `package.json`:

```json
"dependencies": {
    "plex-sdk": "^2.0.1"
}
```

Or download the repo itself in case you wanna take a deeper look:

```bash
git clone git@github.com:nass600/plex-sdk
cd plex-sdk
npm install
```

## Usage

This SDK provides an interface to interact with two services: `plex.tv` (Plex API) and your own `plex media server`
(generally hosted at `https://your-host.com:32400`) (PMS API).

Both are secured APIs and, in order to interact with your `PMS` you need to request an `authToken` provided by the
`plex.tv` upon username/password login.

### Plex API

The `Plex` SDK provides an interface with the Plex service (`https://www.plex.tv/`).

```typescript
import { Plex, User, Resource } from 'plex-sdk'

const plex = new Plex(
    'c2877b28-1806-42c1-eeea-ac4bc2b9a93d', // uuid.v4
    {
        device: 'Chrome',
        product: 'Your product name',
        version: '1.0.0'
    }
)

plex.users.signIn(username, password).then((user: User) => {
    if (!user.authToken) {
        return Promise.reject(new Error('Login request didn\'t carry a valid token'))
    }

    plex.setAuthorization(user.authToken)

    return plex.resources.all()
}).then((resources: Resource[]) => {
    // do something with the resources
})
```

### Plex Media Server API (PMS)

The `Plex Media Server` SDK (PMS) provides an interface with your own server where you installed the Plex Media Server.
You can download the lates version of the Plex Media Server for the [official page](https://www.plex.tv/media-server-downloads/)

```typescript
import { PMS, Section } from 'plex-sdk'

const pms = new PMS(
    'https://your-plex-media-server.com:32400',
    'tokenObtainedFromPlexClient'
)

// If the token was not set in the constructor
pms.setAuthorization('tokenObtainedFromPlexClient')

pms.library.allSections().then((response: AllSectionsResponse) => {
    // Do something with the Sections

    return pms.library.allSectionItems(response.MediaContainer.Directory[0].key)
}).then((response: AllSectionItemsResponse) => {
    // list section items (movies, tv shows...)
    console.log(response.MediaContainer.Metadata)
})
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/nass600/plex-sdk/tags).

## Changelog

See [CHANGELOG](CHANGELOG.md) file for more details.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE.md) file for details

## Authors

-   [Ignacio Velazquez](https://ignaciovelazquez.es)
