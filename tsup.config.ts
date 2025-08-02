import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  minify: true,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  target: 'es2022',
  skipNodeModulesBundle: true,
})
