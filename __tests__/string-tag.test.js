const fs = require('fs');
const rollup = require('rollup');
const scrub = require('../dist/index.js');

// see below for details on the options
const inputOptions = {
  input: './__tests__/input.js',
  external: [
    'rollup-pluginutils',
  ],
  plugins: [
    scrub({
      tags: 'remove-single-line',
    }),
  ],
};


it('array input matches expected CommonJS output', async () => {
  const expected = fs.readFileSync('./__tests__/expected-output/cjs/from-string-input.js').toString();
  const bundle = await rollup.rollup(inputOptions);
  const { output } = await bundle.generate({ format: 'cjs' });
  expect(output[0].code).toEqual(expected);
});

it('array input matches expected ESM output', async () => {
  const expected = fs.readFileSync('./__tests__/expected-output/esm/from-string-input.js').toString();
  const bundle = await rollup.rollup(inputOptions);
  const { output } = await bundle.generate({ format: 'esm' });
  expect(output[0].code).toEqual(expected);
});
