import moment from "moment";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import eslint from "rollup-plugin-eslint";
import pkg from "./package.json";

/**
 * Get banner content.
 *
 * @param {Object} pkg
 * @return {string}
 */
function getBanner(pkg) {
    const name = `${pkg.name} v${pkg.version}`;
    const timestamp = moment.utc().toISOString();
    const copyright = `Copyright (c) ${pkg.author}`;
    const license = `License: ${pkg.license}`;
    return `${name} / ${timestamp} / ${copyright} / ${license}`;
}

/**
 * Common target output configuration.
 *
 * @type {object}
 */
const output = {
    name: pkg.name,
    banner: `/* ${getBanner(pkg)} */`,
    sourcemap: true,
};

export default {
    input: "src/index.js",
    output: [
        {
            ...output,
            file: "dist/index.umd.js",
            format: "umd",
        },
        {
            ...output,
            file: "dist/index.es.js",
            format: "es",
        },
    ],
    plugins: [
        resolve(),
        eslint({
            throwOnError: true,
            fix: true,
        }),
        babel({
            exclude: "node_modules/**",
        }),
    ],
};
