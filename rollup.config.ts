import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
import autoExternal from 'rollup-plugin-auto-external'
import dts from 'rollup-plugin-dts'
import fs from 'fs'

const input = './src/index.ts'
const outputDir = './dist'

// Clean dist folder
fs.rmSync(outputDir, { recursive: true, force: true })

export default async () => {
  return [
    // Minified ESM bundle
    {
      input,
      output: {
        file: `${outputDir}/index.js`,
        format: 'esm',
        sourcemap: false,
        generatedCode: {
          constBinding: true,
        },
      },
      plugins: [
        json(),
        resolve({ browser: true }),
        autoExternal(),
        typescript({
          sourceMap: false,
          inlineSources: false,
        }),
        terser(),
      ],
    },
    // Types
    {
      input,
      output: {
        file: `${outputDir}/index.d.ts`,
        format: 'es',
      },
      plugins: [
        typescript({
          sourceMap: false,
          declaration: false,
        }),
        autoExternal(),
        dts,
      ],
    },
  ]
}
