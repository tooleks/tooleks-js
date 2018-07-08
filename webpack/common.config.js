"use strict";

const webpack = require("webpack");
const info = require("../package");

module.exports = {
    mode: process.env.NODE_ENV || "production",
    output: {
        filename: "[name].js",
        libraryTarget: "umd",
        // Note: The following line is needed to be able to build "umd" module compatible with Node.js.
        globalObject: `typeof self !== "undefined" ? self : this`,
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.js$/,
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
    plugins: [new webpack.BannerPlugin(`${info.name} v${info.version}. Copyright (c) Oleksandr Tolochko.`)],
};
