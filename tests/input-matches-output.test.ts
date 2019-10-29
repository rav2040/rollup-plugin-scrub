import { readFileSync } from 'fs';
import { rollup } from 'rollup';
import scrub from '../src/rollup-plugin-scrub';

test('array input matches expected output', async () => {
  const expected = readFileSync('./examples/output/from-array-input.js').toString();

  const bundle = await rollup({
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
  });
  const { output } = await bundle.generate({ format: 'esm' });
  expect(output[0].code).toEqual(expected);
});

test('undefined input matches expected output', async () => {
  const expected = readFileSync('./examples/output/from-undefined-input.js').toString();
  const bundle = await rollup({
    input: './examples/input.js',
    external: [
      'rollup-pluginutils',
    ],
    plugins: [
      scrub(),
    ],
  });
  const { output } = await bundle.generate({ format: 'esm' });
  expect(output[0].code).toEqual(expected);
});

test('input with \'exclude\' filter matches expected output', async () => {
  const expected = readFileSync('./examples/output/from-undefined-input.js').toString();
  const bundle = await rollup({
    input: './examples/input.js',
    external: [
      'rollup-pluginutils',
    ],
    plugins: [
      scrub({
        exclude: [
          './examples/input.js',
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
  });
  const { output } = await bundle.generate({ format: 'esm' });
  expect(output[0].code).toEqual(expected);
});
