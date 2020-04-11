import moment from 'moment';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const banner = `/* ${pkg.name} v${pkg.version}, Copyright (c) ${moment.utc().year()} ${pkg.author}, License: ${pkg.license} */`;

export default [
  {
    input: './src/main.ts',
    output: [
      {
        name: 'tooleks',
        file: './dist/main.umd.js',
        format: 'umd',
        sourcemap: true,
        banner,
      },
      {
        file: './dist/main.cjs.js',
        format: 'cjs',
        sourcemap: true,
        banner,
      }
    ],
    plugins: [
      typescript({ tsconfig: './tsconfig.legacy.json' }),
    ],
  },
  {
    input: './src/main.ts',
    output: {
      dir: './dist',
      format: 'es',
      sourcemap: true,
      banner,
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.module.json' }),
    ],
  }
]
