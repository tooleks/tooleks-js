import moment from "moment";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import eslint from "rollup-plugin-eslint";
import pkg from "./package.json";

/**
 * Common target output configuration.
 *
 * @type {object}
 */
const output = {
    name: pkg.name,
    banner:
        `/* ${pkg.name} v${pkg.version} ${moment.utc().toISOString()}.` +
        ` Copyright (c) ${pkg.author}. License: ${pkg.license}. */`,
    sourcemap: true,
};

export default {
    input: "src/index.js",
    output: [
        {
            ...output,
            file: "dist/index.js",
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
