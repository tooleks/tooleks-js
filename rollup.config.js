import moment from 'moment';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const output = {
  sourcemap: true,
  banner: `/* ${pkg.name} v${pkg.version}, Copyright (c) ${moment.utc().year()} ${pkg.author}, License: ${pkg.license} */`,
};

export default [
  {
    input: './src/main.ts',
    output: [
      {
        ...output,
        name: 'tooleks',
        file: './dist/main.umd.js',
        format: 'umd',
      },
      {
        ...output,
        file: './dist/main.cjs.js',
        format: 'cjs',
      }
    ],
    plugins: [
      typescript({ tsconfig: './tsconfig.legacy.json' }),
    ],
  },
  {
    input: './src/main.ts',
    output: {
      ...output,
      dir: './dist',
      format: 'es',
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.module.json' }),
    ],
  }
]
