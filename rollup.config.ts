import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import transformPaths from '@zerollup/ts-transform-paths'
import { babel } from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
import autoExternal from 'rollup-plugin-auto-external'
import dts from 'rollup-plugin-dts'
import path from 'path'
import fs from 'fs'

const pkg = require('./package.json')
const input = './src/index.ts'
const ouputDir = './dist'

// Clean dist folder
fs.rmSync(ouputDir, { recursive: true, force: true });

const buildConfig = ({es5, minifiedVersion = true, ...config}) => {
    const {file} = config.output
    const ext = path.extname(file)
    const basename = path.basename(file, ext)
    const extArr = ext.split('.')
    extArr.shift()


    const build = ({minified}) => ({
        input,
        ...config,
        output: {
            ...config.output,
            sourcemap: true,
            file: `${path.dirname(file)}/${basename}.${(minified ? ['min', ...extArr] : extArr).join('.')}`
        },
        plugins: [
            json(),
            resolve({browser: true}),
            commonjs(),
            autoExternal(),
            typescript({
                tsconfig: 'tsconfig.json',
                sourceMap: true,
                transformers: [(service) => transformPaths(service.getProgram())]
            }),
            minified && terser(),
            ...(es5 ? [babel({
                babelHelpers: 'bundled',
                presets: ['@babel/preset-env']
            })] : []),
            ...(config.plugins || []),
        ]
    })

    return [
        build({minified: false}),
        build({minified: true})
    ]
}

export default async () => {
    return [
        // Browser ESM bundle
        ...buildConfig({
            es5: false,
            output: {
                file: `${ouputDir}/${pkg.name}.js`,
                format: "esm",
                generatedCode: {
                    constBinding: true
                }
            }
        }),
        // Browser CJS bundle
        ...buildConfig({
            es5: false,
            output: {
                file: `${ouputDir}/${pkg.name}.cjs`,
                format: "cjs",
            }
        }),
        // Types
        {
            input,
            output: {
                file: `${ouputDir}/${pkg.name}.d.ts`,
                format: "es",
                sourcemap: false
            },
            plugins: [
                typescript({
                    tsconfig: 'tsconfig.json',
                    sourceMap: false,
                    declaration: true,
                    emitDeclarationOnly: true,
                    declarationDir: ".",
                    transformers: [(service) => transformPaths(service.getProgram())]
                }),
                dts.default()
            ]
        }
    ]
}
