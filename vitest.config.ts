import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
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
        '**/rollup.config.*',
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
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@fixtures': resolve(__dirname, './test/__fixtures__'),
    },
  },
})
