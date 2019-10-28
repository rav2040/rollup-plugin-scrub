import typescript from 'rollup-plugin-typescript2';

const PKG_NAME = 'rollup-plugin-scrub';
const DIST_DIR = 'dist';

export default {
  input: `./src/${PKG_NAME}.ts`,
  output: [
    {
      file: `./${DIST_DIR}/${PKG_NAME}.js`,
      format: 'cjs',
    },
    {
      file: `./${DIST_DIR}/${PKG_NAME}.mjs`,
      format: 'esm',
    },
  ],
  external: ['rollup-pluginutils'],
  plugins: [typescript()],
};
