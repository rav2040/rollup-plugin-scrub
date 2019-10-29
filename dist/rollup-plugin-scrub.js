'use strict';

var rollupPluginutils = require('rollup-pluginutils');

const scrub = ({ tags, include, exclude } = {}) => {
    const filter = rollupPluginutils.createFilter(include, exclude);
    return {
        name: 'scrub',
        transform: (code, id) => {
            if (!filter(id) || tags === undefined) {
                return;
            }
            const lines = code.split(/[\r\n]/g);
            const linesToKeep = [];
            let shouldScrub = false;
            for (const [i, line] of lines.entries()) {
                const begin = tags.some(({ begin }) => `//${begin}` === line.trim());
                const end = tags.some(({ end }) => `//${end}` === line.trim()) ||
                    i > 0 && tags.some(({ begin, end }) => {
                        return !end && `//${begin}` === lines[i - 1].trim();
                    });
                if (begin) {
                    shouldScrub = true;
                }
                if (!shouldScrub) {
                    linesToKeep.push(line);
                }
                if (end) {
                    shouldScrub = false;
                }
            }
            return linesToKeep.join('\n');
        },
    };
};

module.exports = scrub;
