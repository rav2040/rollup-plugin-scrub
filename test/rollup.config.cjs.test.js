const scrub = require('../dist/index.js');

const INPUT_PATH = './test/input.test.js';
const OUTPUT_PATH = './test/output.cjs.test.js';

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
