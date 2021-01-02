import pkg from './package.json'

import clear from 'rollup-plugin-clear'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import transformPaths from '@zerollup/ts-transform-paths'
import babel from 'rollup-plugin-babel'
import sourceMaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'
import progress from 'rollup-plugin-progress'
import visualizer from 'rollup-plugin-visualizer'

const input = './src/index.ts'

const plugins = [
    clear({
        targets: ['dist']
    }),
    external(),
    resolve({
        extensions: ['.js', '.ts', '.json']
    }),
    commonjs(),
    typescript({
        tsconfig: 'tsconfig.json',
        objectHashIgnoreUnknownHack: true,
        rollupCommonJSResolveHack: true,
        transformers: [(service) => transformPaths(service.getProgram())]
    }),
    babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.ts']
    }),
    sourceMaps(),
    terser({
        include: [/^.+\.min\.(js|css)$/]
    }),
    progress(),
    visualizer({
        filename: '.reports/rollup/statistics.html',
        title: 'Plex SDK'
    })
]

export default [
    {
        input,
        external: Object.keys(pkg.dependencies || {}),
        output: [
            { file: pkg.module, format: 'esm', sourcemap: true },
            { file: pkg.main, format: 'cjs', sourcemap: true },
            { file: pkg.module.replace('.js', '.min.js'), format: 'esm', sourcemap: true },
            { file: pkg.main.replace('.js', '.min.js'), format: 'cjs', sourcemap: true }
        ],
        plugins
    }
]
