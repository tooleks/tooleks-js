import moment from "moment";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import eslint from "rollup-plugin-eslint";
import license from "rollup-plugin-license";
import pkg from "./package.json";

export default {
    input: "src/index.js",
    output: [
        {
            file: "dist/index.js",
            name: pkg.name,
            format: "umd",
        },
        {
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
        license({
            banner: `${pkg.name} v${pkg.version} ${moment.utc().toISOString()}. Copyright (c) ${pkg.author}.`,
        }),
    ],
};
