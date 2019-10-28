const fs = require('fs');
const rollup = require('rollup');
const scrub = require('../dist/index.js');

const inputOptions = {
  input: './__tests__/input.js',
  external: [
    'rollup-pluginutils',
  ],
  plugins: [
    scrub({
      tags: [
        {
          begin: 'remove-single-line',
        },
        {
          begin: 'remove-multiple-lines-start',
          end: 'remove-multiple-lines-end',
        },
      ],
    }),
  ],
};

it('array input matches expected CommonJS output', async () => {
  const expected = fs.readFileSync('./__tests__/expected-output/cjs/from-array-input.js').toString();
  const bundle = await rollup.rollup(inputOptions);
  const { output } = await bundle.generate({ format: 'cjs' });
  expect(output[0].code).toEqual(expected);
});

it('array input matches expected ESM output', async () => {
  const expected = fs.readFileSync('./__tests__/expected-output/esm/from-array-input.js').toString();
  const bundle = await rollup.rollup(inputOptions);
  const { output } = await bundle.generate({ format: 'esm' });
  expect(output[0].code).toEqual(expected);
});
