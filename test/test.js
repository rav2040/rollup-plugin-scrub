import test from 'ava';
import fs from 'fs';

test('CommonJS version produces matching output.', async t => {
  const [output, expected] = await Promise.all([
    fs.promises.readFile('./test/output.cjs.test.js'),
    fs.promises.readFile('./test/expected.test.js'),
  ]);

  t.is(output.toString(), expected.toString());
});

test('ESM version produces matching output.', async t => {
  const [output, expected] = await Promise.all([
    fs.promises.readFile('./test/output.esm.test.js'),
    fs.promises.readFile('./test/expected.test.js'),
  ]);

  t.is(output.toString(), expected.toString());
});
