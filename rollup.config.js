import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/rollup-plugin-scrub.ts',
  output: [
    {
      file: './lib/rollup-plugin-scrub.js',
      format: 'cjs',
    },
    {
      file: './lib/rollup-plugin-scrub.mjs',
      format: 'esm',
    },
  ],
  external: ['rollup-pluginutils'],
  plugins: [typescript()],
};
