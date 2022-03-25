import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import svgr from "@svgr/rollup";
import url from "@rollup/plugin-url"
import commonjs from "@rollup/plugin-commonjs";
import json from '@rollup/plugin-json';

export default {
    input: pkg.source,
    output: [
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'esm' }
    ],
    plugins: [
        external(),
        babel({
            exclude: 'node_modules/**'
        }),
        del({ targets: ['dist/*'] }),
        svgr(),
        url(),
        commonjs(),
        json()
    ],
    external: Object.keys(pkg.peerDependencies || {}),
};