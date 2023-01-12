export default {
    branches: [
        'master'
    ],
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
                ],
                message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
            }
        ],
        '@semantic-release/github'
    ]
}
