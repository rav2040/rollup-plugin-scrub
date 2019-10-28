const fs = require('fs');
const rollup = require('rollup');
const scrub = require('../lib/rollup-plugin-scrub.js');

const inputOptions = {
  input: './__tests__/input.js',
  external: [
    'rollup-pluginutils',
  ],
  plugins: [
    scrub(),
  ],
};

const cjs = fs.readFileSync(`./__tests__/expected-output/cjs/from-undefined-input.js`).toString();
const esm = fs.readFileSync(`./__tests__/expected-output/esm/from-undefined-input.js`).toString();

test.each`
  format   | expected
  ${'cjs'} | ${cjs}
  ${'esm'} | ${esm}
`('undefined input matches expected $format output', async ({ format, expected }) => {
  const bundle = await rollup.rollup(inputOptions);
  const { output } = await bundle.generate({ format });
  expect(output[0].code).toEqual(expected);
});
