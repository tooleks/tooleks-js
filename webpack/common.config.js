"use strict";

const path = require("path");
const webpack = require("webpack");
const moment = require("moment");
const pkg = require("../package");

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

module.exports = {
    mode: process.env.NODE_ENV || "production",
    output: {
        filename: "[name].js",
        libraryTarget: "commonjs2",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
                use: {
                    loader: "eslint-loader",
                    options: {
                        fix: true,
                    },
                },
            },
        ],
    },
    optimization: {
        minimize: false,
    },
    devtool: "source-map",
    plugins: [new webpack.BannerPlugin(getBanner(pkg))],
};
