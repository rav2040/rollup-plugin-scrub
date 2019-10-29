import { createFilter } from 'rollup-pluginutils';

interface Tag {
  begin: string;
  end?: string;
}

interface Options {
  tags?: Tag[];
  include?: string | string[];
  exclude?: string | string[];
}

const scrub = ({ tags, include, exclude }: Options = {}) => {
  const filter = createFilter(include, exclude);

  return {
    name: 'scrub',
    transform: (code: string, id: string) => {
      // Return immediately if there are no 'tags' or the input file is to be excluded.
      if (!filter(id) || tags === undefined) {
        return;
      }

      // Split the code string into an array of lines.
      const lines = code.split(/[\r\n]/g);

      // An array to hold the lines that won't get deleted.
      const linesToKeep: string[] = [];

      let shouldScrub = false;

      for (const [i, line] of lines.entries()) {

        // True if the current line denotes the beginning of code to be deleted.
        const begin = tags.some(({ begin }) => `//${begin}` === line.trim());

        // True if the current line denotes the end of code to be deleted, or if
        // the previous line denotes that only a single line should be deleted.
        const end = tags.some(({ end }) => `//${end}` === line.trim()) ||
          i > 0 && tags.some(({ begin, end }) => {
            return !end && `//${begin}` === lines[i - 1].trim();
          });

        if (begin) {
          // The current line and all following lines should be deleted as long
          // as 'shouldScrub' is true.
          shouldScrub = true;
        }

        if (!shouldScrub) {
          // Keep the current line.
          linesToKeep.push(line);
        }

        if (end) {
          // All following lines should NOT be deleted as long as 'shouldScrub' is
          // false.
          shouldScrub = false;
        }
      }

      // Return the 'scrubbed' code in the form of a string.
      return linesToKeep.join('\n');
    },
  };
};

export default scrub;
