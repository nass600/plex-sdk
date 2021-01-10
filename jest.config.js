const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
    coverageDirectory: '<rootDir>/.reports/jest/coverage',
    collectCoverage: !process.argv.includes('--watch'),
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/types/**/*',
        '!src/**/__tests__/**/*',
        '!**/node_modules/**'
    ],
    coverageReporters: ['lcov', 'text', 'html'],
    coverageThreshold: {
        global: {
            statements: 80,
            branches: 60,
            functions: 80,
            lines: 80
        }
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
    },
    testPathIgnorePatterns: ['/node_modules/'],
    testRegex: '\\.spec\\.ts$',
    watchPlugins: [require.resolve('jest-watch-typeahead/filename'), require.resolve('jest-watch-typeahead/testname')]
}
