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
      exclude: [
        './__tests__/input.js',
      ],
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

it('matches expected CommonJS output', async () => {
  const expected = fs.readFileSync('./__tests__/expected-output/cjs/from-undefined-input.js').toString();
  const bundle = await rollup.rollup(inputOptions);
  const { output } = await bundle.generate({ format: 'cjs' });
  expect(output[0].code).toEqual(expected);
});

it('matches expected ESM output', async () => {
  const expected = fs.readFileSync('./__tests__/expected-output/esm/from-undefined-input.js').toString();
  const bundle = await rollup.rollup(inputOptions);
  const { output } = await bundle.generate({ format: 'esm' });
  expect(output[0].code).toEqual(expected);
});
