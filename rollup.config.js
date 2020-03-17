import typescript from 'rollup-plugin-typescript2';

const PKG_NAME = 'rollup-plugin-scrub';
const LIB_DIR = 'lib';

export default {
  input: `./src/${PKG_NAME}.ts`,
  output: [
    {
      file: `./${LIB_DIR}/${PKG_NAME}.js`,
      format: 'cjs',
    },
    {
      file: `./${LIB_DIR}/${PKG_NAME}.mjs`,
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
