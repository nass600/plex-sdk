import { pathsToModuleNameMapper } from 'ts-jest'
import tsconfig from './tsconfig.json'

export default {
    preset: 'ts-jest',
    coverageDirectory: '<rootDir>/.reports/jest/coverage',
    collectCoverage: !process.argv.includes('--watch'),
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/types/**/*',
        '!test/**/*',
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
    modulePaths: [tsconfig.compilerOptions.baseUrl],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths)
    },
    testPathIgnorePatterns: ['/node_modules/'],
    testRegex: '\\.spec\\.ts$',
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname']
}
