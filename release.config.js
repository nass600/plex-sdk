module.exports = {
    plugins: [
        ['@semantic-release/commit-analyzer', {
            releaseRules: [
                { type: 'build', release: 'patch' },
                { type: 'ci', release: 'patch' },
                { type: 'feat', release: 'minor' },
                { type: 'fix', release: 'patch' },
                { type: 'perf', release: 'patch' },
                { type: 'refactor', release: 'patch' },
                { type: 'style', release: 'patch' },
                { type: 'revert', release: 'patch' },
                { breaking: true, release: 'major' },
                { revert: true, release: 'patch' }
            ]
        }],
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        ['@semantic-release/npm', { npmPublish: true }],
        '@semantic-release/git',
        ['@semantic-release/github', {
            assets: 'build/*.zip'
        }]
    ],
    // eslint-disable-next-line no-template-curly-in-string
    tagFormat: '${version}'
}
