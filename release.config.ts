export default {
    branches: [
        'master'
    ],
    plugins: [
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        ['@semantic-release/npm', { npmPublish: true }],
        ['@semantic-release/github', {
            assets: ['dist/**']
        }],
        ['@semantic-release/git', {
            assets: [
                'dist/**',
                'package.json',
                'package-lock.json'
            ],
            message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
        }]
    ]
}
