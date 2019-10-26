import scrub from '../dist/index.mjs';

const INPUT_PATH = './test/input.test.js';
const OUTPUT_PATH = './test/output.esm.test.js';

export default {
  input: INPUT_PATH,
  output: [
    {
      file: OUTPUT_PATH,
      format: 'esm',
    },
  ],
  external: [
    'rollup-pluginutils',
  ],
  plugins: [
    scrub({
      tags: [
        {
          begin: 'remove-this-variable',
        },
        {
          begin: 'remove-this-function-start',
          end: 'remove-this-function-end',
        },
      ],
    }),
  ],
};
