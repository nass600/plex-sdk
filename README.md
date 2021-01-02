# plex-sdk

![npm](https://img.shields.io/npm/v/plex-sdk?color=red&logo=npm&style=for-the-badge)
![CircleCI](https://img.shields.io/circleci/build/bb/nass600/plex-sdk?logo=circleci\&style=for-the-badge\&token=f0efd5cc1eba9f628e0c033f3400fc7464871111)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=for-the-badge)](https://github.com/semantic-release/semantic-relesase)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=for-the-badge\&logo=github)](http://commitizen.github.io/cz-cli/)

> Typescript SDK for Plex API

## Installation

### NPM

```bash
npm install plex-sdk
```

### Yarn

```bash
yarn add plex-sdk
```

## Usage

```typescript
import { Plex } from 'plex-sdk'

export const plex = new Plex({
    clientIdentifier: 'c2877b28-1806-42c1-eeea-ac4bc2b9a93d',
    device: 'Chrome',
    product: 'Your product name',
    version: '1.0.0'
})

plex.tv.users.signIn(username, password).then((user: User) => {
    if (!user.authToken) {
        return Promise.reject(new Error('Login request didn\'t carry a valid token'))
    }

    plex.setAuthorization(user.authToken)

    return plex.tv.resources.all()
}).then((resources: Resource[]) => {
    // do something with the resources
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
