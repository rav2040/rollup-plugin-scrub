# rollup-plugin-scrub

Remove lines or sections of code based on custom-defined tags.

## Install with NPM

```bash
npm i -D rollup-plugin-scrub
```

## Usage example

If you have code that you want removed during the build process, place comments immediately before and after to identify the start and end points.

```js
//!dev-code
const NOT_REQUIRED = 'Only needed during development.';
const REQUIRED = 'Always needed.';

function foo() {
  // Some code required in production build
}

//!dev-code-start
function bar() {
  // Some code only required during development
}
//!dev-code-end
```


Then in your Rollup config file, use the scrub plugin as follows.

```js
// rollup.config.js
import scrub from 'rollup-plugin-scrub';

export default {
  input: './src/index.js',
  plugins: [
    scrub({
      tags: [
        // Remove the next line only
        { begin: '!dev-code' },
        // Remove all lines between beginning and end
        { begin: '!dev-code-start', end: '!dev-code-end' }
      ]
    })
  ]
};
```


The plugin options includes a "tags" property which should be provided with an array of tag objects.

Each tag object must have a "begin" property, and may also have an optional "end" property.

If only a "begin" tag is provided, only the line immediately following it will be removed. Otherwise, all lines between the start and end tags will be removed.


The example above will result in output code like this:

```js
const REQUIRED = 'Always needed.';

function foo() {
  // Some code required in production build
}
```


Each tag should be on its own line (it doesn't matter if there's trailing white space). You can name them whatever you like, but they should only be included as `//` comments.
