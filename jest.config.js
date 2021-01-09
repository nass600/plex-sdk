const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
    coverageDirectory: '<rootDir>/.reports/jest/coverage',
    collectCoverage: !process.argv.includes('--watch'),
    collectCoverageFrom: ['src/**/*.ts', '!src/**/__tests__/**/*', '!**/node_modules/**'],
    coverageReporters: ['lcov', 'text', 'html'],
    coverageThreshold: {
        global: {
            statements: 10,
            branches: 0,
            functions: 10,
            lines: 10
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
