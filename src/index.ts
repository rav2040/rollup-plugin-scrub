import { createFilter } from 'rollup-pluginutils';

interface Tag {
  begin: string;
  end?: string;
}

interface Options {
  tags?: Tag[];
  include?: string;
  exclude?: string;
}

export default function scrub(options: Options = {}) {
  const filter = createFilter(options.include, options.exclude);

  if (options.tags === undefined) {
    options.tags = [];
  }

  if (typeof options.tags === 'string') {
    options.tags = [options.tags];
  }

  const { tags } = options;

  return {
    name: 'scrub',
    transform: (code: string, id: string): string | void => {
      if (!filter(id)) {
        return;
      }

      const unscrubbedCode: string[] = [];
      const scrubber = { isActive: false, shouldReset: false };

      for (const line of code.split(/[\r\n]/g)) {
        let isTag = false;

        for (const { begin, end } of tags) {
          if (line.trim() === begin) {
            isTag = true;
            scrubber.isActive = true;
            scrubber.shouldReset = end === undefined;
            break;
          }

          else if (line.trim() === end) {
            isTag = true;
            scrubber.isActive = false;
            scrubber.shouldReset = false;
            break;
          }
        }

        if (!isTag) {
          if (!scrubber.isActive) {
            unscrubbedCode.push(line);
          }

          if (scrubber.shouldReset) {
            scrubber.isActive = false;
          }
        }
      }

      return unscrubbedCode.join('\n');
    }
  };
}
