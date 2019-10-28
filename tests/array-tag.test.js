const fs = require('fs');
const rollup = require('rollup');
const scrub = require('../dist/rollup-plugin-scrub.js');

const inputOptions = {
  input: './examples/input.js',
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

const cjs = fs.readFileSync('./examples/output/cjs/from-array-input.js').toString();
const esm = fs.readFileSync('./examples/output/esm/from-array-input.js').toString();

test.each`
  format   | expected
  ${'cjs'} | ${cjs}
  ${'esm'} | ${esm}
`('array input matches expected $format output', async ({ format, expected }) => {
  const bundle = await rollup.rollup(inputOptions);
  const { output } = await bundle.generate({ format });
  expect(output[0].code).toEqual(expected);
});
