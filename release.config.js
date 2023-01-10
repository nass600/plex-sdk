module.exports = {
    plugins: [
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        ['@semantic-release/npm', { npmPublish: true }],
        [
            '@semantic-release/git',
            {
                assets: [
                    'package.json',
                    'package-lock.json'
                ]
            }
        ],
        '@semantic-release/github'
    ],
    // eslint-disable-next-line no-template-curly-in-string
    tagFormat: '${version}'
}
