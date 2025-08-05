import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'text', 'html'],
      reportsDirectory: '.reports/vitest/coverage',
      exclude: [
        'src/types/**/*',
        'test/**/*',
        '**/node_modules/**',
        'dist/**/*',
        '**/*.config.*',
        '**/*.config.js',
        '**/*.config.ts',

        '**/vitest.config.*',
        '**/eslint.config.*',
        '**/commitlint.config.*',
        '**/typedoc.config.*',
        '**/tsconfig.*',
        '.reports/**/*',
        '**/coverage/**/*',
        '**/*.d.ts',
      ],
      include: ['src/**/*.ts'],
      thresholds: {
        global: {
          statements: 85,
          branches: 85,
          functions: 85,
          lines: 85,
        },
      },
    },
    include: ['test/**/*.spec.ts'],
    exclude: ['node_modules/**'],
  },
})
