import clear from 'rollup-plugin-clear'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import transformPaths from '@zerollup/ts-transform-paths'
import { babel } from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import progress from 'rollup-plugin-progress'
import { visualizer } from 'rollup-plugin-visualizer'

export default {
    input: './src/index.ts',
    external: ['axios'],
    output: [
        { file: 'dist/plex.esm.js', format: 'esm', sourcemap: true },
        { file: 'dist/plex.esm.min.js', format: 'esm', sourcemap: true },
        // { file: pkg.module, format: 'esm', sourcemap: true },
        { file: 'dist/plex.js', format: 'cjs', sourcemap: true },
        { file: 'dist/plex.min.js', format: 'cjs', sourcemap: true }
        // { file: pkg.module.replace('.js', '.min.js'), format: 'esm', sourcemap: true },
        // { file: pkg.main.replace('.js', '.min.js'), format: 'cjs', sourcemap: true }
    ],
    plugins: [
        clear({
            targets: ['dist']
        }),
        resolve({
            extensions: ['.js', '.ts', '.json']
        }),
        commonjs(),
        typescript({
            tsconfig: 'tsconfig.json',
            transformers: [(service) => transformPaths(service.getProgram())]
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            extensions: ['.js', '.ts']
        }),
        terser(),
        progress(),
        visualizer({
            filename: '.reports/rollup/statistics.html',
            title: 'Plex SDK'
        })
    ]
}
