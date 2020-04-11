import moment from 'moment';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

const banner = `/* ${pkg.name} v${pkg.version}, Copyright (c) ${moment.utc().year()} ${pkg.author}, License: ${pkg.license} */`;

export default [
  {
    input: './src/main.ts',
    output: [
      {
        name: 'tooleks',
        file: pkg.browser,
        format: 'umd',
        sourcemap: true,
        banner,
      },
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        banner,
      }
    ],
    plugins: [
      typescript({ target: 'es5' }),
    ],
  },
  {
    input: './src/main.ts',
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      banner,
    },
    plugins: [
      typescript({ target: 'es2017' }),
    ],
  }
]
