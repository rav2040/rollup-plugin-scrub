import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',
  output: [
    {
      file: './dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: './dist/index.esm.js',
      format: 'esm',
    },
  ],
  external: [
    'rollup-pluginutils',
  ],
  plugins: [
    typescript(),
  ],
};
